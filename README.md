# 10X Shop

**Live Demo:** https://10x-shop-flax.vercel.app

**GitHub Repository:** https://github.com/NaziPholadashvili/10x-shop

**Demo Video:** https://github.com/NaziPholadashvili/10x-shop/issues/59

10X Shop is a responsive e-commerce demonstration application built with React 19, TypeScript, Vite 8, Tailwind CSS v4, and React Router 7.

The application allows users to browse products, search and filter the catalog, view product details and reviews, manage a shopping cart, log in using demo authentication, apply promotional discounts, and place demo orders.

Product data is retrieved from the DummyJSON REST API. Demo authentication, cart contents, promotional codes, product reviews, profile information, and order history are managed on the client side, with relevant data persisted in browser localStorage.

The project was initially focused on CORE requirements and was subsequently expanded to include targeted FULL requirements and additional user experience improvements.

## Technologies

- React 19
- TypeScript
- Vite 8
- Tailwind CSS v4
- React Router 7
- React Context API
- React Hooks, including `useReducer`
- DummyJSON REST API
- Browser localStorage
- ESLint
- Git and GitHub
- Vercel

## Features

### Product Catalog

- Responsive product grid
- Product search with 400ms debouncing
- Category filtering
- Sorting by price, rating, and title
- Pagination with 12 products per page
- URL-based catalog state using search parameters
- Clear Filters functionality
- Reusable product cards
- Discounted product prices
- Loading skeletons
- Error handling and retry functionality
- Request cancellation using `AbortController`
- Stock-aware product availability behavior

### Product Details

- Detailed product information
- Product image gallery with interactive image selection
- Product ratings and reviews
- User-submitted reviews stored in localStorage
- Related product recommendations
- Navigation between related products
- Product quantity selection
- Stock-aware Add to Cart functionality
- Invalid product ID validation
- Not Found handling for missing products

### Shopping Cart

- Add products to the cart
- Remove products from the cart
- Update product quantities
- Respect available product stock
- Display cart item count in the header
- Hide the cart badge when the cart is empty
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
- Maintain user-specific cart and promotional code data

### Demo Authentication

- Login form with username and password fields
- Required field validation
- Minimum password length validation
- Field-specific validation messages
- Authentication state managed through React Context
- Username persistence in localStorage
- Logout functionality
- Protected routes for checkout, orders, order details, and profile
- Navigation back to the catalog from the login page

Authentication is simulated for educational purposes. Login credentials are not verified by a backend service, and passwords are not stored.

### Checkout and Orders

- Protected checkout page
- Redirect from checkout to cart when the cart is empty
- Order summary with quantities and prices
- Discounted product prices in checkout calculations
- Promotional discount and shipping cost calculation
- Final order total calculation
- Shipping information form
- Field-specific form validation
- Prevention of duplicate order submissions
- Demo order creation
- Unique order IDs
- Generated order numbers
- Order history stored in localStorage
- Order details page
- Dynamic order status display
- Reorder functionality
- Order confirmation after successful storage
- Cart clearing after successful order placement
- Promotional code clearing after successful checkout
- Error handling for failed order storage
- User-specific order history display

Checkout does not process real payments or submit orders to a production backend.

### User Profile

- Protected profile page
- Editable user profile information
- Locally persisted user information
- User-specific profile data handling
- Clear Local Data functionality
- Support for clearing the current user's saved application data
- Error-handling and restoration logic for supported local storage operations

The Clear Local Data functionality was manually tested using a secondary demo account. The test confirmed that profile data remained cleared after a page refresh, while the session and selected theme remained available.

Not every possible browser storage failure or multi-user scenario was exhaustively tested.

### Navigation and User Experience

- Shared application layout
- Responsive header and navigation
- Shopping cart item count badge
- Shared footer
- Automatic scroll to top on route changes
- Custom 404 Not Found page
- Error Boundary for unexpected React rendering errors
- Loading, empty, and error states
- Dark Mode and theme switching
- Theme preference persistence in localStorage

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

Invalid product IDs and product requests returning HTTP 404 display the Not Found page.

## API Integration

The application retrieves product information from the public DummyJSON API.

**Base URL:** https://dummyjson.com/products

### API Endpoints

| Endpoint | Purpose |
|---|---|
| `GET /products` | Retrieve products |
| `GET /products/search?q=...` | Search products |
| `GET /products/category/:category` | Retrieve products by category |
| `GET /products/category-list` | Retrieve available categories |
| `GET /products/:id` | Retrieve product details |

Catalog requests may use the following query parameters:

