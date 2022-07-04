class WebError {
    public message: string;
    public code: number;

    constructor (message: string, code: number) {
        this.message = message;
        this.code = code;
    }   
}

export { WebError };