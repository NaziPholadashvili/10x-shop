# 10X Shop — Project Report

## 1. Project Overview

10X Shop is a responsive e-commerce demo application developed using React 19, TypeScript, Vite 8, Tailwind CSS v4, and React Router 7.

The application uses the DummyJSON REST API to retrieve product information. React Context API and reducer-based state management support shared application state, while browser localStorage provides persistence for demo authentication, shopping cart contents, promotional codes, product reviews, and order history.

The main objective is to demonstrate practical frontend development skills, including component-based architecture, routing, API integration, state management, error handling, responsive design, and Git-based development workflows.

**Project deadline:** November 6, 2026, at 23:59.

**Feature development completed:** November 3, 2026.

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

All planned CORE application features have been implemented.

Final cross-page testing, deployment, and submission preparation remain to be completed.

## 3. Additional Features

Several features were developed beyond the initial CORE plan.

### Enhanced Product Catalog

- Product search with 400ms debouncing
- Category filtering
- Sorting by price, rating, and title
- Pagination with 12 products per page
- URL-based catalog state
- Clear Filters functionality
- Loading skeletons
- Retry functionality for failed product requests
- AbortController-based request cancellation
- Reusable product cards
- Discounted product prices

### Enhanced Product Details

- Interactive product image gallery
- Product ratings and reviews
- User-submitted reviews with localStorage persistence
- Related product recommendations
- Navigation between related products
- Product quantity selection

### Cart Improvements

- Persistent cart using localStorage
- Product quantity updates
- Stock-aware quantity limits
- Cart item count badge
- Reducer-based cart state management
- Discounted product prices
- Promotional code application and removal
- Persistent `10X10` promotional discount
- Shipping cost calculation
- Consistent cart and checkout totals

### Orders and User Features

- Order history
- Order details page
- Generated order IDs and order numbers
- Dynamic order statuses
- Reorder functionality
- Shipping information collection
- Checkout form validation
- Duplicate submission prevention
- Order confirmation
- Editable protected user profile
- Persistent demo authentication

### User Experience Improvements

- Shared application layout
- Responsive navigation
- Shared footer
- Automatic scroll to top on route changes
- Custom Not Found page
- React Error Boundary
- Loading and error states

These features provide a more complete e-commerce demonstration while maintaining a frontend-focused architecture.

## 4. Technical Implementation

### Routing

React Router manages navigation between the catalog, product details, login, cart, checkout, orders, order details, and profile pages.

ProtectedRoute restricts access to checkout, order history, order details, and profile routes based on the application's demo authentication state.

Application routes were refactored into separate route components to improve code organization.

### API Integration

The application uses the DummyJSON API for product listings, search, category filtering, category lists, and product details.

API functions check HTTP response status and throw descriptive errors when requests fail.

AbortSignal support allows pending requests to be cancelled when appropriate.

The product catalog supports debounced search, sorting, pagination, URL-based state, and loading skeletons.

### State Management

React Context API is used through three main providers:

- AuthProvider manages demo authentication and the current username.
- CartProvider manages cart items, quantities, promotional discounts, shipping costs, and totals.
- OrdersProvider manages saved orders and order numbering.

Cart actions are organized using reducer-based state management.

### Pricing and Shipping

The application supports product-level discounts and an additional promotional discount.

The pricing calculation follows these steps:

1. Calculate the subtotal using discounted product prices.
2. Apply the promotional discount, if active.
3. Calculate shipping based on the amount after promotional discounts.
4. Add shipping to determine the final total.

The promotional code `10X10` applies an additional 10% discount.

Orders of $100 or more after promotional discounts qualify for free shipping. Orders below $100 have a $10 shipping charge.

The cart and checkout use consistent pricing rules.

### Data Persistence

Browser localStorage stores:

- Demo username
- Shopping cart contents
- Order history
- Active promotional code
- User-submitted product reviews

The promotional code uses the `10x-shop-promo` storage key.

Authentication and checkout are simulated. No real payment processing or backend order database is used.

## 5. Development Challenges and Solutions

The following issues were recorded during development in `DEBUG-LOG.md`.

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

### Additional Development Challenges

The project also required improvements in several technical areas:

- Resolving context-related ESLint errors by separating context hooks.
- Organizing protected routes and fallback navigation.
- Maintaining consistent product prices across product details, cart, and checkout.
- Managing increasingly complex cart actions using a reducer.
- Persisting promotional discounts without changing the existing cart storage format.

These improvements were implemented during feature development and code refactoring.

## 6. Testing and Quality Assurance

The project plan includes TypeScript checking, ESLint, browser testing, mobile responsiveness, and production build verification.

