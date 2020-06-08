const fs = require('fs');

var readlineSync = require('readline-sync');

function addBaseURL(data) {
    if (!data.hasOwnProperty("baseUrl")) {
        var url = readlineSync.question("\nWhat's the base url? ", { defaultInput: 'http://' });
        data.baseUrl = url;
    }
}

function addScreenshotFolder(data) {
    if (!data.hasOwnProperty("screenshotFolder")) {
        var ssFolder = readlineSync.question("\nWhere do you want to save the screenshots? ");
        if (!fs.existsSync(ssFolder)) {
            fs.mkdirSync(ssFolder, { recursive: true })
        }
        data.screenshotFolder = ssFolder;
    }
}

function addVideo(data) {
    if (!data.hasOwnProperty("video")) {
        var videos = readlineSync.question("\nWould you like to save videos from test execution (Y/N)? ", {
            trueValue: ['yes', 'Y', 'y', 'YES']
        });
        if (videos === true) {
            data.video = true
        } else {
            data.video = false
        }
    }
}

function addWaitForAnimations(data) {
    if (!data.hasOwnProperty("waitForAnimations")) {
        var animations = readlineSync.question("\nShould tests wait for animations to end? ", {
            trueValue: ['yes', 'Y', 'y', 'YES', '']
        });
        if (animations === true) {
            data.waitForAnimations = true
        } else {
            data.waitForAnimations = false
        }
    }
}

function addTestFilesFolder(data) {
    if (!data.hasOwnProperty("testFiles")) {
        var features = readlineSync.question("\nWhere do you save the features files? ", { defaultInput: '**/*.feature' });
        if (!fs.existsSync(features)) {
            fs.mkdirSync(features, { recursive: true })
        }
        data.testFiles = features;
    }
}

function addDefaultTimeout(data) {
    if (!data.hasOwnProperty("defaultCommandTimeout")) {
        var validNumber = false;
        var time = readlineSync.question("\nHow many milliseconds do you want to set for commands timeout? ", { defaultInput: 4000 });

        while (!validNumber) {
            var timeInt = parseInt(time);
            if (Number.isInteger(timeInt)) {
                data.defaultCommandTimeout = timeInt;
                validNumber = true;
            } else {
                time = readlineSync.question("\nPlease insert a valid number! ", { defaultInput: 4000 });
            }
        }
    }
}

function addReporter(data) {
    if (!data.hasOwnProperty("reporter")) {
        data.reporter = "mochawesome"
    }
}

function addCommonPathFolder(data) {
    if (!data.hasOwnProperty("commonPath")) {
        data.commonPath = "node_modules/framework-testes-automaticos-e2e/cypress/integration/common/*.js"
    }
}

function editCypressJson() {
    const data = JSON.parse(fs.readFileSync("cypress.json"));
    addBaseURL(data);
    addScreenshotFolder(data);
    addVideo(data);
    addTestFilesFolder(data);
    addDefaultTimeout(data);
    addReporter(data);
    addWaitForAnimations(data);
    addCommonPathFolder(data);

    fs.writeFileSync("cypress.json", JSON.stringify(data, null, 4));
}

editCypressJson()