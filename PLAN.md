# 10X Shop — Project Plan

## 1. Project Goal

Build a responsive e-commerce demonstration application using React 19, TypeScript, Tailwind CSS v4, Vite, and React Router.

Product data will be retrieved from the public DummyJSON REST API.

The project aims to demonstrate component-based architecture, client-side routing, API integration, state management, form validation, browser storage, error handling, Git workflows, and production deployment.

## 2. Project Scope

The project was initially planned around CORE requirements. During development, the scope was expanded to include targeted FULL requirements and additional user experience improvements.

The following sections describe the final planned scope, including features added during development. This expanded scope should not be interpreted as the complete original plan from the first development day.

### 2.1 CORE Features

- Responsive product catalog
- Product details page
- Product data fetched from DummyJSON
- Shopping cart with add, remove, and quantity updates
- Demo authentication using React Context
- Protected checkout route
- Checkout form validation
- Order confirmation
- Custom 404 Not Found page
- Loading and error handling
- Responsive layout
- React Error Boundary
- Git repository and meaningful commit history
- Production deployment
- Project documentation and demo video

### 2.2 FULL Features

#### Product Catalog

- Product search with debouncing
- Category filtering
- Product sorting
- Pagination
- Catalog state synchronized with URL search parameters
- Clear Filters functionality
- Loading skeletons
- Retry functionality for failed requests
- AbortController request cleanup

#### Product Details

- Product image gallery
- Interactive image selection
- Product quantity selection
- Related products
- Navigation between related products
- Product ratings and reviews
- User-submitted reviews stored in localStorage

#### Shopping Cart and Pricing

- Reducer-based cart state management
- Cart quantity and stock validation
- Persistent cart contents
- Product-level discounted prices
- Promotional code `10X10` for an additional 10% discount
- Promotional code persistence
- Shipping calculation
- Free shipping for qualifying orders
- Centralized subtotal, discount, shipping, and total calculations

#### Authentication, Checkout, and Orders

- Authentication state persistence
- Protected application routes
- Checkout form validation
- Order creation and confirmation
- Persistent order history
- Order details
- Order status display
- Reorder functionality
- User profile page

#### Engineering and Development Workflow

- Reusable components and organized project structure
- TypeScript type safety
- React Context and reducer-based state management
- Error handling and recovery
- GitHub Issues for tracking work
- Feature branches
- Pull Requests linked to Issues
- Testing instructions in Pull Request descriptions
- Meaningful Git commits
- Weekly progress documentation
- Debugging documentation

## 3. Development Schedule

The project is organized into three development weeks.

### Week 1 — October 20–26, 2026

**Focus: Project foundation and CORE functionality**

Planned activities:

1. Initialize the Vite, React, and TypeScript project.
2. Configure Tailwind CSS and Git.
3. Create the initial application structure.
4. Configure React Router and shared layout.
5. Integrate the DummyJSON products API.
6. Implement the product catalog and product details.
7. Implement demo authentication.
8. Implement shopping cart functionality.
9. Begin checkout and order management.
10. Record development progress and meaningful commits.

**Expected milestone:** A working foundation with the main shopping flow implemented.

### Week 2 — October 27 – November 2, 2026

**Focus: FULL features and architecture improvements**

Planned activities:

1. Extend the product catalog with search, filtering, sorting, and pagination.
2. Add debouncing and URL-based catalog state.
3. Improve loading, error, retry, and request cancellation behavior.
4. Add product image gallery and related products.
5. Improve routing and protected route organization.
6. Extend authentication and order persistence.
7. Improve cart state management and checkout behavior.
8. Implement additional product details functionality.
9. Use GitHub Issues, feature branches, and Pull Requests.
10. Document debugging activities and weekly progress.

**Expected milestone:** Most CORE and FULL functionality implemented and verified locally.

### Week 3 — November 3–6, 2026

**Focus: Final feature integration, testing, documentation, and presentation**

Planned activities:

1. Finalize cart calculations and shipping rules.
2. Implement and verify the `10X10` promotional code.
3. Complete checkout, orders, and remaining targeted FULL requirements.
4. Verify the application using TypeScript, ESLint, and production builds.
5. Deploy the application to Vercel.
6. Test application routes and main user flows in production.
7. Resolve remaining bugs and evaluation feedback.
8. Complete additional improvements identified during final review.
9. Finalize README.md, PLAN.md, REPORT.md, and DEBUG-LOG.md.
10. Complete weekly progress notes.
11. Record the demo video and prepare for the oral defense.

**Expected milestone:** A deployed, tested, documented application ready for final submission.

## 4. Implementation Steps

1. Project setup and configuration
2. Routing and shared layout
3. Product catalog and API integration
4. Product details and related products
5. Authentication and protected routes
6. Shopping cart and persistent state
7. Checkout and order management
8. FULL catalog and product features
9. Promotional discounts and shipping calculations
10. Error handling and responsive design
11. Testing and debugging
12. Documentation, deployment, and demonstration

## 5. Work Breakdown Structure (WBS) and Time Estimates

The project is divided into smaller work packages to support planning, prioritization, implementation, testing, and delivery.

The estimated total effort is approximately 100 hours.

These estimates represent an approximate project workload for planning purposes, not an exact record of time already spent.

This detailed WBS was added during documentation refinement after the original project plan was created.

