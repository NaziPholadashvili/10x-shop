# 10X Shop — Project Report

## 1. Project Overview

10X Shop is a responsive e-commerce demonstration application developed using React 19, TypeScript, Vite 8, Tailwind CSS v4, and React Router 7.

The application uses the public DummyJSON REST API to retrieve product information. React Context API and reducer-based state management support shared application state, while browser localStorage provides persistence for demo authentication, shopping cart contents, promotional codes, product reviews, user profile information, and order history.

The main objective was to demonstrate practical frontend development skills, including component-based architecture, routing, API integration, state management, form validation, error handling, responsive design, and Git-based development workflows.

**Project deadline:** November 6, 2026, at 23:59.

**Main e-commerce feature milestone:** November 3, 2026.

**Final feature improvements, testing, and documentation:** November 4–6, 2026.

**Live application:** https://10x-shop-flax.vercel.app

**GitHub repository:** https://github.com/NaziPholadashvili/10x-shop

**Demo video:** https://github.com/NaziPholadashvili/10x-shop/issues/59

## 2. Planned vs Implemented Features

The original project plan focused on CORE functionality. During development, the scope was expanded to include FULL requirements and additional user experience improvements.

| Planned CORE Feature | Status |
|---|---|
| Product catalog | Implemented |
| Product details page | Implemented |
| Shopping cart | Implemented |
| Demo authentication | Implemented |
| Protected checkout | Implemented |
| Checkout form validation | Implemented and improved after review |
| Order confirmation | Implemented |
| Custom 404 page | Implemented and improved after review |
| Loading and error handling | Implemented |
| Responsive design | Implemented; key layouts manually reviewed |
| React Error Boundary | Implemented and tested |
| Production deployment | Completed |
| Project documentation | Created and updated |
| Demo video | Completed and linked in README.md |

The main CORE application functionality has been implemented.

The application was deployed, tested, and documented. Additional improvements were completed during the final review period.

## 3. FULL and Additional Features

### 3.1 Enhanced Product Catalog

- Product search with 400ms debouncing
- Category filtering
- Sorting by price, rating, and title
- Pagination with 12 products per page
- URL-based catalog state using search parameters
- Clear Filters functionality
- Loading skeletons
- Retry functionality for failed requests
- AbortController-based request cancellation
- Reusable product cards
- Discounted product prices
- Stock-aware product availability behavior

### 3.2 Enhanced Product Details

- Interactive product image gallery
- Thumbnail-based image selection
- Product ratings and reviews
- User-submitted reviews with localStorage persistence
- Related product recommendations
- Navigation between related products
- Product quantity selection
- Stock-aware Add to Cart behavior
- Validation of product IDs before API requests
- Not Found handling for invalid and missing products

### 3.3 Shopping Cart and Pricing

- Persistent shopping cart using localStorage
- Product quantity updates
- Stock-aware quantity limits
- Cart item count badge
- Reducer-based cart state management
- Product-level discounted prices
- Promotional code application and removal
- Additional 10% discount using `10X10`
- Promotional code persistence
- Shipping cost calculation
- Consistent cart and checkout totals
- User-specific cart and promotional data storage

### 3.4 Authentication, Checkout, and Orders

- Demo authentication using React Context
- Authentication persistence
- Protected routes
- Checkout form validation
- Empty-cart redirect from checkout
- Duplicate order submission prevention
- Order creation and confirmation
- Persistent order history
- Generated order IDs and order numbers
- Order details page
- Dynamic order status display
- Reorder functionality
- Editable protected user profile
- User-specific data handling

### 3.5 User Experience and Engineering

- Shared application layout
- Responsive navigation
- Shared footer
- Automatic scroll to top on route changes
- Custom Not Found page
- React Error Boundary
- Loading, empty, and error states
- Organized routes and protected route logic
- Reusable components and custom hooks
- Dark Mode theme support
- Local data clearing functionality
- TypeScript type checking
- ESLint and production build verification

## 4. Technical Implementation

### 4.1 Routing

React Router manages navigation between the catalog, product details, login, cart, checkout, orders, order details, and profile pages.

`ProtectedRoute` restricts access to checkout, order history, order details, and profile routes based on demo authentication state.

Application routes were separated into dedicated route components to improve code organization.

A fallback route renders the `NotFound` component for unknown application paths.

Product detail routes validate the requested product ID. Invalid IDs are rejected before making an API request. Missing numeric product IDs display the Not Found page when the API returns HTTP 404.

### 4.2 API Integration

