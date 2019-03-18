/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it>
 * @description Receive data from background script and render on page.
 */

import PageManager from './lib/PageManager.js';

const page = new PageManager();

export const main = () => {
    
    // wait for background actions to fire, get action with data to load post and comments inside our page.
    chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.action){
            case 'bg-prepare-page':
                // remove everything from the current page and load template
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