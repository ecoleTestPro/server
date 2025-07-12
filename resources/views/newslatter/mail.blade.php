<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $subject ?? config('app.name') }}</title>
</head>
<body>
    <p>{!! nl2br(e($content)) !!}</p>
</body>
</html>
