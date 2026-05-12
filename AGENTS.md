# AGENTS.md

## Project Stack

- Static landing page for a fitness course.
- Use only HTML, CSS, and vanilla JavaScript.
- Do not add React, Next.js, backend code, databases, authorization, build tools, package managers, or bundlers.

## Project Structure

- `index.html` — main landing page.
- `assets/css/style.css` — base CSS only.
- `assets/js/main.js` — safe vanilla JavaScript entry point.
- `assets/img/hero/` — future hero images.
- `assets/img/proof/` — future before / after proof images.
- `assets/img/tariffs/` — future tariff images.
- `assets/img/icons/` — future icons.
- `assets/docs/` — future legal documents and public files.
- `README.md` — simple project overview.
- `PROJECT_RULES.md` — brand, content, legal, and product rules.

## Safety Rules

- Do not store passwords, tokens, API keys, secrets, or personal data in this project.
- Do not implement custom lead forms, databases, localStorage, cookies, or API integrations for personal data. Lead capture and payment flow must be handled by official GetCourse widgets/forms unless explicitly approved later.
- Do not add analytics, tracking scripts, cookies, external API requests, or third-party embeds without explicit approval.
- Do not delete, rename, move, or overwrite existing files without separate confirmation.
- Before editing any existing file, read it first and preserve user changes.

## Working Rules

- Keep the structure simple and beginner-friendly.
- Prefer clear semantic HTML and readable file names.
- Keep CSS minimal until the design phase starts.
- Keep JavaScript minimal and avoid side effects.
- Use temporary `href="#"` links for future GetCourse actions until real integration is approved.
- Before making content, structure, brand, tariff, legal footer, Telegram support, or GetCourse-related changes, read PROJECT_RULES.md and follow it.
- After each change, summarize which files were changed and what was changed.

## Testing

- Open `index.html` directly in a browser to verify the static page loads.
- Check that links to `assets/css/style.css` and `assets/js/main.js` are correct.
- Check that section navigation points to existing ids.
- Check that no forms, personal-data storage, cookies, localStorage, API requests, backend code, or build tools were added.

