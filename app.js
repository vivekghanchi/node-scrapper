const express = require('express');
const http = require('http');
const URL = require('url');
const mongoose = require('mongoose');
const scrapper = require('./scrapper');
const scraperSchema = require('./models/scrapper-schema');
const config = require('./config');
const app = express();

let mongoCon;

// db connection
const MongoURI = process.env.MONGO_URL || config.MongoURI;
mongoose.createConnection(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, )
    .then(conn => {
        mongoCon = conn.model('Scraperdata', scraperSchema);
    })
    .catch(err => {
        console.log('err', err);
        process.exit(1);
    })

app.set('port', process.env.PORT || 3000);

app.get('/', scrapper);

app.listen(app.get('port'), () => {
    console.log("App is running at port", app.get("port"));
});