var NodeEnviRonment = '.env.' + process.env.NODE_ENV;

import dotenv from 'dotenv';
dotenv.config({ path: NodeEnviRonment });

import "babel-polyfill";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from 'morgan';
import session from 'express-session';
import flash from 'express-flash';
import helmet from 'helmet';
import ErrorHandler from './middlewares/ErrorHandler'
import CrossOrigin from './middlewares/CrossOrigin'
import connect from './config/db_connect';
import routes from './routes';

//Using required instead of import './config/passport' as it loads at the top
require('./config/passport');

// Makeing DB Connection
connect(process.env.MONGODB_CONNECTION);

const app = express();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
process.env.TZ = process.env.SERVER_TIMEZONE;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middlewares = [
  session({
    secret: 'JSESSION',
    key: 'MYSECRETISVERYSECRET',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash(),
  helmet()
]

app.use(logger('dev'));

app.use(cookieParser());

app.use(middlewares);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'storage/uploads')));

/** 
 * bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 1000000
}));

/**
 * bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json({ limit: '50mb' }));

/**
 * parse application/vnd.api+json as json
 */
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use(CrossOrigin);

// Routing
app.use('/', routes);

// error handler
app.use(ErrorHandler);

export default app;
