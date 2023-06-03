const ObjectId = require('mongodb').ObjectId;
const User = require('../models/user');

const getUsers = (req, res, next) => {
    User.find({})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const getUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    User.find({ _id: id})
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const postUser = (req, res, next) => {
    const user = new User(req.body);
    user
        .save()
        .then((userData) => {
            console.log(userData);
            res.status(201).send(userData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

const updateUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    User.findOne({ _id: id})
        .then((result) => {
            const user = result;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.username = req.body.username;
            user.email = req.body.email;
            user.birthday = req.body.birthday;
            user
                .save()
                .then((userData) => {
                    console.log(userData);
                    res.status(204).send(userData);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteUser = (req, res, next) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ error: "Invalid ObjectId" });
    }
    const id = new ObjectId(req.params.id);
    User.deleteOne({ _id: id })
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

// const getUser = async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json({ error: "Invalid ObjectId" });
//     }
//     const id = new ObjectId(req.params.id);
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('users')
//         .find({ _id: id });
//     result.toArray().then((user) => {
//         try {
//             res.setHeader('Content-Type', 'application/json');
//             res.status(200).json(user[0]);
//         } catch (err) {
//             res.status(400).json({ message: err });
//         }
//     });
// };

// const postUser = async (req, res, next) => {
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('users')
//         .insertOne({
//             "firstName": req.body.firstName,
//             "lastName": req.body.lastName,
//             "username": req.body.username,
//             "email": req.body.email,
//             "birthday": req.body.birthday
//         });
//     try {
//         res.status(201).json(result);
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
// };

// const updateUser = async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json({ error: "Invalid ObjectId" });
//     }
//     const id = new ObjectId(req.params.id);
//     const result = await mongodb  
//         .getDb()
//         .db('pillowShop')
//         .collection('users')
//         .updateOne(
//             { _id: id },
//             { $set: {
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 username: req.body.username, 
//                 email: req.body.email, 
//                 birthday: req.body.birthday 
//             }}
//         );
//     try {
//         res.status(204).json(result);
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
// };

// const deleteUser = async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id)) {
//         res.status(400).json({ error: "Invalid ObjectId" });
//     }
//     const id = new ObjectId(req.params.id);
//     const result = await mongodb
//         .getDb()
//         .db('pillowShop')
//         .collection('users')
//         .deleteOne({ _id: id });
//     try {
//         if (result["deletedCount"] == 0) {
//             res.status(400).json({ error: "No user found with that ObjectId" });
//             return;
//         }
//         res.status(200).json(result);
//     } catch (err) {
//         res.status(400).json({ message: err });
//     }
// };

module.exports = {
    getUsers,
    getUser,
    postUser,
    updateUser,
    deleteUser
};