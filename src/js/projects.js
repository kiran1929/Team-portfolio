/**
 * projects.js — Projects Data, Dynamic Rendering & Filter Logic
 * Loaded as a standard script (no ES module syntax)
 */

var projects = [
  {
    id: 1,
    title: 'Team Agency Portfolio',
    description: 'A premium multi-section portfolio website showcasing our team, projects, and capabilities. Built with pure HTML, CSS, and Vanilla JS featuring glassmorphism and advanced animations.',
    icon: '🚀',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    status: 'completed',
    statusLabel: 'Completed',
    link: '#'
  },
  {
    id: 2,
    title: 'Interactive Quiz App',
    description: 'A dynamic quiz application with real-time scoring, animated feedback, multiple categories, leaderboards, and a progressive difficulty system.',
    icon: '🧠',
    tech: ['JavaScript', 'CSS3', 'LocalStorage'],
    status: 'completed',
    statusLabel: 'Completed',
    link: 'https://xdxnick.github.io/Quizz-App/'
  },
  {
    id: 3,
    title: 'Expense Tracker',
    description: 'Smart personal finance manager with budget goals, visual analytics via Chart.js, CSV export, and persistent data storage using localStorage.',
    icon: '💰',
    tech: ['JavaScript', 'Chart.js', 'LocalStorage'],
    status: 'completed',
    statusLabel: 'Completed',
    link: '#https://suryanjali-pandey.github.io/Smart-Expense-Tracker/'
  },
  {
    id: 4,
    title: 'Live News Feed',
    description: 'Real-time news aggregator consuming public APIs with category filters, infinite scroll, bookmarking, and offline-first caching using Service Workers.',
    icon: '📰',
    tech: ['JavaScript', 'Fetch API', 'Service Workers'],
    status: 'in-progress',
    statusLabel: 'In Progress',
    link: '#https://live-news-feed-nine.vercel.app/'
  },
  {
    id: 5,
    title: 'GitHub Developer Explorer',
    description: 'Search and explore GitHub profiles with detailed repository analytics, contribution graphs, language breakdowns, and star/fork comparisons.',
    icon: '🐙',
    tech: ['GitHub API', 'JavaScript', 'CSS Grid'],
    status: 'in-progress',
    statusLabel: 'In Progress',
    link: '#https://dipanjanmaity890.github.io/GitHub-Developer-Explorer/'
  },
  {
    id: 6,
    title: 'Kanban Task Board',
    description: 'Feature-rich project management board with drag-and-drop, custom columns, due-date reminders, priority labels, and team collaboration features.',
    icon: '📋',
    tech: ['JavaScript', 'Drag & Drop API', 'CSS3'],
    status: 'completed',
    statusLabel: 'Completed',
    link: '#https://kanban-task-board-navy.vercel.app/'
  }
];

var VIEW_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"' +
  ' stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>' +
  '<polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

function createProjectCard(project) {
  var card = document.createElement('article');
  card.className = 'project-card reveal';
  card.dataset.status = project.status;
  card.setAttribute('aria-label', 'Project: ' + project.title);
  card.setAttribute('role', 'listitem');

  var techTagsHTML = project.tech
    .map(function (t) { return '<span class="tech-tag">' + t + '</span>'; })
    .join('');

  card.innerHTML =
    '<div class="project-card-header">' +
      '<div class="project-icon-wrapper" aria-hidden="true">' + project.icon + '</div>' +
      '<span class="status-badge ' + project.status + '" role="status">' + project.statusLabel + '</span>' +
    '</div>' +
    '<h3 class="project-title">' + project.title + '</h3>' +
    '<p class="project-desc">' + project.description + '</p>' +
    '<div class="project-tech" aria-label="Technologies used">' + techTagsHTML + '</div>' +
    '<div class="project-card-footer">' +
      '<a href="' + project.link + '" class="btn-project btn-ripple"' +
        ' aria-label="View project: ' + project.title + '">' +
        VIEW_ICON_SVG + ' View Project' +
      '</a>' +
    '</div>';

  return card;
}

function renderProjects() {
  var grid = document.getElementById('projects-grid');
  if (!grid) return;

  var fragment = document.createDocumentFragment();
  projects.forEach(function (project) {
    fragment.appendChild(createProjectCard(project));
  });
  grid.appendChild(fragment);

  initProjectFilters();
}

function filterProjects(filter) {
  var cards = document.querySelectorAll('#projects-grid .project-card');
  cards.forEach(function (card) {
    var matches = filter === 'all' || card.dataset.status === filter;
    if (matches) {
      card.classList.remove('hidden');
      setTimeout(function () { card.classList.add('revealed'); }, 10);
    } else {
      card.classList.add('hidden');
      card.classList.remove('revealed');
    }
  });
}

function initProjectFilters() {
  var buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      buttons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      filterProjects(btn.dataset.filter);
    });
  });
}
