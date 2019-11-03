<template>
    <q-input borderless autogrow ref="body" v-model="body" placeholder="{...}" class="text-body1 fill scroll" />
    <!-- <q-virtual-scroll separator>
    </q-virtual-scroll> -->
</template>

<script>
export default {
    data () {
        return {
            body: ''
        };
    }
};
</script>
