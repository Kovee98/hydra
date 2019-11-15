<template>
    <div>
        <q-item clickable @click="show = true">
            <q-item-section>About</q-item-section>
        </q-item>
        <q-dialog v-model="show">
            <q-card>
                <q-card-section class="row items-center">
                    <div class="text-h6">Close icon</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show: false
        };
    }
};
</script>
