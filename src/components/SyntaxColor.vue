<template>
    <q-input outlined v-model="currentColor" :rules="['anyColor']" :label="label">
        <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color v-model="currentColor" />
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
            currentColor: this.color
        };
    }
};
</script>
