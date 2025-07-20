# 🛍️ E-Commerce Frontend – React + TypeScript + Vite

This is the frontend for the E-Commerce platform, built using **React**, **TypeScript**, and **Vite**. It interfaces with a backend (NestJS) and provides a complete customer experience—from product browsing to checkout with payment integration.

---

## ✨ Features

- 🔐 **Authentication** (Login, Register, Persisted Sessions)
- 🛒 **Cart & Checkout Flow**
- 💳 **Payment Integration via Flutterwave**
- 📦 **Product Listing & Details**
- ✍️ **Product Reviews**
- 📧 **Email Alerts**
- 🌍 **Role-based Access (e.g., Admin Panel)**
- 🌈 **Responsive UI & Animations**

---

## 🛠️ Tech Stack

| Category         | Tech Stack                             |
|------------------|----------------------------------------|
| **Framework**    | React + TypeScript                     |
| **Tooling**      | Vite                                   |
| **State**        | Redux Toolkit, Redux Persist           |
| **Routing**      | React Router DOM                       |
| **Forms**        | Formik + Yup                           |
| **Animation**    | Framer Motion                          |
| **UI Icons**     | Lucide React, Remixicon                |
| **Charts**       | Recharts                               |
| **Date Handling**| date-fns                               |
| **Notifications**| React Toastify                         |
| **Payments**     | flutterwave-react-v3                   |

---

## 📁 Project Structure

```bash
src/
├── assets/              # Static files (images, icons, etc.)
├── components/          # Shared reusable components
├── features/            # Redux slices and features (cart, auth, etc.)
├── hooks/               # Custom React hooks
├── pages/               # Route-based views (Home, Product, Admin, etc.)
├── routes/              # Route definitions and guards
├── services/            # API service handlers
├── store/               # Redux store configuration
├── types/               # TypeScript interfaces & types
├── utils/               # Utility functions (formatting, validation)
└── App.tsx              # Root component
```
## 📦 Installation
```bash
git clone https://github.com/Nanret123/quixcart_frontend.git
cd quixcart_frontend

# Install dependencies
npm install
```
## 🚀 Running the App
```bash
# Development server
npm run dev
```
