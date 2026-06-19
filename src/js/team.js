/**
 * team.js — Team Data & Dynamic Card Rendering
 * Loaded as a standard script (no ES module syntax)
 */

var teamMembers = [
  {
    id: 1,
    name: 'Suryanjali Pandey',
    role: 'Frontend Developer',
    image: './assets/images/suryanjali.png',
    bio: 'Passionate about crafting pixel-perfect UIs and seamless user experiences with modern web technologies.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React'],
    github: 'https://github.com/suryanjali-pandey',
    linkedin: 'https://www.linkedin.com/in/suryanjali-pandey-a1706b381/'
  },
  {
    id: 2,
    name: 'Dipanjan',
    role: 'UI/UX Designer',
    image: './assets/images/dipanjan.png',
    bio: 'Blending design intuition with technical precision to build interfaces that are both beautiful and functional.',
    skills: ['Figma', 'CSS3', 'JavaScript', 'Accessibility'],
    github: 'https://github.com/dipanjanmaity890',
    linkedin: 'https://www.linkedin.com/in/dipanjan-maity-bangaluru'
  },
  {
    id: 3,
    name: 'Kirandeep',
    role: 'Full Stack Developer',
    image: './assets/images/kirandeep.png',
    bio: 'Building end-to-end solutions from database architecture to polished frontends with clean, maintainable code.',
    skills: ['Node.js', 'JavaScript', 'MongoDB', 'REST APIs'],
    github: 'https://github.com/kiran1929',
    linkedin: 'https://www.linkedin.com/in/kirandeep-gudepu'
  },
  {
    id: 4,
    name: 'Anushka Paul',
    role: 'Backend Developer',
    image: './assets/images/Anushka.jpeg',
    bio: 'Specialising in robust server-side architectures, APIs, and database optimisation for high-performance apps.',
    skills: ['Python', 'Node.js', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/stellarDynamite',
    linkedin: 'https://www.linkedin.com/in/anushka-paul-182502381'
  },
  {
    id: 5,
    name: "Nikhil Tiwari",
    role: 'DevOps & Cloud',
    image: './assets/images/nikhil.png',
    bio: 'Automating deployment pipelines and scaling infrastructure so the team can ship faster with confidence.',
    skills: ['GitHub Actions', 'AWS', 'Linux', 'CI/CD'],
    github: 'https://github.com/XDxNICK',
    linkedin: 'https://www.linkedin.com/in/nikhil-tiwari-945828374?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  },
];

var GITHUB_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>';
var LINKEDIN_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';

function createTeamCard(member) {
  var card = document.createElement('article');
  card.className = 'team-card reveal';
  card.setAttribute('aria-label', member.name + ', ' + member.role);
  card.setAttribute('role', 'listitem');

  var skillTagsHTML = member.skills
    .map(function (skill) { return '<span class="skill-tag">' + skill + '</span>'; })
    .join('');

  card.innerHTML =
    '<div class="team-card-image">' +
      '<img src="' + member.image + '" alt="Portrait of ' + member.name + '" loading="lazy" width="380" height="280"' +
      ' onerror="this.src=\'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=7c3aed&color=fff&size=280\'" />' +
      '<div class="team-card-image-overlay"></div>' +
      '<div class="team-card-socials-overlay">' +
        '<a href="' + member.github + '" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="GitHub profile of ' + member.name + '">' + GITHUB_SVG.replace('14" height="14"', '18" height="18"') + '</a>' +
        '<a href="' + member.linkedin + '" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn profile of ' + member.name + '">' + LINKEDIN_SVG.replace('14" height="14"', '18" height="18"') + '</a>' +
      '</div>' +
      '<span class="team-role-badge">' + member.role + '</span>' +
    '</div>' +
    '<div class="team-card-body">' +
      '<h3 class="team-card-name">' + member.name + '</h3>' +
      '<p class="team-card-bio">' + member.bio + '</p>' +
      '<div class="team-card-skills" aria-label="Skills">' + skillTagsHTML + '</div>' +
    '</div>';

  return card;
}

function renderTeam() {
  var grid = document.getElementById('team-grid');
  if (!grid) return;

  var fragment = document.createDocumentFragment();
  teamMembers.forEach(function (member) {
    fragment.appendChild(createTeamCard(member));
  });
  grid.appendChild(fragment);
}
