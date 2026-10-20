/**
 * Artois Technology Limited — Payment & Verification Interactive Controller
 * Dedicated script for /payment/
 *
 * Integrates Formspree endpoints:
 * - https://formspree.io/f/xwlvjada (Primary)
 * - https://formspree.io/f/mjygyezd (Secondary Notification)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Reveal Flow: Proceed Button
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

  // 2. Payment Method Switcher (bKash / Nagad / Rocket)
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

  // 3. Recipient Number Clipboard Copy
  if (copyBkashBtn) {
    let copyTimer = null;
    copyBkashBtn.addEventListener("click", async () => {
      const rawNumber = "01568924935";
      let success = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(rawNumber);
          success = true;
        } catch (err) {
          success = false;
        }
      }

      if (!success) {
        try {
          const tempInput = document.createElement("input");
          tempInput.value = rawNumber;
          tempInput.style.position = "fixed";
          tempInput.style.opacity = "0";
          document.body.appendChild(tempInput);
          tempInput.select();
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

  // 4. Form Validation & Formspree Multi-Endpoint Submission
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

      // Submit concurrently to both Formspree endpoints (primary and secondary)
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Submitting...</span>`;

      try {
        const formData = new FormData(paymentForm);

        // Collect configured Formspree endpoints
        const primaryAction = paymentForm.action || "https://formspree.io/f/xwlvjada";
        const secondaryAction = paymentForm.getAttribute("data-secondary-action") || "https://formspree.io/f/mjygyezd";
        const endpoints = [primaryAction, secondaryAction].filter(Boolean);

        const requests = endpoints.map((endpoint) =>
          fetch(endpoint, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          })
        );

        const results = await Promise.allSettled(requests);
        const hasSuccess = results.some((res) => res.status === "fulfilled" && res.value.ok);

        if (hasSuccess) {
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
          formErrorAlert.textContent = "We could not submit your payment details. Please check your network connection and try again.";
          formErrorAlert.style.display = "block";
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
});
