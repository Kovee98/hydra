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
    }
};
</script>

<style lang="scss">
    .fill {
        height: calc(100vh - 141px);
    }
    .code {
        font-family: 'Courier New';
        white-space: pre;
    }
    .overflow-wrap {
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
    }
</style>
