/**
 * ApexPlanet Internship — Task 3: Advanced Styling and JavaScript
 * Modular Vanilla JavaScript Application
 * 
 * Features:
 * 1. Mobile Navigation & Smooth Section Observer
 * 2. Interactive Web Development Quiz with State Management
 * 3. Public API Integration with Open-Meteo (Geocoding & Forecast APIs)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initQuiz();
  initWeather();
});

/* ==========================================================================
   MODULE 1: RESPONSIVE NAVIGATION & SCROLL OBSERVER
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile Menu Toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', String(!isExpanded));
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('active')) {
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
      }
    });
  }

  // Active Navigation Highlight on Scroll (IntersectionObserver)
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => sectionObserver.observe(sec));
  }
}

/* ==========================================================================
   MODULE 2: INTERACTIVE QUIZ COMPONENT
   ========================================================================== */
function initQuiz() {
  // Quiz Question Pool (HTML5, CSS3, Responsive Design, Vanilla JS, Async)
  const quizData = [
    {
      id: 1,
      category: 'HTML5 Semantics',
      question: 'Which HTML5 element represents self-contained content that could be distributed independently, such as a blog post or news item?',
      options: [
        '<div>',
        '<section>',
        '<article>',
        '<aside>'
      ],
      correctIndex: 2,
      explanation: '<article> is intended for self-contained, syndicate-able content that makes sense on its own, whereas <section> represents a generic thematic grouping.'
    },
    {
      id: 2,
      category: 'CSS3 Layouts',
      question: 'What is the default value of the "position" property for standard HTML elements in CSS?',
      options: [
        'relative',
        'static',
        'absolute',
        'initial'
      ],
      correctIndex: 1,
      explanation: '"static" is the default positioning for HTML elements. Static elements flow according to standard document order and ignore top/left/right/bottom/z-index properties.'
    },
    {
      id: 3,
      category: 'Media Queries',
      question: 'Which CSS Media Query correctly applies styles to viewports with a maximum width of 768 pixels?',
      options: [
        '@media (max-width: 768px)',
        '@media (min-width: 768px)',
        '@media screen (width <= 768)',
        '@media only-screen (max: 768px)'
      ],
      correctIndex: 0,
      explanation: '@media (max-width: 768px) is the standard CSS media query syntax used to apply responsive rules on mobile/tablet screens up to 768px wide.'
    },
    {
      id: 4,
      category: 'Modern JavaScript',
      question: 'Which native JavaScript web API method is used to make asynchronous network requests and returns a Promise?',
      options: [
        'XMLHttpRequest.send()',
        'fetch()',
        'http.request()',
        'async.get()'
      ],
      correctIndex: 1,
      explanation: 'The native fetch() API provides a modern, Promise-based interface for fetching resources asynchronously across the network without external libraries.'
    },
    {
      id: 5,
      category: 'DOM Events',
      question: 'What is the primary function of "event.preventDefault()" when handling user actions in JavaScript?',
      options: [
        'Stops the event from bubbling up the DOM tree',
        'Cancels the browser\'s default action associated with the event',
        'Removes all event listeners attached to the element',
        'Freezes the webpage until an async task finishes'
      ],
      correctIndex: 1,
      explanation: 'event.preventDefault() cancels the default behavior of an element (such as form submission or link navigation) without stopping event bubbling (which is done via stopPropagation).'
    },
    {
      id: 6,
      category: 'JavaScript Scoping',
      question: 'What is a fundamental difference between variable declarations using "const" vs "let"?',
      options: [
        '"let" variables are hoisted while "const" variables are not',
        '"const" is function-scoped while "let" is block-scoped',
        '"const" creates an immutable identifier binding that cannot be reassigned',
        '"const" automatically makes nested objects deeply frozen'
      ],
      correctIndex: 2,
      explanation: '"const" prevents re-assignment of the variable identifier binding. Note that "const" does not make object properties immutable, but the variable reference itself cannot be changed.'
    }
  ];

  // DOM Elements
  const startScreen = document.getElementById('quiz-start-screen');
  const playScreen = document.getElementById('quiz-play-screen');
  const resultScreen = document.getElementById('quiz-result-screen');
  
  const btnStart = document.getElementById('btn-start-quiz');
  const btnNext = document.getElementById('btn-next-question');
  const btnRestart = document.getElementById('btn-restart-quiz');
  
  const counterEl = document.getElementById('quiz-counter');
  const categoryTag = document.getElementById('quiz-category-tag');
  const currentScoreEl = document.getElementById('quiz-current-score');
  const progressFill = document.getElementById('quiz-progress-fill');
  const progressBar = document.getElementById('quiz-progress-bar');
  
  const questionText = document.getElementById('quiz-question-text');
  const optionsGrid = document.getElementById('quiz-options-grid');
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackIcon = document.getElementById('feedback-status-icon');
  const feedbackText = document.getElementById('feedback-status-text');
  const feedbackExplanation = document.getElementById('feedback-explanation');
  const hintText = document.getElementById('quiz-hint-text');

  // Result Elements
  const resultScorePercent = document.getElementById('result-score-percent');
  const circleProgress = document.getElementById('circle-progress');
  const resultTitle = document.getElementById('result-title');
  const resultScoreDetail = document.getElementById('result-score-detail');
  const resultEvaluation = document.getElementById('result-evaluation');
  const statTotalQ = document.getElementById('stat-total-q');
  const statCorrectQ = document.getElementById('stat-correct-q');
  const statIncorrectQ = document.getElementById('stat-incorrect-q');
  const statAccuracy = document.getElementById('stat-accuracy');

  // Quiz State
  let currentQuestionIndex = 0;
  let score = 0;
  let isAnswered = false;
  const userAnswers = [];

  // Start Quiz Event
  btnStart.addEventListener('click', () => {
    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    playScreen.classList.remove('hide');
    currentQuestionIndex = 0;
    score = 0;
    userAnswers.length = 0;
    currentScoreEl.textContent = '0';
    renderQuestion();
  });

  // Render Current Question
  function renderQuestion() {
    isAnswered = false;
    const currentQ = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;

    // Update Meta info
    counterEl.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    categoryTag.textContent = currentQ.category;
    
    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    progressFill.style.width = `${progressPercent}%`;
    progressBar.setAttribute('aria-valuenow', String(Math.round(progressPercent)));

    // Set Question Text
    questionText.textContent = currentQ.question;

    // Reset Feedback and Next Button
    feedbackBox.classList.add('hide');
    feedbackBox.className = 'quiz-feedback-box hide';
    hintText.textContent = 'Select one answer to continue.';
    btnNext.disabled = true;
    
    if (currentQuestionIndex === totalQuestions - 1) {
      btnNext.innerHTML = `<span>View Results</span>
        <svg class="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>`;
    } else {
      btnNext.innerHTML = `<span>Next Question</span>
        <svg class="btn-icon-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>`;
    }

    // Render Options
    const optionKeys = ['A', 'B', 'C', 'D'];
    optionsGrid.innerHTML = '';

    currentQ.options.forEach((optionTextStr, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option-btn';
      button.setAttribute('data-index', String(index));
      button.setAttribute('role', 'radio');
      button.setAttribute('aria-checked', 'false');

      button.innerHTML = `
        <span class="quiz-option-key">${optionKeys[index]}</span>
        <span class="quiz-option-text">${escapeHtml(optionTextStr)}</span>
      `;

      button.addEventListener('click', () => handleOptionSelection(index));
      optionsGrid.appendChild(button);
    });
  }

  // Handle Option Selection
  function handleOptionSelection(selectedIndex) {
    if (isAnswered) return; // Prevent accidental multiple selections
    isAnswered = true;

    const currentQ = quizData[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQ.correctIndex;
    const optionButtons = optionsGrid.querySelectorAll('.quiz-option-btn');

    if (isCorrect) {
      score++;
      currentScoreEl.textContent = String(score);
    }

    userAnswers.push({
      questionId: currentQ.id,
      selected: selectedIndex,
      correct: currentQ.correctIndex,
      isCorrect
    });

    // Update Option Button Styles
    optionButtons.forEach((btn, index) => {
      btn.disabled = true;
      btn.setAttribute('aria-checked', index === selectedIndex ? 'true' : 'false');

      if (index === currentQ.correctIndex) {
        btn.classList.add('correct');
        const keyEl = btn.querySelector('.quiz-option-key');
        if (keyEl) keyEl.innerHTML = '&#x2713;';
      } else if (index === selectedIndex && !isCorrect) {
        btn.classList.add('incorrect');
        const keyEl = btn.querySelector('.quiz-option-key');
        if (keyEl) keyEl.innerHTML = '&#x2715;';
      } else {
        btn.classList.add('dimmed');
      }
    });

    // Show Feedback Box with accessible explanation
    feedbackBox.classList.remove('hide');
    if (isCorrect) {
      feedbackBox.className = 'quiz-feedback-box feedback-correct';
      feedbackIcon.innerHTML = '&#x2714;';
      feedbackText.textContent = 'Correct Answer!';
    } else {
      feedbackBox.className = 'quiz-feedback-box feedback-incorrect';
      feedbackIcon.innerHTML = '&#x2716;';
      feedbackText.textContent = 'Incorrect Answer';
    }
    feedbackExplanation.textContent = currentQ.explanation;
    hintText.textContent = 'Answer recorded. Click Next Question to proceed.';

    // Unlock Next Button
    btnNext.disabled = false;
    btnNext.focus();
  }

  // Next Question Event
  btnNext.addEventListener('click', () => {
    if (!isAnswered) return;

    if (currentQuestionIndex < quizData.length - 1) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      showResults();
    }
  });

  // Display Final Result Screen
  function showResults() {
    playScreen.classList.add('hide');
    resultScreen.classList.remove('hide');

    const total = quizData.length;
    const accuracy = Math.round((score / total) * 100);
    const incorrect = total - score;

    statTotalQ.textContent = String(total);
    statCorrectQ.textContent = String(score);
    statIncorrectQ.textContent = String(incorrect);
    statAccuracy.textContent = `${accuracy}%`;

    resultScoreDetail.innerHTML = `Your Score: <strong>${score} / ${total}</strong> (${accuracy}%)`;
    resultScorePercent.textContent = `${accuracy}%`;

    // Dynamic Circular Progress Gauge
    const circumference = 2 * Math.PI * 42; // r=42 -> ~263.89
    const offset = circumference - (accuracy / 100) * circumference;
    setTimeout(() => {
      circleProgress.style.strokeDashoffset = String(offset);
    }, 100);

    // Performance Evaluation Feedback
    if (score === total) {
      resultTitle.textContent = 'Outstanding! Perfect Score!';
      resultEvaluation.textContent = 'You have demonstrated complete mastery of HTML5 semantics, CSS3 media queries, and modern JavaScript concepts.';
      circleProgress.style.stroke = '#10b981';
    } else if (score >= total * 0.7) {
      resultTitle.textContent = 'Great Job! Strong Foundation!';
      resultEvaluation.textContent = 'You have a solid command of web development fundamentals. Review the few missed concepts to achieve 100% mastery.';
      circleProgress.style.stroke = '#06b6d4';
    } else {
      resultTitle.textContent = 'Good Effort! Keep Learning!';
      resultEvaluation.textContent = 'A good foundation! Practice CSS responsive media queries and JavaScript asynchronous patterns to boost your score.';
      circleProgress.style.stroke = '#f59e0b';
    }
  }

  // Restart Quiz Event
  btnRestart.addEventListener('click', () => {
    resultScreen.classList.add('hide');
    circleProgress.style.strokeDashoffset = '264';
    startScreen.classList.remove('hide');
  });
}

