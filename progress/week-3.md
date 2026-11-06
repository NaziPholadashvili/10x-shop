# Week 3 Progress Report

**Project:** 10X Shop — React & TypeScript Final Project  
**Period:** November 3–6, 2026
**Reporting Scope:** Final feature development, quality improvements, documentation, deployment verification, and project submission preparation.

## 1. Weekly Goals

The third development week focused on completing the remaining e-commerce features, improving application reliability, addressing lecturer feedback, and preparing the project for final submission.

The main objectives were:

- Implement discounted product prices.
- Apply discounted prices consistently throughout the shopping cart and checkout.
- Refactor cart state management using a reducer.
- Implement shipping cost calculations.
- Add persistent promotional discount functionality.
- Complete the remaining feature Pull Requests.
- Verify the deployed application.
- Review the project against CORE and FULL requirements.
- Address issues identified in the lecturer's preliminary assessment.
- Finalize project documentation and prepare the demonstration video.

## 2. Completed Work

### November 3 — Final Pricing and Cart Features

#### Discounted Product Prices

**Commit:** `92c583f`  
**Pull Request:** #23

- Implemented discounted product prices.
- Improved reusable product card components.
- Added support for displaying product pricing consistently.

#### Cart and Checkout Price Integration

**Commit:** `1bce1c5`  
**Pull Request:** #25

- Applied discounted product prices throughout the shopping cart.
- Updated checkout calculations to use discounted prices.
- Improved pricing consistency between product pages, cart, and checkout.

#### Cart Reducer and Shipping Calculation

**Commit:** `9b1c0db`  
**Pull Request:** #27

- Refactored shopping cart state management using a reducer.
- Implemented shipping cost calculations.
- Integrated shipping calculations into cart and checkout totals.
- Added support for maintaining consistent order totals.

#### Persistent Promotional Discount

**Commit:** `acf5e68`  
**Pull Request:** #29

- Implemented the promotional code `10X10`.
- Added a 10% promotional discount.
- Implemented promotional code persistence using localStorage.
- Added functionality to apply and remove the promotional code.
- Integrated promotional discounts into cart and checkout calculations.

### November 3 — Deployment

- Deployed the application to Vercel.
- Connected the deployment to the GitHub repository.
- Added the live application URL to the README.
- Fixed SPA routing issues using `vercel.json`.
- Verified major application flows in the deployed version.

**Live application:** https://10x-shop-flax.vercel.app

### November 4–6 — Final Improvements and Project Preparation

Following the initial deployment and the lecturer's preliminary assessment, additional work focused on completing the project and improving its compliance with the requirements.

#### CORE Requirement Improvements

- Improved Login form validation with individual field error messages.
- Added password minimum-length validation.
- Added the required Back to catalog navigation.
- Improved Checkout form validation with field-specific checks.
- Updated NotFound handling and required interface messages.
- Improved handling of invalid product IDs.
- Reviewed Header navigation labels and cart badge behavior.
- Updated Error Boundary messages to match the required wording.

#### Additional Application Improvements

- Improved user profile functionality.
- Added or refined theme switching and Dark Mode support.
- Improved user-specific localStorage handling.
- Added functionality for clearing locally stored application data.
- Reviewed application behavior after authentication and logout.

#### Testing and Quality Review

- Reviewed the application against CORE and FULL requirements.
- Performed additional production checks.
- Verified key shopping flows, including catalog browsing, product details, cart, checkout, and order history.
- Reviewed form validation and error-handling behavior.
- Performed Lighthouse testing and documented the results.

**Recorded Lighthouse results:**

| Category | Score |
|---|---:|
| Performance | 94 |
| Accessibility | 95 |
| Best Practices | 100 |
| SEO | 83 |

#### Documentation and Demonstration

- Updated `README.md` with additional project information and Credits.
- Expanded `PLAN.md` with CORE/FULL scope, development stages, WBS, risks, and Definition of Done.
- Updated `REPORT.md` to document implemented functionality, technical decisions, testing, and AI assistance.
- Improved `DEBUG-LOG.md` with reproduction steps, tools, causes, fixes, verification, and commit references.
- Reviewed the weekly progress documentation.
- Recorded and published the project demonstration video.

