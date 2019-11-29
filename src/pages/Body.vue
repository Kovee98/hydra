<template>
    <div id="outside" class="cursor-text" @click="focusEditor">
        <div v-html="style" />
        <q-scroll-area class="fill q-py-sm">
            <codemirror v-model="body"
                        :options="opts"
                        ref="editor" />
        </q-scroll-area>
    </div>
</template>

<script>
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import { codemirror } from 'vue-codemirror';
import config from '../js/config.js';

export default {
    components: { codemirror },
    data () {
        return {
            opts: {
                ...config.codemirror,
                styleActiveLine: true
            }
        };
    },
    computed: {
        ...mapMultiRowFields('settings', ['colors']),
        ...mapFields('request', ['body']),
        ...mapFields(['isUnsaved']),
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
    },
    watch: {
        body () {
            this.isUnsaved = true;
        }
    }
};
</script>
