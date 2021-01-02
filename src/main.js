import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import bootstrapvue from 'bootstrap-vue'

// import '@/assets/gazeCloud.js'
import {
  faHome,
  faUser,
  faPlay,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faPlusSquare,
  faUsers,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt,faNewspaper,faPlay,faPlusSquare,faUsers);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(bootstrapvue);

let app = '';
const firebaseConfig = {
  apiKey: "AIzaSyCk1laCfQmhgGem65A0u9LIO3_WrO9oRJc",
  authDomain: "socialquizapp.firebaseapp.com",
  projectId: "socialquizapp",
  storageBucket: "socialquizapp.appspot.com",
  messagingSenderId: "1024038656131",
  appId: "1:1024038656131:web:d55b8bafe5b9807e62a3b6",
  measurementId: "G-30BVR2FD06"
};

firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});

/* new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app'); */

/* 1WWC4nWaBfd_i1EJSpRT_a0Z */