import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { alert } from './alert.module';
import {eyeTracking} from './eye.tracking.module'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth, alert, eyeTracking
  },
});
