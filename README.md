# Eco Sorter - Recycling Game

## Overview

Eco Sorter is an educational 2D browser game that teaches players about waste sorting and recycling. Built with React, TypeScript, and Express, the game challenges users to sort litter items into the correct bins (recycling, compost, or trash) within a time limit. Players earn points for correct sorting and learn environmental facts about recycling and composting.

The application uses a modern full-stack architecture with a React frontend featuring a clean 2D interface with HTML/CSS positioning, emoji icons for litter items, custom bin images, and a park background. Game state is managed through Zustand, with a minimal Express backend prepared for future database integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**
- React 18 with TypeScript for type-safe UI development
- Vite as the build tool and development server for fast HMR and optimized builds
- TailwindCSS for utility-first styling with a custom design system

**2D Graphics Implementation**
- Pure HTML/CSS/DOM-based rendering (converted from 3D to 2D)
- Litter items rendered as emoji icons in positioned button elements
- Custom bin images (recycling, compost, trash) with hover effects
- Park background image with green overlay feedback system
- CSS positioning for item distribution across the playable area

**State Management**
- Zustand with subscribeWithSelector middleware manages all application state
- Separate stores for different concerns:
  - `useRecyclingGame`: Core game logic (score, timer, litter items, bin sorting)
  - `useAudio`: Sound effects and background music management
  - `useGame`: Basic game phase transitions (legacy, partially superseded by useRecyclingGame)

**Component Architecture**
- Game components organized by feature:
  - `RecyclingGame`: Main game container managing phase transitions and game loop
  - `GameBoard2D`: 2D game board with park background image and green overlay
  - `GameHUD`: UI overlay showing score, timer, park health meter, and feedback
  - `LitterObject2D`: Individual litter items as clickable emoji buttons with CSS positioning
  - `Bins2D`: Three bin images (recycling, compost, trash) with click detection and hover effects
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
- Audio files (background music, sound effects) served as static assets via Howler.js
- Custom bin images (recycling-bin.png, compost-bin.png, trash-bin.png) in /public/bins
- Park background image with green overlay for environmental feedback
- Emoji icons for litter items (bottles, cans, food waste, etc.)

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