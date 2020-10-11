const express = require('express');
const http = require('http');
const URL = require('url');
const mongoose = require('mongoose');
const scrapper = require('./scrapper');

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', scrapper);

app.listen(app.get('port'), () => {
    console.log("App is running at port", app.get("port"));
});