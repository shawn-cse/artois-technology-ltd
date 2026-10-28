# Artois Technology Limited — Official Website

A fully static, responsive, multi-page corporate website for **Artois Technology Limited**. The website is prepared for free hosting with **GitHub Pages** and uses the official custom domain.

## Live Website

**https://www.artoistechnologyltd.com/**

## Main Pages

- Home: https://www.artoistechnologyltd.com/
- About: https://www.artoistechnologyltd.com/about/
- Services: https://www.artoistechnologyltd.com/services/
- Process: https://www.artoistechnologyltd.com/process/
- FAQ: https://www.artoistechnologyltd.com/faq/
- Careers: https://www.artoistechnologyltd.com/careers/
- Employee Directory: https://www.artoistechnologyltd.com/emp/
- Payment: https://www.artoistechnologyltd.com/payment/

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages
- No database
- No backend
- No framework dependency

## Project Structure

```text
.
├── index.html
├── 404.html
├── CNAME
├── .nojekyll
├── robots.txt
├── sitemap.xml
├── README.md
├── about/
│   ├── index.html
│   └── about.css
├── services/
│   ├── index.html
│   └── services.css
├── process/
│   ├── index.html
│   └── process.css
├── careers/
│   ├── index.html
│   ├── careers.css
│   └── careers.js
├── carrier/
│   └── index.html
├── payment/
│   ├── index.html
│   ├── payment.css
│   └── payment.js
├── faq/
│   ├── index.html
│   ├── faq.css
│   └── faq.js
├── start-project/
│   └── index.html
├── verify/
│   ├── README.md
│   ├── index.html
│   ├── [employee-verification-slug]/
│   │   └── index.html
│   └── ...
└── assets/
    ├── css/
    │   ├── main.css
    │   └── verify.css
    ├── js/
    │   └── main.js
    └── img/
```

## GitHub Pages Deployment

1. Extract the project ZIP file.
2. Upload all files and folders directly to the repository root.
3. Do not upload only the ZIP file.
4. Open the repository **Settings**.
5. Go to **Pages**.
6. Select **Deploy from a branch**.
7. Select branch **main** and folder **/(root)**.
8. Save the settings.
9. Set the custom domain to:

```text
www.artoistechnologyltd.com
```

10. Enable **Enforce HTTPS** after the DNS check succeeds.

## Custom Domain Configuration

The root `CNAME` file contains:

```text
www.artoistechnologyltd.com
```

The DNS `www` record should point to:

```text
iamsohan100.github.io
```

## Clean URLs

Each public page is stored inside its own folder as `index.html`. This keeps the public URLs clean:

```text
/services/
/about/
/process/
/faq/
/start-project/
```

instead of:

```text
/services.html
/about.html
```

## Important Files

- `CNAME` — connects the custom domain to GitHub Pages.
- `.nojekyll` — publishes the static files without Jekyll processing.
- `robots.txt` — provides crawler instructions.
- `sitemap.xml` — lists the public website pages for search engines.
- `404.html` — displays the custom not-found page.

## Updating the Website

Edit the relevant `index.html` file inside each page folder. Shared design files are located in:

```text
assets/css/main.css
assets/js/main.js
```

Verification-page styling is located in:

```text
assets/css/verify.css
```

## Copyright

© 2026 Artois Technology Limited. All rights reserved.