**Demo video:** https://github.com/NaziPholadashvili/10x-shop/issues/59

## 3. Technical Concepts Practiced

The final development week included:

- React state management with `useReducer`
- React Context API
- TypeScript and type-safe application logic
- Reusable component design
- Shopping cart calculations
- Product discounts, promotional discounts, and shipping calculations
- localStorage persistence and data validation
- Form validation and error handling
- React Router and protected routes
- Conditional rendering and NotFound handling
- Responsive UI improvements
- Application deployment and production testing
- Git feature branches, Issues, and Pull Requests
- Project documentation and debugging practices

## 4. Challenges and Solutions

### Consistent Price Calculations

Product discounts, promotional discounts, and shipping costs needed to be reflected consistently throughout the shopping experience.

The pricing logic was consolidated and reused across cart, checkout, and order calculations.

### Cart State Management

As cart functionality expanded, managing updates became more complex.

Reducer-based state management helped organize cart actions and maintain predictable state updates.

### Promotional Code Persistence

The promotional code needed to remain available after a page refresh while allowing users to remove it when necessary.

This was addressed using localStorage and dedicated promotional code actions.

### Form Validation and Requirement Compliance

The lecturer's preliminary assessment identified differences between the implemented validation messages and the exact PRD requirements.

Login and Checkout validation were improved to provide field-specific feedback and meet the required constraints.

### Invalid Routes and Product IDs

Invalid product routes needed to display the correct NotFound interface rather than a generic loading or API error.

Route handling and product ID validation were improved to address these cases.

### Documentation Consistency

The project evolved beyond its original CORE implementation plan.

The documentation was expanded to distinguish the initial scope, later FULL functionality, completed work, and final project results.

## 5. GitHub Workflow

Four pricing and cart feature Pull Requests were merged on November 3:

- PR #23 — Discounted product prices
- PR #25 — Cart and checkout discounted prices
- PR #27 — Cart reducer and shipping calculation
- PR #29 — Persistent `10X10` promotional discount

All four feature branches were integrated into the main development branch.

Additional feature, quality improvement, and documentation work was completed during the final development period.

The final GitHub workflow included Issues, feature branches, Pull Requests, code changes, and documentation updates.

## 6. Git Progress

### November 3

- **8 commits** were recorded, including 4 merge commits.
- **4 feature Pull Requests** were merged.
- **1 active commit day** was recorded for this date.

### Final Project Statistics

The final project report records:

| Metric | Final Total |
|---|---:|
| Git commits | 101 |
| Distinct commit days | 18 |
| Merged Pull Requests | 30 |
| GitHub Issues | 29 |
| Branches | 31 |

These totals describe the complete project history, not only Week 3.

## 7. Final Project Status

By the end of the final development period, the application included:

- Product catalog and product details
- Product search with debounce
- Category filtering, sorting, and pagination
- URL-based catalog state
- User authentication and protected routes
- Shopping cart with reducer-based state management
- Checkout with field validation
- Order history and order details
- Order status updates and reorder functionality
- User profile functionality
- Product reviews and image gallery
- Related products
- Discounted product prices
- Shipping cost calculations
- Promotional code `10X10`
- Dark Mode and theme switching
- User-specific localStorage persistence
- Local data clearing functionality
- Error handling, retry functionality, and Error Boundary
- NotFound handling
- Responsive interface
- Vercel deployment
- Updated project documentation
- Lighthouse testing
- Demonstration video

The final project was deployed, documented, and prepared for submission.

## 8. Weekly Reflection

Week 3 marked the transition from feature development to final project stabilization and submission preparation.

The most important technical improvements involved pricing consistency, cart state management, form validation, routing, and persistent application data.

The lecturer's preliminary feedback helped identify differences between working functionality and the exact requirements of the project specification.

Addressing these issues improved the project's CORE compliance while preserving the additional FULL functionality already implemented.

The final documentation review also highlighted the importance of keeping the original plan, weekly progress reports, and final implementation report consistent with the actual development history.

**Final outcome:** The main application features were completed, the project was deployed, the documentation was updated, and the demonstration video was prepared for the final submission.