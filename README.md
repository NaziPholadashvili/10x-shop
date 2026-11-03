# 10X Shop

10X Shop is a responsive e-commerce demo application built with React, TypeScript, Vite, and Tailwind CSS.

The application allows users to browse products, search and filter the catalog, view product details and reviews, manage a shopping cart, log in using demo authentication, apply promotional discounts, and place demo orders.

Product data is retrieved from the DummyJSON API. Authentication state, cart contents, promotional codes, product reviews, and order history are stored locally in the browser using localStorage.

## Technologies

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- React Context API
- React Hooks, including useReducer
- DummyJSON REST API
- Browser localStorage
- ESLint
- Git and GitHub

## Features

### Product Catalog

- Responsive product grid
- Product search with 400ms debouncing
- Category filtering
- Sorting by price, rating, and title
- Pagination with 12 products per page
- URL-based catalog state using search parameters
- Clear Filters functionality
- Product detail pages
- Reusable product card components
- Discounted product prices
- Loading skeletons
- Error handling and retry functionality
- Request cancellation using AbortController

### Product Details

- Detailed product information
- Product image gallery with interactive image selection
- Product ratings and reviews
- User-submitted reviews stored in localStorage
- Related product recommendations
- Navigation between related products
- Product quantity selection
- Add to Cart functionality

### Shopping Cart

- Add products to the cart
- Remove products from the cart
- Update product quantities
- Respect available product stock
- Display cart item count in the header
- Calculate item count and subtotal
- Use discounted product prices in cart calculations
- Manage cart state using a reducer
- Apply and remove promotional codes
- Apply an additional 10% discount using the `10X10` promotional code
- Persist the promotional code in localStorage
- Calculate shipping costs based on the discounted order value
- Provide free shipping for orders of $100 or more after promotional discounts
- Charge $10 shipping for orders below $100
- Display the final total including discounts and shipping
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
- Discounted product prices in checkout calculations
- Promotional discount and shipping cost calculation
- Final order total calculation
- Shipping information form
- Form validation
- Prevention of duplicate order submissions
- Demo order creation
- Unique order IDs
- Generated order numbers
- Order history stored in localStorage
- Order details page
- Order status tracking
- Reorder functionality
- Order confirmation after successful storage
- Cart clearing after successful order placement
- Promotional code clearing after successful checkout
- Error handling for failed order storage

Checkout does not process real payments or submit orders to a production backend.

### User Profile

- Protected profile page
- Editable user profile information
- Locally managed user information

### Navigation and User Experience

- Shared application layout
- Responsive header and navigation
- Shopping cart item count badge
- Shared footer
- Automatic scroll to top on route changes
- Custom 404 Not Found page
- Error Boundary for unexpected React rendering errors
- Loading and error states

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

Protected routes redirect unauthenticated users to the login page.

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

The application handles loading states, unsuccessful HTTP responses, network failures, and request cancellation.

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

### Demo Login

The application uses simulated authentication.

Enter a username and password in the login form. Authentication is handled locally and does not require a real account or backend authentication service.

Do not use real passwords.

### Promotional Code

Add products to the cart and enter:

```text
10X10
```

The code applies an additional 10% discount to the cart subtotal.

The promotional code is case-insensitive and remains active after a page refresh until it is removed or the cart is cleared.

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
  api/
    products.ts
  components/
    ...
  context/
    AuthContext.tsx
    CartContext.tsx
    OrdersContext.tsx
    ...
  pages/
    Products.tsx
    ProductDetails.tsx
    Login.tsx
    Cart.tsx
    Checkout.tsx
    Orders.tsx
    OrderDetails.tsx
    Profile.tsx
    NotFound.tsx
  routes/
    AppRoutes.tsx
    ProtectedRoute.tsx
  types/
    ...
  App.tsx

progress/
  week-1.md
  week-2.md
  week-3.md

PLAN.md
REPORT.md
DEBUG-LOG.md
README.md
```

The structure above summarizes the main modules. Additional context definitions, custom hooks, reusable components, and utility files support the application.

## State Management

The application uses React Context API for shared application state.

### AuthProvider

Manages demo authentication, including login, logout, and the current username.

### CartProvider

Manages:

- Cart items and quantities
- Adding and removing products
- Cart item count
- Product subtotal
- Promotional discount
- Shipping cost
- Final total
- Promotional code application and removal
- Cart persistence

Cart actions are organized using reducer-based state management.

### OrdersProvider

Manages locally stored orders, order history, and generated order numbers.

## Pricing and Shipping

The application supports product-level discounts and an additional promotional discount.

The order calculation follows these steps:

1. Calculate the subtotal using discounted product prices.
2. Apply the promotional discount, if active.
3. Determine shipping based on the amount after promotional discounts.
4. Add shipping to calculate the final total.

### Promotional Discount

The `10X10` code applies a 10% discount to the cart subtotal.

### Shipping

- Orders of $100 or more after promotional discounts qualify for free shipping.
- Orders below $100 have a $10 shipping charge.

The shopping cart and checkout use the same pricing rules to maintain consistent totals.

## Local Storage

The application uses browser localStorage to persist demo data.

| Key | Purpose |
|---|---|
| `10x-shop-username` | Store the demo username |
| `10x-shop-cart` | Store shopping cart contents |
| `10x-shop-orders` | Store order history |
| `10x-shop-promo` | Store the active promotional code |

Product reviews and profile information also use local browser storage.

Data is stored locally in the browser. Clearing browser storage can remove saved demo data.

## Error Handling and Testing

The application includes:

- API error messages with HTTP status information
- Retry functionality for failed product requests
- AbortController cleanup for asynchronous requests
- React Error Boundary
- Not Found route handling
- TypeScript strict checks
- ESLint checks
- Production build verification

Debugging activities and test observations are documented in `DEBUG-LOG.md`.

### Verification Commands

```bash
npm run typecheck
npm run lint
npm run build
```

## Development Progress

Development progress is documented in:

- `PLAN.md` — Initial project plan
- `REPORT.md` — Project progress and lessons learned
- `DEBUG-LOG.md` — Debugging activities and observations
- `progress/week-1.md` — October 20–26, 2026
- `progress/week-2.md` — October 27 – November 2, 2026
- `progress/week-3.md` — November 3, 2026

The repository also includes Git commit history, feature branches, and merged Pull Requests documenting the development process.

## Limitations

10X Shop is an educational demonstration project, not a production e-commerce platform.

- Authentication is simulated and does not provide server-side account security.
- Orders are stored in browser localStorage instead of a backend database.
- Real payments are not supported.
- Product data depends on the external DummyJSON API.
- Cart, reviews, and order data are not synchronized between devices.
- Promotional discounts are implemented for demonstration purposes.

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
- Reducer-based state management
- Asynchronous data fetching
- Form handling and validation
- Browser storage and persistence
- Responsive user interfaces
- Error handling and recovery
- Pricing and shipping calculations
- Git and GitHub development workflows