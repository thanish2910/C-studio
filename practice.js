(() => {
  const topics = [
    { id:"all", name:"All topics", icon:"⌂", description:"Build your C skills one problem at a time." },
    { id:"basics", name:"C Basics", icon:"C", description:"Input, output, variables and arithmetic." },
    { id:"conditionals", name:"Conditionals", icon:"⑂", description:"Make decisions with if, else and switch." },
    { id:"loops", name:"Loops", icon:"↻", description:"Repeat work using for, while and do-while." },
    { id:"arrays", name:"Arrays", icon:"▦", description:"Store, scan and process collections of values." },
    { id:"functions", name:"Functions", icon:"ƒ", description:"Break programs into reusable functions." },
    { id:"recursion", name:"Recursion", icon:"⤴", description:"Solve problems by reducing them into smaller calls." }
  ];
  const problems = [
    {id:"sum-two",topic:"basics",title:"Add Two Numbers",difficulty:"Easy",minutes:"10 min",description:"Read two integers from standard input and print their sum. Your program should handle positive, negative and zero values.",input:"Two integers a and b separated by a space.",output:"Print one integer: a + b.",exampleIn:"12 8",exampleOut:"20",constraints:"-1,000,000 ≤ a, b ≤ 1,000,000",starter:`#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);

    // Write your solution here

    return 0;
}
`,tests:[["Sample 1","12 8","20",true],["Sample 2","-5 9","4",true],["Hidden test 1","0 0","0",false],["Hidden test 2","-100 25","-75",false],["Hidden test 3","999999 1","1000000",false]]},
    {id:"odd-even",topic:"conditionals",title:"Odd or Even",difficulty:"Easy",minutes:"10 min",description:"Read an integer n. Print EVEN if it is divisible by 2; otherwise print ODD. Consider zero and negative integers too.",input:"One integer n.",output:"Print exactly EVEN or ODD.",exampleIn:"17",exampleOut:"ODD",constraints:"-1,000,000 ≤ n ≤ 1,000,000",starter:`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // Decide whether n is odd or even

    return 0;
}
`,tests:[["Sample 1","17","ODD",true],["Sample 2","24","EVEN",true],["Hidden test 1","0","EVEN",false],["Hidden test 2","-7","ODD",false],["Hidden test 3","-12","EVEN",false]]},
    {id:"factorial",topic:"loops",title:"Factorial with a Loop",difficulty:"Easy",minutes:"15 min",description:"Given a non-negative integer n, calculate n! using a loop. Remember that 0! is 1.",input:"One integer n.",output:"Print n factorial as an integer.",exampleIn:"5",exampleOut:"120",constraints:"0 ≤ n ≤ 12",starter:`#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    // Calculate factorial using a loop

    return 0;
}
`,tests:[["Sample 1","5","120",true],["Sample 2","3","6",true],["Hidden test 1","0","1",false],["Hidden test 2","1","1",false],["Hidden test 3","10","3628800",false]]},
    {id:"array-maximum",topic:"arrays",title:"Find the Maximum",difficulty:"Easy",minutes:"15 min",description:"Read n integers into an array and print the largest value. Do not assume that all values are positive.",input:"First line: n. Second line: n space-separated integers.",output:"Print the maximum element.",exampleIn:"5\n-4 12 7 0 9",exampleOut:"12",constraints:"1 ≤ n ≤ 100; -100,000 ≤ each value ≤ 100,000",starter:`#include <stdio.h>

int main(void) {
    int n, a[100];
    scanf("%d", &n);

    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }

    // Find and print the maximum

    return 0;
}
`,tests:[["Sample 1","5\n-4 12 7 0 9","12",true],["Sample 2","3\n2 2 1","2",true],["Hidden test 1","1\n-99","-99",false],["Hidden test 2","4\n-8 -2 -15 -4","-2",false],["Hidden test 3","6\n5 90 12 90 3 1","90",false]]},
    {id:"function-sum",topic:"functions",title:"Create an Add Function",difficulty:"Medium",minutes:"20 min",description:"Write a function named add that accepts two integers and returns their sum. Call the function from main and print the returned value.",input:"Two integers a and b separated by a space.",output:"Print the sum returned by add(a, b).",exampleIn:"30 45",exampleOut:"75",constraints:"-1,000,000 ≤ a, b ≤ 1,000,000. Implement and call a separate add function.",starter:`#include <stdio.h>

// Define int add(int a, int b) here

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);

    // Call add and print its result

    return 0;
}
`,tests:[["Sample 1","30 45","75",true],["Sample 2","-8 3","-5",true],["Hidden test 1","0 0","0",false],["Hidden test 2","100000 -100000","0",false],["Hidden test 3","123 456","579",false]]},
    {id:"fibonacci-recursive",topic:"recursion",title:"Fibonacci Number",difficulty:"Medium",minutes:"25 min",description:"Find the n-th Fibonacci number using recursion. Use F(0) = 0 and F(1) = 1. Each later term is the sum of the previous two terms.",input:"One integer n.",output:"Print F(n).",exampleIn:"7",exampleOut:"13",constraints:"0 ≤ n ≤ 20. Use a recursive function to calculate the result.",starter:`#include <stdio.h>

// Write a recursive Fibonacci function

int main(void) {
    int n;
    scanf("%d", &n);

    // Print the n-th Fibonacci number

    return 0;
}
`,tests:[["Sample 1","7","13",true],["Sample 2","5","5",true],["Hidden test 1","0","0",false],["Hidden test 2","1","1",false],["Hidden test 3","10","55",false]]}
  ];
  const $ = id => document.getElementById(id);
  let selectedTopic = "all";
  let selectedProblem = null;
  let editor = null;
  let busy = false;
  const drafts = loadObject("c-studio-practice-drafts");
  const solved = new Set(loadArray("c-studio-practice-solved"));

  function loadObject(key){try{return JSON.parse(localStorage.getItem(key)||"{}")}catch(_){return {}}}
  function loadArray(key){try{return JSON.parse(localStorage.getItem(key)||"[]")}catch(_){return []}}
  function saveProgress(){try{localStorage.setItem("c-studio-practice-solved",JSON.stringify([...solved]))}catch(_){};updateProgress()}
  function updateProgress(){
    $("solved-count").textContent = solved.size + " / " + problems.length;
    $("progress-fill").style.width = (solved.size/problems.length*100) + "%";
    $("progress-caption").textContent = solved.size===problems.length ? "All starter challenges completed!" : solved.size ? "Keep going — you're making progress." : "Start your first challenge";
  }
  function renderTopics(){
    $("topic-list").innerHTML="";
    topics.forEach(topic=>{
      const count=topic.id==="all"?problems.length:problems.filter(p=>p.topic===topic.id).length;
      const b=document.createElement("button");
      b.className="topic-button"+(selectedTopic===topic.id?" active":"");
      b.innerHTML='<span class="topic-symbol"></span><span></span><span class="topic-count"></span>';
      b.children[0].textContent=topic.icon;b.children[1].textContent=topic.name;b.children[2].textContent=count;
      b.addEventListener("click",()=>{selectedTopic=topic.id;renderTopics();renderChallenges();$("topic-heading").textContent=topic.name;$("topic-description").textContent=topic.description});
      $("topic-list").append(b);
    });
  }
  function renderChallenges(){
    const shown=selectedTopic==="all"?problems:problems.filter(p=>p.topic===selectedTopic);
    $("problem-count").textContent=shown.length+" problem"+(shown.length===1?"":"s");
    $("challenge-list").innerHTML="";
    shown.forEach(p=>{
      const b=document.createElement("button");
      b.className="challenge-card"+(selectedProblem?.id===p.id?" active":"");
      b.innerHTML='<div class="challenge-card-title"><span></span><span class="solved-mark"></span></div><div class="challenge-card-meta"><span class="difficulty"></span><span></span></div>';
      b.children[0].children[0].textContent=p.title;
      b.children[0].children[1].textContent=solved.has(p.id)?"✓ Solved":"";
      b.children[1].children[0].textContent=p.difficulty;b.children[1].children[0].className="difficulty "+p.difficulty.toLowerCase();
      b.children[1].children[1].textContent=p.minutes;
      b.addEventListener("click",()=>openProblem(p));
      $("challenge-list").append(b);
    });
  }
  function openProblem(p){
    if(editor){drafts[selectedProblem.id]=editor.getValue();saveDrafts()}
    selectedProblem=p;renderChallenges();
    const saved=drafts[p.id]||p.starter;
    const ws=$("problem-workspace");
    ws.innerHTML=`<div class="problem-detail">
      <div class="problem-description">
        <div class="problem-title-row"><h2></h2><span class="difficulty"></span></div>
        <p class="problem-text"></p>
        <h3>INPUT FORMAT</h3><div class="input-format"></div>
        <h3>OUTPUT FORMAT</h3><div class="output-format"></div>
        <h3>EXAMPLE</h3><div class="example-box"></div>
        <div class="constraints"></div>
      </div>
      <div class="editor-heading"><span>◉ &nbsp; SOLUTION.C</span><div class="editor-actions"><button class="small-action" id="reset-code">Reset code</button></div></div>
      <div class="challenge-editor"><div id="challenge-code"><div class="editor-loading">Loading editor…</div></div></div>
      <div class="submit-row"><button class="small-action" id="run-samples">Run sample tests</button><button class="submit-button" id="submit-all">Submit solution →</button><span id="submission-status" class="result-note"></span></div>
      <div class="test-output"><div class="test-heading"><strong>TEST RESULTS</strong><span id="test-counter">Not run yet</span></div><div id="test-results" class="test-results"><div class="result-note">Run your code to see individual test results.</div></div><div id="result-summary" class="result-summary"></div><div class="result-note">Hidden tests check additional edge cases. Their input and expected output stay concealed.</div></div>
    </div>`;
    ws.querySelector("h2").textContent=p.title;
    ws.querySelector(".difficulty").textContent=p.difficulty;
    ws.querySelector(".difficulty").className="difficulty "+p.difficulty.toLowerCase();
    ws.querySelector(".problem-text").textContent=p.description;
    ws.querySelector(".input-format").textContent=p.input;
    ws.querySelector(".output-format").textContent=p.output;
    ws.querySelector(".example-box").textContent="Input\n"+p.exampleIn+"\n\nOutput\n"+p.exampleOut;
    ws.querySelector(".constraints").textContent="Constraints: "+p.constraints;
    $("run-samples").addEventListener("click",()=>runTests(false));
    $("submit-all").addEventListener("click",()=>runTests(true));
    $("reset-code").addEventListener("click",()=>{if(editor)editor.setValue(p.starter);drafts[p.id]=p.starter;saveDrafts()});
    if(window.monaco){mountEditor(saved)}else{require.config({paths:{vs:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs"}});window.MonacoEnvironment={getWorkerUrl:()=> 'data:text/javascript;charset=utf-8,'+encodeURIComponent('self.MonacoEnvironment={baseUrl:"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/"};importScripts("https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/base/worker/workerMain.js");')};require(["vs/editor/editor.main"],()=>mountEditor(saved))}
  }
  function mountEditor(value){
    if(!selectedProblem)return;
    const host=$("challenge-code");if(!host)return;
    if(editor){editor.dispose();editor=null}
    host.innerHTML="";
    editor=monaco.editor.create(host,{value,language:"cpp",theme:"vs-dark",automaticLayout:true,fontSize:13,fontFamily:"Consolas, monospace",minimap:{enabled:false},scrollBeyondLastLine:false,tabSize:4,insertSpaces:true,lineNumbers:"on",padding:{top:10}});
    editor.onDidChangeModelContent(()=>{if(selectedProblem){drafts[selectedProblem.id]=editor.getValue();saveDrafts()}});
  }
  function saveDrafts(){try{localStorage.setItem("c-studio-practice-drafts",JSON.stringify(drafts))}catch(_){}}
  function normalize(s){return String(s??"").replace(/\r/g,"").trim().split("\n").map(x=>x.trimEnd()).join("\n")}
  async function execute(code,input){
    const response=await fetch("https://emkc.org/api/v2/piston/execute",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({language:"c",version:"10.2.0",files:[{name:"solution.c",content:code}],stdin:input,compile_timeout:10000,run_timeout:5000,run_memory_limit:128000000})});
    if(!response.ok)throw new Error("Compiler service returned HTTP "+response.status);
    const data=await response.json();
    if(data.compile?.code!==0 || data.compile?.stderr) return {error:data.compile?.stderr||data.compile?.stdout||"Compilation failed"};
    const run=data.run||{};
    if(run.code!==0)return {error:run.stderr||("Program exited with code "+run.code),stdout:run.stdout||""};
    return {stdout:run.stdout||"",stderr:run.stderr||""};
  }
  async function runTests(all){
    if(busy||!editor||!selectedProblem)return;
    busy=true;
    const p=selectedProblem,code=editor.getValue();
    drafts[p.id]=code;saveDrafts();
    const tests=p.tests.filter(t=>all||t[3]);
    const button=$(all?"submit-all":"run-samples");button.disabled=true;
    $("run-samples").disabled=true;$("submit-all").disabled=true;
    $("submission-status").textContent="Running…";
    $("test-results").innerHTML="";
    $("result-summary").textContent="";
    let passed=0;
    try{
      for(let i=0;i<tests.length;i++){
        const t=tests[i];let result,ok=false,detail="";
        try{result=await execute(code,t[1]);if(result.error){detail=result.error}else{ok=normalize(result.stdout)===normalize(t[2]);if(!ok)detail="Output did not match expected result."}}
        catch(e){detail=e.message}
        if(ok)passed++;
        const row=document.createElement("div");
        row.className="test-result "+(ok?"pass":"fail");
        const state=document.createElement("span");state.className="test-state";state.textContent=ok?"PASS":"FAIL";
        const name=document.createElement("span");name.className="test-name";name.textContent=t[3]?t[0]:("Hidden test "+(i+1-tests.filter(x=>x[3]).length));
        const time=document.createElement("span");time.className="test-time";time.textContent=ok?"Output matched":"Needs review";
        row.append(state,name,time);
        if(!ok){const info=document.createElement("div");info.className="result-note";info.textContent=detail;row.append(info)}
        $("test-results").append(row);
        $("test-counter").textContent=(i+1)+" / "+tests.length+" checked";
      }
      const allPassed=passed===tests.length;
      $("result-summary").innerHTML=allPassed?'<strong>All '+passed+' tests passed!</strong> Great work.':passed+" of "+tests.length+" tests passed. Review your logic and try again.";
      $("submission-status").textContent=allPassed&&all?"Accepted": "Completed";
      if(all&&allPassed){solved.add(p.id);saveProgress();renderChallenges()}
    }finally{
      busy=false;$("run-samples").disabled=false;$("submit-all").disabled=false;
    }
  }
  renderTopics();renderChallenges();updateProgress();
})();