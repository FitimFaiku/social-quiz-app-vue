
<style scoped>
button {
  margin-left: 0.5rem;
}
.input-group{
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

textarea{
  min-height: 180px;
}
</style>

<template>
  <div id="createquiz">
    <h1>Willkomen zu der Form für die Erstellung eines neuen Quizes</h1>
    <!-- <div class="card card-container"> -->
    <!-- Sidenav to NAvigate Through the Questions -->
    <div>
      <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" title="Fragen" shadow visible right>
        <template>
          <div class="p-3">
            <h2 id="sidebar-no-header-title">Aktuelle Fragen:</h2>

            <nav class="mb-3">
              <b-nav v-for="(question,index) of questions" vertical v-bind:key="index">
                <b-nav-item @click="goToQuestion(index)">Frage Nr {{index+1}}: {{question.question}}</b-nav-item>
                <!-- <b-nav-item active @click="hide">Active</b-nav-item>
                <b-nav-item href="#link-1" @click="hide">Link</b-nav-item>
                <b-nav-item href="#link-2" @click="hide">Another Link</b-nav-item> -->
              </b-nav>
            </nav>
            <!-- <b-button variant="primary" block @click="hide">Close Sidebar</b-button> -->
          </div>
        </template>
      </b-sidebar>
    </div>
    <!-- <b-form-group id="quiz-input" description="Quiz Eigenschaften" label="Gib deine gewünschten Quiz Eigenschaften ein." > -->
    <b-form-group
      id="fieldset-1"
      description="Quiz Titel"
      label="Gib einen Quiz Titel ein"
      label-for="quiz-title"
      valid-feedback="Danke!"
    >
      <b-form-input
        id="quiz-title"
        v-model="title"
        type="text"
        class="form-control"
        name="questiontext" 
        min="3" max="20"
        trim
      />
    </b-form-group>

    <b-form-group
      id="fieldset-2"
      description="Quiz Beschreibung"
      label="Gib eine kleine Quiz Beschreibung ein"
      label-for="quiz-description"
      valid-feedback="Danke!"
    >
      <b-form-input
        id="quiz-description"
        size="sm"
        v-model="description"
        type="text"
        class="form-control"
        name="descriptiontext" trim
      />
    </b-form-group>

    
    <b-form-group label="Bitte die Quiz Optionen auswählen" v-slot="{ ariaDescribedby }">
      <b-form-checkbox-group
        id="checkbox-quiz-options"
        v-model="selectedQuizOptions"
        :options="quizOptions"
        :aria-describedby="ariaDescribedby"
        name="quiz-options-1"
      ></b-form-checkbox-group>
    </b-form-group>

    <!-- <b-form-checkbox
      id="checkbox-isprivate"
      type="checkbox"
      v-model="isPrivate"
      :value="isPrivate"
      :checked="isPrivate"
    >
    Dieses Quiz Privat abspeichern
    </b-form-checkbox> -->

      <div id="questions-answers">

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Frage Nummer {{questionIndex+1}}:</span>
          </div>
          <textarea class="form-control" v-bind:aria-label="'Frage Nummer ' + questionIndex+1" v-model="questions[questionIndex].question"></textarea>
        </div>

        <b-form-group
          id="fieldset-5"
          description="Dauer in Sekunden"
          label="Wie lange soll die Frage dauern in sekunden?"
          label-for="quiz-duration-sec"
          valid-feedback="Danke!"
        >
          <b-form-input
            id="quiz-duration-sec"
            v-model="questions[questionIndex].duration"
            type="number"
            class="form-control"
            name="durationsec" trim
          />
        </b-form-group> 

        <b-form-group description="Antwort möglichkeiten" label="Wähle aus zwischen Single Choice, Multiple Choice oder True False Antworten" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="questions[questionIndex].type" :aria-describedby="ariaDescribedby" name="single-choice" value="sc">Single choice</b-form-radio>
          <b-form-radio v-model="questions[questionIndex].type" :aria-describedby="ariaDescribedby" name="multiple-choice" value="mc">Multiple choice</b-form-radio>
          <b-form-radio v-model="questions[questionIndex].type" :aria-describedby="ariaDescribedby" name="true-false" value="tf">True-False</b-form-radio>
        </b-form-group>

        <div v-if="questions[questionIndex].type !== 'tf'">
          <div v-for="count in 4" class="input-group" v-bind:key="count">
            <div class="input-group-prepend">
              <span class="input-group-text">Antwort Nummer {{count}}:</span>
            </div>
            <textarea class="form-control" v-bind:aria-label="'Antwort Nummer' + count" v-model="questions[questionIndex].answers[count-1].answer"></textarea>
          </div>

          <!-- Hier kommen die sc Radio Buttons -->
          <div v-if="questions[questionIndex].type == 'sc'">
            <b-form-group label="Wähle die Antwort aus, welche richtig ist" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                id="radio-group-multiple-choice"
                v-model="questions[questionIndex].selectedSingleChoice"
                :options="optionsSingleChoice"
                :aria-describedby="ariaDescribedby"
                name="radio-options"
              ></b-form-radio-group>
            </b-form-group>
          </div>

          <!-- Hier kommen die mc Checkboxen -->
          <div v-if="questions[questionIndex].type == 'mc'">
            <b-form-group label="Using options array:" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="questions[questionIndex].selectedMultipleChoice"
                :options="optionsMultipleChoice"
                :aria-describedby="ariaDescribedby"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
          </div>

          <!-- Hier kommen die true false Radio Buttons -->

          
      </div>
      <div v-if="questions[questionIndex].type == 'tf'">

        <div v-for="count in 2" class="input-group" v-bind:key="count">
          <div class="input-group-prepend">
            <span class="input-group-text">Antwort Nummer {{count}}:</span>
          </div>
          <textarea class="form-control" v-bind:aria-label="'Antwort Nummer' + count" v-model="questions[questionIndex].answers[count-1].answer"></textarea>
        </div>

        <b-form-group label="Wähle die Antwort aus, welche richtig ist" v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-single-choice-tf"
            v-model="questions[questionIndex].selectedSingleChoice"
            :options="optionsTrueFalse"
            :aria-describedby="ariaDescribedby"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
      </div>

      </div>
      <!-- <div v-for="question in qeustions" :key="question.questionIndex">
          <div class="form-group">
            <label for="username">Bitte gib eine Frage ein</label>
            <input
              v-model="question.text"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="questiontext"
            />
        </div>
      </div> -->
      <b-button variant="primary" @click="next" >
        Frage Hinzufügen
      </b-button>

      <b-button v-if="!this.quizId || this.quizId === null" variant="outline-primary" @click="handleSave" >
        Speichern
      </b-button>

      <b-button v-if="this.quizId && this.quizId !== null" variant="outline-primary" @click="handleUpdate" >
        Update
      </b-button>



      <b-button v-b-toggle.sidebar-no-header>Navigation Aufmachen</b-button>
    <!-- </div> -->
    </div>
    
</template>

<script>
// import UserService from '../services/user.service';
import { mapState } from 'vuex'
import QuizService from '../services/quiz.service'
export default {
  name: 'CreateQuiz',
  computed: {
    ...mapState({
        alert: state => state.alert,
        currentUser: state => state.auth.user
    }),
    invalidFeedback(text) {
      if (text > 0) {
        return 'Enter at least 4 characters.'
      }
      return 'Please enter something.'
    }
  },
  data() {
    return {
      quizId: null,
      selectedQuizOptions: ['toPublish'], // Must be an array reference!
      quizOptions: [
        { text: 'Privat abspeichern', value: 'isPrivate' },
        { text: 'Veröffentlichen', value: 'toPublish' }
      ],
      optionsSingleChoice: [
        { text: 'Antwort 1', value: 0 },
        { text: 'Antwort 2', value: 1 },
        { text: 'Antwort 3', value: 2, disabled: false },
        { text: 'Antwort 4', value: 3 }
      ],
      optionsMultipleChoice: [
        { text: 'Antwort 1', value: 0 },
        { text: 'Antwort 2', value: 1 },
        { text: 'Antwort 3', value: 2, disabled: false },
        { text: 'Antwort 4', value: 3 }
      ],
      optionsTrueFalse:  [
        { text: 'Antwort 1', value: 0 },
        { text: 'Antwort 2', value: 1 },
      ],

      isPrivate:false,
      title:'Test Titel',
      description: 'Test Beschreibung',
      questions: [
        {question:'Test Frage',answers:[{answer:'Test Antwort 1', isRight:false}, {answer:'Test Antwort 2', isRight:false},{answer:'Test Antwort 3', isRight:false}, {answer:'Test Antwort 4', isRight:false}], type:'', duration: 30, correctAnswers:[], selectedSingleChoice: null, selectedMultipleChoice: []}
      ],
      questionIndex: 0, 
    };
  },
  mounted() {
    /* UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    ); */
  },
  created() {
    this.quizId = this.$route.params.quizId;
    if(this.quizId){
      this.getQuizAndMapLocalValues(this.quizId);
    }
  },
  methods: {

    next(){
      const question = {question:'',answers:[{answer:'', isRight:false}, {answer:'', isRight:false},{answer:'', isRight:false}, {answer:'', isRight:false}], type:'', duration: 30, correctAnswers:[], selectedSingleChoice: null, selectedMultipleChoice: []}
      this.questions.push(question);
      this.questionIndex++;
    },

    getQuizAndMapLocalValues(quizId) {
      QuizService.findById(quizId).then(response => {
        console.log("Response update component", response, "Q:", response.questions);
        let questions = [];
        response.questions.map ( question => {
          // let answers = [];
          console.log("Question", question);
          let questionObject = {question:question.question, type:question.question_type, duration: question.duration_in_sec, answers :[], selectedSingleChoice: null, selectedMultipleChoice: []};
          question.answers.map((answer,index) => {
            if(answer.is_correct && (question.question_type === "sc" || question.question_type ==="tf")){
              questionObject.selectedSingleChoice = index;
            }

            if(answer.is_correct && question.question_type === "mc"){
              console.log("MC push",index, "Object", questionObject.selectedMultipleChoice  );
              questionObject.selectedMultipleChoice.push(index);
            }

            let answerObject = {answer:answer.answer, isRight:answer.is_correct}
            questionObject.answers.push(answerObject);
          })
          questions.push(questionObject);
          // const questionObject = {question.}
        });
        this.questions = questions;
        this.title = response.quiz_title;
        this.description = response.quiz_description;
        this.isPrivate = response.is_private;
        this.quizId= response.id;
        
      });
    },
    mapAnswerRightToObject() {
      this.questions.map(question => {
        question.answers.map((answer, answerIndex) => {
          if(question.type === "sc" || question.type === "tf" ){
            if(question.selectedSingleChoice === answerIndex){
              answer.isRight = true;
            }
          }
          if(question.type === "mc"){
            console.log("question", question);
            if(question.selectedMultipleChoice.includes(answerIndex)){
              answer.isRight = true;
            } else {
              answer.isRight = false;
            }
          }
          
        })
      });
    },
    handleSave(){
      console.log("Handle Save");
      // MAke some Validations
      // Here we map the selected correct answer to the isRight property
      this.mapAnswerRightToObject();
      /* for(var i=0; i<this.questions.length; i++){
        for(var j=0; j<this.questions[i].correctAnswers.length; j++){
          this.questions[i].answers[this.questions[i].correctAnswers[j]].isRight = true;
        }
      } */

      this.quizId = QuizService.createQuiz(this.title,this.description, this.questions, this.isPrivate);

    }, 
    handleUpdate () {
      this.mapAnswerRightToObject();
      QuizService.updateQuiz(this.quizId, this.title,this.description, this.questions, this.isPrivate);
    },
    goToQuestion(index) {
      console.log("index", index, "questions", this.questions);
      this.questionIndex = index;
    }

  }
};
</script>