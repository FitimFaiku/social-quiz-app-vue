import axios from 'axios';
import store from '../store/index'
// import { ICreqteQuiz } from '../interfaces/quiz';
const API_URL = 'http://localhost:4010/v1/quiz/';
import authHeader from './auth-header';

class QuizService {

    getAllPublicQuiz() {
        return axios.get(API_URL , { headers: authHeader() }).then(result => {
          console.log("Result", result);
          return result.data;
        });
    }

    deleteQuiz(quizId) {
      return axios.delete(API_URL + quizId, {headers: authHeader()}).then(result => {
        return result;
      })
    }

    createQuiz(title,description,questions,isPrivate) {
      console.log("SaveQuiz");

      console.log(title,questions, isPrivate);
      const questionsArray = [];
      const answersArray = [];
      for(var i=0; i<questions.length; i++){
        for(var j=0; j<questions[i].answers.length; j++){
          let answer = {
            answer: questions[i].answers[j].text,
            is_correct :questions[i].answers[j].isRight, 
          }
          answersArray.push(answer);
        }

        let question = {
          question: questions[i].text,
          duration_in_sec: questions[i].duration,
          question_type: questions[i].type,
          answers: answersArray,
          question_number: i,
        }
        questionsArray.push(question);
      }

      const createQuiz = {
        quiz_title: title,
        quiz_description: description,
        questions: questionsArray,
        is_private: isPrivate,
        is_active: true,
        created_from_playerid: store.state.auth.user.id,
      }
      console.log("createQuiz Object", createQuiz);

         return axios
        .post(API_URL + 'create', {
          createQuiz
        })
        .then(response => {
          console.log("Response", response);
          // return response.data;
        }); 
    }
}

export default new QuizService();
