<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #070a11; color: #e2e8f0; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 30px auto; background-color: #0d1322; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; padding: 40px; }
        .logo { font-size: 24px; font-weight: 900; color: #ffffff; text-decoration: none; }
        .accent { color: #10b981; }
        .hero-title { font-size: 20px; font-weight: 800; color: #ffffff; margin-top: 20px; }
        .table-box { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden; }
        .table-box td { padding: 12px 16px; border-bottom: 1px solid #1e293b; font-size: 13px; color: #cbd5e1; }
        .table-box td.label { color: #64748b; font-weight: 600; width: 30%; }
        .msg-body { background-color: #020617; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-top: 20px; font-size: 14px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; }
        .footer { margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px; font-size: 11px; color: #64748b; text-align: center; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="logo">FitNinja <span class="accent">AI</span></div>

        <div class="hero-title">📩 Executive Support Form Submitted</div>

        <table class="table-box">
            <tr>
                <td class="label">Sender Name:</td>
                <td><strong>{{ $name }}</strong></td>
            </tr>
            <tr>
                <td class="label">Sender Email:</td>
                <td><a href="mailto:{{ $email }}" style="color: #10b981;">{{ $email }}</a></td>
            </tr>
            <tr>
                <td class="label">Subject:</td>
                <td>{{ $mailSubject }}</td>
            </tr>
        </table>

        <div style="margin-top: 20px; font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; tracking-wider: 1px;">
            Message Content:
        </div>
        <div class="msg-body">
{{ $mailMessage }}
        </div>

        <div class="footer">
            © {{ date('Y') }} CHANGE IT UP SERVICES LTD (Company No. 16107295)<br>
            14 Broadway, Nottingham, United Kingdom, NG1 1PS • support@fitninja.co.uk
        </div>
    </div>
</body>
</html>
