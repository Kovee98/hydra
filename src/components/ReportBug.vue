<template>
    <div>
        <q-item clickable @click="bugForm = true">
            <q-item-section>Report a bug</q-item-section>
        </q-item>
        <q-dialog v-model="bugForm">
            <q-card style="width: 500px">
                <q-card-section>
                    <div class="text-h5">Report a bug</div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh" class="scroll">
                    <q-input v-model="title" label="Title" class="text-h6" />
                    <q-input autogrow v-model="desc" label="Description" class="text-body1" />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right">
                    <q-btn flat label="Reset" />
                    <q-btn flat @click="send" label="Send" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            bugForm: false,
            title: '',
            desc: ''
        };
    },
    methods: {
        send () {
            console.log('sending bug report...');
        }
    }
};
</script>
