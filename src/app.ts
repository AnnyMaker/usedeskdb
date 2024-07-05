import express, {Application} from 'express';
const bodyParser = require('body-parser');
const {notificationRouter} = require('./http/route')
import {container, TYPES} from './di';
import ExpressErrorHandler from "./modules/error/ExpressErrorHandler";

const expressErrorHandler = container.get<ExpressErrorHandler>(TYPES.ExpressErrorHandler);

const app: Application = express();


app.use(bodyParser());
app.use('/notification', notificationRouter);
app.use(expressErrorHandler.getHandler());

module.exports = app;