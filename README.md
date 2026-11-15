# C Studio

A lightweight, browser-based C programming environment with a Visual Studio Code-inspired layout.

**Live editor:** https://thanish2910.github.io/C-studio/

## Features

- Monaco Editor, the editor that powers VS Code
- C syntax highlighting, line numbers, minimap, indentation and editor shortcuts
- Multiple local `.c` files and an Explorer-style file list
- Run C programs through the Piston online compiler service
- Program stdin, stdout, stderr and exit status
- Download the current source file
- Autosaves open files in browser local storage
- Dark and light themes, responsive layout

## Run locally

No build step is required. Clone the repository and open `index.html` in a browser, or serve the folder with a static HTTP server:

```bash
git clone https://github.com/thanish2910/C-studio.git
cd C-studio
python -m http.server 8000
```

Then visit http://localhost:8000.

## Enable GitHub Pages

1. Open the repository's **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the `main` branch and `/ (root)` folder, then save.
4. Wait for the Pages deployment. The live editor will be available at the URL above.

## Compiler and privacy notes

C Studio is a static website. It does not run a compiler on GitHub's servers. When you press **Run**, the source code and optional stdin are sent to the public Piston API at `emkc.org` for compilation and execution. Do not submit secrets or sensitive data. Running code requires an internet connection and availability of that external service.

Editor contents are stored in your browser's local storage. They are not automatically committed or uploaded to GitHub. Use the download button to save a source file to your device.

## Keyboard shortcuts

| Shortcut | Action |
| --- | --- |
| Ctrl / Cmd + Enter | Run current file |
| Ctrl / Cmd + S | Save in browser |
| Ctrl / Cmd + N | Create a new C file |

## Tech stack

HTML, CSS, JavaScript, Monaco Editor (CDN), and the Piston API.

## License

MIT

## Topic practice arena

Open [Practice](https://thanish2910.github.io/C-studio/practice.html) to work through the starter C challenges grouped by topic: basics, conditionals, loops, arrays, functions and recursion. Each challenge includes sample tests and additional interface-hidden checks, with output comparison and local progress tracking.

**Important testing limitation:** this first version is a static GitHub Pages app. The challenge definitions and all test inputs/expected outputs are delivered to the browser, so the extra checks are not secure hidden tests and can be inspected by a user. The Piston API runs the submitted C code, while the browser compares its output. A true HackerRank-style judge with private test data, server-side scoring, accounts and leaderboards requires a trusted backend/judge service; GitHub Pages alone cannot keep test cases secret.

Practice drafts and solved status are stored in browser local storage, not synced to GitHub or other devices.


## Personal PPSC lab exam practice

The Practice page is organized around the user's PPSC lab roadmap:
- Functions: function basics, call by value, and call by address
- Recursion: printing 1 to N, sum of natural numbers, factorial, Fibonacci series, GCD, prime checking, and Pascal's triangle
- Sorting: Bubble Sort and Selection Sort
- Searching: Linear Search and Binary Search
- Matrices: addition, subtraction, multiplication, and symmetric/non-symmetric checks

The challenge set is a starter practice bank, not an official question paper or a guarantee of exam questions. Check the syllabus sheet and instructor's instructions for exact wording and any additional items.
