var url = process.env.WEB_URL || "https://www.saucedemo.com/"
var tcName
const relativePath = process.cwd();
var JM_Value = new Map();
var dos = 0;
var totalPassedCnt;
var totalViolationCnt;
var totalIncompleteCnt;
var totalInapplicableCnt;
var g_AxeStatus = new Map();
var reportURL;
var isDate;
var dateFormat = require('dateformat');
var now = new Date();
var dt = dateFormat(now, "yyyy-mm-dd_hh_mm_ss");
var outputfolder;
module.exports = {
    url,
    tcName,
    relativePath,
    JM_Value,
    dos,
    totalPassedCnt,
    totalViolationCnt,
    totalIncompleteCnt,
    totalInapplicableCnt,
    g_AxeStatus,
    isDate,
    reportURL,
    dt,
    outputfolder
};