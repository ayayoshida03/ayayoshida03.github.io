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

  var revealTargets = document.querySelectorAll(
    ".policy-row, .video-card, .timeline-item, .news-item, .faq-item, .badge, .message-photo, .message-lead, .profile-photo, .support-cta, .sns-links"
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

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var nav = document.getElementById("site-nav");
  if (nav) {
    var toggleNavScrolled = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    toggleNavScrolled();
    window.addEventListener("scroll", toggleNavScrolled, { passive: true });
  }

  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  if ("IntersectionObserver" in window && navLinks.length) {
    var navSections = [];
    navLinks.forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) navSections.push({ link: link, section: section });
    });
    var navIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var match = navSections.filter(function (n) {
            return n.section === entry.target;
          })[0];
          if (!match) return;
          navLinks.forEach(function (l) {
            l.classList.remove("is-active");
          });
          match.link.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    navSections.forEach(function (n) {
      navIO.observe(n.section);
    });
  }

  var heroImg = document.querySelector(".hero-bg img");
  if (heroImg && !prefersReducedMotion) {
    var parallaxTicking = false;
    var updateParallax = function () {
      var offset = Math.min(window.scrollY * 0.25, 160);
      heroImg.style.transform = "translateY(" + offset + "px) scale(1.08)";
      parallaxTicking = false;
    };
    updateParallax();
    window.addEventListener(
      "scroll",
      function () {
        if (!parallaxTicking) {
          window.requestAnimationFrame(updateParallax);
          parallaxTicking = true;
        }
      },
      { passive: true }
    );
  }
})();
