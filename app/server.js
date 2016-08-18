import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import express from 'express';
import execute from '../mongodb/execute';
// import users from '../mongodb/users';
import apiRouter from './api/api';

let db = require('../mongodb/connect');
db.connect();

let bodyParser = require("body-parser");

const app = express();
const compiler = webpack(webpackConfig);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

app.use(express.static('./public'));
app.post('/login', execute.findUser);
// app.post('/api/users', users.register);
app.post('/init', execute.findDish);
app.post('/mealInfo', execute.finsDishInfoById);
app.post('/saveOrder', execute.saveOrder);

app.use('/api',apiRouter);

app.listen(3000, function () {
    console.log('Listening on 3000');
});

export default app;

