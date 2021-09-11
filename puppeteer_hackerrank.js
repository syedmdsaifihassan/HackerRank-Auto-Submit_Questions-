const emailpassObj = require("./secrets");
const { answers } = require("./codes");
const puppeteer = require("puppeteer");

// clear the dault editor


let browserStartPromise = puppeteer.launch({
    // visible
    headless: false,
    // slowMo: 1000,
    defaultViewport: null,
    // browser setting
    args: ["--start-fullscreen", "--disable-notiications"]
});

let page, browser;
browserStartPromise
    .then(function(browserObj){
        console.log('browser opened');
        browser = browserObj
        let browOpenTabPromise = browserObj.newPage();
        return browOpenTabPromise;
    })
    .then(function(newTab){
        page = newTab;
        console.log("new tab opened");
        let googlePromise = newTab.goto("https://www.google.com/");
        return googlePromise;
    })
    .then(function(){
        console.log("google home page opened");
        // keyboard entry -> data entry
        let waitFrTypPromise = page.type("input[title='Search']", "hackerrank", {delay: 100});
        return waitFrTypPromise;
    })
    .then(function(){
        // keyboard -> specific keys
        let enterKeyProm = page.keyboard.press('Enter', {delay: 100});
        return enterKeyProm;
    })
    .then(function(){
        console.log('hackerrank typed and enter and opened');
        let clickHRProm = waitAndClick(".LC20lb.DKV0Md", page);
        return clickHRProm;
    })
   .then(function(){
        console.log('hackerrank home page opened');
        let clickLoginProm = waitAndClick(".main-navigation--right ul li:nth-child(1)", page);
        return clickLoginProm;
    })
    .then(function(){
        console.log('hackerrank login page opened');
        let clickLoginDevProm = waitAndClick(".fl-button-wrap.fl-button-width-auto.fl-button-left span", page);
        return clickLoginDevProm;
    })
    // wait for 3 seconds
    .then(function () {
        let wait3SecProm = page.waitFor(3000);
        return wait3SecProm;
    })
    .then(function(){
        console.log('hackerrank login for developers page opened');
        let enterEmailPromise = page.type("input[id='input-1']", emailpassObj.email, {delay: 50});
        return enterEmailPromise;
    })
    .then(function(){
        let enterPassPromise = page.type("input[type='password']", emailpassObj.password, {delay: 50});
        return enterPassPromise;
    })
    .then(function () {
        console.log('email and password entered');
        let loginDonePromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        return loginDonePromise;
    })
    .then(function () {
        console.log('wohooo! successfully logged in');
        let clickAlgoProm = waitAndClick(".track-card a[data-attr2='algorithms']", page);
        return clickAlgoProm;
    })
    .then(function () {
        console.log('clicked on Algorithms');
        let selectWarmUp = waitAndClick("input[value='warmup']", page);
        return selectWarmUp;
    })
    // wait for 3 seconds
    .then(function () {
        console.log('checked for warmup, wait for 3 Sec');
        let wait3SecProm = page.waitFor(3000);
        return wait3SecProm;
    })
    .then(function () {
        let allChallangesProm = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay: 100});
        return allChallangesProm;
    })
    .then(function (quesArr){
        // 1 of n ques
        console.log("no. of ques", quesArr.length);
        let quesWillbeSolvedProm = questionSolver(page, quesArr[0], answers[0]);
        return quesWillbeSolvedProm;
    })
    .then(function (){
        console.log('question solved');
    })

// return a promise -> that will submit a given question
function questionSolver(page, question, answer){
    return new Promise(function (resolve, reject) {
        let quesWillBeClickedProm = question.click();

        quesWillBeClickedProm

        // reached to editor
        .then(function (){
            let waitEditorToBeFocus = page.waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitEditorToBeFocus;
        })
        .then(function (){
            return waitAndClick(".checkbox-input", page)
        })
        .then(function (){
            return page.waitForSelector("textarea.custominput", {visible: true});
        })
        .then(function () {
            return page.type("textarea.custominput", answer, { delay: 10 });
        }).then(function () {
            let cmdPressed = page.keyboard.down("Meta");
            return cmdPressed;
        }).then(function () {
            let AisPressed = page.keyboard.press("A", { delay: 100 });
            return AisPressed;
        }).then(function () {
            return page.keyboard.press("X", { delay: 100 });
        }).then(function () {
            let cmdReleased = page.keyboard.up("Meta");
            return cmdReleased;
        })


        .then(function (){
            // focused on editor
            let waitEditorToBeFocus = page.waitAndClick(".monaco-editor.no-user-select.vs", page);
            return waitEditorToBeFocus;
        })
        .then(function (){
            let cmdPressed = page.keyboard.down("Meta");
            return cmdPressed;
        })
        .then(function (){
            let AisPressed = page.keyboard.press("A", { delay: 100});
            return AisPressed;
        })
        .then(function (){
            return page.keyboard.press("V", { delay: 100});
        })
        .then(function (){
            let cmdReleased = page.keyboard.up("Meta");
            return cmdReleased;
        })
        .then(function (){
            return page.click(".hr-monaco__run-code", {delay:50})
        })

        .then(function (){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}


function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                let clickModal =
                    cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err)
            })
    }
    )
}