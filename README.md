# TH Entertainment — design preview

Three standalone HTML landing pages: **01 Monolith**, **03 Grain**, **04 World Tour**. The liquid-glass switcher floats at the bottom of each standalone design. The root URL redirects `?design=grain` (or `monolith`, `world-tour`) to its template route; browser Back restores the prior design. Pages render directly without an iframe so browser element selection can access their DOM. On mobile the sound button sits above the dock, and opening the ticket dialog hides the dock.

## Vercel

Import this repository. Framework preset **Other**. Build command `npm run build`, output directory `public` (also configured in `vercel.json`). No environment variables required for hosting. The build copies only the three selected designs and their shared assets.

## Local preview

Run `npm run build`, then `python -m http.server 4173 --directory public`. Open `http://localhost:4173`.

## Review scope

Events, artist names, ticket prices and photos are illustrative. Ticket and contact interactions are UI demos; no purchases, submissions or email storage. The official Facebook link is supplied by the client. Images are inherited Unsplash illustrations; replace with approved TH assets before production. Fonts load from Google Fonts.

Motion includes Monolith title reveals, Grain blur reveals and analog grain, World Tour poster lighting, staggered content, image hover, desktop pointer movement, progress and smooth anchors. Visual sections add scroll parallax, a photographic vision scene, image-led capabilities, a full-width concert interlude and a Natural Earth geographic map showing the seven active markets. Six additional Unsplash concert photos are stored locally. `prefers-reduced-motion` disables animation. Sound starts only after the visitor presses SOUND; switching designs unloads the prior audio.

## Audio assets

`templates/audio/{01-monolith,03-grain,04-world-tour}.mp3`: five-second loopable soundscapes generated with ElevenLabs Sound Effects v2. Generate again using Node 20.6+: `node --env-file=.env scripts/generate-preview-audio.mjs`. API key stays in local `.env`; never needed by the browser or Vercel.

## After approval

Retain the approved template, move its contents to the site root, adjust relative shared asset paths, remove the switcher and unused concepts. Connect approved content, CMS and ticket checkout in the next phase.

## Color direction

The YG-inspired palette now varies by concept: Monolith uses vivid orange `#FF662E`, Grain warm orange `#FF8B38`, and World Tour vermilion `#EF4023`. Each has matching light text accents, dark accents on paper, a warm process section, a tinted geographic network section, and a solid accent artist-connection story. The preview switch matches the selected concept. Concert photography retains color. Display type uses `Archivo` / `Barlow Condensed`; body copy uses `Be Vietnam Pro` for Vietnamese support. Shared rules live in `templates/shared/color.css`.
