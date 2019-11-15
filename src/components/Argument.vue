<template>
    <div class="row items-center justify-around q-gutter-xs">
        <div class="col-1 text-center">
            <q-checkbox v-model="value.active" />
        </div>
        <div class="col">
            <q-input filled dense v-model="value.key" placeholder="key" />
        </div>
        <div class="col-1 text-center">
            <div class="text-h5">=</div>
        </div>
        <div class="col">
            <q-input filled dense v-model="value.value" placeholder="value" />
        </div>
        <div class="col-1 text-center">
            <q-btn flat dense @click="removeArg" tabindex="-1">
                <q-icon name="delete" />
            </q-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'remove'],
    data () {
        return {
        };
    },
    methods: {
        removeArg () {
            this.$store.dispatch(this.remove, this.i);
        }
    }
};
</script>
