import pj from '../../package.json';
import vue from 'vue';
import electron from 'electron';

export default {
    versions: {
        app: pj.version,
        vue: vue.version,
        electron: electron.remote.process.versions.electron,
        chrome: electron.remote.process.versions.chrome,
        node: electron.remote.process.versions.node
    },
    author: pj.author
};
