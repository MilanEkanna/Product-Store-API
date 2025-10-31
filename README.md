# Fake Store Admin Dashboard

A high-performance React application built with **Redux Toolkit (RTK Query)** and **Tailwind CSS** that fulfills all requirements of the React JS Assignment. The app fetches, displays, edits, and deletes products from the [Fake Store API](https://fakestoreapi.com/), with login protection, real-time cache updates, skeleton loaders, and auto-revalidation on window focus.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## ✅ Assignment Requirements Implemented

### 🔐 1. User Authentication (Simple Login)
- Static login with credentials: `user` / `password`
- Product view **only accessible after login**
- Login state persisted using `localStorage` (survives page reload)

### 📦 2. Data Fetching & Product List
- Fetches all products from `https://fakestoreapi.com/products`
- Displays responsive grid of product cards showing:
  - Product image
  - Title
  - Price (formatted as `$XX.XX`)
  - Category

### 🔍 3. Product Detail View
- Fetches product by ID from `https://fakestoreapi.com/products/{id}`
- Shown in a modal overlay when a card is clicked
- Displays:
  - Full description
  - Rating (e.g., `4.5 ★ (123 reviews)`)

### ✏️ 4. Product Update (Edit)
- “Edit” button in detail view opens a form
- Allows editing of **title, price, description, and category**
- Sends `PUT` request to `https://fakestoreapi.com/products/{id}`
- **Cached product list updates instantly** after edit — no full refetch

### 🗑️ 5. Product Deletion
- “Delete Product” button with **confirmation modal**
- Sends `DELETE` request to `https://fakestoreapi.com/products/{id}`
- Product **removed from UI immediately** on success

### 🎨 6. UI/UX & Usability
- Clean, responsive design with **Tailwind CSS**
- **Skeleton loaders** during data fetching
- User-friendly loading states and error messages
- **Bonus**: Category filter + search by title

### ⚙️ 7. State Management & Caching
- **Redux Toolkit with RTK Query** (mandatory requirement)
- Intelligent caching with automatic deduplication
- Cache tags ensure efficient updates after mutations

### 🔁 8. Data Refresh on Window Focus
- Product data **automatically revalidates** when browser tab regains focus
- Enabled via RTK Query’s built-in `refetchOnFocus: true`

### 🚀 9. Performance Optimizations
- No unnecessary re-renders (RTK Query minimizes updates)
- **Bonus**: Responsive grid + efficient data display (pagination-ready)

---

## 🚀 Live Demo

🔗 **[Deployed App Link](https://your-deployed-app-url.com)**  
*(Replace with your Vercel/Netlify/GitHub Pages URL before submission)*

> **Login Credentials**  
> **Username**: `user`  
> **Password**: `password`

---

## 🛠️ Local Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/fakestore-admin.git
   cd fakestore-admin