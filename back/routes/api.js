var express = require('express');
var router = express.Router();
const User = require("../models/User");


router.get("/users/", function(req, res, next) {
  User.find({}, (err, users) => res.json(users))
  console.log("home")
});

router.get("/users/:id", function(req, res, next){
  User.findById(req.params.id, (err, user) => res.json(user))
});

router.post("/users/new", function(req, res, next){
  const { name, birthdate} = req.body
  const newUser = new User({name, birthdate})

  newUser.save()
  .then(user => res.json(user))
  .catch(error => console.log(error))
});

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

router.delete("/users/:id", function(req, res, next){
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
    return res.json(user)
  })

});

module.exports = router;
