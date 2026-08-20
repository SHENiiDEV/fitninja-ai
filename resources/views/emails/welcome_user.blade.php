<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070a11; color: #e2e8f0; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 30px auto; background-color: #0d1322; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; padding: 40px; }
        .logo { font-size: 24px; font-weight: 900; color: #ffffff; text-decoration: none; }
        .accent { color: #10b981; }
        .hero-title { font-size: 22px; font-weight: 800; color: #ffffff; margin-top: 20px; }
        .text { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-top: 15px; }
        .feature-box { background-color: #020617; border: 1px solid #1e293b; border-radius: 14px; padding: 15px; margin-top: 20px; }
        .feature-item { font-size: 13px; color: #cbd5e1; margin-bottom: 8px; }
        .btn { display: inline-block; background: linear-gradient(to right, #10b981, #0d9488); color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 30px; }
        .footer { margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px; font-size: 11px; color: #64748b; text-align: center; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="logo">FitNinja <span class="accent">AI</span></div>

        <div class="hero-title">Welcome aboard, {{ $user->name }}! ⚡</div>

        <p class="text">
            Thank you for registering with <strong>FitNinja AI</strong> — your autonomous neural coach for executive nutrition, voice note analysis, and macro tracking.
        </p>

        <p class="text">
            Your account has been credited with <strong>10 Free Welcome AI Tokens</strong> so you can test our neural engine immediately.
        </p>

        <div class="feature-box">
            <div class="feature-item">🎤 <strong>Audio Voice Notes:</strong> Send voice notes via Telegram for instant calorie breakdown.</div>
            <div class="feature-item">📸 <strong>Food Photo Recognition:</strong> Submit meal photos for instant macro analysis.</div>
            <div class="feature-item">📊 <strong>14-Day Web Dashboard:</strong> Inspect daily macro progress, BMR, and TDEE ceilings.</div>
        </div>

        <div style="text-align: center;">
            <a href="{{ url('/dashboard') }}" class="btn">Launch Your Web Dashboard →</a>
        </div>

        <div class="footer">
            © {{ date('Y') }} CHANGE IT UP SERVICES LTD (Company No. 16107295)<br>
            14 Broadway, Nottingham, United Kingdom, NG1 1PS • support@fitninja.co.uk
        </div>
    </div>
</body>
</html>
