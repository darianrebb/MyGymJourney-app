# My Gym Journey — Public Site

Marketing, support, and privacy pages for **My Gym Journey**.

**Live (after Pages is enabled):** https://darianrebb.github.io/MyGymJourney-app/

## App Store Connect URLs

Once GitHub Pages is live:

- **Support URL:** `https://darianrebb.github.io/MyGymJourney-app/support.html`
- **Privacy Policy URL:** `https://darianrebb.github.io/MyGymJourney-app/privacy.html`

## Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` / folder: `/ (root)`
4. Save — wait a minute for the site to publish

## Configuration

Edit [`config.js`](config.js):

```js
window.SITE_CONFIG = {
  APP_STORE_URL: null, // set to your App Store URL when ready
  SUPPORT_EMAIL: "support@example.com", // your real support email
};
```

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Note

The iOS app source lives in the private **MyGymJourney** repository. This public repo contains only the website.
