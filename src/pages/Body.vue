<template>
    <div>
        <q-input borderless autogrow ref="body" v-model="body" placeholder="{...}" class="q-px-sm text-body1" />
    </div>
</template>

<script>
export default {
    data () {
        return {
            body: ''
        };
    }
};
</script>

<style lang="scss">
    .body {
        height: 100%;
        max-height: 100%;
    }
</style>
