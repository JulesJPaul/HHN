# HHN
# Jules Paul Landing Page — Version 1

A mobile-first landing page for Jules Paul's housing, patient coordination, and shared-living services.

## Stack
- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages for deployment

## Project Structure

jules-paul-v1/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   └── images/
└── README.md

## Before Publishing

### 1. Replace Jules's contact details
Open `index.html` and replace:

- `+10000000000`
- `hello@example.com`

There are three CTA links:

```html
href="tel:+10000000000"
href="sms:+10000000000"
href="mailto:hello@example.com"
```

### 2. Add Jules's professional photo

Save the photo inside:

`assets/images/jules-headshot.jpg`

Then replace the `.photo-placeholder` block in `index.html` with:

```html
<img
  src="assets/images/jules-headshot.jpg"
  alt="Jules Paul"
  class="hero-photo"
/>
```

And add this to `css/styles.css`:

```css
.hero-photo {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: calc(var(--radius) - 6px);
}
```

### 3. Add the intro video

Recommended method: upload the video to YouTube as **Unlisted**.

Then replace the `.video-placeholder` inside `.video-shell` with the YouTube embed:

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  title="Meet Jules Paul"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen>
</iframe>
```

Add:

```css
.video-shell iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: 0;
  display: block;
}
```

### 4. Test locally

Double-click `index.html`, or use VS Code Live Server.

Test:
- Desktop
- Tablet
- Mobile
- Call button
- Text button
- Email button
- Navigation links

### 5. Push to GitHub

```bash
git init
git add .
git commit -m "Build Jules Paul landing page v1"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### 6. Enable GitHub Pages

GitHub repository:
1. Settings
2. Pages
3. Build and deployment
4. Source: Deploy from a branch
5. Branch: main
6. Folder: /root
7. Save

GitHub will generate a public URL.

### 7. QR Code

Use the final landing-page URL — not the YouTube URL — when generating the QR code.

Recommended:
- QRCode Monkey
- Download as SVG for print
- Test it on multiple phones before printing
- Leave white space around the QR code
- Add CTA text such as: **Scan to See How Jules Can Help**

## Version 2 Ideas
- Contact/intake form
- Service-specific forms
- Lead database
- Email notifications
- Booking system
- Analytics
- Admin dashboard
