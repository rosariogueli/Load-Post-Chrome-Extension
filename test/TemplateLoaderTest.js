/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Test TemplateLoader.js
 */

import { assert, expect } from 'chai';
import TemplateLoader from '../src/js/lib/TemplateLoader.js';
import connect from 'connect';
import serveStatic from 'serve-static';

const templateLoader = new TemplateLoader();

// for this test we need to run a local web server 
const localServer = connect().use(serveStatic('src/html/')).listen(8080, () => {
    
    // local server is running, go ahead!

    const localUrl = 'http://localhost:8080/post-template.html';

    describe('TemplateLoader', () => {

        describe(`TemplateLoader.load(${localUrl})`, () => {
            it('should return a template_data string that contains the {{title}} placeholder', () => {
                return templateLoader.load(localUrl, template_data => {

                    // stop server now that we have the result
                    localServer.close();

                    assert.isString(template_data);
                    expect(template_data).to.contain('{{title}}');
                });
            });
        });

    });
});
