<template>
    <q-scroll-area class="fill q-pa-md">
        <div class="column q-gutter-lg">
            <argument v-for="(arg, i) in args"
                      :key="arg.id"
                      :arg="arg"
                      :i="i"
                      :remove="remove"
                      :update="update" />

            <div class="row">
                <div class="col q-px-md q-py-sm">
                    <q-btn flat size="large" @click="addArg" color="primary" class="q-pa-sm full-width">
                        <q-icon size="md" name="add" />
                    </q-btn>
                </div>
            </div>
        </div>
    </q-scroll-area>
</template>

<script>
import Argument from 'components/Argument';

export default {
    props: ['args', 'update', 'remove', 'add'],
    components: { Argument },
    methods: {
        addArg () {
            this.$store.dispatch(this.add, { key: '', value: '' });
        }
    }
};
</script>