The application uses the DummyJSON API for product listings, search, category filtering, category lists, product details, and related products.

API functions check HTTP response status and throw descriptive errors when requests fail.

AbortSignal support allows pending requests to be cancelled when appropriate.

The product catalog supports debounced search, sorting, pagination, URL-based state, and loading skeletons.

### 4.3 State Management

React Context API is used through three main providers:

- `AuthProvider` manages demo authentication and the current username.
- `CartProvider` manages cart items, quantities, promotional discounts, shipping costs, and totals.
- `OrdersProvider` manages saved orders and order numbering.

Cart actions are organized using reducer-based state management.

The cart implementation also uses a Cart class to centralize pricing calculations.

### 4.4 Pricing and Shipping

The application supports product-level discounts and an additional promotional discount.

The pricing calculation follows these steps:

1. Calculate the subtotal using discounted product prices.
2. Apply the promotional discount, if active.
3. Calculate shipping based on the amount after promotional discounts.
4. Add shipping to determine the final total.

The promotional code `10X10` applies an additional 10% discount.

Orders of $100 or more after promotional discounts qualify for free shipping. Orders below $100 have a $10 shipping charge.

The cart and checkout use consistent pricing rules.

### 4.5 Data Persistence

Browser localStorage stores:

- Demo authentication information
- Shopping cart contents
- Order history
- Active promotional code
- User-submitted product reviews
- User profile information
- Theme preference

The application uses browser-based persistence rather than a backend database.

The final implementation includes user-specific storage handling for cart and promotional data, along with user-related review information.

Authentication and checkout are simulated. No real payment processing or backend order database is used.

Because the application uses browser localStorage, the stored data should not be treated as secure server-side storage.

### 4.6 Dark Mode

Dark Mode was added as an additional user experience feature.

The application supports switching between visual themes.

Theme-related styling was reviewed and improved across the application.

The selected theme is preserved using browser storage.

### 4.7 User Data Isolation and Local Data Clearing

During the final review, user-specific data handling was improved.

The implementation includes:

- User-specific cart storage
- User-specific promotional code storage
- User identification for newly submitted reviews
- Local data clearing functionality in the profile
- Order clearing support
- Backup and restoration attempts during the local data clearing process

These changes were intended to reduce unintended sharing of locally stored application data between demo users.

The Clear Local Data functionality was manually tested using a secondary demo account.

The test confirmed that profile data was cleared and remained cleared after a page refresh.

The session and selected theme remained available during that test.

The final implementation includes error-handling and restoration logic, but not every possible storage failure or multi-user scenario was independently tested.

## 5. Development Challenges and Solutions

The following development issues were documented in `DEBUG-LOG.md`.

### 5.1 Issue 1 — Add to Cart Button Did Not Work

**Problem:** The Add to Cart button initially did not update the shopping cart.

**Solution:** Connected the button to the `addToCart` function provided by CartContext.

**Verification:** Added products to the cart and confirmed that cart contents and totals updated correctly.

### 5.2 Issue 2 — API Error Messages Were Too Generic

**Problem:** API errors did not provide the HTTP response status.

**Solution:** Updated API functions to include `response.status` when `response.ok` is false.

**Verification:** Confirmed that the updated code passed the production build.

### 5.3 Issue 3 — Product Loading Failure Had No Retry Option

**Problem:** When a product API request failed, the page displayed an error without providing a retry action.

**Solution:** Added a Try Again button and `retryCount` state to `Products.tsx`. Updating `retryCount` triggers another request through `useEffect`.

**Verification using Chrome DevTools:**

1. Blocked the DummyJSON products API request.
2. Confirmed that the catalog displayed an error and Try Again button.
3. Clicked Try Again while the request was blocked and observed another failed request.
4. Removed the network request block.
5. Clicked Try Again again and confirmed that products loaded successfully.

This verified both the failure state and recovery behavior.

### 5.4 Issue 4 — Error Boundary Testing

**Problem:** Unexpected React rendering errors required a fallback interface.

**Solution:** Added an `ErrorBoundary` component and wrapped the application with it in `main.tsx`.

**Verification:** Temporarily triggered a rendering error, confirmed the fallback interface appeared, removed the test error, and verified that the application built successfully.

### 5.5 Additional Development Challenges

Other technical improvements included:

