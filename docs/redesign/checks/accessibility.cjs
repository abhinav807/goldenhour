/* eslint-disable @typescript-eslint/no-require-imports */
const out = process.env.QA_OUTPUT || __dirname;
require('node:fs').mkdirSync(out, { recursive: true });
const { chromium }=require('playwright');
const axe=require('axe-core');const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.QA_BROWSER || undefined,headless:true});
 const page=await browser.newPage();const results=[];
 for(const path of ['/','/goldenhour','/guardian-consent','/about','/privacy','/terms','/code-of-conduct','/thank-you','/empty-state','/not-a-real-route']){
  await page.goto((process.env.QA_BASE || 'http://127.0.0.1:3100')+path,{waitUntil:'networkidle'});
  const consent=page.getByRole('button',{name:'ESSENTIAL ONLY'});if(await consent.isVisible())await consent.click();
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:1000});await page.addScriptTag({content:axe.source});
   const r=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}}));
   results.push({path,width,violations:r.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary,html:n.html}))})),passes:r.passes.length,incomplete:r.incomplete.map(v=>v.id)});
  }
 }
 fs.writeFileSync(out+'/accessibility-report.json',JSON.stringify(results,null,2));console.log(results.map(r=>({path:r.path,width:r.width,violations:r.violations.map(v=>({id:v.id,count:v.nodes.length})),passes:r.passes})));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
