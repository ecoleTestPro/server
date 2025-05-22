## Running the Project with Docker

This project provides a multi-stage Docker setup for running a PHP 8.2 (FPM) application with a Node.js 20 frontend build. The recommended way to run the project is via Docker Compose, which builds and orchestrates all required services.

### Project-Specific Requirements
- **PHP Version:** 8.2 (FPM, Alpine)
- **Node.js Version:** 20 (Alpine)
- **Composer Version:** 2.7
- **System Dependencies:** ICU, libzip, oniguruma, sqlite, zlib, libpng, jpeg, freetype, git, curl
- **PHP Extensions:** pdo, pdo_mysql, pdo_sqlite, intl, zip, bcmath, opcache, gd (with freetype and jpeg)

### Environment Variables
- The application expects environment variables as defined in `.env.example` (copy to `.env` and adjust as needed).
- The Docker Compose file includes a commented `env_file: ./.env` line. Uncomment this if you want Docker Compose to load environment variables from your `.env` file.

### Build and Run Instructions
1. **Copy and configure environment variables:**
   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```
2. **Build and start the application:**
   ```sh
   docker compose up --build
   ```
   This will:
   - Build PHP dependencies with Composer (production mode)
   - Build frontend assets with Node.js and Vite
   - Assemble everything into a production-ready PHP-FPM container

### Special Configuration
- **Writable Directories:** The Dockerfile ensures `storage/` and `bootstrap/cache/` are writable by the application user.
- **Frontend Assets:** Built automatically during the Docker build process; no need to run `npm run build` manually.
- **User:** The application runs as a non-root user (`appuser`) for improved security.
- **Port Exposure:**
  - The PHP-FPM service exposes port **9000** (for use with a web server like Nginx; no web server is included in this setup).

### Ports
- **php-app:** `9000:9000` (PHP-FPM)

### Notes
- If you need a web server (e.g., Nginx) to serve the application, you must add it to the `docker-compose.yml` and configure it to connect to the `php-app` service on port 9000.
- For database or cache services, add them to `docker-compose.yml` and update your `.env` accordingly.
