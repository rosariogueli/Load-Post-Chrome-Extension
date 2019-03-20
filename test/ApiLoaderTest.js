/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Test ApiLoader.js
 */

import { assert } from 'chai';
import ApiLoader from '../src/js/lib/ApiLoader.js';

const apiLoader = new ApiLoader('https://jsonplaceholder.typicode.com');

describe('ApiLoader', () => {

    describe('apiLoader.loadUrl(`posts/1`)', () => {
        it('should load a post object from the remote API server', () => {
            return apiLoader.loadUrl(`posts/1`, post => {
                assert.isObject(post);
            });
        });
    });

    describe('apiLoader.loadUrl(`comments?postId=1`)', () => {
        it('should return a comments array from the remote API server', () => {
            return apiLoader.loadUrl(`comments?postId=1`, comments => {
                assert.isArray(comments);
            });
        });
    });

    describe('apiLoader.loadUrl(`posts/101`)', () => {
        it('trying the wrong id should return an error message', () => {
            return apiLoader.loadUrl(`posts/101`)
                            .onError((errorMsg) => {
                                assert.isString(errorMsg);
                            });
        });
    });
    
 });