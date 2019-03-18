/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it>
 * @description Dynamic Import function to allow easy import of modules. 
 */

/**
 * Use Dynamic Import (v:ES6):
 * Import content_main.js module and then call its main method!
 */
(() => {
    // get script url relative to plugin
    const content_main_path = chrome.extension.getURL('src/js/content_main.js');

    // load content main module 
    Promise.resolve()
        .then(() => import(content_main_path)) // jshint ignore:line
        .then(contentMain => contentMain.main())
        .catch(e => console.error(e));
})(); 