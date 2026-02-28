# TechStore — E-Commerce Frontend

A clean, minimal e-commerce website for tech gadgets built with React. Features product listing, search & filter, cart with LocalStorage persistence, and a multi-step checkout flow.

## Tech Stack

- **React 18** — UI library with hooks
- **React Router v6** — client-side routing
- **Context API + useReducer** — global cart state
- **LocalStorage** — cart persistence across sessions
- **CSS Modules** — component-scoped styling
- **Google Fonts** — Syne (display) + DM Sans (body)

## Features

- 🛍️ Product listing page with 12 real tech products
- 🔍 Search by name, brand, or category
- 🏷️ Category filter pills
- 💰 Price range slider
- 🔀 Sort by price / rating / reviews
- 📦 Product detail page with specs tab
- 🛒 Cart with quantity controls & LocalStorage persistence
- 💳 Multi-step checkout (Shipping → Payment → Review → Confirmation)
- 📱 Fully responsive design
- ✨ Smooth animations & hover effects

## Local Setup

```bash
# Install dependencies
npm install

# Start dev server
npm start

# Build for production
npm run build
```

## Deploy on Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Framework: Create React App (auto-detected)
5. Click **Deploy** — done!

## Project Structure

```
src/
├── components/
│   ├── Navbar.js / .css
│   ├── ProductCard.js / .css
│   └── Footer.js / .css
├── context/
│   └── CartContext.js
├── data/
│   └── products.js
├── pages/
│   ├── Home.js / .css
│   ├── ProductDetail.js / .css
│   ├── Cart.js / .css
│   └── Checkout.js / .css
├── App.js
├── index.js
└── index.css
```

## Resume Points

- Implemented global cart state with Context API + useReducer pattern
- Used localStorage for cart persistence across page refreshes
- Built multi-step form with validation and state management
- Responsive design using CSS Grid and Flexbox
- Optimized performance with useMemo for filtered product list
