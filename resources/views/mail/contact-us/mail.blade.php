<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Nouvelle demande de contact - {{ config('app.name') }}</title>
    
    <style>
        /* Client-specific Styles */
        #MessageViewBody a { color: inherit; text-decoration: none; }
        .ReadMsgBody { width: 100%; }
        .ExternalClass { width: 100%; }
        .ExternalClass * { line-height: 100%; }
        
        /* Reset styles */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        table {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        
        /* Main container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }
        
        .wrapper {
            padding: 40px 20px;
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
            padding: 32px 24px;
            text-align: center;
            position: relative;
        }
        
        .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #06b6d4, #10b981, #f59e0b);
        }
        
        .logo-container {
            margin-bottom: 16px;
        }
        
        .logo {
            max-width: 180px;
            height: auto;
            filter: brightness(0) invert(1);
        }
        
        .header-title {
            color: #ffffff;
            font-size: 24px;
            font-weight: 600;
            margin: 0;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .header-subtitle {
            color: #cbd5e1;
            font-size: 14px;
            margin: 8px 0 0 0;
            font-weight: 400;
        }
        
        /* Content */
        .content {
            padding: 40px 32px;
            background-color: #ffffff;
        }
        
        .content-title {
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
            margin: 0 0 24px 0;
            display: flex;
            align-items: center;
        }
        
        .content-title::before {
            content: '📧';
            margin-right: 8px;
            font-size: 24px;
        }
        
        /* Contact info cards */
        .info-grid {
            display: grid;
            gap: 16px;
            margin-bottom: 32px;
        }
        
        .info-card {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            display: flex;
            align-items: flex-start;
            transition: all 0.2s ease;
        }
        
        .info-card:hover {
            border-color: #3b82f6;
            box-shadow: 0 1px 3px rgba(59, 130, 246, 0.1);
        }
        
        .info-label {
            font-weight: 600;
            color: #475569;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            min-width: 100px;
            margin-right: 16px;
        }
        
        .info-value {
            color: #1e293b;
            font-weight: 500;
            flex: 1;
        }
        
        /* Message section */
        .message-section {
            margin-top: 32px;
        }
        
        .message-title {
            font-weight: 600;
            color: #475569;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
        }
        
        .message-content {
            background: linear-gradient(135deg, #f1f5f9 0%, #f8fafc 100%);
            border: 1px solid #e2e8f0;
            border-left: 4px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            font-size: 15px;
            line-height: 1.7;
            color: #334155;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        /* Company info */
        .company-info {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border: 1px solid #f59e0b;
            border-radius: 8px;
            padding: 16px;
            margin-top: 24px;
            display: flex;
            align-items: center;
        }
        
        .company-info::before {
            content: '🏢';
            font-size: 20px;
            margin-right: 12px;
        }
        
        .company-label {
            font-weight: 600;
            color: #92400e;
            margin-right: 8px;
        }
        
        .company-name {
            color: #78350f;
            font-weight: 500;
        }
        
        /* Footer */
        .footer {
            background-color: #f1f5f9;
            padding: 32px 24px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .footer-content {
            font-size: 14px;
            color: #64748b;
            line-height: 1.5;
        }
        
        .footer-link {
            color: #3b82f6;
            text-decoration: none;
            font-weight: 500;
        }
        
        .footer-link:hover {
            color: #1d4ed8;
            text-decoration: underline;
        }
        
        .footer-divider {
            width: 40px;
            height: 2px;
            background: linear-gradient(90deg, #06b6d4, #10b981);
            margin: 16px auto;
            border-radius: 1px;
        }
        
        .timestamp {
            font-size: 12px;
            color: #94a3b8;
            margin-top: 16px;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .wrapper {
                padding: 20px 16px !important;
            }
            
            .email-container {
                margin: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
            }
            
            .header {
                padding: 24px 16px !important;
            }
            
            .content {
                padding: 24px 16px !important;
            }
            
            .header-title {
                font-size: 20px !important;
            }
            
            .content-title {
                font-size: 18px !important;
            }
            
            .info-card {
                flex-direction: column;
                gap: 8px;
            }
            
            .info-label {
                min-width: auto;
                margin-right: 0;
            }
            
            .footer {
                padding: 24px 16px !important;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            [data-ogsc] .email-container {
                background-color: #1e293b !important;
            }
            
            [data-ogsc] .content {
                background-color: #1e293b !important;
            }
            
            [data-ogsc] .content-title,
            [data-ogsc] .info-value {
                color: #f1f5f9 !important;
            }
            
            [data-ogsc] .info-card {
                background-color: #334155 !important;
                border-color: #475569 !important;
            }
            
            [data-ogsc] .message-content {
                background-color: #334155 !important;
                color: #e2e8f0 !important;
                border-color: #475569 !important;
            }
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="email-container">
            <!-- Header -->
            <div class="header">
                <div class="logo-container">
                    <img src="{{ asset('logo.png') }}" alt="{{ config('app.name') }}" class="logo">
                </div>
                <h1 class="header-title">{{ config('app.name') }}</h1>
                <p class="header-subtitle">Plateforme de formation professionnelle</p>
            </div>

            <!-- Content -->
            <div class="content">
                <h2 class="content-title">Nouvelle demande de contact</h2>
                
                <div class="info-grid">
                    <div class="info-card">
                        <span class="info-label">Civilité</span>
                        <span class="info-value">
                            @if($civility === 'mr')
                                Monsieur
                            @elseif($civility === 'mme')
                                Madame
                            @elseif($civility === 'mlle')
                                Mademoiselle
                            @else
                                {{ ucfirst($civility) }}
                            @endif
                        </span>
                    </div>
                    
                    <div class="info-card">
                        <span class="info-label">Nom complet</span>
                        <span class="info-value">{{ $firstName }} {{ $lastName }}</span>
                    </div>
                    
                    <div class="info-card">
                        <span class="info-label">Email</span>
                        <span class="info-value">
                            <a href="mailto:{{ $email }}" style="color: #3b82f6; text-decoration: none;">{{ $email }}</a>
                        </span>
                    </div>
                    
                    <div class="info-card">
                        <span class="info-label">Téléphone</span>
                        <span class="info-value">
                            <a href="tel:{{ $phone }}" style="color: #3b82f6; text-decoration: none;">{{ $phone }}</a>
                        </span>
                    </div>
                    
                    <div class="info-card">
                        <span class="info-label">Objet</span>
                        <span class="info-value">{{ $subjectMessage }}</span>
                    </div>
                </div>

                @if($company && $company !== 'Non défini')
                    <div class="company-info">
                        <span class="company-label">Société :</span>
                        <span class="company-name">{{ $company }}</span>
                    </div>
                @endif

                <div class="message-section">
                    <h3 class="message-title">Message</h3>
                    <div class="message-content">{{ $userMessage }}</div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                <div class="footer-content">
                    <p>Ce message a été envoyé via le formulaire de contact de 
                        <a href="{{ config('app.url') }}" class="footer-link">{{ config('app.name') }}</a>
                    </p>
                    <div class="footer-divider"></div>
                    <p class="timestamp">
                        Reçu le {{ now()->locale('fr_FR')->isoFormat('dddd DD MMMM YYYY [à] HH:mm') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>