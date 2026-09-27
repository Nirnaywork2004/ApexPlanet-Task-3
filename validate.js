const fs = require('fs');

console.log('========================================');
console.log('TASK 3 INTEGRITY & VALIDATION SUITE');
console.log('========================================\n');

// 1. Validate HTML
console.log('[1/4] Checking index.html Structure & Element IDs...');
const html = fs.readFileSync('index.html', 'utf8');
const requiredIds = [
  'header', 'nav-menu', 'hamburger-btn', 'home', 'quiz', 'weather', 'about',
  'quiz-start-screen', 'quiz-play-screen', 'quiz-result-screen',
  'btn-start-quiz', 'btn-next-question', 'btn-restart-quiz',
  'quiz-counter', 'quiz-category-tag', 'quiz-current-score', 'quiz-progress-bar',
  'quiz-question-text', 'quiz-options-grid', 'quiz-feedback-box',
  'result-score-percent', 'circle-progress', 'result-title', 'result-score-detail',
  'weather-form', 'city-input', 'btn-clear-input', 'weather-search-btn', 'quick-chips',
  'weather-state-initial', 'weather-state-loading', 'weather-card-success',
  'weather-state-not-found', 'weather-state-error', 'weather-state-empty',
  'weather-city-name', 'weather-country', 'weather-date', 'weather-time',
  'weather-temp', 'weather-condition', 'weather-condition-svg',
  'weather-wind', 'weather-humidity', 'weather-apparent-temp', 'weather-coords',
  'btn-refresh-weather'
];

let missingIds = [];
requiredIds.forEach(id => {
  if (!html.includes(`id="${id}"`)) {
    missingIds.push(id);
  }
});
if (missingIds.length === 0) {
  console.log(`✓ All ${requiredIds.length} mandatory DOM element IDs exist in index.html`);
} else {
  console.error(`✗ Missing DOM IDs: ${missingIds.join(', ')}`);
  process.exit(1);
}

// 2. Validate CSS & Media Queries
console.log('\n[2/4] Checking styles.css Media Queries & Responsive Rules...');
const css = fs.readFileSync('styles.css', 'utf8');
const queries = [
  { name: 'Large Desktop (>= 1440px)', pattern: '@media screen and (min-width: 1440px)' },
  { name: 'Tablet (768px - 1023px)', pattern: '@media screen and (min-width: 768px) and (max-width: 1023px)' },
  { name: 'Mobile (< 768px)', pattern: '@media screen and (max-width: 767px)' },
  { name: 'Small Mobile (<= 480px)', pattern: '@media screen and (max-width: 480px)' }
];

queries.forEach(q => {
  if (css.includes(q.pattern)) {
    console.log(`✓ Breakpoint verified: ${q.name}`);
  } else {
    console.error(`✗ Missing media query: ${q.name}`);
    process.exit(1);
  }
});

// 3. Validate app.js Syntax & Logic
console.log('\n[3/4] Validating app.js Syntax & Functions...');
const js = fs.readFileSync('app.js', 'utf8');
try {
  new Function(js);
  console.log('✓ app.js parsed successfully with zero syntax errors.');
} catch (e) {
  console.error('✗ app.js syntax error:', e);
  process.exit(1);
}

// 4. Validate Public API Integration
console.log('\n[4/4] Testing Live Public API Network Requests...');
async function testPublicApi() {
  const cities = ['London', 'Tokyo', 'Paris'];
  for (const city of cities) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`Failed to resolve coordinates for ${city}`);
    }
    const loc = geoData.results[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=${encodeURIComponent(loc.timezone || 'auto')}`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();
    if (!weatherData.current) {
      throw new Error(`Failed to retrieve weather payload for ${city}`);
    }
    console.log(`✓ [${city}, ${loc.country}]: Temp: ${weatherData.current.temperature_2m}°C | Wind: ${weatherData.current.wind_speed_10m} km/h | Humidity: ${weatherData.current.relative_humidity_2m}% | Code: ${weatherData.current.weather_code}`);
  }
  console.log('\n========================================');
  console.log('ALL VALIDATION CHECKS PASSED SUCCESSFULLY!');
  console.log('========================================');
}

testPublicApi().catch(err => {
  console.error('API Verification Error:', err);
  process.exit(1);
});
