(() => {
  const copyButton = document.querySelector('[data-copy-link]');
  const printButton = document.querySelector('[data-print]');
  const toast = document.querySelector('[data-toast]');
  if (copyButton) copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (toast) toast.textContent = 'Verification link copied.';
    } catch {
      if (toast) toast.textContent = 'Copy was blocked. Select the address from your browser.';
    }
  });
  if (printButton) printButton.addEventListener('click', () => window.print());
})();
