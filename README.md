# Rezliens – Nuxt 3 Dashboard Application

A clean and modular Nuxt 3 + TypeScript dashboard application with user and report management, using Pinia for state, Tailwind CSS for styling, and composables for sorting, filtering, and pagination logic.

📁 Project Structure

├── components/         # Reusable UI components
├── composables/        # Reusable logic (pagination, sorting, filters)
├── interfaces/         # TypeScript interfaces for data models
├── middleware/         # Route protection (e.g. auth middleware for dashboard access)
├── layouts/            # Nuxt layout components
├── pages/              # Nuxt pages (routing)
├── plugins/            # Nuxt plugins (e.g. toast, persist)
├── public/             # Static files
├── services/           # API service functions (if applicable)
├── stores/             # Pinia stores for auth, reports, users
├── utilities/          # Utility/helper functions
├── app.vue             # Nuxt root component
├── nuxt.config.ts      # Nuxt configuration
├── tailwind.config.ts  # Tailwind config
└── tsconfig.json       # TypeScript config

🔍 Features

Modular Design: Cleanly separated logic using composables for reuse.

Sorting & Pagination: Dynamic sorting (asc/desc) for fields like name and date, with pagination logic abstracted into composables.

Filtering: Combined search, role, and status filters for user and report data.

Admin Features: Admin users can edit/delete users with role-based access shown in UI.

Responsive Table UI: Accessible and mobile-friendly table layout using Tailwind.

🤔 Decisions & Architecture Notes

Used composables (useUsers, useReports, usePagination) to keep logic out of components and improve reusability/testability.

Followed TypeScript best practices with type-safe interfaces.

Adopted Pinia for clean, predictable global state management (auth, user lists, reports).

Used Lucide icons as lightweight, customizable SVG icons.

Table sorting is handled within the composables to keep the component focused on UI.



## 🚀 Setup Instructions

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
