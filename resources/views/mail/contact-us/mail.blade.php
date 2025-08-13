<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <title>Nouveau message de contact</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        
        .header {
            background: #4f46e5;
            color: white;
            padding: 30px 40px;
            text-align: center;
        }
        
        .logo {
            max-width: 150px;
            height: auto;
            margin-bottom: 15px;
            filter: brightness(0) invert(1);
        }
        
        .header h1 {
            font-size: 24px;
            font-weight: 600;
            margin: 0;
        }
        
        .content {
            padding: 40px;
        }
        
        .title {
            font-size: 20px;
            font-weight: 600;
            color: #111;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .info-row {
            display: flex;
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .label {
            font-weight: 600;
            color: #6b7280;
            width: 120px;
            flex-shrink: 0;
        }
        
        .value {
            color: #111;
            flex: 1;
        }
        
        .value a {
            color: #4f46e5;
            text-decoration: none;
        }
        
        .value a:hover {
            text-decoration: underline;
        }
        
        .message-section {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
        }
        
        .message-title {
            font-weight: 600;
            color: #6b7280;
            margin-bottom: 15px;
        }
        
        .message-content {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            padding: 20px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .footer {
            background: #f9fafb;
            padding: 25px 40px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
        }
        
        .footer a {
            color: #4f46e5;
            text-decoration: none;
        }
        
        .footer a:hover {
            text-decoration: underline;
        }
        
        .timestamp {
            margin-top: 10px;
            font-size: 12px;
            color: #9ca3af;
        }
        
        /* Responsive */
        @media only screen and (max-width: 600px) {
            .container {
                margin: 20px;
                border-radius: 0;
            }
            
            .header,
            .content,
            .footer {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 20px;
            }
            
            .title {
                font-size: 18px;
            }
            
            .info-row {
                flex-direction: column;
                gap: 5px;
            }
            
            .label {
                width: auto;
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="{{ asset('logo.png') }}" alt="{{ config('app.name') }}" class="logo">
            <h1>{{ config('app.name') }}</h1>
        </div>

        <!-- Content -->
        <div class="content">
            <h2 class="title">Nouvelle demande de contact</h2>
            
            <div class="info-row">
                <div class="label">Civilité :</div>
                <div class="value">
                    @if($civility === 'mr')
                        Monsieur
                    @elseif($civility === 'mme')
                        Madame
                    @elseif($civility === 'mlle')
                        Mademoiselle
                    @else
                        {{ ucfirst($civility) }}
                    @endif
                </div>
            </div>
            
            <div class="info-row">
                <div class="label">Nom :</div>
                <div class="value">{{ $firstName }} {{ $lastName }}</div>
            </div>
            
            <div class="info-row">
                <div class="label">Email :</div>
                <div class="value">
                    <a href="mailto:{{ $email }}">{{ $email }}</a>
                </div>
            </div>
            
            <div class="info-row">
                <div class="label">Téléphone :</div>
                <div class="value">
                    <a href="tel:{{ $phone }}">{{ $phone }}</a>
                </div>
            </div>
            
            <div class="info-row">
                <div class="label">Objet :</div>
                <div class="value">{{ $subjectMessage }}</div>
            </div>
            
            @if($company && $company !== 'Non défini')
            <div class="info-row">
                <div class="label">Société :</div>
                <div class="value">{{ $company }}</div>
            </div>
            @endif

            <div class="message-section">
                <div class="message-title">Message :</div>
                <div class="message-content">{{ $userMessage }}</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Message reçu via le formulaire de contact de 
                <a href="{{ config('app.url') }}">{{ config('app.name') }}</a>
            </p>
            <div class="timestamp">
                {{ now()->locale('fr_FR')->isoFormat('dddd DD MMMM YYYY [à] HH:mm') }}
            </div>
        </div>
    </div>
</body>
</html>