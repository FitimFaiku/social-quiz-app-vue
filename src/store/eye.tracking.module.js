
const state = {x:0, y:0, eyeTrackingOn: false};

const actions = {

};

const mutations = {
    setX(state, x) {
        state.x = x;
    },
    setY(state, y) {
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