import { WebError } from "./weberror";

class BadRequestError extends WebError {
    constructor(message: string) {
        super(message, 400);
    }    
}

export { BadRequestError };