

export interface IAnswers {
    answer: String,
    is_correct: boolean,
}

export interface IQuestions {
    question: String,
    duration_in_sec: number,
    question_type: string,
    answers: IAnswers[]

}

export interface ICreqteQuiz {
    creeated_from_plyer_id?: number,
    quiz_title: number,
    is_private:boolean,
    questions: IQuestions[],
}



