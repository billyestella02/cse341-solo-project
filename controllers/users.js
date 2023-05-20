const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getUsers = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('users')
        .find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getUser = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('users')
        .find({ _id: id });
    result.toArray().then((user) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(user[0]);
    });
};

const postUser = async (req, res, next) => {
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('users')
        .insertOne({
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "username": req.body.username,
            "email": req.body.email,
            "birthday": req.body.birthday
        });
    try {
        res.status(201).json(result);
    } catch (err) {
        res.json({ message: err });
    }
};

const updateUser = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb  
        .getDb()
        .db('pillowShop')
        .collection('users')
        .updateOne(
            { _id: id },
            { $set: { email: req.body.email, birthday: req.body.birthday }}
        );
    res.status(204).json(result);
};

const deleteUser = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db('pillowShop')
        .collection('users')
        .deleteOne({ _id: id });
    res.status(200).json(result);
};

module.exports = {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
};