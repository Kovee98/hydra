<template>
    <div>
        <q-scroll-area v-if="data" class="fill q-py-sm" :thumb-style="thumbStyle">
            <div v-html="style" />
            <codemirror v-model="res" :options="opts" />
        </q-scroll-area>
        <div v-if="!data" class="fill row items-center non-selectable">
            <div class="full-width text-center">
                <q-img :src="logo" :style="logoStyle" />
                <div class="text-grey-10 text-h4 q-pt-md">Send a request</div>
            </div>
        </div>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import config from '../js/config.js';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    components: { codemirror },
    data () {
        return {
            logo: 'statics/logo/logo.svg',
            opts: {
                ...config.codemirror,
                readOnly: true,
                matchBrackets: false,
                cursorBlinkRate: -1
            }
        };
    },
    methods: {
        getColor (type) {
            return this.colors.filter((color) => {
                return color.type === type;
            });
        }
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        ...mapFields('response', ['data']),
        res: {
            get () {
                return JSON.stringify(this.data, null, '\t');
            },
            set () {}
        },
        style () {
            let key = this.getColor('Key')[0];
            let string = this.getColor('String')[0];
            let number = this.getColor('Number')[0];
            let atom = this.getColor('Null/Boolean')[0];
            return '<style>' +
                'span.cm-string { color: ' + string.color + ' !important }' +
                'span.cm-number { color: ' + number.color + ' !important }' +
                'span.cm-atom { color: ' + atom.color + ' !important }' +
                'span.cm-keyword, span.cm-variable, span.cm-property { color: ' + key.color + ' !important }' +
                '</style>';
        },
        logoStyle () {
            return {
                width: '150px',
                filter: 'contrast(30%) sepia(100%) hue-rotate(195deg) saturate(0%) brightness(20%)',
                opacity: '1'
            };
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
