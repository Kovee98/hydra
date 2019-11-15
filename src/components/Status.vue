<template>
    <div>
        <q-chip square color="secondary" text-color="white" icon="timer">
            <div v-if="status.time">{{status.time}} {{status.units}}</div>
        </q-chip>
        <q-chip square :color="status.color || 'secondary'" icon="code">
            <div v-if="status.code">{{status.code}}</div>
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
