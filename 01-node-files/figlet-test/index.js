const figlet = require('figlet');

function generateAscii(text) {
    try {
        // textSync returns the string directly or throws an error
        return figlet.textSync(text); 
    } catch (err) {
        // Re-throw the error or wrap it in a custom message
        throw new Error(`Failed to generate ASCII art: ${err.message}`);
    }
}

module.exports = {
    generate: generateAscii
};