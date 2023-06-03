const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// const mongodb = require('./db/connect');


const port = process.env.PORT || 8080;
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'));

mongoose
    .connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(process.env.port || port);
        console.log("Web server is listening at port " + (process.env.port || port));
    })
    .catch(err => {
        console.log(err);
    });

// mongodb.initDb((err, mongodb) => {
//     if (err) {
//         console.log(err);
//     } else {
//         app.listen(process.env.port || port);
//         console.log("Web server is listening at port " + (process.env.port || port));
//     }
// });