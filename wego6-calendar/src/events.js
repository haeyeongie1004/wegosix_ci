/*
  WEGO6 schedule data
  -------------------
  Add or edit events in this file. Dates use YYYY-MM-DD.
  Times are Malaysia Time (MYT, UTC+8), in 24-hour format.
  Use an empty string for time if it has not been announced.
  Replace or delete the demo events before publishing.

  Event shape:
  {
    id: "unique-id",
    date: "2026-10-20",
    time: "19:00",
    title: "Event title",
    category: "comeback", // comeback | live | appearance | birthday | preorder
    description: "A short description",
    notes: "Optional extra note",
    demo: false,
    links: {
      youtube: "https://www.youtube.com/...",
      preorder: "https://shop.example.com/...",
      official: "https://official-source.example/..."
    }
  }
*/
export const events = [
  {
    id: "demo-teaser",
    date: "2026-10-20",
    time: "18:00",
    title: "Sample teaser drop",
    category: "live",
    description: "Demo event to show how a video release appears in the calendar.",
    notes: "Replace this with a verified announcement and the direct video link.",
    demo: true,
    links: {
      youtube: "https://www.youtube.com/results?search_query=WEGO6",
      official: "https://x.com/search?q=WEGO6&src=typed_query"
    }
  },
  {
    id: "demo-preorder",
    date: "2026-10-23",
    time: "",
    title: "Sample preorder reminder",
    category: "preorder",
    description: "Demo reminder for an album preorder deadline.",
    notes: "Add the correct store URL and confirmed closing time when announced.",
    demo: true,
    links: {
      official: "https://x.com/search?q=WEGO6&src=typed_query"
    }
  },
  {
    id: "demo-live",
    date: "2026-10-27",
    time: "20:00",
    title: "Sample live schedule",
    category: "live",
    description: "Demo event for a livestream or new video.",
    notes: "Use the official livestream URL once it is available.",
    demo: true,
    links: {
      youtube: "https://www.youtube.com/results?search_query=WEGO6+live",
      official: "https://x.com/search?q=WEGO6&src=typed_query"
    }
  },
  {
    id: "demo-comeback",
    date: "2026-11-05",
    time: "",
    title: "Sample comeback date",
    category: "comeback",
    description: "Demo event to illustrate a comeback or release date.",
    notes: "This date is not confirmed. Replace it with an official date before publishing.",
    demo: true,
    links: {
      youtube: "https://www.youtube.com/results?search_query=WEGO6",
      official: "https://x.com/search?q=WEGO6&src=typed_query"
    }
  }
];
