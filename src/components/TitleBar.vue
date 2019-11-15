<template>
    <q-bar class="q-electron-drag text-grey-5 q-pr-none inner-space" :style="title">
        <q-icon name="img:statics/logo/logo.svg"/>
        <q-btn size="medium" flat dense no-caps>
            File
            <q-menu auto-close>
                <q-list :style="menu">
                    <q-item clickable>
                        <q-item-section>New</q-item-section>
                    </q-item>
                    <q-item clickable>
                        <q-item-section>Open...</q-item-section>
                    </q-item>
                    <q-separator />
                    <settings />
                    <q-separator />
                    <q-item clickable @click="closeApp">
                        <q-item-section>Quit</q-item-section>
                    </q-item>
                </q-list>
            </q-menu>
        </q-btn>
        <q-btn size="medium" flat dense no-caps>
            Help
            <q-menu auto-close>
                <q-list :style="menu">
                    <q-item clickable>
                        <q-item-section @click="suggestFeature">Suggest feature</q-item-section>
                    </q-item>
                    <q-item clickable>
                        <q-item-section @click="reportBug">Report a bug</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable>
                        <q-item-section>Check for updates...</q-item-section>
                    </q-item>
                    <q-separator />
                    <about />
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
import Settings from 'components/Settings';
import About from 'components/About';
import { openURL } from 'quasar';

export default {
    components: { Settings, About },
    data () {
        return {
            issuesUrl: 'https://github.com/Kovee98/hydra-2/issues/new'
        };
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
