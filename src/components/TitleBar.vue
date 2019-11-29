<template>
    <q-bar class="q-electron-drag text-grey-5 q-pr-none q-pl-sm inner-space" :style="title">
        <span v-shortkey.once="['ctrl', 'n']" @shortkey="newFile()"/>
        <span v-shortkey.once="['ctrl', 'o']" @shortkey="openFile()"/>
        <span v-shortkey.once="['ctrl', 's']" @shortkey="saveFile()"/>
        <span v-shortkey.once="['ctrl', 'shift', 's']" @shortkey="saveAsFile()"/>

        <q-icon name="img:statics/logo/logo.svg" class="q-mr-xs" />
        <q-btn size="small" :style="barBtn" flat dense no-caps :class="barBtnClass">
            File
            <q-menu v-model="fileMenu">
                <q-list dense :style="menu" class="q-py-xs">
                    <q-item clickable v-close-popup @click="newFile" :class="qItemClass">
                        <q-item-section>New</q-item-section>
                        <q-item-section class="text-right">Ctrl+N</q-item-section>
                    </q-item>
                    <q-separator inset class="q-my-xs" />
                    <q-item clickable v-close-popup @click="openFile" :class="qItemClass">
                        <q-item-section>Open...</q-item-section>
                        <q-item-section class="text-right">Ctrl+O</q-item-section>
                    </q-item>
                    <q-separator inset class="q-my-xs" />
                    <q-item clickable v-close-popup @click="saveFile" :class="qItemClass">
                        <q-item-section>Save</q-item-section>
                        <q-item-section class="text-right">Ctrl+S</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="saveAsFile" :class="qItemClass">
                        <q-item-section>Save as...</q-item-section>
                        <q-item-section class="text-right">Ctrl+Shift+S</q-item-section>
                    </q-item>
                    <q-separator inset class="q-my-xs" />
                    <q-item clickable @click="closeApp" v-close-popup :class="qItemClass">
                        <q-item-section>Quit</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-btn size="small" :style="barBtn" flat dense no-caps :class="barBtnClass">
            Help
            <q-menu>
                <q-list dense :style="menu" class="q-py-xs">
                    <q-item clickable @click="suggestFeature" :class="qItemClass">
                        <q-item-section>Suggest feature</q-item-section>
                    </q-item>
                    <q-item clickable @click="reportBug" :class="qItemClass">
                        <q-item-section>Report a bug</q-item-section>
                    </q-item>
                    <q-separator inset class="q-my-xs" />
                    <q-item clickable :class="qItemClass">
                        <q-item-section>Check for updates...</q-item-section>
                    </q-item>
                    <q-separator inset class="q-my-xs" />
                    <q-item clickable @click="showAbout = true" :class="qItemClass">
                        <q-item-section>About</q-item-section>
                        <about v-model="showAbout" />
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-space />
        <div>{{ reqName }}{{ isUnsaved ? '*' : '' }}</div>
        <q-space />
        <q-btn size="small" :style="barBtn" dense flat @click="minimize" :class="barBtnClass">
            <q-icon size="xs" name="minimize" />
        </q-btn>
        <q-btn size="small" :style="barBtn" dense flat @click="maximize" :class="barBtnClass">
            <q-icon size="xs" name="crop_square" />
        </q-btn>
        <q-btn size="small" :style="barBtn" dense flat @click="closeApp" :class="barBtnClass">
            <q-icon size="xs" name="close" />
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
            this.lastRequest = '';
            this.isUnsaved = true;
            this.data = '';
        },
        openFile () {
            this.$file.request.open()
                .then((req) => {
                    this.$store.dispatch('request/update', req.data);
                    this.lastRequest = req.path;
                    this.isUnsaved = false;
                });
        },
        saveFile () {
            this.$file.request.save(this.lastRequest, this.currReq)
                .then((loc) => {
                    this.lastRequest = loc;
                    this.isUnsaved = false;
                });
        },
        saveAsFile () {
            this.$file.request.saveAs(this.currReq)
                .then((loc) => {
                    this.lastRequest = loc;
                    this.isUnsaved = false;
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
                let win = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

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
        barBtn () {
            return {
                minWidth: '45px',
                margin: '0'
            };
        },
        barBtnClass () {
            return 'full-height no-border-radius';
        },
        qItemClass () {
            return 'no-pointer';
        },
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
                height: '30px'
            };
        },
        isUnsaved () {
            return this.isUnsaved || !(this.lastRequest && fs.existsSync(this.lastRequest));
        },
        reqName () {
            return this.$path.basename(this.lastRequest) || 'Untitled';
        },
        ...mapFields([
            'lastRequest',
            'isUnsaved'
        ]),
        ...mapFields('response', [
            'data'
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
