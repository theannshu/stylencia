document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("waitlistForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById("email").value,
      suggestion: document.getElementById("suggestion").value
    };

    message.textContent = "⏳ Submitting...";
    message.classList.remove("hidden");

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwHVfM5od4MbSRpdryN4y_C74js9RRwVPzZfLHAW2E9JJ0Medbx0URMYbjSZaC7mVXTRg/exec",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        form.reset();
        message.textContent = "🎉 Thanks! Your response has been recorded.";
        message.classList.remove("hidden");
      } else {
        message.textContent = "⚠️ Something went wrong. Please try again.";
      }
    } catch (err) {
      console.error(err);
      message.textContent = "⚠️ Failed to connect. Please try again.";
    }
  });
});
