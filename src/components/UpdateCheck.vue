<template>
    <q-dialog v-model="show">
        <q-card :style="{ minWidth: '350px', maxWidth: '450px' }">
            <q-card-section>
                <div class="text-body1 q-pa-sm">{{ value.msg }}</div>
            </q-card-section>
            <q-card-actions v-if="!value.isUpToDate" align="right">
                <q-btn @click="value.show = false" flat>Cancel</q-btn>
                <q-btn @click="releases" flat>Latest</q-btn>
            </q-card-actions>
            <q-card-actions v-if="value.isUpToDate" align="right">
                <q-btn @click="value.show = false" flat>Okay</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import { openURL } from 'quasar';

export default {
    props: ['value'],
    data () {
        return {
            releasesUrl: 'https://github.com/Kovee98/hydra-2/releases/tag/'
        };
    },
    methods: {
        releases () {
            openURL(this.releasesUrl + this.value.latest);
        }
    },
    computed: {
        show: {
            get () {
                return this.value.show;
            },
            set (value) {
                this.$emit('input', value.show);
            }
        }
    }
};
</script>
