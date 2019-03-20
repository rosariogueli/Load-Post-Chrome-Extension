/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Test PostForm.js: Create a headless browser using puppeteer and open the popup page
 *              wait for the form to render and programmatically enter the test Post ID 
 *              override the onSubmit callback with our test callback to grab the resulting postId
 *              click the submit button to fire the onSubmit callback
 *              quit headless browser and close server.
 *              Finally, it checks that the test returned the postId correctly, 
 *              if so the PostForm instance and all its internal methods have worked correctly.
 */

import { expect } from 'chai';
import connect from 'connect';
import serveStatic from 'serve-static';
import puppeteer from 'puppeteer';

// for this test we need to run a local web server that allows the popup.html page to fully load css and js resources
const localServer = connect().use(serveStatic(__dirname+'/../')).listen(8090, () => {
    
    // local server is running, go ahead!

    const url = 'http://localhost:8090/src/html/popup.html';
    const testPostID = '13';

    describe('PostForm', () => {

        describe(`Opening ${url} in a headless browser, enter test Post ID ${testPostID} and submit the form`, () => {
            
            it('should return the test Post ID ${testPostID} via onSubmit callback', () => {

                const resultPostId = async () => {
                    
                    // create a headless browser using puppeteer and open the popup page
                    const browser = await puppeteer.launch({headless: true});
                    const page = await browser.newPage();
                    // networkidle0 waits for the network to be idle (no requests for 500ms).
                    await page.goto(url, {waitUntil: 'networkidle0'});

                    // wait for the form to render and programmatically enter the Post ID 
                    await page.waitForSelector('#post-form');
                    await page.type('#post-form input[type="number"]', testPostID);

                    // override the onSubmit callback with our test callback to grab the postId
                    const postId = await page.evaluate(() => {
                        return new Promise(resolve => {
                            postForm.onSubmit(postId => {
                                resolve(postId);
                            });
                            // click the submit button to fire the onSubmit callback
                            document.querySelector('#post-form button.btn-success').click();
                        });
                    });

                    // quit headless browser and close server.
                    await browser.close();
                    localServer.close();
                    
                    return postId;
                }

                // check that the test returned the postId correctly, if so the PostForm instance and all its internal methods have worked succesfully.
                return resultPostId().then(postId => {
                    expect(postId).to.equal(testPostID);
                });

            });
        });
    }); 

});

