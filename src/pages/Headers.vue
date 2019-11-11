<template>
    <q-scroll-area dark class="fill q-pa-md">
        <div class="column q-gutter-lg">
            <argument v-for="(header, i) in headers"
                      :key="header.id"
                      :arg="header"
                      :i="i"
                      :removeName="removeName"
                      :updateName="updateName" />

            <div class="row">
                <div class="col q-px-md q-py-sm">
                    <q-btn flat size="large" @click="add" color="primary" class="q-pa-sm full-width">
                        <q-icon size="xs" name="fas fa-plus" />
                    </q-btn>
                </div>
            </div>
        </div>
    </q-scroll-area>
</template>

<script>
import Argument from 'components/Argument';
import { mapFields } from 'vuex-map-fields';

export default {
    components: { Argument },
    data () {
        return {
            removeName: 'request/removeHeader',
            updateName: 'request/updateHeader'
        };
    },
    computed: {
        ...mapFields('request', ['headers'])
    },
    methods: {
        add () {
            this.$store.dispatch('request/addHeader', { key: '', value: '' });
        }
    }
};
</script>
