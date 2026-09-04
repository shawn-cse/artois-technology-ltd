/**
 * Artois Technology Limited — Official Enterprise Interactive Scripts
 * Pure vanilla JavaScript, zero dependencies, accessible and performant.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Navigation Toggle
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");

  if (toggle && menu) {
    const closeMenu = () => {
      toggle.classList.remove("open");
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");
      toggle.classList.toggle("open", !isOpen);
      menu.classList.toggle("open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("menu-open", !isOpen);
    });

    // Close on navigation link click
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close on viewport resize past tablet breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1100 && menu.classList.contains("open")) {
        closeMenu();
      }
    });

    // Close on click outside
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("open") && !menu.contains(e.target) && !toggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // 2. Interactive Command Center Dashboard Tabs (Hero Visual)
  const ccTabs = document.querySelectorAll("[data-cc-tab]");
  const ccPanels = document.querySelectorAll("[data-cc-panel]");

  if (ccTabs.length > 0 && ccPanels.length > 0) {
    ccTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetPanelId = tab.getAttribute("data-cc-tab");

        ccTabs.forEach((t) => t.classList.remove("active"));
        ccPanels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        const activePanel = document.getElementById(targetPanelId);
        if (activePanel) {
          activePanel.classList.add("active");
        }
      });
    });
  }

  // 3. Scroll Reveal Observer
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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for environments without IntersectionObserver
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // 4. Accessible FAQ Accordions
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Optional single-open accordion behavior:
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

  // 5. FAQ Category Filter Tabs
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
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 6. Enterprise Project Intake Form Submission (Mailto Preparation)
  const projectForm = document.querySelector("[data-project-form]");
  if (projectForm) {
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
      const ndaRequested = formData.get("nda_requested") ? "Yes (Please send Mutual NDA first)" : "No";

      const subject = encodeURIComponent(`New Project Inquiry — ${name} [${company}]`);

      const emailBody = encodeURIComponent(
        `Dear Artois Technology Limited Team,\n\n` +
        `I would like to discuss a project with Artois Technology Limited.\n\n` +
        `--- MY DETAILS ---\n` +
        `Full Name: ${name}\n` +
        `Email Address: ${email}\n` +
        `Company / Business: ${company}\n\n` +
        `--- PROJECT DETAILS ---\n` +
        `Service Needed: ${service}\n` +
        `Estimated Timeline: ${timeline}\n` +
        `Estimated Budget: ${budget}\n` +
        `NDA Requested: ${ndaRequested}\n\n` +
        `--- PROJECT DESCRIPTION ---\n` +
        `${message}\n\n` +
        `Looking forward to hearing from your team.\n\n` +
        `Best regards,\n` +
        `${name}`
      );

      if (statusMsg) {
        statusMsg.className = "form-status success";
        statusMsg.textContent = "Opening your email app to send your project details...";
      }

      window.location.href = `mailto:info@artoistechnologyltd.com?subject=${subject}&body=${emailBody}`;
    });
  }

  // 7. Dynamic Year in Footer
  const yearEls = document.querySelectorAll("[data-year]");
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = String(currentYear);
  });
});
