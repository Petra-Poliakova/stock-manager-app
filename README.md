# Stock Manager App

Frontend application for product management and a simple inventory dashboard built with React + TypeScript + Vite.

The project displays a sales overview, a product table with actions, and a support section.

## Main Features

- Dashboard with KPI cards:
  - New sales
  - New sales revenue
  - Revenue per unit
- Low stock products chart (Chart.js + react-chartjs-2)
- Top rated products table (MUI Table)
- Products page (MUI DataGrid):
  - row selection
  - product deletion via API
  - export selected products to XLSX
  - add a new product through a modal form
  - navigation to product detail
- Product detail via dynamic route `products/:id` with a loader
- Support section:
  - contact details
  - simple contact form
- Collapsible sidebar menu via context (`MenuContext`)
- Lazy-loaded pages using `React.lazy` + `Suspense`

## Technologies

- React 19
- TypeScript
- Vite
- React Router
- Material UI (`@mui/material`, `@mui/x-data-grid`)
- Sass (SCSS)
- Chart.js + react-chartjs-2
- xlsx
- react-icons

## API and Data

- External API: [DummyJSON Products API](https://dummyjson.com/products)
- Local demo sales data: `src/data/sales.json`

API endpoints used in the project:

- `GET https://dummyjson.com/products?limit=0`
- `GET https://dummyjson.com/products/categories`
- `GET https://dummyjson.com/products/:id`
- `POST https://dummyjson.com/products/add`
- `DELETE https://dummyjson.com/products/:id`

## Run the Project Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variable

The project uses `VITE_URL_BASE` (`base` in Vite config and `basename` in routing).

Create a `.env` file in the project root:

```env
VITE_URL_BASE=/
```

If you host the app in a subdirectory (for example GitHub Pages), use:

```env
VITE_URL_BASE=/stock-manager/
```

### 3. Development server

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

### 6. Lint

```bash
npm run lint
```

## NPM Scripts

- `npm run dev` - starts the Vite dev server
- `npm run build` - TypeScript build (`tsc -b`) + Vite build
- `npm run preview` - local preview of the production build
- `npm run lint` - runs ESLint

## Project Structure

```text
src/
  app/
    pages/
      HomePage.tsx
      products/
        Products.tsx
        ProductDetail.tsx
      support/
        Contact.tsx
        ContactForm.tsx
  components/
    Header.tsx
    LoadingSpinner.tsx
  context/
    MenuContext.tsx
  hooks/
    useFetch.ts
    useLocalSrorage.ts
  layouts/
    RootLayout.tsx
    SupportLayout.tsx
  data/
    sales.json
```

## Notes

- Alias `@` points to `src`.
- Products are loaded from an external API, so the app requires an internet connection.
- `POST/DELETE` operations are executed against a public test API (DummyJSON).
