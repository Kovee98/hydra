<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { notify } from './js/util.js';

export default {
    name: 'App',
    created () {
        this.$q.dark.set(true);
    },
    mounted () {
        Promise.all([
            this.ensureSettingsExists(),
            this.ensureHistoryExists()
        ]).then(() => {
            this.$store.dispatch('settings/load').then(() => {
                if (this.settings.history.mostRecent) {
                    this.$store.dispatch('request/load').then((lastRequest) => {
                        this.lastRequest = lastRequest;
                    }).catch(() => {
                        notify({ msg: 'Error loading last request', isOk: false });
                    });
                }
            });
        });
    },
    methods: {
        ensureHistoryExists () {
            return new Promise((resolve) => {
                this.$file.history.exists().then(() => {
                    this.$file.request.exists().then(() => resolve()).catch(() => {
                        this.$file.request.save({ req: this.request });
                        return resolve();
                    });
                }).catch(() => {
                    this.$file.request.save({ req: this.request });
                    return resolve();
                });
            });
        },
        ensureSettingsExists () {
            return new Promise((resolve) => {
                this.$file.settings.exists().then(() => resolve()).catch(() => {
                    this.$file.settings.save(this.settings);
                    return resolve();
                });
            });
        }
    },
    computed: {
        ...mapFields([
            'lastRequest',
            'settings',
            'request'
        ])
    }
};
</script>
