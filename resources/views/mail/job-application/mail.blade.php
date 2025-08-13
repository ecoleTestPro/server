<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle candidature - {{ $jobOffer->title }}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .header p {
            margin: 8px 0 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content {
            padding: 30px 20px;
        }
        .section {
            background: #f8fafc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            border-left: 4px solid #667eea;
        }
        .section h2 {
            margin: 0 0 15px 0;
            font-size: 18px;
            color: #1a202c;
            display: flex;
            align-items: center;
        }
        .section h2::before {
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #667eea;
            margin-right: 10px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
        }
        .info-item {
            background: white;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e2e8f0;
        }
        .info-label {
            font-size: 12px;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.05em;
            margin-bottom: 5px;
        }
        .info-value {
            font-size: 14px;
            color: #1a202c;
            font-weight: 500;
        }
        .job-title {
            font-size: 20px;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 10px;
        }
        .status-badge {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }
        .attachment-info {
            background: #ecfdf5;
            border: 1px dashed #10b981;
            border-radius: 6px;
            padding: 15px;
            text-align: center;
            margin-top: 15px;
        }
        .attachment-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .footer {
            background: #1a202c;
            color: #a0aec0;
            padding: 20px;
            text-align: center;
            font-size: 14px;
        }
        .footer strong {
            color: #e2e8f0;
        }
        .priority {
            background: #fee2e2;
            border-color: #ef4444;
        }
        .priority h2::before {
            background: #ef4444;
        }
        @media only screen and (max-width: 600px) {
            .info-grid {
                grid-template-columns: 1fr;
            }
            .container {
                margin: 10px;
                width: calc(100% - 20px);
            }
            .header, .content {
                padding: 20px 15px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎯 Nouvelle Candidature Reçue</h1>
            <p>{{ $applicationDate }}</p>
        </div>

        <div class="content">
            <!-- Section Candidat -->
            <div class="section priority">
                <h2>👤 Informations du Candidat</h2>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Nom complet</div>
                        <div class="info-value">{{ $candidateName }}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Email</div>
                        <div class="info-value">
                            <a href="mailto:{{ $candidateEmail }}" style="color: #667eea; text-decoration: none;">
                                {{ $candidateEmail }}
                            </a>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Téléphone</div>
                        <div class="info-value">
                            <a href="tel:{{ $candidatePhone }}" style="color: #667eea; text-decoration: none;">
                                {{ $candidatePhone }}
                            </a>
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Date de candidature</div>
                        <div class="info-value">{{ $applicationDate }}</div>
                    </div>
                </div>
                
                <div class="attachment-info">
                    <div class="attachment-icon">📎</div>
                    <strong>CV Joint :</strong> {{ $cvFileName }}<br>
                    <small style="color: #64748b;">Taille: {{ $cvFileSize }}</small>
                </div>
            </div>

            <!-- Section Offre d'emploi -->
            <div class="section">
                <h2>💼 Détails de l'Offre</h2>
                <div class="job-title">{{ $jobOffer->title }}</div>
                <div class="status-badge">{{ $jobOffer->is_active ? 'Active' : 'Inactive' }}</div>
                
                <div class="info-grid" style="margin-top: 15px;">
                    <div class="info-item">
                        <div class="info-label">ID de l'offre</div>
                        <div class="info-value">#{{ $jobOffer->id }}</div>
                    </div>
                    @if($jobOffer->company)
                    <div class="info-item">
                        <div class="info-label">Entreprise</div>
                        <div class="info-value">{{ $jobOffer->company }}</div>
                    </div>
                    @endif
                    @if($jobOffer->location)
                    <div class="info-item">
                        <div class="info-label">Localisation</div>
                        <div class="info-value">📍 {{ $jobOffer->location }}</div>
                    </div>
                    @endif
                    @if($jobOffer->type)
                    <div class="info-item">
                        <div class="info-label">Type de contrat</div>
                        <div class="info-value">{{ $jobOffer->type }}</div>
                    </div>
                    @endif
                    @if($jobOffer->salary)
                    <div class="info-item">
                        <div class="info-label">Salaire</div>
                        <div class="info-value">💰 {{ number_format($jobOffer->salary, 0, ',', ' ') }} €/an</div>
                    </div>
                    @endif
                    @if($jobOffer->expires_at)
                    <div class="info-item">
                        <div class="info-label">Date d'expiration</div>
                        <div class="info-value">⏰ {{ \Carbon\Carbon::parse($jobOffer->expires_at)->format('d/m/Y') }}</div>
                    </div>
                    @endif
                </div>

                @if($jobOffer->description)
                <div style="margin-top: 15px;">
                    <div class="info-label">Description du poste</div>
                    <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin-top: 5px;">
                        {{ Str::limit(strip_tags($jobOffer->description), 300) }}
                    </div>
                </div>
                @endif
            </div>

            <!-- Section Actions -->
            <div class="section">
                <h2>⚡ Actions Rapides</h2>
                <p style="margin: 0 0 15px 0; color: #64748b;">
                    Vous pouvez directement répondre à ce candidat en utilisant les liens ci-dessous :
                </p>
                <div style="text-align: center;">
                    <a href="mailto:{{ $candidateEmail }}?subject=Re: Candidature pour {{ $jobOffer->title }}&body=Bonjour {{ $candidateName }},%0D%0A%0D%0ANous avons bien reçu votre candidature pour le poste de {{ $jobOffer->title }}.%0D%0A%0D%0ACordialement," 
                       style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: 600;">
                        📧 Répondre par Email
                    </a>
                    <a href="tel:{{ $candidatePhone }}" 
                       style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 5px; font-weight: 600;">
                        📞 Appeler le Candidat
                    </a>
                </div>
            </div>
        </div>

        <div class="footer">
            <strong>{{ config('app.name') }}</strong><br>
            Système de gestion des candidatures automatisé<br>
            <small>Ce message a été généré automatiquement le {{ $applicationDate }}</small>
        </div>
    </div>
</body>
</html>