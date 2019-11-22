import path from 'path';
import { remote } from 'electron';

let historyFile = path.join(remote.app.getPath('userData'), 'history.json');
let settingsFile = path.join(remote.app.getPath('userData'), 'settings.json');

let config = {
    file: {
        history: historyFile,
        settings: settingsFile
    }
};

export default config;
