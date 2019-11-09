<template>
    <div>
        <div v-html="style" />
        <pre v-html="colorize(data)" class="text-body1 q-ma-none text-grey-light"></pre>
    </div>
</template>

<script>
import { colorize } from '../js/util.js';

export default {
    data () {
        return {
            // colors: this.$store.getters['settings/get'].colors
        };
    },
    methods: {
        colorize: colorize
    },
    computed: {
        colors () {
            return this.$store.getters['settings/get'].colors;
        },
        data () {
            return this.$store.getters['response/get'].data;
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

<style lang="scss">
</style>
