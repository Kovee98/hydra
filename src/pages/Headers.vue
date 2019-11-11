<template>
    <arguments :args="headers"
               :remove="remove"
               :update="update"
               :add="add" />
</template>

<script>
import Arguments from 'components/Arguments';
import { mapFields } from 'vuex-map-fields';

export default {
    components: { Arguments },
    data () {
        return {
            remove: 'request/removeHeader',
            update: 'request/updateHeader',
            add: 'request/addHeader'
        };
    },
    computed: {
        ...mapFields('request', ['headers'])
    }
};
</script>
