import axios from 'axios';

class AuthService {
  constructor() {
    
    const service = axios.create({
      baseURL: 'http://localhost:3001/api',
      withCredentials: true
    });
    this.service = service;
  }
  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }
  logout = () => {
    return this.service.post('/logout')
    .then(response => response.data)
  }
  register = (username, email, password) => {
    return this.service.post('/register', {username, email, password})
    .then(response => response.data)
  }
  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
}



export default AuthService;