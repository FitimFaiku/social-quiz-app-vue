import axios from 'axios';
// import { ICreqteQuiz } from '../interfaces/quiz';
const API_URL = 'http://localhost:4010/v1/quiz/';
import authHeader from './auth-header';
import store from '@/store/index'

class QuizService {

    getAllPublicQuiz() {
        return axios.get(API_URL , { headers: authHeader() }).then(result => {
          return result.data;
        });
    }

    findById(id) {
      return axios.get(API_URL + id , { headers: authHeader() }).then(result => {
        return result.data;
      });
    }

    deleteQuiz(quizId) {
      return axios.delete(API_URL + quizId, {headers: authHeader()}).then(result => {
        return result;
      })
    }

    createQuiz(title,description,questions,isPrivate) {
      console.log("SaveQuiz", questions);

      // console.log(title,questions, isPrivate);
      const questionsArray = [];
      // const answersArray = [];
      questions.map((question,index) => {
        let questionObject = {
          question: question.question,
          duration_in_sec: question.duration,
          question_type: question.type,
          answers: [],
          question_number: index,
        }

        question.answers.map(answer => {
          let answerObject = {
            answer: answer.answer,
            is_correct :answer.isRight, 
          };
          questionObject.answers.push(answerObject);
        });
        questionsArray.push(questionObject);
      });
      /* for(var i=0; i<questions.length; i++){
        for(var j=0; j<questions[i].answers.length; j++){
          let answer = {
            answer: questions[i].answers[j].answer,
            is_correct :questions[i].answers[j].isRight, 
          }
          answersArray.push(answer);
        }

        let question = {
          question: questions[i].question,
          duration_in_sec: questions[i].duration,
          question_type: questions[i].type,
          answers: answersArray,
          question_number: i,
        }
        
      } */

      const createQuiz = {
        quiz_title: title,
        quiz_description: description,
        questions: questionsArray,
        is_private: isPrivate,
        is_active: true,
        created_from_player: store.state.auth.user.id,
      }
      console.log("createQuiz Object", createQuiz);

      return axios.post(API_URL + 'create', {createQuiz})
        .then(response => {
          console.log("Response §§§§§ response", response);
          if(response.status >=200 && response.status<=299) {
            console.log("Status is in 200");
            store.dispatch('alert/success', "Quiz " + title  +" erfolgreich gespeichert");
            return response.data.id;
          } else{
            console.log("Status is not in 200");
            store.dispatch('alert/error', "Quiz " + title  +" wurde nicht erfolgreich erfolgreich gespeichert");
          } 
          // return response.data;
        }); 
    }

    updateQuiz(id, title,description,questions,isPrivate) {
      console.log("UpdateQuiz");
      
      const questionsArray = [];
      questions.map((question,index) => {
        let questionObject = {
          question: question.question,
          duration_in_sec: question.duration,
          question_type: question.type,
          answers: [],
          question_number: index,
        }

        question.answers.map(answer => {
          let answerObject = {
            answer: answer.answer,
            is_correct :answer.isRight, 
          };
          questionObject.answers.push(answerObject);
        });
        questionsArray.push(questionObject);
      });

      const updateQuiz = {
        id: id,
        quiz_title: title,
        quiz_description: description,
        questions: questionsArray,
        is_private: isPrivate,
        is_active: true,
        created_from_player: store.state.auth.user.id,
      }
      console.log("update Object", updateQuiz);

      return axios.put(API_URL + 'update/' + id, {updateQuiz})
        .then(response => {
          console.log("Response §§§§§", response.status);
          if(response.status >=200 && response.status<=299) {
            console.log("Status is in 200");
            store.dispatch('alert/success', "Die Veränderungen für das Quiz " + title  +" wurden erfolgreich gespeichert");
          } else{
            console.log("Status is not in 200");
            store.dispatch('alert/error', "Die Veränderungen für das Quiz " + title  +" wurde nicht erfolgreich erfolgreich gespeichert");
          } 
          // return response.data;
        }); 
    }
}

export default new QuizService();
