<template>
    <div class="row items-center justify-around q-gutter-sm">
        <div class="col">
            <q-input filled dense dark @input="updateArg" v-model="key" />
        </div>
        <div class="col-1 text-center">
            <q-icon name="fas fa-equals" class="text-grey-6" />
        </div>
        <div class="col">
            <q-input filled dense dark @input="updateArg" v-model="value" />
        </div>
        <div class="col-1">
            <q-btn dark flat dense @click="removeArg" color="red" tabindex="-1">
                <q-icon size="xs" name="fas fa-minus" />
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
