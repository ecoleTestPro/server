@component('mail::message')
# 📅 Confirmation de rendez-vous

Bonjour **{{ $clientName }}**,

Votre rendez-vous a été confirmé avec succès ! Voici les détails :

@component('mail::panel')
**📅 Date :** {{ $appointmentDate }}  
**⏰ Heure :** {{ $appointmentTime }} - {{ $endTime }} ({{ $duration }} minutes)  
**📝 Sujet :** {{ $appointment->title }}  
@if($appointment->description)
**💬 Description :** {{ $appointment->description }}
@endif
@endcomponent

## Informations importantes

- **Soyez ponctuel :** Merci d'arriver 5 minutes avant l'heure prévue
- **Contact :** En cas d'imprévu, contactez-nous au plus vite
- **Matériel :** Préparez tous les documents nécessaires à votre demande

@if($appointment->client_phone)
**📞 Votre téléphone :** {{ $appointment->client_phone }}
@endif

## Besoin d'aide ?

Si vous avez des questions ou devez reporter votre rendez-vous, n'hésitez pas à nous contacter.

@component('mail::button', ['url' => config('app.url')])
🌐 Visiter notre site
@endcomponent

---

*Merci de votre confiance,*  
**L'équipe {{ config('app.name') }}**

<small>Cet email a été envoyé automatiquement, merci de ne pas y répondre directement.</small>
@endcomponent