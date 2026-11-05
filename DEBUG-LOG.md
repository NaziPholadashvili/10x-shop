
# Debug Log — 10X Shop

## Project Overview

10X Shop is a React and TypeScript e-commerce demonstration application built with Vite, Tailwind CSS, React Router, and the DummyJSON REST API.

This document records four real development and debugging cases.

Each entry includes:

- Problem
- Reproduction or investigation steps
- Tools used
- Root cause or identified limitation
- Fix
- Verification
- Git commit reference

## 1. Add to Cart Button Did Not Work

### Problem

During development, the Add to Cart button on the product details page did not initially update the shopping cart.

The product details page needed to be connected to the shared cart state.

### Reproduction Steps

1. Start the application using `npm run dev`.
2. Open the product catalog.
3. Navigate to a product details page.
4. Attempt to add the product to the cart.
5. Observe that the expected cart update does not occur.

### Tools Used

- Visual Studio Code
- React and TypeScript
- React Context API
- Browser manual testing
- Git history inspection

### Root Cause

The product details page did not yet have the necessary Add to Cart interaction connected to the shared cart state.

The cart infrastructure was introduced separately from the product details interaction.

### Fix

The shopping cart infrastructure was initially implemented in commit `9530fc6`.

Later, commit `ae99477` connected the product details page to the cart functionality.

The implementation:

1. Imported the `useCart` hook.
2. Retrieved `addToCart` and cart items from the hook.
3. Added quantity selection and stock-aware validation.
4. Implemented `handleAddToCart`.
5. Called `addToCart(product, safeQuantity)`.
6. Connected the Add to Cart button to `handleAddToCart`.

### Verification

The Add to Cart functionality was tested manually.

1. Opened a product details page.
2. Selected a product quantity.
3. Clicked Add to Cart.
4. Opened the shopping cart.
5. Confirmed that the selected product appeared.
6. Confirmed that cart contents and totals updated.

**Result:** Passed.

### Commit Reference

**Initial cart implementation:** `9530fc6`

`feat: add shopping cart functionality`

**Product details Add to Cart integration:** `ae99477`

`feat: add quantity controls to product details and cart`

Relevant files:

- `src/context/CartContext.tsx`
- `src/pages/Cart.tsx`
- `src/pages/ProductDetails.tsx`

## 2. API Error Messages Were Too Generic

### Problem

API request errors initially did not include the HTTP response status.

This made unsuccessful API responses harder to diagnose.

### Reproduction and Investigation Steps

1. Open `src/api/products.ts`.
2. Inspect the Fetch API response handling.
3. Review the behavior when `response.ok` is false.
4. Identify that the original error message did not include `response.status`.

### Tools Used

- Visual Studio Code
- TypeScript
- Fetch API
- Git history inspection
- Production build verification

### Root Cause

The original error handling did not include the HTTP status code in the generated error message.

As a result, the message provided limited diagnostic information about unsuccessful HTTP responses.

### Fix

Updated the API error handling to include `response.status` when `response.ok` is false.

This made error messages more informative and easier to investigate.

### Verification

1. Reviewed the updated API error-handling implementation.
2. Ran the production build:

   ```bash
   npm run build
   ```

3. Confirmed that the build completed successfully.

**Result:** Build verification passed.

The recorded verification confirms that the updated code compiled successfully. It does not establish that every HTTP error status was manually simulated.

### Commit Reference

**Commit:** `1a64203`

`fix: include HTTP status in product API errors`

Relevant file:

- `src/api/products.ts`

## 3. Product Loading Failure Had No Retry Option

### Problem

When the product API request failed, the catalog displayed an error but did not initially provide a dedicated way to retry the request.

Users had to refresh the page manually.

### Reproduction Steps

1. Start the application using `npm run dev`.
2. Open the product catalog.
3. Open Chrome DevTools.
4. Navigate to the Network panel.
5. Enable network request blocking for the DummyJSON products API.
6. Reload the catalog or trigger another product request.
7. Observe the failed request and error state.

