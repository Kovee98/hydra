<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    created () {
        this.$q.dark.set(true);
    },
    mounted () {
        this.$store.dispatch('request/load');
    }
};
</script>
