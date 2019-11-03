<template>
    <div>
        <q-btn flat :color="color" :label="btn" @click="confirm = true" />
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row q-pa-lg">
                    <span class="text-body1">Are you sure you want to {{msg}}</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat color="primary" :label="btn" @click="action" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    props: ['btn', 'msg', 'action', 'color'],
    data () {
        return {
            confirm: false
        };
    }
};
</script>
