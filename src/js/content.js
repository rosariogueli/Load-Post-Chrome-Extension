/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it>
 * @description Dynamic Import function to allow easy import of modules. 
 */

/**
 * Use Dynamic Import (v:ES6):
 * Import PageManager module and call waitForActions!
 */
(() => {
    // get script url relative to plugin
    const pageManagerPath = chrome.extension.getURL('src/js/lib/PageManager.js');

    // load PageManager.js
    Promise.resolve()
        .then(() => import(pageManagerPath)) // jshint ignore:line
        .then(module => new module.default());
})(); 