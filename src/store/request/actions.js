import { file } from '../../js/file.js';

export function update (context, payload) {
    context.commit('update', payload);
}

export function clear (context) {
    context.commit('clear');
}

export function load (context) {
    return new Promise((resolve) => {
        file.request.load().then((req) => {
            context.commit('update', req.data);
            return resolve(req.path);
        });
    });
}

export function removeParam (context, payload) {
    context.commit('removeParam', payload);
}

export function addParam (context, payload) {
    context.commit('addParam', payload);
}

export function removeHeader (context, payload) {
    context.commit('removeHeader', payload);
}

export function addHeader (context, payload) {
    context.commit('addHeader', payload);
}
