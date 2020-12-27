import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/v1/player/';

class UserService {

  getUser(id) {
    return axios.get(API_URL + id, {headers: authHeader()}).then(result => {
      return result
    });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();