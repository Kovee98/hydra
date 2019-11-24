<template>
    <div class="cursor-text" @click="focusEditor">
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
                smartIndent: false,
                cursorHeight: 0.85
            }
        };
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        ...mapFields('request', ['body']),
        style () {
            let style = `
                span.cm-number { color: ${this.colors} }
            `;
            return style;
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
        height: auto;
        color: #e0e0e0;
        background: transparent;
    }
    .CodeMirror-guttermarker, .CodeMirror-guttermarker-subtle {
        color: transparent;
    }
    .CodeMirror-gutters {
        background: transparent;
    }
    .CodeMirror-cursor {
        border-left: 1px solid #b0b0b0;
    }
    .CodeMirror-linenumber {
        color: #505050;
    }
</style>
