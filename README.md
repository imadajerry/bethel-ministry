# Bethel Ministry Mizoram - Official Landing Page

> _"Thy Kingdom Come"_ — ESTD 2014

An official, responsive, high-performance landing page for **Bethel Ministry**, an independent Christian evangelical organization based in Aizawl, Mizoram, India. Crafted with precision directly from Figma specifications using **Next.js 14**, **Tailwind CSS**, and **Poppins** typography.

---

## 🌟 Features

- **Pixel-Perfect Figma Translation:** Faithfully follows the approved visual layout, clean white aesthetic, spacing, and typography.
- **Responsive Design:** Fluid mobile, tablet, and desktop layouts with mobile navigation drawer.
- **Typography:** Configured with Google Font **Poppins** across all weights and components.
- **Hero Showcase:** Full-width live worship banner from the Mizoram Youth Festival.
- **About & Heritage:** Clear ministry mission, history, and the gold laurel menorah emblem.
- **Events Gallery & Lightbox:** Interactive event cards with a modal lightbox displaying training sessions, camps, and youth festivals.
- **Ministry Leadership Team:** Organized hierarchy highlighting general superintendents, secretaries, and full team members.
- **Direct Contact & Call Sheet:** Clickable `tel:` and `mailto:` links with an interactive modal to call or copy office numbers.
- **Static Export Ready:** Zero-server footprint optimized for **GitHub Pages**, Vercel, and CDN hosting.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16.4.0](https://nextjs.org/) (Turbopack, App Router, Static Export)
- **UI Library:** [React 19.3.0](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Typography:** [Poppins](https://fonts.google.com/specimen/Poppins) (`next/font/google`)
- **Language:** TypeScript
- **Deployment:** GitHub Pages / GitHub Actions

---

## 📁 Project Structure

```text
bethel-ministry/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages CI/CD workflow
├── assets/
│   ├── figma/                  # Design exports & reference wireframes (gitignored)
│   └── imgs/                   # Source photography and branding assets
│       ├── events/             # Event photos (Camping, Crusade, Youth Fest)
│       └── ministry-team-members/ # Leadership & team member portraits
├── public/
│   └── assets/
│       └── imgs/               # Publicly served optimized image assets
├── src/
│   ├── app/
│   │   ├── globals.css         # Global Tailwind directives & styling
│   │   ├── layout.tsx          # Root layout with Poppins font configuration
│   │   └── page.tsx            # Landing page assembler
│   └── components/
│       ├── Navbar.tsx          # Sticky header with navigation & CTA
│       ├── Hero.tsx            # Live event banner container
│       ├── AboutSection.tsx    # Ministry introduction & emblem
│       ├── EventsSection.tsx   # 5-card events grid with lightbox
│       ├── MinistryTeamSection.tsx # Structured team member cards
│       ├── Footer.tsx          # Contact info & blue asterisk symbol
│       └── CallModal.tsx       # Dialing and clipboard modal
├── next.config.mjs             # Static export & dynamic GitHub Pages basePath
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18.17+ or v20+) installed on your machine.

```bash
node -v
npm -v
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imadajerry/bethel-ministry.git
   cd bethel-ministry
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🌐 Deploying to GitHub Pages

This project is pre-configured for static export to **GitHub Pages** using two simple methods:

### Method 1: Automated Deployment via GitHub Actions (Recommended)

1. Push your code to the `main` branch of your repository:
   ```bash
   git push origin main
   ```
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. That's it! Every time you push to `main`, the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will automatically build the static site and publish it to:
   ```
   https://<your-username>.github.io/bethel-ministry/
   ```

### Method 2: Manual Deployment via `gh-pages` CLI

If you prefer to deploy directly from your local terminal:

1. Run the deploy script:
   ```bash
   npm run deploy
   ```
2. This runs `next build`, exports static HTML to the `./out` directory, and pushes it to a `gh-pages` branch on your GitHub repository.
3. In your GitHub repository **Settings** → **Pages**, set the source branch to **`gh-pages`** (`/ (root)`).

---

## 📞 Ministry Contact Information

- **Email:** [bethelofficialministry@gmail.com](mailto:bethelofficialministry@gmail.com)
- **Primary Phone:** [+91 9612677836](tel:9612677836)
- **Helpline Phone:** [+91 8258883165](tel:8258883165)
- **Location:** Aizawl, Mizoram, India

---

## 📄 License

This project is maintained for Bethel Ministry. All rights reserved.
