const assert = require('assert')
const fs = require('fs')

const globalVariable = require('../aaf/global_variables')
var dt = ""

var uiCount = 0
var apiCount = 0
let strMap = new Map()
class baseAction {
    async executeJsonQuery(filename, sheetName) {
        const jsonData = fs.readFileSync('./TestData/' + filename + '.json');
        var jsonParsed = JSON.parse(jsonData);
        var sheetLevel = jsonParsed[sheetName];
        var tcNames = sheetLevel[globalVariable.tcName];
        for (let k of Object.keys(tcNames)) {
            strMap.set(k, tcNames[k]);
        }
    }
    async executeJsonQueryWithIteration(sheetName, iteration) {
        const jsonData = fs.readFileSync('./TestData/TestData.json');
        var jsonParsed = JSON.parse(jsonData);
        var sheetLevel = jsonParsed[sheetName];
        var tcNames = sheetLevel[globalVariable.tcName + "_" + iteration];
        strMap.clear();
        for (let k of Object.keys(tcNames)) {
            strMap.set(k, tcNames[k]);
        }
    }
    async getData(objectKey) {
        for (var [k, v] of strMap.entries()) {
            var objVal;
            if (k === objectKey) {
                objVal = v;
                break;
            }
        }
        return objVal;
    }
    async accessibilityReport(pageName, results) {
        const fs = require("fs-extra")
        const reportFolder = './reports/html-report/specs/' + pageName + '_axeReport.html';
        try {
            await fs.ensureFile(reportFolder)
            console.log("Axe Report is created successful")
        } catch (err) {
            console.error("Axe Report is not created successful");
        }

        var fsat = require("fs");
        var htmlContent = '';
        htmlContent = htmlContent + '<html><title>Accessibility Check</title><style>';
        htmlContent = htmlContent + '.thumbnail { border: 1px solid black; margin-left: 1em; margin-right: 1em; width: auto; max-height: 150px; }';
        htmlContent = htmlContent + '.thumbnail:hover { border: 2px solid black; }';
        htmlContent = htmlContent + '.wrap .wrapTwo .wrapThree { margin: 2px; max-width: 70vw; }';
        htmlContent = htmlContent + '.wrapOne { margin-left: 1em; overflow-wrap: anywhere; }';
        htmlContent = htmlContent + '.wrapTwo { margin-left: 2em; overflow-wrap: anywhere; }';
        htmlContent = htmlContent + '.wrapThree { margin-left: 3em; overflow-wrap: anywhere; }';
        htmlContent = htmlContent + '.emOne { margin-left: 1em; margin-right: 1em; overflow-wrap: anywhere; }';
        htmlContent = htmlContent + '.emTwo { margin-left: 2em; overflow-wrap: anywhere; }';
        htmlContent = htmlContent + '.emThree { margin-left: 3em; overflow-wrap: anywhere; }';
        htmlContent = htmlContent + '#modal { display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgba(0, 0, 0, 0.9); flex-direction: column; }';
        htmlContent = htmlContent + '#modalclose { font-family: Lucida Console; font-size: 35px; width: auto; color: white; text-align: right; padding: 20px; cursor: pointer; max-height: 90%; }';
        htmlContent = htmlContent + '#modalImage { margin: auto; display: block; max-width: 95%; padding: 10px; max-height: 90%; }';
        htmlContent = htmlContent + '.htmllable { border-top: double lightgray; width: 100%; display: table; }';
        htmlContent = htmlContent + '.sectionButton { background-color: #000000; color: #FFFFFF; cursor: pointer; padding: 18px; width: 100%; text-align: left; outline: none; transition: 0.4s; border: 1px solid black; }';
        htmlContent = htmlContent + '.sectionButton:hover { background-color: #828282; }';
        htmlContent = htmlContent + '.buttonInfoText { width: 50%; float: left; }';
        htmlContent = htmlContent + '.buttonExpandoText { text-align: right; width: 50%; float: right; }';
        htmlContent = htmlContent + '.majorSection { padding: 0 18px; background-color: white; overflow: hidden; transition: max-height 0.2s ease-out; }';
        htmlContent = htmlContent + '.findings { margin-top: 5px; border-top: 1px solid black; }';
        htmlContent = htmlContent + '.active { background-color: #474747; margin-bottom: 0px; }';
        htmlContent = htmlContent + '.resultWrapper { margin: 5px; }';
        htmlContent = htmlContent + '#context { width: 50%; }';
        htmlContent = htmlContent + '#image { width: 50%; }';
        htmlContent = htmlContent + '#counts { width: 50%; }';
        htmlContent = htmlContent + '#metadata { display: flex; flex-wrap: wrap; }';
        htmlContent = htmlContent + '#results { display: flex; flex-direction: column; }';
        htmlContent = htmlContent + '@media only screen and (max-width: 800px) { #metadata { flex-direction: column; } #context { width: 100%; } #image { width: 100%; } }';
        htmlContent = htmlContent + '</style>';
        htmlContent = htmlContent + '<body><content>';


        var violationCount = 0;
        for (let val of results.violations) {
            if (val.nodes.length == 0) {
                violationCount = violationCount + 1;
            } else {
                violationCount = violationCount + 1;
            }
        }
        var incompleteCount = 0;
        for (let val of results.incomplete) {
            if (val.nodes.length == 0) {
                incompleteCount = incompleteCount + 1;
            } else {
                incompleteCount = incompleteCount + 1;
            }
        }
        var passesCount = 0;
        for (let val of results.passes) {
            if (val.nodes.length == 0) {
                passesCount = passesCount + 1;
            } else {
                passesCount = passesCount + 1;
            }
        }
        var inapplicableCount = 0;
        for (let val of results.inapplicable) {
            if (val.nodes.length == 0) {
                inapplicableCount = inapplicableCount + 1;
            } else {
                inapplicableCount = inapplicableCount + 1;
            }
        }

        htmlContent = htmlContent + '<h1>Accessibility Check</h1><div id="metadata"><div id="context"><h3>Context:</h3><div class="emOne" id="reportContext">Url: ';
        htmlContent = htmlContent + results.url + '<br>Orientation: ' + results.testEnvironment.orientationType;
        htmlContent = htmlContent + '<br>Size: ' + results.testEnvironment.windowWidth + ' x ' + results.testEnvironment.windowHeight;
        htmlContent = htmlContent + '<br>Time: ' + results.timestamp;
        htmlContent = htmlContent + '<br>User agent: ' + results.testEnvironment.userAgent + '<br>Using :' + results.testEngine.name + ' ' + results.testEngine.version + '</div></div>';
        htmlContent = htmlContent + '<div id="counts"><h3>Counts:</h3><div class="emOne">Violation: ' + violationCount + '<br>';
        htmlContent = htmlContent + 'Incomplete: ' + incompleteCount + '<br>Pass: ' + passesCount + '<br>';
        htmlContent = htmlContent + 'Inapplicable: ' + inapplicableCount + '</div></div></div>';
        htmlContent = htmlContent + '<div id="results">';
        fsat.writeFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        if (results.violations.length > 0) {
            htmlContent = '<div class="resultWrapper"><button class="sectionbutton active"><h2 class="buttonInfoText">Violations: ' + violationCount + '</h2><h2 class="buttonExpandoText">-</h2></button><div class="majorSection" id="ViolationsSection">'; 
            fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        }
        var c = 0;
        for (let val of results.violations) {
            c = c + 1;
            htmlContent = "";

            if (val.impact === "serious" || val.impact === "critical") {
                globalVariable.g_AxeStatus.set(pageName, true);
            }

            var h = val.help;
            h = replaceAll(h, "<", "&lt;");
            h = replaceAll(h, ">", "&gt;");
            var d = val.description;
            d = replaceAll(d, "<", "&lt;");
            d = replaceAll(d, ">", "&gt;");
            htmlContent = "<div class='findings'>" + c + ":" + h + "<div class='emTwo'>Description: " + d + "<br>Help: " + h + "<br>HelpUrl: " + val.helpUrl + "<br>Impact: " + val.impact + "<br>Tags: " + val.tags + "<br>Element(s):</div>";
            for (let a of val.nodes) {
                var txt = a.html;
                txt = replaceAll(txt, "<", "&lt;");
                txt = replaceAll(txt, "\"", "&quot;");
                txt = replaceAll(txt, ">", "&gt;");
                htmlContent = htmlContent + "<div class='htmlTable'><div class='emThree'>Html:<p class='wrapOne'>" + txt + "</p>Selector(s):<p class='wrapTwo'>" + a.target[0] + "</p></div></div>";
            }
            htmlContent = htmlContent + "</div>";
            fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        }
        if (results.violations.length > 0) {
            htmlContent = "</div></div>";
            fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        }
        if (results.incomplete.length > 0) {
            htmlContent = "<div class='resultWrapper'><button class='sectionbutton active'><h2 class='buttonInfoText'>Incomplete: " + incompleteCount + "</h2><h2 class='buttonExpandoText'>-</h2></button><div class='majorSection' id='IncompleteSection'>";
            fsat.appendFileSync(reportFolder, htmlContent, (error) => {  });
        }
        c = 0;
        for (let val of results.incomplete) {
            c = c + 1;

            var h = val.help;
            h = replaceAll(h, "<", "&lt;");
            h = replaceAll(h, ">", "&gt;");
            var d = val.description;
            d = replaceAll(d, "<", "&lt;");
            d = replaceAll(d, ">", "&gt;");
            htmlContent = "<div class='findings'>" + c + ':' + h + "<div class='emTwo'>Description: " + d + "<br>Help: " + h + "<br>HelpUrl: " + val.helpUrl + "<br>Impact: " + val.impact + "<br>Tags: " + val.tags + "<br>Element(s):</div>";
            for (let a of val.nodes) {
                var txt = a.html;
                txt = replaceAll(txt, "<", "&lt;");
                txt = replaceAll(txt, "\"", "&quot;");
                txt = replaceAll(txt, ">", "&gt;");
                htmlContent = htmlContent + "<div class='htmlTable'><div class='emThree'>Html:<p class='wrapOne'>" + txt + "</p>Selector(s):<p class='wrapTwo'>" + a.target[0] + "</p></div></div>";
            
            }
            htmlContent = htmlContent + "</div>";
            fsat.appendFileSync(process.cwd()+'/reports/html-report/specs/' + pageName + '_axeReport.html', htmlContent, (error) => {  });
        }
        if (results.incomplete.length > 0) {
            htmlContent = '</div></div>';
            fsat.appendFileSync(reportFolder, htmlContent, (error) => {  });
        }

        if (results.passes.length > 0) {
            htmlContent = '<div class="resultWrapper"><button class="sectionbutton active"><h2 class="buttonInfoText">Passes: ' + passesCount + '</h2><h2 class="buttonExpandoText">-</h2></button><div class="majorSection" id="PassesSection">';
            fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        }
        c = 0;
        for (let val of results.passes) {
            c = c + 1;
            var h = val.help;
            h = replaceAll(h, "<", "&lt;");
            h = replaceAll(h, ">", "&gt;");
            var d = val.description;
            d = replaceAll(d, "<", "&lt;");
            d = replaceAll(d, ">", "&gt;");
            htmlContent = '<div class="findings">'+ c + ':' + h + '<div class="emTwo">Description: ' + d + '<br>Help: ' + h + '<br>HelpUrl: ' + val.helpUrl + '<br>Tags: ' + val.tags + '<br>Element(s):</div>';
            for (let a of val.nodes) {
                var txt = a.html;
                txt = replaceAll(txt, "<", "&lt;");
                txt = replaceAll(txt, "\"", "&quot;");
                txt = replaceAll(txt, ">", "&gt;");
                htmlContent = htmlContent + '<div class="htmlTable"><div class="emThree">Html:<p class="wrapOne">' + txt + '</p>Selector(s):<p class="wrapTwo">' + a.target[0] + '</p></div></div>';
            }
            htmlContent = htmlContent + '</div>';
            fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        }

        if (results.passes.length > 0) {
            htmlContent = '</div></div>';
            fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        }

       if (results.inapplicable.length > 0) {
            htmlContent = '<div class="resultWrapper"><button class="sectionbutton active"><h2 class="buttonInfoText">Inapplicable: ' + inapplicableCount + '</h2><h2 class="buttonExpandoText">-</h2></button><div class="majorSection" id="InapplicableSection">';
            fsat.appendFileSync(reportFolder, htmlContent, (error) => {  });
        }
        c = 0;
        for (let val of results.inapplicable) {
            c = c + 1;
            if (val.impact === "serious" || val.impact === "critical") {
                // globalVariable.e_AxeStatus = true;
            }
            var h = val.help;
            h = replaceAll(h, "<", "&lt;");
            h = replaceAll(h, ">", "&gt;");
            var d = val.description;
            d = replaceAll(d, "<", "&lt;");
            d = replaceAll(d, ">", "&gt;");
            htmlContent = "<div class='findings'>" + c + " : " + h + "<div class='emTwo'>Description : " + d + "<br>Help : " + h + "<br>HelpUrl : " + val.helpUrl + "<br>Tags : " + val.tags + "<br>Element(s):</div>";
            for (let a of val.nodes) {
                var txt = a.html;
                txt = replaceAll(txt, '<', '&lt;');
                txt = replaceAll(txt, '"', '&quot;');
                txt = replaceAll(txt, '>', '&gt;');
                htmlContent = htmlContent + "<div class='htmlTable'><div class='emThree'>Html:<p class='wrapOne'>" + txt + "</p>Selector(s):<p class='wrapTwo'>" + a.target[0] + "</p></div></div>";
            }
            htmlContent = htmlContent + "</div>";
            fsat.appendFileSync(reportFolder, htmlContent, (error) => {  });
        }


        if (results.inapplicable.length > 0) {
            htmlContent = "</div></div>";
            fsat.appendFileSync(reportFolder, htmlContent, (error) => {  });
        }
        htmlContent = '</div></content>';
        htmlContent = htmlContent + "<script>var buttons = document.getElementsByClassName('sectionbutton'); var i;\r\n";
        htmlContent = htmlContent + "for (i = 0; i < buttons.length; i++) {\r\n";
        htmlContent = htmlContent + "buttons[i].addEventListener('click', function() {\r\n";
        htmlContent = htmlContent + "var expandoText = this.getElementsByClassName('buttonExpandoText')[0];\r\n";
        htmlContent = htmlContent + "this.classList.toggle('active'); var content = this.nextElementSibling;\r\n";
        htmlContent = htmlContent + "if (expandoText.innerHTML == '-') {\r\n";
        htmlContent = htmlContent + "content.style.maxHeight = '0'; expandoText.innerHTML = '+';\r\n";
        htmlContent = htmlContent + "} else {\r\n";
        htmlContent = htmlContent + "content.style.maxHeight = content.scrollHeight + 'px';expandoText.innerHTML = '-';}\r\n";
        htmlContent = htmlContent + "});\r\n";
        htmlContent = htmlContent + "}\r\n</script>";
        htmlContent = htmlContent + "</body></html>";
        fsat.appendFileSync(reportFolder, htmlContent, (error) => { /* handle error */ });
        console.log("Accessibility Testing");
        if (globalVariable.g_AxeStatus.size > 0) {
            console.log("Accessibility Status : Fail");
        } else {
            console.log("Accessibility Status : Pass");
        }
        console.log("Violations: " + violationCount)
        console.log("Passes: " + passesCount)
        console.log("Incomplete: " + incompleteCount)
        console.log("InApplicable: " + inapplicableCount)
        globalVariable.totalPassedCnt = passesCount + globalVariable.totalPassedCnt;
        globalVariable.totalViolationCnt = violationCount + globalVariable.totalViolationCnt;
        globalVariable.totalIncompleteCnt = incompleteCount + globalVariable.totalIncompleteCnt;
        globalVariable.totalInapplicableCnt = inapplicableCount + globalVariable.totalInapplicableCnt;
        function replaceAll(string, search, replace) {
            return string.split(search).join(replace);
        }
    }

    async verifydeepEqual(actual, expected) {
        assert.deepEqual(actual, expected)
    }

    async navigateTo(url) {
        uiCount = 1 + uiCount
        await globalVariable.page.goto(url)
    }
    sleep(ms){
        return new Promise(resolve=>{
            setTimeout(resolve,ms)
        })
    }
}
module.exports = new baseAction()
