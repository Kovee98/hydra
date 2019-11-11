<template>
    <div class="row items-center justify-around q-gutter-sm">
        <div class="col">
            <q-input filled dense dark @input="update" v-model="key" />
        </div>
        <div class="col-1 text-center">
            <q-icon name="fas fa-equals" class="text-grey-6" />
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
    props: ['arg', 'updateName', 'removeName', 'i'],
    data () {
        return {
            key: this.arg.key,
            value: this.arg.value
        };
    },
    methods: {
        remove () {
            this.$store.dispatch(this.removeName, this.i);
        },
        update () {
            this.$store.dispatch(this.updateName, {
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
