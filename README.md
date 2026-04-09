# ThreatLens — Cyber Threat Monitoring Dashboard

A fully working interactive web application built as a UX/Frontend portfolio project.
No frameworks, no installs — just open `index.html` in your browser.

## Live Demo
https://atharvakeval.github.io/ThreatLens/

## What this project does

ThreatLens is a simulated cybersecurity dashboard with 4 fully working pages:

| Page | File | What it does |
|---|---|---|
| Dashboard | `index.html` | Overview with metrics, attack map, live feed, team activity |
| Threat Feed | `pages/threats.html` | Searchable + filterable alert list with dismiss/escalate actions |
| Incident Detail | `pages/incident.html` | Full incident investigation page with timeline and resolution workflow |
| Reports | `pages/reports.html` | Charts, SLA tracking, donut breakdown, scheduled reports toggle |

## Features built in JavaScript

- Live alert filtering by severity (Critical / High / Medium / Low)
- Search alerts by title, IP address, or attack type
- Sort alerts by newest or severity
- Dismiss alerts (removes from list)
- Mark incidents as resolved (updates stepper + status badge)
- Switch report date ranges (week / month / quarter) — charts update live
- Donut chart built from scratch with SVG math
- Bar charts with hover states
- Toggle for scheduled reports

## How to run

1. Download or clone this repo
2. Open `index.html` in any browser (Chrome, Firefox, Edge)
3. No server needed, no npm install, no build step

## How to deploy to GitHub Pages

1. Push this folder to a GitHub repo
2. Go to Settings → Pages
3. Set source to `main` branch, `/ (root)` folder
4. Your site will be live at `https://your-username.github.io/repo-name`

## Tech stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure |
| CSS3 | Dark theme, grid layouts, animations |
| Vanilla JavaScript | All interactivity, data rendering, chart generation |
| SVG | Donut chart, world map, logo |
| Zero dependencies | No React, no Vue, no npm |

## Project structure

```
ThreatLens/
├── index.html          ← Main dashboard
├── css/
│   └── style.css       ← All shared styles
├── js/
│   └── data.js         ← Mock data + shared render functions
└── pages/
    ├── threats.html    ← Threat feed
    ├── incident.html   ← Incident detail
    └── reports.html    ← Reports & analytics
```

## About this project

Built as part of a UI/UX internship portfolio. Domain knowledge in cybersecurity
(OWASP Top 10, threat hunting, SOC workflows) directly informed every design decision.

Made by [Your Name] · [LinkedIn] · [Portfolio]
