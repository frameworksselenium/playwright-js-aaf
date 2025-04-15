const PDFParser = require("pdf2json");
const fs = require("fs");

function readPDF(filePath) {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
        console.error(`Error: ${errData.parserError}`);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
        try {
            // Save the entire JSON object to a file
            const jsonFilePath = "extracted_data.json";
            fs.writeFileSync(jsonFilePath, JSON.stringify(pdfData, null, 2), "utf-8");
            console.log(`Extracted JSON saved to '${jsonFilePath}'`);

            // Extract text from each page (if needed for additional processing)
            if (!pdfData.Pages) {
                throw new Error("Invalid PDF structure: Missing Pages.");
            }

        } catch (error) {
            console.error("Error processing PDF data:", error.message);
        }
    });

    // Load the PDF file
    pdfParser.loadPDF(filePath);
}
// Replace with your PDF file path
const pdfFilePath = "PDFFile.pdf";
readPDF(pdfFilePath);
