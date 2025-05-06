var url = process.env.WEB_URL || "https://www.saucedemo.com/"
var tcName
const relativePath = process.cwd();
var JM_Value = new Map();
module.exports = {
    url,
    tcName,
    relativePath,
    JM_Value,
};