param(
    [Parameter(Position = 0)]
    [string]$Task = "help"
)

$ErrorActionPreference = "Stop"

$Compose = @("docker", "compose", "-f", "docker-compose.yml")
$ComposeDev = $Compose + @("--profile", "dev")

function Write-Info {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Green
}

function Write-Warn {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Yellow
}

function Invoke-Compose {
    param([string[]]$Arguments)
    $Command = $Compose[0]
    $BaseArguments = $Compose[1..($Compose.Length - 1)]
    & $Command @BaseArguments @Arguments
}

function Invoke-ComposeDev {
    param([string[]]$Arguments)
    $Command = $ComposeDev[0]
    $BaseArguments = $ComposeDev[1..($ComposeDev.Length - 1)]
    & $Command @BaseArguments @Arguments
}

function Invoke-App {
    param([string[]]$Arguments)
    Invoke-Compose (@("exec", "app") + $Arguments)
}

function Show-Help {
    Write-Host ""
    Write-Host "Usage: .\make.ps1 <commande>" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Docker" -ForegroundColor Yellow
    Write-Host "  dev               Demarrer en mode developpement"
    Write-Host "  prod              Demarrer en mode production"
    Write-Host "  stop              Arreter tous les conteneurs"
    Write-Host "  build             Construire les images"
    Write-Host "  clean             Nettoyer volumes et conteneurs"
    Write-Host "  status            Statut des conteneurs"
    Write-Host "  logs              Logs de tous les services"
    Write-Host "  logs-app          Logs app"
    Write-Host "  logs-mysql        Logs mysql"
    Write-Host "  logs-redis        Logs redis"
    Write-Host "  shell             Shell dans le conteneur app"
    Write-Host ""
    Write-Host "Services individuels" -ForegroundColor Yellow
    Write-Host "  up-app            Demarrer app"
    Write-Host "  up-mysql          Demarrer MySQL"
    Write-Host "  up-redis          Demarrer Redis"
    Write-Host "  up-phpmyadmin     Demarrer phpMyAdmin"
    Write-Host "  up-mailhog        Demarrer MailHog"
    Write-Host ""
    Write-Host "Laravel" -ForegroundColor Yellow
    Write-Host "  migrate           Migrations"
    Write-Host "  fresh             Reset BDD + migrations + seeders"
    Write-Host "  seed              Seeders"
    Write-Host "  test              Tests"
    Write-Host "  tinker            Tinker"
    Write-Host "  cache-clear       Vider les caches"
    Write-Host "  optimize          Optimiser l'application"
    Write-Host ""
    Write-Host "Dependances" -ForegroundColor Yellow
    Write-Host "  composer-install  Installer dependances PHP"
    Write-Host "  npm-install       Installer dependances Node"
    Write-Host "  npm-build         Build assets production"
    Write-Host "  npm-dev           Lancer Vite dev server"
    Write-Host ""
    Write-Host "Installation" -ForegroundColor Yellow
    Write-Host "  install           Installation complete"
    Write-Host ""
}

switch ($Task) {
    "dev" {
        Write-Info "Starting dev..."
        Invoke-ComposeDev @("up", "-d")
        Write-Success "Ready!"
        Write-Host "   App:        http://localhost"
        Write-Host "   phpMyAdmin: http://localhost:8099"
        Write-Host "   MailHog:    http://localhost:8025"
    }
    "prod" {
        Write-Info "Starting prod..."
        Invoke-Compose @("up", "-d", "app", "mysql", "redis")
        Write-Success "Production ready!"
    }
    "stop" {
        Invoke-ComposeDev @("down")
        Write-Success "Stopped"
    }
    "build" {
        Invoke-Compose @("build", "--no-cache")
    }
    "clean" {
        Invoke-ComposeDev @("down", "-v", "--remove-orphans")
        docker system prune -f
        Write-Success "Cleaned"
    }
    "status" {
        Invoke-Compose @("ps", "-a")
    }
    "logs" {
        Invoke-Compose @("logs", "-f")
    }
    "logs-app" {
        Invoke-Compose @("logs", "-f", "app")
    }
    "logs-mysql" {
        Invoke-Compose @("logs", "-f", "mysql")
    }
    "logs-redis" {
        Invoke-Compose @("logs", "-f", "redis")
    }
    "shell" {
        Invoke-App @("sh")
    }
    "up-app" {
        Invoke-Compose @("up", "-d", "app")
    }
    "up-mysql" {
        Invoke-Compose @("up", "-d", "mysql")
    }
    "up-redis" {
        Invoke-Compose @("up", "-d", "redis")
    }
    "up-phpmyadmin" {
        Invoke-ComposeDev @("up", "-d", "phpmyadmin")
    }
    "up-mailhog" {
        Invoke-ComposeDev @("up", "-d", "mailhog")
    }
    "migrate" {
        Invoke-App @("php", "artisan", "migrate")
    }
    "fresh" {
        Invoke-App @("php", "artisan", "migrate:fresh", "--seed")
    }
    "seed" {
        Invoke-App @("php", "artisan", "db:seed")
    }
    "test" {
        Invoke-App @("php", "artisan", "test")
    }
    "tinker" {
        Invoke-App @("php", "artisan", "tinker")
    }
    "cache-clear" {
        Invoke-App @("php", "artisan", "optimize:clear")
    }
    "optimize" {
        Invoke-App @("php", "artisan", "optimize")
    }
    "composer-install" {
        Invoke-App @("composer", "install")
    }
    "npm-install" {
        Invoke-App @("npm", "install", "--legacy-peer-deps")
    }
    "npm-build" {
        Invoke-App @("npm", "run", "build")
    }
    "npm-dev" {
        Invoke-App @("npm", "run", "dev")
    }
    "install" {
        & $PSCommandPath build
        & $PSCommandPath dev
        Write-Warn "Waiting for services..."
        Start-Sleep -Seconds 15
        & $PSCommandPath composer-install
        & $PSCommandPath npm-install
        & $PSCommandPath migrate
        & $PSCommandPath seed
        Invoke-App @("php", "artisan", "storage:link")
        & $PSCommandPath npm-build
        Write-Success "Installation complete!"
    }
    "help" {
        Show-Help
    }
    default {
        Write-Host "Commande inconnue: $Task" -ForegroundColor Red
        Show-Help
        exit 1
    }
}
