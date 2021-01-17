import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import News from './views/News.vue'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/playquiz',
      name: 'playquiz',
      // lazy-loaded
      component: () => import('./views/PlayQuiz.vue')
    },
    {
      path: '/playquiz/solo/:quizId',
      name: 'playquiz-solo',
      // lazy-loaded
      component: () => import('./views/PlayQuizSolo.vue')
    },

    {
      path: '/calibration',
      name: 'CalibrationView',
      // lazy-loaded
      component: () => import('./views/CalibrationView.vue')
    },
    {
      path: '/mod',
      name: 'moderator',
      // lazy-loaded
      component: () => import('./views/BoardModerator.vue')
    },
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    },
    {
      path: '/createquiz',
      name: 'createquiz',
      // lazy-loaded
      component: () => import('./views/CreateQuiz.vue')
    },
    {
      path: '/updatequiz/:quizId',
      name: 'updatequiz',
      // lazy-loaded
      component: () => import('./views/CreateQuiz.vue')
    },
    
    {
      path: '/eye-settings',
      name: 'eyetrackingsettings',
      // lazy-loaded
      component: () => import('./views/EyeTrackingSettings.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/news','/playquiz','/playquiz/solo/:quizId','/login', '/register', '/calibration', '/eye-settings'];
  let authRequired = !publicPages.includes(to.path);
  authRequired =  authRequired && !to.path.startsWith('/playquiz/solo/');
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})