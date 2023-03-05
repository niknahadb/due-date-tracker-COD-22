const puppeteer = require("puppeteer");
const { executablePath } = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox',],
    headless: false,
    ignoreHTTPSErrors: true,

    // add this
    executablePath: executablePath(),
  });
  const page = await browser.newPage();


  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });
  await page.exposeFunction('reportEvent', info => console.log(info));

  await page.evaluateOnNewDocument(() => {
    document.addEventListener('mouseover', e => {
        reportEvent({targetName: e.target.getAttribute("id"), eventType: 'mouseover'})
    }, true /* capture */);
    e.target.backgroundColor = 'red'
  });
  
  await page.evaluateOnNewDocument(() => {
    document.addEventListener('click', e => {
        reportEvent({targetName: e.target.getAttribute("id"), eventType: 'click', children: e.target.children})
        console.log(e.target)
    }, true /* capture */);
  });
})();
