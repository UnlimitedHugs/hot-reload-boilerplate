const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const wp_config = require('../../webpack.config.js');
const app = express();

const compiler = webpack(wp_config);

app.use(webpackDevMiddleware(compiler, {
	serverSideRender: true,
}));
app.use(webpackHotServerMiddleware(compiler));
app.use(express.static('dist/public'));

app.listen(8080, () => console.log('Listening on port 8080'));