/* eslint-disable @typescript-eslint/no-require-imports */
const out = process.env.QA_OUTPUT || __dirname;
require('node:fs').mkdirSync(out, { recursive: true });
const {chromium}=require('playwright');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({executablePath:process.env.QA_BROWSER || undefined,headless:true});const results=[];
for(const [name,base] of [['live-baseline','https://www.goldenhourdelhi.co.in'],['redesign','http://127.0.0.1:3100']]){
 const p=await b.newPage({viewport:{width:1440,height:1000}});await p.addInitScript(()=>{localStorage.setItem('gh-cookie-consent','declined');const original=window.requestAnimationFrame;window.__rafCalls=0;window.requestAnimationFrame=cb=>original(t=>{window.__rafCalls++;cb(t)})});
 await p.goto(base,{waitUntil:'networkidle',timeout:120000});await p.locator('#founders').scrollIntoViewIfNeeded();await p.waitForTimeout(3000);
 const client=await p.context().newCDPSession(p);await client.send('Performance.enable');const metrics=async()=>Object.fromEntries((await client.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
 const before=await metrics();const start=await p.evaluate(()=>({t:performance.now(),calls:window.__rafCalls}));await p.waitForTimeout(5000);const end=await p.evaluate(()=>({t:performance.now(),calls:window.__rafCalls}));const after=await metrics();
 const counts=await p.evaluate(()=>{const visible=e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth};return {canvas:document.querySelectorAll('canvas').length,visibleCanvas:[...document.querySelectorAll('canvas')].filter(visible).length,visibleFoil:[...document.querySelectorAll('[data-foil]')].filter(visible).length}});
 const result={name,url:base,viewport:'1440x1000',browser:await b.version(),sampleMs:end.t-start.t,rafCallbacks:end.calls-start.calls,...counts};for(const key of ['TaskDuration','ScriptDuration','LayoutDuration','RecalcStyleDuration'])result[key+'Ms']=(after[key]-before[key])*1000;results.push(result);await p.close();}
fs.writeFileSync(out+'/runtime-report.json',JSON.stringify(results,null,2));console.log(results);await b.close();})().catch(e=>{console.error(e);process.exit(1)});
