/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it>
 * @description Receive postId from popup, load post data and send it to the page
 *              NOTE: This file is a module thus it must be loaded as such. We do this 
 *                    in the background.html script tag using <script type="module" src="/src/js/background.js"></script>
 */

import ApiLoader from './lib/ApiLoader.js';
import TabsManager from './lib/TabsManager.js';
import TemplateLoader from './lib/TemplateLoader.js';

const apiLoader = new ApiLoader('https://jsonplaceholder.typicode.com');
const tabsManager = new TabsManager();
const templateLoader = new TemplateLoader();

// when there are any errors...
apiLoader.onError(error => {
    // render the error
    tabsManager.renderPage({error: error});
});

// Load the template for our posts and tell tabsManager about it 
// html template file can be loaded here because we've allowed it in the manifest file's web_accessible_resources.
templateLoader.load('src/html/post-template.html', template_data => {
    tabsManager.setTemplate(template_data);
});

// wait for popup action to fire, get action type and postId and load post and comments from Api or cache!
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.action === 'popup-load-post'){
        // prepare page to receive data
        tabsManager.preparePage();
        
        // load post information by request.data.postId
        apiLoader.loadUrl(`posts/${request.data.postId}`, post => {
            // given the post data, show the post inside the current page, while below we load our comments too.
            tabsManager.renderPage({post});

            // load post comments and show them in the page
            apiLoader.loadUrl(`comments?postId=${post.id}`, comments => {
                // add comments to page                    
                tabsManager.renderPage({post, comments});
            });
        });
    }

});