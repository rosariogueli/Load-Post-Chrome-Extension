/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it>
 * @description Receive data from background script and render on page.
 */

import PageManager from './lib/PageManager.js';

const page = new PageManager();

export const main = () => {
    
    // wait for the popup action to fire, get action type and postId and load post and comments 
    chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.action){
            case 'bg-prepare-page':
                // remove everything from the current page and load new template
                page.reset(request.data.post_template);
            break;
            case 'bg-render-page': 
                // render data sent from background
                page.render(request.data);            
            break;
            default:
                // nothing
        }
    });
};