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
        .price-hero { font-size: 32px; font-weight: 900; color: #38bdf8; margin: 15px 0; }
        .text { font-size: 14px; color: #94a3b8; line-height: 1.6; }
        .table-box { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
        .table-box td { padding: 12px 16px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #cbd5e1; }
        .table-box td.label { color: #64748b; font-weight: 600; }
        .btn { display: inline-block; background: linear-gradient(to right, #10b981, #0d9488); color: #ffffff; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; margin-top: 25px; }
        .footer { margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px; font-size: 11px; color: #64748b; text-align: center; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="logo">FitNinja <span class="accent">AI</span></div>

        <div class="hero-title">Service Receipt & Report Unlocked 📄</div>

        <div class="price-hero">
            {{ $payment->currency === 'GBP' ? '£' : ($payment->currency === 'USD' ? '$' : '€') }}{{ number_format($payment->amount, 2) }}
        </div>

        <p class="text">
            Dear {{ $user->name }}, your payment for <strong>{{ $payment->service_name }}</strong> has been processed successfully.
        </p>

        <table class="table-box">
            <tr>
                <td class="label">Invoice Reference:</td>
                <td><strong>{{ $payment->gateway_reference }}</strong></td>
            </tr>
            <tr>
                <td class="label">Purchased Service:</td>
                <td>{{ $payment->service_name }}</td>
            </tr>
            <tr>
                <td class="label">Remaining Token Balance:</td>
                <td><strong>{{ $user->credits }} AI Tokens</strong></td>
            </tr>
            <tr>
                <td class="label">Transaction Date:</td>
                <td>{{ $payment->created_at->format('d M Y, H:i') }} UTC</td>
            </tr>
        </table>

        <p class="text" style="margin-top: 20px; font-size: 12px; color: #64748b;">
            📎 Your official B2B PDF Tax Invoice (<code>Invoice_{{ $payment->gateway_reference }}.pdf</code>) is attached to this email.
        </p>

        <div style="text-align: center;">
            <a href="{{ url('/dashboard') }}" class="btn">View & Download Fitness Analytics →</a>
        </div>

        <div class="footer">
            © {{ date('Y') }} CHANGE IT UP SERVICES LTD (Company No. 16107295)<br>
            14 Broadway, Nottingham, United Kingdom, NG1 1PS • billing@fitninja.co.uk
        </div>
    </div>
</body>
</html>
