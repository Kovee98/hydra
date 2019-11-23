<template>
    <q-bar class="q-electron-drag text-grey-5 q-pr-none inner-space" :style="title">
        <span v-shortkey.once="['ctrl', 'n']" @shortkey="newFile()"/>
        <span v-shortkey.once="['ctrl', 'o']" @shortkey="openFile()"/>
        <span v-shortkey.once="['ctrl', 's']" @shortkey="saveFile()"/>
        <span v-shortkey.once="['ctrl', 'shift', 's']" @shortkey="saveAsFile()"/>

        <q-icon name="img:statics/logo/logo.svg"/>
        <q-btn size="medium" flat dense no-caps>
            File
            <q-menu v-model="fileMenu">
                <q-list :style="menu">
                    <q-item clickable v-close-popup @click="newFile">
                        <q-item-section>New</q-item-section>
                        <q-item-section class="text-right">Ctrl+N</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="openFile">
                        <q-item-section>Open...</q-item-section>
                        <q-item-section class="text-right">Ctrl+O</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup @click="saveFile">
                        <q-item-section>Save</q-item-section>
                        <q-item-section class="text-right">Ctrl+S</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="saveAsFile">
                        <q-item-section>Save as...</q-item-section>
                        <q-item-section class="text-right">Ctrl+Shift+S</q-item-section>
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
        <div>{{ reqName }}{{ isUnsaved ? '*' : '' }}</div>
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
import { mapFields } from 'vuex-map-fields';

const fs = require('fs');

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
            this.$file.request.open()
                .then((req) => {
                    this.$store.dispatch('request/update', req.data);
                    this.lastRequest = req.path;
                });
        },
        saveFile () {
            this.$file.request.save(this.lastRequest, this.currReq)
                .then((loc) => {
                    this.lastRequest = loc;
                });
        },
        saveAsFile () {
            this.$file.request.saveAs(this.currReq)
                .then((loc) => {
                    this.lastRequest = loc;
                });
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
        currReq () {
            return this.$store.getters['request/get'];
        },
        menu () {
            return {
                minWidth: '200px'
            };
        },
        title () {
            return {
                height: '35px'
            };
        },
        isUnsaved () {
            return !(this.lastRequest && fs.existsSync(this.lastRequest));
        },
        reqName () {
            return this.$path.basename(this.lastRequest || '', '.json') || 'Untitled';
        },
        ...mapFields([
            'lastRequest'
        ])
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
