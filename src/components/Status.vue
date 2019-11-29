<template>
    <div>
        <q-chip square dense color="grey-10">
            <q-icon name="code" size="xs" />
            <div v-if="status.code" class="q-ml-sm">{{status.code}}</div>
        </q-chip>
        <q-chip square dense color="grey-10" text-color="white">
            <q-icon name="timer" size="xs" />
            <div v-if="status.time" class="q-ml-sm">{{status.time}} {{status.units}}</div>
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
