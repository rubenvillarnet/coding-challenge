import axios from 'axios'

class HealthCheck {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API
    })
  }

  status() {
    return this.service
      .get(`health`)
      .then(response => response.data)
      .catch(error => error)
  }
}

export default HealthCheck
