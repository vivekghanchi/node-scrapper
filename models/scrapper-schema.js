const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scraperSchema = new Schema({
    urls: {
        type: String,
        unique: true
    },
    totalRefs: Number,
    params: String
});