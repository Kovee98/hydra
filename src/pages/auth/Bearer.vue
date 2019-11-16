<template>
    <div class="column q-pa-xl q-gutter-lg">
        <div class="text-h4">
            Bearer
            <q-checkbox v-model="active">
                <q-tooltip anchor="center right"
                           self="center left"
                           :offset="[0, 0]"
                           transition-show="scale"
                           transition-hide="scale"
                           content-class="tooltip">
                    {{ active ? 'enabled' : 'disabled' }}
                </q-tooltip>
            </q-checkbox>
        </div>
        <q-input filled v-model="prefix" label="Prefix" class="col" />
        <q-input filled v-model="token" label="Token" class="col" />
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    computed: {
        ...mapFields('request', [
            'auth.bearer.prefix',
            'auth.bearer.token',
            'auth.bearer.active'
        ])
    }
};
</script>
