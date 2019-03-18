/**
 * @author Rosario Gueli <rosariogueli@hotmail.it>
 * 
 * @description PostForm wrapper class for our popup form by its id, 
 *              it binds form submit event, 
 *              grab postId from the input:number element 
 *              validate: make sure postId is not empty 
 *              and then send postId to onSubmitCallback
 */

class PostForm{

    constructor(formId){
        
        this.formId = formId;
        this.formElement = false;
        this.inputElement = false;
        this.onSubmitCallback = (postId) => {};

        // on html loaded, bind the form
        document.addEventListener('DOMContentLoaded', this.init());
    }

    init(){
        // select form
        this.formElement = document.querySelector(this.formId);

        // select number input
        this.inputElement = this.formElement.querySelector('input[type=number]');

        // focus on number input for easy access
        this.inputElement.focus();

        // on form submit
        this.formElement.addEventListener('submit', event => this.submit(event));
    }

    submit(event){
        // stop form default execution 
        event.preventDefault();

        // get postId
        const postId = this.getPostID();
        if(!postId){
            return false;
        }

        // send the postId to the submit callback handle.
        this.onSubmitCallback(postId);
    }

    onSubmit(onSubmitCallback = (postId) => {}){
        this.onSubmitCallback = onSubmitCallback;
    }

    getPostID(){
        if(!this.inputElement) return false;

        // grab postId from the input:number element
        const postId = this.inputElement.value.trim();

        // validate: make sure postId is not empty and value is not zero
        if(!postId || postId == 0){
            return false;
        }

        return postId;
    }
}

export default PostForm;