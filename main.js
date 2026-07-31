(function () {
  const config = window.SITE_CONFIG || {};
  const storeUrl = config.APP_STORE_URL;
  const email = config.SUPPORT_EMAIL || "support@example.com";

  const SCREENSHOTS = [
    "assets/screenshots/hero-workout-detail.png",
    "assets/screenshots/feature-new-workout.png",
    "assets/screenshots/feature-chart.png",
    "assets/screenshots/feature-cardio.png",
    "assets/screenshots/feature-complete.png",
  ];

  const SPLASH_SEEN_KEY = "mgj-splash-seen";
  const SPLASH_MIN_MS = 1400;
  const SPLASH_MAX_MS = 1600;

  document.querySelectorAll("[data-app-store-cta]").forEach((el) => {
    if (storeUrl) {
      el.href = storeUrl;
      el.classList.remove("is-disabled");
      el.removeAttribute("aria-disabled");
      el.textContent = el.dataset.labelLive || "Download on the App Store";
      const note = document.querySelector("[data-app-store-note]");
      if (note) note.hidden = true;
    } else {
      el.href = "#";
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.addEventListener("click", (e) => e.preventDefault());
      el.textContent = el.dataset.labelSoon || "Coming Soon on the App Store";
    }
  });

  document.querySelectorAll("[data-support-email]").forEach((el) => {
    el.href = "mailto:" + email;
    el.textContent = email;
  });

  function preloadImages(srcs) {
    return Promise.all(
      srcs.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.decoding = "async";
            img.onload = resolve;
            img.onerror = resolve;
            img.src = src;
          })
      )
    );
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function runIntroSplash() {
    const splash = document.getElementById("intro-splash");
    if (!splash) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SPLASH_SEEN_KEY) === "1";
    } catch (_) {
      /* private mode */
    }

    if (alreadySeen || reduceMotion) {
      splash.remove();
      document.documentElement.classList.remove("splash-active");
      preloadImages([...SCREENSHOTS, "assets/logo.png"]);
      return;
    }

    document.documentElement.classList.add("splash-active");

    const assetsReady = Promise.race([
      preloadImages([...SCREENSHOTS, "assets/logo.png"]),
      wait(SPLASH_MAX_MS),
    ]);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        splash.classList.add("is-ready");
      });
    });

    await Promise.all([wait(SPLASH_MIN_MS), assetsReady]);

    splash.classList.add("is-leaving");
    await wait(450);

    splash.remove();
    document.documentElement.classList.remove("splash-active");
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, "1");
    } catch (_) {
      /* private mode */
    }
  }

  // Warm caches on pages without the homepage splash markup.
  if (!document.getElementById("intro-splash")) {
    preloadImages(SCREENSHOTS);
  }

  runIntroSplash();

  // Screenshots: reveal on scroll. Section headers: fadeInUp when in view.
  const revealEls = document.querySelectorAll(
    ".feature-visual .phone-shot, .feature-copy, .fade-in-up, .reveal-on-scroll"
  );
  if (!revealEls.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.28, rootMargin: "0px 0px -8% 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
