import Vue from 'vue';
import Vuex from 'vuex';

import params from './params';
import headers from './headers';
import settings from './settings';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    modules: {
        params,
        headers,
        settings
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
});
