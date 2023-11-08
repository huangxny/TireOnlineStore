import express from 'express';
import path, {dirname} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {fileURLToPath} from "url";
import bodyParser from 'body-parser';
import indexRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front', 'dist')));

app.use('/', indexRouter);
app.use('/product', productRouter);
export default app;
