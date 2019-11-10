<template>
    <q-scroll-area dark class="fill q-pa-md">
        <div class="column q-gutter-lg">
            <argument v-for="(arg, i) in args"
                      :key="arg.id"
                      :arg="arg"
                      :i="i"
                      :name="name" />

            <div class="row">
                <div class="col q-px-md q-py-sm">
                    <q-btn flat size="large" @click="add" color="primary" class="q-pa-sm full-width">
                        <q-icon size="xs" name="fas fa-plus" />
                    </q-btn>
                </div>
            </div>
        </div>
    </q-scroll-area>
</template>

<script>
import Argument from 'components/Argument';

export default {
    props: ['args', 'name'],
    components: { Argument },
    methods: {
        add () {
            this.$store.dispatch(this.name + '/add', { key: '', value: '' });
        }
    }
};
</script>
