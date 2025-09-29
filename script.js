document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlistForm");
  const message = document.getElementById("formMessage");

  // ✅ Use your latest Google Apps Script deployment URL
  const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzpr2vwRcTtl9KobodpK2lqnshgu_ImtSupMtSDxy5YdvuYyYedb2UElL2KrzBePO_u/exec";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value.trim(),
      suggestion: document.getElementById("suggestion").value.trim(),
    };

    message.textContent = "⏳ Submitting...";
    message.classList.remove("hidden");

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ✅ tell server JSON
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok && result.result === "success") {
        form.reset();
        message.textContent =
          "🎉 Thanks! Your response has been recorded successfully.";
      } else if (response.ok) {
        message.textContent =
          "⚠️ Server responded but without success: " +
          (result.message || JSON.stringify(result));
      } else {
        message.textContent =
          "⚠️ Something went wrong (status " + response.status + ").";
      }
    } catch (err) {
      console.error("Fetch error:", err);
      message.textContent = "⚠️ Failed to connect. Please try again later.";
    }
  });
});
