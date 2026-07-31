# My Gym Journey — Public Site

Marketing, support, and privacy pages for **My Gym Journey**.

**Live:** https://www.mygymjourney.app/

## App Store Connect URLs

- **Support URL:** `https://www.mygymjourney.app/support.html`
- **Privacy Policy URL:** `https://www.mygymjourney.app/privacy.html`

## Custom domain (GitHub Pages)

1. Repo **Settings → Pages**: deploy from `main` / `/ (root)`. Repo should be **public**.
2. Keep the [`CNAME`](CNAME) file (`www.mygymjourney.app`) committed on `main`.
3. At your DNS provider, add:
   - **CNAME** `www` → `darianrebb.github.io` (no `/MyGymJourney-app`)
   - Optional apex **A** records on `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
4. In **Settings → Pages → Custom domain**, enter `www.mygymjourney.app`, save, wait for DNS check, then enable **Enforce HTTPS**.

## Configuration

Edit [`config.js`](config.js):

```js
window.SITE_CONFIG = {
  APP_STORE_URL: null, // set to your App Store URL when ready
  SUPPORT_EMAIL: "support@mygymjourney.app",
};
```

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080
