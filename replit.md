# Genjiko Safety - Italian B2B Distribution Hub

## Overview

This is a B2B-focused landing page and inquiry system for Genjiko Safety, an Italian distribution hub specializing in safety and compliance products. The application serves as a professional presence for manufacturers, distributors, and business partners in the safety equipment industry, covering safety signage (DIN/ISO/EN), fire protection equipment, evacuation solutions, and emergency preparedness products.

The system provides a multi-language landing page (English, Italian, German) with a contact form that stores business inquiries in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion

The frontend uses a minimalist B2B design with square corners (border-radius: 0) and a professional color palette derived from Italian flag colors (green/red) and navy blue.

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with typed route definitions in `shared/routes.ts`
- **Validation**: Zod schemas shared between frontend and backend via `shared/schema.ts`

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` contains table definitions
- **Migrations**: Managed via `drizzle-kit push`

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # UI components including shadcn/ui
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities and query client
│       └── pages/        # Page components
├── server/           # Express backend
│   ├── db.ts         # Database connection
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Data access layer
│   └── static.ts     # Static file serving
├── shared/           # Shared code between frontend/backend
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API route type definitions
└── migrations/       # Database migrations
```

### Build System
- **Development**: Vite dev server with HMR proxied through Express
- **Production Build**: Vite builds frontend to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Path Aliases**: `@/` for client source, `@shared/` for shared code

### Multi-language Implementation
Language switching is implemented client-side using React state with a dictionary object containing translations for English, Italian, and German. No external i18n library is used.

## External Dependencies

### Database
- **PostgreSQL**: Required, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage (available but not currently active)

### UI Libraries
- **Radix UI**: Full suite of accessible primitive components
- **shadcn/ui**: Pre-built component system using Radix + Tailwind
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel functionality
- **Vaul**: Drawer component
- **cmdk**: Command palette component

### Development Tools
- **Replit Plugins**: Runtime error overlay, cartographer, dev banner (development only)
- **Drizzle Kit**: Database schema management

### Fonts
- Inter (sans-serif primary)
- JetBrains Mono (monospace)
- Google Fonts CDN integration