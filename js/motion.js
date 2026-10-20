(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function typeHeroTitle() {
    var el = document.querySelector("[data-hero-titulo]");
    if (!el || el.dataset.typing === "1") return;
    var full =
      (window.SITE && SITE.hero && SITE.hero.titulo) ||
      el.textContent.trim() ||
      "";
    if (!full || reduce) return;

    el.dataset.typing = "1";
    el.textContent = "";
    el.classList.add("is-typing");
    var i = 0;
    function tick() {
      if (i < full.length) {
        el.textContent = full.slice(0, i + 1);
        i += 1;
        setTimeout(tick, 38);
      } else {
        el.classList.remove("is-typing");
      }
    }
    setTimeout(tick, 280);
  }

  // After site-data boot (registered earlier in <head>)
  document.addEventListener("DOMContentLoaded", typeHeroTitle);

  if (reduce) {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -40px 0px", threshold: 0.12 }
  );

  function watch() {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
      observer.observe(el);
    });
  }

  watch();
  document.addEventListener("DOMContentLoaded", watch);
})();
