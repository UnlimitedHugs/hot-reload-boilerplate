var LiveReloadPlugin = require('webpack-livereload-plugin');
var nodeExternals = require('webpack-node-externals');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
	name: "server",
    entry: "./src/server/index.ts",
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
        new LiveReloadPlugin({appendScriptTag:true}),
        new HtmlWebpackPlugin({
            template: 'src/static/index.html',
            inject: 'body',
        })
    ],
    entry: [
		"./src/client/index.ts"
	],
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
}];