// ---- Project registry ----
// `path` should point to each project's own index.html inside /projects/<folder>/
// `openInTabOnly: true` is recommended for projects using Audio/SpeechSynthesis APIs
// that can behave unreliably inside an iframe due to autoplay/permission policies.

const projects = [
  {
    id: "snake-game",
    title: "Snake Game",
    desc: "Classic snake built with vanilla JS — canvas rendering, keyboard controls, and a game loop.",
    tags: ["Canvas", "Game Loop", "Keyboard Events"],
    path: "projects/snake-game/index.html",
    openInTabOnly: false
  },
  {
    id: "page-timer",
    title: "Page Timer",
    desc: "Floating widget that tracks and displays how long you've spent on the page in real time.",
    tags: ["setInterval", "DOM", "Floating UI"],
    path: "projects/page-timer/index.html",
    openInTabOnly: false
  },
  {
    id: "speech-synthesis",
    title: "Speech Synthesis",
    desc: "Text-to-speech tool powered by the browser's native Web Speech API.",
    tags: ["Web Speech API"],
    path: "projects/speech-synthesis/index.html",
    openInTabOnly: true
  },
  {
    id: "flex-gallery",
    title: "Flex Panels Gallery",
    desc: "Expanding image gallery built with Flexbox and smooth CSS transitions.",
    tags: ["Flexbox", "CSS Transitions"],
    path: "projects/flex-gallery/index.html",
    openInTabOnly: false
  },
  {
    id: "drum-kit",
    title: "JS Drum Kit",
    desc: "Keyboard-triggered drum machine with real-time sound playback.",
    tags: ["Audio API", "Keyboard Events"],
    path: "projects/drum-kit/index.html",
    openInTabOnly: true
  },
  {
    id: "theme-switcher",
    title: "Theme Switcher",
    desc: "Light/dark mode toggle with the user's preference saved across visits.",
    tags: ["LocalStorage", "CSS Variables"],
    path: "projects/theme-switcher/index.html",
    openInTabOnly: false
  },
  {
    id: "github-finder",
    title: "GitHub Profile Finder",
    desc: "Looks up and displays any GitHub user's public profile data via the GitHub REST API.",
    tags: ["Fetch API", "REST"],
    path: "projects/github-finder/index.html",
    openInTabOnly: false
  }
];

// ---- Render panels ----
const board = document.getElementById("board");

projects.forEach((p, i) => {
  const panel = document.createElement("article");
  panel.className = "panel";
  panel.tabIndex = 0;
  panel.setAttribute("role", "button");
  panel.setAttribute("aria-label", `Open ${p.title}`);

  panel.innerHTML = `
    <div class="panel-top">
      <span class="panel-index">${String(i + 1).padStart(2, "0")} / SWITCH</span>
      <span class="switch"></span>
    </div>
    <h2 class="panel-title">${p.title}</h2>
    <p class="panel-desc">${p.desc}</p>
    <div class="panel-tags">
      ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
    </div>
    <button class="panel-launch">
      <span>${p.openInTabOnly ? "Open in new tab" : "Launch panel"}</span>
      <span>→</span>
    </button>
  `;

  const launch = () => openProject(p, panel);
  panel.addEventListener("click", launch);
  panel.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      launch();
    }
  });

  board.appendChild(panel);
});

// ---- Viewer (modal) logic ----
const viewer = document.getElementById("viewer");
const viewerFrame = document.getElementById("viewerFrame");
const viewerTitle = document.getElementById("viewerTitle");
const viewerOpenTab = document.getElementById("viewerOpenTab");
const viewerClose = document.getElementById("viewerClose");

let activePanel = null;

function openProject(project, panelEl) {
  // Audio/Speech-API projects: open in a real tab instead of an iframe,
  // since autoplay/permission policies are unreliable inside embedded frames.
  if (project.openInTabOnly) {
    window.open(project.path, "_blank", "noopener");
    return;
  }

  if (activePanel) activePanel.classList.remove("active");
  activePanel = panelEl;
  panelEl.classList.add("active");

  viewerTitle.textContent = project.title;
  viewerOpenTab.href = project.path;
  viewerFrame.src = project.path;

  viewer.classList.add("open");
  viewer.setAttribute("aria-hidden", "false");
  viewerClose.focus();
}

function closeViewer() {
  viewer.classList.remove("open");
  viewer.setAttribute("aria-hidden", "true");
  viewerFrame.src = "about:blank";
  if (activePanel) {
    activePanel.classList.remove("active");
    activePanel.focus();
    activePanel = null;
  }
}

viewerClose.addEventListener("click", closeViewer);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && viewer.classList.contains("open")) closeViewer();
});

viewer.addEventListener("click", e => {
  if (e.target === viewer) closeViewer();
});
