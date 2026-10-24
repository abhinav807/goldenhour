/* eslint-disable @typescript-eslint/no-require-imports */
const out = process.env.QA_OUTPUT || __dirname;
require('node:fs').mkdirSync(out, { recursive: true });
const {chromium}=require('playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const axe=require('axe-core');
const base=process.env.QA_BASE||'http://127.0.0.1:3100';
(async()=>{
 const b=await chromium.launch({executablePath:process.env.QA_BROWSER || undefined,headless:true});const checks=[];
 const check=(name,data)=>{checks.push({name,data});console.log(name,data||'PASS')};
 const p=await b.newPage({viewport:{width:390,height:844}});await p.addInitScript(()=>localStorage.setItem('gh-cookie-consent','declined'));
 for(const route of ['/','/goldenhour','/about','/guardian-consent','/privacy','/terms','/code-of-conduct','/thank-you','/empty-state']){
  await p.goto(base+route,{waitUntil:'networkidle'});await p.addScriptTag({content:axe.source});
  await p.addStyleTag({content:'* { background-image: none !important; }'});
  const r=await p.evaluate(()=>axe.run(document,{runOnly:{type:'rule',values:['color-contrast']}}));check('Solid-background contrast '+route,r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
 }
 await p.goto(base+'/goldenhour',{waitUntil:'networkidle'});
 const trigger=p.getByRole('button',{name:'Open navigation menu'});await trigger.click();
 const dialog=p.getByRole('dialog',{name:'GoldenHour navigation'});
 for(let i=0;i<18;i++){await p.keyboard.press('Shift+Tab');assert(await dialog.evaluate(e=>e.contains(document.activeElement)));}
 await p.addScriptTag({content:axe.source});let r=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));check('Open modal axe',r.violations);
 await p.setViewportSize({width:1200,height:900});assert(!(await dialog.isVisible()));await p.waitForTimeout(100);assert.equal(await p.evaluate(()=>document.body.style.overflow),'');check('Reverse Tab trap and resize cleanup');
 await p.locator('#timeline summary').click();await p.locator('#faq summary').first().click();await p.locator('#resources').getByRole('button',{name:/Show all/}).click();r=await p.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));check('Expanded schedule, FAQ and all resources axe',r.violations.map(v=>({id:v.id,nodes:v.nodes})));
 await p.goto(base+'/guardian-consent',{waitUntil:'networkidle'});await p.emulateMedia({media:'print'});assert(await p.locator('h1').isVisible());assert(!(await p.getByRole('navigation',{name:'Main navigation'}).isVisible()));await p.screenshot({path:out+'/guardian-print.png',fullPage:true});check('Guardian print content and hidden navigation');
 const staticPage=await b.newPage({javaScriptEnabled:false,viewport:{width:320,height:844}});for(const route of ['/','/goldenhour']){await staticPage.goto(base+route,{waitUntil:'networkidle'});assert(await staticPage.locator('h1').isVisible());assert(!(await staticPage.getByRole('button',{name:'Open navigation menu'}).isVisible()));assert(await staticPage.getByRole('link',{name:route==='/'?'Event ↗':'Register ↗',exact:true}).isVisible());assert(await staticPage.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));check('320px no-JavaScript navigation '+route);}
 const blocked=await b.newPage();const errors=[];blocked.on('pageerror',e=>errors.push(e.message));await blocked.addInitScript(()=>{Storage.prototype.getItem=()=>{throw new Error('blocked')};Storage.prototype.setItem=()=>{throw new Error('blocked')}});await blocked.goto(base+'/goldenhour',{waitUntil:'networkidle'});await blocked.getByRole('button',{name:'ESSENTIAL ONLY'}).click();assert.equal(await blocked.locator('.cookie-banner').count(),0);assert.deepEqual(errors,[]);check('Blocked localStorage consent fallback');
 const mobile=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.goto(base+'/',{waitUntil:'networkidle'});assert.equal(await mobile.locator('[data-foil] > div').first().evaluate(el=>getComputedStyle(el).transform),'none');check('Touch foil static fallback');
 const links=[];for(const url of ['https://forms.gle/2om1zTVv5FCau56r5','https://forms.gle/Riv3qEv3Bf7YTCdV9']){try{const res=await undefined;if(res)links.push({url,status:res.status()});else{const res=await p.request.get(url,{timeout:30000});links.push({url,status:res.status(),destination:res.url()})}}catch(e){links.push({url,error:e.message})}}check('External form GET only',links);
 fs.writeFileSync(out+'/supplemental-report.json',JSON.stringify(checks,null,2));await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
