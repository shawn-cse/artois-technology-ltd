/**
 * Artois Technology Limited — Payment & Verification Interactive Controller
 * Dedicated script for /payment/
 *
 * Integrated with SubmitKit:
 * Endpoint: https://submitkit.dev/api/f/cmvrqqef60017spvgc5chwiax
 */

document.addEventListener("DOMContentLoaded", () => {
  // -------------------------------------------------------------------------
  // 1. Payment Method Switcher (bKash / Nagad / Rocket)
  // -------------------------------------------------------------------------
  const paymentSection = document.getElementById("payment-section") || document.querySelector(".payment-section");
  const toggleBkashRadio = document.getElementById("method-bkash");
  const toggleNagadRadio = document.getElementById("method-nagad");
  const toggleRocketRadio = document.getElementById("method-rocket");
  const toggleBkashLabel = document.getElementById("toggle-bkash");
  const toggleNagadLabel = document.getElementById("toggle-nagad");
  const toggleRocketLabel = document.getElementById("toggle-rocket");

  const providerLogo = document.getElementById("provider-header-logo");
  const infoRecipientLabel = document.getElementById("info-recipient-label");
  const senderNumberLabel = document.getElementById("sender-number-label-text");
  const senderNumberInput = document.getElementById("bkash_number");
  const hiddenMethodInput = document.getElementById("selected-payment-method");
  const copyBkashBtn = document.getElementById("copy-bkash-btn");

  let currentPaymentMethod = "bkash";
  const rawRecipientNumber = "01568924935";

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
      if (infoRecipientLabel) infoRecipientLabel.textContent = "Recipient Rocket Personal Number";
      if (senderNumberLabel) senderNumberLabel.textContent = "Sender Rocket Number";
      if (senderNumberInput) senderNumberInput.placeholder = "01XXXXXXXXX";
      if (copyBkashBtn) copyBkashBtn.setAttribute("aria-label", "Copy Rocket number to clipboard");
    } else if (method === "nagad") {
      if (providerLogo) {
        providerLogo.src = "/assets/img/nagad-logo.png";
        providerLogo.alt = "Nagad Logo";
      }
      if (infoRecipientLabel) infoRecipientLabel.textContent = "Recipient Nagad Personal Number";
      if (senderNumberLabel) senderNumberLabel.textContent = "Sender Nagad Number";
      if (senderNumberInput) senderNumberInput.placeholder = "01XXXXXXXXX";
      if (copyBkashBtn) copyBkashBtn.setAttribute("aria-label", "Copy Nagad number to clipboard");
    } else {
      if (providerLogo) {
        providerLogo.src = "/assets/img/bkash-logo.png";
        providerLogo.alt = "bKash Logo";
      }
      if (infoRecipientLabel) infoRecipientLabel.textContent = "Recipient bKash Personal Number";
      if (senderNumberLabel) senderNumberLabel.textContent = "Sender bKash Number";
      if (senderNumberInput) senderNumberInput.placeholder = "01XXXXXXXXX";
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

  // -------------------------------------------------------------------------
  // 2. Recipient Number Clipboard Copy with Feedback
  // -------------------------------------------------------------------------
  if (copyBkashBtn) {
    let copyTimer = null;
    copyBkashBtn.addEventListener("click", async () => {
      let success = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(rawRecipientNumber);
          success = true;
        } catch (err) {
          success = false;
        }
      }

      if (!success) {
        try {
          const tempInput = document.createElement("input");
          tempInput.value = rawRecipientNumber;
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

      const label = copyBkashBtn.querySelector(".copy-btn-text");
      const copyIcon = copyBkashBtn.querySelector(".copy-icon-svg");
      const copiedIcon = copyBkashBtn.querySelector(".copied-icon-svg");

      if (success) {
        clearTimeout(copyTimer);
        if (label) label.textContent = "Copied!";
        if (copyIcon) copyIcon.style.display = "none";
        if (copiedIcon) copiedIcon.style.display = "inline-block";
        copyBkashBtn.classList.add("copied");

        copyTimer = setTimeout(() => {
          if (label) label.textContent = "Copy Number";
          if (copyIcon) copyIcon.style.display = "inline-block";
          if (copiedIcon) copiedIcon.style.display = "none";
          copyBkashBtn.classList.remove("copied");
        }, 2200);
      } else {
        const methodTitle = currentPaymentMethod === "rocket" ? "Rocket" : (currentPaymentMethod === "nagad" ? "Nagad" : "bKash");
        window.prompt(`Copy ${methodTitle} Number:`, rawRecipientNumber);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Payment Purpose Selection Chips
  // -------------------------------------------------------------------------
  const purposeChips = document.querySelectorAll(".purpose-chip");
  purposeChips.forEach((chip) => {
    const radio = chip.querySelector(".purpose-radio");
    if (radio) {
      radio.addEventListener("change", () => {
        purposeChips.forEach((c) => c.classList.remove("is-active"));
        if (radio.checked) {
          chip.classList.add("is-active");
        }
      });
    }
  });

  // -------------------------------------------------------------------------
  // 4. Quick Amount Presets
  // -------------------------------------------------------------------------
  const amountInput = document.getElementById("amount");
  const presetButtons = document.querySelectorAll(".preset-btn");

  if (amountInput && presetButtons.length > 0) {
    presetButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const val = btn.getAttribute("data-preset");
        amountInput.value = val;
        presetButtons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        amountInput.dispatchEvent(new Event("input"));
      });
    });

    amountInput.addEventListener("input", () => {
      const currentVal = amountInput.value.replace(/[^0-9]/g, "");
      presetButtons.forEach((b) => {
        if (b.getAttribute("data-preset") === currentVal) {
          b.classList.add("is-active");
        } else {
          b.classList.remove("is-active");
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Payment Screenshot Upload Box & Live Preview
  // -------------------------------------------------------------------------
  const fileDropZone = document.getElementById("file-drop-zone");
  const fileInput = document.getElementById("payment_screenshot");
  const filePrompt = document.getElementById("file-zone-prompt");
  const filePreviewCard = document.getElementById("file-preview-card");
  const filePreviewThumb = document.getElementById("file-preview-thumb");
  const fileDocIcon = document.getElementById("file-preview-doc-icon");
  const filePreviewName = document.getElementById("file-preview-name");
  const filePreviewSize = document.getElementById("file-preview-size");
  const fileRemoveBtn = document.getElementById("file-remove-btn");
  const errorScreenshot = document.getElementById("error-screenshot");

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleSelectedFile = (file) => {
    if (!file) return;

    // Check size (max 10MB)
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      if (errorScreenshot) {
        errorScreenshot.textContent = "File exceeds 10MB limit. Please upload a smaller screenshot.";
        errorScreenshot.classList.add("active");
      }
      resetFileUpload();
      return;
    }

    if (errorScreenshot) {
      errorScreenshot.textContent = "";
      errorScreenshot.classList.remove("active");
    }

    if (filePreviewName) filePreviewName.textContent = file.name;
    if (filePreviewSize) filePreviewSize.textContent = formatFileSize(file.size);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (filePreviewThumb) {
          filePreviewThumb.src = e.target.result;
          filePreviewThumb.style.display = "block";
        }
        if (fileDocIcon) fileDocIcon.style.display = "none";
      };
      reader.readAsDataURL(file);
    } else {
      if (filePreviewThumb) filePreviewThumb.style.display = "none";
      if (fileDocIcon) fileDocIcon.style.display = "flex";
    }

    if (filePrompt) filePrompt.style.display = "none";
    if (filePreviewCard) filePreviewCard.style.display = "flex";
    if (fileDropZone) fileDropZone.classList.add("has-file");
  };

  const resetFileUpload = () => {
    if (fileInput) fileInput.value = "";
    if (filePreviewThumb) filePreviewThumb.src = "";
    if (filePrompt) filePrompt.style.display = "flex";
    if (filePreviewCard) filePreviewCard.style.display = "none";
    if (fileDropZone) fileDropZone.classList.remove("has-file");
  };

  if (fileDropZone && fileInput) {
    fileDropZone.addEventListener("click", (e) => {
      if (e.target.closest("#file-remove-btn")) return;
      fileInput.click();
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files[0]) {
        handleSelectedFile(fileInput.files[0]);
      }
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      fileDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileDropZone.classList.add("drag-over");
      });
    });

    ["dragleave", "drop"].forEach((eventName) => {
      fileDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileDropZone.classList.remove("drag-over");
      });
    });

    fileDropZone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files[0]) {
        fileInput.files = dt.files;
        handleSelectedFile(dt.files[0]);
      }
    });
  }

  if (fileRemoveBtn) {
    fileRemoveBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      resetFileUpload();
      if (fileInput) fileInput.click();
    });
  }

  // -------------------------------------------------------------------------
  // 6. Form Validation & SubmitKit Submission
  // -------------------------------------------------------------------------
  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const bkashInput = document.getElementById("bkash_number");

    const errorName = document.getElementById("error-name");
    const errorPhone = document.getElementById("error-phone");
    const errorAmount = document.getElementById("error-amount");
    const errorBkash = document.getElementById("error-bkash_number");

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
      [phoneInput, errorPhone],
      [amountInput, errorAmount],
      [bkashInput, errorBkash],
    ].forEach(([input, errorEl]) => {
      if (input) {
        input.addEventListener("input", () => {
          clearError(input, errorEl);
          if (formErrorAlert) formErrorAlert.style.display = "none";
        });
      }
    });

    paymentForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (formErrorAlert) {
        formErrorAlert.style.display = "none";
        formErrorAlert.textContent = "";
      }

      let isValid = true;
      let firstInvalid = null;
      const methodTitle = currentPaymentMethod === "rocket" ? "Rocket" : (currentPaymentMethod === "nagad" ? "Nagad" : "bKash");

      // 1. Name check
      const nameVal = nameInput ? nameInput.value.trim() : "";
      if (!nameVal) {
        showError(nameInput, errorName, "Please enter your name.");
        isValid = false;
        if (!firstInvalid) firstInvalid = nameInput;
      } else if (nameVal.length < 2) {
        showError(nameInput, errorName, "Name must be at least 2 characters.");
        isValid = false;
        if (!firstInvalid) firstInvalid = nameInput;
      } else {
        clearError(nameInput, errorName);
      }

      // 2. Amount check
      const amountVal = amountInput ? amountInput.value.trim().replace(/[^0-9.]/g, "") : "";
      if (!amountVal || isNaN(parseFloat(amountVal)) || parseFloat(amountVal) <= 0) {
        showError(amountInput, errorAmount, "Please enter the amount paid in BDT.");
        isValid = false;
        if (!firstInvalid) firstInvalid = amountInput;
      } else {
        clearError(amountInput, errorAmount);
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
        showError(bkashInput, errorBkash, `${methodTitle} number must contain exactly 11 digits (e.g. 01712345678).`);
        isValid = false;
        if (!firstInvalid) firstInvalid = bkashInput;
      } else if (!bkashVal.startsWith("01")) {
        showError(bkashInput, errorBkash, `${methodTitle} number must start with 01 (e.g. 01712345678).`);
        isValid = false;
        if (!firstInvalid) firstInvalid = bkashInput;
      } else {
        clearError(bkashInput, errorBkash);
      }

      // 4. Payment Screenshot check
      const file = fileInput && fileInput.files ? fileInput.files[0] : null;
      if (!file) {
        if (errorScreenshot) {
          errorScreenshot.textContent = "Please attach your payment screenshot or confirmation receipt.";
          errorScreenshot.classList.add("active");
        }
        isValid = false;
        if (!firstInvalid && fileDropZone) {
          firstInvalid = fileDropZone;
          fileDropZone.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        if (errorScreenshot) {
          errorScreenshot.textContent = "";
          errorScreenshot.classList.remove("active");
        }
      }

      if (!isValid) {
        if (firstInvalid && typeof firstInvalid.focus === "function") {
          firstInvalid.focus();
        }
        return;
      }

      // Submit to SubmitKit endpoint
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spinner-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Submitting Verification...</span>
      `;

      try {
        const formData = new FormData(paymentForm);
        const endpoint = paymentForm.action || "https://submitkit.dev/api/f/cmvrqqef60017spvgc5chwiax";

        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        let data = null;
        try {
          data = await response.json();
        } catch (e) {
          data = null;
        }

        if (response.ok || (data && (data.ok === true || data.success === true))) {
          // Populate summary card
          const successName = document.getElementById("success-name");
          const successMethod = document.getElementById("success-method");
          const successAmount = document.getElementById("success-amount");
          const successSender = document.getElementById("success-sender");

          if (successName) successName.textContent = nameVal;
          if (successMethod) successMethod.textContent = `${methodTitle} (Send Money)`;
          if (successAmount) successAmount.textContent = `${amountVal} BDT`;
          if (successSender) successSender.textContent = bkashVal;

          if (formCard) formCard.style.display = "none";
          if (successCard) {
            successCard.style.display = "block";
            successCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          const errDetail = data && (data.message || data.error) ? data.message || data.error : "We could not submit your payment details. Please check your information and try again.";
          if (formErrorAlert) {
            formErrorAlert.textContent = errDetail;
            formErrorAlert.style.display = "block";
          }
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      } catch (err) {
        if (formErrorAlert) {
          formErrorAlert.textContent = "A network error occurred while submitting your verification. Please check your connection and try again.";
          formErrorAlert.style.display = "block";
        }
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });

    // Reset button on success card
    const resetBtn = document.getElementById("reset-payment-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        paymentForm.reset();
        resetFileUpload();
        presetButtons.forEach((b) => b.classList.remove("is-active"));
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <span class="btn-text">Submit Payment Verification</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          `;
        }
        if (successCard) successCard.style.display = "none";
        if (formCard) {
          formCard.style.display = "block";
          formCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  }
});
