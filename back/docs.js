const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'Back End Node Exercise',
      version: '1.0.0',
      description: 'Express API with autogenerated swagger doc. Below you can find the API endpoints.'
    },
    tags: [
      {
        name: 'users',
        description: 'user API endpoints'
      }
    ],
    host: `${process.env.HOST}${process.env.PORT ? ':' + process.env.PORT : ''}`,
    basePath: '/api'
  },
  // Path to the API docs
  apis: ['./routes/users.js']
}

const specs = swaggerJsdoc(options)

module.exports = specs
