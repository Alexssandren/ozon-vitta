(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var floatBtn = document.querySelector(".wa-float");
  var contato = document.getElementById("contato");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  function openNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      if (open) closeNav();
      else openNav();
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  function updateFloat() {
    if (!floatBtn || !window.SITE || !SITE.contato.whatsapp) {
      if (floatBtn) floatBtn.hidden = true;
      return;
    }

    var hide = false;
    if (contato) {
      var rect = contato.getBoundingClientRect();
      var inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) hide = true;
    }

    if (window.matchMedia("(min-width: 720px)").matches && window.scrollY < 320) {
      hide = true;
    }

    floatBtn.hidden = hide;
  }

  window.addEventListener("scroll", updateFloat, { passive: true });
  window.addEventListener("resize", updateFloat);
  document.addEventListener("DOMContentLoaded", updateFloat);
  updateFloat();
})();
