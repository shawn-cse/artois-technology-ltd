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

## Internship Verification Links

### Shawn

https://www.artoistechnologyltd.com/verify/shawn-vfy-7q2m4x9c-81p6r3nk-5t0d2w8b-l4h7s1je/

### Addin

https://www.artoistechnologyltd.com/verify/addin-vfy-4n8k1z6q-73c5m2rt-9p0w4x7d-b6j3h8sf/

### Kollol Dey

https://www.artoistechnologyltd.com/verify/kallol-vfy-5p9d2w8x-31m7k4rb-8t0s6q1h-v4j8e2ld/

### Obaidul Hasan Shakib

https://www.artoistechnologyltd.com/verify/shakib-vfy-8k2n9m4r-52t6w1qb-7p0v3x8e-j4h8s2ld/

### Arafat Islam

https://www.artoistechnologyltd.com/verify/arafat-vfy-3b7k9w2t-61m5p8rc-4v0j2q9h-d8n3e7sl/

### Md Mahmudul Hasan

https://www.artoistechnologyltd.com/verify/mahmudul-vfy-6m2p9w4t-74n1k8rc-5v0j3q7h-e9s2b6ld/

> These verification pages are unlisted and excluded from normal website navigation and search indexing. Anyone who has the complete URL or QR code can still access them.

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
│   └── index.html
├── services/
│   └── index.html
├── process/
│   └── index.html
├── faq/
│   └── index.html
├── start-project/
│   └── index.html
├── verify/
│   ├── index.html
│   ├── shawn-vfy-7q2m4x9c-81p6r3nk-5t0d2w8b-l4h7s1je/
│   │   └── index.html
│   ├── addin-vfy-4n8k1z6q-73c5m2rt-9p0w4x7d-b6j3h8sf/
│   │   └── index.html
│   ├── kallol-vfy-5p9d2w8x-31m7k4rb-8t0s6q1h-v4j8e2ld/
│   │   └── index.html
│   ├── shakib-vfy-8k2n9m4r-52t6w1qb-7p0v3x8e-j4h8s2ld/
│   │   └── index.html
│   ├── arafat-vfy-3b7k9w2t-61m5p8rc-4v0j2q9h-d8n3e7sl/
│   │   └── index.html
│   └── mahmudul-vfy-6m2p9w4t-74n1k8rc-5v0j3q7h-e9s2b6ld/
│       └── index.html
└── assets/
    ├── css/
    ├── js/
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
