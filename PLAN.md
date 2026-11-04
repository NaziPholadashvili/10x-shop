
# 10X Shop — Project Plan

## 1. Project Goal

Build a responsive e-commerce demonstration application using React 19, TypeScript, Tailwind CSS v4, Vite, and React Router.

Product data will be retrieved from the public DummyJSON REST API.

The project aims to demonstrate component-based architecture, client-side routing, API integration, state management, form validation, browser storage, error handling, Git workflows, and production deployment.

## 2. Project Scope

The project includes CORE and FULL requirements.

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

**Focus: Final integration, testing, documentation, and presentation**

Planned activities:

1. Finalize cart calculations and shipping rules.
2. Implement and verify the `10X10` promotional code.
3. Complete checkout, orders, and remaining FULL requirements.
4. Verify the application using TypeScript, ESLint, and production builds.
5. Deploy the application to Vercel.
6. Test application routes and main user flows in production.
7. Resolve remaining bugs and evaluation feedback.
8. Finalize README.md, PLAN.md, REPORT.md, and DEBUG-LOG.md.
9. Complete weekly progress notes.
10. Record the demo video and prepare for the oral defense.

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

## 5. Risks and Mitigation

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

## 6. Testing Strategy

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

## 7. Git and GitHub Workflow

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

## 8. Deliverables

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

## 9. Deadline

**November 6, 2026 — 23:59**

The final development period is reserved for verification, documentation, demonstration, and preparation for the project defense.
