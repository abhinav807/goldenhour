/* Non-destructive CDP smoke tests. Requires Node >=22 + Edge/Chromium and a running Next server. */
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
const base=(process.argv[2]||"http://127.0.0.1:3000").replace(/\/$/,"");
const port=Number(process.env.GH_CDP_PORT||9337);
const endpoint="http://127.0.0.1:"+port;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const widths=[320,360,375,390,430,768,1024,1280,1366,1440,1920,2560];
const routes=["/","/goldenhour","/about","/privacy","/terms","/code-of-conduct","/guardian-consent"];
async function browser(){
  try{await(await fetch(endpoint+"/json/version")).json();return}catch{}
  const binary=[process.env.GH_BROWSER_BINARY,"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe","C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"].find(p=>p&&fs.existsSync(p));
  if(!binary)throw Error("Set GH_BROWSER_BINARY to your Edge/Chromium executable");
  const proc=spawn(binary,["--headless=new","--disable-gpu","--no-first-run","--remote-debugging-port="+port,"--user-data-dir="+path.join(os.tmpdir(),"gh-qa-"+process.pid),"about:blank"],{stdio:"ignore",detached:true,windowsHide:true});proc.unref();
  for(let i=0;i<30;i++){await sleep(500);try{await(await fetch(endpoint+"/json/version")).json();return}catch{}}
  throw Error("Browser CDP unavailable");
}
async function main(){
  await browser();
  const tabs=await(await fetch(endpoint+"/json")).json();
  const page=tabs.find(t=>t.type==="page");
  if(!page)throw Error("No browser tab target");
  const ws=new WebSocket(page.webSocketDebuggerUrl);
  const pending=new Map();let id=0;let exceptions=[];
  ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id)}
    if(m.method==="Runtime.exceptionThrown")exceptions.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);
  };
  await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
  const send=(method,params={})=>new Promise(resolve=>{const n=++id;pending.set(n,resolve);ws.send(JSON.stringify({id:n,method,params}))});
  await send("Page.enable");await send("Runtime.enable");
  const evalCode=async expression=>{const m=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});if(m.result?.exceptionDetails)throw Error("Browser evaluate failed: "+m.result.exceptionDetails.text);return m.result?.result?.value};
  const failures=[];let checked=0;
  try{
    for(const route of routes){
      for(const width of ["/","/goldenhour"].includes(route)?widths:[390,1440]){
        exceptions=[];await send("Emulation.setDeviceMetricsOverride",{width,height:Math.max(568,Math.round(width*.75)),deviceScaleFactor:1,mobile:false});
        const nav=await send("Page.navigate",{url:base+route});
        if(nav.result?.errorText)failures.push(route+" "+width+" nav: "+nav.result.errorText);
        await sleep(1450);
        const data=await evalCode(`(() => {
          const root=document.documentElement;
          const badImages=[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc);
          const missing=[...document.querySelectorAll('a,button')].filter(e=>{const r=e.getBoundingClientRect();const s=getComputedStyle(e);return r.width>0&&r.height>0&&s.display!=='none'&&s.visibility!=='hidden'&&!e.getAttribute('aria-label')&&!e.getAttribute('aria-labelledby')&&!e.textContent.trim()&&!e.querySelector('img[alt]')}).map(e=>e.outerHTML.slice(0,90));
          return {client:root.clientWidth,scroll:root.scrollWidth,badImages,missing,heading:document.querySelectorAll('h1').length};
        })()`);
        checked++;
        if(exceptions.length)failures.push(route+" "+width+" uncaught: "+exceptions[0].slice(0,180));
        if(data.scroll>data.client+2)failures.push(route+" "+width+" horizontal scrolling "+data.scroll+"/"+data.client);
        if(data.badImages.length)failures.push(route+" "+width+" broken images: "+data.badImages.join(","));
        if(data.missing.length)failures.push(route+" "+width+" unnamed links/buttons: "+data.missing.join(","));
        if(data.heading!==1)failures.push(route+" "+width+" H1 count: "+data.heading);
        console.log((exceptions.length?"FAIL":"PASS")+" "+route+" "+width+"px: document "+data.scroll+"/"+data.client);
      }
    }
    exceptions=[];
    await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:1,mobile:false});
    await send("Page.navigate",{url:base+"/goldenhour"});await sleep(1800);
    const controls=await evalCode(`(async()=>{
      const faq=document.querySelector('#faq article button[aria-expanded]');
      const phase=document.querySelector('#timeline article button[aria-expanded]');
      if(!faq||!phase)return {found:false};
      faq.click();phase.click();await new Promise(r=>setTimeout(r,160));
      return {found:true,faq:faq.getAttribute('aria-expanded'),faqVisible:!document.getElementById(faq.getAttribute('aria-controls'))?.hidden,timeline:phase.getAttribute('aria-expanded')};
    })()`);
    if(!controls.found||controls.faq!=="true"||!controls.faqVisible||controls.timeline!=="false")failures.push("FAQ/timeline interaction: "+JSON.stringify(controls));
    console.log("INTERACTIONS "+JSON.stringify(controls));
    for(const p of ["/robots.txt","/sitemap.xml","/llms.txt","/not-an-actual-route"]){
      const r=await fetch(base+p);
      if(r.status!==(p==="/not-an-actual-route"?404:200))failures.push(p+" returned "+r.status);
    }
    if(!(await fetch(base+"/goldenhour")).headers.has("content-security-policy-report-only"))failures.push("Missing CSP report-only header");
  } finally{ws.close()}
  console.log("SUMMARY "+checked+" route/viewport combinations; "+failures.length+" failures");
  for(const problem of failures)console.log("ISSUE "+problem);
  if(failures.length)process.exitCode=1;
}
main().catch(e=>{console.error(e.stack);process.exitCode=1});
