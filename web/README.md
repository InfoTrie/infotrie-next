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
- **Auth**: NextAuth.js v5 + Keycloak (OIDC)
- **Styling**: Tailwind CSS 4 + CSS custom properties
- **Fonts**: DM Serif Display (headings) + DM Sans (body) + JetBrains Mono (code)
- **Deployment**: PM2 on Hetzner server (65.109.55.242:3002)

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (SessionProvider + Header + Footer)
│   ├── page.tsx              # Homepage
│   ├── globals.css           # Global styles + design tokens
│   ├── api/auth/[...nextauth]/route.ts  # NextAuth API route handler
│   ├── auth/signin/page.tsx  # Custom sign-in page
│   ├── products/
│   │   ├── page.tsx          # Products listing
│   │   └── [slug]/page.tsx   # Product detail (FinSentS, DocuTrie, iFeed)
│   ├── data/                 # 🔒 Protected — requires auth
│   │   ├── page.tsx          # Data solutions listing
│   │   └── [slug]/page.tsx   # Data category detail (10 categories)
│   ├── docs/page.tsx         # 🔒 Protected — Documentation hub
│   ├── demo/                 # 🔒 Protected — Demo pages
│   ├── consulting/page.tsx   # Consulting page
│   ├── data-specialist/page.tsx  # "Fisherman" concept page
│   └── contact/page.tsx      # Contact form
├── components/
│   ├── Header.tsx            # Responsive nav with dropdowns + auth button
│   ├── AuthButton.tsx        # Login/Logout button (uses next-auth/react)
│   ├── SessionProvider.tsx   # NextAuth SessionProvider wrapper
│   ├── Footer.tsx            # Site footer
│   └── Section.tsx           # Reusable section + section header
├── lib/
│   ├── auth.ts               # ⭐ NextAuth v5 config (Keycloak provider)
│   ├── site-config.ts        # ⭐ ALL SITE CONTENT — edit here first
│   └── theme.ts              # Design tokens (colors, fonts)
├── types/
│   └── next-auth.d.ts        # Extended session/JWT type declarations
└── middleware.ts              # Route protection (/docs, /data, /demo)
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

## Authentication (Keycloak)

The site uses **NextAuth.js v5** with **Keycloak** as the OIDC identity provider.

- **Keycloak instance**: `https://auth.infotrie.com` (RKE2 cluster, namespace `infra-keycloak`)
- **Protected routes**: `/docs/*`, `/data/*`, `/demo/*` (configured in `src/middleware.ts`)
- **Public routes**: `/`, `/products/*`, `/consulting`, `/contact`, `/data-specialist`

### Keycloak Setup (one-time)

#### 1. Create the realm

1. Go to `https://auth.infotrie.com/admin`
2. Click **Create Realm**
3. Set **Realm name**: `infotrie`
4. Save

#### 2. Create the client

In the `infotrie` realm:

1. Go to **Clients** → **Create client**
2. Set **Client ID**: `infotrie-web`
3. Set **Client Protocol**: `openid-connect`
4. Enable **Client authentication** (confidential)
5. Set **Valid Redirect URIs**: `https://infotrie.com/api/auth/callback/keycloak`
6. Set **Valid Post Logout Redirect URIs**: `https://infotrie.com`
7. Set **Web Origins**: `https://infotrie.com`
8. Save

> For local dev, add `http://localhost:3002/api/auth/callback/keycloak` to Valid Redirect URIs.

#### 3. Get the client secret

1. In the `infotrie-web` client, go to the **Credentials** tab
2. Copy the **Client Secret**

#### 4. Create users

1. Go to **Users** → **Add user**
2. Fill in username/email
3. Go to the **Credentials** tab to set a password

### Environment Variables

Copy `env.local.example` to `.env.local` and fill in the values:

```bash
cp env.local.example .env.local
```

```env
# Generate a secret: openssl rand -base64 32
AUTH_SECRET="generated-secret-here"

# From Keycloak admin → Clients → infotrie-web → Credentials
KEYCLOAK_CLIENT_ID="infotrie-web"
KEYCLOAK_CLIENT_SECRET="your-client-secret"
KEYCLOAK_ISSUER="https://auth.infotrie.com/realms/infotrie"

# Public URL of the site
AUTH_URL="https://infotrie.com"
AUTH_TRUST_HOST=true
```

### Changing Protected Routes

Edit `src/middleware.ts` to change which pages require authentication:

```ts
export const config = {
  matcher: ["/docs/:path*", "/data/:path*", "/demo/:path*"],
};
```

Also update the `protectedPaths` array in `src/lib/auth.ts` to keep them in sync.

### Auth Flow

1. User visits a protected page → middleware redirects to `/auth/signin`
2. User clicks "Se connecter avec Keycloak" → redirected to Keycloak login
3. After login, Keycloak redirects back to `/api/auth/callback/keycloak`
4. NextAuth creates a session, user is redirected to the original page
5. Header shows username + "Déconnexion" button

---

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
- [x] Login functionality (Keycloak via NextAuth.js v5)

## Git Conventions

- Branches: `feature/`, `fix/`, `release/`
- Commits: conventional commits (`feat:`, `fix:`, `docs:`, `style:`)
