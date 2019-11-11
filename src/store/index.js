import Vue from 'vue';
import Vuex from 'vuex';

import settings from './settings';
import response from './response';
import request from './request';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        settings,
        response,
        request
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
});
