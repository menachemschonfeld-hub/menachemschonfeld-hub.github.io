# SafeSide Insurance — Website

A static, GitHub Pages-ready website for SafeSide Insurance — a family-owned independent insurance brokerage based in Spring Valley, New York.

## Stack

- Pure HTML/CSS/JS — no build tools, no framework, no Node.js dependencies
- Google Fonts: Fraunces (display) + Inter Tight (body/UI)
- Schema.org structured data (InsuranceAgency)
- Multi-step quote form ready for n8n webhook integration
- Stock imagery served from Unsplash CDN — easily swappable

## Structure

```
safeside/
├── index.html                    # Homepage
├── carriers.html                 # Carriers list page
├── sitemap.xml
├── robots.txt
├── README.md
├── assets/
│   ├── css/main.css              # Full design system
│   ├── js/main.js                # Form handling, animations, FAQ
│   ├── js/components.js          # Auto-injects nav + footer
│   ├── images/                   # (currently empty - using Unsplash CDN)
│   └── logo/safeside-logo.png
├── about/
│   ├── index.html                # About / Our Story
│   ├── leadership.html
│   ├── producers.html
│   ├── values.html
│   ├── press.html
│   └── careers.html
├── personal/
│   ├── index.html                # Personal lines hub
│   ├── homeowners.html
│   ├── flood.html
│   ├── umbrella.html
│   ├── life.html
│   ├── valuables.html
│   └── private-client.html
├── commercial/
│   ├── index.html                # Commercial lines hub
│   ├── bop.html
│   ├── property.html
│   ├── general-liability.html
│   ├── workers-comp.html
│   ├── umbrella.html
│   ├── cyber.html
│   ├── d-and-o.html
│   ├── professional-liability.html
│   ├── disability.html
│   └── bonds.html
├── industries/
│   ├── index.html                # Industries hub
│   ├── real-estate.html
│   ├── contractors.html
│   ├── restaurants.html
│   ├── healthcare.html
│   ├── retail.html
│   ├── manufacturing.html
│   ├── nonprofits.html
│   └── professional-services.html
├── risk-management/
│   ├── index.html
│   ├── risk-assessment.html
│   ├── claims-advocacy.html
│   ├── safety-programs.html
│   └── coverage-audits.html
├── resources/
│   ├── index.html
│   ├── blog.html
│   ├── glossary.html
│   ├── faq.html
│   └── guides.html
├── client-center/
│   ├── index.html
│   ├── payment.html
│   ├── claim.html
│   ├── coi.html
│   └── policy-change.html
├── contact/
│   ├── index.html
│   ├── quote.html                # Multi-step quote form
│   └── locations.html
└── legal/
    ├── privacy.html
    ├── terms.html
    └── accessibility.html
```

## Deployment to GitHub Pages

1. Create a new GitHub repository (e.g., `safeside-website`)
2. Push the entire contents of this folder to the repository root
3. Go to repository **Settings** → **Pages**
4. Under "Build and deployment", set Source to **Deploy from a branch**
5. Select branch: `main`, folder: `/ (root)`
6. Click Save. The site will publish to `https://[username].github.io/safeside-website/`
7. To use a custom domain (`safesideins.com`):
   - Add a `CNAME` file at the repository root containing: `safesideins.com`
   - In Settings → Pages → Custom domain, enter `safesideins.com`
   - Configure DNS at your registrar:
     - `A` records pointing apex → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     - `CNAME` for `www` → `[username].github.io`
   - Enable "Enforce HTTPS" once the certificate is issued

## Connecting Forms to n8n

All forms (quote, contact, claim, COI, policy change) submit to webhook endpoints defined in `assets/js/main.js`:

```javascript
const N8N_ENDPOINTS = {
  quote: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-quote',
  contact: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-contact',
  claim: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-claim',
  coi: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-coi',
  policyChange: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-policy-change',
  newsletter: 'https://YOUR-N8N-INSTANCE.com/webhook/safeside-newsletter'
};
```

Replace each placeholder with your actual n8n webhook URL. Forms post JSON via `fetch()`. Each n8n workflow should:

1. Receive the form payload
2. Send confirmation email to the client
3. Send notification email to `info@safesideins.com` (or designated producer)
4. Optionally: create a CRM record, Slack notification, or task in your agency-management system

While endpoints are still placeholders, forms log to console and show a success message — you can test the UI without n8n connected.

## Updating Content

### Adding a blog post
Edit `resources/blog.html` and add a new `<a class="blog-list-card">` block. For full posts, create individual files like `resources/blog/post-title.html` using the `prose-page` layout from `legal/privacy.html` as a template.

### Adding a team member
Edit `about/leadership.html` or `about/producers.html` — copy an existing `team-card` block.

### Updating a product page
Each product page is a separate `.html` file under `personal/`, `commercial/`, or `industries/`. Edit directly. Pages share styling via `assets/css/main.css`.

### Replacing stock photos
All Unsplash URLs are inline (search for `unsplash.com` in the codebase). To use your own photos, drop them into `assets/images/` and replace the URLs.

### Logo
The logo is at `assets/logo/safeside-logo.png`. Replace with an SVG or higher-resolution version when ready.

## Browser Support

- Modern Chrome, Firefox, Safari, Edge (last 2 versions)
- Mobile Safari and Chrome on iOS/Android
- Graceful degradation: animations and JavaScript-driven UI degrade cleanly without JS

## Performance Targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- Total page weight: < 200KB excluding images
- First Contentful Paint: < 1.5s on 4G

## Contact

Site by SafeSide Insurance. For technical questions about the codebase, contact your developer.

---

**Important:** Before going live, replace all `YOUR-N8N-INSTANCE.com` URLs in `assets/js/main.js`, verify all carrier billing portal links in `client-center/payment.html`, and confirm the office address, phone, hours, and license details on `contact/locations.html` and `legal/terms.html`.
