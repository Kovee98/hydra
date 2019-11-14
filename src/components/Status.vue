<template>
    <div>
        <q-chip v-if="status.code" square outline>
            {{status.code}}
        </q-chip>
        <q-chip square outline>
            {{time}} ms
        </q-chip>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    computed: {
        ...mapFields('response', [
            'status',
            'time'
        ])
    }
};
</script>
