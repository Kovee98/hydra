<template>
    <div>
        <q-chip v-if="status.code" square :color="status.color" text-color="white" icon="code">
            {{status.code}}
        </q-chip>
        <q-chip square color="secondary" text-color="white" icon="access_time">
            {{status.time}} {{status.units}}
        </q-chip>
    </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    computed: {
        ...mapFields('response', ['status'])
    }
};
</script>
