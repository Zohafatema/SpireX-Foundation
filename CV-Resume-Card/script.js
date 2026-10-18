
const themeToggle = document.getElementById("themeToggle");
const downloadBtn = document.getElementById("downloadBtn");
const year = document.getElementById("year");

// Display current year
year.textContent = new Date().getFullYear();

// Toggle dark and light mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
});

// Download resume as PDF using the browser's print dialog
downloadBtn.addEventListener("click", () => {
  window.print();
});