- `limit` and `skip` for pagination
- `sortBy` and `order` for sorting
- `q` for product search

The API URL builder prioritizes search over category filtering when both parameters are provided.

The application handles loading states, unsuccessful HTTP responses, network failures, and request cancellation.

## Data Flow

10X Shop uses a client-side data flow built around API functions, React components, React Context, reducer-based state management, and browser localStorage.

### 1. Product Data Flow

1. A user opens the catalog or selects a product.
2. The relevant React page initiates a request through the product API functions.
3. The API functions communicate with DummyJSON using the Fetch API.
4. The response is processed and the product data is stored in the relevant component state.
5. React renders the product cards or product details using the received data.
6. When the user changes search, category, sorting, or pagination options, the catalog updates its state and retrieves the appropriate results.

The catalog uses URL search parameters to preserve filter and pagination state. Debouncing reduces unnecessary search requests, while `AbortController` helps cancel outdated requests.

**Product data flow:**

`User interaction → React page → Product API functions → DummyJSON API → React state → UI`

### 2. Authentication Data Flow

1. The user enters a username and password on the Login page.
2. The form validates the required fields and password length.
3. The login action updates the authentication state through AuthContext.
4. The demo username is persisted in localStorage.
5. ProtectedRoute checks authentication state before rendering protected pages.
6. Logging out clears the demo authentication session.

**Authentication data flow:**

`Login form → Validation → AuthContext → Authentication state → Protected routes`

Authentication is simulated locally and does not use a backend authentication service.

### 3. Shopping Cart Data Flow

1. The user selects a product and quantity on the product details page.
2. Clicking Add to Cart calls the cart action provided by CartContext.
3. The cart reducer processes the action and updates the shared cart state.
4. React components using the cart context receive the updated state.
5. Cart calculations determine the subtotal, promotional discount, shipping cost, and final total.
6. Relevant cart data is persisted in localStorage.
7. Saved cart data is restored when the application loads again.

The Cart class centralizes pricing calculations, while the reducer manages cart state changes.

**Shopping cart data flow:**

`Product Details → CartContext → Reducer → Updated cart state → Cart calculations → UI and localStorage`

### 4. Checkout and Orders Data Flow

1. An authenticated user opens the Checkout page.
2. The checkout form validates the required shipping information.
3. The application reads the current cart items and calculated totals.
4. After successful validation, a demo order is created.
5. The order is saved through the order management logic.
6. Order history is persisted in localStorage.
7. The user can view the saved order in Order History and Order Details.
8. After successful order creation, the cart is cleared.

**Checkout data flow:**

`Cart state → Checkout validation → Order creation → OrdersContext → localStorage → Order History and Order Details`

Orders are stored locally and are not submitted to a real payment or order-processing backend.

### 5. Persistence and Error Handling

Browser localStorage is used to retain relevant demo data between page refreshes, including authentication state, cart contents, promotional codes, orders, reviews, profile information, and theme preference.

Stored data is read and restored by the relevant application logic. The project uses validation and type guards for supported persisted data structures to reduce the risk of using invalid stored values.

API requests are handled separately from local persistence. Network errors are displayed through component error states, and the catalog provides a Retry action.

React Error Boundary provides fallback UI for supported rendering errors.

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

Enter a username and password in the login form.

The username is required, and the password must contain at least six characters.

Authentication is handled locally and does not require a real account or backend authentication service.

Do not use real passwords.

### Promotional Code

Add products to the cart and enter:

```text
10X10
```

The code applies an additional 10% discount to the cart subtotal.

The promotional code is case-insensitive and remains active after a page refresh until it is removed or cleared through the supported cart or checkout flow.

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
vercel.json
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

A Cart class centralizes subtotal, discount, shipping, and total calculations.

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

| Key or Key Pattern | Purpose |
|---|---|
| `10x-shop-username` | Store the current demo username |
| `10x-shop-cart-${owner}` | Store cart contents separately for each demo user |
| `10x-shop-promo-${owner}` | Store the promotional code separately for each demo user |
| `10x-shop-orders` | Store order records, with user-related filtering in application logic |

The `${owner}` portion represents the user-specific identifier generated by the application.

Product reviews, profile information, and theme preferences also use browser storage. Their persistence is managed by the corresponding application logic.

Although order records share a storage collection, the application associates orders with users and filters the displayed order history accordingly.

User-specific storage reduces unintended sharing between demo accounts, but it does not provide server-side security or access control.

Data is stored locally in the browser. Clearing browser storage can remove saved demo data.

## Error Handling and Testing

The application includes:

