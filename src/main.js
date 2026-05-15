import './style.css'

// Add Float Animation to CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  
  .reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

// Scroll Reveal and Nav Highlighting
function handleScroll() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const windowHeight = window.innerHeight;
  const revealVisible = 150;

  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Scroll Reveal Logic
    const elementTop = section.getBoundingClientRect().top;
    if (elementTop < windowHeight - revealVisible) {
      section.classList.add("active");
    }

    // Nav Highlighting Logic (Scroll Spy)
    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", handleScroll);

// Typewriter Logic for Greeting
const greetings = ["হ্যালো", "నమస్కారం", "नमस्ते", "こんにちは", "Hola", "Hello", "Bonjour"];
let greetIdx = 0;
let greetCharIdx = 0;
let greetIsDeleting = false;

function typeGreeting() {
  const element = document.getElementById("typewriter-greeting");
  if (!element) return;

  const currentGreet = greetings[greetIdx];
  element.textContent = currentGreet.substring(0, greetCharIdx);

  let speed = greetIsDeleting ? 100 : 150;

  if (!greetIsDeleting && greetCharIdx === currentGreet.length) {
    speed = 3000;
    greetIsDeleting = true;
  } else if (greetIsDeleting && greetCharIdx === 0) {
    greetIsDeleting = false;
    greetIdx = (greetIdx + 1) % greetings.length;
    speed = 500;
  }

  greetCharIdx += greetIsDeleting ? -1 : 1;
  setTimeout(typeGreeting, speed);
}

// Synchronized Typewriter for Roles and Icons
const roles = [
  { text: "Full Stack Developer", img: "/fullstack.png" },
  { text: "UI/UX Designer", img: "/design.png" },
  { text: "Data Analyst", img: "/analysis.png" },
  { text: "Cloud Developer", img: "/cloud.png" }
];

let roleIdx = 0;
let roleCharIdx = 0;
let roleIsDeleting = false;

function syncTypewriter() {
  const roleElement = document.getElementById("typewriter-role");
  const iconElement = document.getElementById("sync-icon");
  if (!roleElement || !iconElement) return;

  const currentRole = roles[roleIdx].text;
  roleElement.textContent = currentRole.substring(0, roleCharIdx);

  let typeSpeed = roleIsDeleting ? 80 : 150;

  if (!roleIsDeleting && roleCharIdx === currentRole.length) {
    typeSpeed = 2000;
    roleIsDeleting = true;
  } else if (roleIsDeleting && roleCharIdx === 0) {
    roleIsDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;

    // Icon Swap with Fade
    iconElement.classList.add("fade-out");
    setTimeout(() => {
      iconElement.src = roles[roleIdx].img;
      iconElement.classList.remove("fade-out");
    }, 400);

    typeSpeed = 500;
  }

  roleCharIdx += roleIsDeleting ? -1 : 1;
  setTimeout(syncTypewriter, typeSpeed);
}

// Skills Interaction Logic
const skillData = {
  web: { title: "Web Development", subs: ["Frontend Development", "Backend Development", "Responsive Design", "API Integration"] },
  uiux: { title: "UI/UX Design", subs: ["Wireframing", "Prototyping", "User Research", "Design Systems"] },
  data: { title: "Data Science", subs: ["Data Analysis", "Machine Learning", "Data Visualization", "SQL & Statistics"] },
  cloud: { title: "Cloud Development", subs: ["Cloud Deployment", "DevOps Basics", "Database Management", "Serverless Services"] },
  product: { title: "Product Design", subs: ["Problem Solving", "User Journey Mapping", "Interaction Design", "Product Strategy"] },
  agile: { title: "Agile Development", subs: ["Scrum Methodology", "Sprint Planning", "Team Collaboration", "Iterative Development"] }
};

window.showDetails = function(key) {
  const wrapper = document.getElementById('skills');
  const list = document.getElementById('panel-list');
  const title = document.getElementById('panel-title');
  const nodes = document.querySelectorAll('.skill-node');
  
  // 1. Update Content
  title.innerText = skillData[key].title;
  list.innerHTML = skillData[key].subs.map(s => `<li>${s}</li>`).join('');

  // 2. Mark Selected Node
  nodes.forEach(node => {
    node.classList.remove('selected');
    if (node.getAttribute('onclick').includes(key)) {
      node.classList.add('selected');
    }
  });

  // 3. Add Classes for Animation
  wrapper.classList.add('active-view');
  
  // 4. Draw the dotted line
  setTimeout(drawConnector, 600);
}

window.hideDetails = function() {
  const wrapper = document.getElementById('skills');
  wrapper.classList.remove('active-view');
  document.querySelectorAll('.skill-node').forEach(node => node.classList.remove('selected'));
  document.getElementById('sync-line').setAttribute('opacity', '0');
}

function drawConnector() {
  const line = document.getElementById('sync-line');

  const selectedNode =
    document.querySelector('.skill-node.selected')
    .getBoundingClientRect();

  const panel =
    document.getElementById('details-panel')
    .getBoundingClientRect();

  const section =
    document.getElementById('skills')
    .getBoundingClientRect();

  if (!line || !selectedNode || !panel) return;

  // PERFECT CENTER ALIGNMENT
  const y1 =
    (selectedNode.top + selectedNode.height / 2) - section.top;

  const y2 =
    (panel.top + panel.height / 2) - section.top;

  // Start from right edge of selected node
  const x1 =
    (selectedNode.left + selectedNode.width) - section.left;

  // End at left edge of panel
  const x2 =
    panel.left - section.left;

  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);

  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);

  line.setAttribute('opacity', '0.6');
}

// Update line on resize if active
window.addEventListener('resize', () => {
  if (document.getElementById('skills').classList.contains('active-view')) {
    drawConnector();
  }
});

// Theme Toggle Logic
function setupTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Load everything
window.addEventListener('load', () => {
  setupTheme();
  handleScroll();

  // Start animations
  typeGreeting();
  syncTypewriter();
});
