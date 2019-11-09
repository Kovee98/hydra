<template>
    <div class="column q-gutter-lg q-pa-md">
        <argument v-for="(arg, i) in args"
                  :key="arg.id"
                  :arg="arg"
                  :i="i"
                  :name="name" />

        <div class="row">
            <div class="col q-py-md">
                <q-btn flat dense @click="add" color="primary" class="q-pa-sm full-width">
                    <q-icon size="xs" name="fas fa-plus" />
                </q-btn>
            </div>
            <div class="col-1" />
        </div>
    </div>
</template>

<script>
import Argument from 'components/Argument';

export default {
    props: ['args', 'name'],
    components: { Argument },
    methods: {
        add () {
            this.$store.dispatch(this.name + '/add', {});
        }
    }
};
</script>
