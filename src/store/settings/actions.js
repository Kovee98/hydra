import jsonfile from 'jsonfile';
import config from '../../js/config.js';

export function update (context, payload) {
    return new Promise((resolve) => {
        context.commit('update', payload);
        resolve(payload);
    });
}

export function load (context) {
    return new Promise((resolve) => {
        jsonfile.readFile(config.file.settings)
            .then(settings => {
                context.commit('update', settings);
                resolve(settings);
            });
    });
}
