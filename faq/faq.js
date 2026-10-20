/**
 * Artois Technology Limited — FAQ Interactive Controller
 * Dedicated script for /faq/
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Accessible FAQ Accordions
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Single-open accordion behavior
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

  // 2. FAQ Category Filter Tabs
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
});
