import electron from 'electron';
import path from 'path';
import jsonfile from 'jsonfile';
import { notify } from '../js/util.js';

const remote = electron.remote;
const dialog = remote.dialog;
const opts = {
    filters: [
        { name: 'JSON', extensions: ['json'] }
    ],
    properties: ['openFile']
};

var file = {
    path: {
        history: path.join(remote.app.getPath('userData'), 'history.json'),
        settings: path.join(remote.app.getPath('userData'), 'settings.json')
    },
    request: {
        save: (loc, req) => {
            return new Promise((resolve, reject) => {
                if (!loc) {
                    file.request.saveAs(req)
                        .then((loc) => resolve(loc))
                        .catch((err) => reject(err));
                } else {
                    jsonfile.writeFile(loc, req, { spaces: 4 })
                        .then(() => {
                            file.history.save(loc);
                            return resolve(loc);
                        }).catch((err) => reject(err));
                }
            });
        },
        saveAs: (req) => {
            return new Promise((resolve, reject) => {
                dialog.showSaveDialog(opts, (loc) => {
                    if (loc) {
                        Promise.all([
                            jsonfile.writeFile(loc, req, { spaces: 4 }),
                            file.history.save(loc)
                        ]).then(() => resolve(loc))
                            .catch((err) => reject(err));
                    }
                });
            });
        },
        open: () => {
            return new Promise((resolve, reject) => {
                dialog.showOpenDialog(opts, (filePaths) => {
                    if (filePaths) {
                        let loc = filePaths[0];
                        jsonfile.readFile(loc).then((req) => {
                            if (isValid(req)) {
                                file.history.save(loc);
                                return resolve({ data: req, path: loc });
                            } else {
                                return reject('Request file is malformed');
                            }
                        }).catch((err) => reject(err));
                    }
                });
            });
        },
        load: () => {
            return new Promise((resolve, reject) => {
                file.history.load().then((lastRequest) => {
                    jsonfile.readFile(lastRequest)
                        .then((req) => {
                            file.history.save(lastRequest);
                            return resolve({ data: req, path: lastRequest });
                        }).catch((err) => {
                            console.log('err:', err);
                            // notify({ msg: err.toString(), isOk: false });
                            return reject(err);
                        });
                }).catch((err) => {
                    console.log('err:', err);
                });
            });
        }
    },
    settings: {
        save: (settings) => {
            return new Promise((resolve, reject) => {
                jsonfile.writeFile(file.path.settings, settings, { spaces: 4 })
                    .then(() => resolve())
                    .catch((err) => reject(err));
            });
        },
        open: () => {
            return new Promise((resolve, reject) => {
                jsonfile.readFile(file.path.settings)
                    .then((settings) => resolve(settings))
                    .catch((err) => reject(err));
            });
        }
    },
    history: {
        save: (lastRequest) => {
            return new Promise((resolve, reject) => {
                jsonfile.writeFile(file.path.history, { lastRequest: lastRequest }, { spaces: 4 })
                    .then(() => resolve())
                    .catch((err) => {
                        notify({ msg: err.toString(), isOk: false });
                        return reject();
                    });
            });
        },
        load: () => {
            return new Promise((resolve, reject) => {
                jsonfile.readFile(file.path.history)
                    .then((history) => resolve(history.lastRequest))
                    .catch((err) => {
                        console.log('err:', err);
                        // notify({ msg: err.toString(), isOk: false });
                        return reject(err);
                    });
            });
        }
    }
};

function isValid (req) {
    if (!req.hasOwnProperty('method') ||
        !req.hasOwnProperty('url') ||
        !req.hasOwnProperty('body') ||
        !req.hasOwnProperty('params') ||
        !req.hasOwnProperty('headers') ||
        !req.hasOwnProperty('auth')) {
        return false;
    }

    return true;
}

export {
    file
};
