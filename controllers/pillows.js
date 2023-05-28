const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getPillows = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .find();
    result.toArray().then((pillows) => {
        try {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(pillows);
        } catch (err) {
            res.status(400).json({ message: err });
        }

    });
};

const getPillow = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .find({ _id: id });
    result.toArray().then((pillow) => {
        try {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(pillow[0]);
        } catch (err) {
            res.status(400).json({ message: err });
        }

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
        res.status(400).json({ message: err });
    }
};

const updatePillow = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb  
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .updateOne(
            { _id: id },
            { $set: { 
                title: req.body.title,
                type: req.body.type,
                size: req.body.size,
                color: req.body.color,
                price: req.body.price,
                description: req.body.description,
                numInStock: req.body.numInStock
            }}
        );
    try {
        res.status(204).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
    
};

const deletePillow = async (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('pillows')
        .deleteOne({ _id: id });
    try {
        if (result["deletedCount"] == 0) {
            res.status(400).json({ error: "No item found with that ObjectId" });
            return;
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err });
    }
    
};

module.exports = {
    getPillows,
    getPillow,
    postPillow,
    updatePillow,
    deletePillow
};