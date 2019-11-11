import Vue from 'vue';
import Vuex from 'vuex';

import params from './params';
import headers from './headers';
import settings from './settings';
import body from './body';
import response from './response';
import { getField, updateField } from 'vuex-map-fields';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    getters: {
        getField
    },
    mutations: {
        updateField
    },
    modules: {
        params,
        headers,
        settings,
        body,
        response
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
});
