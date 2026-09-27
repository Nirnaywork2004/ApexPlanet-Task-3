# ApexPlanet Task 3 – Advanced Styling and JavaScript

## Project Overview
This project was created as part of the **ApexPlanet Web Development Internship — Task 3**. It showcases modern, responsive frontend development using semantic HTML5, advanced CSS3 (Custom Properties, Flexbox, CSS Grid, and Media Queries), and modular vanilla JavaScript (ES6+) for interactive state management and asynchronous public API integration.

---

## Features

### 1. Responsive Design
- **Multi-Device Support**: Optimized across all standard screen sizes, including Large Desktop (≥1440px), Desktop (1024px–1439px), Tablet (768px–1023px), Mobile (<768px), and Small Mobile (≤480px).
- **Modern Layout Engines**: Implements CSS Flexbox for one-dimensional alignments (navbars, badges, button groups) and CSS Grid for two-dimensional components (feature cards, quiz option grids, weather metrics).
- **Fluid & Accessible**: Fully responsive navigation drawer with hamburger toggle for mobile devices, fluid typography using `clamp()`, and smooth scrolling section navigation.

### 2. Interactive Quiz
- **Multiple Questions**: A curated question pool testing core web development concepts (HTML5 semantics, CSS layouts, JavaScript ES6+, async programming).
- **Answer Selection & Feedback**: Interactive options with instant visual feedback (green for correct, red for incorrect, and indicator badges) along with detailed technical explanations.
- **Score Tracking & Progress Indicator**: Real-time score counter and a dynamic progress bar updating as users advance through the quiz.
- **Final Result Screen**: Calculates score percentage with an animated SVG circular gauge, tailored performance badges, and personalized evaluation messages.
- **Restart Functionality**: Option to reset the quiz state seamlessly and retry anytime.

### 3. Public API Integration
- **Open-Meteo Public API**: Uses the native JavaScript `fetch()` API with async/await to retrieve live meteorological data without requiring private API keys.
- **Geocoding & Forecast Integration**: Performs two-step asynchronous requests: converts city names into geographic coordinates via the Open-Meteo Geocoding API, then fetches current weather metrics via the Open-Meteo Weather Forecast API.
- **Comprehensive Weather Metrics**: Displays temperature (°C), weather conditions with dynamic SVG weather icons, wind speed (km/h), relative humidity (%), apparent/feels-like temperature, and coordinates.
- **Robust State & Error Handling**:
  - **Loading State**: Visual spinner and disabled controls while awaiting network response.
  - **Quick City Chips**: One-click quick search for popular global cities (e.g., London, Tokyo, New York, Paris, Sydney, Mumbai).
  - **City Search & Refresh**: Instant search bar with clear button and live refresh button.
  - **Invalid City / Not Found Handling**: Friendly alert state when an unknown city is queried.
  - **Network Error Handling**: Graceful error UI with retry actions in case of network disruptions.

---

## Technologies
- **HTML5**: Semantic document structure, accessibility attributes (`aria-*`), SVG graphics.
- **CSS3**: CSS Custom Properties (Design Tokens), Glassmorphism, CSS Animations & Transitions.
- **JavaScript (ES6+)**: Vanilla JavaScript, modular functions, state management, Event Listeners.
- **Media Queries**: Custom breakpoints for desktop, tablet, and mobile layouts.
- **Flexbox & CSS Grid**: Robust, responsive page architectures.
- **DOM Manipulation**: Dynamic component rendering, active state toggles, and animated progress.
- **Fetch API**: Asynchronous HTTP requests (`async/await`) with robust error handling.
- **Open-Meteo API**: Public weather forecast and geocoding endpoints.

---

## How to Run
This is a pure client-side web application and requires no build tools or package managers to execute.

### Option 1: Direct Browser Launch
1. Clone or download the repository to your local computer:
   ```bash
   git clone https://github.com/Nirnaywork2004/ApexPlanet-Task-3.git
   ```
2. Open the project folder and double-click `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local Development Server (VS Code Live Server)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500`.

### Optional: Run Automated Validation Suite
To run the automated integrity and API test suite:
```bash
node validate.js
```

---

## Task Requirements
This implementation directly satisfies all three requirements specified for ApexPlanet Internship Task 3:

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **1. Responsive Design using Media Queries** | Complete CSS media queries across desktop, tablet, and mobile viewports with Flexbox and Grid layouts. | **Completed** |
| **2. Interactive JavaScript Quiz** | Multi-question quiz featuring dynamic state management, feedback, score tracking, progress bar, result calculation, and restart capability. | **Completed** |
| **3. Real Public API Integration** | Public weather integration using JavaScript Fetch API with Open-Meteo, featuring city search, live weather conditions, wind speed, loading states, and error handling. | **Completed** |

---

## Author
- **Nirnay Mondal**
- ApexPlanet Web Development Internship
