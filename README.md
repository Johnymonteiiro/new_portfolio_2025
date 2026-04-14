# João José Sebastião — Portfolio

Personal portfolio built with **Next.js 16** and **React 19**, featuring a technical blog, project showcase, and contact system. Designed with a dark aesthetic and focused on performance and clean code.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| UI | React 19 RC |
| Forms | React Hook Form 7 + Zod 4 |
| Email | Resend + React Email |
| Icons | Lucide React |
| Code highlight | react-syntax-highlighter (vscDarkPlus) |
| Font | Saira (Google Fonts) |

---

## Project Structure

```
src/
├── app/
│   ├── blog/
│   │   ├── [slug]/             # Dynamic blog post page
│   │   ├── blog.content.tsx
│   │   ├── code.tsx            # Syntax highlighted code blocks
│   │   └── header-section.tsx
│   ├── actions.ts              # Server Actions (email via Resend)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                # Home page
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   └── icon/               # Custom SVG icons
│   ├── all-posts-modal.tsx     # Searchable posts dropdown
│   ├── blog-card.tsx
│   ├── float-button.tsx        # Scroll-aware contact button
│   ├── form.tsx                # Contact form
│   ├── header.tsx
│   ├── journey-card.tsx
│   ├── profile.tsx
│   ├── project-card.tsx
│   ├── recommendation-card.tsx
│   ├── service-card.tsx
│   └── sidebar.tsx             # Active-link sidebar
├── hooks/
│   ├── clickOutSide.tsx        # Click outside + Escape key handler
│   └── useActive.ts            # IntersectionObserver active section tracker
├── lib/
│   ├── reading-time.ts         # Prose + code reading time calculator
│   └── utils.ts
├── static_data/
│   └── content.ts              # Blog posts, projects and services data
└── types/
    └── prismic.ts              # BlogPostSummary type
```

---

## Features

### Home Page
- **Profile** — intro, tech stack, availability status
- **Services** — Web Development & UI/UX Design cards
- **Projects** — grid with category badges and thumbnails
- **My Journey** — work experience timeline
- **Latest Blog** — 3 most recent posts sorted by date
- **Recommendations** — testimonial cards

### Blog
- Dynamic routes via `[slug]`
- Syntax highlighted code blocks with line numbers
- Reading time calculated separately for prose (200 wpm) and code (200 tokens/min)
- Active section tracking in sidebar via `IntersectionObserver`
- Last-section edge case handled via scroll-bottom detection

### Sidebar
- Sticky positioning (`sticky top-4 self-start`) that follows scroll correctly
- Active link highlight synced with the visible viewport section
- **All Posts** dropdown — searchable, opens below the button, styled scrollbar matching Figma

### Contact
- Validated form (Zod schema: name, email, service, message)
- Emails sent via **Resend** using React Email templates
- Available in the header and via a **floating action button** that appears once the header scrolls out of view
- Float button is horizontally aligned with the sidebar column

---

## Getting Started

```bash
# Install dependencies
pnpm install

# Run in development (Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Create a `.env.local` file at the root:

```env
RESEND_API_KEY=your_resend_api_key
```

---

## Design

The UI was designed in Figma and implemented with pixel-level fidelity.

- Dark theme (`#0f1011` background)
- Custom Tailwind color tokens: `green`, `green-flat`, `purple`, `purple-flat`, `gray`, `border-color`, `card-bg`
- Typography: Saira (Light, Medium) via Google Fonts
- Custom scrollbar styled to Figma spec (9px width, `#939496` thumb, `#0f1011` track, fully rounded)

---

## License

Private — all rights reserved © 2024 João José Sebastião
