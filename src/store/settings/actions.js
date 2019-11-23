import { file } from '../../js/file.js';

export function update (context, payload) {
    return new Promise((resolve) => {
        context.commit('update', payload);
        resolve(payload);
    });
}

export function load (context) {
    file.settings.open().then((settings) => {
        context.commit('update', settings);
    });
}
