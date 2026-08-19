(function () {
  var gate = document.getElementById("auth-gate");
  if (gate) {
    var AUTH_USER = "ayayoshida";
    var AUTH_PASS = "03";
    var STORAGE_KEY = "ayayoshida-site-authed";
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      gate.classList.add("is-hidden");
    }
    var form = document.getElementById("auth-form");
    var errorEl = document.getElementById("auth-error");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var user = document.getElementById("auth-user").value;
      var pass = document.getElementById("auth-pass").value;
      if (user === AUTH_USER && pass === AUTH_PASS) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        gate.classList.add("is-hidden");
      } else {
        errorEl.textContent = "ユーザー名またはパスワードが違います";
      }
    });
  }

  var nav = document.getElementById("site-nav");
  if (!nav) return;
  var threshold = 200;
  var onScroll = function () {
    if (window.scrollY > threshold) {
      nav.classList.add("is-visible");
    } else {
      nav.classList.remove("is-visible");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var revealTargets = document.querySelectorAll(
    ".policy-card, .video-card, .timeline-item, .news-item, .faq-item"
  );
  if ("IntersectionObserver" in window && revealTargets.length) {
    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  }
})();
