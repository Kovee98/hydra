import jsonfile from 'jsonfile';
import config from '../../js/config.js';

export function update (context, payload) {
    context.commit('update', payload);
}

export function clear (context) {
    context.commit('clear');
}

export function load (context) {
    return new Promise((resolve) => {
        jsonfile.readFile(config.file.history)
            .then(request => {
                context.commit('update', request);
                resolve(request);
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
