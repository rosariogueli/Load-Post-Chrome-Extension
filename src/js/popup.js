/**
 * @author Rosario Gueli <rosariogueli@hotmail.it>
 * 
 * @description This js file is included in the popup.html page, 
 *              it attaches the html form to the PostForm module, 
 *              waits for a submit with postId and sends it to the background script.            
 */

import PostForm from './lib/PostForm.js';

// attach popup html form to PostForm module 
const postForm = new PostForm('#post-form');

// wait for a submit action
postForm.onSubmit(postId => {
    // message the background.js guy and tell him to load the post by postId
    chrome.runtime.sendMessage({
        action: 'popup-load-post',
        data: {postId}
    });
});