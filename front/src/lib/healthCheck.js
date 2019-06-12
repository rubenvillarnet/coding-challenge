import axios from 'axios'

class HealthCheck{
  constructor(){
    this.service = axios.create({
      baseURL: "http://localhost:5000/"
    })
  }

  status(){
    return this.service.get(`health`)
    .then(response => response.data)
    .catch(error=>error)
  }
}

export default HealthCheck