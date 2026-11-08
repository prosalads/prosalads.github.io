// Paste your deployed Google Apps Script Web App URL here (see README.md).
const ENDPOINT = "";

const form = document.getElementById("form");
const msg = document.getElementById("msg");
const btn = document.getElementById("submit");

// Don't allow start dates in the past
form.startDate.min = new Date().toISOString().split("T")[0];

function show(text, ok) {
  msg.textContent = text;
  msg.className = ok ? "ok" : "err";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  if (!ENDPOINT) {
    show("Sign-ups aren't connected yet (ENDPOINT not set).", false);
    return;
  }
  btn.disabled = true;
  show("Submitting…", true);
  try {
    // text/plain avoids a CORS preflight, which Apps Script doesn't handle.
    await fetch(ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    form.reset();
    show("Thank you! We'll call you shortly to confirm your subscription.", true);
  } catch (err) {
    show("Something went wrong. Please try again or message us on Instagram.", false);
  } finally {
    btn.disabled = false;
  }
});
