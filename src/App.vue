<style lang="scss">

$logo: #915F19;
$primary: #053A85;
$secondary: #388AFC;
$third: #152F54;
$fourth: #074CAD;

h1 {
  color:$primary;
}

h2 {
  color:$secondary;
}

h3 {
  color: $third;
}

html { font-size: 62.5%; }
table { font-size: 100% }
body {
    font-family:Arial,Helvetica,sans-serif;
    font-size: 1em;
}

.nav-item {
  svg {
    margin-right: 0.3rem;
  }
}


.navbar {
  background-color:$primary; 
  a{
    color: white;
  }
}

@media (max-width: 300px) {
    html { font-size: 50%; }
    .navbar-expand {
      flex-flow: column nowrap !important;
    }
}

@media (min-width: 500px) {
    html { font-size: 70%; }
}

@media (min-width: 700px) {
    html { font-size: 90%; }
}

@media (min-width: 1200px) {
    html { font-size: 120%; }
}
</style>
<template>
  <div id="app">
    <nav class="navbar navbar-expand">
      <router-link to="/home" class="nav-link"> <img src="./assets/logo.svg" alt="Logo Bild, welches zur Home Seite führt"/></router-link>
      <div class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Home
          </router-link>
        </li> -->
        <!-- <li v-if="showAdminBoard" class="nav-item">
          <router-link to="/admin" class="nav-link">Admin Board</router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/news" class="nav-link">
            <font-awesome-icon icon="newspaper" />News
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/playquiz" class="nav-link">
          <font-awesome-icon icon="play" />Play
          </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="user" to="/createquiz" class="nav-link">
            <font-awesome-icon icon="plus-square" />Quiz Erstellen
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link v-if="user" to="/posts" class="nav-link">Posts</router-link>
        </li> -->
        <!-- <li class="nav-item">
          <router-link v-if="user" to="/friends" class="nav-link">
          <font-awesome-icon icon="users" />Freunde</router-link>
        </li> -->
      </div>

      <div v-if="!user" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Registrieren
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>


      <div v-if="user" class="navbar-nav ml-auto">
        <!-- <li class="nav-item">
          <router-link to="/playquiz" class="nav-link">
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" /> Profil
            <!-- {{ user.username }} -->
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>
      <ToggleButtonComponent labelEnableText="Eye Tracking An" v-bind:defaultState="eyeTrackingOn" labelDisableText="Eye Tracking Aus" @change="onChangeToggleButton" />
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
  
    <div v-if="eyeTrackingOn && false"> 
      <WebGazer @update="onUpdate" :off="false" />
    </div>

    <div v-if="eyeTrackingOn"> 
      <GazeCloud @update="onUpdate" />
    </div>

    <!-- Footer -->
<!--     <mdb-footer color="indigo" class="font-small pt-0">
      <mdb-container>
        <mdb-row class="pt-5 mb-3 text-center d-flex justify-content-center">
          <mdb-col md="2" class="b-3">
            <h6 class="title font-weight-bold"><a href="#!">Über Uns</a></h6>
          </mdb-col>
          <mdb-col md="2" class="b-3">
            <h6 class="title font-weight-bold"><a href="#!">Hilfe</a></h6>
          </mdb-col>
          <mdb-col md="2" class="b-3">
            <h6 class="title font-weight-bold"><a href="#!">Kontakt</a></h6>
          </mdb-col>
        </mdb-row>
        <hr class="rgba-white-light" style="margin: '0 15%'" />
        <hr class="clearfix d-md-none rgba-white-light" style="margin: '10% 15% 5%'" />
        <mdb-row class="pb-3">
          <mdb-col md="12">
            <div class="mb-5 flex-center">
              <a class="fb-ic"><i class="fab fa-facebook fa-lg white-text mr-md-4"> </i></a>
              <a class="tw-ic"><i class="fab fa-twitter fa-lg white-text mr-md-4"> </i></a>
              <a class="gplus-ic"><i class="fab fa-google-plus fa-lg white-text mr-md-4"> </i></a>
              <a class="li-ic"><i class="fab fa-linkedin-in fa-lg white-text mr-md-4"> </i></a>
              <a class="ins-ic"><i class="fab fa-instagram fa-lg white-text mr-md-4"> </i></a>
              <a class="pin-ic"><i class="fab fa-pinterest fa-lg white-text"> </i></a>
            </div>
          </mdb-col>
        </mdb-row>
      </mdb-container>
      <div class="footer-copyright text-center py-3">
        <mdb-container fluid>
          &copy; 2020 Copyright: <a href="https://www.SocialQuizApp.com"> SocialQuizApp.com </a>
        </mdb-container>
      </div>
    </mdb-footer> -->
    <!-- Footer -->
  </div>


  
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WebGazer from "@/components/WebGazer.vue";
import GazeCloud from "@/components/GazeCloud.vue";
import ToggleButtonComponent from "@/components/ToggleButtonComponent.vue"
//  import { mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue';
// import AuthService from "./services/auth.service"
// import '@/assets/GazeCloudAPI.js'
export default {
  components: { WebGazer, ToggleButtonComponent,GazeCloud},
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
      this.$store.commit('eyeTracking/setX', coord.x);
      this.$store.commit('eyeTracking/setY', coord.y);
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