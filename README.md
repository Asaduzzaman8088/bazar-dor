# 🛒 বাজার দর (Bazar Dor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের বাজারদর।

**Bazar Dor** is a full-stack Bengali-first web application that tracks daily commodity prices across different markets and districts of Bangladesh. Users can browse products, filter by category, view market-wise price breakdowns, and authenticate via email/password, Google, or GitHub.

---

## 🔗 Live Demo

- **Live URL:** [bazar-dor-six-kappa.vercel.app](https://bazar-dor-plum-two.vercel.app)
- **GitHub Repo:** [github.com/Asaduzzaman8088/bazar-dor](https://github.com/Asaduzzaman8088/bazar-dor)

---

## 📸 Screenshots

> _Add 3-4 screenshots of your app here — home page, product detail, category page, sign-in page._

| Page | Preview |
|---|---|
| Home | `[screenshot]` |
| Product Detail | `[screenshot]` |
| Category | `[screenshot]` |
| Sign In | `[screenshot]` |

---

## 🛠️ Technologies Used

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | [Better Auth](https://better-auth.com) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) |
| **Icons** | Inline SVG, Emoji |
| **Toasts** | react-hot-toast |
| **Deployment** | Vercel |
| **Data Source** | [Programming Hero Bazar Dor API](https://openapi.programming-hero.com/api/bazardor) |

---

## ✨ Key Features

### 1. **Dynamic Bazar Price Tracking**
Real-time prices for 33+ commodities across 12+ markets. Each product shows today's price, yesterday's comparison, and a color-coded change badge (▲ red for increase, ▼ green for decrease, — gray for no change).

### 2. **Bengali-First Design**
Full Bangla typography with the **Hind Siliguri** font, Bangla digits (০-৯), Bangla dates (রবিবার, ১১ অক্টোবর, ২০২৬), and Bangla UI text throughout. Numbers are auto-converted from Latin to Bengali.

### 3. **Triple Authentication System**
Three ways to sign in — **email/password**, **Google OAuth**, and **GitHub OAuth** — powered by Better Auth with MongoDB session storage. Show/hide password toggle, toast notifications on every auth action, and persistent sessions across page reloads.

### 4. **Market-Wise Price Breakdown**
Every product has a dedicated detail page showing minimum, maximum, and average prices across all markets, plus a full striped table with market name, district, and per-market price ranges. Protected route — requires login.

### 5. **Category Browsing with Sort**
Products organized into 8 categories (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা). Each category page has a sort dropdown — ডিফল্ট, দাম: কম থেকে বেশি, দাম: বেশি থেকে কম — with proper numeric sorting.

---

## 📂 Project Structure
