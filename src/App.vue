<style >
html { font-size: 62.5%; }
table { font-size: 100% }
body {
    font-family:Arial,Helvetica,sans-serif;
    font-size: 1em;
}
@media (max-width: 300px) {
    html { font-size: 70%; }
}

@media (min-width: 500px) {
    html { font-size: 80%; }
}

@media (min-width: 700px) {
    html { font-size: 100%; }
}

@media (min-width: 1200px) {
    html { font-size: 120%; }
}
</style>
<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/home" class="nav-link"> <a href="/home" class="navbar-brand" @click.prevent><img src="./assets/logo.svg" /></a></router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li>
        <!-- <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/news" class="nav-link">News</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="user" to="/playquiz" class="nav-link">Play</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="user" to="/createquiz" class="nav-link">Quiz Erstellen</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="user" to="/posts" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="user" to="/friends" class="nav-link">Freunde</router-link>
        </li>
      </div>

      <div v-if="!user" class="navbar-nav ml-auto">
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

      <ToggleButtonComponent labelEnableText="Eye Tracking An" v-bind:defaultState="eyeTrackingOn" labelDisableText="Eye Tracking Aus" @change="onChangeToggleButton" />
      <div v-if="user" class="navbar-nav ml-auto">
        <!-- <li class="nav-item">
          <router-link to="/playquiz" class="nav-link">
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            <!-- {{ user.username }} -->
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
        <!-- <div class="container">
            <div class="row"> -->
                <!-- <div class="col-sm-6 offset-sm-3"> -->
                    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
                    <router-view></router-view>
                <!-- </div> -->
          <!--   </div>
        </div> -->
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
    <!-- <div>Fitim {{this.x}} {{this.y}} </div> -->
    <div v-if="eyeTrackingOn"> 
      <WebGazer @update="onUpdate" :off="false" :quit="!eyeTrackingOn" />
    </div>
  </div>


  
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WebGazer from "@/components/WebGazer.vue";
import ToggleButtonComponent from "@/components/ToggleButtonComponent.vue"
// import AuthService from "./services/auth.service"
export default {
  components: { WebGazer, ToggleButtonComponent },
  beforeCreate() {
    //  this.$store.dispatch('auth/checkIsLoggedIn');
  },
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  computed: {
    ...mapState('auth',['user']),
    ...mapState('alert', ['alert']),
    ...mapState('eyeTracking',['eyeTrackingOn'])
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
      console.log("OnUpdate", coord);
      this.$store.commit('eyeTracking/setX', {x:coord.x});
      this.$store.commit('eyeTracking/setY', {y:coord.y});
/*       this.x = coord.x;
      this.y = coord.y; */
    },
    onChangeToggleButton(value){
      this.$store.dispatch('eyeTracking/checkHasCalibratedAndSetEyeTracking', {isOn:value});
    },
    hasCamera() {
      navigator.getUserMedia({video: true},function (stream) {
          if(stream.getVideoTracks().length > 0){
            console.log("Stream", stream);
            return true;
              //code for when none of the devices are available                       
          }else{
              // code for when both devices are available
              return false;
          }
      });
    }
  }, 
  mounted () {
    /* let user = AuthService.getLoggedInUser();
    console.log("User", user);
    if(user != undefined && user != null ){
      console .log("Is authenticated."); */
    this.$store.dispatch('auth/checkUser');
    /* } else {
      this.$router.push('/login')
    } */
  },
  watch: {
    $route (){
        // clear alert on location change
        
        this.clearAlert();
    }
  } 
};
</script>