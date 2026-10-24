/* eslint-disable @typescript-eslint/no-require-imports */
const out = process.env.QA_OUTPUT || __dirname;
require('node:fs').mkdirSync(out, { recursive: true });
const {chromium}=require('playwright');const assert=require('node:assert/strict');const fs=require('node:fs');
(async()=>{const b=await chromium.launch({executablePath:process.env.QA_BROWSER || undefined,headless:true});const p=await b.newPage({viewport:{width:1440,height:1000}});await p.addInitScript(()=>localStorage.setItem('gh-cookie-consent','declined'));const checks=[];
for(const [name,path] of [['home','/'],['event','/goldenhour']]){await p.setViewportSize({width:1440,height:1000});await p.goto('http://127.0.0.1:3100'+path,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);assert.equal(await p.locator('nav[aria-label="Main navigation"] [aria-current]').count(),0);await p.screenshot({path:out+'/after-'+name+'-cover-1440.png'});
 await p.locator(name==='home'?'#founders':'#register').scrollIntoViewIfNeeded();await p.waitForTimeout(300);await p.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(300);assert.equal(await p.locator('nav[aria-label="Main navigation"] [aria-current]').count(),0);checks.push('Active navigation clears on return to '+name+' cover');
 for(const width of [320,390]){await p.setViewportSize({width,height:844});await p.waitForTimeout(200);assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));if(width===390)await p.screenshot({path:out+'/after-'+name+'-cover-390.png'});}checks.push('Final metadata reflow '+name);
}
await p.setViewportSize({width:1440,height:1000});await p.locator('#register').evaluate(e=>scrollTo({top:e.getBoundingClientRect().top+scrollY-100,behavior:'instant'}));await p.waitForTimeout(300);await p.screenshot({path:out+'/final-registration-viewport.png'});
fs.writeFileSync(out+'/final-smoke.json',JSON.stringify(checks,null,2));console.log(checks);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
