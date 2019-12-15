import electron from 'electron';
import path from 'path';
import jsonfile from 'jsonfile';

const fs = require('fs');
const remote = electron.remote;
const dialog = remote.dialog;
const baseDir = remote.app.getPath('userData');
const opts = {
    filters: [
        { name: 'JSON', extensions: ['json'] }
    ],
    properties: ['openFile']
};

var file = {
    path: {
        history: path.join(baseDir, 'history.json'),
        settings: path.join(baseDir, 'settings.json')
    },
    request: {
        save: ({ loc = path.join(baseDir, 'request.json'), req }) => {
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
                    if (fs.existsSync(lastRequest)) {
                        jsonfile.readFile(lastRequest).then((req) => {
                            file.history.save(lastRequest);
                            return resolve({ data: req, path: lastRequest });
                        }).catch((err) => {
                            return reject(err);
                        });
                    } else {
                        return reject();
                    }
                }).catch((err) => {
                    return reject(err);
                });
            });
        },
        exists: () => {
            return new Promise((resolve, reject) => {
                file.history.load().then((lastRequest) => {
                    if (fs.existsSync(lastRequest)) {
                        return resolve();
                    } else {
                        return reject();
                    }
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
        },
        exists: () => {
            return new Promise((resolve, reject) => {
                if (fs.existsSync(file.path.settings)) {
                    return resolve();
                } else {
                    return reject();
                }
            });
        }
    },
    history: {
        save: (lastRequest) => {
            return new Promise((resolve, reject) => {
                jsonfile.writeFile(file.path.history, { lastRequest: lastRequest }, { spaces: 4 })
                    .then(() => resolve())
                    .catch((err) => {
                        return reject(err);
                    });
            });
        },
        load: () => {
            return new Promise((resolve, reject) => {
                jsonfile.readFile(file.path.history)
                    .then((history) => resolve(history.lastRequest))
                    .catch((err) => reject(err));
            });
        },
        exists: () => {
            return new Promise((resolve, reject) => {
                if (fs.existsSync(file.path.history)) {
                    return resolve();
                } else {
                    return reject();
                }
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
