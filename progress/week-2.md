# Week 2 Progress Report

**Project:** 10X Shop — React & TypeScript Final Project  
**Period:** October 27 – November 2, 2026  
**Git History:** 34 commits, including 11 merge commits  
**Active Development Days:** 7

## 1. Weekly Goals

The second week focused on improving application reliability, code quality, user experience, and completing advanced e-commerce functionality.

The main priorities were:

- Error handling and recovery
- TypeScript and ESLint improvements
- Navigation and user interface enhancements
- Shopping cart and checkout improvements
- Order details and status tracking
- Full product catalog functionality
- Product reviews, image gallery, and related products
- Project documentation
- GitHub Issues and Pull Request workflow

## 2. Completed Work

### October 27 — Error Boundary and API Error Handling

- Implemented an Error Boundary component to handle React rendering errors.
- Merged Pull Request #2.
- Improved product API error messages to include HTTP status information.

### October 28 — Retry Functionality and Code Quality

- Added a Retry button for failed product requests.
- Created `DEBUG-LOG.md` to document debugging activities.
- Enabled stricter TypeScript checks.

### October 29 — Not Found Page

- Implemented a custom 404 Not Found page.

### October 30 — ESLint Fixes and Route Handling

- Separated context hooks to resolve ESLint issues.
- Merged Pull Request #4.
- Added a fallback route for the Not Found page.
- Merged Pull Request #6.

### October 31 — Navigation, Layout, and Cart Improvements

- Corrected the catalog route and header navigation.
- Added a cart item count badge to the header.
- Implemented a shared footer.
- Added automatic scroll-to-top behavior when navigating between routes.
- Added quantity controls to Product Details and Cart pages.

### November 1 — Checkout, Orders, and Full Catalog

- Improved checkout confirmation and cart quantity handling.
- Added order numbers and dynamic order statuses.
- Refactored application routes and protected route logic into separate modules.
- Implemented order details, status tracking, and reorder functionality.
- Merged Pull Request #8.
- Completed catalog search, filtering, sorting, and pagination functionality.
- Merged Pull Request #10.
- Added skeleton loading to the product catalog.
- Merged Pull Request #11.

### November 2 — Documentation and Product Details Enhancements

- Replaced the default Vite README with project-specific documentation.
- Merged Pull Request #13.
- Created the project report documenting progress and lessons learned.
- Merged Pull Request #15.
- Implemented product reviews with localStorage persistence.
- Merged Pull Request #17.
- Added an interactive product image gallery.
- Merged Pull Request #19.
- Implemented related products on the Product Details page.
- Merged Pull Request #21.

## 3. Technical Concepts Practiced

The second week provided practical experience with:

- React Error Boundaries
- API error handling and retry functionality
- Strict TypeScript configuration
- ESLint and code organization
- React Router fallback and protected routes
- Shared and reusable UI components
- Cart quantity management
- Order persistence and status tracking
- Search, filtering, sorting, and pagination
- Skeleton loading states
- localStorage persistence for product reviews
- Component refactoring
- GitHub Issues, feature branches, and Pull Requests

## 4. Challenges and Problem Solving

### API Error Handling

Product API requests can fail because of network problems or unsuccessful HTTP responses. The application was improved with clearer error messages and retry functionality.

Debugging activities were documented in `DEBUG-LOG.md`.

### ESLint and Context Organization

Context-related ESLint errors required changes to the organization of context hooks. The solution separated hooks into appropriate modules and was integrated through Pull Request #4.

### Navigation and Routing

The application needed consistent navigation, protected routes, and fallback handling for unknown URLs. Route handling was improved and reorganized.

### Catalog Complexity

Combining product search, category filtering, sorting, pagination, and loading states required additional state-management and UI improvements.

## 5. GitHub Collaboration Workflow

During this week, development included feature branches and merged Pull Requests.

The following Pull Requests were merged:

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

These Pull Requests helped organize changes into reviewable units.

## 6. Weekly Git Summary

- **34 commits** appear in the provided Git history for this period.
- **7 distinct development days** were recorded.
- Work included feature development, bug fixes, refactoring, documentation, and merged Pull Requests.

## 7. Next Steps

The next phase will focus on:

- Final cart and checkout improvements
- Discounted product prices
- Shipping calculation
- Promotional discount functionality
- Updating project documentation
- Deployment
- Final testing and demonstration preparation