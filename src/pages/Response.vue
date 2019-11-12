<template>
    <q-scroll-area dark class="code fill q-pa-md overflow-wrap">
        <div v-html="style" />
        <div v-html="data" class="text-body1 q-ma-none text-grey-6 overflow-wrap" />
    </q-scroll-area>
</template>

<script>
import { colorize } from '../js/util.js';
import { mapMultiRowFields } from 'vuex-map-fields';

export default {
    methods: {
        colorize: colorize
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        style () {
            console.log('response colors:', this.colors);
            let rules = this.colors.reduce((rules, color) => {
                console.log('response color:', color);
                return `${rules} .${color.type.toLowerCase()} { color: ${color.color} } `;
            }, '');
            return `<style> ${rules} </style>`;
        },
        data () {
            return colorize(this.$store.getters['response/get'].data);
        }
    }
};
</script>
