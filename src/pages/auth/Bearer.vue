<template>
    <div class="column q-pa-xl q-gutter-lg">
        <div class="text-h4">
            Bearer
            <q-checkbox @input="update" v-model="active">
                <hint :label="active ? 'enabled' : 'disabled'" />
            </q-checkbox>
        </div>
        <q-input filled @input="update" v-model="prefix" label="Prefix" class="col" />
        <q-input filled @input="update" v-model="token" label="Token" class="col" />
    </div>
</template>

<script>
import Hint from 'components/Hint';
import { mapFields } from 'vuex-map-fields';

export default {
    components: { Hint },
    computed: {
        ...mapFields('request', [
            'auth.bearer.prefix',
            'auth.bearer.token',
            'auth.bearer.active'
        ]),
        ...mapFields(['isUnsaved'])
    },
    methods: {
        update () {
            this.isUnsaved = true;
        }
    }
};
</script>
