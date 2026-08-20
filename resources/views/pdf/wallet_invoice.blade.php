<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Invoice_{{ $payment->gateway_reference }}</title>
    <style>
        @page {
            margin: 35px 40px;
        }
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #1e293b;
            font-size: 12px;
            line-height: 1.5;
            background-color: #ffffff;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        .header-table {
            margin-bottom: 30px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 20px;
        }
        .logo-title {
            font-size: 22px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
        }
        .logo-accent {
            color: #10b981;
        }
        .badge-paid {
            display: inline-block;
            background-color: #d1fae5;
            color: #065f46;
            border: 1px solid #a7f3d0;
            padding: 4px 12px;
            font-size: 10px;
            font-weight: 800;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .invoice-title {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            text-align: right;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .info-table {
            margin-bottom: 30px;
        }
        .info-box-title {
            font-size: 10px;
            font-weight: 800;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 6px;
        }
        .merchant-name {
            font-size: 13px;
            font-weight: 800;
            color: #0f172a;
        }
        .items-table {
            margin-bottom: 30px;
        }
        .items-table th {
            background-color: #0f172a;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 1px;
            padding: 10px 12px;
            text-align: left;
        }
        .items-table td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 12px;
        }
        .totals-table {
            width: 40%;
            margin-left: auto;
            margin-bottom: 30px;
        }
        .totals-table td {
            padding: 6px 12px;
            text-align: right;
        }
        .totals-label {
            color: #64748b;
            font-weight: 600;
        }
        .totals-value {
            font-weight: 700;
            color: #0f172a;
        }
        .grand-total {
            font-size: 16px;
            font-weight: 900;
            color: #10b981;
            border-top: 2px solid #0f172a;
            padding-top: 8px;
        }
        .legal-notice {
            margin-top: 40px;
            padding: 15px;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 10px;
            color: #64748b;
            line-height: 1.6;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #94a3b8;
            border-top: 1px solid #f1f5f9;
            padding-top: 15px;
        }
    </style>
</head>
<body>

    <!-- Header Table -->
    <table class="header-table">
        <tr>
            <td style="width: 50%; vertical-align: top;">
                <div class="logo-title">
                    FitNinja <span class="logo-accent">AI</span>
                </div>
                <div style="margin-top: 6px;">
                    <span class="badge-paid">✓ Paid & Verified</span>
                </div>
            </td>
            <td style="width: 50%; vertical-align: top; text-align: right;">
                <div class="invoice-title">Official Tax Invoice</div>
                <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
                    Ref: <strong>{{ $payment->gateway_reference }}</strong><br>
                    Date: {{ $payment->created_at->format('d M Y, H:i') }} UTC
                </div>
            </td>
        </tr>
    </table>

    <!-- Info Table: Merchant & Billed To -->
    <table class="info-table">
        <tr>
            <!-- Merchant of Record -->
            <td style="width: 50%; vertical-align: top; padding-right: 15px;">
                <div class="info-box-title">Merchant of Record (Issuer)</div>
                <div class="merchant-name">CHANGE IT UP SERVICES LTD</div>
                <div>Company Number: <strong>16107295</strong></div>
                <div>Registered Office: 14 Broadway</div>
                <div>Nottingham, United Kingdom, NG1 1PS</div>
                <div>Email: billing@fitninja.co.uk</div>
            </td>

            <!-- Customer Details -->
            <td style="width: 50%; vertical-align: top; padding-left: 15px;">
                <div class="info-box-title">Billed To (Customer)</div>
                <div style="font-weight: 800; font-size: 13px; color: #0f172a;">
                    {{ $user->name }} {{ $user->surname }}
                </div>
                <div>Email: {{ $user->email }}</div>
                @if($user->phone)
                    <div>Phone: {{ $user->phone }}</div>
                @endif
                @if($user->address_line1)
                    <div>Address: {{ $user->address_line1 }}, {{ $user->city }}</div>
                    <div>Country: {{ $user->country }} ({{ $user->postcode }})</div>
                @endif
            </td>
        </tr>
    </table>

    <!-- Line Items Table -->
    <table class="items-table">
        <thead>
            <tr>
                <th style="width: 55%;">Description of Service</th>
                <th style="width: 15%; text-align: center;">Qty</th>
                <th style="width: 15%; text-align: right;">Unit Price</th>
                <th style="width: 15%; text-align: right;">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <strong>{{ $payment->service_name ?: 'Executive AI Token Credit Suite' }}</strong><br>
                    <span style="font-size: 10px; color: #64748b;">
                        High-Performance Neural Fitness Coaching & Multimodal Nutrition Analysis Credits
                    </span>
                </td>
                <td style="text-align: center;">1</td>
                <td style="text-align: right;">
                    {{ $payment->currency === 'GBP' ? '£' : ($payment->currency === 'USD' ? '$' : '€') }}{{ number_format($payment->amount, 2) }}
                </td>
                <td style="text-align: right; font-weight: 700;">
                    {{ $payment->currency === 'GBP' ? '£' : ($payment->currency === 'USD' ? '$' : '€') }}{{ number_format($payment->amount, 2) }}
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Totals Table -->
    <table class="totals-table">
        <tr>
            <td class="totals-label">Subtotal:</td>
            <td class="totals-value">
                {{ $payment->currency === 'GBP' ? '£' : ($payment->currency === 'USD' ? '$' : '€') }}{{ number_format($payment->amount, 2) }}
            </td>
        </tr>
        <tr>
            <td class="totals-label">VAT / Tax (0% UK B2B):</td>
            <td class="totals-value">
                {{ $payment->currency === 'GBP' ? '£' : ($payment->currency === 'USD' ? '$' : '€') }}0.00
            </td>
        </tr>
        <tr>
            <td class="totals-label grand-total">Total Paid:</td>
            <td class="totals-value grand-total">
                {{ $payment->currency === 'GBP' ? '£' : ($payment->currency === 'USD' ? '$' : '€') }}{{ number_format($payment->amount, 2) }} {{ $payment->currency }}
            </td>
        </tr>
    </table>

    <!-- Legal Notice -->
    <div class="legal-notice">
        <strong>Legal & Statutory Notice:</strong> This official B2B tax receipt is issued by CHANGE IT UP SERVICES LTD under United Kingdom corporate jurisdiction (Co. No. 16107295). In accordance with digital software licensing regulations, consumed AI tokens are non-refundable. Unused credit packs are protected by our 14-day refund policy. For billing support, contact <code>billing@fitninja.co.uk</code>.
    </div>

    <!-- Footer -->
    <div class="footer">
        © {{ date('Y') }} CHANGE IT UP SERVICES LTD (Company No. 16107295). All Rights Reserved.
    </div>

</body>
</html>
