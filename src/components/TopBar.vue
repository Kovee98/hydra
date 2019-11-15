<template>
    <q-header class="bg-dark">
        <title-bar />
        <inputs />
    </q-header>
</template>

<script>
import Inputs from 'components/Inputs';
import TitleBar from 'components/TitleBar';

export default {
    components: { Inputs, TitleBar }
};
</script>
