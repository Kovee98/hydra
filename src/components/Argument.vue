<template>
    <div class="row items-center justify-around q-py-md">
        <div class="col q-pa-none q-ma-none">
            <q-input @input="update" v-model="key" />
        </div>
        <div class="col-1 q-pa-none q-ma-none text-center">
            <q-icon name="fas fa-equals" class="text-blue-grey-8" />
        </div>
        <div class="col q-pa-none q-ma-none">
            <q-input @input="update" v-model="value" />
        </div>
        <div class="col-1 q-pa-none q-ma-none">
            <q-btn flat dense @click="remove" color="red">
                <q-icon size="xs" name="fas fa-minus" />
            </q-btn>
        </div>
    </div>
</template>

<script>
export default {
    props: ['arg', 'name', 'i'],
    data () {
        return {
            key: this.arg.key,
            value: this.arg.value
        };
    },
    methods: {
        remove () {
            this.$store.dispatch(this.name + '/remove', this.i);
        },
        update () {
            this.$store.dispatch(this.name + '/update', {
                index: this.i,
                arg: {
                    key: this.key,
                    value: this.value
                }
            });
        }
    }
};
</script>
