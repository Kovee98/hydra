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
        this.$store.dispatch('request/load')
            .then((lastRequest) => {
                this.lastRequest = lastRequest;
            });
        this.$store.dispatch('settings/load');
    },
    computed: {
        ...mapFields([
            'lastRequest'
        ])
    }
};
</script>
