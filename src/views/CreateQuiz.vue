
<style scoped>
button {
  margin-left: 0.5rem;
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
                <b-nav-item @click="goToQuestion(index)">Frage Nr {{index+1}}: {{question.text}}</b-nav-item>
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

    
    <b-form-checkbox
      id="checkbox-isprivate"
      type="checkbox"
      :value="isPrivate"
      :checked="isPrivate"
    >
    Dieses Quiz Privat abspeichern
    </b-form-checkbox>

      <div>
        <b-form-group
          id="fieldset-3"
          v-bind:description="'Frage Nummer ' + (questionIndex+1)"
          label="Gib eine Frage ein"
          label-for="quiz-question-text"
          valid-feedback="Danke!"
        >
          <b-form-input
            id="quiz-question-text"
            v-model="questions[questionIndex].text"
            type="text"
            class="form-control"
            name="descriptiontext" trim
          />
        </b-form-group>          
        <!--todo  Some padding or margin here -->
        

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

        <b-form-group description="Antwort möglichkeit" label="Wähle aus zwischen Single Choice, Multiple Choice oder True False Antworten" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="questions[questionIndex].type" :aria-describedby="ariaDescribedby" name="single-choice" value="sc">Single choice</b-form-radio>
          <b-form-radio v-model="questions[questionIndex].type" :aria-describedby="ariaDescribedby" name="multiple-choice" value="mc">Multiple choice</b-form-radio>
          <b-form-radio v-model="questions[questionIndex].type" :aria-describedby="ariaDescribedby" name="true-false" value="tf">True-False</b-form-radio>
        </b-form-group>

        <div v-if="questions[questionIndex].type == 'sc'">
          <b-form-group
          id="fieldset-6"
          description="Antwort 1"
          label="Wie lauten die erste Antwort?"
          label-for="quiz-answer-1"
          valid-feedback="Danke!"
          >
            <b-form-input
              id="quiz-answer-1"
              v-model="questions[questionIndex].answers[0].text"
              type="text"
              class="form-control"
              name="quizanswerone" trim
            />
          </b-form-group> 
          <b-form-group
            id="fieldset-7"
            description="Antwort 2"
            label="Wie lauten die zweite Antwort?"
            label-for="quiz-answer-2"
            valid-feedback="Danke!"
          >
            <b-form-input
              id="quiz-answer-2"
              v-model="questions[questionIndex].answers[1].text"
              type="text"
              class="form-control"
              name="quizanswertwo" trim
            />
          </b-form-group>

          <b-form-group
            id="fieldset-8"
            description="Antwort 3"
            label="Wie lauten die drite Antwort?"
            label-for="quiz-answer-2"
            valid-feedback="Danke!"
          >
            <b-form-input
              id="quiz-answer-4"
              v-model="questions[questionIndex].answers[3].text"
              type="text"
              class="form-control"
              name="quizanswerthird" trim
            />
          </b-form-group>

          <b-form-group
            id="fieldset-8"
            description="Antwort 4"
            label="Wie lauten die vierte Antwort?"
            label-for="quiz-answer-4"
            valid-feedback="Danke!"
          >
            <b-form-input
              id="quiz-answer-$"
              v-model="questions[questionIndex].answers[2].text"
              type="text"
              class="form-control"
              name="quizanswerfourth" trim
            />
          </b-form-group>

        <!-- Hier kommen die Radio Buttons -->
          <b-form-group label="Wähle die Antwort aus, welche richtig ist" v-slot="{ ariaDescribedby }">
              <b-form-radio :aria-describedby="ariaDescribedby" v-model="questions[questionIndex].correctAnswers" name="is-first-answer-right" value="0">Antwort 1</b-form-radio>
              <b-form-radio :aria-describedby="ariaDescribedby" v-model="questions[questionIndex].correctAnswers" name="is-second-answer-right" value="1">Antwort 2</b-form-radio>
              <b-form-radio :aria-describedby="ariaDescribedby" v-model="questions[questionIndex].correctAnswers" name="is-third-answer-right" value="2">Antwort 3</b-form-radio>
              <b-form-radio :aria-describedby="ariaDescribedby" v-model="questions[questionIndex].correctAnswers" name="is-fourth-answer-right" value="3">Antwort 4</b-form-radio>
          </b-form-group>
        </div>

        <div v-if="questions[questionIndex].type == 'mc'">
          We are in multiple choice
        </div>
        
        <div v-if="questions[questionIndex].type == 'tf'">
          We are in true false choice
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

      <b-button variant="outline-primary" @click="handleSave" >
        Speichern
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
      isPrivate:false,
      title:'Test Title',
      description: 'Test Description',
      questions: [
        {text:'Test Question',answers:[{text:'Test Answer 1', isRight:false}, {text:'Test Answer 2', isRight:false},{text:'Test Answer 3', isRight:false}, {text:'Test Answer 4', isRight:false}], type:'', duration: 30, correctAnswers:[]}
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
  methods: {
    next(){
      const question = {text:'',answers:[{text:'', isRight:false}, {text:'', isRight:false},{text:'', isRight:false}, {text:'', isRight:false}], type:'', duration: 30, correctAnswers:[]}
      this.questions.push(question);
      this.questionIndex++;
    },

    handleSave(){
      console.log("Handle Save");
      // MAke some Validations
      // Here we map the selected correct answer to the isRight property
      for(var i=0; i<this.questions.length; i++){
        for(var j=0; j<this.questions[i].correctAnswers.length; j++){
          this.questions[i].answers[this.questions[i].correctAnswers[j]].isRight = true;
        }
      }

      QuizService.createQuiz(this.title,this.description, this.questions, this.isPrivate).then(respopnse => {
        console.log("Response",respopnse);
      })
    }, 
    goToQuestion(index) {
      console.log("index", index, "questions", this.questions);
      this.questionIndex = index;
    }

  }
};
</script>