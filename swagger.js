const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 01 API',
        description: 'API for my Pillow Shop Project'
    },
    host: 'contacts-lesson04.onrender.com/contacts/',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);