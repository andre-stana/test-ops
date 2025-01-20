import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description: 'A simple Express API'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: 'http://localhost:8080/api',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/routes/**/*.ts']
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
