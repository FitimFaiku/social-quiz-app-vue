
import {router} from '@/router'
const state = {x:0, y:0, eyeTrackingOn: false};
const hasCalibratedText = JSON.parse(localStorage.getItem('hasCalibrated'));
if(hasCalibratedText){
    state.eyeTracking = true;
}

const actions = {
    checkHasCalibratedAndSetEyeTracking({ commit }, {isOn}) {
        let hasCalibratedText = localStorage.getItem('hasCalibrated');
        if(isOn && !hasCalibratedText) {
            router.push('/calibration');
        } 
        commit('setEyeTreacking', isOn);
    },
};

const mutations = {
    setX(state, x) {
        // console.log("X", x);
        state.x = x;
    },
    setY(state, y) {
        // console.log("Y", y);
        state.y = y;
    },
    setEyeTreacking(state, isOn){
        state.eyeTrackingOn = isOn;
    }

};

export const eyeTracking = {
  namespaced: true,
  state,
  actions,
  mutations
};