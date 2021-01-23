<style lang="scss" scoped>
$primary: #053A85;
$secondary: #388AFC;
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
.interesting-fact{
  width: 100%;
  min-height: 10rem;
  text-align: center;
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
    background: $primary;
      color: white;
  }
  input:focus {
    box-shadow: 0 0 4px 1px $secondary;
  }
  input:hover {
    background: $green;
  }

}
.md-body {
  align-self: center;
}
input[type="radio"] {
  background-color: black;
  cursor: default;
  appearance: radio;
  margin: 3px 3px 0px 5px;
  padding:initial;
  border:initial;
  :checked {
    background: $primary;
    color: white;
  }
  :focus {
    box-shadow: 0 0 4px 1px $secondary;
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
          <strong v-if="this.questions[this.questionIndex] && this.questions[this.questionIndex].duration_in_sec">{{this.questions[this.questionIndex].duration_in_sec}}</strong>
         
        </div>
      </header>
      <div v-if="!finalStage">
        <fieldset class="fieldset-container">
          <legend>
            <!-- {{questions[questionIndex].question}} -->
            <markdown-it-vue class="md-body" :content="questions[questionIndex].question" />
          </legend>

          <div class="answer" role="button" v-for="(answer,index) in questions[questionIndex].answers" v-bind:key="index" >
            <div>
            <input v-bind:id="'answer_' + index" v-if="questions[questionIndex].question_type =='sc'" type="radio" v-model="questions[questionIndex].selectedAnswer" v-bind:value="index" />
            <input v-bind:id="'answer_' + index" v-if="questions[questionIndex].question_type =='mc'" type="checkbox" v-model="questions[questionIndex].selectedAnswers" v-bind:value="index" />
            <label v-bind:for="'answer_' + index" tabindex="0">
            <!-- {{questions[questionIndex].answers[index].answer}} -->
            <markdown-it-vue class="md-body" :content="questions[questionIndex].answers[index].answer" />
            </label>
            </div>
            <!-- <span v-html="questions[questionIndex].answers[index].answer"></span> -->
          </div>
        </fieldset>
      </div>

      <div v-if="!finalStage &&  facts[questionIndex] && facts[questionIndex].fact " class="interesting-fact">
        <label>Interessanter Fakt: {{facts[questionIndex].fact}}</label>
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
import FactsService from '../services/facts.service'
import { mapState } from 'vuex'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
export default {
  name: 'playquiz-solo',
  components: {MarkdownItVue},
  computed: {
    ...mapState('auth',['user']),
    ...mapState('alert', ['alert']),
    ...mapState('eyeTracking',['eyeTrackingOn', 'x', 'y', 'intervalDuration', 'countFocus', 'countClick'])
  },
  data() {
    return {
      quizId: null,
      elements: [{element:null, text: '', count:0}],
      questions : [{selectedAnswers: [], selectedAnswer:null, duration_in_sec: null, question: '', question_type: '', answers:[{id:'',answer: '', is_correct:false}]}],
      questionIndex: 0,
      finalStage:false,
      correctCount:0,
      facts: [{fact: ''}],
    };
  },
  created(){
    this.quizId = this.$route.params.quizId;
    if(this.quizId){
      window.setInterval(() => {
        this.handleEyeTracking();
      }, this.intervalDuration);
      QuestionService.getQuestionsForQuiz(this.quizId).then(
      response => {
        FactsService.getRandomFacts(response.length).then(
          facts => {
            console.log("Facts repsonse:", facts);
            this.facts = facts;
          }
        );
        
        this.questions = response;
        // Add empty selectedAnswers to Questions for correctcount Afterwards.
        this.questions.map(question => {
          question.selectedAnswers = [];
        })
        this.countDownTimer();
      },
      error => {
        console.log("Errot", error);
      }
      ); 
      
      
    }
    
  },
  methods: {
    countDownTimer() {
      if(this.questions[this.questionIndex].duration_in_sec && this.questions[this.questionIndex].duration_in_sec > 0) {
        setTimeout(() => {
            this.questions[this.questionIndex].duration_in_sec -= 1;
            this.countDownTimer();
        }, 1000)
      } else {
        console.log("Length:",this.questions.length, "index:", this.questionIndex )
        if(this.questionIndex<this.questions.length){
          let currentQuestion = this.questions[this.questionIndex];
          if(currentQuestion.question_type != "mc" && currentQuestion.answers[currentQuestion.selectedAnswer] != undefined && currentQuestion.answers[currentQuestion.selectedAnswer].is_correct){
            this.correctCount = this.correctCount+1;
          }
          if(currentQuestion.question_type === "mc") {
            let rightAnswersCount = 0;
            let hasChoosenCorrectAnswers = true;
            currentQuestion.answers.map((answer,index) => {
              if(answer.is_correct){
                rightAnswersCount++;
                if(!currentQuestion.selectedAnswers.includes(index)) {
                  hasChoosenCorrectAnswers = false;
                }
              }
              
            });
            if(rightAnswersCount === currentQuestion.selectedAnswers.length && hasChoosenCorrectAnswers){
              this.correctCount = this.correctCount+1;
            }
          }
          this.questionIndex= this.questionIndex+1;
          this.elements = [{element: null, text: '', count:0}];
          if(this.questionIndex === this.questions.length){
            this.finalStage = true
          } else {
            this.countDownTimer();
          }
        } 
        
      }
    }, 
    handleEyeTracking(){
      
      if(this.eyeTrackingOn && !this.finalStage){
        let headerHeight = document.querySelector("#nav-header-id").offsetHeight;
        const element = document.elementFromPoint(this.x + window.pageXOffset, this.y + ((window.pageYOffset /2) - headerHeight));
        // style, focus() 
        console.log("text:",element.textContent, "tagName", element.tagName.toLowerCase(), "element:", element);
        if(element && element.tagName.toLowerCase() ==='label'){
          this.elements.find(obj => { 
            //console.log("OBJ", obj);
            if(obj.text === element.textContent) {
            obj.count = obj.count +1;
            if(obj.count>=this.countFocus){
              element.focus();
            }
            if(obj.count>=this.countClick){
              element.click();
              element.blur();
              this.elements = [{element: null, text: '', count:0}];
            }
          } else {
            this.elements.push({element:element ,text: element.textContent, count:1});
          }
          })
        }
      } 

    }
  },
  mounted() {
    console.log("mounted");
    
  }
};
</script>