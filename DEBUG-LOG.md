
# Debug Log — 10X Shop

## Project Overview

10X Shop is a React and TypeScript e-commerce application built with Vite, Tailwind CSS, React Router, and the DummyJSON API.

This document records real issues encountered during development, the solutions applied, and the verification steps.

## 1. Add to Cart Button Did Not Work

**Problem:** The Add to Cart button on the product details page initially did not update the cart.

**Solution:** Connected the button to the `addToCart` function provided by CartContext.

**Verification:** Tested adding products to the cart and confirmed that cart contents and totals updated.

## 2. API Error Messages Were Too Generic

**Problem:** API errors did not indicate the HTTP response status.

**Solution:** Updated `src/api/products.ts` to include `response.status` in error messages when `response.ok` is false.

**Verification:** Confirmed that the updated code passed `npm run build`.

## 3. Product Loading Failure Had No Retry Option

**Problem:** When the product API request failed, the page displayed an error without allowing the user to retry.

**Solution:** Added a Try Again button and a `retryCount` state in `Products.tsx`. The `useEffect` hook runs again when the retry count changes.

**Verification:**
- Confirmed successful production build.
- Blocked the DummyJSON products request using Chrome DevTools.
- Confirmed the error message and Try Again button appeared.
- Clicked Try Again and observed a new failed request.
- Removed the request block and confirmed that clicking Try Again loaded products successfully.

## 4. Error Boundary Testing

**Problem:** Unexpected React rendering errors needed a fallback interface.

**Solution:** Added an ErrorBoundary component and wrapped the application with it in `main.tsx`.

**Verification:** Temporarily triggered a rendering error, confirmed the fallback interface appeared, removed the test error, and verified that the application built successfully.

## Lessons Learned

- API requests need clear loading, error, and empty states.
- Users should be able to retry recoverable network failures.
- React Error Boundaries handle rendering errors but do not replace API error handling.
- Browser Developer Tools help reproduce and investigate network failures.
- Each change should be tested before committing and pushing to GitHub.
