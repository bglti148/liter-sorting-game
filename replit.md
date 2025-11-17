# Eco Sorter - Recycling Game

## Overview

Eco Sorter is an educational 3D browser game that teaches players about waste sorting and recycling. Built with React, Three.js, and Express, the game challenges users to sort litter items into the correct bins (recycling, compost, or trash) within a time limit. Players earn points for correct sorting and learn environmental facts about recycling and composting.

The application uses a modern full-stack architecture with a React frontend featuring 3D graphics, state management through Zustand, and a minimal Express backend prepared for future database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**
- React 18 with TypeScript for type-safe UI development
- Vite as the build tool and development server for fast HMR and optimized builds
- TailwindCSS for utility-first styling with a custom design system

**3D Graphics Engine**
- React Three Fiber (@react-three/fiber) provides React bindings for Three.js
- React Three Drei (@react-three/drei) adds useful helpers and abstractions for 3D scenes
- React Three Postprocessing for visual effects
- GLSL shader support via vite-plugin-glsl for custom graphics

**State Management**
- Zustand with subscribeWithSelector middleware manages all application state
- Separate stores for different concerns:
  - `useRecyclingGame`: Core game logic (score, timer, litter items, bin sorting)
  - `useAudio`: Sound effects and background music management
  - `useGame`: Basic game phase transitions (legacy, partially superseded by useRecyclingGame)

**Component Architecture**
- Game components organized by feature:
  - `RecyclingGame`: Main game container managing phase transitions
  - `GameScene`: 3D scene setup with Three.js canvas
  - `GameHUD`: 2D overlay showing score, timer, and feedback
  - `LitterObject`: Individual 3D litter items with interaction
  - `Bins`: Three recycling bins with click detection
  - `ParkBackground`: Environmental scenery
  - `StartScreen` / `EndScreen`: Game flow UI
  - `SoundManager`: Audio initialization and control

**UI Component Library**
- Radix UI primitives provide accessible, unstyled components
- Custom shadcn/ui components built on Radix with Tailwind styling
- Supports theme customization via CSS custom properties

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript for type safety
- Minimal REST API structure prepared for future endpoints
- Middleware for JSON parsing, URL encoding, and request logging

**Development Environment**
- Custom Vite integration in development mode with middleware mode enabled
- Hot Module Replacement (HMR) over the HTTP server
- Runtime error overlay for development debugging
- Separate production build process bundling with esbuild

**Storage Layer**
- Abstract `IStorage` interface defines CRUD operations
- `MemStorage` provides in-memory implementation for development/testing
- Database schema defined with Drizzle ORM ready for PostgreSQL migration
- User schema includes basic authentication fields (username, password)

**Routing Structure**
- Routes registered in `server/routes.ts`
- API routes prefixed with `/api` by convention
- HTTP server created and returned for Vite middleware integration

### Data Storage Solutions

**ORM and Schema Management**
- Drizzle ORM with Drizzle Kit for schema management and migrations
- PostgreSQL dialect configured for production use
- Schema defined in `shared/schema.ts` for type sharing between client/server
- Zod schemas generated from Drizzle schemas for runtime validation

**Database Configuration**
- Neon serverless PostgreSQL driver (@neondatabase/serverless)
- Connection via `DATABASE_URL` environment variable
- Migration files output to `./migrations` directory
- Push-based schema updates via `db:push` script

**Current Implementation**
- In-memory storage (`MemStorage`) used during development
- User entity with id, username, and password fields
- Prepared for database integration without code changes via interface abstraction

### External Dependencies

**Third-Party Services**
- No external API integrations currently implemented
- Prepared for Neon PostgreSQL serverless database hosting

**Asset Dependencies**
- Font loading via @fontsource/inter for consistent typography
- Audio files (background music, sound effects) served as static assets
- 3D model support for GLTF/GLB formats (configured but not currently used)
- Texture files for park background rendering

**Build and Development Tools**
- TypeScript for static type checking across full stack
- ESLint and PostCSS for code quality and CSS processing
- Path aliases configured for clean imports (`@/` for client, `@shared/` for shared code)
- React Query (@tanstack/react-query) installed but not currently utilized

**UI Framework Dependencies**
- Extensive Radix UI component library for accessible primitives
- Class Variance Authority (CVA) for component variant management
- clsx and tailwind-merge for conditional class name composition
- Lucide React for icon system