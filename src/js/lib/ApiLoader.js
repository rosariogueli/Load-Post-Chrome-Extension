/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Load api data either from server or cache.
 */

 class ApiLoader{

    constructor(apiEndpoint){
        // api REST endpoint
        this.apiEndpoint = apiEndpoint;

        // Here we will keep our cache of posts and comments to reduce 
        // the number of API calls and server load, inluding for errors!
        this.localPosts = {};

        this.onErrorCallback = (errorMsg) => {};
    }

    loadUrl(path, success = (data) => {}){

        // for new requests (ie. if path was not previously cached)
        if( ! (path in this.localPosts)){

            // ask the server...
            fetch(this.apiEndpoint+'/'+path)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    return response.json();
                })
                .then(data => {
                    this.localPosts[path] = data;
                    success(data);
                })
                // if post cannot be found...
                .catch(error => {    
                    // cache error so we don't stress our server friend next time...
                    this.localPosts[path] = {
                        error: error.message
                    };        
                    // trigger error callback
                    this.onErrorCallback(error.message);
                });
        }
        // for cached request, dig them from the this.localPosts container
        else{
            // for a request the cached as an error...
            if(this.localPosts[path].error){
                // trigger error callback
                this.onErrorCallback(this.localPosts[path].error);
            }
            // for good cached data, call it a day!
            else{
                success(this.localPosts[path]);
            }
        }
    }

    onError(onErrorCallback = (errorMsg) => {}){
        this.onErrorCallback = onErrorCallback;
    }
 }

 export default ApiLoader;