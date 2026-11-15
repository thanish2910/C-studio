(() => {
  const starter = `#include <stdio.h>

int main(void) {
    printf("Hello, C Studio!\\n");
    return 0;
}
`;
  const files = new Map([["main.c", starter]]);
  let activeFile = "main.c";
  let editor;
  let dark = true;
  const $ = (id) => document.getElementById(id);
  const output = $("terminal-output");
  const status = $("run-status");

  function showOutput(text, kind = "") {
    output.textContent = text;
    output.className = kind;
  }
  function persist() {
    if (editor) files.set(activeFile, editor.getValue());
    try { localStorage.setItem("c-studio-files", JSON.stringify([...files])); } catch (_) {}
  }
  function restore() {
    try {
      const saved = JSON.parse(localStorage.getItem("c-studio-files") || "null");
      if (Array.isArray(saved) && saved.length) {
        files.clear();
        saved.forEach(([name, code]) => { if (typeof name === "string" && typeof code === "string") files.set(name, code); });
        if (!files.has("main.c")) files.set("main.c", starter);
      }
    } catch (_) {}
  }
  function renderFiles() {
    const list = $("file-list");
    list.innerHTML = "";
    for (const name of files.keys()) {
      const button = document.createElement("button");
      button.className = "file-entry" + (name === activeFile ? " selected" : "");
      button.innerHTML = '<span class="c-icon">C</span>';
      button.append(document.createTextNode(" " + name));
      button.addEventListener("click", () => openFile(name));
      list.append(button);
    }
    $("breadcrumb-file").textContent = activeFile;
    $("tabs").innerHTML = "";
    const tab = document.createElement("button");
    tab.className = "tab active";
    tab.innerHTML = '<span class="c-icon">C</span>';
    tab.append(document.createTextNode(" " + activeFile));
    $("tabs").append(tab);
  }
  function openFile(name) {
    if (!files.has(name)) return;
    persist();
    activeFile = name;
    editor.setValue(files.get(name));
    renderFiles();
  }
  function newFile() {
    const raw = prompt("New C file name:", "program.c");
    if (!raw) return;
    const name = raw.trim().replace(/[^a-zA-Z0-9_.-]/g, "-");
    if (!name || !name.endsWith(".c")) { alert("Please use a .c filename."); return; }
    if (files.has(name)) { openFile(name); return; }
    files.set(name, "#include <stdio.h>\n\nint main(void) {\n    \n    return 0;\n}\n");
    openFile(name);
    persist();
  }
  function downloadFile() {
    persist();
    const blob = new Blob([files.get(activeFile)], { type: "text/x-csrc;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = activeFile; a.click();
    URL.revokeObjectURL(url);
  }
  async function runCode() {
    persist();
    const code = files.get(activeFile);
    if (!code.trim()) { showOutput("Your file is empty."); return; }
    const apiBase = (window.C_STUDIO_API_URL || "").replace(new RegExp("/+$"), "");
    if (!apiBase) { showOutput("Compiler backend is not configured yet. Check config.js.", "output-error"); return; }
    $("run-button").disabled = true;
    status.textContent = "Compiling…";
    showOutput("Submitting " + activeFile + " to the C compiler…");
    try {
      const created = await fetch(apiBase + "/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_code: code, stdin: $("stdin-input").value })
      });
      const createdData = await created.json().catch(() => ({}));
      if (!created.ok) throw new Error(createdData.error || ("Compiler backend returned HTTP " + created.status));
      if (!createdData.token) throw new Error("Compiler backend did not return a submission token.");
      let result = null;
      for (let attempt = 0; attempt < 14; attempt++) {
        if (attempt) await new Promise(resolve => setTimeout(resolve, 650));
        const response = await fetch(apiBase + "/api/execute?token=" + encodeURIComponent(createdData.token));
        result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.error || ("Could not retrieve compiler result (HTTP " + response.status + ")"));
        if (result.status?.id === 1 || result.status?.id === 2) continue;
        break;
      }
      if (!result || result.status?.id === 1 || result.status?.id === 2) throw new Error("The compiler queue is taking longer than expected. Please try again.");
      const details = [result.compile_output, result.stderr, result.message].filter(Boolean);
      if (result.status?.id !== 3) {
        showOutput(details.join("\\n") || result.status?.description || "Program did not finish successfully.", "output-error");
        status.textContent = result.status?.description || "Run failed";
      } else {
        const parts = [result.stdout || "(Program finished with no output.)"];
        if (result.time) parts.push("\\n[Execution time: " + result.time + "s]");
        showOutput(parts.join(""), "output-success");
        status.textContent = "Finished";
      }
    } catch (error) {
      showOutput("Could not run the program.\\n" + error.message, "output-error");
      status.textContent = "Run failed";
    } finally {
      $("run-button").disabled = false;
    }
  }
  restore();
  if (!files.has("main.c")) files.set("main.c", starter);
  if (!files.has(activeFile)) activeFile = "main.c";
  require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
  window.MonacoEnvironment = { getWorkerUrl: () => "data:text/javascript;charset=utf-8," + encodeURIComponent('self.MonacoEnvironment={baseUrl:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/"};importScripts("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/base/worker/workerMain.js");') };
  require(["vs/editor/editor.main"], () => {
    $("editor").innerHTML = "";
    editor = monaco.editor.create($("editor"), {
      value: files.get(activeFile),
      language: "cpp",
      theme: "vs-dark",
      automaticLayout: true,
      fontSize: 14,
      fontFamily: "Consolas, 'Courier New', monospace",
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      wordWrap: "off",
      tabSize: 4,
      insertSpaces: true,
      lineNumbers: "on",
      renderWhitespace: "selection",
      suggestOnTriggerCharacters: true,
      quickSuggestions: true,
      padding: { top: 12 }
    });
    editor.onDidChangeModelContent(() => {
      files.set(activeFile, editor.getValue());
      $("cursor-position").textContent = "Ln " + (editor.getPosition()?.lineNumber || 1) + ", Col " + (editor.getPosition()?.column || 1);
    });
    editor.onDidChangeCursorPosition(e => {
      $("cursor-position").textContent = "Ln " + e.position.lineNumber + ", Col " + e.position.column;
    });
    renderFiles();
  });
  $("run-button").addEventListener("click", runCode);
  $("save-button").addEventListener("click", () => { persist(); status.textContent = "Saved in this browser"; });
  $("download-button").addEventListener("click", downloadFile);
  $("new-file-activity").addEventListener("click", newFile);
  $("clear-terminal").addEventListener("click", () => showOutput(""));
  $("hide-terminal").addEventListener("click", () => $("terminal-panel").classList.toggle("hidden"));
  $("collapse-sidebar").addEventListener("click", () => $("sidebar").classList.toggle("hidden"));
  $("theme-toggle").addEventListener("click", () => {
    dark = !dark;
    document.body.classList.toggle("light", !dark);
    if (window.monaco && editor) monaco.editor.setTheme(dark ? "vs-dark" : "vs");
  });
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); runCode(); }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); persist(); status.textContent = "Saved in this browser"; }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") { e.preventDefault(); newFile(); }
  });
})();