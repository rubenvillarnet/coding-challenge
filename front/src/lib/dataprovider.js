import axios from 'axios'

class DataProvider{
  constructor(){
    this.service = axios.create({
      baseURL: "http://localhost:5000/api/"
    })
  }

  listUsers(){
    return this.service.get(`users`)
    .then(response => response.data)
    .catch(error=>error)
  }

  getUser(id){
    return this.service.get(`users/${id}`)
    .then(response => response.data)
    .catch(error=>error)
  }

  newUser(user){
    return this.service.post("users", user)
    .then(response => response)
    .catch(error=>error)
  }

  edituser(user){
    const {id, name, birthdate} = user
    return this.service.patch(`users/${id}`, {name, birthdate})
    .then(response => response)
    .catch(error=>error)
  }

  deleteUser(id){
    return this.service.delete(`users/${id}`)
    .then(response => response.data)
    .catch(error=>error) 
  }
}

export default DataProvider