# Eat N Chill – Salad Subscription Site

Static site (`index.html`, `style.css`, `script.js`). Sign-ups go to a Google Sheet and trigger an email, via a free Google Apps Script.

## Connect sign-ups (5 minutes)
1. Create a new Google Sheet.
2. Extensions → Apps Script. Paste the contents of `apps-script/Code.gs`. Set `NOTIFY_EMAIL`.
3. Deploy → New deployment → type **Web app** → Execute as **Me**, Who has access **Anyone**. Authorize when asked.
4. Copy the Web app URL into `ENDPOINT` at the top of `script.js`.
5. Submit a test registration; check the Sheet and your inbox.

## Preview locally
```bash
python3 -m http.server 8000
```
Open http://localhost:8000.

## Deploy
Upload the folder to Netlify, Vercel, Cloudflare Pages or GitHub Pages (all free). Point the restaurant's domain at it.

## To replace
- Prices (`₹XXX`), plans and menu items in `index.html` are placeholders.
- Add real photos, logo, phone/WhatsApp number and address.
- The Zomato page could not be read, and the Instagram page showed no menu or prices, so all content is a draft.
