// Watchful Eye Audits - Main JavaScript File

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Submenu toggle for mobile
  const hasSubmenuItems = document.querySelectorAll(".has-submenu");
  hasSubmenuItems.forEach(function (item) {
    const link = item.querySelector(".nav-link");
    if (link) {
      link.addEventListener("click", function (e) {
        if (window.innerWidth <= 767) {
          e.preventDefault();
          item.classList.toggle("active");
        }
      });
    }
  });

  // Scroll to top functionality
  const scrollTopBtn = document.getElementById("scroll-top");
  if (scrollTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 100) {
        scrollTopBtn.style.display = "block";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Lazy loading fallback for older browsers
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Form validation and enhancement
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      if (!name || !email || !message) {
        alert("Proszę wypełnić wszystkie pola");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Proszę podać prawidłowy adres email");
        return;
      }

      // Here you would normally send the form data to your server
      alert("Dziękujemy za wiadomość! Skontaktujemy się z Państwem wkrótce.");
      this.reset();
    });
  }

  // Performance monitoring
  if ("performance" in window && "getEntriesByType" in performance) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log(
          "Page load time:",
          perfData.loadEventEnd - perfData.fetchStart,
          "ms"
        );
      }, 0);
    });
  }
});

// Helper functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Analytics helper (for future use)
function trackEvent(category, action, label) {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    });
  }
}

// Cookie consent (for future GDPR compliance)
function showCookieConsent() {
  // Implementation for cookie consent banner
  console.log("Cookie consent would be shown here");
}
