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

    jsonData.Pages.forEach(page => {
        page.Texts.forEach(text => {
            let xValue = text.x;
            let yValue = text.y;
            let textValue = decodeText(text.R[0].T);

            // Group by x coordinate while keeping the lowest y value
            if (!groupedData[xValue]) {
                groupedData[xValue] = { x: xValue, y: yValue, T: textValue };
            } else {
                groupedData[xValue].T += `:${textValue}`; // Concatenate text values with `:`
            }
        });
    });

    // Convert grouped data to the required format
    return { 
        page: Object.values(groupedData).map(entry => ({
            x: entry.x, 
            y: entry.y,
            T: entry.T
        }))
    };
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
