<template>
    <div class="row items-center justify-around q-gutter-xs q-pl-md">
        <div class="col">
            <q-input filled dense dark @input="update" v-model="key" />
        </div>
        <div class="col-1 text-center">
            <q-icon name="fas fa-equals" class="text-grey-5" />
        </div>
        <div class="col">
            <q-input filled dense dark @input="update" v-model="value" />
        </div>
        <div class="col-1">
            <q-btn dark flat dense @click="remove" color="red" tabindex="-1">
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
                    key: this.key ? this.key.trim() : '',
                    value: this.value ? this.value.trim() : ''
                }
            });
        }
    }
};
</script>
