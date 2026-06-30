# JS-Control-Deck
JS Control Deck

I wanted a portfolio that didn't feel like a static list of links, so I built this instead — a little "control deck" where each panel is its own JavaScript project. Click one and it powers up in a viewer, right inside the page. No frameworks, no build tools, just plain HTML/CSS/JS.

Live demo: https://nikhilchopra17.github.io/JS-Control-Deck/

What's in here

Each panel is a separate project living in its own folder under /projects, so they're all completely independent of each other. Clicking a panel pulls it up in a modal viewer using an iframe — that way you can play around with it without ever leaving the deck. A couple of the projects (the ones using Audio or Speech APIs) pop open in a new tab instead, since those APIs get weird and unreliable when they're stuck inside an iframe.


| # | Project | What it does | Built with |
|---|---------|---------------|------------|
| 01 | **Snake Game** | Classic snake, rebuilt from scratch with canvas and keyboard controls. | Canvas, Game Loop, Keyboard Events |
| 02 | **Page Timer** | A little floating widget that counts how long you've been on the page. | `setInterval`, DOM, Floating UI |
| 03 | **Speech Synthesis** | Type something and have the browser read it back to you. | Web Speech API |
| 04 | **Flex Panels Gallery** | An image gallery that expands smoothly using nothing but Flexbox. | Flexbox, CSS Transitions |
| 05 | **JS Drum Kit** | Hit keys on your keyboard, hear drum sounds play instantly. | Audio API, Keyboard Events |
| 06 | **Theme Switcher** | Toggle light/dark mode, and it remembers your choice next time. | LocalStorage, CSS Variables |
| 07 | **GitHub Profile Finder** | Type a GitHub username, pull up their public profile info. | Fetch API, REST |

Stack
Nothing fancy on purpose — just:
-HTML5
-CSS3 (custom properties, Flexbox, Grid, a few transitions)
-Vanilla JavaScript

No React, no bundler, no node_modules. Open the file and it just runs.

How it's organized

js-portfolio/
├── index.html              # the main deck page
├── style.css                # global styles + the viewer modal
├── script.js                 # project list + viewer logic
├── preview.png                # screenshot for this README (optional)
└── projects/
    ├── snake-game/
    │   ├── index.html
    │   ├── style.css
    │   └── script.js
    ├── page-timer/
    ├── speech-synthesis/
    ├── flex-gallery/
    ├── drum-kit/
    ├── theme-switcher/
    └── github-finder/

How it actually works

The whole thing is driven by one array in script.js — each project gets an id, a title, a description, some tags, a path to its index.html, and a flag for whether it should open in a new tab instead of the viewer. The board renders all the panels from that array on page load, so adding a new project is mostly just adding one more entry to the list (more on that below).

When you click a panel, it either:
-loads the project into the shared iframe and pops the viewer open, or
-opens it in a fresh tab, if it's one of the audio/speech projects.


You can close the viewer with the Close button, hit Escape, or just click outside the modal.

Running it yourself
No install, no setup:

bashgit clone https://github.com/Nikhilchopra17/JS-Control-Deck.git
cd JS-Control-Deck

You can just open index.html directly in a browser, but for the smoothest experience I'd serve it locally instead (some browser APIs are picky about file://):

bash
python -m http.server 8000

then visit http://localhost:8000.

Deployment

Hosted with GitHub Pages straight off the main branch — push to main and the live site updates a minute or two later.

Adding your own project to the deck

1)Drop a new folder into /projects/your-project-name/ with its own index.html, style.css, and script.js.
2)Add it to the projects array in the root script.js:


js{
  id: "your-project-id",
  title: "Your Project Title",
  desc: "A short description of what it does.",
  tags: ["Tag1", "Tag2"],
  path: "projects/your-project-name/index.html",
  openInTabOnly: false // true if it uses Audio/Speech APIs
}


3)That's it — the panel shows up on the board automatically.

License

Feel free to poke around and learn from the code, but please don't lift it wholesale for your own portfolio without giving credit.
License

Feel free to poke around and learn from the code, but please don't lift it wholesale for your own portfolio without giving credit.
