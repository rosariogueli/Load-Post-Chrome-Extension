/**
 * @author Rosario Gueli <rosariogueli@hotmail.it>
 * 
 * @description This js file is included in the popup.html page, 
 *              it attaches the html form to the PostForm module, 
 *              waits for a submit with postId and sends it to the background script.            
 */

import ChromeExtension from './lib/ChromeExtension.js';
import PostForm from './lib/PostForm.js';

// attach popup html form to PostForm module 
const postForm = new PostForm('#post-form');

// wait for a submit action
postForm.onSubmit(postId => ChromeExtension.tellApp('popup-load-post', {postId}) );

// useful for testing in puppeteer
window.postForm = postForm;