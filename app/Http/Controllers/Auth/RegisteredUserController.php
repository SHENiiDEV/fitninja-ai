<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $restrictedCountries = [
            'Sudan',
            'Dem. Rep. of the Congo',
            'Democratic Republic of the Congo',
            'Iran',
            'Mali',
            'Myanmar',
            'Myanmar (Burma)',
            'North Korea',
            'South Sudan',
            'Syria',
            'Yemen',
            'Afghanistan',
            'Belarus',
            'Central African Republic',
            'Cuba',
            'Haiti',
            'Iraq',
            'Russia',
            'Somalia',
            'Venezuela',
            'Zimbabwe',
        ];

        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:50',
            'date_of_birth' => 'required|date|before:today',
            'address_line1' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'country' => ['required', 'string', Rule::notIn($restrictedCountries)],
            'postcode' => 'required|string|max:20',
            'terms' => 'required|accepted',
        ], [
            'country.not_in' => 'Registration is currently not available in the selected country/region due to regulatory restrictions.',
            'terms.accepted' => 'You must agree to the Terms & Conditions and Privacy Policy to proceed.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'date_of_birth' => $request->date_of_birth,
            'address_line1' => $request->address_line1,
            'city' => $request->city,
            'country' => $request->country,
            'postcode' => $request->postcode,
            'billing_address' => $request->address_line1,
            'billing_city' => $request->city,
            'billing_country' => $request->country,
            'billing_postcode' => $request->postcode,
            'terms_accepted_at' => now(),
            'subscription_status' => 'free',
            'credits' => 10,
        ]);

        event(new Registered($user));

        try {
            \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\WelcomeUserMail($user));
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::warning('Welcome email send failed: ' . $e->getMessage());
        }

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
