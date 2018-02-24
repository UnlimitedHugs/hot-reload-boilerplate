import {Request, Response} from 'express';
/*
function sayHello(msg:string){
	console.log("hello! "+msg);
}
sayHello("more yay!");
*/
console.log("poke");
export default function serverRenderer(options:any) {
    return (req:Request, res:Response, next:Function) => {
		//res.send("Hello sir!");
		next();
	}
}