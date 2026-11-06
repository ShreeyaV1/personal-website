# Shreeya Vadlamannati — personal website

My personal site: a floral, interactive portfolio with a blooming intro, a "bloom board" keyboard hero, my projects (QuBench, Face Control, Pirate Den 3D and more), a mental-maths game and a journal.

Plain HTML, CSS and JavaScript, with no build step.

## Run it locally

```bash
python3 -m http.server 5173
```

Then open http://localhost:5173.

## Files

- `index.html` — page structure
- `style.css` — styles
- `script.js` — intro, interactions, projects, game and journal
- `assets/` — images (Pirate Den render)

The journal's posting feature uses the claude.ai artifact database, so it only works on the published claude.ai version. Everywhere else the journal shows as empty.
