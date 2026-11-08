# Eat n Chill – Healthy Meal Subscription Site

Static site (`index.html`, `style.css`, `script.js`, `img/`). Hosted free on GitHub Pages.

## Receive sign-ups by email (2 minutes, no Google sign-in)
Uses [FormSubmit.co](https://formsubmit.co).
1. In `script.js` set `FORM_TARGET` to the email that should receive sign-ups.
2. Push, open the live site and submit one test registration.
3. FormSubmit emails an activation link to that address. Click it once.
4. The same email contains a private alias (random string). Put the alias in `FORM_TARGET` instead of the email, so the address isn't public in the repo.

## Preview locally
```bash
python3 -m http.server 8000
```

## Still placeholders
- Subscription prices ("Call for price").
- Photos are small thumbnails cropped from the Zomato menu; swap in higher-resolution images in `img/`.
