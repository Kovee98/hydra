<template>
    <arguments v-model="headers"
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
            remove: 'request/removeHeader',
            add: 'request/addHeader'
        };
    },
    computed: {
        ...mapMultiRowFields('request', ['headers'])
    }
};
</script>
