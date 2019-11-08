<template>
    <q-input filled dark v-model="currentColor" :rules="['anyColor']" :label="label">
        <template v-slot:append>
            <q-icon ref="sample" name="fas fa-square" class="cursor-pointer" :style="style">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color dark v-model="currentColor" @input="input" />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
export default {
    props: ['color', 'label'],
    data () {
        return {
            currentColor: this.color,
            style: {
                color: this.color
            }
        };
    },
    methods: {
        input () {
            this.style = {
                color: this.currentColor
            };
        }
    }
};
</script>
