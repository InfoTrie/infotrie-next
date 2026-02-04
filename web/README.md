# InfoTrie.com v2 — Next.js

Refonte du site WordPress infotrie.com en Next.js.

## Quick Start

```bash
cd web
npm install
npm run dev    # → http://localhost:3002
```

Production build:
```bash
npm run build
npm run start  # → http://localhost:3002
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Fonts**: DM Serif Display (headings) + DM Sans (body) + JetBrains Mono (code)
- **Deployment**: PM2 on Hetzner server (65.109.55.242:3002)

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (Header + Footer)
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global styles + design tokens
│   ├── products/
│   │   ├── page.tsx          # Products listing
│   │   └── [slug]/page.tsx   # Product detail (FinSentS, DocuTrie, iFeed)
│   ├── data/
│   │   ├── page.tsx          # Data solutions listing
│   │   └── [slug]/page.tsx   # Data category detail (10 categories)
│   ├── consulting/page.tsx   # Consulting page
│   ├── data-specialist/page.tsx  # "Fisherman" concept page
│   ├── contact/page.tsx      # Contact form
│   └── docs/page.tsx         # Documentation hub
├── components/
│   ├── Header.tsx            # Responsive nav with dropdowns
│   ├── Footer.tsx            # Site footer
│   └── Section.tsx           # Reusable section + section header
└── lib/
    ├── site-config.ts        # ⭐ ALL SITE CONTENT — edit here first
    └── theme.ts              # Design tokens (colors, fonts)
```

## How to Edit Content

### Most content lives in `src/lib/site-config.ts`

This is the single source of truth for:
- Navigation structure
- Product definitions (name, description, features)
- Data category listings
- Consulting services
- Homepage hero text and metrics
- Company metadata (contact, social links)

**To add a new product**: Add an entry to `products` array in site-config.ts.
The dynamic route `products/[slug]` will automatically create a page for it.

**To add a new data category**: Add an entry to `dataCategories` array.
Same dynamic routing applies.

### For page-specific content

Each page can be edited directly:
- Consulting narrative → `src/app/consulting/page.tsx`
- Data Specialist story → `src/app/data-specialist/page.tsx`
- Contact form behavior → `src/app/contact/page.tsx`

### Design tokens

Colors, fonts, and spacing are defined in two places:
1. `src/lib/theme.ts` — TypeScript reference
2. `src/app/globals.css` — CSS custom properties (the actual runtime values)

Keep them in sync when changing the palette.

## Design System

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0A1628` | Page backgrounds |
| `--color-secondary` | `#12263A` | Alternate section backgrounds |
| `--color-accent` | `#00D4AA` | CTAs, highlights, links |
| `--color-surface` | `#0F1D32` | Card backgrounds |
| `--color-text` | `#E8ECF1` | Primary text |
| `--color-text-muted` | `#8899AA` | Secondary text |
| `--color-border` | `#1E3350` | Borders, dividers |

### Components
- `<Section>` — page section with padding + max-width container
- `<SectionHeader>` — consistent section title + subtitle
- `<Header>` — responsive nav (desktop dropdowns + mobile hamburger)
- `<Footer>` — 4-column footer

### CSS Utilities
- `.text-gradient` — accent gradient on text
- `.glass` — frosted glass effect (header, dropdowns)
- `.glow-accent` — subtle glow around elements
- `.animate-fade-in-up` — entrance animation

## Deployment

### Dev access (current)
```
http://65.109.55.242:3002
```

### Deploy updates
```bash
ssh itrie@65.109.55.242
cd ~/infotrie-next/web
git pull origin main
npm install
npm run build
pm2 restart infotrie-next
```

### PM2 setup (first time)
```bash
pm2 start node_modules/.bin/next --name infotrie-next -- start -p 3002
pm2 save
pm2 startup
```

## TODO — Content Migration

Priority pages to migrate from WordPress:

- [ ] Homepage content finalization (hero images, animations)
- [ ] FinSentS detailed page (from /finsents-stock-and-sentiment-screener/)
- [ ] DocuTrie detailed page
- [ ] iFeed API detailed page
- [ ] Financial Data detailed content (from /financial-data/)
- [ ] Sentiment Analysis detailed content (from /sentiment-analysis/)
- [ ] All other data category pages (10 total)
- [ ] Data Specialist page full content (from /data-specialist/)
- [ ] Consulting page full content (from /consulting/)
- [ ] Contact form backend integration
- [ ] Documentation section (API docs, static data tables)
- [ ] SEO: meta tags, OG images, sitemap.xml
- [ ] Analytics integration
- [ ] Images and media assets from WordPress
- [ ] Shop/Login functionality (if needed)

## Git Conventions

- Branches: `feature/`, `fix/`, `release/`
- Commits: conventional commits (`feat:`, `fix:`, `docs:`, `style:`)
