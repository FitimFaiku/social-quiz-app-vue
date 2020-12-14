class QuizService {

    getQuiz() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}

export default new QuizService();

export interface IQuiz {
    
}