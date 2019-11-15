<template>
    <q-bar class="q-electron-drag text-grey-5 q-pa-sm" :style="title">
        <q-icon name="img:statics/logo/logo.svg" />
        <q-btn size="medium" flat no-caps>
            File
            <q-menu>
                <q-list :style="menu">
                    <q-item clickable v-close-popup>
                        <q-item-section>New</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-section>Open...</q-item-section>
                    </q-item>
                    <q-separator />
                    <settings />
                    <q-separator />
                    <q-item clickable v-close-popup @click="closeApp">
                        <q-item-section>Quit</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-btn size="medium" flat no-caps>
            Edit
            <q-menu>
                <q-list :style="menu">
                    <q-item clickable v-close-popup>
                        <q-item-section>Cut</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-section>Copy response</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-section>Paste request</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                        <q-item-section>Select All</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-btn size="medium" flat no-caps>
            Help
            <q-menu>
                <q-list :style="menu">
                    <q-item clickable v-close-popup>
                        <q-item-section @click="suggestFeature">Suggest feature</q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-section @click="reportBug">Report a bug</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                        <q-item-section>Check for updates...</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                        <q-item-section>About</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-space />
        <q-btn size="medium" flat dense @click="minimize">
            <q-icon size="sm" name="minimize" />
        </q-btn>
        <q-btn size="medium" flat dense @click="maximize">
            <q-icon size="sm" name="crop_square" />
        </q-btn>
        <q-btn size="medium" flat dense @click="closeApp">
            <q-icon size="sm" name="close" />
        </q-btn>
    </q-bar>
</template>

<script>
import Settings from 'components/Settings';
import { openURL } from 'quasar';

export default {
    components: { Settings },
    data () {
        return {
            issuesUrl: 'https://github.com/Kovee98/hydra-2/issues/new'
        };
    },
    computed: {
        menu () {
            return {
                minWidth: '150px'
            };
        },
        title () {
            return {
                height: '40px'
            };
        }
    },
    methods: {
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
    }
};
</script>
