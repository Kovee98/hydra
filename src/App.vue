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
        this.$store.dispatch('settings/load').then(() => {
            if (this.settings.history.mostRecent) {
                this.$store.dispatch('request/load')
                    .then((lastRequest) => {
                        this.lastRequest = lastRequest;
                    });
            }
        });
    },
    computed: {
        ...mapFields([
            'lastRequest',
            'settings'
        ])
    }
};
</script>
