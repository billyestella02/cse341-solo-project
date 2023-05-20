const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getPillows = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .find();
    result.toArray().then((pillows) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pillows);
    });
};

const getPillow = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .find({ _id: id });
    result.toArray().then((pillow) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(pillow[0]);
    });
};

const postPillow = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .insertOne({
            "title": req.body.title,
            "type": req.body.type,
            "size": req.body.size,
            "color": req.body.color,
            "price": req.body.price,
            "description": req.body.description,
            "numInStock": req.body.numInStock
        });
    try {
        res.status(201).json(result);
    } catch (err) {
        res.json({ message: err });
    }
};

const updatePillow = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb  
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .updateOne(
            { _id: id },
            { $set: { price: req.body.price, numInStock: req.body.numInStock }}
        );
    res.status(204).json(result);
};

const deletePillow = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .deleteOne({ _id: id });
    res.status(200).json(result);
};

module.exports = {
    getPillows,
    getPillow,
    postPillow,
    updatePillow,
    deletePillow
};