- Resolving context-related ESLint errors by separating context hooks
- Organizing protected routes and fallback navigation
- Maintaining consistent prices across product details, cart, and checkout
- Managing increasingly complex cart actions using a reducer
- Persisting promotional discounts
- Fixing direct navigation to nested routes on Vercel
- Improving login and checkout validation after evaluation feedback
- Improving invalid product ID and HTTP 404 handling
- Synchronizing stock-aware product behavior with cart quantities
- Improving user-specific localStorage handling
- Adding and refining Dark Mode support
- Improving local data clearing behavior

## 6. Testing and Quality Assurance

The project was verified using TypeScript checks, ESLint, production builds, manual browser testing, and Chrome DevTools.

### 6.1 Completed Local Verification

- TypeScript checks
- ESLint checks
- Production build verification
- Catalog search, filtering, sorting, and pagination
- URL-based catalog behavior
- Responsive catalog testing at a mobile viewport
- Loading skeleton testing under throttled network conditions
- API failure and Retry testing
- Error Boundary fallback testing
- Related product navigation
- Promotional code application and persistence
- Promotional code removal
- Checkout and order details with promotional discounts
- Checkout validation
- Order creation and order details
- Invalid product ID handling
- Missing product HTTP 404 handling
- Dark Mode functionality
- Local data clearing using a secondary demo account

### 6.2 Login Validation Improvements

After evaluation feedback, the login form was improved to provide field-specific validation messages.

The validation includes:

- Username is required
- Password is required
- Password must be at least 6 characters

The login page also includes navigation back to the catalog.

The header displays Log in or Log out based on authentication state.

The shopping cart badge is hidden when the cart is empty.

These improvements were implemented through GitHub Issue #30 and merged in Pull Request #31.

### 6.3 Checkout Validation Improvements

After evaluation feedback, checkout validation was updated to display field-specific messages.

The validation covers:

- Full name: minimum 3 characters
- Email: valid email format
- Address: minimum 5 characters
- City: required
- Postal code: 4–10 digits

An empty cart redirects the user from checkout to the cart page.

Local testing confirmed that invalid values displayed the expected messages and valid values allowed an order to be placed.

The validation messages were also verified on the deployed Vercel application.

These improvements were implemented through GitHub Issue #32 and merged in Pull Request #33.

### 6.4 Not Found Improvements

The existing `NotFound` component and fallback route were retained.

Product ID handling was improved to distinguish invalid IDs, missing products, and other request failures.

Local tests confirmed:

- `/products/abc3` displayed Not Found without a product API request.
- `/products/999999` received HTTP 404 and displayed Not Found.
- `/products/1` loaded a real product and retained its main functionality.

TypeScript, ESLint, and production build checks passed.

Production tests confirmed that `/products/abc` and `/products/999999` displayed the expected Not Found page.

These improvements were implemented through GitHub Issue #34 and merged in Pull Request #35.

### 6.5 Verification Commands

The following commands were used for code quality verification:

```bash
npm run typecheck
npm run lint
npm run build
```

The following command was also used during the final review:

```bash
npx tsc --noEmit
```

### 6.6 Lighthouse Performance Audit

A Lighthouse audit was performed on November 5, 2026, using Chrome DevTools against the deployed Vercel application.

**Audited URL:** https://10x-shop-flax.vercel.app/

**Audit environment:**

- Tool: Chrome DevTools Lighthouse
- Audit type: Navigation
- Device mode: Mobile
- Emulated viewport: 390 × 844
- Target: Production deployment on Vercel

**Lighthouse scores:**

| Category | Score | Interpretation |
|---|---:|---|
| Performance | 94/100 | Good |
| Accessibility | 95/100 | Good |
| Best Practices | 100/100 | Good |
| SEO | 83/100 | Needs improvement |

The audit showed strong results for performance, accessibility, and best practices.

The SEO score was lower than the other categories and remains a potential area for further improvement.

Lighthouse scores are estimates and may vary between runs due to environmental conditions, network behavior, and page state.

These results represent one recorded mobile audit rather than a guarantee of identical performance for every user or route.

### 6.7 Production Bundle Metrics

Production bundle measurements were collected on November 5, 2026, using the following command:

```bash
npm run build
```

The command runs TypeScript project checks followed by the Vite production build:

```bash
tsc -b && vite build
```

**Build environment and result:**

- Build tool: Vite 8.3.4
- Modules transformed: 57
- Build status: Successful
- Reported build time: 314 ms

**Generated production assets:**

| Asset | Uncompressed Size | Gzip Size |
|---|---:|---:|
| `dist/index.html` | 0.45 kB | 0.29 kB |
| `dist/assets/index-BGQUz_BJ.css` | 22.23 kB | 5.07 kB |
| `dist/assets/index-B24A6GEc.js` | 318.73 kB | 95.31 kB |
| **Total** | **341.41 kB** | **100.67 kB** |

