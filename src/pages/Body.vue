<template>
    <div class="cursor-text" @click="focusEditor">
        <div v-html="style" />
        <q-scroll-area class="fill cursor-text">
            <codemirror ref="editor" :options="opts" />
        </q-scroll-area>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';

export default {
    components: { codemirror },
    data () {
        return {
            opts: {
                tabSize: 4,
                mode: 'text/javascript',
                // theme: 'base16-dark',
                lineNumbers: true,
                smartIndent: false
            }
        };
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        ...mapFields('request', ['body']),
        style () {
            return '<style> span.cm-number { color: ' + this.getColor('Number') + '}' +
                'span.cm-string { color: ' + this.getColor('String') + '}' +
                'span.cm-keyword { color:' + this.getColor('Key') + '} </style>';
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
            return this.colors.filter((color) => color.type === type);
        }
    }
};
</script>

<style lang="scss">
    .CodeMirror {
        // font-size: 1.15em;
        height: auto;
        color: $grey-6;
        background: transparent;
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
</style>
