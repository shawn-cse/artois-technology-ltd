/**
 * Artois Technology Limited — Careers Interactive Controller
 * Dedicated script for /careers/
 */

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll helper for internal anchor buttons
  const applyLinks = document.querySelectorAll('a[href^="#"]');
  applyLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      if (!targetId) return;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});
