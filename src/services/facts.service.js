import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4010/v1/facts/';

class FactsService {

  getRandomFacts(limit) {
    return axios.get(API_URL + 'random?limit=' + limit , {headers: authHeader()}).then(result => {
      return result.data;
    });
  }

}

export default new FactsService();