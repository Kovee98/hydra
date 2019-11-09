<template>
    <q-scroll-area dark class="code fill q-px-md">
        <q-input dark borderless autogrow
                 @keydown.tab.prevent="tabber"
                 @input="input"
                 v-model="body"
                 placeholder="{...}" />
    </q-scroll-area>
</template>

<script>
export default {
    data () {
        return {
            body: this.$store.getters['body/get']
        };
    },
    computed: {
        contentStyle () {
            return {
                backgroundColor: 'rgba(0,0,0,0.02)',
                color: '#555'
            };
        },

        contentActiveStyle () {
            return {
                backgroundColor: '#eee',
                color: 'black'
            };
        },

        thumbStyle () {
            return {
                right: '2px',
                borderRadius: '5px',
                backgroundColor: '#027be3',
                width: '5px',
                opacity: 0.75
            };
        }
    },
    methods: {
        input () {
            this.$store.dispatch('body/update', this.body);
        },
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
