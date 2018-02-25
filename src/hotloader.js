const path = require('path');
const webpack = require('webpack');
const wp_config = require('../webpack.config.js');

const compiler = webpack(wp_config);

if(!compiler || !compiler.compilers){
	throw new Error(`Expected webpack compiler to contain both a 'client' and/or 'server' config`);
}
const serverCompiler = compiler.compilers.filter(c => c.name.startsWith('server'))[0];
if(!serverCompiler){
	throw new Error("Failed to find a webpack compiler named 'server'");
}

const outputFs = serverCompiler.outputFileSystem;
const outputPath = serverCompiler.outputPath;

let serverModule, error = false;
compiler.watch({}, (err, multiStats) => {
	console.log(multiStats.toString({colors:true}));
	const serverStats = multiStats.stats.filter(stats => stats.compilation.name.startsWith('server'))[0];
	if(serverStats){
		const modulePath = path.join(outputPath, serverStats.compilation.outputOptions.filename);

		try {
			if(serverModule){
				serverModule.cleanup();
			}
			delete require.cache[require.resolve(modulePath)]
			serverModule = require(modulePath);
			if(typeof serverModule.cleanup !== 'function'){
				throw new Error('Hot-loaded module must export a cleanup() function');
			}
		} catch (ex) {
			console.error(ex);
		}
	}
});