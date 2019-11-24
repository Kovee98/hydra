<template>
    <q-scroll-area class="code fill q-px-md">
        <codemirror ref="body"
                    :options="opts">
        </codemirror>
        <!-- <q-input borderless autogrow
                 @keydown.tab.prevent="tabber"
                 v-model="body"
                 class="text-body1"
                 placeholder="{...}" /> -->
    </q-scroll-area>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
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
                theme: 'base16-dark',
                lineNumbers: true,
                line: true
            }
        };
    },
    computed: {
        ...mapFields('request', ['body'])
    },
    methods: {
        tabber (e) {
            let text = this.body;
            let originalSelectionStart = e.target.selectionStart;
            let textStart = text.slice(0, originalSelectionStart);
            let textEnd = text.slice(originalSelectionStart);

            this.body = `${textStart}\u00A0\u00A0\u00A0\u00A0${textEnd}`;
            e.target.value = this.body; // required to make the cursor stay in place.
            e.target.selectionEnd = e.target.selectionStart = originalSelectionStart + 4;
        }
    }
};
</script>
