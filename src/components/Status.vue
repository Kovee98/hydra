<template>
    <div>
        <q-chip dense square :color="status.color || 'secondary'" text-color="white" icon="code">
            <div v-if="status.code">{{status.code}}</div>
        </q-chip>
        <q-chip dense square color="secondary" text-color="white" icon="access_time">
            <div v-if="status.time">{{status.time}} {{status.units}}</div>
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
