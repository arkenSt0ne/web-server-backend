export default class CustomException extends Error{
    public message!:string;
    public name!:string;
    constructor(name:string, message:string){
        super(message);
        this.name = name;
        this.message = message;
    }
    public toJSON(): string {        
        return `{"error":"${this.name}","message":"${this.message}"}`;
    }
}