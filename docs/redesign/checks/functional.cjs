/* eslint-disable @typescript-eslint/no-require-imports */
const out = process.env.QA_OUTPUT || __dirname;
require('node:fs').mkdirSync(out, { recursive: true });
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const base=process.env.QA_BASE || 'http://127.0.0.1:3100';
const checks=[], errors=[];
const check=(name,details)=>{checks.push({name,status:'pass',details}); console.log('PASS',name)};
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.QA_BROWSER || undefined,headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
 await context.addInitScript(()=>localStorage.setItem('gh-cookie-consent','declined'));
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 for(const path of ['/','/goldenhour','/about','/code-of-conduct','/privacy','/terms','/guardian-consent','/thank-you','/empty-state','/robots.txt','/sitemap.xml','/llms.txt']) {
  const res=await page.goto(base+path,{waitUntil:'networkidle'});assert.equal(res.status(),200,path);
  if(!path.endsWith('.txt')&&!path.endsWith('.xml')) {assert.equal(await page.locator('h1').count(),1,path);assert.equal(await page.locator('#main-content').count(),1,path);}
  check('Route '+path, {status:res.status()});
 }
 const missing=await page.goto(base+'/not-a-real-route',{waitUntil:'networkidle'});assert.equal(missing.status(),404);check('404 status');
 for(const path of ['/','/goldenhour']){
  await page.goto(base+path,{waitUntil:'networkidle'});
  const broken=await page.locator('a[href^="#"]').evaluateAll(links=>links.filter(a=>a.hash&&!document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a=>a.href));assert.deepEqual(broken,[]);check('Anchor targets '+path);
  for(const width of [320,360,390,430,768,1024,1440,1728]){
   await page.setViewportSize({width,height:844});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`${path} ${width}`);
   const clipped=await page.evaluate(()=>[...document.querySelectorAll('main h1,main h2,main h3,main p,main a,footer a')].filter(el=>{if(!el.getClientRects().length||el.closest('[aria-hidden=true],.sr-only'))return false;const r=el.getBoundingClientRect();return r.left < -1 || r.right > innerWidth+1 || el.scrollWidth>el.clientWidth+2}).map(el=>el.textContent.slice(0,100)));
   assert.deepEqual(clipped,[],`${path} ${width}`);check('Reflow '+path+' '+width);
  }
  for(const width of [390,768]){
   await page.setViewportSize({width,height:844});await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
   const trigger=page.getByRole('button',{name:'Open navigation menu'});await trigger.click();
   const dialog=page.getByRole('dialog',{name:'GoldenHour navigation'});assert(await dialog.isVisible());
   assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Close navigation menu');
   for(let i=0;i<18;i++){await page.keyboard.press('Tab');assert(await dialog.evaluate(el=>el.contains(document.activeElement)));}
   await page.keyboard.press('Escape');assert(!(await dialog.isVisible()));assert(await trigger.evaluate(el=>el===document.activeElement));
   assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
   await trigger.click();await dialog.getByRole('link',{name:path==='/'?'The event':'Tracks',exact:true}).click();assert(!(await dialog.isVisible()));assert.equal(new URL(page.url()).hash,'#events');
   check('Menu open/focus trap/Escape/return/anchor '+path+' '+width);
  }
 }
 await page.setViewportSize({width:1440,height:1000});await page.goto(base+'/goldenhour',{waitUntil:'networkidle'});
 const summary=page.getByText('Explore the complete schedule / 11 stages',{exact:true});await summary.focus();await page.keyboard.press('Enter');
 assert.equal(await page.locator('#timeline details[open] article').count(),11);assert(await page.getByRole('heading',{name:'BUILD SPRINT 1',exact:true}).isVisible());
 await summary.click();assert.equal(await page.locator('#timeline details[open]').count(),0);check('Schedule keyboard disclosure / all 11 phases');
 const input=page.getByRole('searchbox',{name:'Find an answer'});await input.fill('guardian');assert.equal(await page.locator('#faq details').count(),1);
 await page.locator('#faq summary').click();assert(await page.getByText(/Participants under 18 need parent or guardian consent/).isVisible());
 await input.fill('zzzz-no-match');assert(await page.getByText(/No answers match/).isVisible());await input.fill('');assert.equal(await page.locator('#faq details').count(),7);
 check('FAQ search, answer, empty state, reset');
 const resources=page.locator('#resources');await resources.getByRole('button',{name:'GAME DEVELOPMENT',exact:true}).click();assert.equal(await resources.getByRole('button',{name:'GAME DEVELOPMENT',exact:true}).getAttribute('aria-pressed'),'true');assert(await resources.getByRole('heading',{name:'Godot',exact:true}).isVisible());
 await resources.getByRole('button',{name:'ALL',exact:true}).click();await resources.getByRole('button',{name:/Show all \d+ resources/}).click();
 const cards=resources.locator('article');const count=await cards.count();assert(count>3);
 for(const card of await cards.all()) {const command=await card.locator('code').innerText();await card.getByRole('button').click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),command);}
 check('Resource filters and every copy button', {copiedCommands:count});
 await page.evaluate(()=>{navigator.clipboard.writeText=async()=>{throw new Error('Permission denied')}});await cards.first().getByRole('button').click();assert(await resources.getByRole('status').filter({hasText:'Could not copy'}).isVisible());check('Clipboard denial feedback');
 await resources.getByRole('button',{name:'Show fewer resources'}).click();assert.equal(await resources.locator('article').count(),3);check('Resource collapse');
 const registration=await page.locator('a[href*="forms.gle/2om1zTVv5FCau56r5"]').count();assert(registration>=3);check('Registration destination preserved',{registrationLinks:registration});
 const ld=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(n=>JSON.parse(n.textContent)));const event=ld.find(x=>x['@type']==='Event');assert.equal(event.startDate,'2026-11-14T08:00:00+05:30');assert.equal(event.endDate,'2026-11-14T20:00:00+05:30');assert.equal(event.offers.price,0);check('Event JSON-LD dates, timezone and free entry');
 for(const img of await page.locator('main img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert(await img.evaluate(el=>el.naturalWidth>0));}check('All event portraits and partner logos loaded');
 await page.goto(base+'/',{waitUntil:'networkidle'});await page.getByRole('link',{name:'Explore GoldenHour V1',exact:true}).click();await page.waitForURL('**/goldenhour');await page.goBack({waitUntil:'networkidle'});assert.equal(new URL(page.url()).pathname,'/');check('Home → event → browser back');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-foil]').first().scrollIntoViewIfNeeded();await page.locator('[data-foil]').first().hover();assert.equal(await page.locator('[data-foil] > div').first().evaluate(el=>getComputedStyle(el).transform),'none');check('Reduced-motion foil fallback');
 assert.equal(await page.locator('canvas').count(),0);check('No WebGL/canvas on home');
 const staticContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const staticPage=await staticContext.newPage();await staticPage.goto(base+'/goldenhour',{waitUntil:'networkidle'});
 assert(await staticPage.locator('h1').isVisible());assert.equal(await staticPage.locator('.intro-loader,.cookie-banner').count(),0);await staticPage.locator('#timeline summary').click();assert.equal(await staticPage.locator('#timeline details[open] article').count(),11);await staticPage.locator('#faq summary').first().click();assert(await staticPage.locator('#faq details[open] p').isVisible());assert((await staticPage.locator('#countdown').innerText()).includes('14 November 2026'));assert((await staticPage.locator('#resources article').count())>3);await staticPage.screenshot({path:out+'/no-javascript-390.png'});check('No-JavaScript content, schedule, FAQ, countdown date and resources');await staticContext.close();
 const endedContext=await browser.newContext();await endedContext.addInitScript(()=>{Date.now=()=>Date.parse('2026-11-15T08:00:00+05:30')});const ended=await endedContext.newPage();await ended.goto(base+'/goldenhour',{waitUntil:'networkidle'});assert(await ended.getByText('The scheduled start time has passed. Check with the organizers for event updates.').isVisible());check('Countdown after deadline has factual status');await endedContext.close();
 const cookieContext=await browser.newContext({viewport:{width:390,height:844}});const cookies=await cookieContext.newPage();await cookies.goto(base+'/goldenhour',{waitUntil:'networkidle'});await cookies.getByRole('button',{name:'ESSENTIAL ONLY'}).click();assert.equal(await cookies.evaluate(()=>localStorage.getItem('gh-cookie-consent')),'declined');assert.equal(await cookies.locator('.cookie-banner').count(),0);check('Cookie essential-only consent');await cookieContext.close();
 assert.deepEqual(errors,[]);check('No browser runtime errors');
 fs.writeFileSync(out+'/functional-report.json',JSON.stringify({checks,errors},null,2));await browser.close();console.log('TOTAL',checks.length);
})().catch(e=>{fs.writeFileSync(out+'/functional-report.json',JSON.stringify({checks,errors,failure:e.stack},null,2));console.error(e);process.exit(1)});
