import electron from 'electron';
const dialog = electron.remote.dialog;

const dialogOpts = {
    defaultPath: 'request',
    filters: [
        { name: 'JSON', extensions: ['json'] }
    ],
    properties: ['openFile']
};

var open = () => {
    return new Promise((resolve, reject) => {
        dialog.showOpenDialog(dialogOpts, (filePaths) => {
            if (filePaths === undefined) {
                return reject('No file selected');
            }
            return resolve(filePaths[0]);
        });
    });
};

var saveAs = () => {
    return new Promise((resolve, reject) => {
        dialog.showSaveDialog(dialogOpts, (filePath) => {
            if (filePath === undefined) {
                return reject('File not saved');
            }
            return resolve(filePath);
        });
    });
};

export {
    open,
    saveAs
};
