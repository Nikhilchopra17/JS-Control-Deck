# JS-Control-Deck

A vanilla JavaScript portfolio that works like a small control deck: each panel launches an independent JavaScript project inside the site.

**Live demo:** https://nikhilchopra17.github.io/JS-Control-Deck/

## What's inside

The deck currently contains seven projects:

| # | Project | What it does | Built with |
|---|---|---|---|
| 01 | **Snake Game** | Classic snake game with canvas rendering and keyboard controls. | Canvas, Game Loop, Keyboard Events |
| 02 | **Page Timer** | Tracks how long you've spent on a page. | `setInterval`, DOM, Floating UI |
| 03 | **Speech Synthesis** | Reads typed text aloud using the browser's speech API. | Web Speech API |
| 04 | **Flex Panels Gallery** | Expanding image gallery with smooth transitions. | Flexbox, CSS Transitions |
| 05 | **JS Drum Kit** | Plays drum sounds from keyboard input. | Audio API, Keyboard Events |
| 06 | **Theme Switcher** | Toggles light/dark mode and remembers the preference. | LocalStorage, CSS Variables |
| 07 | **GitHub Profile Finder** | Looks up public GitHub profile information. | Fetch API, REST |

## Stack

Nothing fancy on purpose:

- HTML5
- CSS3
- Vanilla JavaScript
- Browser APIs

There is no framework, bundler, or `node_modules`. The projects are designed to run directly in a browser.

## How it works

The main `script.js` contains a project registry. Each project has an id, title, description, tags, path, and a flag indicating whether it should open in a new tab.

Projects that work reliably inside an iframe are opened in the deck's viewer. Projects using Audio or Speech Synthesis APIs can open in a new tab because browser autoplay and permission policies can behave differently inside embedded frames.

The viewer can be closed with the Close button, the `Escape` key, or by clicking outside the modal.

## Project structure

```text
JS-Control-Deck/
├── index.html
├── style.css
├── script.js
├── README.md
├── .vscode/
└── projects/
    ├── snake-game/
    ├── page-timer/
    ├── speech-synthesis/
    ├── flex-gallery/
    ├── drum-kit/
    ├── theme-switcher/
    └── github-finder/
```

Each project is kept independent inside its own folder. Most projects contain their own `index.html`, `style.css`, and `script.js`, with additional assets where required.

## Run locally

No installation is required.

Clone the repository:

```bash
git clone https://github.com/Nikhilchopra17/JS-Control-Deck.git
cd JS-Control-Deck
```

You can open `index.html` directly in a browser. For the smoothest experience, especially with browser APIs that can be sensitive to `file://`, serve the folder locally:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Add a project

1. Create a new folder inside `projects/`.
2. Add the project's files, including an `index.html` entry point.
3. Add the project to the `projects` array in the root `script.js`:

```js
{
  id: "your-project-id",
  title: "Your Project Title",
  desc: "A short description of what it does.",
  tags: ["Tag1", "Tag2"],
  path: "projects/your-project-name/index.html",
  openInTabOnly: false
}
```

Set `openInTabOnly` to `true` for projects that need to run outside the iframe, such as projects relying on Audio or Speech Synthesis APIs.

## Deployment

The site is hosted with GitHub Pages from the `main` branch. Pushes to `main` update the live site.

## License

This repository is intended for learning and portfolio demonstration. Feel free to explore the code and learn from it, but please don't copy the entire project wholesale for your own portfolio without giving credit.
