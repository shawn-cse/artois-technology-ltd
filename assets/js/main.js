/**
 * Artois Technology Limited — Official Corporate Interactive Scripts
 * Pure vanilla JavaScript, zero dependencies, accessible and performant.
 * Optimized for static GitHub Pages deployment.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Header Scroll Elevation State
  const siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        siteHeader.classList.add("scrolled");
      } else {
        siteHeader.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Navigation Drawer & Backdrop Controller
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  // Ensure backdrop exists
  let backdrop = document.querySelector(".menu-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "menu-backdrop";
    document.body.appendChild(backdrop);
  }

  if (toggle && menu) {
    const openMenu = () => {
      toggle.classList.add("open");
      menu.classList.add("open");
      backdrop.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      toggle.classList.remove("open");
      menu.classList.remove("open");
      backdrop.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on backdrop click
    backdrop.addEventListener("click", closeMenu);

    // Close on navigation link click
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on keyboard ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        closeMenu();
      }
    });

    // Close on viewport resize past tablet breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100 && menu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // 3. Interactive Command Center Dashboard Tabs (Hero Visual)
  const ccTabs = document.querySelectorAll("[data-cc-tab]");
  const ccPanels = document.querySelectorAll(".cc-panel, [data-cc-panel]");

  if (ccTabs.length > 0) {
    ccTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetPanelId = tab.getAttribute("data-cc-tab");

        // Deactivate all tabs
        ccTabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });

        // Deactivate all panels
        ccPanels.forEach((p) => {
          p.classList.remove("active");
        });

        // Activate clicked tab
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        // Activate corresponding panel
        const activePanel = document.getElementById(targetPanelId);
        if (activePanel) {
          activePanel.classList.add("active");

          // Re-trigger bar animation if panel has telemetry bars
          const bars = activePanel.querySelectorAll(".telemetry-bars i");
          bars.forEach((bar) => {
            bar.style.animation = "none";
            // Trigger reflow
            void bar.offsetWidth;
            bar.style.animation = "";
          });
        }
      });
    });
  }

  // 4. Scroll Reveal Observer with Graceful Fallback
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // 5. Accessible FAQ Accordions
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Optional single-open accordion behavior
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("open");
          const otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("open");
        questionBtn.setAttribute("aria-expanded", "true");
      } else {
        item.classList.remove("open");
        questionBtn.setAttribute("aria-expanded", "false");
      }
    });
  });

  // 6. FAQ Category Filter Tabs
  const faqFilterBtns = document.querySelectorAll("[data-faq-filter]");
  if (faqFilterBtns.length > 0) {
    faqFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-faq-filter");

        faqFilterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        faqItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");
          if (filter === "all" || itemCategory === filter) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 7. Project Intake Form & URL Query Pre-fill Support
  const projectForm = document.querySelector("[data-project-form]");
  if (projectForm) {
    // Check for ?service= parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get("service");
    const serviceSelect = projectForm.querySelector('select[name="service"]');

    if (serviceParam && serviceSelect) {
      // Find matching option (case-insensitive substring)
      const options = Array.from(serviceSelect.options);
      const match = options.find((opt) =>
        opt.value.toLowerCase().includes(serviceParam.toLowerCase())
      );
      if (match) {
        serviceSelect.value = match.value;
      }
    }

    const statusMsg = projectForm.querySelector("[data-form-status]");

    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!projectForm.reportValidity()) return;

      const formData = new FormData(projectForm);
      const name = formData.get("name") || "";
      const email = formData.get("email") || "";
      const company = formData.get("company") || "Not provided";
      const service = formData.get("service") || "General Project";
      const timeline = formData.get("timeline") || "Flexible";
      const budget = formData.get("budget") || "To be discussed";
      const message = formData.get("message") || "";
      const ndaRequested = formData.get("nda_requested")
        ? "Yes (Please provide Mutual NDA)"
        : "No";

      const subject = encodeURIComponent(`New Project Inquiry — ${name} [${company}]`);

      const emailBody = encodeURIComponent(
        `Dear Artois Technology Limited Team,\n\n` +
        `I would like to inquire about starting a project with Artois Technology Limited.\n\n` +
        `--- CLIENT INFORMATION ---\n` +
        `Full Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company / Organization: ${company}\n\n` +
        `--- PROJECT REQUIREMENTS ---\n` +
        `Selected Service: ${service}\n` +
        `Target Timeline: ${timeline}\n` +
        `Estimated Budget: ${budget}\n` +
        `Mutual NDA Requested: ${ndaRequested}\n\n` +
        `--- PROJECT DESCRIPTION & GOALS ---\n` +
        `${message}\n\n` +
        `Looking forward to receiving your technical feedback and estimate.\n\n` +
        `Best regards,\n` +
        `${name}`
      );

      if (statusMsg) {
        statusMsg.className = "form-status success";
        statusMsg.textContent = "Opening your email app to transmit your inquiry to info@artoistechnologyltd.com...";
      }

      window.location.href = `mailto:info@artoistechnologyltd.com?subject=${subject}&body=${emailBody}`;
    });
  }

  // 8. Dynamic Copyright Year
  const yearEls = document.querySelectorAll("[data-year]");
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = String(currentYear);
  });
});
