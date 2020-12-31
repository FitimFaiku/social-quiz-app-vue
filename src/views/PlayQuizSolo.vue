<style lang="scss" scoped>
$font: "Dax", sans-serif;
$white: #fff;
$green: #007e90;

.fieldset-container{
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  // align-content: space-between;
}
.answer {
  // width: calc(100% - 8rem);
  display: flex; 
  flex-basis: calc(50% - 40px);  
  justify-content: center;
  flex-direction: column;
  margin: 1rem 1rem 1rem 1rem;
  
  label {
    border: 1px solid black;
    cursor: pointer;
    display: flex;
    justify-content: center;
    flex-direction: row;
    min-height: 15rem;

  }
  input {
    display:none;
  }
  input:checked + label {
    background: #008080;
      color: #ffffff;
  }

}
input[type="radio"] {
  background-color: initial;
  cursor: default;
  appearance: radio;
  margin: 3px 3px 0px 5px;
  padding:initial;
  border:initial;
  :checked {
      background: #008080;
      color: #ffffff;
    }
}

@media screen and (max-width: 600px){
  .fieldset-container{
    min-height: 100%;
    display: flex;
    flex-direction: column;
    // flex-direction: column;
    // align-content: space-between;
  }
}

.playquiz-solo-time-left{
  color: red;
}
</style>
<template>
  <div id="playquiz-solo" class="playquiz-solo">
      <h1>Willkomen zum Quiz bitte wähle die richtigen Antworten aus.</h1>
      <header v-if="this.questions[this.questionIndex]">
        <div>
          <span>Fragen Nr: </span>
          <span>{{questionIndex+1}}</span>
        </div>
        <div class="playquiz-solo-time-left">
          <span>Zeit übrig: </span>
          <span v-if="this.questions[this.questionIndex] && this.questions[this.questionIndex].duration_in_sec">{{this.questions[this.questionIndex].duration_in_sec}}</span>
         
        </div>
        
      </header>
      <fieldset></fieldset>
      <div v-if="!finalStage" v-bind="questions[questionIndex]">
        <!-- <h2>Fragen {{questionIndex+1}}: {{questions[questionIndex].question}} Zeit übrig:</h2> -->
        <fieldset class="fieldset-container">
          <legend>{{questions[questionIndex].question}}</legend>

          <div class="answer" role="button" v-for="(answer,index) in questions[questionIndex].answers" v-bind:key="index" >
            <div>
            <input v-bind:id="'answer_' + index" v-if="questions[questionIndex].question_type =='sc'" type="radio" v-model="questions[questionIndex].selectedAnswer" v-bind:value="index" />
            <label v-bind:for="'answer_' + index" tabindex="0">
            {{questions[questionIndex].answers[index].answer}}
            </label>
            </div>
            <!-- <span v-html="questions[questionIndex].answers[index].answer"></span> -->
          </div>
        </fieldset>
      </div>

      <div v-if="finalStage"> 
        <h2>Ergebnis</h2>
        <span>Von {{this.questions.length}} Fragen wurden <strong>{{this.correctCount}}</strong> richtig beantwortet ! </span> <br>
        <span>In Prozent bedeutet das <strong>{{this.correctCount*100/this.questions.length}}%</strong></span>
 
      </div>
  </div>
</template>

<script>

import QuestionService from '../services/question.service'
import { mapState } from 'vuex'
export default {
  name: 'playquiz-solo',
  computed: {
    ...mapState('auth',['user']),
    ...mapState('alert', ['alert']),
    ...mapState('eyeTracking',['eyeTrackingOn', 'x', 'y'])
  },
  data() {
    return {
      quizId: null,
      questions : [{selectedAnswer:null, duration_in_sec: null, question: '', question_type: '', answers:[{id:'',answer: '', is_correct:false}]}],
      questionIndex: 0,
      finalStage:false,
      correctCount:0,
    };
  },
  async created(){
    console.log("created");
    this.quizId = this.$route.params.quizId;
    if(this.quizId){
      QuestionService.getQuestionsForQuiz(this.quizId).then(
      response => {
        console.log("Response:", response);
        this.questions = response;
        this.countDownTimer();
      },
      error => {
        console.log("Errot", error);
      }
      )
    }
    
  },
  methods: {
    countDownTimer() {
      if(this.questions[this.questionIndex].duration_in_sec && this.questions[this.questionIndex].duration_in_sec > 0) {
        setTimeout(() => {
            const element = document.elementFromPoint(this.x, this.y);
            console.log("Current Element", element);
            this.questions[this.questionIndex].duration_in_sec -= 1
            this.countDownTimer()
        }, 1000)
      } else {
        console.log("Length:",this.questions.length, "index:", this.questionIndex )
        if(this.questionIndex<this.questions.length){
          let currentQuestion = this.questions[this.questionIndex];
          if(currentQuestion.answers[currentQuestion.selectedAnswer] != undefined && currentQuestion.answers[currentQuestion.selectedAnswer].is_correct){
            console.log("correct + 1");
            this.correctCount = this.correctCount+1;
          }
          this.questionIndex= this.questionIndex+1;
          if(this.questionIndex === this.questions.length){
            this.finalStage = true
          } else {
            this.countDownTimer();
          }
        } 
        
      }
    }
  },
  mounted() {
    console.log("mounted");
    
  }
};
</script>