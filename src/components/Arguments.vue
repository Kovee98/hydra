<template>
    <div class="q-pa-md">
        <argument v-for="(arg, i) in args"
                  :key="arg.id"
                  :arg="arg"
                  :i="i"
                  :name="name" />

        <div class="row q-py-md q-pr-md">
            <div class="col">
                <q-btn push @click="add" dense color="primary" class="q-pa-sm full-width">
                    <q-icon size="xs" name="fas fa-plus" />
                </q-btn>
            </div>
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
            this.$store.dispatch(this.name + '/add', { key: '', value: '' });
        }
    }
};
</script>
