# RV University — Placements Redesign

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## Project Overview

Our entry for a competition hosted by the Placement Office to redesign and revamp the current placement website ([rvu.edu.in/placements](https://rvu.edu.in/placements/)).

Built with plain HTML, CSS, and JavaScript. We're just trying to make the placement website a little clearer and easier to use — this isn't meant to replace or outdo the college's work, just our attempt at exploring what could be better.

## Key Features

- Talent directory across 6 schools
- Recruiter logo marquee
- Job Announcement Form (JAF) modal
- 5-stage placement stepper
- Searchable placement policy accordion with category filters
- Animated placement stats
- Responsive layout with top pills for mobile

## Technology Stack

- HTML5 — semantic markup
- CSS3 — custom properties, Flexbox / Grid (`css/redesign.css`)
- Vanilla JavaScript — no framework (`js/redesign.js`)
- Fonts: Playfair Display + Montserrat via Google Fonts

## Getting Started

### Prerequisites

- Modern browser (Chrome / Edge / Firefox / Safari)
- Optional: Python 3 for local server

### Installation

```bash
git clone https://github.com/AnisHerdev/placement-redesign.git
cd placement-redesign
```

No dependencies to install. No build step.

### Configuration

No environment variables or config needed.

## Running the Project Locally

```bash
python -m http.server 8000
# visit http://localhost:8000/
```

Or open [`index.html`](./index.html) directly in a browser.

## Usage

- Scroll through [`index.html`](./index.html) sections for outcomes, talent directory, process, and policies.
- Use school tabs (`data-school`) to switch talent panels.
- Use filter pills (`data-filter`) and search to narrow policy items.
- Use `data-open-modal="recruiter-modal"` button to open the JAF modal.

All interactions auto-initialize on `DOMContentLoaded` — see [`js/redesign.js`](./js/redesign.js).

## Project Structure

```text
placement-redesign/
├── index.html          # Main page
├── raw_original.html   # Original snapshot (reference only)
├── PRODUCT.md          # Scope and brand notes
├── css/
│   └── redesign.css    # All redesign styles
└── js/
    └── redesign.js     # Counters, tabs, accordions, modal, filters
```

- `index.html` – main page to run
- `css/redesign.css` – styles and brand tokens
- `js/redesign.js` – UI interactions
- `raw_original.html` – TODO: confirm if reference-only or removable before commit
