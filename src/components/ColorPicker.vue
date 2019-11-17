<template>
    <q-input filled v-model="value.color" :rules="['anyColor']" :label="value.type">
        <template v-slot:append>
            <q-icon ref="sample" name="colorize" class="cursor-pointer" :style="style">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="value.color" />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
export default {
    props: ['value'],
    watch: {
        value () {
            this.$emit('input', this.value);
        }
    },
    computed: {
        style () {
            return 'color: ' + this.value.color;
        }
    }
};
</script>
