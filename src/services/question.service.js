import axios from 'axios';
// import { ICreqteQuiz } from '../interfaces/quiz';
const API_URL = 'http://localhost:4010/v1/question/';
import authHeader from './auth-header';

class QuestionService {

  getQuestionsForQuiz(id){
    return axios.get(API_URL + 'quiz/' + id , { headers: authHeader() }).then(result => {
      return result.data;
    });
  }

}

export default new QuestionService();
