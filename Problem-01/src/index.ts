import cors = require('cors');
import bodyParser from 'body-parser';
import express from 'express';
import { db } from './db';
import helmet from 'helmet';
import projectsRouter from './api/routes/projectsRouter';

const port = 8080;
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(function (req, res, next) {
	res.setHeader('Last-Modified', (new Date()).toUTCString());
	next();
});

app.use('/projects', projectsRouter);

db.on('error', (err) => console.log(err));
db.once('open', function () {
	console.log('db connected');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

