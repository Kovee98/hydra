<template>
    <div id="q-app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
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
</style>
