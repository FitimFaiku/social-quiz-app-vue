<template>
  <div id="PlayQuiz" class="PlayQuiz">
      <h1>Wähle ein Quiz aus um zu spielen.</h1>
      <ul v-for="(quiz,index) in quizes" :key="index" role="toolbar">
        <li style="display:flex; flex-direction:column;">
          <h2>Titel: {{quiz.quiz_title}}</h2>
          <h3>Beschreibung: {{quiz.quiz_description}}</h3>
          <button class="btn btn-primary" aria-setsize="4" v-bind:aria-posinset="index" @click="playSolo(quiz.id)">{{quiz.quiz_title}} Spielen</button>
          <!-- <button @click="deleteQuiz(quiz.id)">Löschen</button> -->
        </li>
      </ul>

      <!-- <div v-for="(quiz,index) in quizes" :key="index">

        <div class="PlayQuiz-Quiz-Preview-Container">
          <h2></h2>
          
          <button class="btn btn-primary" @click="playSolo(quiz.id)">Play Solo</button>
        </div>
      </div> -->
  </div>
</template>

<script>
import QuizService from '../services/quiz.service';
import { mapState } from 'vuex'
export default {
  name: 'PlayQuiz',
  computed: {
    ...mapState('auth',['user']),
    ...mapState('alert', ['alert']),
  },
  data() {
    return {
      quizes: [{id:0, quiz_title:'', quiz_description: '', created_at: null, created_from_playerid: 0}]
    };
  },
  mounted() {
    this.loadAndSetQuizes();

  },
  methods: {
    playSolo(quizId) {
      this.$router.push('/playquiz/solo/' + quizId);
    },
    deleteQuiz(quizId) {
      QuizService.deleteQuiz(quizId).then(
        () => {
          this.loadAndSetQuizes();
        }
      )
    },
    loadAndSetQuizes(){
      QuizService.getAllPublicQuiz().then(
        response => {
            console.log("Response", response);
          this.quizes = response;
        },
        error => {
          this.content =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
    ); 

    }
  }
};
</script>