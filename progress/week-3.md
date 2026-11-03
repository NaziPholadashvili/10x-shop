# Week 3 Progress Report

**Project:** 10X Shop — React & TypeScript Final Project  
**Period:** November 3, 2026  
**Total Git Commits:** 8 (including 4 merge commits)  
**Active Development Days:** 1

## 1. Weekly Goals

The third development period focused on completing the remaining e-commerce features and improving price calculation consistency across the application.

The main objectives were:

- Implement discounted product prices.
- Apply discounted prices consistently throughout the shopping cart and checkout.
- Refactor cart state management using a reducer.
- Implement shipping cost calculations.
- Add promotional discount functionality.
- Complete the remaining feature Pull Requests.

## 2. Completed Work

### Discounted Product Prices

**Commit:** `92c583f`  
**Pull Request:** #23

- Implemented discounted product prices.
- Improved reusable product card components.
- Added support for displaying product pricing consistently.

### Cart and Checkout Price Integration

**Commit:** `1bce1c5`  
**Pull Request:** #25

- Applied discounted product prices throughout the shopping cart.
- Updated checkout calculations to use discounted prices.
- Improved pricing consistency between product pages, cart, and checkout.

### Cart Reducer and Shipping Calculation

**Commit:** `9b1c0db`  
**Pull Request:** #27

- Refactored shopping cart state management using a reducer.
- Implemented shipping cost calculations.
- Integrated shipping calculations into cart and checkout totals.

### Persistent Promotional Discount

**Commit:** `acf5e68`  
**Pull Request:** #29

- Implemented the promotional code `10X10`.
- Added a 10% promotional discount.
- Implemented promotional code persistence using localStorage.
- Added functionality to apply and remove the promotional code.
- Integrated the promotional discount into cart and checkout calculations.

## 3. Technical Concepts Practiced

The final feature-development period included:

- React state management with `useReducer`
- TypeScript
- Reusable component design
- Shopping cart calculations
- Discount and shipping logic
- React Context API
- localStorage persistence
- Form validation
- Git feature branches and Pull Requests

## 4. Challenges and Solutions

### Consistent Price Calculations

Product discounts, promotional discounts, and shipping costs needed to be reflected consistently throughout the shopping experience.

The implementation improved the pricing logic used by the cart and checkout.

### Cart State Management

As cart functionality expanded, managing updates became more complex.

Reducer-based state management helped organize cart actions and updates.

### Promotional Code Persistence

The promotional code needed to remain available after a page refresh while allowing users to remove it when necessary.

This was addressed using localStorage and dedicated promotional code actions.

## 5. GitHub Workflow

Four feature Pull Requests were merged:

- PR #23 — Discounted product prices
- PR #25 — Cart and checkout discounted prices
- PR #27 — Cart reducer and shipping calculation
- PR #29 — Persistent `10X10` promotional discount

All four feature branches were integrated into the main development branch.

## 6. Git Progress

- **8 commits** were recorded on November 3.
- **4 feature Pull Requests** were merged.
- The third development period completed the remaining planned pricing and cart enhancements.

## 7. Final Project Status

By the end of November 3, the application included:

- Product catalog and product details
- Product search, category filtering, sorting, and pagination
- User authentication and protected routes
- Shopping cart and checkout
- Order history and order details
- User profile
- Product reviews and image gallery
- Related products
- Discounted prices
- Shipping calculation
- Promotional code support
- Error handling and retry functionality

The remaining project activities are documentation review, deployment, final testing, and demo video preparation.