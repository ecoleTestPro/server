@extends('errors::minimal')

@section('title', __('Page introuvable'))
@section('code', '404')
@section('message')
    Désolé, la page que vous recherchez n'existe pas.
    <a href="{{ url('/') }}">Retour à l'accueil</a>
@endsection
