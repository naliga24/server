const express = require('express');
// const path = require('path');
const cors = require('cors');

const app = express();
const httpContext = require('express-http-context');

// require('dotenv').config({ path: path.join(__dirname, `../env.${process.env.NODE_ENV}`) });
require('dotenv').config();

app.use(
	express.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	})
);
app.use(httpContext.middleware);
app.use(cors());
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
});

const port = process.env.APP_PORT || 3031;
const versionAPI = process.env.APP_VERSION || 'v1';

// eslint-disable-next-line import/no-dynamic-require
const v1Router = require(`./${versionAPI}/routers/index`);

app.use(`/api/${versionAPI}`, v1Router);

app.listen(port, async () => {
	// eslint-disable-next-line no-console
	console.log(`App environment ${process.env.NODE_ENV} listen port ${port}`);
});