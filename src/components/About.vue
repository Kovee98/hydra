<template>
    <q-dialog v-model="show">
        <q-card :style="{ minWidth: '350px' }">
            <q-card-section class="row items-center q-gutter-md">
                <q-avatar size="sm">
                    <img src="statics/logo/logo.png">
                </q-avatar>
                <div class="text-h6">Hydra</div>
                <q-space />
                <q-btn icon="close" flat round dense @click="show = false" />
            </q-card-section>

            <q-card-section v-for="info in infos" :key="info.id">
                <div>{{info.label}}: {{info.desc}}</div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script>
import info from '../js/info.js';

export default {
    props: ['value'],
    data () {
        return {
            infos: [
                { label: 'Version', desc: info.versions.app },
                { label: 'Vue', desc: info.versions.vue },
                { label: 'Electron', desc: info.versions.electron },
                { label: 'Chrome', desc: info.versions.chrome },
                { label: 'Node.js', desc: info.versions.node },
                { label: 'Author', desc: info.author }
            ]
        };
    },
    computed: {
        show: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            }
        }
    }
};
</script>
