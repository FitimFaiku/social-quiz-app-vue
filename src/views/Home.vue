<template>
  <div class="home">
    <!-- <header class="jumbotron">
      <h3>Hallo {{currentUser.name}}</h3>
    </header> -->
    <News />
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import News from './News.vue'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components : {News},
  computed: {
    ...mapState({
            alert: state => state.alert,
            currentUser: state => state.auth.user
    }),
  },
  data() {
    return {
      content: ''
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
  }
};
</script>