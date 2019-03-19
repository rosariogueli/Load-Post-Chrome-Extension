/**
 * @author      Rosario Gueli <rosariogueli@hotmail.it> 
 * @description Manages Chrome Extension API with methods and callbacks that our code can communicate with.
 */

class ChromeExtension{
    
    /**
     * Send message globally
     * @param string action 
     * @param object data 
     */
    static tellApp(action, data){
        // message the background.js guy and tell him to load the post by postId
        chrome.runtime.sendMessage({
            action,
            data
        });
    }

    /**
     * Send message to current selected tab
     * @param string action 
     * @param object data 
     */
    static tellTab(action, data){
        // get selected tab 
        chrome.tabs.getSelected(null, tab => {
            // send command and data to seleted tab
            chrome.tabs.sendMessage(tab.id, {action, data});
        });
    }

    /**
     * Bind a callback and wait for messages with action and data.
     * @param function callback 
     */
    static onMessage(callback = (action, data) => {}){
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => callback(
            request.action, 
            request.data
        ));
    }

    static url(path){
        return chrome.runtime.getURL(path);
    }

}

export default ChromeExtension;