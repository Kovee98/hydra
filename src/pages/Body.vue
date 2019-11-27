<template>
    <div id="outside" class="cursor-text" @click="focusEditor">
        <div v-html="style" />
        <q-scroll-area id="body" class="fill q-pa-sm">
            <codemirror v-model="body"
                        :options="opts"
                        ref="editor"
                        class="code" />
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
            opts: {
                tabSize: 4,
                mode: {
                    name: 'javascript',
                    json: true
                },
                lineNumbers: true,
                smartIndent: false,
                lineWrapping: true,
                lineWiseCopyCut: false,
                cursorHeight: 0.85,
                scrollbarStyle: 'null',
                showCursorWhenSelecting: true
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
                'span.cm-keyword, span.cm-variable, span.cm-property { color: ' + key.color + ' !important }' +
                'span.cm-atom { color: ' + nullVal.color + ' !important }' +
                '</style>';
        },
        editor () {
            return this.$refs.editor.codemirror;
        }
    },
    methods: {
        focusEditor (e) {
            if (e.target.classList.contains('scroll')) {
                this.editor.focus();
                this.editor.execCommand('goDocEnd');
            }
        },
        getColor (type) {
            return this.colors.filter((color) => {
                return color.type === type;
            });
        }
    }
};
</script>