These values were reported by Vite during the November 5 production build.

The JavaScript bundle was the largest generated asset in that build.

The gzip figures represent compressed asset sizes and should not be interpreted as a complete measurement of network transfer, API responses, images, or runtime memory usage.

Bundle sizes may change when application code, dependencies, or build configuration are updated.

### 6.8 Final Verification Status

The main application flows were manually tested during development and on the deployed Vercel application.

The final review also included:

- Additional validation improvements
- Product ID and Not Found improvements
- Dark Mode implementation and styling
- User-specific data handling improvements
- Local data clearing testing
- TypeScript, ESLint, and production build verification
- Confirmation that the deployed application remained accessible
- Demo video recording and playback verification

Some broader regression scenarios, including every responsive layout and every possible localStorage failure condition, were not exhaustively tested.

## 7. Git and GitHub Workflow

The project uses Git and GitHub for version control.

Development work was organized through meaningful Conventional Commits, feature branches, GitHub Issues, and Pull Requests.

Some early features and documentation changes were committed directly to `main`. Later development increasingly used feature branches and Pull Requests.

### 7.1 Git Statistics

**Recorded project history snapshot — November 6, 2026, before the final documentation reconciliation commit:**

| Metric | Result |
|---|---:|
| Git commits in `main` history, including merge commits | 101 |
| Distinct commit dates | 18 |
| Merged Pull Requests | 30 |
| GitHub Issues | 29 |
| GitHub branches | 31 |

The project exceeded the quantitative FULL-level development targets:

- At least 40 meaningful commits
- At least 15 distinct commit dates
- At least 8 merged Pull Requests

The 101 commits represent the recorded Git history at the stated snapshot, including merge commits.

The 18 distinct commit dates were calculated from Git history.

The 30 merged Pull Requests were checked using GitHub's merged PR filter.

The Issue and branch counts reflect the repository totals observed during the final review.

These metrics describe different aspects of the repository and are not expected to match each other.

Subsequent documentation-only commits may increase the total commit count without changing the recorded historical snapshot.

### 7.2 GitHub Workflow Examples

Merged Pull Requests include:

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
- PR #31 — Login validation and header improvements
- PR #33 — Checkout validation and empty-cart redirect
- PR #35 — Product ID validation and Not Found handling
- PR #37 — Project planning and reporting improvements
- PR #39 — README Data Flow and Credits
- PR #41 — PLAN WBS estimates and Definition of Done
- PR #58 — User data isolation and local data clearing improvements

Additional merged Pull Requests were completed during the final review period.

The project also uses GitHub Issues to document implementation tasks, fixes, and documentation work.

Issue #59 was created to host the Demo Video and make it accessible through the README.

**Repository:** https://github.com/NaziPholadashvili/10x-shop

## 8. Development Progress

Development progress is documented in three weekly reports.

### Week 1 — October 20–26, 2026

- Initial project setup
- Product catalog and product details
- Demo authentication
- Shopping cart and checkout
- Search, category filtering, and sorting
- localStorage persistence
- Order history and profile

### Week 2 — October 27 – November 2, 2026

- Error Boundary and API error handling
- Retry functionality
- TypeScript and ESLint improvements
- Not Found routing
- Navigation and cart improvements
- Order details and status tracking
- Full catalog functionality
- Skeleton loading
- README and project report documentation
- Product reviews, image gallery, and related products

### Week 3 — November 3–6, 2026

- Discounted product prices
- Discount integration throughout cart and checkout
- Cart reducer
- Shipping calculation
- Persistent `10X10` promotional discount
- Production deployment and route verification
- Login validation improvements
- Checkout validation improvements
- Product ID validation and Not Found improvements
- Final documentation review
- Lighthouse performance audit
- Production bundle measurement
- Dark Mode theme support
- User data isolation improvements
- Local data clearing improvements
- Demo video recording
- Demo video link added to README
- Oral defense preparation

Detailed development notes are available in:

- `progress/week-1.md`
- `progress/week-2.md`
- `progress/week-3.md`

The weekly notes document the development milestones. Final review activities are also summarized in this report.

## 9. Deployment

The application was successfully deployed to Vercel on November 3, 2026.

**Live URL:** https://10x-shop-flax.vercel.app

**Repository:** https://github.com/NaziPholadashvili/10x-shop

Vercel is connected to the GitHub repository and deploys the `main` branch.

