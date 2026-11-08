// Sign-ups are emailed via FormSubmit.co (free, no Google sign-in needed). See README.md.
// Replace with the owner's email, or the private alias FormSubmit gives after activation.
const FORM_TARGET = "";

const WHATSAPP = "917599444444";
const form = document.getElementById("form");
const msg = document.getElementById("msg");
const btn = document.getElementById("submit");

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
  const data = Object.fromEntries(new FormData(form));
  if (!FORM_TARGET) {
    show("Sign-ups aren't connected yet. Please message us on WhatsApp: 7599 444 444.", false);
    return;
  }
  btn.disabled = true;
  show("Submitting…", true);
  try {
    const res = await fetch("https://formsubmit.co/ajax/" + FORM_TARGET, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, _subject: "New salad subscription: " + data.name + " (" + data.plan + ")", _template: "table" }),
    });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    show("Thank you! We'll call you shortly to confirm your subscription.", true);
  } catch (err) {
    show("Something went wrong. Please try again or WhatsApp us on 7599 444 444.", false);
  } finally {
    btn.disabled = false;
  }
});
