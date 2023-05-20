const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 01 API',
        description: 'API for my Pillow Shop Project'
    },
    host: 'cse341-lesson05-project.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);