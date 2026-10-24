# Re-running browser checks

These are the actual Playwright checks used for the redesign, with machine-specific module/browser locations replaced by environment settings. They run against an already-built production preview on port 3100. They do not submit forms or change production.

Use a separate temporary tools folder so QA dependencies are not added to the application:

```powershell
$qaTools = Join-Path $env:TEMP 'goldenhour-qa'
npm install --prefix $qaTools --no-save playwright axe-core lighthouse
$env:NODE_PATH = Join-Path $qaTools 'node_modules'
$env:QA_BROWSER = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
$env:QA_BASE = 'http://127.0.0.1:3100'
$env:QA_OUTPUT = Join-Path $qaTools 'results'
node docs/redesign/checks/functional.cjs
node docs/redesign/checks/accessibility.cjs
node docs/redesign/checks/supplemental.cjs
node docs/redesign/checks/final-smoke.cjs
```

On another OS, point QA_BROWSER to a Chromium browser or install Playwright Chromium and omit that variable. The runtime comparison additionally reads the public live homepage. Run it by itself, after other browser/build jobs finish, with `node docs/redesign/checks/runtime.cjs`. It reports page-wide idle work, not physical-device GPU or battery performance.

The accessibility scripts write the exact violation arrays; inspect those arrays as well as the exit status. The supplemental script reports external form GET status without asserting third-party availability. Its temporary removal of CSS background images is only for additional contrast measurement, not a product change.

For Lighthouse, use the temporary tools folder's CLI with CHROME_PATH pointing to the browser, `--chrome-flags="--headless --disable-gpu --disable-features=BackForwardCache,Prerender2"`, and the default simulated mobile throttling. Run each page sequentially. A NO_NAVSTART trace error is an invalid performance run, not a zero score or a pass.
