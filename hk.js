const puppeteer = require('puppeteer');
const emailpassObj = require("./secrets");

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--start-fullscreen']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1450, height: 800});

    await page.goto('https://www.google.com/');
    await page.type("input[title='Search']", "hackerrank", {delay: 100});
    await page.keyboard.press('Enter', {delay: 100});

    await page.waitForTimeout(1000);
    await page.click(".LC20lb.DKV0Md", page);

    await page.waitForTimeout(1000);
    await page.click(".main-navigation--right ul li:nth-child(1)", page);

    await page.waitForTimeout(1000);
    await page.click(".fl-button-wrap.fl-button-width-auto.fl-button-left span", page);

    await page.waitForTimeout(1000);
    await page.type("input[id='input-1']", emailpassObj.email, {delay: 50});
    await page.type("input[type='password']", emailpassObj.password, {delay: 50});
    await page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
    await page.waitForTimeout(3000);
    await page.click(".track-card a[data-attr2='algorithms']", page);
    await page.waitForTimeout(3000);
    await page.click("input[value='warmup']", page);
    await page.click(".challenge-submit-btn", { delay: 100 });

    // clear dafault editor
    // await page.waitForTimeout(1000);
    // const input = await page.$('.hr-monaco-editor-parent');
    // await input.click({ clickCount: 4});
    // await page.keyboard.press('Backspace');
    // await input.type("Blah");

    await page.focus('.hr-monaco-editor-parent');
    await page.keyboard.down('Control');
    await page.keyboard.press('A', { delay: 100});
    await page.keyboard.up('Control');
    await page.keyboard.press('X', { delay: 100});
    await page.keyboard.type('foo');

})();