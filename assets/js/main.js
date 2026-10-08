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

  // 9. Payment Page: Reveal Flow, bKash/Nagad Platform Toggle, Copy & Verification
  const proceedBtn = document.getElementById("payment-proceed-btn");
  const introState = document.getElementById("payment-intro-state");
  const revealWrapper = document.getElementById("payment-reveal-wrapper");

  if (proceedBtn && introState && revealWrapper) {
    proceedBtn.addEventListener("click", () => {
      introState.classList.add("fade-out");
      setTimeout(() => {
        introState.style.display = "none";
        revealWrapper.style.display = "block";
        revealWrapper.classList.add("payment-revealed");
        revealWrapper.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    });
  }

  const paymentSection = document.getElementById("payment-section") || document.querySelector(".payment-section");
  const toggleBkashRadio = document.getElementById("method-bkash");
  const toggleNagadRadio = document.getElementById("method-nagad");
  const toggleRocketRadio = document.getElementById("method-rocket");
  const toggleBkashLabel = document.getElementById("toggle-bkash");
  const toggleNagadLabel = document.getElementById("toggle-nagad");
  const toggleRocketLabel = document.getElementById("toggle-rocket");

  const providerLogo = document.getElementById("provider-header-logo");
  const infoMethodVal = document.getElementById("info-method-val");
  const infoRecipientLabel = document.getElementById("info-recipient-label");
  const badgeMethodText = document.getElementById("badge-method-text");
  const step1 = document.getElementById("instruction-step-1");
  const step5 = document.getElementById("instruction-step-5");
  const instructionNote = document.getElementById("instruction-note");
  const senderNumberLabel = document.getElementById("sender-number-label-text");
  const trxidLabel = document.getElementById("trxid-label-text");
  const hiddenMethodInput = document.getElementById("selected-payment-method");
  const copyBkashBtn = document.getElementById("copy-bkash-btn");

  let currentPaymentMethod = "bkash";

  const setPaymentMethod = (method) => {
    currentPaymentMethod = method;
    if (paymentSection) {
      paymentSection.setAttribute("data-payment-theme", method);
    }

    if (toggleBkashLabel && toggleNagadLabel && toggleRocketLabel) {
      toggleBkashLabel.classList.toggle("is-active", method === "bkash");
      toggleNagadLabel.classList.toggle("is-active", method === "nagad");
      toggleRocketLabel.classList.toggle("is-active", method === "rocket");
    }

    if (toggleBkashRadio) toggleBkashRadio.checked = method === "bkash";
    if (toggleNagadRadio) toggleNagadRadio.checked = method === "nagad";
    if (toggleRocketRadio) toggleRocketRadio.checked = method === "rocket";

    const methodProperName = method === "rocket" ? "Rocket" : (method === "nagad" ? "Nagad" : "bKash");

    if (hiddenMethodInput) {
      hiddenMethodInput.value = methodProperName;
    }

    if (method === "rocket") {
      if (providerLogo) {
        providerLogo.src = "/assets/img/rocket-logo.png";
        providerLogo.alt = "Rocket Logo";
      }
      if (infoMethodVal) infoMethodVal.textContent = "Rocket Send Money";
      if (infoRecipientLabel) infoRecipientLabel.textContent = "Recipient Rocket Number";
      if (badgeMethodText) badgeMethodText.textContent = "Send Money";
      if (step1) {
        step1.innerHTML = `<span class="step-num">1</span><span>Open your <strong>Rocket App</strong> or dial <strong>*322#</strong>.</span>`;
      }
      if (step5) {
        step5.innerHTML = `<span class="step-num">5</span><span>Confirm transfer with your <strong>Rocket PIN</strong>.</span>`;
      }
      if (instructionNote) {
        instructionNote.innerHTML = `<strong>Important:</strong> Personal Rocket transfer via <strong>Send Money</strong> only. No Merchant Payment or Cash Out. Keep your TrxID for verification.`;
      }
      if (senderNumberLabel) senderNumberLabel.textContent = "Sender Rocket Number";
      if (trxidLabel) trxidLabel.textContent = "Rocket TrxID";
      if (copyBkashBtn) copyBkashBtn.setAttribute("aria-label", "Copy Rocket number to clipboard");
    } else if (method === "nagad") {
      if (providerLogo) {
        providerLogo.src = "/assets/img/nagad-logo.png";
        providerLogo.alt = "Nagad Logo";
      }
      if (infoMethodVal) infoMethodVal.textContent = "Nagad Send Money";
      if (infoRecipientLabel) infoRecipientLabel.textContent = "Recipient Nagad Number";
      if (badgeMethodText) badgeMethodText.textContent = "Send Money";
      if (step1) {
        step1.innerHTML = `<span class="step-num">1</span><span>Open your <strong>Nagad App</strong> or dial <strong>*167#</strong>.</span>`;
      }
      if (step5) {
        step5.innerHTML = `<span class="step-num">5</span><span>Confirm transfer with your <strong>Nagad PIN</strong>.</span>`;
      }
      if (instructionNote) {
        instructionNote.innerHTML = `<strong>Important:</strong> Personal Nagad transfer via <strong>Send Money</strong> only. No Merchant Payment or Cash Out. Keep your TrxID for verification.`;
      }
      if (senderNumberLabel) senderNumberLabel.textContent = "Sender Nagad Number";
      if (trxidLabel) trxidLabel.textContent = "Nagad TrxID";
      if (copyBkashBtn) copyBkashBtn.setAttribute("aria-label", "Copy Nagad number to clipboard");
    } else {
      if (providerLogo) {
        providerLogo.src = "/assets/img/bkash-logo.png";
        providerLogo.alt = "bKash Logo";
      }
      if (infoMethodVal) infoMethodVal.textContent = "bKash Send Money";
      if (infoRecipientLabel) infoRecipientLabel.textContent = "Recipient bKash Number";
      if (badgeMethodText) badgeMethodText.textContent = "Send Money";
      if (step1) {
        step1.innerHTML = `<span class="step-num">1</span><span>Open your <strong>bKash App</strong> or dial <strong>*247#</strong>.</span>`;
      }
      if (step5) {
        step5.innerHTML = `<span class="step-num">5</span><span>Confirm transfer with your <strong>bKash PIN</strong>.</span>`;
      }
      if (instructionNote) {
        instructionNote.innerHTML = `<strong>Important:</strong> Personal bKash transfer via <strong>Send Money</strong> only. No Merchant Payment or Cash Out. Keep your TrxID for verification.`;
      }
      if (senderNumberLabel) senderNumberLabel.textContent = "Sender bKash Number";
      if (trxidLabel) trxidLabel.textContent = "bKash TrxID";
      if (copyBkashBtn) copyBkashBtn.setAttribute("aria-label", "Copy bKash number to clipboard");
    }
  };

  [
    [toggleBkashRadio, toggleBkashLabel, "bkash"],
    [toggleNagadRadio, toggleNagadLabel, "nagad"],
    [toggleRocketRadio, toggleRocketLabel, "rocket"],
  ].forEach(([radio, label, method]) => {
    if (radio) {
      radio.addEventListener("change", () => setPaymentMethod(method));
    }
    if (label) {
      label.addEventListener("click", () => setPaymentMethod(method));
    }
  });

  // Copy Number Button
  if (copyBkashBtn) {
    const rawNumber = "01568924935";
    let copyTimer = null;

    copyBkashBtn.addEventListener("click", async () => {
      let success = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(rawNumber);
          success = true;
        } catch (e) {
          success = false;
        }
      }

      if (!success) {
        try {
          const tempInput = document.createElement("input");
          tempInput.setAttribute("type", "text");
          tempInput.setAttribute("value", rawNumber);
          tempInput.style.position = "fixed";
          tempInput.style.top = "-9999px";
          tempInput.style.left = "-9999px";
          document.body.appendChild(tempInput);
          tempInput.focus();
          tempInput.select();
          tempInput.setSelectionRange(0, 99999);
          success = document.execCommand("copy");
          document.body.removeChild(tempInput);
        } catch (err) {
          success = false;
        }
      }

      const label = copyBkashBtn.querySelector(".copy-btn-text") || copyBkashBtn;
      if (success) {
        clearTimeout(copyTimer);
        label.textContent = "Copied!";
        copyBkashBtn.classList.add("copied");
        copyTimer = setTimeout(() => {
          label.textContent = "Copy";
          copyBkashBtn.classList.remove("copied");
        }, 2000);
      } else {
        const methodTitle = currentPaymentMethod === "rocket" ? "Rocket" : (currentPaymentMethod === "nagad" ? "Nagad" : "bKash");
        window.prompt(`Copy ${methodTitle} Number:`, rawNumber);
      }
    });
  }

  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const bkashInput = document.getElementById("bkash_number");
    const trxidInput = document.getElementById("trxid");

    const errorName = document.getElementById("error-name");
    const errorEmail = document.getElementById("error-email");
    const errorBkash = document.getElementById("error-bkash_number");
    const errorTrxid = document.getElementById("error-trxid");

    const formErrorAlert = document.getElementById("form-error-alert");
    const submitBtn = document.getElementById("submit-btn");
    const formCard = document.getElementById("payment-form-card");
    const successCard = document.getElementById("payment-success");

    const showError = (input, errorEl, message) => {
      if (input) input.classList.add("input-error");
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add("active");
      }
    };

    const clearError = (input, errorEl) => {
      if (input) input.classList.remove("input-error");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("active");
      }
    };

    // Real-time error clearing on input
    [
      [nameInput, errorName],
      [emailInput, errorEmail],
      [bkashInput, errorBkash],
      [trxidInput, errorTrxid],
    ].forEach(([input, errorEl]) => {
      if (input) {
        input.addEventListener("input", () => {
          clearError(input, errorEl);
          if (formErrorAlert) formErrorAlert.style.display = "none";
        });
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    paymentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (formErrorAlert) {
        formErrorAlert.style.display = "none";
        formErrorAlert.textContent = "";
      }

      let isValid = true;
      let firstInvalid = null;
      const methodTitle = currentPaymentMethod === "rocket" ? "Rocket" : (currentPaymentMethod === "nagad" ? "Nagad" : "bKash");

      // 1. Full Name check
      const nameVal = nameInput ? nameInput.value.trim() : "";
      if (!nameVal) {
        showError(nameInput, errorName, "Please enter your full name.");
        isValid = false;
        if (!firstInvalid) firstInvalid = nameInput;
      } else {
        clearError(nameInput, errorName);
      }

      // 2. Email Address check
      const emailVal = emailInput ? emailInput.value.trim() : "";
      if (!emailVal) {
        showError(emailInput, errorEmail, "Please enter your email address.");
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else if (!emailRegex.test(emailVal)) {
        showError(emailInput, errorEmail, "Please enter a valid email address (e.g. name@example.com).");
        isValid = false;
        if (!firstInvalid) firstInvalid = emailInput;
      } else {
        clearError(emailInput, errorEmail);
      }

      // 3. Sender Number check (exactly 11 digits, numeric only)
      const bkashVal = bkashInput ? bkashInput.value.trim() : "";
      if (!bkashVal) {
        showError(bkashInput, errorBkash, `Please enter your sender ${methodTitle} number.`);
        isValid = false;
        if (!firstInvalid) firstInvalid = bkashInput;
      } else if (/\D/.test(bkashVal)) {
        showError(bkashInput, errorBkash, "Only numeric digits are allowed (no spaces, dashes, or +880).");
        isValid = false;
        if (!firstInvalid) firstInvalid = bkashInput;
      } else if (bkashVal.length !== 11) {
        showError(bkashInput, errorBkash, `${methodTitle} number must contain exactly 11 digits (you entered ${bkashVal.length} digits).`);
        isValid = false;
        if (!firstInvalid) firstInvalid = bkashInput;
      } else if (!bkashVal.startsWith("01")) {
        showError(bkashInput, errorBkash, `${methodTitle} number must start with 01 (e.g. 01712345678).`);
        isValid = false;
        if (!firstInvalid) firstInvalid = bkashInput;
      } else {
        clearError(bkashInput, errorBkash);
      }

      // 4. Transaction ID check
      const trxidVal = trxidInput ? trxidInput.value.trim() : "";
      if (!trxidVal) {
        showError(trxidInput, errorTrxid, `Please enter your ${methodTitle} Transaction ID (TrxID).`);
        isValid = false;
        if (!firstInvalid) firstInvalid = trxidInput;
      } else {
        clearError(trxidInput, errorTrxid);
      }

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Submit directly to Formspree endpoint via POST
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Submitting...</span>`;

      try {
        const formData = new FormData(paymentForm);
        const response = await fetch(paymentForm.action, {
          method: "POST",
          body: formData,
          headers: {
            "Accept": "application/json",
          },
        });

        if (response.ok) {
          if (formCard) formCard.style.display = "none";
          if (successCard) {
            successCard.style.display = "block";
            successCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          if (formErrorAlert) {
            formErrorAlert.textContent = "We could not submit your payment details. Please check your information and try again.";
            formErrorAlert.style.display = "block";
          }
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      } catch (err) {
        if (formErrorAlert) {
          formErrorAlert.textContent = "We could not submit your payment details. Please check your information and try again.";
          formErrorAlert.style.display = "block";
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
});