| ID | Work Package | Estimated Hours |
|---|---|---:|
| WBS-01 | Project setup, Vite, TypeScript, Tailwind CSS, and Git configuration | 5 |
| WBS-02 | React Router, shared layout, header, footer, and navigation | 6 |
| WBS-03 | DummyJSON API integration and product catalog | 8 |
| WBS-04 | Product details, gallery, reviews, and related products | 8 |
| WBS-05 | Authentication, protected routes, and user profile | 6 |
| WBS-06 | Shopping cart, reducer, stock validation, and persistence | 9 |
| WBS-07 | Promotional discounts, pricing, and shipping calculations | 5 |
| WBS-08 | Checkout validation, order creation, and order history | 9 |
| WBS-09 | Catalog search, filtering, sorting, pagination, and URL state | 9 |
| WBS-10 | Error handling, retry functionality, and responsive improvements | 6 |
| WBS-11 | TypeScript, ESLint, build checks, debugging, and manual testing | 8 |
| WBS-12 | Vercel deployment and production verification | 4 |
| WBS-13 | README, PLAN, REPORT, DEBUG-LOG, and weekly progress notes | 7 |
| WBS-14 | GitHub Issues, Pull Requests, and project workflow documentation | 5 |
| WBS-15 | Demo video and oral defense preparation | 5 |
| | **Total Estimated Effort** | **100** |

### WBS Planning Notes

- CORE requirements are prioritized before additional FULL features.
- Tasks may overlap because testing, debugging, and documentation take place throughout development.
- The estimates are approximate and may change depending on technical complexity and unexpected issues.
- The workload includes implementation, testing, debugging, documentation, GitHub workflows, deployment, and presentation preparation.
- Actual development progress and completed work are documented separately in `REPORT.md` and the weekly progress notes.
- The WBS is a planning estimate and should not be interpreted as a timesheet.

## 6. Risks and Mitigation

| Risk | Mitigation |
|---|---|
| DummyJSON API failures | Display error states, provide retry functionality, and handle failed requests |
| React state management errors | Use Context, reducers, and focused testing |
| TypeScript errors | Run TypeScript checks regularly |
| Incorrect cart calculations | Centralize pricing and shipping logic and test calculation scenarios |
| Invalid browser storage data | Validate stored data and provide safe fallbacks |
| Responsive layout issues | Test mobile and desktop layouts |
| Deployment routing problems | Configure Vercel SPA routing and test nested routes |
| Limited development time | Prioritize CORE requirements before additional FULL features |
| Regression after changes | Use feature branches, Pull Requests, and repeat verification checks |

## 7. Testing Strategy

Testing will include:

- TypeScript type checking
- ESLint checks
- Production build verification
- Manual browser testing
- Product catalog and API request testing
- Product details and invalid ID testing
- Shopping cart and quantity testing
- Promotional discount and shipping calculations
- Authentication and protected route testing
- Checkout form validation
- Order creation, persistence, and reorder testing
- Responsive layout verification
- Error handling and recovery testing
- Production testing on Vercel

Debugging observations will be recorded in `DEBUG-LOG.md`.

## 8. Definition of Done (DoD)

Definition of Done describes the criteria that must be satisfied before a development task or project deliverable is considered complete.

### 8.1 Functional Requirements

- The implementation matches the relevant project requirement.
- The expected user flow works correctly.
- Required input validation is implemented.
- Loading, empty, error, and success states are handled where applicable.
- Existing functionality is not unintentionally broken.

### 8.2 Code Quality

- TypeScript checks pass without errors.
- ESLint checks pass.
- The production build completes successfully.
- Code follows the established project structure and naming conventions.
- Reusable logic and components are used where appropriate.

### 8.3 Testing and Verification

- The functionality is manually tested in the browser.
- Relevant edge cases are checked.
- API failures and recovery behavior are tested where applicable.
- Cart, authentication, and order persistence are verified where applicable.
- Responsive behavior is checked for UI-related changes.

### 8.4 Git and Documentation

- Work is tracked through a GitHub Issue where applicable.
- Feature and fix changes use meaningful commit messages.
- Pull Requests describe what changed, why it changed, and how to test it.
- Relevant documentation is updated.
- Significant debugging findings are recorded in `DEBUG-LOG.md`.

### 8.5 Integration and Delivery

- Required automated checks pass before merging.
- Changes are merged into the `main` branch.
- The local `main` branch is synchronized with the remote repository.
- Production behavior is verified when changes affect the deployed application.

### 8.6 Project-Level Completion

The project is considered ready for final submission when:

- Required CORE functionality is implemented and verified.
- Targeted FULL functionality is implemented or remaining limitations are documented.
- The application is deployed and accessible.
- README, PLAN, REPORT, DEBUG-LOG, and weekly progress notes are available.
- Required GitHub workflow evidence is available.
- The demo video is recorded and accessible.
- The project is ready for oral defense.

These criteria describe the expected completion standard and do not imply that every deliverable has already been completed.

## 9. Git and GitHub Workflow

The development workflow will use:

1. GitHub Issues to describe features and bugs.
2. Separate branches for implementation and fixes.
3. Meaningful commits describing completed changes.
4. Pull Requests linked to relevant Issues.
5. Pull Request descriptions covering what changed, why, and how to test.
6. TypeScript, ESLint, and build verification before merging.
7. Merging tested changes into the `main` branch.
8. Keeping the deployed application synchronized with `main`.

The project will aim to satisfy the FULL evaluation criteria for commit history, development days, and merged Pull Requests.

## 10. Deliverables

- GitHub repository with meaningful commit history
- GitHub Issues and merged Pull Requests
- Live application deployed to Vercel
- Responsive React and TypeScript application
- README.md
- PLAN.md
- REPORT.md
- DEBUG-LOG.md
- progress/week-1.md
- progress/week-2.md
- progress/week-3.md
- Demo video
- Final project presentation and oral defense

## 11. Deadline

**November 6, 2026 — 23:59**

The final development period prioritizes feature integration, verification, deployment, documentation, demonstration, and preparation for the project defense.

Additional improvements may be completed during this period to address testing findings and evaluation feedback.