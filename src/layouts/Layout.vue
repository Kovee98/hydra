<template>
    <q-layout view="hHh lpR fFf">
        <q-header bordered class="bg-dark">
            <q-bar class="q-electron-drag text-grey-5 q-pa-sm">
                <q-icon name="img:statics/logo/logo.png" />
                <div class="cursor-pointer">File</div>
                <div class="cursor-pointer">Help</div>
                <q-space />
                <q-btn dense flat icon="minimize" @click="minimize" />
                <q-btn dense flat icon="crop_square" @click="maximize" />
                <q-btn dense flat icon="close" @click="closeApp" />
            </q-bar>
            <q-toolbar class="q-pa-none justify-center">
                <inputs />
            </q-toolbar>
            <div class="row items-center">
                <q-tabs no-caps align="left">
                    <q-route-tab to="/" label="Body" />
                    <q-route-tab to="/params" label="Parameters" />
                    <q-route-tab to="/headers" label="Headers" />
                </q-tabs>
                <div class="col">
                    <div class="row q-pr-sm">
                        <div class="col text-right">
                            <q-chip square outline>
                                {{time}} ms
                            </q-chip>
                            <q-chip v-if="status.code" square :color="status.color" class="text-white">
                                {{status.code}}
                            </q-chip>
                        </div>
                    </div>
                </div>
            </div>
        </q-header>

        <q-page-container>
            <q-splitter v-model="splitter" class="fill">
                <template v-slot:before>
                    <router-view />
                </template>
                <template v-slot:after>
                    <response />
                </template>
            </q-splitter>
        </q-page-container>

        <q-bar bordered class="fixed-bottom opaque justify-between q-pa-sm">
            <settings />
            <q-btn dense flat>
                <q-icon name="far fa-question-circle" size="xs" />
                <q-menu>
                    <q-list style="min-width: 100px">
                        <q-item clickable @click="suggestFeature">
                            <q-item-section>Suggest a feature</q-item-section>
                        </q-item>
                        <q-item clickable @click="reportBug">
                            <q-item-section>Report a bug</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-btn>
        </q-bar>
    </q-layout>
</template>

<script>
import Response from 'pages/Response';
import Settings from 'components/Settings';
import Inputs from 'components/Inputs';
import { openURL } from 'quasar';
import { mapFields } from 'vuex-map-fields';

export default {
    components: { Response, Settings, Inputs },
    data () {
        return {
            splitter: 50,
            issuesUrl: 'https://github.com/Kovee98/hydra-2/issues/new'
        };
    },
    computed: {
        ...mapFields('response', [
            'status',
            'time'
        ])
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
