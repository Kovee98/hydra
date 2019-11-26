<template>
    <div class="cursor-text" @click="focusEditor">
        <div v-html="style" />
        <q-scroll-area id="body" class="fill q-pa-sm">
            <codemirror ref="editor" :options="opts" :value="exBody" class="code" />
        </q-scroll-area>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';

export default {
    components: { codemirror },
    data () {
        return {
            exBody: '{\n\titem: \'thing\'\n\tnumber: 5\n\tvalue: null\n\tboolean: true\n}',
            opts: {
                tabSize: 4,
                mode: 'text/javascript',
                lineNumbers: true,
                smartIndent: false,
                lineWrapping: true,
                lineWiseCopyCut: false,
                readOnly: true
            }
        };
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        ...mapFields('request', ['body']),
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
        editor () {
            return this.$refs.editor.codemirror;
        }
    },
    methods: {
        focusEditor () {
            this.editor.focus();
        },
        getColor (type) {
            return this.colors.filter((color) => {
                return color.type === type;
            });
        }
    }
};
</script>

<style lang="scss">
    #body .CodeMirror {
        height: auto;
        color: $grey-6;
        background: transparent;
    }
    #body div.CodeMirror-selected {
        background: #303030;
    }
    #body .CodeMirror-line::selection, #body .CodeMirror-line > span::selection, #body .CodeMirror-line > span > span::selection {
        background: rgba(48, 48, 48, .99);
    }
    #body .CodeMirror-line::-moz-selection, #body .CodeMirror-line > span::-moz-selection, #body .CodeMirror-line > span > span::-moz-selection {
        background: rgba(48, 48, 48, .99);
    }
    #body .CodeMirror-guttermarker, .CodeMirror-guttermarker-subtle {
        color: transparent;
    }
    #body .CodeMirror-gutters {
        background: transparent;
        border-right: none;
    }
    #body .CodeMirror-cursor {
        border-left: 1px solid #b0b0b0;
    }
    #body .CodeMirror-linenumber {
        color: #505050;
    }
    #body > .CodeMirror-activeline-background {
        background: #202020;
    }
    #body .CodeMirror-matchingbracket {
        text-decoration: underline;
        color: white;
    }
</style>
