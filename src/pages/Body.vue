<template>
    <q-scroll-area class="fill scroll q-px-sm">
        <q-input borderless autogrow ref="body" v-model="body" placeholder="{...}" class="text-body1" />
    </q-scroll-area>
</template>

<script>
export default {
    data () {
        return {
            body: 'asdfasdf'
        };
    }
};
</script>
