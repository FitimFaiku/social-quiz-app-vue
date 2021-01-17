<template>
  <div id="PlayQuiz" class="PlayQuiz">
      <h1>Wähle ein Quiz aus um zu spielen.</h1>

      <div v-if="myQuizes.length >=1">
        <h2>Meine erstellten Quizes</h2>
        <ul v-for="(myQuiz,index) in myQuizes" :key="index" role="toolbar">
          <li style="display:flex; flex-direction:column;">
            <h3>Titel: {{myQuiz.quiz_title}}</h3>
            <h4>Beschreibung: {{myQuiz.quiz_description}}</h4>
            <button class="btn btn-primary" aria-setsize="4" v-bind:aria-posinset="index" @click="playSolo(myQuiz.id)">{{myQuiz.quiz_title}} Spielen</button>
            <button class="btn btn-secondary" style="margin-top: 0.5rem;" aria-setsize="4" v-bind:aria-posinset="index" @click="editQuiz(myQuiz.id)">{{myQuiz.quiz_title}} Bearbeiten</button>
            <button class="btn btn-danger" style="margin-top: 0.5rem;" aria-setsize="4" v-bind:aria-posinset="index" @click="deleteQuiz(myQuiz.id)">{{myQuiz.quiz_title}} Löschen</button>
          </li>
        </ul>
      </div>

      <div v-if="publicQuizes.length >=1">
        <h2>Öffentlich erstellte Quizes</h2>
        <ul v-for="(publicQuiz,index) in publicQuizes" :key="index" role="toolbar">
          <li style="display:flex; flex-direction:column;">
            <h3>Titel: {{publicQuiz.quiz_title}}</h3>
            <h4>Beschreibung: {{publicQuiz.quiz_description}}</h4>
            <button class="btn btn-primary" aria-setsize="4" v-bind:aria-posinset="index" @click="playSolo(publicQuiz.id)">{{publicQuiz.quiz_title}} Spielen</button>
          </li>
        </ul>
      </div>

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
      publicQuizes: [{id:0, quiz_title:'', quiz_description: '', created_at: null}],
      myQuizes: [{id:0, quiz_title:'', quiz_description: '', created_at: null}],
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
    editQuiz(quizId) {
      console.log("Edit");
      this.$router.push('/updatequiz/' + quizId);
    },
    loadAndSetQuizes(){
      QuizService.getAllPublicQuiz().then(
        response => {
          this.publicQuizes = [];
          this.myQuizes = [];
            console.log("Response", response);
            response.map(quiz => {
              if(this.user && this.user.id && quiz.created_from_player && quiz.created_from_player.id ===this.user.id){
                this.myQuizes.push(quiz);
              } else {
                this.publicQuizes.push(quiz);
              }
            })
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