- API error messages with HTTP status information
- Retry functionality for failed product requests
- AbortController cleanup for asynchronous requests
- React Error Boundary
- Not Found route handling
- Invalid product ID handling
- TypeScript strict checks
- ESLint checks
- Production build verification
- Vercel SPA routing fallback for direct navigation and page refreshes

Debugging activities and test observations are documented in `DEBUG-LOG.md`.

### Verification Commands

```bash
npm run typecheck
npm run lint
npm run build
```

### Local Verification

The application has been checked for:

- Product catalog search, filtering, sorting, and pagination
- URL-based catalog behavior
- Loading skeletons
- API failure and Retry functionality
- Error Boundary fallback
- Product image gallery and related products
- Cart quantity and stock handling
- Promotional code and shipping calculations
- Login validation
- Checkout form validation
- Order creation and order details
- Invalid product IDs and missing products
- Dark Mode functionality
- User-specific local data handling
- Local data clearing using a secondary demo account

### Production Verification

The deployed Vercel application has been checked for:

- Product catalog loading
- Product search, category filtering, sorting, and pagination
- URL-based catalog state
- Product details and related products
- Shopping cart and shipping calculations
- Demo authentication and protected routes
- Checkout and order creation
- Order history and order details
- Reorder functionality
- Profile persistence
- Logout behavior
- Login validation improvements
- Checkout validation messages
- Custom Not Found pages for invalid and missing product IDs
- Direct navigation and refresh on nested application routes

These checks were performed manually during development and production verification.

Some broader regression scenarios, including every responsive layout and every possible browser storage failure condition, were not exhaustively tested.

### Lighthouse Audit

A mobile Lighthouse audit was performed on November 5, 2026, using Chrome DevTools against the deployed Vercel application.

| Category | Recorded Score |
|---|---:|
| Performance | 94 |
| Accessibility | 95 |
| Best Practices | 100 |
| SEO | 83 |

The recorded scores represent one audit run and may vary with network conditions, device emulation, and application state.

Additional audit details and production bundle measurements are documented in `REPORT.md`.

## Development Progress

Development progress is documented in:

- `PLAN.md` — Project plan, CORE/FULL scope, and development milestones
- `REPORT.md` — Planned vs implemented features, testing, deployment, and lessons learned
- `DEBUG-LOG.md` — Debugging cases, verification, and Git commit references
- `progress/week-1.md` — October 20–26, 2026
- `progress/week-2.md` — October 27 – November 2, 2026
- `progress/week-3.md` — November 3–6, 2026

The repository also includes Git commit history, feature branches, GitHub Issues, and merged Pull Requests documenting the development process.

The third development week included final pricing and cart improvements, deployment, validation fixes, user experience improvements, testing, documentation, and demo video preparation.

## Limitations

10X Shop is an educational demonstration project, not a production e-commerce platform.

- Authentication is simulated and does not provide server-side account security.
- Orders are stored in browser localStorage instead of a backend database.
- Real payments are not supported.
- Product data depends on the external DummyJSON API.
- Cart, reviews, profile information, and order data are not synchronized between devices.
- Promotional discounts are implemented for demonstration purposes.
- User-specific browser storage does not replace secure backend authorization.
- Some responsive and storage failure scenarios were not exhaustively tested.

## Deployment

10X Shop was deployed to Vercel on November 3, 2026.

**Live Demo:** https://10x-shop-flax.vercel.app

The application is connected to the GitHub repository and automatically deployed from the `main` branch using Vercel's Git integration.

The Vercel project uses the Vite framework preset and the production build output generated in the `dist` directory.

### SPA Routing Configuration

The application uses React Router for client-side navigation.

A `vercel.json` configuration file defines a rewrite to `/index.html`, allowing React Router to handle direct navigation and browser refreshes on application routes such as `/cart` and `/products/:id`.

This configuration resolves the Vercel 404 error previously encountered when refreshing nested application routes.

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
- User-specific client-side data handling
- Dark Mode implementation
- Git and GitHub development workflows
- Production deployment using Vercel

## Credits

**Developer:** Nazi Pholadashvili

**Project:** 10X Shop — React & TypeScript Final Project

**Product Data API:** [DummyJSON](https://dummyjson.com/) — public REST API used for product information, search, categories, and product details.

**Frontend Technologies:** React, TypeScript, Vite, Tailwind CSS, and React Router.

**Deployment Platform:** [Vercel](https://vercel.com/).

**AI Assistance:** AI tools were used to support learning, explain technical concepts, review code, investigate errors, plan debugging steps, and improve documentation. Implementation changes were checked using code review, development tools, build verification, and manual browser testing.

This project was developed for educational purposes.