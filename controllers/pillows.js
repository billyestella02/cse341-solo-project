const ObjectId = require('mongodb').ObjectId;
const Pillow = require('../models/pillow');

const getPillows = (req, res, next) => {
    Pillow.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const getPillow = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    Pillow.find({ _id: id})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const postPillow = (req, res, next) => {
    const pillow = new Pillow(req.body);
    pillow
        .save()
        .then((pillowData) => {
            console.log(pillowData);
            res.status(201).send(pillowData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const updatePillow = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    Pillow.findOne({ _id: id})
        .then((result) => {
            const pillow = result;
            pillow.title = req.body.title;
            pillow.type = req.body.type;
            pillow.size = req.body.size;
            pillow.price = req.body.price;
            pillow.description = req.body.description;
            pillow.numInStock = req.body.numInStock;
            pillow
                .save()
                .then((pillowData) => {
                    console.log(pillowData);
                    res.status(204).send(pillowData);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

const deletePillow = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    Pillow.deleteOne({ _id: id })
        .then((result) => {
            if (result["deletedCount"] == 0) {
                res.status(400).json({ error: "No user found with that ObjectId" });
                return;
            }
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({ message: err });
        });
};

// const getPillows = async (req, res, next) => {
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('pillows')
//         .find();
//     result.toArray().then((pillows) => {
//         try {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(pillows);
//         } catch (err) {
//             res.status(400).json({ message: err });
//         }

//     });
// };

// const getPillow = async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json({ error: "Invalid ObjectId" });
//     }
//     const id = new ObjectId(req.params.id);
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('pillows')
//         .find({ _id: id });
//     result.toArray().then((pillow) => {
//         try {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(pillow[0]);
//         } catch (err) {
//             res.status(400).json({ message: err });
//         }

//     });
// };

// const postPillow = async (req, res, next) => {
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('pillows')
//         .insertOne({
//             "title": req.body.title,
//             "type": req.body.type,
//             "size": req.body.size,
//             "color": req.body.color,
//             "price": req.body.price,
//             "description": req.body.description,
//             "numInStock": req.body.numInStock
//         });
//     try {
//         res.status(201).json(result);
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
// };

// const updatePillow = async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json({ error: "Invalid ObjectId" });
//     }
//     const id = new ObjectId(req.params.id);
//     const result = await mongodb  
//         .getDb()
//         .db('pillowShop')
//         .collection('pillows')
//         .updateOne(
//             { _id: id },
//             { $set: { 
//                 title: req.body.title,
//                 type: req.body.type,
//                 size: req.body.size,
//                 color: req.body.color,
//                 price: req.body.price,
//                 description: req.body.description,
//                 numInStock: req.body.numInStock
//             }}
//         );
//     try {
//         res.status(204).json(result);
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
    
// };

// const deletePillow = async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json({ error: "Invalid ObjectId" });
//     }
//     const id = new ObjectId(req.params.id);
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('pillows')
//         .deleteOne({ _id: id });
//     try {
//         if (result["deletedCount"] == 0) {
//             res.status(400).json({ error: "No item found with that ObjectId" });
//             return;
//         }
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
    
// };

module.exports = {
    getPillows,
    getPillow,
    postPillow,
    updatePillow,
    deletePillow
};