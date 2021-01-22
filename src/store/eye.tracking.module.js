
const state = {x:0, y:0, eyeTrackingOn: false, webgazerOn: false, gazerecorderOn:false,intervalDuration:500, countFocus:4, countClick: 8 };
const eyeSettings = JSON.parse(localStorage.getItem('eyeSettings'));
if(eyeSettings){
    state.eyeTrackingOn = eyeSettings.eyeTrackingOn;
    state.webgazerOn = eyeSettings.webgazerOn;
    state.gazerecorderOn = eyeSettings.gazerecorderOn;
    state.intervalDuration= eyeSettings.intervalDuration;
    state.countFocus = eyeSettings.countFocus;
    state.countClick = eyeSettings.countClick;
}

const actions = {
    checkInitialState(){
        const eyeSettings = JSON.parse(localStorage.getItem('eyeSettings'));
        if(eyeSettings) {
            state.eyeTrackingOn = eyeSettings.eyeTrackingOn;
            state.webgazerOn = eyeSettings.webgazerOn;
            state.gazerecorderOn = eyeSettings.gazerecorderOn;
        }
    },
    toggleEyeTracking({ commit }, {isOn}) {
        const eyeSettings = JSON.parse(localStorage.getItem('eyeSettings'));
        if(isOn && !eyeSettings) {
            // Initial State here
            localStorage.setItem('eyeSettings', JSON.stringify({eyeTrackingOn: isOn,webgazerOn:false,gazerecorderOn:true, intervalDuration:500, countClick:8, countFocus:4}));
            state.eyeTrackingOn = isOn;
            state.webgazerOn = false;
            state.gazerecorderOn = true;
            state.intervalDuration = 500;
            state.countClick = 6;
            state.countFocus = 3;
        }
        if(eyeSettings){
            commit('setEyeTreacking', isOn);
            localStorage.setItem('eyeSettings', JSON.stringify({eyeTrackingOn: isOn,webgazerOn:state.webgazerOn,gazerecorderOn:state.gazerecorderOn}));
        }
    },
};

const mutations = {
    setX(state, x) {
        //console.log("X", x);
        state.x = x;
    },
    setY(state, y) {
        //console.log("Y", y);
        state.y = y;
    },
    setEyeTreacking(state, isOn){
        state.eyeTrackingOn = isOn;
    },
    setWebgazer(state, isOn){
        state.webgazerOn = isOn;
        if(isOn) {
            state.gazerecorderOn = false;
        }
        localStorage.setItem('eyeSettings', JSON.stringify({eyeTrackingOn: state.eyeTrackingOn,webgazerOn:state.webgazerOn,gazerecorderOn:state.gazerecorderOn}));
    },
    setGazerecorder(state, isOn){
        state.gazerecorderOn = isOn;
        if(isOn) {
            state.webgazerOn = false;
        }
        localStorage.setItem('eyeSettings', JSON.stringify({eyeTrackingOn: state.eyeTrackingOn,webgazerOn:state.webgazerOn,gazerecorderOn:state.gazerecorderOn}));
    },
    setIntervalDuration(state, intervalDuration){
        const eyeSettings = JSON.parse(localStorage.getItem('eyeSettings'));
        eyeSettings.intervalDuration = intervalDuration;
        state.intervalDuration = intervalDuration;
        localStorage.setItem('eyeSettings', JSON.stringify(eyeSettings));

    },
    setCountFocus(state, countFocus) {
        const eyeSettings = JSON.parse(localStorage.getItem('eyeSettings'));
        eyeSettings.countFocus = countFocus;
        state.countFocus = countFocus;
        localStorage.setItem('eyeSettings', JSON.stringify(eyeSettings));
    },
    setCountClick(state, countClick) {
        const eyeSettings = JSON.parse(localStorage.getItem('eyeSettings'));
        eyeSettings.countClick = countClick;
        state.countClick = countClick;
        localStorage.setItem('eyeSettings', JSON.stringify(eyeSettings));
    }


};

export const eyeTracking = {
  namespaced: true,
  state,
  actions,
  mutations
};