### Completed Verification

- TypeScript checks
- ESLint checks
- Production build verification
- Browser testing of catalog search, filtering, sorting, and pagination
- URL-based catalog behavior
- Responsive catalog testing at a mobile viewport
- Loading skeleton testing under throttled network conditions
- API failure and Retry testing using Chrome DevTools
- Error Boundary fallback testing
- Related product navigation testing
- Promotional code validation
- Promotional code persistence after page refresh
- Promotional code removal
- Checkout and order details verification with promotional discounts

### Remaining Verification

- Final functional review of all application pages
- Final responsive review across key page layouts
- Final regression checks after deployment
- Verification of the deployed application

The following commands are used for code quality verification:

```bash
npm run typecheck
npm run lint
npm run build
```

## 7. Git and GitHub Workflow

The project uses Git and GitHub for version control.

Development work was organized through meaningful Conventional Commits, feature branches, GitHub Issues, and Pull Requests.

Some early features were committed directly to the main branch. Later development increasingly used feature branches and Pull Requests.

### Git Statistics

As of November 3, 2026, after the weekly progress documentation commit:

| Metric | Result |
|---|---|
| Git commits | 60 |
| Distinct commit dates | 15 |
| Merged Pull Requests | 15 |

These results meet the project's quantitative FULL-level development targets:

- At least 40 meaningful commits
- At least 15 distinct commit dates
- At least 8 merged Pull Requests

Individual Pull Requests and their Issue references and testing instructions should also be reviewed against the project requirements.

### GitHub Workflow Examples

- PR #2 — Error Boundary
- PR #4 — Context hooks ESLint fix
- PR #6 — Not Found fallback route
- PR #8 — Order details
- PR #10 — Full catalog
- PR #11 — Catalog skeleton loading
- PR #13 — README documentation
- PR #15 — Project report
- PR #17 — Product reviews
- PR #19 — Product image gallery
- PR #21 — Related products
- PR #23 — Discounted product prices
- PR #25 — Cart and checkout discounted prices
- PR #27 — Cart reducer and shipping
- PR #29 — Promotional code

Repository:

https://github.com/NaziPholadashvili/10x-shop

## 8. Development Progress

Development progress is documented in three weekly reports.

### Week 1 — October 20–26

- Initial project setup
- Product catalog and product details
- Demo authentication
- Shopping cart and checkout
- Search, category filtering, and sorting
- localStorage persistence
- Order history and profile

### Week 2 — October 27 – November 2

- Error Boundary and API error handling
- Retry functionality
- Strict TypeScript and ESLint improvements
- Not Found routing
- Navigation and cart improvements
- Order details and status tracking
- Full catalog functionality
- Skeleton loading
- README and project report documentation
- Product reviews, image gallery, and related products

### Week 3 — November 3

- Discounted product prices
- Discount integration throughout cart and checkout
- Cart reducer
- Shipping calculation
- Persistent `10X10` promotional discount

The detailed reports are available in:

- `progress/week-1.md`
- `progress/week-2.md`
- `progress/week-3.md`

## 9. Planned Deliverables and Current Status

| Deliverable | Current Status |
|---|---|
| GitHub repository | Completed |
| PLAN.md | Completed |
| README.md | Updated with implemented features |
| DEBUG-LOG.md | Completed for documented debugging activities |
| REPORT.md | Updated; final deployment results pending |
| Weekly progress reports | Completed |
| Live deployed application | Pending |
| Final application testing | Pending |
| Demo video | Pending |
| Oral defense preparation | Pending |

## 10. Remaining Work

Before final submission, the following tasks remain:

1. Complete final documentation review.
2. Perform final functional and responsive testing.
3. Complete production deployment.
4. Verify the live application and update the README with its URL.
5. Update this report with final testing and deployment results.
6. Record a demo video demonstrating the main application features.
7. Prepare for the oral defense.

## 11. Lessons Learned

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
- Using reducer-based state management
- Implementing pricing, promotional discounts, and shipping calculations
- Using Git branches, Issues, Pull Requests, and meaningful commits

The project demonstrated the importance of verifying changes before committing them and documenting actual technical problems rather than hypothetical issues.

## 12. Conclusion

10X Shop has progressed from the initial project plan to a functional frontend e-commerce demonstration with product discovery, authentication, shopping cart, checkout, order management, product reviews, and promotional discounts.

The planned CORE application features and additional e-commerce functionality have been implemented.

The project has also reached its quantitative Git development targets.

Final functional verification, production deployment, demo video preparation, and oral defense preparation remain in progress.

This report will be updated after the remaining work is completed to reflect the final project status accurately.