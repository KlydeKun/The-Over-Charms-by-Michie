# 🥐 The-Over-Charms-by-Michie

A modern full-stack bakery website built with **Vue 3** and **Laravel**, designed to showcase artisan breads, cakes, pastries, and beverages while providing customers with a seamless browsing and ordering experience.

The project follows a decoupled architecture where the frontend communicates with the backend through RESTful APIs, making it scalable, maintainable, and easy to extend.

---

## 📸 Preview

> _Coming Soon_

---

# 🚀 Tech Stack

## Frontend

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Tailwind CSS
- shadcn-vue
- Axios

## Backend

- Laravel
- PHP 8.3+
- REST API
- Eloquent ORM

## Database

- MySQL

## Development Tools

- Composer
- npm
- Git
- GitHub

---

# 📁 Project Structure

```text
The-Over-Charms-by-Michie/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── router/
│   ├── stores/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── storage/
│   ├── config/
│   └── public/
│
└── README.md
```

---

# ✨ Features

## Customer

- Browse bakery products
- View product details
- Search products
- Filter by category
- View promotions
- Browse gallery
- Contact the bakery
- View bakery location
- Responsive design

## Admin (Planned)

- Dashboard
- Product Management
- Category Management
- Inventory Management
- Customer Management
- Order Management
- Sales Reports
- Banner Management

---

# 🛠 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/The-Over-Charms-by-Michie.git
```

```bash
cd The-Over-Charms-by-Michie
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm run dev
```

---

# Backend Setup

```bash
cd backend
```

Install dependencies

```bash
composer install
```

Create environment file

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Configure your database in `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=the_over_charms
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations

```bash
php artisan migrate
```

Start Laravel server

```bash
php artisan serve
```

---

# ⚙ Environment Variables

## Frontend

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Backend

```env
APP_NAME="The Over Charms by Michie"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=the_over_charms
DB_USERNAME=root
DB_PASSWORD=
```

---

# 📦 API

Base URL

```
http://127.0.0.1:8000/api
```

Example

```
GET /products
GET /categories
GET /promotions

POST /contact
POST /orders
```

---

# 🎨 Design

The website follows a modern artisan bakery theme featuring:

- Warm neutral color palette
- Modern typography
- Responsive layout
- Minimalist user interface
- Smooth animations
- Mobile-first design

---

# 📅 Roadmap

- [x] Project Setup
- [ ] Homepage
- [ ] Product Catalog
- [ ] Product Details
- [ ] Search Products
- [ ] Categories
- [ ] Promotions
- [ ] Gallery
- [ ] Contact Page
- [ ] Authentication
- [ ] Shopping Cart
- [ ] Checkout
- [ ] Order History
- [ ] Admin Dashboard
- [ ] Inventory System
- [ ] Sales Analytics

---

# 🧪 Testing

Frontend

```bash
npm run test
```

Backend

```bash
php artisan test
```

---

# 📖 Coding Standards

Frontend

- Composition API
- TypeScript
- ESLint
- Prettier

Backend

- PSR-12
- Laravel Pint
- RESTful API
- Resource Controllers
- Form Requests

---

# 🌿 Git Workflow

```
main
develop
feature/*
hotfix/*
release/*
```

Example

```
feature/homepage
feature/product-page
feature/authentication
feature/cart
```

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Kyle Lerio**

Built with ❤️ using Vue 3, Laravel, and MySQL.
