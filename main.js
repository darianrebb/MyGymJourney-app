(function () {
  const config = window.SITE_CONFIG || {};
  const storeUrl = config.APP_STORE_URL;
  const email = config.SUPPORT_EMAIL || "support@example.com";

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
