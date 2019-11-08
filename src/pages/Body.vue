<template>
    <div>
        <q-input borderless autogrow ref="body" v-model="body" @input="input" placeholder="{...}" dark />
    </div>
</template>

<script>
export default {
    data () {
        return {
            body: this.$store.getters['body/get']
        };
    },
    methods: {
        input () {
            this.$store.dispatch('body/update', this.body);
        }
    }
};
</script>
