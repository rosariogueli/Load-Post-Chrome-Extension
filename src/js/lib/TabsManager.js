/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Manages the current tab.
 */

 class TabsManager{

    constructor(){
        this.template_data = '';
    }

    setTemplate(template_data){
        this.template_data = template_data;
    }

    preparePage(){
        this.tellTab('bg-prepare-page', {post_template: this.template_data});
    }   

    renderPage(data){
        this.tellTab('bg-render-page', data);
    }

    // tell current tab what to do
    tellTab(action, data){
        // get selected tab 
        chrome.tabs.getSelected(null, tab => {
            // send command and data to seleted tab
            chrome.tabs.sendMessage(tab.id, {action, data});
        });
        
    };

 }

 export default TabsManager;