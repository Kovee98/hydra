<template>
    <q-bar class="q-electron-drag text-grey-5 q-pr-none inner-space" :style="title">
        <q-icon name="img:statics/logo/logo.svg"/>
        <q-btn size="medium" flat dense no-caps>
            File
            <q-menu v-model="fileMenu">
                <q-list :style="menu">
                    <q-item clickable v-close-popup @click="newFile">
                        <q-item-section>New</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="openFile">
                        <q-item-section>Open...</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                        <q-item-section>Save</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="saveAsFile">
                        <q-item-section>Save as...</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="closeApp" v-close-popup>
                        <q-item-section>Quit</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-btn size="medium" flat dense no-caps>
            Help
            <q-menu>
                <q-list :style="menu">
                    <q-item clickable @click="suggestFeature">
                        <q-item-section>Suggest feature</q-item-section>
                    </q-item>
                    <q-item clickable @click="reportBug">
                        <q-item-section>Report a bug</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                        <q-item-section>Check for updates...</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="showAbout = true">
                        <q-item-section>About</q-item-section>
                        <about v-model="showAbout" />
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-space />
        <q-btn size="small" dense flat @click="minimize">
            <q-icon size="sm" name="minimize" />
        </q-btn>
        <q-btn size="small" dense flat @click="maximize">
            <q-icon size="sm" name="crop_square" />
        </q-btn>
        <q-btn size="small" dense flat @click="closeApp">
            <q-icon size="sm" name="close" />
        </q-btn>
    </q-bar>
</template>

<script>
import About from 'components/About';
import { openURL } from 'quasar';
import { open, saveAs } from '../js/file.js';
import { notify } from '../js/util.js';

export default {
    components: { About },
    data () {
        return {
            fileMenu: false,
            showAbout: false,
            issuesUrl: 'https://github.com/Kovee98/hydra-2/issues/new'
        };
    },
    methods: {
        newFile () {
            this.$store.dispatch('request/clear');
        },
        openFile () {
            open().then((filePath) => {
                this.$jsonfile.readFile(filePath)
                    .then(request => {
                        this.$store.dispatch('request/update', request);
                    });
            }).catch((err) => notify({ msg: err, isOk: false }));
        },
        saveAsFile () {
            saveAs().then((filePath) => {
                let currentRequest = this.$store.getters['request/get'];
                this.$jsonfile.writeFile(filePath, currentRequest, { spaces: 4 })
                    .then(() => {
                        notify({ msg: 'Request has been saved' });
                    })
                    .catch(err => notify({ msg: err.toString(), isOk: false }));
            }).catch((err) => notify({ msg: err, isOk: false }));
        },
        showPreferences () {
            this.fileMenu = false;
            this.showPrefs = true;
        },
        suggestFeature () {
            openURL(this.issuesUrl);
        },
        reportBug () {
            openURL(this.issuesUrl);
        },
        minimize () {
            if (process.env.MODE === 'electron') {
                this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
            }
        },
        maximize () {
            if (process.env.MODE === 'electron') {
                const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

                if (win.isMaximized()) {
                    win.unmaximize();
                } else {
                    win.maximize();
                }
            }
        },
        closeApp () {
            if (process.env.MODE === 'electron') {
                this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
            }
        }
    },
    computed: {
        menu () {
            return {
                minWidth: '150px'
            };
        },
        title () {
            return {
                height: '35px'
            };
        }
    }
};
</script>

<style lang="scss">
    .inner-space {
        .q-btn {
            margin-left: 10px;
        }
    }
</style>
