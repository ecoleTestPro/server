<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEST PRO - Site en Maintenance</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');

        :root {
            --primary-text-color: #2c3e50;
            --secondary-text-color: #7f8c8d;
            --background-color: #ecf0f1;
        }

        body {
            font-family: 'Montserrat', sans-serif;
            background-color: var(--background-color);
            color: var(--primary-text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            text-align: center;
            line-height: 1.6;
        }

        .container {
            max-width: 700px;
            width: 100%;
            background: #ffffff;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
            animation: fadeIn 1.5s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .logo {
            max-width: 250px;
            height: auto;
            margin-bottom: 40px;
        }

        h1 {
            font-size: 2.5em;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 10px;
            letter-spacing: -1px;
            color: #37A74B;
        }

        .subtitle {
            font-size: 1.2em;
            font-weight: 400;
            color: var(--secondary-text-color);
            margin-bottom: 30px;
        }

        p {
            font-size: 1em;
            color: var(--secondary-text-color);
            margin: 0 0 15px;
        }

        .contact-link {
            display: inline-block;
            margin-top: 25px;
            padding: 12px 25px;
            background-color: #1877F8;
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .contact-link:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="logo.jpg" alt="Logo de l'École TestPro" class="logo">
        <h1>Nous faisons peau neuve!</h1>
        <div class="subtitle">Notre site se fait une toilette pour quelques heures.</div>
        <p>
            Nous travaillons activement pour vous offrir une meilleure expérience. Nous vous prions de bien vouloir excuser la gêne occasionnée.
        </p>
        <p>
            Revenez nous voir très bientôt !
        </p>
        <a href="mailto:info@testpro-group.com" class="contact-link">Contactez-nous</a>
    </div>
</body>
</html>