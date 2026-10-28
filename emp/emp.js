/**
 * Artois Technology Limited — Employee Directory
 * Instant search & filtering controller
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("empSearch");
  const tableRows = document.querySelectorAll(".emp-row");
  const countBadge = document.getElementById("empCount");
  const noResults = document.getElementById("empNoResults");
  const tableCard = document.getElementById("empTableCard");
  const totalCount = tableRows.length;

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      let visibleCount = 0;

      tableRows.forEach((row) => {
        const name = (row.getAttribute("data-name") || "").toLowerCase();
        if (!query || name.includes(query)) {
          row.style.display = "";
          visibleCount++;
        } else {
          row.style.display = "none";
        }
      });

      // Update count badge
      if (countBadge) {
        if (!query) {
          countBadge.textContent = `${totalCount} Employees`;
        } else {
          countBadge.textContent = `${visibleCount} of ${totalCount} found`;
        }
      }

      // Toggle empty state
      if (noResults && tableCard) {
        if (visibleCount === 0) {
          noResults.style.display = "block";
          tableCard.style.display = "none";
        } else {
          noResults.style.display = "none";
          tableCard.style.display = "block";
        }
      }
    });
  }
});
