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

// Function to remove elements between specified `T` values
function removeElementsBetween(jsonData, startText, endText) {
    if (!jsonData || !jsonData.Pages) {
        console.error("Invalid JSON structure: 'Pages' node is missing.");
        return null;
    }

    jsonData.Pages.forEach((page) => {
        let removeMode = false;

        page.Texts = page.Texts.filter((text) => {
            const textValue = text.R[0].T;

            if (textValue === startText) {
                removeMode = true; // Start removing elements
                return true; // Keep the start text
            }

            if (textValue === endText) {
                removeMode = false; // Stop removing elements
                return true; // Keep the end text
            }

            return !removeMode; // Remove elements between start and end
        });
    });

    return jsonData;
}

// Save updated JSON to a file
function saveJSON(filePath, jsonData) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf-8");
        console.log("Updated JSON saved successfully to", filePath);
    } catch (error) {
        console.error("Error saving JSON:", error);
    }
}

// Define file paths
const inputFilePath = "extracted_data.json"; // Replace with your actual input JSON file
const outputFilePath = "cleaned_data.json"; // Output file after deletion

// Load and process JSON
let jsonData = loadJSON(inputFilePath);
if (jsonData) {
    // Define `T` values of the elements to remove between
    const startText = "Specific%20Client%2C%20Contract%2C%20Project%2C%20or%20Service%20Named%20Insured%20Schedule"; // Starting element
    const endText = "Footer%20Details"; // Ending element

    let cleanedData = removeElementsBetween(jsonData, startText, endText);

    if (cleanedData) {
        saveJSON(outputFilePath, cleanedData);
    }
}
