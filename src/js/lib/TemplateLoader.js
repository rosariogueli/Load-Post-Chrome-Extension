/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Loads the html template where we will inject the api data.
 */

 import ChromeExtension from './ChromeExtension.js';

 class TemplateLoader{

   constructor(){
      this.template_data = false;
   }

   load(path, onLoad = template_data => {}){
      // if template was previously loaded, dont fetch a new one. 
      if(this.template_data){
         onLoad(this.template_data);
      }
      // if this is a new template path, fetch it and cache it.
      else{
         fetch(ChromeExtension.url(path))
            .then((response) => response.text())
            .then(data => {
               this.template_data = data;
               onLoad(data);
            });
      }

   }
}

export default TemplateLoader;