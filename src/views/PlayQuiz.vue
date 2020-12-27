<template>
  <div id="PlayQuiz" class="PlayQuiz">
      <div v-for="(quiz,index) in quizes" :key="index">
        <div class="PlayQuiz-Quiz-Preview-Container">
          <h2>{{quiz.quiz_title}}</h2>
          {{quiz.quiz_description}}
          <button class="btn btn-primary" @click="playSolo(quiz.id)">Play Solo</button>
        </div>
      </div>
  </div>
</template>

<script>
import QuizService from '../services/quiz.service';
import { mapState } from 'vuex'
export default {
  name: 'PlayQuiz',
  computed: {
    ...mapState({
            alert: state => state.alert,
            currentUser: state => state.auth.user
    }),
  },
  data() {
    return {
      quizes: [{id:0, quiz_title:'', quiz_description: '', created_at: null}]
    };
  },
  mounted() {
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
  },
  methods: {
    playSolo(quizId) {
      this.$router.push('/playquiz/solo/' + quizId);
    }
  }
};
</script>