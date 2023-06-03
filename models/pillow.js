const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pillowSchema = new Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    numInStock: { type: Number, required: true }
}, { versionKey: false});

module.exports = mongoose.model('Pillow', pillowSchema, 'pillows');