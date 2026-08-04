# Artois Technology Limited — Static GitHub Pages Website

This package is configured for the official custom domain:

```text
https://www.artoistechnologyltd.com/
```

It is a fully static HTML, CSS and JavaScript website. No Node.js, PHP, database or build command is required.

## Upload structure

Extract the ZIP file and upload the contents directly to the repository root:

```text
index.html
about.html
services.html
process.html
faq.html
start-project.html
404.html
CNAME
.nojekyll
robots.txt
sitemap.xml
assets/
verify/
```

Do not upload only the ZIP file, and do not place these files inside another folder in the repository.

## GitHub Pages settings

1. Open the repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/(root)` folder.
5. Save the settings.
6. In **Custom domain**, enter `www.artoistechnologyltd.com`.
7. Configure the domain's DNS records for GitHub Pages at the domain registrar.
8. Enable **Enforce HTTPS** after GitHub finishes verifying the DNS configuration.

The included `CNAME` file contains:

```text
www.artoistechnologyltd.com
```

Use `https://www.artoistechnologyltd.com/` as the primary public address. Configure the apex domain `artoistechnologyltd.com` to redirect to the `www` address through your DNS provider or GitHub Pages configuration.

## Verification URLs

Shawn:

```text
https://www.artoistechnologyltd.com/verify/shawn-vfy-7q2m4x9c-81p6r3nk-5t0d2w8b-l4h7s1je/
```

Addin:

```text
https://www.artoistechnologyltd.com/verify/addin-vfy-4n8k1z6q-73c5m2rt-9p0w4x7d-b6j3h8sf/
```

The verification pages are unlisted and include `noindex` directives, but they are not password-protected. Anyone with an exact URL or its QR code can open the corresponding page.
