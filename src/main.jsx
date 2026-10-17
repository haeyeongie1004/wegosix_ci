import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, CalendarDays, ChevronDown, ExternalLink,
  Heart, Link2, Music2, Sparkles, Star, X, Youtube, ShoppingBag, Info
} from "lucide-react";
import { events } from "./events.js";
import "./styles.css";

const CATEGORIES = [
  { id: "all", label: "All events" },
  { id: "comeback", label: "Comeback" },
  { id: "live", label: "Live / video" },
  { id: "appearance", label: "Appearance" },
  { id: "birthday", label: "Birthday" },
  { id: "preorder", label: "Preorder" },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getMonthCells(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
}

function formatMYT(date, time) {
  if (!time) return "Time TBA";
  // Times in events.js are already authored as Malaysia local time.
  return `${time} MYT (UTC+8)`;
}

function eventHasLink(event, type) {
  return Boolean(event.links?.[type]);
}

function App() {
  const today = new Date();
  const [shownMonth, setShownMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(dateKey(today));
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileListView, setMobileListView] = useState(false);

  const filteredEvents = useMemo(() => events.filter((event) =>
    activeCategory === "all" || event.category === activeCategory
  ), [activeCategory]);

  const eventMap = useMemo(() => {
    const map = {};
    filteredEvents.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });
    return map;
  }, [filteredEvents]);

  const cells = getMonthCells(shownMonth.getFullYear(), shownMonth.getMonth());
  const selectedEvents = eventMap[selectedDate] || [];
  const monthLabel = `${MONTHS[shownMonth.getMonth()]} ${shownMonth.getFullYear()}`;

  function moveMonth(delta) {
    const next = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + delta, 1);
    setShownMonth(next);
    setSelectedDate(dateKey(next));
  }

  function goToday() {
    const now = new Date();
    setShownMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(dateKey(now));
  }

  return (
    <div className="site-shell">
      <div className="sparkle sparkle-one">✦</div>
      <div className="sparkle sparkle-two">♡</div>
      <header className="topbar">
        <a className="brand" href="#" aria-label="WEGO6 Schedule home">
          <span className="brand-mark"><Heart size={19} fill="currentColor" /></span>
          <span>WEGO6 <b>SCHEDULE</b></span>
        </a>
        <div className="topbar-note"><span className="live-dot" /> FAN-MADE SCHEDULE HUB</div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={14} /> YOUR LITTLE CORNER OF WEGO6</div>
            <h1>Stay close to<br /><span>every moment.</span> <span className="hero-heart">♡</span></h1>
            <p className="hero-description">
              Comebacks, videos, lives and everything in between — all in one cute little calendar.
            </p>
            <div className="hero-pills">
              <span><Star size={13} fill="currentColor" /> made for fans</span>
              <span><span className="timezone-dot" /> Malaysia time · MYT</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative pastel stars and hearts">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="hero-moon">☾</div>
            <div className="hero-sticker sticker-star">✦</div>
            <div className="hero-sticker sticker-heart">♡</div>
            <div className="hero-card">
              <div className="mini-card-top"><span>YOUR FAN CALENDAR</span><Heart size={15} fill="currentColor" /></div>
              <div className="mini-date">♡</div>
              <div className="mini-card-title">good things<br />are coming</div>
              <div className="mini-dots"><i></i><i></i><i></i><i></i><i></i></div>
            </div>
          </div>
        </section>

        <section className="calendar-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><CalendarDays size={14} /> THE FAN PLANNER</div>
              <h2>Schedule calendar <span>♡</span></h2>
              <p>Tap a date or event to see details and links.</p>
            </div>
            <div className="view-toggle">
              <button className={!mobileListView ? "toggle-active" : ""} onClick={() => setMobileListView(false)}>Calendar</button>
              <button className={mobileListView ? "toggle-active" : ""} onClick={() => setMobileListView(true)}>Agenda</button>
            </div>
          </div>

          <div className="category-row" aria-label="Filter events by category">
            {CATEGORIES.map((category) => (
              <button key={category.id}
                className={`category-chip ${activeCategory === category.id ? "chip-active" : ""}`}
                onClick={() => setActiveCategory(category.id)}>
                {category.label}
              </button>
            ))}
          </div>

          <div className={`planner-grid ${mobileListView ? "agenda-mode" : ""}`}>
            <section className="calendar-card">
              <div className="calendar-toolbar">
                <div>
                  <h3>{monthLabel}</h3>
                  <p><span className="tiny-heart">♥</span> All times shown in Malaysia Time (MYT)</p>
                </div>
                <div className="month-controls">
                  <button className="today-button" onClick={goToday}>Today</button>
                  <button className="icon-button" onClick={() => moveMonth(-1)} aria-label="Previous month"><ArrowLeft size={17} /></button>
                  <button className="icon-button" onClick={() => moveMonth(1)} aria-label="Next month"><ArrowRight size={17} /></button>
                </div>
              </div>
              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) =>
                  <div className="weekday" key={day}>{day}</div>
                )}
                {cells.map((date) => {
                  const key = dateKey(date);
                  const sameMonth = date.getMonth() === shownMonth.getMonth();
                  const isToday = key === dateKey(today);
                  const isSelected = key === selectedDate;
                  const dayEvents = eventMap[key] || [];
                  return (
                    <button key={key}
                      className={`day-cell ${sameMonth ? "" : "other-month"} ${isToday ? "is-today" : ""} ${isSelected ? "is-selected" : ""}`}
                      onClick={() => { setSelectedDate(key); setMobileListView(false); }}
                      aria-label={`${MONTHS[date.getMonth()]} ${date.getDate()}, ${dayEvents.length} events`}>
                      <span className="day-number">{date.getDate()}</span>
                      {dayEvents.length > 0 && <span className="day-event-dots">
                        {dayEvents.slice(0, 3).map((event) => <i key={event.id} className={`dot-${event.category}`} />)}
                      </span>}
                      {dayEvents.slice(0, 2).map((event) => (
                        <span key={event.id} className={`calendar-event event-${event.category}`}>
                          <span>{event.title}</span>
                        </span>
                      ))}
                      {dayEvents.length > 2 && <span className="more-events">+{dayEvents.length - 2} more</span>}
                    </button>
                  );
                })}
              </div>
              <div className="calendar-legend">
                <span><i className="dot-comeback"></i> Comeback</span>
                <span><i className="dot-live"></i> Live / video</span>
                <span><i className="dot-appearance"></i> Appearance</span>
                <span><i className="dot-preorder"></i> Preorder</span>
              </div>
            </section>

            <aside className="day-panel">
              <div className="day-panel-head">
                <div>
                  <div className="eyebrow">YOUR SELECTED DAY</div>
                  <h3>{new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-MY", { day: "numeric", month: "long" })}</h3>
                  <p>{new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-MY", { weekday: "long", year: "numeric" })}</p>
                </div>
                <div className="date-heart"><Heart size={20} fill="currentColor" /></div>
              </div>
              {selectedEvents.length ? (
                <div className="event-list">
                  {selectedEvents.map((event) => <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />)}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-illustration"><CalendarDays size={28} /><span>♡</span></div>
                  <h4>No schedule here yet</h4>
                  <p>A little breathing room. Add a verified event to <code>src/events.js</code> whenever there's news.</p>
                  <button className="text-button" onClick={() => setActiveCategory("all")}>Show all event types <ArrowRight size={14} /></button>
                </div>
              )}
              <div className="quick-note">
                <Sparkles size={16} />
                <p><b>Fan tip</b><br />Always double-check the official source in case a schedule changes.</p>
              </div>
            </aside>
          </div>

          {mobileListView && (
            <section className="agenda-list">
              <div className="agenda-title"><h3>Upcoming schedule</h3><span>{filteredEvents.length} sample events</span></div>
              {filteredEvents.slice().sort((a,b) => a.date.localeCompare(b.date)).map((event) =>
                <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
              )}
              {!filteredEvents.length && <p className="agenda-empty">No events in this category yet. Add them in <code>src/events.js</code>.</p>}
            </section>
          )}
        </section>

        <section className="links-section">
          <div className="links-intro">
            <div className="eyebrow"><Link2 size={14} /> KEEP IT ALL CONNECTED</div>
            <h2>One tap away <span>✧</span></h2>
            <p>Every event can link to its original home on the web.</p>
          </div>
          <div className="link-feature-grid">
            <LinkFeature icon={<Youtube size={21} />} title="Watch" description="Music videos, teasers & lives" color="pink" />
            <LinkFeature icon={<ShoppingBag size={21} />} title="Preorder" description="Album shops & official stores" color="purple" />
            <LinkFeature icon={<Info size={21} />} title="Official source" description="Announcements & schedule updates" color="blue" />
          </div>
        </section>

        <footer className="footer">
          <div className="footer-logo"><Heart size={15} fill="currentColor" /> WEGO6 SCHEDULE</div>
          <p>Fan-made project, not affiliated with WEGO6 or their management.</p>
          <p className="footer-sparkles">✧ made with love & a little stardust ✧</p>
        </footer>
      </main>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
    </div>
  );
}

