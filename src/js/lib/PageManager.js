/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Manages the current page, processes and injects the computed template. Requires Mustache.js
 */

class PageManager{

    constructor(){
        // html template that will be send from the background script (which has loaded it once only and cached for anytime use)
        this.post_template = '';
    }

    // this method uses the Mustache template engine, which takes the html 
    // template loaded above and replaces placeholders with the actual data values
    render(data = {}){
        const computed_post = Mustache.render(this.post_template, data);

        // remove all in the head because we want clear style and add our bootstrap css (do it only once for faster rendering)
        const bootstrap_css = '<link rel="stylesheet" href="'+ chrome.runtime.getURL('node_modules/bootstrap/dist/css/bootstrap.css')+'">';
        if(document.head.innerHTML !== bootstrap_css)
            document.head.innerHTML = bootstrap_css;

        // inject our computed_post text data
        document.body.innerHTML = computed_post;
    };

    // remove everything from the current page
    reset(new_template){

        this.post_template = new_template;

        // optional, speeds up future uses
        Mustache.parse(this.post_template);  

        // load template without data, this will show loading spinners
        this.render();
    };

}

export default PageManager;