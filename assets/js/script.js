// ====== STYLENCIA SCRIPT ======

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Waitlist form submit success message
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = form.querySelector("input[type=email]");
    if (emailInput.value.trim() === "") {
      alert("⚠️ Please enter a valid email.");
      return;
    }

    // Simulate submission (replace with real backend/endpoint)
    alert("🎉 Thanks! You've joined the Stylencia waitlist.");
    emailInput.value = "";
  });
}
