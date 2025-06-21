class ApiError extends Error{
    constructor(statusCode, message= "Something Went Wrong", errors = [], stack = ""){
        super(message);//call parent constructer, it accepts string as argument
        this.statusCode=statusCode;
        this.data=null;
        this.message=message;
        this.errors=errors;
        this.success = false;
        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this,this.constructor);
        }

    }

}

export {ApiError};