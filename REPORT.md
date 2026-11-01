# 10X Shop — Project Report

## 1. Project Overview

10X Shop is a responsive e-commerce demo application developed using React 19, TypeScript, Vite, Tailwind CSS v4, and React Router.

The project uses the DummyJSON REST API to retrieve product information. React Context API manages shared application state, while browser localStorage provides persistence for demo authentication, shopping cart contents, and order history.

The main objective is to demonstrate practical frontend development skills, including component-based architecture, routing, API integration, state management, error handling, responsive design, and Git-based development workflows.

**Project deadline:** November 6, 2026, at 23:59.

## 2. Planned vs Implemented Features

The original project plan defined the following CORE requirements.

| Planned Feature | Current Status |
|---|---|
| Product catalog | Implemented |
| Product details page | Implemented |
| Shopping cart | Implemented |
| Local authentication | Implemented |
| Protected checkout | Implemented |
| Checkout form validation | Implemented |
| Order confirmation | Implemented |
| 404 page | Implemented |
| Loading and error handling | Implemented |
| Responsive design | Implemented; final verification pending |
| Error Boundary | Implemented |

All planned CORE application features have been implemented. Final cross-page testing and deployment remain to be completed.

## 3. Additional Features

Several features were developed beyond the initial CORE plan.

### Enhanced Product Catalog

- Product search with debouncing
- Category filtering
- Sorting by price, rating, and title
- Pagination with 12 products per page
- URL-based catalog state
- Loading skeletons
- Retry functionality for failed product requests
- AbortController-based request cancellation

### Cart Improvements

- Persistent cart using localStorage
- Product quantity updates
- Stock-aware quantity limits
- Automatic total item count and price calculations
- Cart restoration after page refresh

### Orders and User Features

- Order history
- Order details page
- Generated order IDs and order numbers
- Shipping information collection
- Order confirmation
- User profile route
- Persistent demo authentication

These features provide a more complete e-commerce demonstration while maintaining a frontend-focused architecture.

## 4. Technical Implementation

### Routing

React Router manages navigation between the catalog, product details, login, cart, checkout, orders, order details, and profile pages.

ProtectedRoute restricts access to checkout, order history, order details, and profile routes based on the application's demo authentication state.

### API Integration

The application uses the DummyJSON API for product listings, search, category filtering, category lists, and product details.

API functions check HTTP response status and throw descriptive errors when requests fail.

AbortSignal support allows pending requests to be cancelled when appropriate.

### State Management

React Context API is used through three main providers:

- AuthProvider manages the demo username and authentication state.
- CartProvider manages products, quantities, and cart totals.
- OrdersProvider manages saved orders and order numbering.

### Data Persistence

Browser localStorage stores:

- Demo username
- Shopping cart contents
- Order history

Authentication and checkout are simulated. No real payment processing or backend order database is used.

## 5. Development Challenges and Solutions

The following issues were recorded during development in DEBUG-LOG.md.

### Issue 1 — Add to Cart Button Did Not Work

**Problem:** The Add to Cart button initially did not update the shopping cart.

**Solution:** Connected the button to the addToCart function provided by CartContext.

**Verification:** Added products to the cart and confirmed that cart contents and totals updated correctly.

### Issue 2 — API Error Messages Were Too Generic

**Problem:** API errors did not provide the HTTP response status.

**Solution:** Updated the API functions to include response.status when response.ok is false.

**Verification:** Confirmed that the updated code passed the production build.

### Issue 3 — Product Loading Failure Had No Retry Option

**Problem:** When a product API request failed, the page displayed an error without providing a retry action.

**Solution:** Added a Try Again button and retryCount state to Products.tsx. Updating retryCount triggers another request through useEffect.

**Verification using Chrome DevTools:**

1. Blocked the DummyJSON products API request in Chrome DevTools.
2. Confirmed that the product page displayed an error message and the Try Again button.
3. Clicked Try Again while the request was blocked and observed another failed request.
4. Removed the network request block.
5. Clicked Try Again again and confirmed that products loaded successfully.

This test verified both the failure state and recovery behavior of the Retry functionality.

### Issue 4 — Error Boundary Testing

**Problem:** Unexpected React rendering errors required a fallback interface.

**Solution:** Added an ErrorBoundary component and wrapped the application with it in main.tsx.

**Verification:** Temporarily triggered a rendering error, confirmed the fallback interface appeared, removed the test error, and verified that the application built successfully.

## 6. Testing and Quality Assurance

The project plan includes TypeScript checking, ESLint, browser testing, mobile responsiveness, and production build verification.

### Completed Verification

- TypeScript checks using npm run typecheck
- ESLint checks using npm run lint
- Production build using npm run build
- Browser testing of catalog search, filtering, sorting, and pagination
- URL-based catalog behavior
- Responsive catalog testing at a mobile viewport
- Loading skeleton testing under throttled network conditions
- API failure and Retry testing using Chrome DevTools
- Error Boundary fallback testing

### Remaining Verification

- Final functional review of all application pages
- Final responsive review across key page layouts
- Final regression checks after documentation and deployment changes
- Verification of the deployed application

## 7. Git and GitHub Workflow

The project uses Git and GitHub for version control.

Development work is organized through feature branches, meaningful Conventional Commits, GitHub Issues, and Pull Requests.

Completed changes are reviewed and merged into the main branch.

The README documentation update was completed through GitHub Issue #12 and Pull Request #13.

Repository:

https://github.com/NaziPholadashvili/10x-shop

## 8. Planned Deliverables and Current Status

| Deliverable | Current Status |
|---|---|
| GitHub repository | Completed |
| PLAN.md | Completed |
| README.md | Completed |
| DEBUG-LOG.md | Created; additional documentation may be added |
| REPORT.md | In progress |
| Live deployed application | Pending |

Additional progress documentation and final project presentation materials are planned as part of the remaining project work.

## 9. Remaining Work

Before final submission, the following tasks remain:

1. Complete and review project documentation.
2. Perform final functional and responsive testing.
3. Document any additional real debugging issues encountered.
4. Complete production deployment.
5. Verify the live application and update the README with its URL.
6. Update this report with final testing and deployment results.
7. Prepare the project demonstration and oral defense.

Deployment is intentionally scheduled after the remaining development, documentation, and local verification work.

## 10. Lessons Learned

Developing 10X Shop provided practical experience with:

- Organizing a React and TypeScript application
- Building reusable components and shared state
- Integrating REST APIs
- Managing asynchronous requests and cancellation
- Handling loading, error, and empty states
- Testing API failures with browser developer tools
- Implementing client-side routing and protected pages
- Persisting frontend data with localStorage
- Validating forms and managing checkout state
- Using Git branches, Issues, Pull Requests, and meaningful commits

The project also demonstrated the importance of verifying changes before committing them and documenting actual technical problems rather than hypothetical issues.

## 11. Conclusion

10X Shop has progressed from the initial project plan to a functional frontend e-commerce demonstration with additional catalog, cart, authentication, and order-management features.

The planned CORE application features have been implemented, while final verification, deployment, and submission preparation remain in progress.

This report will be updated after the remaining work is completed to reflect the final project status accurately.