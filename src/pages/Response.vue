<template>
    <q-scroll-area class="fill q-pa-md"
                   :thumb-style="thumbStyle">
        <div v-html="style" />
        <div v-html="data" class="code text-grey-6" />
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
            let rules = this.colors.reduce((rules, color) => {
                return `${rules} .${color.type.toLowerCase()} { color: ${color.color} } `;
            }, '');
            return `<style> ${rules} </style>`;
        },
        data () {
            return colorize(this.$store.getters['response/get'].data);
        },
        thumbStyle () {
            return {
                width: '12px',
                right: '10px'
            };
        }
    }
};
</script>
