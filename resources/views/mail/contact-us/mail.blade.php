<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle demande de contact</title>
    <style>
        /* Reset default email client styles */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #333333;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #2c3e50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }

        .header img {
            max-width: 150px;
            height: auto;
        }

        .content {
            padding: 30px;
        }

        h1 {
            font-size: 24px;
            color: #2c3e50;
            margin: 0 0 20px;
            font-weight: 600;
        }

        p {
            margin: 10px 0;
            font-size: 16px;
        }

        .label {
            font-weight: bold;
            color: #2c3e50;
        }

        .message {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #3498db;
            border-radius: 4px;
            margin-top: 15px;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
            border-top: 1px solid #dddddd;
        }

        .footer a {
            color: #3498db;
            text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
            .container {
                margin: 10px;
                border-radius: 0;
            }

            .content {
                padding: 20px;
            }

            h1 {
                font-size: 20px;
            }

            p {
                font-size: 14px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <!-- Replace with your logo URL or remove if not needed -->
            <img src="{{ asset('logo.png') }}" alt="TestPro">
        </div>
        <div class="content">
            <h1>Nouvelle demande de contact</h1>
            <p><span class="label">Civilité :</span> {{ $civility }}</p>
            <p><span class="label">Prénom :</span> {{ $firstName }}</p>
            <p><span class="label">Nom :</span> {{ $lastName }}</p>
            <p><span class="label">Email :</span> {{ $email }}</p>
            <p><span class="label">Téléphone :</span> {{ $phone }}</p>
            <p><span class="label">Objet :</span> {{ $subjectMessage }}</p>
            <p><span class="label">Message :</span></p>
            <div class="message">{{ $userMessage }}</div>
            @if ($company)
                <p><span class="label">Société :</span> {{ $company }}</p>
            @endif
        </div>
        <div class="footer">
            <p>Reçu via le formulaire de contact de <a href="{{ config('app.url') }}">{{ config('app.name') }}</a></p>
            {{-- <p>Contactez-nous : <a href="mailto:keraste38@gmail.com">keraste38@gmail.com</a></p> --}}
        </div>
    </div>
</body>

</html>
