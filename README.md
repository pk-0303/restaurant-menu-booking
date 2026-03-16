# Restaurant POS - Cloudflare Deployment Guide

Cloudflare Pages **fully supports** this project! The `.tsx` (React) and `.ts` (TypeScript) files are automatically converted into pure HTML, CSS, and JavaScript during the build process.

If you are seeing "unsupported files" errors, it is because you are trying to serve the raw source code directly to a browser. You must build the project first.

## Method 1: GitHub Integration (Recommended)
This is the easiest way to deploy to Cloudflare Pages.

1. Export this project to your GitHub account.
2. Go to your Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Select your repository.
4. Cloudflare will automatically detect the framework. Ensure the settings are:
   - **Framework preset:** Vite (or React)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**.

## Method 2: Direct Upload (Drag and Drop)
If you are downloading the ZIP file and dragging it into Cloudflare, **do not upload the raw ZIP**. Browsers cannot read `.tsx` files directly.

1. Extract the ZIP file on your computer.
2. Open a terminal in that folder and run:
   ```bash
   npm install
   npm run build
   ```
3. This will create a new folder named `dist` containing **only** standard HTML, CSS, and JavaScript files.
4. Drag and drop the **`dist` folder** into Cloudflare Pages.
