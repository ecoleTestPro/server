# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TestPro LMS - A Laravel + Inertia.js + React + TypeScript Learning Management System for managing training courses, certifications, enrollments, and company services.

## Essential Commands

### Development
```bash
# Start development environment (runs all services concurrently)
npm run dev

# Start Laravel development server only
php artisan serve

# Run queue worker for background jobs
php artisan queue:work

# Watch Laravel logs
php artisan pail

# Build frontend assets
npm run build

# Build with SSR
npm run build:ssr
```

### Code Quality
```bash
# Run TypeScript type checking
npm run types

# Lint and auto-fix code
npm run lint

# Format code with Prettier
npm run format

# Run PHP tests with Pest
php artisan test

# Run specific test
php artisan test --filter="test_name"
```

### Database & Migrations
```bash
# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Refresh database with seeders
php artisan migrate:fresh --seed

# Create new migration
php artisan make:migration create_table_name
```

## Architecture & Key Patterns

### Full-Stack Architecture
- **Backend**: Laravel 12 with Repository pattern for data access
- **Frontend-Backend Bridge**: Inertia.js for SPA-like experience without API
- **Frontend**: React 19 with TypeScript, using Shadcn/UI components
- **Styling**: Tailwind CSS 4.0 with custom configuration
- **State Management**: React Context + Inertia's shared props

### Laravel Structure
```
app/
├── Http/Controllers/
│   ├── Private/         # Authenticated user controllers (CourseController, EnrollmentController, etc.)
│   ├── Public/          # Public controllers (AppointmentController, etc.)
│   └── Admin/           # Admin-specific controllers
├── Models/              # Eloquent models using SoftDeletes trait where applicable
├── Repositories/        # Data access layer (CourseRepository, MediaRepository, etc.)
└── Services/           # Business logic services
```

### Frontend Structure
```
resources/js/
├── pages/              # Inertia pages (routed components)
│   ├── dashboard/      # Admin dashboard pages
│   └── public/         # Public-facing pages
├── components/
│   ├── ui/            # Reusable Shadcn/UI components (DataTable, Dialog, etc.)
│   ├── courses/       # Course-related components
│   └── enrollments/   # Enrollment-related components
└── types/             # TypeScript type definitions
```

### Key Architectural Decisions

1. **Soft Deletes**: Most models use Laravel's SoftDeletes trait (courses, categories, etc.)
2. **Repository Pattern**: All data access through repositories (e.g., CourseRepository::query())
3. **Inertia.js Props**: Data passed from Laravel to React via Inertia props, typed in SharedData interface
4. **Component Patterns**:
   - DataTable component with sticky actions column for scrollable tables
   - Toast notifications using react-hot-toast
   - Dialog components for confirmations
5. **File Storage**: MediaRepository handles file uploads with type enums (IMAGE, VIDEO, etc.)

### Database Relationships
- **Course** → has many **CourseSession** → has many **Enrollment**
- **Course** → belongs to **Category** (with soft delete support)
- **Course** → belongs to many **Partner**
- **Enrollment** → belongs to **User** and **Course**

### Routes Organization
- **Dashboard routes** (`/dashboard/*`): Protected by auth middleware in `routes/dashboard.php`
- **Public routes**: Defined in `routes/web.php`
- **API-style routes**: Use Inertia responses, not JSON APIs

### Form Handling
- Laravel FormRequests for validation (CourseStoreRequest, CourseUpdateRequest)
- React Hook Form with Zod validation on frontend
- File uploads handled through MediaRepository

### Authentication & Authorization
- JWT authentication with tymon/jwt-auth
- Spatie Laravel Permissions for roles
- Middleware protection for dashboard routes

## Development Notes

### TypeScript Path Aliases
```typescript
// Use @/ for imports from resources/js/
import { Button } from '@/components/ui/button';
import { ICourse } from '@/types/course';
```

### Inertia.js Page Props
All Inertia pages receive SharedData props containing:
- `auth` (user info)
- `data` (page-specific data like courses, categories)
- `flash` (flash messages)

### Common Patterns

**Soft Delete Handling**:
- When deleting courses with enrollments, system allows deletion but shows warning
- Deleted courses show "Formation supprimée" badge in enrollment lists
- Use `withTrashed()` to include soft-deleted records in queries

**DataTable Usage**:
- Pass columns definition and data to DataTable component
- Actions column with id='actions' automatically becomes sticky on scroll
- Supports search, pagination, and column visibility toggles

**Toast Notifications**:
```typescript
toast.success('Operation successful');
toast.error('An error occurred');
```

**Route Generation**:
```typescript
// Use Ziggy's route helper
route('dashboard.course.delete', course.id)
```

### Testing Approach
- PHP tests use Pest framework with PHPUnit compatibility
- Test database uses SQLite in-memory
- Feature tests in `tests/Feature/`
- Unit tests in `tests/Unit/`

### Deployment
- GitHub Actions workflow deploys to FTP on push to main/develop/release branches
- Assets built with Vite before deployment
- Environment-specific `.env` files for configuration