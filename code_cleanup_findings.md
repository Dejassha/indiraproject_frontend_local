# Code Cleanup Findings

Based on a static analysis of the project's source code, module graph, and linting rules, here is a list of redundant code, dead code, and unused files that can be cleaned up.

## 1. Unused / Redundant Files (Dead Code)
These files are completely disconnected from the application's module graph and are not imported anywhere in the project.

- **`app/components/BuildingExcellenceSection.tsx`**
  - **Reason**: This component is never imported or rendered in any page or layout. It is dead code.
- **`app/lib/mockProjects.ts`**
  - **Reason**: This file contains mock data and utility functions (`getProjectsByType`, `getProjectById`, etc.) that are no longer used by any components in the `app/` directory.

## 2. Potentially Redundant Files
- **`app/careerpage/page.tsx`**
  - **Reason**: This page only contains a client-side (or server-side) `redirect("/career")`. While it catches old traffic, this is a redundant way to handle redirects in Next.js. This should ideally be removed and replaced with a redirect rule in `next.config.ts`.
- **`ecosystem.config.cjs`**
  - **Reason**: This is a PM2 configuration file. If the project is deployed on Vercel or using standard Next.js deployment practices (like Docker), this file is redundant and can be removed.

## 3. Unused Dependencies
- **`@firecms/neat`**
  - **Reason**: Listed in `package.json`, but static analysis shows no imports or usage of this package anywhere in the source code.

## 4. Unused Variables & Imports (In-File Dead Code)
These are variables or imports that are defined or calculated but never actually used in the rendering logic.

- **`app/about/AboutFounder.tsx`**
  - `topPolygonPoints` (Line 71): Assigned a value but never used.
  - `bottomPolygonPoints` (Line 76): Assigned a value but never used.
- **`app/career/page.tsx`**
  - Unused `lucide-react` imports: `Star`, `GraduationCap`, `BadgeCheck`, `Globe`, `Rocket`, `ShieldPlus`, `PlaneTakeoff`. (These are left over from the recent removal of the stats and perks sections).
