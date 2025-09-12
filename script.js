// Form submission handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlistForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent real submission for demo
    
    // TODO: Replace with actual form endpoint
    setTimeout(() => {
      form.reset();
      message.classList.remove("hidden");
    }, 500);
  });
});
