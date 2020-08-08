const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/note');

app.use('/api', authRoutes);
app.use('/api', noteRoutes);

const port = process.env.PORT || 8000;

mongoose
	.connect(
		`${process.env.DATABASE_LINK}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true,
		}
	)
	.then(() => {
		app.listen(port, () => {
			console.log('DBCONNECTED');
			console.log(`server started at port ${port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
