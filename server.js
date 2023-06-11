const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 8080;
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

app
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use('/', require('./routes'))
    .use(auth(config));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    });

mongoose
    .connect(process.env.MONGODB_URI)
    .then(result => {
        app.listen(process.env.port || port);
        console.log("Web server is listening at port " + (process.env.port || port));
    })
    .catch(err => {
        console.log(err);
    });