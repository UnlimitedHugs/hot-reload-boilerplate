// Server entry point. The module must export a cleanup() function 
// that will be called once the module is reloaded

import * as express from 'express';
import {Request, Response} from 'express';

const app = express();
app.use(express.static('dist/public'));
var server = app.listen(8080, () => console.log('Listening on port 8080'));

export function cleanup(){
	if(server && server.listening){
		server.close();
		console.log("Closed server");
	} 
}