/* ==========================================================================
   MODULE 3: PUBLIC WEATHER API INTEGRATION (OPEN-METEO)
   ========================================================================== */
function initWeather() {
  const form = document.getElementById('weather-form');
  const cityInput = document.getElementById('city-input');
  const btnClearInput = document.getElementById('btn-clear-input');
  const searchBtn = document.getElementById('weather-search-btn');
  const searchSpinner = document.getElementById('search-spinner');
  const quickChips = document.getElementById('quick-chips');
  const btnRefresh = document.getElementById('btn-refresh-weather');

  // State Card Elements
  const stateInitial = document.getElementById('weather-state-initial');
  const stateLoading = document.getElementById('weather-state-loading');
  const stateSuccess = document.getElementById('weather-card-success');
  const stateNotFound = document.getElementById('weather-state-not-found');
  const stateError = document.getElementById('weather-state-error');
  const stateEmpty = document.getElementById('weather-state-empty');
  const networkErrorDetail = document.getElementById('network-error-detail');

  // Weather Data Field Elements
  const cityNameEl = document.getElementById('weather-city-name');
  const countryEl = document.getElementById('weather-country');
  const dateEl = document.getElementById('weather-date');
  const timeEl = document.getElementById('weather-time');
  const tempEl = document.getElementById('weather-temp');
  const conditionEl = document.getElementById('weather-condition');
  const conditionSvg = document.getElementById('weather-condition-svg');
  const windEl = document.getElementById('weather-wind');
  const humidityEl = document.getElementById('weather-humidity');
  const apparentTempEl = document.getElementById('weather-apparent-temp');
  const coordsEl = document.getElementById('weather-coords');

  let currentLoadedCity = null;

  // Input Clear Button Toggle
  cityInput.addEventListener('input', () => {
    if (cityInput.value.trim().length > 0) {
      btnClearInput.classList.remove('hide');
    } else {
      btnClearInput.classList.add('hide');
    }
  });

  btnClearInput.addEventListener('click', () => {
    cityInput.value = '';
    btnClearInput.classList.add('hide');
    cityInput.focus();
  });

  // Quick City Chips Event
  if (quickChips) {
    quickChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (!chip) return;
      const city = chip.getAttribute('data-city');
      if (city) {
        cityInput.value = city;
        btnClearInput.classList.remove('hide');
        fetchWeatherData(city);
      }
    });
  }

  // Refresh Weather Event
  if (btnRefresh) {
    btnRefresh.addEventListener('click', () => {
      if (currentLoadedCity) {
        fetchWeatherData(currentLoadedCity);
      }
    });
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = cityInput.value.trim();
    if (!query) {
      showState('empty');
      return;
    }
    fetchWeatherData(query);
  });

  // State Switcher Function
  function showState(stateName) {
    // Hide all state cards
    stateInitial.classList.add('hide');
    stateLoading.classList.add('hide');
    stateSuccess.classList.add('hide');
    stateNotFound.classList.add('hide');
    stateError.classList.add('hide');
    stateEmpty.classList.add('hide');

    // Reset button loading state
    searchBtn.disabled = false;
    searchSpinner.classList.add('hide');
    const btnText = searchBtn.querySelector('.btn-text');
    if (btnText) btnText.textContent = 'Get Weather';

    // Show active state
    switch (stateName) {
      case 'initial':
        stateInitial.classList.remove('hide');
        break;
      case 'loading':
        stateLoading.classList.remove('hide');
        searchBtn.disabled = true;
        searchSpinner.classList.remove('hide');
        if (btnText) btnText.textContent = 'Fetching...';
        break;
      case 'success':
        stateSuccess.classList.remove('hide');
        break;
      case 'not-found':
        stateNotFound.classList.remove('hide');
        break;
      case 'error':
        stateError.classList.remove('hide');
        break;
      case 'empty':
        stateEmpty.classList.remove('hide');
        break;
    }
  }

  /**
   * Main Async Fetch Function for Weather Data
   * Connects to Open-Meteo Geocoding API -> Open-Meteo Forecast API
   */
  async function fetchWeatherData(cityName) {
    showState('loading');

    try {
      // Step 1: Convert City Name to Geographical Coordinates (Geocoding API)
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      const geoResponse = await fetch(geoUrl);

      if (!geoResponse.ok) {
        throw new Error(`Geocoding server responded with status: ${geoResponse.status}`);
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        showState('not-found');
        return;
      }

      const location = geoData.results[0];
      const { name, country, latitude, longitude, timezone } = location;

      // Step 2: Fetch Live Meteorological Data from Open-Meteo Weather API
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&timezone=${encodeURIComponent(timezone || 'auto')}`;
      const weatherResponse = await fetch(weatherUrl);

      if (!weatherResponse.ok) {
        throw new Error(`Weather forecast server responded with status: ${weatherResponse.status}`);
      }

      const weatherData = await weatherResponse.json();

      if (!weatherData.current) {
        throw new Error('Incomplete weather payload received from API');
      }

      // Step 3: Populate DOM with Live Weather Data
      populateWeatherCard({
        name,
        country: country || 'International',
        latitude,
        longitude,
        timezone: timezone || 'UTC',
        current: weatherData.current,
        units: weatherData.current_units || {
          temperature_2m: '°C',
          wind_speed_10m: 'km/h',
          relative_humidity_2m: '%'
        }
      });

      currentLoadedCity = name;
      showState('success');

    } catch (err) {
      console.error('Weather API Fetch Error:', err);
      if (networkErrorDetail) {
        networkErrorDetail.textContent = err.message || 'Unable to communicate with Open-Meteo public meteorological servers.';
      }
      showState('error');
    }
  }

  // Populate Weather Card with real API data
  function populateWeatherCard(data) {
    const { name, country, latitude, longitude, timezone, current, units } = data;
    const { temperature_2m, relative_humidity_2m, apparent_temperature, is_day, weather_code, wind_speed_10m, time } = current;

    // Location & Labels
    cityNameEl.textContent = name;
    countryEl.textContent = country;

    // Format Local Date and Time from API Timestamp
    const dateObj = time ? new Date(time) : new Date();
    const dateFormatted = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeFormatted = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });

    dateEl.textContent = dateFormatted;
    timeEl.textContent = `${timeFormatted} (${timezone})`;

    // Temperature & Units
    tempEl.innerHTML = `${Math.round(temperature_2m)}<span class="temp-unit">${units.temperature_2m || '°C'}</span>`;
    apparentTempEl.textContent = `${Math.round(apparent_temperature)}${units.temperature_2m || '°C'}`;
    
    // Wind & Humidity
    windEl.textContent = `${wind_speed_10m} ${units.wind_speed_10m || 'km/h'}`;
    humidityEl.textContent = `${relative_humidity_2m}${units.relative_humidity_2m || '%'}`;

    // Coordinates Formatted
    const latFormatted = `${Math.abs(latitude).toFixed(2)}°${latitude >= 0 ? 'N' : 'S'}`;
    const lonFormatted = `${Math.abs(longitude).toFixed(2)}°${longitude >= 0 ? 'E' : 'W'}`;
    coordsEl.textContent = `${latFormatted}, ${lonFormatted}`;

    // WMO Weather Code Mapping to Description & Icon
    const weatherInfo = mapWmoWeatherCode(weather_code, is_day);
    conditionEl.textContent = weatherInfo.description;
    conditionSvg.innerHTML = weatherInfo.svgIcon;
  }

  // WMO Standard Weather Code to Text & SVG Converter
  function mapWmoWeatherCode(code, isDay) {
    const isNight = isDay === 0;

    // SVG Icons
    const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    const partlyCloudyIcon = `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>`;
    const overcastIcon = `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path><path d="M6 15a4 4 0 0 1 0-8 4.5 4.5 0 0 1 3.5 1.5"></path>`;
    const rainIcon = `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path><line x1="8" y1="19" x2="6" y2="23"></line><line x1="12" y1="19" x2="10" y2="23"></line><line x1="16" y1="19" x2="14" y2="23"></line>`;
    const thunderIcon = `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path><polyline points="13 15 10 20 15 20 12 24"></polyline>`;
    const snowIcon = `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path><line x1="8" y1="21" x2="8" y2="21.01"></line><line x1="12" y1="21" x2="12" y2="21.01"></line><line x1="16" y1="21" x2="16" y2="21.01"></line>`;
    const fogIcon = `<line x1="4" y1="14" x2="20" y2="14"></line><line x1="4" y1="18" x2="20" y2="18"></line><line x1="4" y1="10" x2="20" y2="10"></line><path d="M17.5 10H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 0 1 0 9Z"></path>`;

    switch (code) {
      case 0:
        return {
          description: isNight ? 'Clear Night' : 'Clear Sky',
          svgIcon: isNight ? moonIcon : sunIcon
        };
      case 1:
        return {
          description: isNight ? 'Mainly Clear' : 'Mainly Sunny',
          svgIcon: isNight ? moonIcon : sunIcon
        };
      case 2:
        return {
          description: 'Partly Cloudy',
          svgIcon: partlyCloudyIcon
        };
      case 3:
        return {
          description: 'Overcast',
          svgIcon: overcastIcon
        };
      case 45:
      case 48:
        return {
          description: 'Foggy / Rime Fog',
          svgIcon: fogIcon
        };
      case 51:
      case 53:
      case 55:
        return {
          description: 'Light Drizzle',
          svgIcon: rainIcon
        };
      case 61:
      case 63:
      case 65:
        return {
          description: 'Rain Showers',
          svgIcon: rainIcon
        };
      case 71:
      case 73:
      case 75:
      case 77:
        return {
          description: 'Snowfall',
          svgIcon: snowIcon
        };
      case 80:
      case 81:
      case 82:
        return {
          description: 'Heavy Rain Showers',
          svgIcon: rainIcon
        };
      case 85:
      case 86:
        return {
          description: 'Heavy Snow Showers',
          svgIcon: snowIcon
        };
      case 95:
      case 96:
      case 99:
        return {
          description: 'Thunderstorm',
          svgIcon: thunderIcon
        };
      default:
        return {
          description: 'Moderate Weather',
          svgIcon: partlyCloudyIcon
        };
    }
  }
}

// Utility Helper to escape HTML characters
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
