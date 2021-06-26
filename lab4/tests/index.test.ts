import * as puppeteer from 'puppeteer';

(async () => { 
    const browser = await puppeteer.launch({headless: false, slowMo: 130});
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');
    await page.screenshot({path:"screen-before-wait.png"});
    await page.waitForSelector("#addNote");
    await page.click("#addNote");
    await page.type("#title", "Test notatki automatyczny");
    await page.type('#description', "Test Notatki automatyczny");
    await page.click("#createNote");
    await page.screenshot({path:"screen-after-wait.png"});
    await browser.close();
})();

