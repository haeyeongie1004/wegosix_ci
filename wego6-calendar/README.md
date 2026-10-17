# WEGO6 Schedule ♡

A pastel lavender, responsive fan-made idol schedule calendar built with React + Vite. Designed for static hosting on Netlify.

## Included

- Clickable monthly calendar with previous/next month and Today controls
- Agenda view
- Category filters
- Event detail modal
- Direct YouTube, preorder/shop, and official-source links per event
- Malaysia Time (MYT, UTC+8) labels
- Event data stored manually in `src/events.js`
- Responsive layout for desktop and mobile

## Important: demo events

The initial entries in `src/events.js` are **placeholders for testing the interface**. They are not confirmed WEGO6 events. Replace or delete them and verify all dates and URLs before publishing.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

To test a production build:

```bash
npm run build
npm run preview
```

## Add or edit an event

Open `src/events.js` and add an object to the `events` array:

```js
{
  id: "unique-event-id",
  date: "2026-11-12",
  time: "19:00", // Malaysia time, 24-hour format; use "" if TBA
  title: "Official event title",
  category: "live", // comeback | live | appearance | birthday | preorder
  description: "Short event details.",
  notes: "Optional note for yourself or fans.",
  demo: false,
  links: {
    youtube: "https://www.youtube.com/watch?v=...",
    preorder: "https://actual-store.example/...",
    official: "https://actual-announcement.example/..."
  }
}
```

Only include the links that exist. Supported link keys are `youtube`, `preorder`, and `official`. Dates use `YYYY-MM-DD`. Time strings are displayed as Malaysia Time (MYT, UTC+8); enter the converted MYT time if an announcement uses another timezone.

### Categories and colors

- `comeback` — lavender
- `live` — pink
- `appearance` — blue
- `birthday` — warm yellow
- `preorder` — mint

## Deploy on Netlify

1. Create a GitHub repository and upload this project folder.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Connect the repository.
4. Set **Build command** to `npm run build`.
5. Set **Publish directory** to `dist`.
6. Deploy.

For a quick manual deploy, run `npm install` and `npm run build`, then upload the generated `dist` folder using Netlify's manual deploy interface.

## Notes

- This is a frontend-only site: events are stored in the source data file, not a live database.
- Editing `src/events.js` requires rebuilding and redeploying the site.
- The external links open in a new tab.
- This is an unofficial fan-made project and is not affiliated with WEGO6 or their management.
