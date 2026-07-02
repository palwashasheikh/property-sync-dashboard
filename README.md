# Property Sync Dashboard

React-based frontend for viewing real estate listings aggregated from multiple UAE platforms. Displays sync statistics, browse filtered listings, view detected duplicates, and monitor ingestion activity in real-time.

**Connects to:** Property Listing Sync Service backend (see main repo for backend code).

---

![alt text](<Screenshot (9)-1.png>) ![alt text](<Screenshot (6)-1.png>) ![alt text](<Screenshot (7)-1.png>) ![alt text](<Screenshot (8)-1.png>)


## Quick Start

```bash
# Install
npm install

# Start dev server (runs on localhost:5173)
npm run dev
```

Open `http://localhost:5173` in browser.

---

## Features

### 1. Dashboard Overview
- **Total listings** across all platforms
- **Unique vs. duplicate** counts
- **Breakdown by listing type** (sale/rent)
- **Source breakdown** (Bayut, Property Finder, Dubizzle)
- **Last sync time** and total sync runs

### 2. Listings Table
- Browse all normalized listings
- **Filter by:**
  - City (e.g., Dubai, Abu Dhabi)
  - Type (sale or rent)
  - Property type (apartment, villa, office)
- **Sort by:** Price, area, sync date
- **Pagination:** Browse large result sets
- Shows price in millions AED, area in sqft, bedroom count, source

### 3. Duplicates Section
- View all **cross-platform duplicates** detected
- Shows duplicate listing + original listing side-by-side
- Confidence score for each match (0-100%)
- Matched fields displayed (which fields triggered the duplicate detection)
- Highlights which listing is kept as the original

### 4. Sync History
- View every ingestion run from each source
- Status: Success / Failed
- Counts: Fetched, Inserted, Updated, Duplicates
- Timestamp of each run
- Error messages if sync failed

---

## Architecture

```
┌─────────────────────────────────────┐
│   Vercel CDN / Static Hosting       │
│   (Deployed React app)              │
└────────────┬────────────────────────┘
             │ HTTPS Requests
             ▼
┌─────────────────────────────────────┐
│   Backend API (ngrok / Render)      │
│   http://localhost:3000/api         │
│   or https://xxx.ngrok.io/api       │
└─────────────────────────────────────┘
             │
┌────────────▼────────────────────────┐
│   PostgreSQL Database (cloud)       │
│   - Listings                        │
│   - Sync logs                       │
│   - Duplicate pairs                 │
└─────────────────────────────────────┘
```

---

## Setup

### Prerequisites
- Node.js 16+
- Backend service running (either locally or via ngrok)

### 1. Install Dependencies

```bash
npm install
```

Installs:
- `react` — UI framework
- `vite` — Build tool
- `axios` — HTTP client
- `tailwindcss` — Styling
- `lucide-react` — Icons

### 2. Configure Backend URL

Edit `src/services/api.js`:

**For local development:**
```javascript
const API_BASE = 'http://localhost:3000/api';
```

**For production (using ngrok):**
```javascript
const API_BASE = 'https://urology-donut-aim.ngrok-free.dev/api';
```

**For production (deployed backend):**
```javascript
const API_BASE = 'https://property-sync-service-1.onrender.com/api';
```

### 3. Start Dev Server

```bash
npm run dev
```

Open `http://localhost:5173`

---

## Component Structure

```
src/
├── components/
│   ├── cards/
│   │   └── StatsCard.jsx          ← Dashboard stat cards
│   ├── tables/
│   │   └── ListingsTable.jsx      ← Listings table with filters
│   └── sections/
│       ├── DuplicatesSection.jsx  ← Cross-platform duplicates
│       └── SyncLogsSection.jsx    ← Sync run history
├── services/
│   └── api.js                     ← Axios API client
├── App.jsx                        ← Main component
├── main.jsx                       ← Entry point
└── index.css                      ← Tailwind imports
```

---

## API Integration

Dashboard calls these endpoints:

```javascript
// Get stats
GET /api/sync/stats

// Get listings (paginated, filterable)
GET /api/listings?city=Dubai&type=sale&limit=20

// Get duplicates
GET /api/sync/duplicates?limit=50

// Get sync history
GET /api/sync/logs?limit=20
```

See backend README for full endpoint documentation.

---

## Troubleshooting

**"Failed to fetch" in browser console**
- Backend URL in `api.js` is incorrect
- Backend is not running
- CORS issue (backend needs to allow frontend domain)

**"No data showing" on dashboard**
- Check browser console (F12) for fetch errors
- Verify backend URL is correct
- Test backend manually: `curl http://localhost:3000/api/sync/stats`

**"Port 5173 already in use"**
```bash
# Find process on 5173
lsof -i :5173

# Kill it
kill -9 <PID>
```

**Build fails**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## Styling

Uses **Tailwind CSS 3** with inline styles for maximum compatibility.

Key colors:
- Primary blue: `#3b82f6`
- Text dark: `#0f172a`
- Border light: `#e2e8f0`

Cards use:
- White background
- Light gray border
- Subtle shadow
- Hover effects (shadow + border color change)

---

## Performance

- **Stats:** Auto-refreshes every 30 seconds
- **Listings:** Fetched on filter change (debounced)
- **Duplicates:** Fetched once on mount
- **Sync logs:** Fetched once on mount

---

## Tech Stack

- **Framework:** React 18
- **Build:** Vite 5
- **HTTP:** Axios
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Package Manager:** npm

---

## GitHub

https://github.com/palwashasheikh/property-sync-dashboard