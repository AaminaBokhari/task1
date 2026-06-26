# F — AI Content Studio

A responsive AI image and video generation UI built with Next.js, matching a provided design mockup. Includes a dummy generation API, dark mode, and a component-based architecture.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** JavaScript
- **Styling:** CSS Modules + Tailwind CSS v4
- **Images:** `next/image` for raster assets
- **Version control:** Git / GitHub

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build

```

## Project Structure

```
app/
  page.js              # Entry page
  layout.js            # Root layout, fonts, theme
  globals.css          # Design tokens, Tailwind, light/dark themes
  api/
    generate/route.js  # POST/GET — returns images or videos
    history/route.js   # GET — returns history thumbnails

components/
  Header/              # Logo, nav, theme toggle
  HistoryCarousel/     # Scrollable generation history
  Sidebar/             # Prompt, controls, generate
  ResultsGrid/         # Prompt card + image grid
  ImageCard/           # Image, video, or skeleton
  ...                  # Dropdown, Accordion, Logo, ThemeProvider

lib/
  data.js              # Shared prompts, image URLs, config
  theme.js             # Theme persistence helpers
```

## API

### `POST /api/generate`

```json
{
  "type": "image",
  "count": 8,
  "prompt": "A portrait...",
  "model": "Flux Pro"
}
```

Returns `{ prompt, model, type, items[] }` where each item is an image (`/generated/portrait-*.png`) or video (sample MP4 + poster).

### `GET /api/history`

Returns `{ items[] }` of landscape thumbnail URLs for the history bar.

## Responsiveness

| Breakpoint | Layout |
|------------|--------|
| 320px+ | Single column, 2-col image grid |
| 640px+ | Gallery/Support links, 3-col grid |
| 768px+ | Center nav with progress bar |
| 1024px+ | Sidebar + results row, 4-col grid, prompt column |
| 1280px+ | Wider sidebar and prompt column |
| 1440px max | Centered content container |

## Accessibility

- Semantic HTML (`header`, `nav`, `aside`, `section`, `article`)
- `aria-label`, `aria-selected`, `aria-expanded`, `aria-busy`
- Screen-reader labels on inputs
- Focus-visible rings on interactive elements
- Sufficient contrast in light and dark themes

## Design

- Warm off-white palette with salmon-orange accents
- CSS custom properties for theming
- Negative space via consistent padding and grid gaps
- History bar with contained horizontal scroll (no page overflow)
