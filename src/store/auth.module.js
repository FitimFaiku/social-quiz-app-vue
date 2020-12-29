import AuthService from '../services/auth.service';
import { router } from '../router';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, { username, password }) {
        console.log("Login", username, password );
        commit('loginRequest', { username });
    
        AuthService.login(username, password)
            .then(
                res => {
                    console.log("Response login", res);
                    commit('loginSuccess', res.user);
                    router.push('/home');
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    logout({ commit }) {
        AuthService.logout();
        commit('logout');
    },
    register({ dispatch, commit }, user) {
        commit('registerRequest', user);
        AuthService.register(user)
            .then(
                res => {
                    console.log("Res", res);
                    console.log("Res sucess", res.data.success);
                    if(!res.data.success){
                        commit('registerFailure', res.data.message.message);
                        dispatch('alert/error', res.data.message.message, { root: true });
                    } else {
                        commit('registerSuccess');
                        router.push('/login');
                        setTimeout(() => {
                            // display success message after route change completes
                            dispatch('alert/success', 'Registration successful', { root: true });
                        })
                    }
                },
                error => {
                    console.log("Error");
                    commit('registerFailure', error);
                    dispatch('alert/error', error, { root: true });
                }
            );
    },
    checkUser({commit }) {
        let user = AuthService.getLoggedInUser();
        if(user != undefined && user != null ){
            const userJSON = JSON.parse(user)
            commit('loginSuccess', userJSON.user);
            console.log("User Sucessfully loged in");
          } else {
            this.$router.push('/login')
          }

        
        
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
    registerRequest(state) {
        state.status = { registering: true };
    },
    registerSuccess(state) {
        state.status = {};
    },
    registerFailure(state) {
        state.status = {};
    }
};

export const auth = {
  namespaced: true,
  state,
  actions,
  mutations
};