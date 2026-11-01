# 10X Shop

10X Shop is a responsive e-commerce demo application built with React, TypeScript, Vite, and Tailwind CSS.

The application allows users to browse products, search and filter the catalog, manage a shopping cart, log in with demo authentication, and place demo orders.

Product data is retrieved from the DummyJSON API. Authentication state, cart contents, and order history are stored locally in the browser using localStorage.

## Technologies

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- React Context API
- DummyJSON REST API
- Browser localStorage
- ESLint

## Features

### Product Catalog

- Responsive product grid
- Product search with 400ms debouncing
- Category filtering
- Sorting by price, rating, and title
- Pagination with 12 products per page
- URL-based catalog state
- Product detail pages
- Loading skeletons
- Error handling and retry functionality
- Request cancellation using AbortController

### Shopping Cart

- Add products to the cart
- Remove products from the cart
- Update product quantities
- Respect available product stock
- Calculate total item count and total price
- Persist cart contents in localStorage
- Restore saved cart contents after page refresh

### Demo Authentication

- Login form with username and password fields
- Required field validation
- Authentication state managed through React Context
- Username persistence in localStorage
- Logout functionality
- Protected routes for checkout, orders, order details, and profile

Authentication is simulated for educational purposes. Login credentials are not verified by a backend service, and passwords are not stored.

### Checkout and Orders

- Protected checkout page
- Order summary with quantities and prices
- Shipping information form
- Basic form validation
- Demo order creation
- Unique order IDs
- Generated order numbers
- Order history stored in localStorage
- Order details page
- Order confirmation after successful storage
- Cart clearing after successful order placement
- Error handling for failed order storage

Checkout does not process real payments or submit orders to a production backend.

## Application Routes

| Route | Description | Access |
|---|---|---|
| `/` | Product catalog | Public |
| `/products` | Product catalog | Public |
| `/products/:id` | Product details | Public |
| `/login` | Demo login | Public |
| `/cart` | Shopping cart | Public |
| `/checkout` | Checkout | Protected |
| `/orders` | Order history | Protected |
| `/orders/:id` | Order details | Protected |
| `/profile` | User profile | Protected |
| `*` | Not Found page | Public |

The root route (`/`) displays the product catalog.

## API Integration

The application retrieves product information from the public DummyJSON API.

Base URL:

https://dummyjson.com/products

### API Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /products` | Retrieve products |
| `GET /products/search?q=...` | Search products |
| `GET /products/category/:category` | Retrieve products by category |
| `GET /products/category-list` | Retrieve available categories |
| `GET /products/:id` | Retrieve product details |

Catalog requests use:

- `limit` and `skip` for pagination
- `sortBy` and `order` for sorting
- `q` for product search

The API URL builder prioritizes search over category filtering when both parameters are provided.

## Getting Started

### Prerequisites

- Node.js compatible with Vite 8
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/NaziPholadashvili/10x-shop.git
```

Navigate to the project directory:

```bash
cd 10x-shop
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in the terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Run ESLint |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Preview the production build locally |

## Project Structure

```text
src/
├── api/
│   └── products.ts
├── components/
├── context/
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── OrdersContext.tsx
├── pages/
│   ├── Products.tsx
│   ├── ProductDetails.tsx
│   ├── Login.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Orders.tsx
│   ├── OrderDetails.tsx
│   ├── Profile.tsx
│   └── NotFound.tsx
├── routes/
│   ├── AppRoutes.tsx
│   └── ProtectedRoute.tsx
├── types/
└── App.tsx
```

Additional context definitions, custom hooks, and reusable components support the application.

## State Management

The application uses React Context API for shared state.

### AuthProvider

Manages demo authentication, including login, logout, and the current username.

### CartProvider

Manages cart items, quantities, total item count, and total price.

### OrdersProvider

Manages locally stored orders and generates order numbers.

## Local Storage

The application uses the following localStorage keys:

| Key | Purpose |
|---|---|
| `10x-shop-username` | Store the demo username |
| `10x-shop-cart` | Store shopping cart contents |
| `10x-shop-orders` | Store order history |

Data is stored locally in the browser. Clearing browser storage can remove saved demo data.

## Limitations

10X Shop is an educational demonstration project, not a production e-commerce platform.

- Authentication is simulated and does not provide server-side account security.
- Orders are stored in browser localStorage instead of a backend database.
- Real payments are not supported.
- Product data depends on the external DummyJSON API.
- Cart and order data are not synchronized between devices.

## Deployment

Production deployment is planned.

The live application URL will be added after deployment is completed and verified.

## Repository

GitHub: https://github.com/NaziPholadashvili/10x-shop

## Project Purpose

This application was developed as a React and TypeScript final project.

It demonstrates:

- Component-based architecture
- Client-side routing
- REST API integration
- Shared state management with React Context
- Asynchronous data fetching
- Form handling and validation
- Browser storage
- Responsive user interfaces
- Error handling
- Git and GitHub development workflows