<template>
    <div>
        <q-scroll-area class="fill q-pa-md">
            <div class="column q-gutter-lg">
                <div class="row items-center justify-around q-col-gutter-md">
                    <div class="col-1" />
                    <div class="col">
                        <div class="text-body1">Key</div>
                    </div>
                    <div class="col-1" />
                    <div class="col">
                        <div class="text-body1">Value</div>
                    </div>
                    <div class="col-1" />
                </div>
                <argument v-for="(arg, i) in value"
                          :key="i"
                          :arg="arg"
                          :remove="remove"
                          v-model="value[i]" />

                <div class="row">
                    <div class="col-1" />
                    <div class="col">
                        <q-btn flat size="large" @click="addArg" color="primary" class="q-pa-sm full-width">
                            <q-icon size="md" name="add" />
                        </q-btn>
                    </div>
                    <div class="col-1" />
                </div>
            </div>
        </q-scroll-area>
    </div>
</template>

<script>
import Argument from 'components/Argument';

export default {
    props: ['value', 'remove', 'add'],
    components: { Argument },
    methods: {
        addArg () {
            this.$store.dispatch(this.add, { key: '', value: '', active: true });
        }
    }
};
</script>
