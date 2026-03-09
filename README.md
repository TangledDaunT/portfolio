## Shreyansh Misra — Portfolio

This is my personal portfolio site, built as a single static page with custom animations and interaction effects inspired by ReactBits, but implemented in **vanilla HTML/CSS/JS**.

The goal is to showcase:
- **Production AI systems** (LegalLawAdvisor, Scheme Eligibility Checker)
- **IoT and computer vision work** (HomeSecuritySetup / IOT, AI Motion Detector)
- **Security and embedded experiments** (WiFi Deauth on ESP32)

The live site is hosted on **GitHub Pages** from this repository.

---

### Tech stack

- **Frontend**: HTML, CSS, vanilla JavaScript
- **Effects**:
  - Custom cursor, tilt, and magnetic buttons
  - WebGL particle background (OGL)
  - InfiniteMenu and CardSwap style components (ported from ReactBits to plain JS)
- **No framework / bundler**: everything is in `index.html`, `index.css`, and `main.js`.

---

### Local development

You can open the site directly in the browser, or serve it with a simple HTTP server so that all assets load correctly.

**Option 1 — Open directly**

Just open `index.html` in your browser:

1. Clone the repo  
   ```bash
   git clone https://github.com/TangledDaunT/portfolio_web.git
   cd portfolio_web
   ```
2. Double–click `index.html` or drag it into a browser window.

**Option 2 — Run a small local server (recommended)**

From the project root:

```bash
python -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

Any static server (Node, Python, VS Code Live Server, etc.) works — there is no backend.

---

### Project sections

- **Featured Projects**
  - **LegalLawAdvisor** — applied legal research tool backed by a vector database and an LLM explanation layer, built for real use by a High Court lawyer.
  - **Scheme Eligibility Checker** — deterministic rules first, LLM for explanations only; checks who is likely to qualify for government schemes.
  - **HomeSecuritySetup** — IOT/computer-vision playground built around the `IOT` repo, wiring together cameras, motion detection, and simple automations.
  - **AI Motion Detector** — a focused Python project that watches a camera feed and flags motion instead of recording everything.
  - **Mousepad Drawing** — a fun camera + trackpad based drawing experiment.
  - **WiFi Deauth (ESP32)** — an ESP32-based WiFi deauthentication tool with Bluetooth control, strictly for controlled, permissioned lab testing.

- **Systems Lab**
  - Direct links to the live deployments (LegalLawAdvisor, Scheme Eligibility Checker) and to this portfolio’s source.

---

### Deployment

The site is designed to be deployed on any static hosting provider:

- GitHub Pages  
- Netlify / Vercel (as a static export)  
- Any S3/static bucket or Nginx/Apache root

No build step is required — you just host the three main files:

- `index.html`
- `index.css`
- `main.js`

---

### License

If you are reading this in the context of my applications: you are welcome to look through the code for reference, but please do not copy it verbatim for your own public portfolio.

