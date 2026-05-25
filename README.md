# CoviCare – Covid Bed Slot Booking SaaS

A full-stack SaaS portfolio application for booking Covid hospital beds in real-time across India. Built with Next.js 14, SQLite, Prisma, and NextAuth.js.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env
```

### 3. Set up the database
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Patient | `patient@demo.com` | `password123` |
| Hospital Admin | `admin@demo.com` | `password123` |
| Super Admin | `superadmin@demo.com` | `password123` |

---

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page — hero, stats, features, hospital cards |
| `/hospitals` | Search & filter hospitals by city, bed type, availability |
| `/hospitals/[id]` | Hospital detail with live bed counts + booking form |
| `/login` | Sign in with credentials |
| `/register` | Patient self-registration |
| `/dashboard` | Patient dashboard — bookings, notifications |
| `/admin` | Hospital Admin — confirm/reject bookings, bed stats |
| `/super-admin` | Super Admin — platform-wide analytics & tables |
| `/about` | About page with tech stack & timeline |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Auth | NextAuth.js v4 (JWT + bcrypt) |
| ORM | Prisma 5 |
| Database | SQLite (file-based, zero install) |
| State | React Context + API fetch |

---

## 🗄️ Database

Data is persisted in `prisma/dev.db` (SQLite). It survives restarts and is never lost unless manually deleted.

**To reset and re-seed:**
```bash
npx prisma migrate reset --force
npx prisma db seed
```

**To open Prisma Studio (visual DB browser):**
```bash
npx prisma studio
```

---

## 🛏️ Bed Types

- **General Ward** — standard Covid isolation beds
- **ICU** — intensive care unit beds
- **Oxygen Support** — beds with oxygen supply
- **Ventilator** — mechanical ventilator beds

---

## 👤 User Roles

| Role | Capabilities |
|------|-------------|
| **Patient** | Search hospitals, book beds, track bookings, receive notifications |
| **Hospital Admin** | View incoming bookings, confirm/reject requests, monitor bed stats |
| **Super Admin** | Platform-wide analytics, all hospitals & bookings overview |

---

## 📁 Project Structure

```
app/
├── api/               # REST API routes (auth, hospitals, bookings, notifications)
├── about/             # About page
├── admin/             # Hospital admin dashboard
├── dashboard/         # Patient dashboard
├── hospitals/         # Hospital listing + detail + booking
├── login/             # Login page
├── register/          # Registration page
└── super-admin/       # Super admin dashboard

components/            # Navbar, Footer, HospitalCard, BookingCard, etc.
context/               # AppContext (global state + API calls)
lib/                   # Prisma client, types, utils
prisma/                # Schema, migrations, seed
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```