function EventCard({ event, onClick }) {
  const date = new Date(`${event.date}T12:00:00`);
  return (
    <button className="event-card" onClick={onClick}>
      <span className={`event-icon icon-${event.category}`}>
        {event.category === "live" ? <Youtube size={17} /> :
         event.category === "preorder" ? <ShoppingBag size={17} /> :
         event.category === "birthday" ? <Heart size={17} /> :
         event.category === "appearance" ? <Star size={17} /> : <Music2 size={17} />}
      </span>
      <span className="event-card-copy">
        <span className="event-card-date">{date.toLocaleDateString("en-MY", { weekday: "short", day: "numeric", month: "short" })} · {formatMYT(date, event.time)}</span>
        <strong>{event.title}</strong>
        <span className="event-card-sub">{event.description}</span>
      </span>
      <ArrowRight size={16} className="event-arrow" />
    </button>
  );
}

function LinkFeature({ icon, title, description, color }) {
  return <div className={`link-feature link-${color}`}>
    <div className="link-feature-icon">{icon}</div>
    <div><strong>{title}</strong><p>{description}</p></div>
    <ExternalLink size={15} className="link-feature-arrow" />
  </div>;
}

function EventModal({ event, onClose }) {
  const date = new Date(`${event.date}T12:00:00`);
  const links = [
    { key: "youtube", label: "Watch on YouTube", icon: <Youtube size={17} />, className: "youtube-link" },
    { key: "preorder", label: "Preorder / shop", icon: <ShoppingBag size={17} />, className: "shop-link" },
    { key: "official", label: "Official source", icon: <ExternalLink size={17} />, className: "official-link" },
  ].filter((link) => eventHasLink(event, link.key));

  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
    <section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button className="modal-close" onClick={onClose} aria-label="Close event details"><X size={19} /></button>
      <div className={`modal-icon icon-${event.category}`}><Sparkles size={21} /></div>
      <div className="modal-eyebrow">{event.demo ? "DEMO EVENT · REPLACE BEFORE PUBLISHING" : event.category.toUpperCase()}</div>
      <h2 id="modal-title">{event.title}</h2>
      <div className="modal-date"><CalendarDays size={16} /> {date.toLocaleDateString("en-MY", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</div>
      <div className="modal-time">{event.time ? `${event.time} MYT (UTC+8)` : "Time to be announced"}</div>
      <p className="modal-description">{event.description}</p>
      {event.notes && <div className="modal-notes"><Heart size={15} /> {event.notes}</div>}
      {links.length > 0 ? <div className="modal-links">
        {links.map((link) => <a key={link.key} href={event.links[link.key]} target="_blank" rel="noreferrer" className={`modal-link ${link.className}`}>
          {link.icon}<span>{link.label}</span><ExternalLink size={14} className="external-small" />
        </a>)}
      </div> : <div className="no-links-note">No links added yet — add them in <code>src/events.js</code>.</div>}
      {event.demo && <p className="demo-warning"><Info size={14} /> This is placeholder content for testing the calendar, not a confirmed WEGO6 schedule.</p>}
      <button className="modal-done" onClick={onClose}>Got it ♡</button>
    </section>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
