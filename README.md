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


## Vercel compiler backend setup

The main editor and Practice arena now call `/api/execute` on a Vercel deployment. The API proxies C execution to Judge0 CE; compiler credentials, if your Judge0 host requires them, stay in Vercel environment variables and are never sent to the browser.

1. Import `thanish2910/C-studio` into Vercel as a new project.
2. Keep the project root directory at the repository root. Vercel detects the `api/execute.js` serverless function.
3. Set the project name to `c-studio-compiler` if that Vercel project name is available.
4. In Project Settings → Environment Variables, optionally add:
   - `JUDGE0_API_URL` — Judge0 API base URL, without a trailing slash. Defaults to `https://ce.judge0.com`.
   - `JUDGE0_API_KEY` — Judge0 authentication token, only if your selected Judge0 host requires one. Store it only in Vercel; never add it to `config.js` or GitHub.
5. Deploy the project.
6. Confirm the deployment domain is `https://c-studio-compiler.vercel.app`. If Vercel assigns a different domain, update `window.C_STUDIO_API_URL` in `config.js` to that exact HTTPS origin and commit the change.
7. Redeploy the Vercel project after changing environment variables.

The API allows browser requests from the GitHub Pages origin `https://thanish2910.github.io` and local development origins `http://localhost:8000` / `http://127.0.0.1:8000`. If you use a different frontend domain, update `ALLOWED_ORIGINS` in `api/execute.js`.

The API accepts only C source code and stdin, enforces input-size limits and basic per-instance request throttling, and uses Judge0's asynchronous submission token/polling flow. The API is not a full identity or abuse-prevention system; the rate limit is best-effort per serverless instance. Do not treat it as a public multi-user judge or submit secrets in code.

Judge0's public CE host may impose availability or usage limits and may require an API key depending on its configuration. If it rejects requests, configure a Judge0 endpoint and key you are authorized to use in Vercel environment variables. See the [Judge0 submission API](https://ce.judge0.com/) for request and polling details.
