// Google Apps Script: receives sign-ups, appends to the Sheet, emails the owner.
// Bound to a Google Sheet (Extensions > Apps Script). See README.md.

const NOTIFY_EMAIL = "YOUR_EMAIL@example.com"; // change to the restaurant's email

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return ok(); // honeypot: bots fill this

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Time", "Name", "Phone", "Address", "Plan", "Start date", "Delivery time", "Notes", "Status"]);
    }
    const clean = (v) => String(v || "").trim().slice(0, 500).replace(/^[=+\-@]/, "'$&"); // block formula injection
    sheet.appendRow([
      new Date(), clean(d.name), clean(d.phone), clean(d.address), clean(d.plan),
      clean(d.startDate), clean(d.deliveryTime), clean(d.notes), "New",
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: "New salad subscription: " + clean(d.name) + " (" + clean(d.plan) + ")",
      body: [
        "Name: " + clean(d.name),
        "Phone: " + clean(d.phone),
        "Address: " + clean(d.address),
        "Plan: " + clean(d.plan),
        "Start date: " + clean(d.startDate),
        "Delivery time: " + clean(d.deliveryTime),
        "Notes: " + clean(d.notes),
      ].join("\n"),
    });
    return ok();
  } catch (err) {
    return ContentService.createTextOutput("error").setMimeType(ContentService.MimeType.TEXT);
  }
}

function ok() {
  return ContentService.createTextOutput("ok").setMimeType(ContentService.MimeType.TEXT);
}
