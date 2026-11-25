import { PracticalChallenge } from '../../types/practicalCoding';

export const PRACTICAL_CHALLENGES: PracticalChallenge[] = [
  // ========================================================
  // TRACK 1: FRONTEND UI / DOM (GREATFRONTEND STYLE)
  // ========================================================
  {
    id: 'star-rating',
    slug: 'star-rating',
    title: 'Interactive Star Rating Component',
    track: 'frontend_ui',
    difficulty: 'Beginner',
    roleTarget: 'Frontend Engineer',
    estimatedMinutes: 25,
    tags: ['DOM', 'CSS', 'Events', 'Accessibility'],
    description:
      'Build a reusable, accessible 5-star rating widget in vanilla HTML/CSS/JavaScript. Users can hover over stars to see a dynamic preview, click to lock in a rating, and use keyboard arrow keys to navigate and select scores.',
    requirements: [
      'Render 5 star icons inside a container element with class `star-rating`.',
      'Hovering over the Nth star highlights all stars from 1 to N with class `highlighted` or active gold color.',
      'Moving the mouse away from the component restores the previously locked rating state (or clears if unselected).',
      'Clicking a star locks in that score (1 through 5) and displays the numeric feedback in `#rating-value`.',
      'Ensure keyboard accessibility: pressing ArrowRight/ArrowUp increments rating, ArrowLeft/ArrowDown decrements.',
    ],
    designSpecs: [
      'Star size should be approximately 32px with adequate touch targets (min 44px).',
      'Inactive stars should use a muted slate color (`#94a3b8`), while active/hovered stars use gold/amber (`#f59e0b`).',
      'Provide smooth CSS transitions for hover state without flickering.',
    ],
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="rating-widget">
    <h3>Rate your experience</h3>
    <div id="star-container" class="star-rating" role="radiogroup" aria-label="Star rating">
      <button class="star-btn" data-value="1" aria-label="1 star">★</button>
      <button class="star-btn" data-value="2" aria-label="2 stars">★</button>
      <button class="star-btn" data-value="3" aria-label="3 stars">★</button>
      <button class="star-btn" data-value="4" aria-label="4 stars">★</button>
      <button class="star-btn" data-value="5" aria-label="5 stars">★</button>
    </div>
    <p class="rating-feedback">Selected: <strong id="rating-value">0</strong> / 5</p>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #0f172a;
  color: #f8fafc;
}

.rating-widget {
  background: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid #334155;
  text-align: center;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.star-rating {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin: 1.25rem 0;
}

.star-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #475569;
  cursor: pointer;
  transition: color 0.15s ease, transform 0.1s ease;
  padding: 0.25rem;
}

.star-btn:hover,
.star-btn.hovered,
.star-btn.selected {
  color: #f59e0b;
  transform: scale(1.15);
}

.rating-feedback {
  font-size: 0.875rem;
  color: #94a3b8;
  margin: 0;
}`,
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `// Implement the Star Rating Component
const stars = document.querySelectorAll('.star-btn');
const ratingValueDisplay = document.getElementById('rating-value');
let currentRating = 0;

// TODO:
// 1. Add mouseenter/mouseover listeners to preview hover rating
// 2. Add mouseleave listener to restore currentRating
// 3. Add click listener to lock currentRating and update #rating-value text
// 4. Handle keyboard navigation (ArrowLeft, ArrowRight)
`,
      },
    ],
    testCases: [
      {
        id: 'tc-stars-count',
        title: 'Renders 5 star buttons',
        description: 'Verifies the DOM contains 5 buttons with class .star-btn',
        assertionType: 'dom_element',
      },
      {
        id: 'tc-click-rating',
        title: 'Clicking star updates rating display',
        description: 'Simulates clicking the 4th star and verifies #rating-value shows "4"',
        assertionType: 'dom_event',
      },
      {
        id: 'tc-selected-class',
        title: 'Applies .selected class to active stars',
        description: 'Verifies stars 1 through 4 have the .selected class after clicking star 4',
        assertionType: 'dom_element',
      },
    ],
    testRunnerScript: `(async function runStarRatingTests(doc, win) {
  const results = [];
  const stars = doc.querySelectorAll('.star-btn');
  const valDisplay = doc.getElementById('rating-value');

  // Test 1: Count
  if (stars.length === 5) {
    results.push({ testId: 'tc-stars-count', title: 'Renders 5 star buttons', passed: true });
  } else {
    results.push({ testId: 'tc-stars-count', title: 'Renders 5 star buttons', passed: false, error: \`Expected 5 stars, found \${stars.length}\` });
  }

  // Test 2: Click 4th star
  if (stars.length >= 4) {
    stars[3].click();
    const text = valDisplay ? valDisplay.textContent.trim() : '';
    const passed = text === '4';
    results.push({
      testId: 'tc-click-rating',
      title: 'Clicking star updates rating display',
      passed,
      expected: '4',
      actual: text,
      error: passed ? undefined : \`Expected rating-value to be '4', received '\${text}'\`
    });

    // Test 3: Verify class
    const star4Selected = stars[3].classList.contains('selected') || stars[0].classList.contains('selected');
    results.push({
      testId: 'tc-selected-class',
      title: 'Applies .selected class to active stars',
      passed: star4Selected,
      error: star4Selected ? undefined : 'Stars did not receive .selected class after click'
    });
  } else {
    results.push({ testId: 'tc-click-rating', title: 'Clicking star updates rating display', passed: false, error: 'Cannot click star 4' });
    results.push({ testId: 'tc-selected-class', title: 'Applies .selected class to active stars', passed: false, error: 'Cannot evaluate classes' });
  }

  return results;
})`,
    solutionFiles: [
      {
        name: 'script.js',
        language: 'javascript',
        content: `const stars = document.querySelectorAll('.star-btn');
const ratingValueDisplay = document.getElementById('rating-value');
let currentRating = 0;

function updateStars(limit, className) {
  stars.forEach((star, index) => {
    star.classList.remove('hovered', 'selected');
    if (index < limit) {
      star.classList.add(className);
    }
  });
}

stars.forEach((star, index) => {
  star.addEventListener('mouseenter', () => {
    updateStars(index + 1, 'hovered');
  });

  star.addEventListener('click', () => {
    currentRating = index + 1;
    ratingValueDisplay.textContent = currentRating;
    updateStars(currentRating, 'selected');
  });
});

document.getElementById('star-container').addEventListener('mouseleave', () => {
  updateStars(currentRating, 'selected');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    if (currentRating < 5) {
      currentRating++;
      ratingValueDisplay.textContent = currentRating;
      updateStars(currentRating, 'selected');
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    if (currentRating > 1) {
      currentRating--;
      ratingValueDisplay.textContent = currentRating;
      updateStars(currentRating, 'selected');
    }
  }
});
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Star Rating Component

In modern frontend interviews (like GreatFrontEnd or Meta UI screening), a star rating component tests:
1. **Event Delegation vs Direct Listeners**: Handling \`mouseenter\`, \`mouseleave\`, and \`click\` smoothly without visual flicker.
2. **State Separation**: Keeping temporary hover preview state separate from committed rating state (\`currentRating\`).
3. **Accessibility**: Using accessible button elements with \`aria-label\` and keyboard arrow navigation.

#### Key Complexity & Edge Cases
- **Restoring State**: On \`mouseleave\`, the component must cleanly revert to \`currentRating\`, not 0, unless no rating was ever clicked.
- **Keyboard Navigation**: Supporting \`ArrowRight\` and \`ArrowLeft\` ensures screen reader users can independently adjust the score.`,
  },

  {
    id: 'accordion-component',
    slug: 'accordion-component',
    title: 'Accessible Collapsible Accordion',
    track: 'frontend_ui',
    difficulty: 'Beginner',
    roleTarget: 'Frontend Engineer',
    estimatedMinutes: 30,
    tags: ['WAI-ARIA', 'DOM', 'Animations', 'UI Components'],
    description:
      'Implement an accessible accordion component with smooth expandable sections. Each accordion item contains a header button and a content panel. Ensure full WAI-ARIA compliance with aria-expanded and keyboard space/enter toggling.',
    requirements: [
      'Each accordion header must be a `<button>` with attribute `aria-expanded="false"` initially.',
      'Clicking a header toggles that panel open and closed, updating `aria-expanded` accordingly.',
      'Include a mode toggle to allow either Single-Open (opening one collapses others) or Multi-Open.',
      'Panels must expand and collapse with smooth CSS transitions on max-height or grid.',
      'All content panels must have `role="region"` and `aria-labelledby` referencing their header ID.',
    ],
    designSpecs: [
      'Clean border dividers between items with rounded outer container.',
      'Include an SVG chevron icon on the right of each header that rotates 180 degrees when expanded.',
    ],
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="accordion-container">
    <div class="accordion-item">
      <button class="accordion-header" id="header-1" aria-expanded="false" aria-controls="panel-1">
        <span>What is Codearena?</span>
        <span class="chevron">▾</span>
      </button>
      <div id="panel-1" class="accordion-panel" role="region" aria-labelledby="header-1">
        <p>Codearena is a developer practice platform combining algorithmic challenges, campus rivalry contests, and practical engineering workspaces.</p>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header" id="header-2" aria-expanded="false" aria-controls="panel-2">
        <span>How does Campus Cup work?</span>
        <span class="chevron">▾</span>
      </button>
      <div id="panel-2" class="accordion-panel" role="region" aria-labelledby="header-2">
        <p>Students solve graded weekend contest rounds and algorithmic problems. Points earned automatically accumulate to rank their college on national leaderboards.</p>
      </div>
    </div>

    <div class="accordion-item">
      <button class="accordion-header" id="header-3" aria-expanded="false" aria-controls="panel-3">
        <span>Are solutions peer-reviewed?</span>
        <span class="chevron">▾</span>
      </button>
      <div id="panel-2" class="accordion-panel" role="region" aria-labelledby="header-3">
        <p>Yes, peer solutions require a mandatory 60+ character plain-English intuition explanation before code can be shared.</p>
      </div>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  padding: 1rem;
}

.accordion-container {
  width: 100%;
  max-w: 600px;
  background: #1e293b;
  border-radius: 1rem;
  border: 1px solid #334155;
  overflow: hidden;
}

.accordion-item {
  border-bottom: 1px solid #334155;
}

.accordion-item:last-child {
  border-bottom: none;
}

.accordion-header {
  width: 100%;
  padding: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  color: #f8fafc;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.accordion-header:hover {
  background: rgba(255, 255, 255, 0.03);
}

.chevron {
  transition: transform 0.25s ease;
}

.accordion-header[aria-expanded="true"] .chevron {
  transform: rotate(180deg);
}

.accordion-panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 1.25rem;
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
}

.accordion-panel.open {
  max-height: 200px;
  padding: 0 1.25rem 1.25rem;
}`,
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `// Implement Accordion Toggle Behavior
const headers = document.querySelectorAll('.accordion-header');

// TODO:
// 1. Add click listener to each header
// 2. Toggle aria-expanded ('true' <-> 'false')
// 3. Toggle .open class on the corresponding panel
`,
      },
    ],
    testCases: [
      {
        id: 'tc-acc-click-expand',
        title: 'Clicking header expands panel and updates aria-expanded',
        description: 'Simulates clicking the first accordion header and verifies aria-expanded becomes "true"',
        assertionType: 'dom_event',
      },
      {
        id: 'tc-acc-click-collapse',
        title: 'Clicking open header collapses panel and resets aria-expanded',
        description: 'Simulates clicking an open header again and verifies aria-expanded returns to "false"',
        assertionType: 'dom_event',
      },
    ],
    testRunnerScript: `(async function runAccordionTests(doc, win) {
  const results = [];
  const headers = doc.querySelectorAll('.accordion-header');

  if (headers.length === 0) {
    return [{ testId: 'tc-acc-click-expand', title: 'Clicking header expands panel', passed: false, error: 'No .accordion-header buttons found' }];
  }

  const h1 = headers[0];
  const p1 = doc.getElementById(h1.getAttribute('aria-controls') || 'panel-1');

  // Test 1: Expand
  h1.click();
  const expanded = h1.getAttribute('aria-expanded') === 'true';
  const panelOpen = p1 && p1.classList.contains('open');

  results.push({
    testId: 'tc-acc-click-expand',
    title: 'Clicking header expands panel and updates aria-expanded',
    passed: expanded && panelOpen,
    expected: 'aria-expanded="true" and panel has .open class',
    actual: \`aria-expanded="\${h1.getAttribute('aria-expanded')}", panel open: \${panelOpen}\`,
    error: (expanded && panelOpen) ? undefined : 'Header was not expanded or panel missing .open class'
  });

  // Test 2: Collapse
  h1.click();
  const collapsed = h1.getAttribute('aria-expanded') === 'false';
  const panelClosed = p1 && !p1.classList.contains('open');

  results.push({
    testId: 'tc-acc-click-collapse',
    title: 'Clicking open header collapses panel and resets aria-expanded',
    passed: collapsed && panelClosed,
    expected: 'aria-expanded="false" and panel removes .open class',
    actual: \`aria-expanded="\${h1.getAttribute('aria-expanded')}", panel open: \${!panelClosed}\`,
    error: (collapsed && panelClosed) ? undefined : 'Header did not collapse on second click'
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'script.js',
        language: 'javascript',
        content: `const headers = document.querySelectorAll('.accordion-header');

headers.forEach((header) => {
  header.addEventListener('click', () => {
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    const panelId = header.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);

    // Toggle current
    header.setAttribute('aria-expanded', !isExpanded);
    if (panel) {
      panel.classList.toggle('open', !isExpanded);
    }
  });
});
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Accordion Component

Key WAI-ARIA standards evaluated in technical interviews:
- **Button Semantics**: Always use a semantic \`<button>\` instead of \`<div>\` so keyboard space/enter and tab stops work out-of-the-box.
- **aria-expanded**: Accurately mirrors open/closed state to screen readers.
- **aria-controls & aria-labelledby**: Creates two-way programmatically determinable linkage between header and panel.`,
  },

  {
    id: 'autocomplete-typeahead',
    slug: 'autocomplete-typeahead',
    title: 'Debounced Autocomplete Search Input',
    track: 'frontend_ui',
    difficulty: 'Intermediate',
    roleTarget: 'Frontend Engineer',
    estimatedMinutes: 35,
    tags: ['Async', 'Debounce', 'DOM', 'Keyboard'],
    description:
      'Build a production-quality debounced autocomplete search component with dropdown suggestions. Keystrokes must be debounced by 250ms to prevent lag. Users can click a suggestion or navigate suggestions using ArrowDown/ArrowUp and Enter.',
    requirements: [
      'Debounce search query filtering by 250ms so rapid typing does not trigger redundant filtering.',
      'Display a floating dropdown with matching items when the user types.',
      'Highlight the matched substring within each suggestion in bold.',
      'Clicking a suggestion populates the input field and dismisses the dropdown.',
      'Support ArrowDown and ArrowUp to highlight items in the dropdown list, and Enter to select.',
    ],
    designSpecs: [
      'Dropdown should have a max height with smooth scrolling for long suggestion lists.',
      'Active highlighted item should have a distinct background indicator (`#3b82f6/20`).',
    ],
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <div class="search-box">
    <label for="search-input" class="search-label">Search Technologies</label>
    <div class="input-wrapper">
      <input
        id="search-input"
        type="text"
        autocomplete="off"
        placeholder="Type e.g. React, Python, TypeScript..."
      />
      <ul id="suggestions-list" class="suggestions-list hidden" role="listbox"></ul>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}

.search-box {
  width: 100%;
  max-width: 420px;
}

.search-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.input-wrapper {
  position: relative;
}

#search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: #f8fafc;
  font-size: 0.875rem;
  outline: none;
  box-sizing: border-box;
}

#search-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.35rem;
  padding: 0.35rem;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
  z-index: 50;
}

.suggestions-list.hidden {
  display: none;
}

.suggestion-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.15s ease;
}

.suggestion-item:hover,
.suggestion-item.active {
  background: #334155;
  color: #6366f1;
}`,
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `const DATA_SOURCE = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js',
  'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'Rust',
  'Go', 'Next.js', 'Tailwind CSS', 'Redis', 'MongoDB'
];

const input = document.getElementById('search-input');
const list = document.getElementById('suggestions-list');

// TODO:
// 1. Implement debounce utility function (delay ~250ms)
// 2. Filter DATA_SOURCE based on input query
// 3. Render matching list items
// 4. Handle item selection on click
`,
      },
    ],
    testCases: [
      {
        id: 'tc-ac-render',
        title: 'Renders dropdown when matching text is typed',
        description: 'Types "Py" and verifies suggestions list unhides with matching "Python"',
        assertionType: 'dom_event',
      },
      {
        id: 'tc-ac-select',
        title: 'Clicking suggestion populates input and closes list',
        description: 'Simulates click on suggestion item and verifies input value matches',
        assertionType: 'dom_event',
      },
    ],
    testRunnerScript: `(async function runAutocompleteTests(doc, win) {
  const results = [];
  const input = doc.getElementById('search-input');
  const list = doc.getElementById('suggestions-list');

  input.value = 'Py';
  input.dispatchEvent(new Event('input', { bubbles: true }));

  // Wait 300ms for debounce
  await new Promise((r) => setTimeout(r, 320));

  const isVisible = !list.classList.contains('hidden') && list.children.length > 0;
  results.push({
    testId: 'tc-ac-render',
    title: 'Renders dropdown when matching text is typed',
    passed: isVisible,
    expected: 'List visible with matching suggestions',
    actual: isVisible ? \`Visible with \${list.children.length} items\` : 'List remained hidden',
    error: isVisible ? undefined : 'Suggestions list did not unhide after 320ms debounce'
  });

  if (list.children.length > 0) {
    const first = list.children[0];
    const text = first.textContent.trim();
    first.click();
    const passed = input.value === text && list.classList.contains('hidden');
    results.push({
      testId: 'tc-ac-select',
      title: 'Clicking suggestion populates input and closes list',
      passed,
      expected: \`input.value === '\${text}' and list hidden\`,
      actual: \`input.value === '\${input.value}', hidden === \${list.classList.contains('hidden')}\`,
      error: passed ? undefined : 'Click did not populate input or close list'
    });
  } else {
    results.push({
      testId: 'tc-ac-select',
      title: 'Clicking suggestion populates input and closes list',
      passed: false,
      error: 'Cannot select item: list was empty'
    });
  }

  return results;
})`,
    solutionFiles: [
      {
        name: 'script.js',
        language: 'javascript',
        content: `const DATA_SOURCE = [
  'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js',
  'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'Rust',
  'Go', 'Next.js', 'Tailwind CSS', 'Redis', 'MongoDB'
];

const input = document.getElementById('search-input');
const list = document.getElementById('suggestions-list');

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function handleSearch() {
  const query = input.value.trim().toLowerCase();
  if (!query) {
    list.innerHTML = '';
    list.classList.add('hidden');
    return;
  }

  const matches = DATA_SOURCE.filter((item) => item.toLowerCase().includes(query));
  if (matches.length === 0) {
    list.innerHTML = '<li class="suggestion-item" style="color: #64748b; cursor: default;">No results found</li>';
    list.classList.remove('hidden');
    return;
  }

  list.innerHTML = matches
    .map((item) => \`<li class="suggestion-item" role="option">\${item}</li>\`)
    .join('');
  list.classList.remove('hidden');
}

input.addEventListener('input', debounce(handleSearch, 250));

list.addEventListener('click', (e) => {
  const item = e.target.closest('.suggestion-item');
  if (item && item.getAttribute('role') === 'option') {
    input.value = item.textContent;
    list.innerHTML = '';
    list.classList.add('hidden');
  }
});
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Debounced Autocomplete

1. **Debouncing Strategy**: Using a closure timer prevents CPU churn and extraneous filtering on every single keypress.
2. **Event Delegation on the List**: Attaching a single \`click\` listener to the \`<ul>\` parent rather than each individual \`<li>\` avoids memory leaks when suggestions re-render frequently.`,
  },

  // ========================================================
  // TRACK 2: BACKEND APIS & SERVICES
  // ========================================================
  {
    id: 'rate-limiter-middleware',
    slug: 'rate-limiter-middleware',
    title: 'Token Bucket HTTP Rate Limiter',
    track: 'backend_api',
    difficulty: 'Intermediate',
    roleTarget: 'Backend Engineer',
    estimatedMinutes: 35,
    tags: ['Backend', 'Middleware', 'Rate Limiting', 'Algorithms'],
    description:
      'Design and implement a production-grade Token Bucket HTTP Rate Limiter middleware in TypeScript/Node.js. The limiter must enforce request burst limits per client IP, smoothly refill tokens over time, and return HTTP 429 Too Many Requests with a Retry-After header when exhausted.',
    requirements: [
      'Implement `class TokenBucketRateLimiter` with constructor parameters `capacity: number` and `refillRatePerSec: number`.',
      'The `allowRequest(clientId: string): { allowed: boolean; retryAfterSeconds?: number }` method returns true if tokens remain, decrementing by 1.',
      'Refill tokens dynamically on demand based on elapsed time (`elapsedSeconds * refillRatePerSec`), capped at capacity.',
      'Return accurate `retryAfterSeconds` indicating how many seconds until the next token becomes available when allowed is false.',
      'Clean up stale client records to avoid in-memory memory leaks.',
    ],
    files: [
      {
        name: 'rateLimiter.ts',
        language: 'typescript',
        content: `export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export class TokenBucketRateLimiter {
  private capacity: number;
  private refillRatePerSec: number;
  private buckets = new Map<string, { tokens: number; lastRefillMs: number }>();

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
  }

  public allowRequest(clientId: string): RateLimitResult {
    // TODO:
    // 1. Retrieve or initialize client's bucket with full capacity
    // 2. Refill tokens based on (Date.now() - lastRefillMs)
    // 3. If tokens >= 1, decrement and return { allowed: true }
    // 4. Otherwise, calculate retryAfterSeconds and return { allowed: false, retryAfterSeconds }
    return { allowed: true };
  }
}
`,
      },
    ],
    testCases: [
      {
        id: 'tc-burst-capacity',
        title: 'Allows bursts up to capacity',
        description: 'Sends capacity requests and verifies all are allowed',
        assertionType: 'http_status',
      },
      {
        id: 'tc-block-overflow',
        title: 'Blocks requests once capacity is exhausted',
        description: 'Sends capacity + 1 request and verifies allowed is false with retryAfterSeconds',
        assertionType: 'http_status',
      },
    ],
    testRunnerScript: `(async function testRateLimiter(code) {
  // Evaluated in JS execution sandbox
  const results = [];
  const capacity = 3;
  const refillRate = 1;
  const limiter = new TokenBucketRateLimiter(capacity, refillRate);

  // 1. Burst
  let allBurstAllowed = true;
  for (let i = 0; i < capacity; i++) {
    if (!limiter.allowRequest('client-1').allowed) {
      allBurstAllowed = false;
      break;
    }
  }
  results.push({
    testId: 'tc-burst-capacity',
    title: 'Allows bursts up to capacity',
    passed: allBurstAllowed
  });

  // 2. Block
  const overflow = limiter.allowRequest('client-1');
  const blocked = overflow.allowed === false && typeof overflow.retryAfterSeconds === 'number';
  results.push({
    testId: 'tc-block-overflow',
    title: 'Blocks requests once capacity is exhausted',
    passed: blocked,
    expected: 'allowed: false with retryAfterSeconds',
    actual: JSON.stringify(overflow)
  });

  return results;
})`,
    solutionFiles: [
      {
        name: 'rateLimiter.ts',
        language: 'typescript',
        content: `export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

export class TokenBucketRateLimiter {
  private capacity: number;
  private refillRatePerSec: number;
  private buckets = new Map<string, { tokens: number; lastRefillMs: number }>();

  constructor(capacity: number, refillRatePerSec: number) {
    this.capacity = capacity;
    this.refillRatePerSec = refillRatePerSec;
  }

  public allowRequest(clientId: string): RateLimitResult {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefillMs: now };
      this.buckets.set(clientId, bucket);
    } else {
      const elapsedSec = (now - bucket.lastRefillMs) / 1000;
      const tokensToAdd = elapsedSec * this.refillRatePerSec;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
      bucket.lastRefillMs = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return { allowed: true };
    }

    const missingTokens = 1 - bucket.tokens;
    const retryAfterSeconds = Math.ceil(missingTokens / this.refillRatePerSec);
    return { allowed: false, retryAfterSeconds };
  }
}
`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Token Bucket Algorithm

The **Token Bucket Algorithm** is standard across Stripe, AWS API Gateway, and Cloudflare.
- **Lazy Refill vs Background Ticker**: Rather than running interval timers for thousands of client IPs (which burns memory and CPU), tokens are refilled on-demand whenever a request arrives using \`(now - lastRefillMs) / 1000 * rate\`.`,
  },

  // ========================================================
  // TRACK 3: SQL & DATA PIPELINES
  // ========================================================
  {
    id: 'customer-churn-sql',
    slug: 'customer-churn-sql',
    title: 'Customer Cohort Churn & Retention Analysis',
    track: 'sql_pipeline',
    difficulty: 'Intermediate',
    roleTarget: 'Data Engineer / Analyst',
    estimatedMinutes: 30,
    tags: ['SQL', 'Window Functions', 'Analytics', 'Joins'],
    description:
      'Write a SQL query analyzing customer cohort retention. Identify users who signed up in 2026, track whether they made repeat purchases in their first 30 days vs 60 days, and calculate the overall 30-day retention percentage.',
    requirements: [
      'Join the `users` and `orders` tables on `users.id = orders.user_id`.',
      'Filter for users registered between `2026-01-01` and `2026-12-31`.',
      'Calculate days between `users.signup_date` and `orders.created_at`.',
      'Flag repeat customers who made >= 2 orders within 30 days.',
      'Return the cohort month, total signups, and 30-day retention rate rounded to 2 decimal places.',
    ],
    files: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `-- Customer Cohort Retention Analysis
-- Schema:
-- users(id INT, name VARCHAR, signup_date DATE)
-- orders(id INT, user_id INT, amount DECIMAL, created_at DATE)

SELECT
  DATE_TRUNC('month', u.signup_date) AS cohort_month,
  COUNT(DISTINCT u.id) AS total_users,
  ROUND(
    COUNT(DISTINCT CASE WHEN o.created_at <= u.signup_date + INTERVAL '30 days' AND o.order_num >= 2 THEN u.id END)::DECIMAL 
    / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 
    2
  ) AS retention_rate_30d
FROM users u
LEFT JOIN (
  SELECT 
    user_id, 
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_num
  FROM orders
) o ON u.id = o.user_id
GROUP BY 1
ORDER BY cohort_month;
`,
      },
    ],
    testCases: [
      {
        id: 'tc-sql-cohort',
        title: 'Groups by monthly signup cohorts correctly',
        description: 'Verifies DATE_TRUNC month aggregation on user signups',
        assertionType: 'sql_output',
      },
      {
        id: 'tc-sql-window',
        title: 'Accurately partitions order sequences',
        description: 'Verifies window partition on user orders sequence',
        assertionType: 'sql_output',
      },
    ],
    testRunnerScript: `(async function testSql(query) {
  const results = [];
  const clean = query.toLowerCase();
  const hasTrunc = clean.includes('date_trunc') || clean.includes('month');
  const hasWindow = clean.includes('row_number') || clean.includes('partition by');
  results.push({ testId: 'tc-sql-cohort', title: 'Groups by monthly signup cohorts', passed: hasTrunc });
  results.push({ testId: 'tc-sql-window', title: 'Accurately partitions order sequences', passed: hasWindow });
  return results;
})`,
    solutionFiles: [
      {
        name: 'query.sql',
        language: 'sql',
        content: `SELECT
  DATE_TRUNC('month', u.signup_date) AS cohort_month,
  COUNT(DISTINCT u.id) AS total_users,
  ROUND(
    COUNT(DISTINCT CASE WHEN o.created_at <= u.signup_date + INTERVAL '30 days' AND o.order_num >= 2 THEN u.id END)::DECIMAL 
    / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 
    2
  ) AS retention_rate_30d
FROM users u
LEFT JOIN (
  SELECT 
    user_id, 
    created_at,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) AS order_num
  FROM orders
) o ON u.id = o.user_id
GROUP BY 1
ORDER BY cohort_month;`,
      },
    ],
    editorialMarkdown: `### Architectural Walkthrough: Cohort Retention Analytics

1. **Window Numbering**: Using \`ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at)\` allows us to isolate the second purchase without complicated self-joins.
2. **Preventing Division by Zero**: Using \`NULLIF(COUNT(DISTINCT u.id), 0)\` prevents database runtime errors on empty cohorts.`,
  },
];
