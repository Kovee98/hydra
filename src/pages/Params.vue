<template>
    <arguments v-model="params"
               :remove="remove"
               :add="add" />
</template>

<script>
import Arguments from 'components/Arguments';
import { mapMultiRowFields } from 'vuex-map-fields';

export default {
    components: { Arguments },
    data () {
        return {
            remove: 'request/removeParam',
            add: 'request/addParam'
        };
    },
    computed: {
        ...mapMultiRowFields('request', ['params'])
    }
};
</script>
