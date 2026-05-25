# CoviCare – Covid Bed Slot Booking SaaS

A full-stack SaaS portfolio app for booking Covid hospital beds in real-time across India.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🔑 Demo Credentials (any password)

| Role | Email |
|------|-------|
| Patient | `patient@demo.com` |
| Hospital Admin | `admin@demo.com` |
| Super Admin | `superadmin@demo.com` |

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and hospital cards |
| `/hospitals` | Search & filter hospitals by city, bed type, availability |
| `/hospitals/[id]` | Hospital detail with live bed counts + booking form |
| `/login` | Auth page with quick demo login |
| `/register` | Patient registration |
| `/dashboard` | Patient dashboard — bookings, notifications |
| `/admin` | Hospital Admin — manage bookings, bed stats |
| `/super-admin` | Super Admin — platform-wide analytics |
| `/about` | About page with tech stack & timeline |

## 🏗️ Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons
- **React Context** — global state management
- **Mock data** — no backend required (portfolio-ready)

## 🛏️ Bed Types

- General Ward
- ICU
- Oxygen Support
- Ventilator

## 👤 User Roles

- **Patient** — search hospitals, book beds, track bookings
- **Hospital Admin** — confirm/reject bookings, view bed stats
- **Super Admin** — platform overview, all hospitals & bookings
