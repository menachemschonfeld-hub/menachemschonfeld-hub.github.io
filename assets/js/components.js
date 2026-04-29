/* ============================================
   SAFESIDE — SHARED COMPONENTS (Nav, Footer, Mobile Menu)
   Auto-injected into every page
   ============================================ */

(function() {
  // detect path depth to set correct relative paths
  const depth = (window.location.pathname.replace(/\/$/, '').split('/').filter(p => p && !p.endsWith('.html')).length);
  const root = depth === 0 ? './' : '../'.repeat(depth);

  const navHTML = `
<nav class="nav" id="nav">
  <div class="container">
    <div class="nav-inner">
      <a href="${root}index.html" class="nav-logo" aria-label="SafeSide Insurance Home">
        <img src="${root}assets/logo/safeside-logo.png" alt="SafeSide Insurance">
      </a>

      <div class="nav-menu">
        <div class="has-dropdown">
          <a href="${root}about/" class="nav-link">About</a>
          <div class="dropdown">
            <span class="dropdown-eyebrow">— About SafeSide</span>
            <div class="dropdown-list">
              <a href="${root}about/">Our Story</a>
              <a href="${root}about/leadership.html">Leadership Team</a>
              <a href="${root}about/producers.html">Our Producers</a>
              <a href="${root}about/values.html">Core Values</a>
              <a href="${root}about/press.html">Press &amp; Recognition</a>
              <a href="${root}about/careers.html">Careers</a>
            </div>
          </div>
        </div>

        <div class="has-dropdown">
          <a href="${root}personal/" class="nav-link">Personal</a>
          <div class="dropdown">
            <span class="dropdown-eyebrow">— Personal Insurance</span>
            <div class="dropdown-list">
              <a href="${root}personal/homeowners.html">Homeowners</a>
              <a href="${root}personal/flood.html">Flood Insurance</a>
              <a href="${root}personal/umbrella.html">Personal Umbrella</a>
              <a href="${root}personal/life.html">Life Insurance</a>
              <a href="${root}personal/valuables.html">Valuables &amp; Jewelry</a>
              <a href="${root}personal/private-client.html">Private Client</a>
            </div>
          </div>
        </div>

        <div class="has-dropdown">
          <a href="${root}commercial/" class="nav-link">Commercial</a>
          <div class="dropdown">
            <span class="dropdown-eyebrow">— Commercial Insurance</span>
            <div class="dropdown-list">
              <a href="${root}commercial/bop.html">Business Owners Policy</a>
              <a href="${root}commercial/property.html">Commercial Property</a>
              <a href="${root}commercial/general-liability.html">General Liability</a>
              <a href="${root}commercial/workers-comp.html">Workers' Compensation</a>
              <a href="${root}commercial/umbrella.html">Commercial Umbrella</a>
              <a href="${root}commercial/cyber.html">Cyber Liability</a>
              <a href="${root}commercial/d-and-o.html">Directors &amp; Officers</a>
              <a href="${root}commercial/professional-liability.html">Professional Liability (E&amp;O)</a>
              <a href="${root}commercial/disability.html">Disability</a>
              <a href="${root}commercial/bonds.html">Bonds</a>
            </div>
          </div>
        </div>

        <div class="has-dropdown">
          <a href="${root}industries/" class="nav-link">Industries</a>
          <div class="dropdown">
            <span class="dropdown-eyebrow">— Industries We Serve</span>
            <div class="dropdown-list">
              <a href="${root}industries/real-estate.html">Real Estate</a>
              <a href="${root}industries/contractors.html">Contractors &amp; Construction</a>
              <a href="${root}industries/restaurants.html">Restaurants &amp; Hospitality</a>
              <a href="${root}industries/healthcare.html">Healthcare</a>
              <a href="${root}industries/retail.html">Retail &amp; Wholesale</a>
              <a href="${root}industries/manufacturing.html">Manufacturing</a>
              <a href="${root}industries/nonprofits.html">Nonprofits</a>
              <a href="${root}industries/professional-services.html">Professional Services</a>
            </div>
          </div>
        </div>

        <div class="has-dropdown">
          <a href="${root}resources/" class="nav-link">Resources</a>
          <div class="dropdown">
            <span class="dropdown-eyebrow">— Resources</span>
            <div class="dropdown-list">
              <a href="${root}resources/blog.html">Blog &amp; Insights</a>
              <a href="${root}resources/glossary.html">Insurance Glossary</a>
              <a href="${root}resources/faq.html">FAQ</a>
              <a href="${root}resources/guides.html">Guides &amp; Downloads</a>
              <a href="${root}risk-management/">Risk Management</a>
              <a href="${root}commercial/carriers.html">Carriers We Represent</a>
            </div>
          </div>
        </div>

        <div class="has-dropdown">
          <a href="${root}client-center/" class="nav-link">Client Center</a>
          <div class="dropdown">
            <span class="dropdown-eyebrow">— Client Services</span>
            <div class="dropdown-list">
              <a href="${root}client-center/">Client Portal Login</a>
              <a href="${root}client-center/payment.html">Make a Payment</a>
              <a href="${root}client-center/claim.html">Submit a Claim</a>
              <a href="${root}client-center/coi.html">Request COI</a>
              <a href="${root}client-center/policy-change.html">Policy Change</a>
            </div>
          </div>
        </div>

        <a href="${root}contact/" class="nav-link">Contact</a>
      </div>

      <div class="nav-cta">
        <span class="nav-phone"><strong>(845) 364-0000</strong></span>
        <a href="${root}contact/quote.html" class="btn btn-primary" style="padding:12px 22px;font-size:13px;">Get a Quote <span class="arrow">→</span></a>
        <button class="nav-toggle" aria-label="Toggle menu"><span></span><span></span></button>
      </div>
    </div>
  </div>
</nav>

<aside class="mobile-menu" aria-hidden="true">
  <nav>
    <a href="${root}index.html">Home</a>
    <a href="${root}about/">About</a>
    <div class="sub-menu">
      <a href="${root}about/leadership.html">Leadership Team</a>
      <a href="${root}about/values.html">Core Values</a>
      <a href="${root}about/careers.html">Careers</a>
    </div>
    <a href="${root}personal/">Personal Insurance</a>
    <div class="sub-menu">
      <a href="${root}personal/homeowners.html">Homeowners</a>
      <a href="${root}personal/flood.html">Flood</a>
      <a href="${root}personal/umbrella.html">Umbrella</a>
      <a href="${root}personal/life.html">Life</a>
      <a href="${root}personal/private-client.html">Private Client</a>
    </div>
    <a href="${root}commercial/">Commercial Insurance</a>
    <div class="sub-menu">
      <a href="${root}commercial/bop.html">BOP</a>
      <a href="${root}commercial/property.html">Property</a>
      <a href="${root}commercial/workers-comp.html">Workers' Comp</a>
      <a href="${root}commercial/cyber.html">Cyber</a>
      <a href="${root}commercial/d-and-o.html">D&amp;O</a>
    </div>
    <a href="${root}industries/">Industries</a>
    <a href="${root}resources/blog.html">Blog</a>
    <a href="${root}client-center/">Client Center</a>
    <a href="${root}contact/">Contact</a>
    <a href="${root}contact/quote.html" class="btn btn-gold" style="margin-top:24px;">Get a Quote →</a>
  </nav>
</aside>
`;

  const footerHTML = `
<section class="cta-strip" id="ready">
  <div class="container fade-up">
    <span class="eyebrow">— Get Started</span>
    <h2>Ready to feel <em>safe</em>?</h2>
    <p>Get a free, no-obligation quote in under 60 seconds. Or speak directly with a SafeSide advisor — we're here, and we actually pick up the phone.</p>
    <div class="cta-buttons">
      <a href="${root}contact/quote.html" class="btn btn-gold">Start My Quote <span class="arrow">→</span></a>
      <a href="tel:8453640000" class="btn btn-ghost-light">Call (845) 364-0000</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="${root}assets/logo/safeside-logo.png" alt="SafeSide Insurance">
        <p>Independent. Family-owned. Built on trust, backed by experience. Protecting families and businesses across NY, NJ, and beyond since 2007.</p>
        <div class="footer-contact">
          <a href="https://maps.google.com/?q=324+North+Main+Street+Spring+Valley+NY+10977">324 North Main Street<br>Spring Valley, NY 10977</a>
          <a href="tel:8453640000">(845) 364-0000</a>
          <a href="mailto:info@safesideins.com">info@safesideins.com</a>
        </div>
      </div>

      <div>
        <h4>Insurance</h4>
        <div class="footer-list">
          <a href="${root}personal/">Personal</a>
          <a href="${root}commercial/">Commercial</a>
          <a href="${root}industries/">Industries</a>
          <a href="${root}commercial/carriers.html">Carriers</a>
          <a href="${root}risk-management/">Risk Management</a>
        </div>
      </div>

      <div>
        <h4>Company</h4>
        <div class="footer-list">
          <a href="${root}about/">About Us</a>
          <a href="${root}about/leadership.html">Leadership</a>
          <a href="${root}about/values.html">Core Values</a>
          <a href="${root}about/press.html">Press</a>
          <a href="${root}about/careers.html">Careers</a>
        </div>
      </div>

      <div>
        <h4>Client Center</h4>
        <div class="footer-list">
          <a href="${root}client-center/">Client Portal</a>
          <a href="${root}client-center/payment.html">Make Payment</a>
          <a href="${root}client-center/claim.html">Submit Claim</a>
          <a href="${root}client-center/coi.html">Request COI</a>
          <a href="${root}client-center/policy-change.html">Policy Change</a>
        </div>
      </div>

      <div>
        <h4>Connect</h4>
        <div class="footer-list">
          <a href="${root}contact/">Contact</a>
          <a href="${root}contact/quote.html">Get a Quote</a>
          <a href="${root}resources/blog.html">Blog</a>
          <a href="${root}resources/faq.html">FAQ</a>
          <a href="${root}resources/glossary.html">Glossary</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        © <span data-year></span> SafeSide Insurance. All rights reserved. ·
        <a href="${root}legal/privacy.html">Privacy</a> ·
        <a href="${root}legal/terms.html">Terms</a> ·
        <a href="${root}legal/accessibility.html">Accessibility</a>
      </div>
      <div class="social">
        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
        <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg></a>
        <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
      </div>
    </div>
  </div>
</footer>

<div class="float-actions">
  <a href="tel:8453640000">📞 Call</a>
  <a href="${root}contact/quote.html" class="primary">Get Quote</a>
  <a href="${root}contact/">Contact</a>
</div>
`;

  // inject before any other script tag
  const navMount = document.getElementById('nav-mount');
  const footerMount = document.getElementById('footer-mount');

  if (navMount) {
    navMount.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }
  if (footerMount) {
    footerMount.outerHTML = footerHTML;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHTML);
  }
})();
