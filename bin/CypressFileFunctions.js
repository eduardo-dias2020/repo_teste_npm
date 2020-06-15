var readlineSync = require('readline-sync');

var fs = require('fs');

function addBaseURL(data) {
    if (!data.hasOwnProperty("baseUrl")) {
        var url = readlineSync.question("\nWhat's the base url? ()", { defaultInput: 'http://' });
        data.baseUrl = url;
    }
}

function addScreenshotFolder(data) {
    if (!data.hasOwnProperty("screenshotFolder")) {
        var ssFolder = readlineSync.question("\nWhere do you want to save the screenshots? (Screenshots)", { defaultInput: 'Screenshots' });
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
        var animations = readlineSync.question("\nShould tests wait for animations to end (Y/N)? ", {
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
        data.testFiles = '**/*.feature';
        if (!fs.existsSync("cypress/integration/Features")) {
            fs.mkdirSync("cypress/integration/Features", { recursive: true })
        }
    }
}

function addDefaultTimeout(data) {
    if (!data.hasOwnProperty("defaultCommandTimeout")) {
        var validNumber = false;
        var time = readlineSync.question("\nHow many milliseconds do you want to set for commands timeout? (4000)", { defaultInput: 4000 });

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
        data.commonPath = "node_modules/framework_glintt_tests_e2e/PhraseLibrary/*.js"
    }
}

const editCypressJson = (cypressFilePath) => {
    var cypressFile = JSON.parse(fs.readFileSync(cypressFilePath));
    addBaseURL(cypressFile);
    addScreenshotFolder(cypressFile);
    addVideo(cypressFile);
    addTestFilesFolder(cypressFile);
    addDefaultTimeout(cypressFile);
    addReporter(cypressFile);
    addWaitForAnimations(cypressFile);
    addCommonPathFolder(cypressFile);
    fs.writeFileSync(cypressFilePath, JSON.stringify(cypressFile, null, 4));
}

module.exports = editCypressJson;