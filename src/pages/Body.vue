<template>
    <div class="code q-px-md">
        <q-input borderless autogrow ref="body" v-model="body" @input="input" placeholder="{...}" dark />
    </div>
</template>

<script>
export default {
    data () {
        return {
            body: this.$store.getters['body/get'],
            code: 'something'
        };
    },
    methods: {
        input () {
            this.$store.dispatch('body/update', this.body);
        }
    }
};
</script>

<style lang="scss">
    .code {
        font-family: 'Consolas';
    }
</style>
