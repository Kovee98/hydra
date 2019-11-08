<template>
    <div>
        <div v-html="style" />
        <pre v-html="colorize(this.$store.getters['response/get'].data)" class="text-body1 q-ma-none text-grey-light"></pre>
    </div>
</template>

<script>
import { colorize } from '../js/util.js';

export default {
    data () {
        return {
            colors: this.$store.getters['settings/get'].colors
        };
    },
    methods: {
        colorize: colorize
    },
    computed: {
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
