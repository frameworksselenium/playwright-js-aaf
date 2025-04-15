const fs = require("fs");

// Load JSON from file
function loadJSON(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading JSON:", error);
        return null;
    }
}

// Extract elements between specified `y` values
function extractElementsBetween(jsonData, yStart, yEnd) {
    if (!jsonData || !jsonData.Pages) {
        console.error("Invalid JSON structure: 'Pages' node is missing.");
        return null;
    }

    let extractedData = { Pages: [] };

    jsonData.Pages.forEach((page) => {
        const filteredTexts = page.Texts.filter(text => text.y > yStart && text.y < yEnd);
        extractedData.Pages.push({ Texts: filteredTexts });
    });

    return extractedData;
}

// Save extracted JSON to a file
function saveJSON(filePath, jsonData) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
        console.log("Extracted JSON saved successfully to", filePath);
    } catch (error) {
        console.error("Error saving JSON:", error);
    }
}

// Define file paths
const inputFilePath = "extracted_data.json"; // Replace with your input JSON file
const outputFilePath = "extracted_section.json"; // Output file

// Load and process JSON
let jsonData = loadJSON(inputFilePath);
if (jsonData) {
    // Define `y` values of the elements to extract between
    const yStart = 16.919;  // Starting y-coordinate
    const yEnd = 20.594;    // Ending y-coordinate

    let extractedData = extractElementsBetween(jsonData, yStart, yEnd);

    if (extractedData) {
        saveJSON(outputFilePath, extractedData);
    }
}
