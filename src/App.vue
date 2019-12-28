<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    name: 'App',
    created () {
        this.$q.dark.set(true);
    },
    mounted () {
        this.ensureSettingsExists().then(() => {
            this.$store.dispatch('settings/load').then(() => {
                if (this.settings.history.mostRecent) {
                    this.$store.dispatch('request/load').then((lastRequest) => {
                        this.lastRequest = lastRequest;
                        this.isUnsaved = false;
                    }).catch(() => {
                        this.lastRequest = '';
                        this.isUnsaved = true;
                    });
                } else {
                    this.isUnsaved = true;
                }
            });
        });
    },
    methods: {
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
            'isUnsaved',
            'settings',
            'request'
        ])
    }
};
</script>