### Tools Used

- Visual Studio Code
- Google Chrome
- Chrome DevTools
- Network request blocking
- React `useState`
- React `useEffect`
- Production build verification

### Root Cause

The original catalog error state did not provide a retry action.

After a failed request, there was no dedicated interface control for triggering another attempt.

### Fix

Added a Try Again button and `retryCount` state in `Products.tsx`.

The `useEffect` dependency list includes the retry count.

Clicking Try Again updates `retryCount`, causing the effect to run again and initiate another product request.

### Verification

The retry functionality was tested using Chrome DevTools.

1. Blocked the DummyJSON products API request.
2. Confirmed that the catalog displayed an error message and the Try Again button.
3. Clicked Try Again while the request remained blocked.
4. Observed another failed request.
5. Removed the request block.
6. Clicked Try Again again.
7. Confirmed that the products loaded successfully.

The production build was also verified.

**Result:** Passed.

The test demonstrated both failure handling and recovery after the API request became available again.

### Commit Reference

**Commit:** `3d235ee`

`feat: add retry button for failed product requests`

Relevant file:

- `src/pages/Products.tsx`

## 4. Error Boundary Testing

### Problem

Unexpected React rendering errors required a fallback interface so that users would not be left with an unusable application screen.

### Reproduction Steps

1. Start the application using `npm run dev`.
2. Temporarily introduce a rendering error in a component covered by the Error Boundary.
3. Open the affected application page.
4. Observe the resulting rendering error.
5. Verify that the Error Boundary fallback interface appears.

### Tools Used

- Visual Studio Code
- React
- Browser manual testing
- Git history inspection
- Production build verification

### Root Cause

Without a React Error Boundary, an unexpected rendering error could prevent the affected component tree from displaying normally.

A fallback interface was needed to handle supported rendering errors more gracefully.

### Fix

Created an `ErrorBoundary` component and wrapped the application with it in `main.tsx`.

The Error Boundary displays fallback content when a supported rendering error occurs in its child component tree.

### Verification

1. Temporarily triggered a rendering error.
2. Confirmed that the Error Boundary fallback interface appeared.
3. Removed the temporary test error.
4. Confirmed that the application returned to normal behavior.
5. Ran the production build successfully.

**Result:** Passed.

The temporary rendering error was used only for testing and was not retained in the final application.

### Commit Reference

**Commit:** `6319197`

`feat: add error boundary component`

**GitHub Issue:** #1

**Pull Request:** #2

Relevant files:

- `src/components/ErrorBoundary.tsx`
- `src/main.tsx`

## 5. Debugging Verification Summary

| Entry | Verification Method | Result | Main Commit |
|---|---|---|---|
| Add to Cart | Manual cart interaction | Passed | `ae99477` |
| API error messages | Code review and production build | Build passed | `1a64203` |
| Retry functionality | Chrome DevTools request blocking and recovery | Passed | `3d235ee` |
| Error Boundary | Temporary rendering error and fallback verification | Passed | `6319197` |

## 6. Lessons Learned

The debugging process demonstrated several important frontend development principles:

- Shared React state must be updated through the correct context actions.
- API errors should include useful diagnostic information.
- Network requests require clear loading and error states.
- Users should be able to retry recoverable request failures.
- Chrome DevTools can reproduce network failures and verify recovery behavior.
- React Error Boundaries handle certain rendering errors but do not replace API error handling.
- Temporary test errors must be removed after verification.
- Successful compilation and successful runtime behavior are different types of evidence.
- Git history helps connect implementation changes to documented debugging cases.
- Each change should be tested before committing and pushing to GitHub.

## 7. Conclusion

The four documented cases demonstrate practical debugging, implementation, and verification activities completed during the development of 10X Shop.

Each case includes investigation steps, tools, an identified cause or limitation, a solution, verification evidence, and relevant Git commit references.

The debugging process improved application reliability and provided practical experience with React state management, API error handling, network recovery, and rendering error boundaries.