### 9.1 SPA Routing Fix

Direct navigation to nested application routes initially caused a Vercel 404 error.

A root-level `vercel.json` file was added to rewrite application requests to `/index.html`.

This allows React Router to handle client-side routes when a user opens a nested URL directly or refreshes the browser.

### 9.2 Production Verification

The deployed application was checked for:

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

The live website was also opened successfully after the final user data isolation changes were merged.

These checks confirmed that the main application flows worked on the deployed version during testing.

## 10. AI Assistance and Development Process

AI tools were used during the project as learning and development assistants.

### 10.1 How AI Was Used

AI assistance supported:

- Explaining React, TypeScript, React Router, Context API, and reducer concepts
- Discussing implementation approaches
- Reviewing code and identifying possible problems
- Helping investigate TypeScript and ESLint errors
- Suggesting debugging and browser testing steps
- Preparing Git commands and Pull Request descriptions
- Reviewing and improving project documentation
- Explaining technical decisions for the oral defense

### 10.2 Verification and Responsibility

AI-generated explanations and code suggestions were not treated as proof that the application worked.

Changes were checked through the development workflow, including:

1. Reviewing the relevant implementation.
2. Running TypeScript, ESLint, and production build checks.
3. Testing functionality in the browser.
4. Using Chrome DevTools when investigating API behavior.
5. Committing verified changes and submitting Pull Requests.
6. Testing important flows on the deployed application.

The project was developed as an educational exercise, with emphasis on understanding the implemented functionality and being able to explain it during the oral defense.

AI assistance did not replace manual testing or verification of application behavior.

## 11. Planned Deliverables and Current Status

| Deliverable | Status |
|---|---|
| GitHub repository | Completed |
| React and TypeScript application | Implemented |
| CORE functionality | Implemented |
| FULL functionality | Main planned features implemented |
| PLAN.md | Updated with WBS, Risks, and DoD |
| README.md | Updated with Data Flow, Credits, and Demo Video |
| DEBUG-LOG.md | Created with documented debugging cases |
| REPORT.md | Updated with final project information |
| Weekly progress reports | Three reports created and updated |
| Live deployed application | Completed |
| Production verification | Main flows verified |
| Lighthouse audit | Completed |
| Production bundle measurement | Completed |
| Dark Mode | Implemented |
| User data isolation improvements | Implemented |
| Local data clearing | Implemented and manually tested on a secondary account |
| Final responsive review | Key layouts tested; exhaustive review not completed |
| Demo video | Completed |
| Demo video link in README | Completed |
| Oral defense preparation | In progress |

## 12. Remaining Work

The main application implementation, deployment, demonstration video, and project documentation have been completed.

The remaining activities are:

1. Review and commit any final documentation consistency corrections.
2. Confirm that the submission links are accessible.
3. Prepare for the oral defense.
4. Complete any additional submission steps required by the lecturer.

No additional feature development is planned before submission.

## 13. Lessons Learned

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
- Managing user-specific data in a browser-based application
- Implementing Dark Mode
- Using Git branches, Issues, Pull Requests, and meaningful commits
- Deploying and testing a client-side application on Vercel
- Reviewing evaluation feedback and correcting specific problems
- Measuring frontend performance using Lighthouse
- Reviewing production bundle sizes
- Preparing a demonstration video

The project demonstrated the importance of testing changes before committing them, documenting actual technical problems, and understanding implementation decisions rather than relying only on generated code.

## 14. Conclusion

10X Shop progressed from an initial CORE-focused project plan to a deployed frontend e-commerce demonstration with product discovery, authentication, shopping cart, checkout, order management, product reviews, promotional discounts, and Dark Mode.

The main CORE application features and planned additional functionality have been implemented.

The application is deployed on Vercel, and its main user flows have been manually verified.

Additional final improvements addressed validation, product availability, user-specific data handling, and local data clearing.

The November 5 Lighthouse audit recorded Performance 94, Accessibility 95, Best Practices 100, and SEO 83.

The November 5 production build completed successfully, generating approximately 341.41 kB of HTML, CSS, and JavaScript assets before compression and 100.67 kB according to the reported gzip sizes.

At the November 6 project history snapshot, the repository had **101 commits in the `main` history, 18 distinct commit dates, and 30 merged Pull Requests**, exceeding the quantitative FULL-level development targets. Subsequent documentation corrections may add further commits.

The Demo Video has been recorded and linked in the project README.

The remaining priority is oral defense preparation and confirmation of the final submission requirements.