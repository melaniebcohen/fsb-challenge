'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const favicon = require('serve-favicon');

const Repository = require('./model/repository.js');
const repositoryRouter = require('./routes/repository-router.js');

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)

app.use(cors());
app.use(repositoryRouter);
app.use(favicon(`${__dirname}/favicon.ico`));
app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const server = module.exports = app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});

server.isRunning = true;