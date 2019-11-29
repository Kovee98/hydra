<template>
    <q-scroll-area class="fill q-pa-sm"
                   :thumb-style="thumbStyle">
        <div v-html="style" />
        <codemirror v-model="res"
                    :options="opts"
                    ref="response"
                    class="code" />
    </q-scroll-area>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import { colorize } from '../js/util.js';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    components: { codemirror },
    data () {
        return {
            opts: {
                tabSize: 2,
                mode: {
                    name: 'javascript',
                    json: true
                },
                lineNumbers: true,
                smartIndent: true,
                lineWrapping: true,
                lineWiseCopyCut: false,
                cursorHeight: 0.85,
                scrollbarStyle: 'null',
                showCursorWhenSelecting: true,
                readOnly: true
            }
        };
    },
    methods: {
        colorize: colorize,
        getColor (type) {
            return this.colors.filter((color) => {
                return color.type === type;
            });
        }
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        ...mapFields('response', ['data']),
        res () {
            return JSON.stringify(this.data, null, '\t');
        },
        style () {
            let number = this.getColor('Number')[0];
            let string = this.getColor('String')[0];
            let key = this.getColor('Key')[0];
            let nullVal = this.getColor('Null')[0];

            return '<style>' +
                'span.cm-number { color: ' + number.color + ' !important }' +
                'span.cm-string { color: ' + string.color + ' !important }' +
                'span.cm-keyword, span.cm-variable, span.cm-property { color: ' + key.color + ' !important }' +
                'span.cm-atom { color: ' + nullVal.color + ' !important }' +
                '</style>';
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
