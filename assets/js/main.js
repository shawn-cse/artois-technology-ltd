
document.addEventListener("DOMContentLoaded", () => {
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
      const open = !menu.classList.contains("open");
      toggle.classList.toggle("open", open);
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
    window.addEventListener("resize", () => { if (window.innerWidth > 1050) closeMenu(); });
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: "0px 0px -30px" });
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        const openButton = openItem.querySelector(".faq-question");
        if (openButton) openButton.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  const projectForm = document.querySelector("[data-project-form]");
  if (projectForm) {
    const status = projectForm.querySelector("[data-form-status]");
    projectForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!projectForm.reportValidity()) return;
      const data = new FormData(projectForm);
      const subject = encodeURIComponent(`Project enquiry — ${data.get("name") || "Website visitor"}`);
      const body = encodeURIComponent([
        `Name: ${data.get("name") || ""}`,
        `Email: ${data.get("email") || ""}`,
        `Company: ${data.get("company") || ""}`,
        `Service: ${data.get("service") || ""}`,
        `Budget: ${data.get("budget") || ""}`,
        "",
        "Project details:",
        data.get("message") || ""
      ].join("\n"));
      status.className = "form-status success";
      status.textContent = "Your email application will open with the project details.";
      window.location.href = `mailto:info@artoistechnologyltd.com?subject=${subject}&body=${body}`;
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
