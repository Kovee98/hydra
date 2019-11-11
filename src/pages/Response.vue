<template>
    <q-scroll-area dark class="code fill q-pa-md overflow-wrap">
        <div v-html="style" />
        <div v-html="data" class="text-body1 q-ma-none text-grey-6 overflow-wrap" />
    </q-scroll-area>
</template>

<script>
import { colorize } from '../js/util.js';
import { mapFields } from 'vuex-map-fields';

export default {
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
        },
        data () {
            return colorize(this.$store.getters['response/get'].data);
        },
        ...mapFields('settings', ['colors'])
    }
};
</script>
