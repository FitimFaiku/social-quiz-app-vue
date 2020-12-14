<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href class="navbar-brand" @click.prevent>LOGO</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard" class="nav-item">
          <router-link to="/mod" class="nav-link">Moderator Board</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
        </li>
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/playquiz" class="nav-link">
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
    </nav>
    
     <div class="jumbotron">
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 offset-sm-3">
                        <div v-if="alert.message" :class="'alert ' + alert.type">{{alert.message}}</div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div> -->
    <div>Fitim {{this.x}} {{this.y}} </div>
  <WebGazer @update="onUpdate" :off="false" />  
  </div>


  
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WebGazer from "@/components/WebGazer.vue";
import firebase from "firebase";
export default {
  components: { WebGazer },
  created() {
    firebase.auth().onAuthStateChanged(user => {
           if (user) {
               this.user = user;
           }
       });
  },
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  computed: {
    ...mapState({
            alert: state => state.alert
    }),
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    ...mapActions({
          clearAlert: 'alert/clear' 
      }),
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }, 
    onUpdate(coord) {
      this.x = coord.x;
      this.y = coord.y;
    }
  }, 
  watch: {
    $route (){
        // clear alert on location change
        
        this.clearAlert();
    }
  } 
};
</script>