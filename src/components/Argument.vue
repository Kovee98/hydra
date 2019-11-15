<template>
    <div class="row items-center justify-around q-gutter-sm">
        <div class="col">
            <q-input filled dense @input="updateArg" v-model="key" :placeholder="'key ' + (parseFloat(i) + 1)" />
        </div>
        <div class="col-1 text-center">
            <q-icon name="drag_handle" size="sm" />
        </div>
        <div class="col">
            <q-input filled dense @input="updateArg" v-model="value" :placeholder="'value ' + (parseFloat(i) + 1)" />
        </div>
        <div class="col-1">
            <q-btn flat dense @click="removeArg" tabindex="-1">
                <q-icon name="delete" />
            </q-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ['arg', 'update', 'remove', 'i'],
    data () {
        return {
            key: this.arg.key,
            value: this.arg.value
        };
    },
    methods: {
        removeArg () {
            this.$store.dispatch(this.remove, this.i);
        },
        updateArg () {
            this.$store.dispatch(this.update, {
                index: this.i,
                arg: {
                    key: this.key ? this.key.trim() : '',
                    value: this.value ? this.value.trim() : ''
                }
            });
        }
    }
};
</script>
