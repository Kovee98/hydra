import electron from 'electron';
import path from 'path';
import jsonfile from 'jsonfile';
import { notify } from '../js/util.js';

const remote = electron.remote;
const dialog = remote.dialog;

const opts = {
    open: {
        filters: [
            { name: 'JSON', extensions: ['json'] }
        ],
        properties: ['openFile']
    },
    save: {
        defaultPath: 'request',
        filters: [
            { name: 'JSON', extensions: ['json'] }
        ],
        properties: ['openFile']
    }
};

var file = {
    path: {
        history: path.join(remote.app.getPath('userData'), 'history.json'),
        settings: path.join(remote.app.getPath('userData'), 'settings.json')
    },
    request: {
        save: (loc, req) => {
            return new Promise((resolve) => {
                if (!loc) {
                    file.request.saveAs(req);
                } else {
                    jsonfile.writeFile(loc, req, { spaces: 4 })
                        .then(() => {
                            notify({ msg: 'Request has been saved' });
                            file.history.save(loc);
                            return resolve(loc);
                        }).catch((err) => {
                            notify({ msg: err.toString(), isOk: false });
                        });
                }
            });
        },
        saveAs: (req) => {
            return new Promise((resolve) => {
                dialog.showSaveDialog(opts.save, (loc) => {
                    if (!loc) {
                        notify('File not saved');
                    } else {
                        jsonfile.writeFile(loc, req, { spaces: 4 })
                            .then(() => {
                                notify({ msg: 'Request has been saved' });
                                file.history.save(loc);
                                return resolve(loc);
                            }).catch((err) => {
                                notify({ msg: err.toString(), isOk: false });
                            });
                    }
                });
            });
        },
        open: () => {
            return new Promise((resolve, reject) => {
                dialog.showOpenDialog(opts.open, (filePaths) => {
                    jsonfile.readFile(filePaths[0])
                        .then((req) => {
                            file.history.save(filePaths[0]);
                            return resolve({ data: req, path: filePaths[0] });
                        }).catch((err) => {
                            return reject(err);
                        });
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
                            return reject(err);
                        });
                });
            });
        }
    },
    settings: {
        save: (settings) => {
            return new Promise((resolve, reject) => {
                jsonfile.writeFile(file.path.settings, settings, { spaces: 4 })
                    .then(() => {
                        notify({ msg: 'Settings have been saved successfully' });
                        return resolve();
                    })
                    .catch(err => {
                        notify({ msg: err.toString(), isOk: false });
                        return reject();
                    });
            });
        },
        open: () => {
            return new Promise((resolve, reject) => {
                jsonfile.readFile(file.path.settings)
                    .then((settings) => {
                        resolve(settings);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        },
        restore: (defaults) => {
            jsonfile.writeFile(file.path.settings, defaults, { spaces: 4 })
                .then(() => {
                    notify({ msg: 'Default settings have been restored' });
                })
                .catch((err) => {
                    notify({ msg: err.toString(), isOk: false });
                });
        }
    },
    history: {
        save: (lastRequest) => {
            let history = {
                lastRequest: lastRequest
            };
            jsonfile.writeFile(file.path.history, history, { spaces: 4 })
                .then(() => {
                    console.log('history saved successfully');
                }).catch((err) => {
                    console.log(err);
                });
        },
        load: () => {
            return new Promise((resolve, reject) => {
                jsonfile.readFile(file.path.history)
                    .then((history) => {
                        resolve(history.lastRequest);
                    }).catch((err) => {
                        reject(err);
                    });
            });
        }
    }
};

export {
    file
};
