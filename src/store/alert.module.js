const state = {
    alert: {
        type: null,
        message: null
    }
};

const actions = {
    success({ commit }, message) {
        commit('success', message);
    },
    error({ commit }, message) {
        commit('error', message);
    },
    clear({ commit }) {
        commit('clear');
    }
};

const mutations = {
    success(state, message) {
        state.alert.type = 'alert-success';
        state.alert.message = message;
    },
    error(state, message) {
        state.alert.type = 'alert-danger';
        state.alert.message = message;
    },
    clear(state) {
        state.alert.type = null;
        state.alert.message = null;
    }
};

export const alert = {
    namespaced: true,
    state,
    actions,
    mutations
};