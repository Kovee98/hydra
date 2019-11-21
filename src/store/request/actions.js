import jsonfile from 'jsonfile';
import path from 'path';
import { remote } from 'electron';

export function update (context, payload) {
    context.commit('update', payload);
}

export function clear (context) {
    context.commit('clear');
}

export function load (context) {
    return new Promise((resolve) => {
        let requestFilePath = path.join(remote.app.getPath('userData'), 'history.json');
        jsonfile.readFile(requestFilePath)
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
