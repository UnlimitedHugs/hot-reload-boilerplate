var LiveReloadPlugin = require('webpack-livereload-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = [{
	name: "server",
    entry: "./src/server/server.ts",
	target: "node",
    externals: [nodeExternals()],
    output: {
        filename: "server_bundle.js",
        path: __dirname + "/dist",
		libraryTarget: 'commonjs2'
    },
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
},
{
	name: "client",
	target: "web",
    output: {
        filename: "client_bundle.js",
        path: __dirname + "/dist/public",
		publicPath: "/"
    },
    plugins: [
        new LiveReloadPlugin({appendScriptTag:true})
    ],
    entry: [
		"./src/client/index.ts",
		"./src/static/index.html"
	],
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
			{ test: /\.html$/, use: [{
				loader: 'file-loader',
				options: {name:"[name].[ext]"}  
			}]},
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
}];