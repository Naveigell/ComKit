// This shim keeps backward compatibility for commands that still reference
// sourcecode/playwright.config.js. The active config now lives beside tests.
module.exports = require('./end2end-test/playwright.config.js');
