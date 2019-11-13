import jsonfile from 'jsonfile';
import path from 'path';
import { remote } from 'electron';

export function update (context, payload) {
    return new Promise((resolve) => {
        context.commit('update', payload);
        resolve(payload);
    });
}

export function load (context) {
    return new Promise((resolve) => {
        let settingsFile = path.join(remote.app.getPath('userData'), 'settings.json');
        jsonfile.readFile(settingsFile)
            .then(settings => {
                context.commit('update', settings);
                resolve(settings);
            });
    });
}
