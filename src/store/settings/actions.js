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

export function restore (context) {
    return new Promise((resolve) => {
        let defaults = {
            colors: [
                { type: 'Key', color: '#98e22b' },
                { type: 'String', color: '#e7db74' },
                { type: 'Number', color: '#ac80ff' },
                { type: 'Boolean', color: '#0a49cc' },
                { type: 'Null', color: '#ac80ff' }
            ],
            history: {
                mostRecent: true
            },
            notifications: {
                notifyResponseSuccess: true,
                notifyResponseError: true,
                notifySettingsUpdate: true
            }
        };
        context.commit('update', defaults);
        return resolve();
    });
}
