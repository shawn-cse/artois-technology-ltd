/**
 * Artois Technology Limited — Corporate Employee Directory Controller
 * Real-time search, department & status filtering, responsive interactions.
 */

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("empSearch");
  const filterButtons = document.querySelectorAll(".emp-filter-btn");
  const tableRows = document.querySelectorAll(".emp-row");
  const countBadge = document.getElementById("empCount");
  const noResults = document.getElementById("empNoResults");
  const tableWrapper = document.getElementById("empTableWrapper");

  let currentFilter = "all";
  let searchQuery = "";

  const applyFilters = () => {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    tableRows.forEach((row) => {
      const name = (row.getAttribute("data-name") || "").toLowerCase();
      const role = (row.getAttribute("data-role") || "").toLowerCase();
      const dept = (row.getAttribute("data-dept") || "").toLowerCase();
      const id = (row.getAttribute("data-id") || "").toLowerCase();
      const status = (row.getAttribute("data-status") || "").toLowerCase();

      // Check Category Filter
      let matchesFilter = false;
      if (currentFilter === "all") {
        matchesFilter = true;
      } else if (currentFilter === "active" && status === "active") {
        matchesFilter = true;
      } else if (currentFilter === "completed" && status === "completed") {
        matchesFilter = true;
      } else if (currentFilter === "software" && dept.includes("software")) {
        matchesFilter = true;
      } else if (currentFilter === "web" && dept.includes("web")) {
        matchesFilter = true;
      }

      // Check Search Query
      const matchesSearch = !query || 
        name.includes(query) || 
        role.includes(query) || 
        dept.includes(query) || 
        id.includes(query);

      if (matchesFilter && matchesSearch) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    // Update count display
    if (countBadge) {
      countBadge.textContent = `Showing ${visibleCount} verified ${visibleCount === 1 ? "record" : "records"}`;
    }

    // Toggle No Results View
    if (noResults && tableWrapper) {
      if (visibleCount === 0) {
        noResults.style.display = "block";
        tableWrapper.style.display = "none";
      } else {
        noResults.style.display = "none";
        tableWrapper.style.display = "block";
      }
    }
  };

  // Search input listener
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Filter button listeners
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter") || "all";
      applyFilters();
    });
  });

  // Initial calculation
  applyFilters();
});
