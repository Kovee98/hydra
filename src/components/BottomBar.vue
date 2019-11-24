<template>
    <q-footer class="bg-grey-10">
        <q-toolbar class="q-px-none">
            <q-space />
            <status />
        </q-toolbar>
    </q-footer>
</template>

<script>
import Status from 'components/Status';

export default {
    components: { Status }
};
</script>

<style lang="scss">
    .q-toolbar {
        min-height: 30px;
    }
</style>
