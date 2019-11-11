<template>
    <q-input filled dark v-model="color.color" :rules="['anyColor']" :label="color.type">
        <template v-slot:append>
            <q-icon ref="sample" name="fas fa-square" class="cursor-pointer" :style="style">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-color dark v-model="color.color" />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
export default {
    props: ['color'],
    computed: {
        style () {
            return 'color: ' + this.color.color;
        }
    }
};
</script>
