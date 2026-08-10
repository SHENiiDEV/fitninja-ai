<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DeepSeekService
{
    /**
     * API endpoint URL.
     */
    protected string $apiUrl;

    /**
     * API key for authentication.
     */
    protected string $apiKey;

    /**
     * System prompt that forces JSON responses with calorie and macro nutrient data.
     */
    protected string $systemPrompt;

    public function __construct()
    {
        $this->apiUrl = config('services.deepseek.api_url');
        $this->apiKey = config('services.deepseek.api_key');

        $this->systemPrompt = <<<'PROMPT'
You are FitNinja, a world-class AI nutritionist & fitness coach.

Your task: The user sends you a natural language description of meals eaten or physical workout activities completed.

You MUST reply STRICTLY in JSON format with the following fields:
{
  "message": "A friendly, encouraging response in English. Briefly comment on their food choices or exercise effort. Maximum 2-3 sentences.",
  "calories": Integer representing estimated consumed kilocalories (positive integer). If workout/exercise, return negative integer (calories burned).,
  "protein_g": Integer total grams of protein (0 if workout),
  "fat_g": Integer total grams of fat (0 if workout),
  "carbs_g": Integer total grams of carbohydrates (0 if workout),
  "meals": [
    {
      "name": "food item or activity name in English",
      "calories": integer,
      "protein_g": integer,
      "fat_g": integer,
      "carbs_g": integer
    }
  ]
}

CRITICAL RULES:
1. Always return ONLY valid JSON. No conversational text before or after JSON.
2. If food cannot be identified, set calories to 0, protein_g to 0, fat_g to 0, carbs_g to 0, and politely ask for clarification in message.
3. Round calories to tens (e.g. 350 instead of 347). Round macros to whole grams.
4. Use standard nutritional average values for typical portion sizes.
5. If user writes non-fitness content, set calories to 0 and guide them back to fitness/nutrition.
6. If the input contains a voice message or photo submission tag, extract the meal or exercise details, estimate the portion/macros, and reply with encouragement.
PROMPT;
    }

    /**
     * Analyze user's food/activity message and return structured data with macros.
     *
     * @return array{message: string, calories: int, protein_g: int, fat_g: int, carbs_g: int, meals: array}|null
     */
    public function analyzeFoodMessage(string $userMessage): ?array
    {
        try {
            $response = Http::timeout(30)
                ->withToken($this->apiKey)
                ->acceptJson()
                ->post($this->apiUrl, [
                    'model' => 'deepseek-chat',
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => $this->systemPrompt,
                        ],
                        [
                            'role' => 'user',
                            'content' => $userMessage,
                        ],
                    ],
                    'temperature' => 0.3,
                    'max_tokens' => 600,
                    'response_format' => ['type' => 'json_object'],
                ]);

            if ($response->failed()) {
                Log::error('DeepSeek API request failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                return null;
            }

            $data = $response->json();
            $content = $data['choices'][0]['message']['content'] ?? null;

            if (! $content) {
                Log::error('DeepSeek API returned empty content', ['response' => $data]);
                return null;
            }

            $parsed = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Failed to parse DeepSeek JSON response', [
                    'content' => $content,
                    'error' => json_last_error_msg(),
                ]);
                return null;
            }

            return [
                'message' => $parsed['message'] ?? 'Could not analyze the message.',
                'calories' => (int) ($parsed['calories'] ?? 0),
                'protein_g' => max(0, (int) ($parsed['protein_g'] ?? 0)),
                'fat_g' => max(0, (int) ($parsed['fat_g'] ?? 0)),
                'carbs_g' => max(0, (int) ($parsed['carbs_g'] ?? 0)),
                'meals' => array_map(fn ($m) => [
                    'name' => $m['name'] ?? 'Meal',
                    'calories' => (int) ($m['calories'] ?? 0),
                    'protein_g' => (int) ($m['protein_g'] ?? 0),
                    'fat_g' => (int) ($m['fat_g'] ?? 0),
                    'carbs_g' => (int) ($m['carbs_g'] ?? 0),
                ], $parsed['meals'] ?? []),
            ];

        } catch (\Throwable $e) {
            Log::error('DeepSeek API exception', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return null;
        }
    }
}
