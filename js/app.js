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

  // Contact form handling with Formspree
  const contactForm = document.querySelector(".contact-form-element");
  const submitBtn = document.querySelector(".submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable submit button and show loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "WYSYŁANIE...";
      }

      // Get form data
      const formData = new FormData(contactForm);

      // Send to Formspree
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Success
            alert(
              "Dziękujemy za wiadomość! Skontaktujemy się z Państwem wkrótce."
            );
            contactForm.reset();
          } else {
            // Error
            alert(
              "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie."
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert(
            "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie."
          );
        })
        .finally(() => {
          // Re-enable submit button
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "WYŚLIJ WIADOMOŚĆ";
          }
        });
    });
  }

  // Language switching functionality
  const languageSwitchers = document.querySelectorAll(".language-item a");
  languageSwitchers.forEach(function(switcher) {
    switcher.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href && href !== "#") {
        // Store language preference
        const lang = this.getAttribute("hreflang") || "pl";
        localStorage.setItem("preferredLanguage", lang);
      }
    });
  });

  // Language detection and auto-redirect on first visit
  function detectAndRedirectLanguage() {
    const storedLang = localStorage.getItem("preferredLanguage");
    const browserLang = navigator.language || navigator.userLanguage;
    const isEnglishPath = window.location.pathname.startsWith("/en/");
    const isPolishPath = !isEnglishPath;

    // Only redirect on homepage if no stored preference
    if (window.location.pathname === "/" && !storedLang) {
      if (browserLang.startsWith("en")) {
        window.location.href = "/en/";
        return;
      }
    }

    // Apply stored preference if different from current page
    if (storedLang === "en" && isPolishPath && window.location.pathname !== "/") {
      const currentPath = window.location.pathname;
      const urlMap = {
        "/o-nas": "/en/about-us",
        "/oferta": "/en/services", 
        "/kontakt": "/en/contact",
        "/faq": "/en/faq",
        "/misja": "/en/mission",
        "/dlaczego-my": "/en/why-us",
        "/jak-dzialamy": "/en/how-we-work",
        "/audyt-bezposredni": "/en/direct-audit",
        "/metody-posrednie": "/en/indirect-methods",
        "/audyt-strony-www": "/en/website-audit"
      };
      if (urlMap[currentPath]) {
        window.location.href = urlMap[currentPath];
      }
    } else if (storedLang === "pl" && isEnglishPath) {
      const currentPath = window.location.pathname.replace("/en", "");
      const urlMap = {
        "/about-us": "/o-nas",
        "/services": "/oferta",
        "/contact": "/kontakt", 
        "/faq": "/faq",
        "/mission": "/misja",
        "/why-us": "/dlaczego-my",
        "/how-we-work": "/jak-dzialamy",
        "/direct-audit": "/audyt-bezposredni",
        "/indirect-methods": "/metody-posrednie",
        "/website-audit": "/audyt-strony-www",
        "/": "/"
      };
      if (urlMap[currentPath]) {
        window.location.href = urlMap[currentPath];
      }
    }
  }

  // Run language detection
  detectAndRedirectLanguage();

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
