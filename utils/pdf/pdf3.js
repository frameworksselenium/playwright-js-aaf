const fs = require('fs');

// Function to read JSON file
function readJSONFile(filename) {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

// Function to decode URL-encoded text
const decodeText = (text) => decodeURIComponent(text);

// Process JSON Data
function processJSONData(jsonData) {
    let groupedData = {};

    // Step 1: Group text by x-coordinate and sort by y-coordinate
    jsonData.Pages.forEach(page => {
        page.Texts.forEach(text => {
            let xValue = text.x;
            let yValue = text.y;
            let textValue = decodeText(text.R[0].T).trim(); // Decode and clean text

            if (!groupedData[xValue]) {
                groupedData[xValue] = [];
            }
            groupedData[xValue].push({ y: yValue, T: textValue });
        });
    });

    // Step 2: Merge fragmented headers in the same x-coordinate
    Object.keys(groupedData).forEach(x => {
        groupedData[x].sort((a, b) => a.y - b.y); // Sort by y to merge correctly

        let mergedText = "";
        let lastY = null;
        let mergedData = [];

        groupedData[x].forEach((entry, index) => {
            if (lastY === null || Math.abs(entry.y - lastY) < 1) {
                // Merge consecutive lines within close y proximity
                mergedText += (mergedText ? " " : "") + entry.T;
            } else {
                // Save the merged text and start a new one
                mergedData.push({ y: lastY, T: mergedText });
                mergedText = entry.T;
            }
            lastY = entry.y;
        });

        // Push the last merged value
        if (mergedText) {
            mergedData.push({ y: lastY, T: mergedText });
        }

        groupedData[x] = mergedData;
    });

    // Step 3: Match merged headers with corresponding values
    let formattedOutput = {
        page: Object.keys(groupedData).map(x => {
            let sortedTexts = groupedData[x];

            if (sortedTexts.length >= 2) {
                return {
                    x: parseFloat(x),
                    y: sortedTexts[0].y, // Keep header y-value
                    T: `${sortedTexts[0].T}:${sortedTexts[1].T}` // Match header with value
                };
            } else {
                return {
                    x: parseFloat(x),
                    y: sortedTexts[0].y,
                    T: sortedTexts[0].T
                };
            }
        })
    };

    return formattedOutput;
}

// Function to write JSON output to a file
function writeJSONFile(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 4), 'utf8');
}

// File paths
const inputFile = 'extracted_section.json';  // Replace with actual input file name
const outputFile = 'output.json';

// Read, process, and write JSON data
try {
    const inputData = readJSONFile(inputFile);
    const processedData = processJSONData(inputData);
    writeJSONFile(outputFile, processedData);
    console.log(`Processed data has been saved to ${outputFile}`);
} catch (error) {
    console.error("Error processing the JSON file:", error);
}




/*### **Solution Approach:**
1. **Group text by `x` coordinate** (same column alignment).
2. **Sort text by `y` value** (headers first, then values).
3. **Match each header (`y = row 1`) with its corresponding value (`y = row 2` for the same `x`)**.
4. **Concatenate the matched pairs in `Header:Value` format**.*/