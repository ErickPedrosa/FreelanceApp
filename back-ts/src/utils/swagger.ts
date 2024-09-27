// @ts-ignore
import swaggerJsdoc from 'swagger-jsdoc'
// @ts-ignore
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User Registration API',
      version: '1.0.0',
      description: 'API for user registration'
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 3000}/api/v1` }]
  },
  apis: ['./src/routes/*.ts']
}


const swaggerDocs = swaggerJsdoc(swaggerOptions)


export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}
