<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Hallo {{currentUser.name}}</h3>
    </header>
  </div>
</template>

<script>
// import UserService from '../services/user.service';
import { mapState } from 'vuex'
export default {
  name: 'Home',
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