var express = require('express');
var router = express.Router();
const User = require("../models/User");

const swaggerUi = require('swagger-ui-express');
const specs = require('../docs')

var options = {
  customCss: `.swagger-ui .topbar { display: none }
              .swagger-ui .scheme-container { display: none }`
};
 
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, options));

/**
 * @swagger
 * 
 * definitions:
 *  User:
 *    type: object
 *    properties:
 *      user: 
 *        type: string
 *        example: "bob"
 *      birthdate:
 *        type: string
 *        format: date
 *        example: "1992-10-04T23:00:00.000Z"
 */

/**
 * @swagger
 *
 * /api/users:
 *   get:
 *     description: list all users
 *     summary: all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all users
 *         schema:
 *            type: array
 *            items: 
 *                $ref: "#definitions/User"
 */

router.get("/users/", function(req, res, next) {
  User.find({}, (err, users) => res.json(users))
  console.log("home")
});

/**
 * @swagger
 *
 * /api/users/:id:
 *   get:
 *     summary: one single user
 *     description: return a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *          $ref: "#definitions/User"
 */

router.get("/users/:id", function(req, res, next){
  User.findById(req.params.id, (err, user) => res.json(user))
});

/**
 * @swagger
 *
 * /api/users/new:
 *   post:
 *     summary: new user
 *     description: adds a new user to the database
 *     consumes:
 *      - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: user object
 *         schema:
 *          $ref: "#definitions/User"
 *         required: true
 *     responses:
 *       200:
 *         description: new user created
 *         schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              example: "5cfc3b83dc5286255aec6eb9"
 *            user: 
 *             type: string
 *             example: "bob"
 *            birthdate:
 *             type: string
 *             format: date
 *             example: "1992-10-04T23:00:00.000Z"
 *       500:
 *        description: invalid parameters
 */

router.post("/users/new", function(req, res, next){
  const { name, birthdate} = req.body
  const newUser = new User({name, birthdate})

  newUser.save()
  .then(user => res.json(user))
  .catch(err => res.status(500).send(err))
});

/**
 * @swagger
 *
 * /api/users/:id:
 *   patch:
 *     summary: edit user
 *     description: edits existing user in the database
 *     consumes:
 *      - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         type: string
 *         required: true
 *       - name: body
 *         in: body
 *         description: user object
 *         schema:
 *          $ref: "#definitions/User"
 *         required: true
 *     responses:
 *       200:
 *         description:  user edited
 *         schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              example: "5cfc3b83dc5286255aec6eb9"
 *            user: 
 *             type: string
 *             example: "bob"
 *            birthdate:
 *             type: string
 *             format: date
 *             example: "1992-10-04T23:00:00.000Z"
 *       500:
 *        description: invalid parameters
 */

router.patch("/users/:id", function(req, res, next){
  const { name, birthdate} = req.body
  User.findByIdAndUpdate(req.params.id, {name, birthdate}, (err,user) =>{
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    return res.json(user)
  })
});

/**
 * @swagger
 *
 * /api/users/:id:
 *   delete:
 *     summary: delete user
 *     description: deletes existing user in the database
 *     consumes:
 *      - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userID
 *         in: path
 *         description: ID of the user
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description:  user deleted
 *         schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *              example: "5cfc3b83dc5286255aec6eb9"
 *            user: 
 *             type: string
 *             example: "bob"
 *            birthdate:
 *             type: string
 *             format: date
 *             example: "1992-10-04T23:00:00.000Z"
 *       500:
 *        description: invalid parameters
 */

router.delete("/users/:id", function(req, res, next){
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json(user)
  })

});

module.exports = router;
