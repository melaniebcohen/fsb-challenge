'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
const favicon = require('serve-favicon');

const repositoryRouter = require('./routes/repository-router.js');

const PORT = 3000;

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
