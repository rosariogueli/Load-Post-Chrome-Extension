/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it>
 * @description Receive postId from popup, load post data and send it to the page
 *              NOTE: This file is a module thus it must be loaded as such. We do this 
 *                    in the background.html script tag using <script type="module" src="/src/js/background.js"></script>
 */

import ApiLoader from './lib/ApiLoader.js';
import TemplateLoader from './lib/TemplateLoader.js';
import ChromeExtension from './lib/ChromeExtension.js';

const templateLoader = new TemplateLoader();
const apiLoader = new ApiLoader('https://jsonplaceholder.typicode.com');

// when there are any errors, show them on page.
apiLoader.onError(error => ChromeExtension.tellTab('bg-render-page', {error}) );

// Load the template for our posts:
// html template file can be loaded here because we've allowed it in the manifest file's web_accessible_resources.
let post_template = '';
templateLoader.load(ChromeExtension.url('src/html/post-template.html'), template_data => {
    post_template = template_data;
});

// wait for popup action to fire, get action type and postId and load post and comments from Api server or local cache!
ChromeExtension.onMessage((action, data) => {
    if (action === 'popup-load-post'){
        // prepare page to receive data
        ChromeExtension.tellTab('bg-prepare-page', {post_template});
        
        // load post information by data.postId
        apiLoader.loadUrl(`posts/${data.postId}`, post => {
            // given the post data, show the post inside the current page, while below we load our comments too.
            ChromeExtension.tellTab('bg-render-page', {post});

            // load post comments and show them in the page
            apiLoader.loadUrl(`comments?postId=${post.id}`, comments => {
                // add comments to page                    
                ChromeExtension.tellTab('bg-render-page', {post, comments});
            });
        });
    }

});