<!-- https://www.raymondcamden.com/2018/01/22/building-a-quiz-with-vuejs */ -->
<template>
    <div id="quiz">
  
  <div v-if="introStage">
    <slot name="intro" :title="title">
    <h1>Welcome to the Quiz: {{title}}</h1>
    <p>
      Some kind of text here. Blah blah.
    </p>    
    </slot>
    <button @click="startQuiz">START!</button>
  </div>
  
  <div v-if="questionStage">
    <question 
              :question="questions[currentQuestion]"
              v-on:answer="handleAnswer"
              :question-number="currentQuestion+1"
    ></question>
  </div>
  
  <div v-if="resultsStage">
    <slot name="results" :length="questions.length" :perc="perc" :correct="correct">
    You got {{correct}} right out of {{questions.length}} questions. Your percentage is {{perc}}%.
    </slot>
  </div>
</div>  
</template>
<script>
export default {
    data() {
    return {
      introStage:false,
      questionStage:false,
      resultsStage:false,
      title:'',
      questions:[],
      currentQuestion:0,
      answers:[],
      correct:0,
      perc:null
    }
  },
  created() {    
    fetch(this.url)
    .then(res => res.json())
    .then(res => {
      this.title = res.title;
      this.questions = res.questions;
      this.introStage = true;
    })
  
  },
  methods:{
    startQuiz() {
      this.introStage = false;
      this.questionStage = true;
      console.log('test'+JSON.stringify(this.questions[this.currentQuestion]));
    },
    handleAnswer(e) {
      console.log('answer event ftw',e);
      this.answers[this.currentQuestion]=e.answer;
      if((this.currentQuestion+1) === this.questions.length) {
        this.handleResults();
        this.questionStage = false;
        this.resultsStage = true;
      } else {
        this.currentQuestion++;
      }
    },
    handleResults() {
      console.log('handle results');
      this.questions.forEach((a, index) => {
        if(this.answers[index] === a.answer) this.correct++;        
      });
      this.perc = ((this.correct / this.questions.length)*100).toFixed(2);
      console.log(this.correct+' '+this.perc);
    }
  }
}
</script>