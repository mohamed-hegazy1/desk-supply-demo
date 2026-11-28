# Desk Supply

A responsive React storefront learning project. Six fictional workspace products, combined search/category filters, price sorting and a demo shopping bag saved in the current browser.

**This is a frontend demo, not a real store.** There is no payment, checkout, order processing, login, inventory service or backend. Products, prices and availability are sample data. No contact information or secrets are included.

## Run locally

Use Node.js 22.12+ or a supported newer release.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. On Windows, run these commands from PowerShell in this folder. To create a production build:

```sh
npm run build
npm run preview
```

## Checks

```sh
npm test
npx playwright install chromium
npm run test:e2e
```

If you want to use an already installed Chrome instead, set `CHROME_PATH` to its executable before the browser tests. Tests include catalog filters, empty-state reset, price sorting, cart quantities, persistence, remove, keyboard close, corrupted storage and overflow checks at 320, 390 and 1280 pixels.

## Features

- React components and derived state, no global state library needed for this scale
- Search and category filters work together; sorting does not mutate the product data
- Integer cents for sample subtotal calculations
- Quantity range 1 to 9; decrease to zero or Remove deletes an item
- Native modal dialog, Escape to close, labeled buttons and visible keyboard focus
- Safe parsing of saved data, invalid product IDs ignored and stored quantities capped
- Responsive CSS grid and reduced-motion preference
- Original SVG product illustrations, no external image requests or API keys

## Code map

- `App.jsx`: page components, UI state, SVG illustrations and bag dialog
- `model.js`: sample data and pure filtering/cart functions
- `style.css`: visual design and mobile breakpoints
- `model.test.js`: fast unit tests using Node's built-in test runner
- `store.spec.js`: browser interaction and layout checks
- `EXPLAIN-AR.md`: an Arabic walkthrough and interview practice tasks
- `REVIEW.md`: provenance, limitations and the existing repository repair findings



## Possible next steps

Split `ProductArt`, `ProductCard` and `BagDialog` into separate files as the app grows. Add an independently implemented feature, then explain the change and tests. Connecting a real API would need loading/error states and request cancellation. Real checkout would require a backend and server-side price/stock validation.

## Repository layout

Readable source is at the repository root. Open `/app.html` on the Vite dev server for source development. `index.html` is the self-contained prebuilt GitHub Pages entry. `npm run build` builds `app.html` and its assets into `dist/`; to deploy that output, rename `dist/app.html` to `dist/index.html` and publish the complete `dist/` folder. The committed prebuilt entry is separate, so editing source alone does not update the deployed page.
