const { test, expect } = require('@playwright/test');
const fs = require('fs');
const pdf = require('pdf-parse');

const { dependencies } = require('../testdata/pdf');

test('Read content from local PDF file', async () => {

    const filePath = dependencies.pdfData;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfContent = await pdf(dataBuffer);

    console.log(`Total Pages: ${pdfContent.numpages}`);
    console.log(`PDF Text:\n${pdfContent.text}`);

    expect(pdfContent.numpages).toBeGreaterThan(0);
    expect(pdfContent.text).not.toBe('');

});