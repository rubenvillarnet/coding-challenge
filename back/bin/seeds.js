
const mongoose = require("mongoose");
const User = require("../models/User");
var debug = require('debug')('back:seeds');


mongoose
  .connect('mongodb://localhost/innocv-back', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    name: "alice",
    birthdate: new Date(1989,10,20)
  },
  {
    name: "bob",
    birthdate: new Date(1983,5,25)
  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  debug(`${usersCreated.length} users created with the following id:`);
  debug(usersCreated.map(u => u._id));
})
.then(() => {
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})