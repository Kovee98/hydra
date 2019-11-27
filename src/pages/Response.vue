<template>
    <!-- <q-scroll-area class="fill q-pa-md"
                   :thumb-style="thumbStyle">
        <div v-html="style" />
        <div v-html="data" class="code text-grey-6" />
    </q-scroll-area> -->
    <q-scroll-area class="fill q-pa-sm"
                   :thumb-style="thumbStyle">
        <div v-html="style" />
        <codemirror v-model="response.data"
                    :options="opts"
                    ref="response"
                    class="code" />
    </q-scroll-area>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import { colorize } from '../js/util.js';
import { mapMultiRowFields } from 'vuex-map-fields';
import { mapState } from 'vuex';

export default {
    components: { codemirror },
    data () {
        return {
            opts: {
                tabSize: 4,
                mode: 'text/javascript',
                lineNumbers: true,
                smartIndent: false,
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
        ...mapState(['response']),
        // style () {
        //     let rules = this.colors.reduce((rules, color) => {
        //         return `${rules} .${color.type.toLowerCase()} { color: ${color.color} } `;
        //     }, '');
        //     return `<style> ${rules} </style>`;
        // },
        style () {
            let number = this.getColor('Number')[0];
            let string = this.getColor('String')[0];
            let key = this.getColor('Key')[0];
            let nullVal = this.getColor('Null')[0];

            return '<style>' +
                'span.cm-number { color: ' + number.color + ' !important }' +
                'span.cm-string { color: ' + string.color + ' !important }' +
                'span.cm-keyword, span.cm-variable { color: ' + key.color + ' !important }' +
                'span.cm-atom { color: ' + nullVal.color + ' !important }' +
                '</style>';
        },
        // data () {
        //     // return colorize(this.$store.getters['response/get'].data);
        //     return this.$store.getters['response/get'].data;
        // },
        thumbStyle () {
            return {
                width: '12px',
                right: '10px'
            };
        }
    }
};
</script>

<style lang="scss">
    .CodeMirror {
        height: auto;
        color: $grey-6;
        background: transparent;
    }
    div.CodeMirror-selected {
        background: #303030;
    }
    .CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection {
        background: rgba(48, 48, 48, .99);
    }
    .CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection {
        background: rgba(48, 48, 48, .99);
    }
    .CodeMirror-guttermarker, .CodeMirror-guttermarker-subtle {
        color: transparent;
    }
    .CodeMirror-gutters {
        background: transparent;
        border-right: none;
    }
    .CodeMirror-cursor {
        border-left: 1px solid #b0b0b0;
    }
    .CodeMirror-linenumber {
        color: #505050;
    }
    > .CodeMirror-activeline-background {
        background: #202020;
    }
    .CodeMirror-matchingbracket {
        text-decoration: underline;
        color: white;
    }
</style>
