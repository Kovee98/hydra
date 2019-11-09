<template>
    <div class="code q-px-md">
        <q-input @keydown.tab.prevent="tabber($event)" borderless autogrow ref="body" v-model="body" @input="input" placeholder="{...}" dark />
    </div>
</template>

<script>
export default {
    data () {
        return {
            body: this.$store.getters['body/get']
        };
    },
    methods: {
        input () {
            this.$store.dispatch('body/update', this.body);
        },
        tabber (event) {
            let text = this.body,
                originalSelectionStart = event.target.selectionStart,
                textStart = text.slice(0, originalSelectionStart),
                textEnd = text.slice(originalSelectionStart);

            this.body = `${textStart}\u00A0\u00A0\u00A0\u00A0${textEnd}`;
            event.target.value = this.body; // required to make the cursor stay in place.
            event.target.selectionEnd = event.target.selectionStart = originalSelectionStart + 4;
        }
    }
};
</script>
