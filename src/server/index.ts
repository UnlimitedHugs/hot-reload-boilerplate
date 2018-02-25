import * as express from 'express';
import {Request, Response} from 'express';

const app = express();
app.get("/", (req:Request, res:Response, next:Function) => {
	//res.send("Hello sir!");
	next();
});
app.use(express.static('dist/public'));
var server = app.listen(8080, () => console.log('Listening on port 8080'));

export function cleanup(){
	if(server && server.listening){
		server.close();
		console.log("Closed server");
	} 
}