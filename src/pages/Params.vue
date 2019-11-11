<template>
    <arguments :args="params"
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
            remove: 'request/removeParam',
            update: 'request/updateParam',
            add: 'request/addParam'
        };
    },
    computed: {
        ...mapFields('request', ['params'])
    }
};
</script>
