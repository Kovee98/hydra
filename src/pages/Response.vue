<template>
    <q-scroll-area dark class="code fill q-pa-md">
        <div v-html="style" />
        <div v-html="data" class="text-body1 q-ma-none text-grey-6" />
    </q-scroll-area>
</template>

<script>
import { colorize } from '../js/util.js';

export default {
    methods: {
        colorize: colorize
    },
    computed: {
        colors () {
            return this.$store.getters['settings/get'].colors;
        },
        data () {
            return colorize(this.$store.getters['response/get'].data);
        },
        style () {
            let style = '<style>';
            this.colors.forEach(color => {
                style += '.' + color.type.toLowerCase() + '{';
                style += 'color: ' + color.color + ' }';
            });
            style += '</style>';
            return style;
        }
    }
};
</script>
