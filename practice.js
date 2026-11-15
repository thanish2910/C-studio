(() => {
  const topics = [
    {id:"all",name:"All lab problems",icon:"⌂",description:"Your PPSC lab internal practice bank."},
    {id:"functions",name:"Functions",icon:"ƒ",description:"Function basics, call by value and call by address."},
    {id:"recursion",name:"Recursion",icon:"↻",description:"Practise the recursive programs from your lab list."},
    {id:"sorting",name:"Sorting",icon:"⇅",description:"Bubble sort and selection sort."},
    {id:"searching",name:"Searching",icon:"⌕",description:"Linear search and binary search."},
    {id:"matrices",name:"Matrices",icon:"▦",description:"Matrix arithmetic and symmetric matrix checks."}
  ];
  const make = (id,topic,title,difficulty,description,input,output,exampleIn,exampleOut,starter,tests,constraints="Follow the input and output format exactly.") => ({id,topic,title,difficulty,minutes:"15 min",description,input,output,exampleIn,exampleOut,constraints,starter,tests});
  const tests = (a,b,c,d,e) => [["Sample 1",a,b,true],["Sample 2",c,d,true],["Hidden test 1",e[0],e[1],false],["Hidden test 2",e[2],e[3],false]];
  const problems = [
    make("function-basic","functions","Create and Call a Function","Easy","Write a function named display that prints the word Welcome. Call it from main.","No input.","Print Welcome.","","Welcome",`#include <stdio.h>

void display(void) {
    // Print Welcome
}

int main(void) {
    // Call display
    return 0;
}
`,tests("","Welcome","","Welcome",["","Welcome","","Welcome"])),
    make("call-value","functions","Call by Value","Easy","Pass an integer to a function by value. Increase the parameter inside the function, then print the original variable in main. Observe that the original value does not change.","One integer n.","Print the original n after the function call.","10","10",`#include <stdio.h>

void change(int x) {
    // Increase x
}

int main(void) {
    int n;
    scanf("%d", &n);
    change(n);
    printf("%d\\n", n);
    return 0;
}
`,tests("10","10","-4","-4",["0","0","25","25"]),"Use a separate function with an integer parameter."),
    make("call-address","functions","Call by Address","Medium","Pass the address of an integer to a function using a pointer parameter. Increase the value through the pointer and print the changed value in main.","One integer n.","Print n after the function changes it.","10","11",`#include <stdio.h>

void change(int *x) {
    // Change the value through x
}

int main(void) {
    int n;
    scanf("%d", &n);
    change(&n);
    printf("%d\\n", n);
    return 0;
}
`,tests("10","11","-4","-3",["0","1","99","100"]),"Use a pointer parameter and pass the address of n."),
    make("rec-print","recursion","Print 1 to N","Easy","Use a recursive function to print all integers from 1 through n in ascending order, separated by spaces.","One positive integer n.","Print 1 through n.","5","1 2 3 4 5",`#include <stdio.h>

void printNumbers(int n) {
    // Write the recursive function
}

int main(void) {
    int n;
    scanf("%d", &n);
    printNumbers(n);
    return 0;
}
`,tests("5","1 2 3 4 5","3","1 2 3",["1","1","7","1 2 3 4 5 6 7"])),
    make("rec-sum","recursion","Sum of First N Natural Numbers","Easy","Find the sum 1 + 2 + ... + n using recursion.","One positive integer n.","Print the sum.","5","15",`#include <stdio.h>

int sum(int n) {
    // Base case and recursive case
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", sum(n));
    return 0;
}
`,tests("5","15","10","55",["1","1","7","28"])),
    make("rec-factorial","recursion","Factorial Using Recursion","Easy","Calculate n factorial using a recursive function. Remember that 0! is 1.","One integer n.","Print n factorial.","5","120",`#include <stdio.h>

long long factorial(int n) {
    // Write the recursive function
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", factorial(n));
    return 0;
}
`,tests("5","120","0","1",["1","1","7","5040"]),"0 ≤ n ≤ 12."),
    make("rec-fibonacci","recursion","Fibonacci Series Using Recursion","Medium","Display the first n terms of the Fibonacci series using a recursive function. The series starts 0, 1, 1, 2, 3, ...","One integer n, the number of terms.","Print n terms separated by spaces.","7","0 1 1 2 3 5 8",`#include <stdio.h>

int fib(int n) {
    // Base cases and recursive case
}

int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) {
        printf("%d ", fib(i));
    }
    return 0;
}
`,tests("7","0 1 1 2 3 5 8","5","0 1 1 2 3",["1","0","8","0 1 1 2 3 5 8 13"]),"1 ≤ n ≤ 20."),
    make("rec-gcd","recursion","GCD Using Recursion","Medium","Find the greatest common divisor of two positive integers using the recursive Euclidean algorithm.","Two positive integers a and b.","Print their GCD.","48 18","6","" + `#include <stdio.h>

int gcd(int a, int b) {
    // Use the recursive Euclidean algorithm
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", gcd(a, b));
    return 0;
}
`,tests("48 18","6","20 8","4",["7 3","1","100 25","25"])),
    make("rec-prime","recursion","Prime Check Using Recursion","Medium","Check whether a positive integer is prime using a recursive helper function. Print PRIME or NOT PRIME.","One integer n.","Print PRIME or NOT PRIME.","17","PRIME",`#include <stdio.h>

// Write a recursive function to test divisors

int main(void) {
    int n;
    scanf("%d", &n);
    // Print PRIME or NOT PRIME
    return 0;
}
`,tests("17","PRIME","12","NOT PRIME",["1","NOT PRIME","2","PRIME"]),"1 ≤ n ≤ 100000."),
    make("rec-pascal","recursion","Pascal's Triangle","Medium","Display Pascal's triangle for n rows. Use a recursive factorial function to calculate each binomial coefficient.","One integer n, the number of rows.","Print each row on a new line, with values separated by spaces.","4","1\n1 1\n1 2 1\n1 3 3 1",`#include <stdio.h>

long long fact(int n) {
    // Recursive factorial
}

int main(void) {
    int n;
    scanf("%d", &n);
    // Print Pascal's triangle
    return 0;
}
`,tests("4","1\n1 1\n1 2 1\n1 3 3 1","3","1\n1 1\n1 2 1",["1","1","5","1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1"]),"1 ≤ n ≤ 10."),
    make("bubble-sort","sorting","Bubble Sort","Easy","Read n integers, sort them in ascending order using Bubble Sort, and print the sorted array.","First line: n. Second line: n integers.","Print the sorted values separated by spaces.","5\n5 1 4 2 8","1 2 4 5 8",`#include <stdio.h>

int main(void) {
    int n, a[100];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    // Implement Bubble Sort
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    return 0;
}
`,tests("5\n5 1 4 2 8","1 2 4 5 8","4\n4 3 2 1","1 2 3 4",["1\n-5","-5","3\n2 2 1","1 2 2"])),
    make("selection-sort","sorting","Selection Sort","Easy","Read n integers, arrange them in ascending order using Selection Sort, and print the result.","First line: n. Second line: n integers.","Print the sorted values separated by spaces.","5\n64 25 12 22 11","11 12 22 25 64",`#include <stdio.h>

int main(void) {
    int n, a[100];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    // Implement Selection Sort
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    return 0;
}
`,tests("5\n64 25 12 22 11","11 12 22 25 64","4\n3 1 4 2","1 2 3 4",["1\n8","8","3\n-2 0 -1","-2 -1 0"])),
    make("linear-search","searching","Linear Search","Easy","Search for a key in an array using Linear Search. Print the zero-based index of its first occurrence, or -1 if it is absent.","First line: n. Second line: n integers. Third line: key.","Print the zero-based index or -1.","5\n4 2 7 1 9\n7","2",`#include <stdio.h>

int main(void) {
    int n, a[100], key, pos = -1;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &key);
    // Implement Linear Search
    printf("%d\\n", pos);
    return 0;
}
`,tests("5\n4 2 7 1 9\n7","2","4\n3 5 8 9\n2","-1",["1\n6\n6","0","3\n2 2 4\n2","0"])),
    make("binary-search","searching","Binary Search","Medium","Given a sorted array, find the zero-based index of key using Binary Search. Print -1 if it is not present.","First line: n. Second line: n sorted integers. Third line: key.","Print the zero-based index or -1.","5\n1 3 5 7 9\n7","3",`#include <stdio.h>

int main(void) {
    int n, a[100], key, low, high, mid, pos = -1;
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &key);
    // Implement Binary Search
    printf("%d\\n", pos);
    return 0;
}
`,tests("5\n1 3 5 7 9\n7","3","4\n2 4 6 8\n2","0",["1\n10\n10","0","5\n1 2 3 4 5\n6","-1"])),
    make("matrix-add","matrices","Matrix Addition","Easy","Read two matrices of the same order r × c and print their sum.","First line: r c. Next r lines: matrix A. Next r lines: matrix B.","Print the resulting matrix, one row per line.","2 2\n1 2\n3 4\n5 6\n7 8","6 8\n10 12",`#include <stdio.h>

int main(void) {
    int r, c, a[10][10], b[10][10];
    scanf("%d %d", &r, &c);
    // Read both matrices, add and print
    return 0;
}
`,tests("2 2\n1 2\n3 4\n5 6\n7 8","6 8\n10 12","1 3\n2 0 -1\n4 5 6","6 5 5",["1 1\n-3\n8","5","2 1\n1\n2\n3\n4","4\n6"])),
    make("matrix-sub","matrices","Matrix Subtraction","Easy","Read two matrices of the same order r × c and print A − B.","First line: r c. Next r lines: matrix A. Next r lines: matrix B.","Print the resulting matrix, one row per line.","2 2\n8 7\n6 5\n1 2\n3 4","7 5\n3 1",`#include <stdio.h>

int main(void) {
    int r, c, a[10][10], b[10][10];
    scanf("%d %d", &r, &c);
    // Read both matrices, subtract and print
    return 0;
}
`,tests("2 2\n8 7\n6 5\n1 2\n3 4","7 5\n3 1","1 2\n5 9\n2 3","3 6",["1 1\n0\n4","-4","2 1\n1\n2\n3\n4","-2\n-2"])),
    make("matrix-mul","matrices","Matrix Multiplication","Medium","Read matrix A of order r × c and matrix B of order c × k. Calculate and print A × B.","First line: r c k. Next r lines: A. Next c lines: B.","Print the r × k product matrix.","2 2 2\n1 2\n3 4\n5 6\n7 8","19 22\n43 50",`#include <stdio.h>

int main(void) {
    int r, c, k, a[10][10], b[10][10], product[10][10] = {0};
    scanf("%d %d %d", &r, &c, &k);
    // Read matrices and calculate product
    return 0;
}
`,tests("2 2 2\n1 2\n3 4\n5 6\n7 8","19 22\n43 50","1 2 1\n2 3\n4\n5","23",["1 1 1\n-3\n4","-12","2 1 2\n2\n3\n4 5","8 10\n12 15"])),
    make("symmetric-matrix","matrices","Symmetric Matrix Check","Medium","Read a square matrix and check whether it is symmetric. A matrix is symmetric when A[i][j] equals A[j][i] for every valid pair.","First line: n. Next n lines: n integers each.","Print SYMMETRIC or NOT SYMMETRIC.","3\n1 2 3\n2 4 5\n3 5 6","SYMMETRIC",`#include <stdio.h>

int main(void) {
    int n, a[10][10], symmetric = 1;
    scanf("%d", &n);
    // Read matrix and compare it with its transpose
    // Print SYMMETRIC or NOT SYMMETRIC
    return 0;
}
`,tests("3\n1 2 3\n2 4 5\n3 5 6","SYMMETRIC","2\n1 2\n3 4","NOT SYMMETRIC",["1\n9","SYMMETRIC","2\n0 -1\n-1 0","SYMMETRIC"])),
    make("nonsymmetric-matrix","matrices","Non-Symmetric Matrix Check","Easy","Read a square matrix and determine whether it is non-symmetric. Print NON-SYMMETRIC if it is not equal to its transpose; otherwise print SYMMETRIC.","First line: n. Next n lines: n integers each.","Print SYMMETRIC or NON-SYMMETRIC.","2\n1 2\n3 4","NON-SYMMETRIC",`#include <stdio.h>

int main(void) {
    int n, a[10][10], symmetric = 1;
    scanf("%d", &n);
    // Read matrix and compare with transpose
    return 0;
}
`,tests("2\n1 2\n3 4","NON-SYMMETRIC","2\n5 6\n6 7","SYMMETRIC",["1\n0","SYMMETRIC","3\n1 0 2\n0 4 0\n2 0 3","SYMMETRIC"]))
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
      <div class="test-output"><div class="test-heading"><strong>TEST RESULTS</strong><span id="test-counter">Not run yet</span></div><div id="test-results" class="test-results"><div class="result-note">Run your code to see individual test results.</div></div><div id="result-summary" class="result-summary"></div><div class="result-note">Extra checks are hidden in the interface in this starter version. Because challenge data is delivered to the browser, these are not secure server-side hidden tests.</div></div>
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
    const apiBase=(window.C_STUDIO_API_URL||"").replace(new RegExp("/+$"),"");
    if(!apiBase || apiBase.includes("YOUR-VERCEL")) throw new Error("Compiler backend URL is not configured yet. Finish the Vercel deployment and set config.js.");
    const headers={"Content-Type":"application/json"};
    const created=await fetch(apiBase+"/api/execute",{method:"POST",headers,body:JSON.stringify({source_code:code,stdin:input})});
    const createdData=await created.json().catch(()=>({}));
    if(!created.ok) throw new Error(createdData.error||("Compiler backend returned HTTP "+created.status));
    if(!createdData.token) throw new Error("Compiler backend did not return a submission token.");
    for(let attempt=0;attempt<14;attempt++){
      if(attempt) await new Promise(resolve=>setTimeout(resolve,650));
      const resultResponse=await fetch(apiBase+"/api/execute?token="+encodeURIComponent(createdData.token),{headers});
      const result=await resultResponse.json().catch(()=>({}));
      if(!resultResponse.ok) throw new Error(result.error||("Could not retrieve compiler result (HTTP "+resultResponse.status+")"));
      const statusId=result.status?.id;
      if(statusId===1||statusId===2) continue;
      if(statusId!==3){
        const detail=[result.compile_output,result.stderr,result.message,result.status?.description].filter(Boolean).join("\\n");
        return {error:detail||"Program did not finish successfully ("+(result.status?.description||"unknown status")+")",stdout:result.stdout||""};
      }
      return {stdout:result.stdout||"",stderr:result.stderr||""};
    }
    throw new Error("The compiler queue is taking longer than expected. Please try again.");
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
        if(detail.includes("HTTP 401")) {
          $("submission-status").textContent="Compiler unavailable";
          const notice=document.createElement("div");
          notice.className="result-note";
          notice.textContent="No further tests were sent. This is an authorization issue with the online compiler, not a failure in your solution.";
          $("test-results").append(notice);
          break;
        }
      }
      const serviceBlocked=$("submission-status").textContent==="Compiler unavailable";
      const allPassed=!serviceBlocked && passed===tests.length;
      if(serviceBlocked){
        $("result-summary").textContent="Testing could not start: the compiler service requires authorization. Your code has not been evaluated.";
      } else {
        $("result-summary").innerHTML=allPassed?'<strong>All '+passed+' tests passed!</strong> Great work.':passed+" of "+tests.length+" tests passed. Review your logic and try again.";
        $("submission-status").textContent=allPassed&&all?"Accepted": "Completed";
        if(all&&allPassed){solved.add(p.id);saveProgress();renderChallenges()}
      }
    }finally{
      busy=false;$("run-samples").disabled=false;$("submit-all").disabled=false;
    }
  }
  renderTopics();renderChallenges();updateProgress();
})();