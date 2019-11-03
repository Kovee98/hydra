<template>
    <div class="row fit">
        <div class="col-2 q-px-sm">
            <q-select borderless v-model="method" :options="options" label="Method" class="text-h6" />
        </div>
        <div class="col q-px-sm border-left">
            <q-input borderless v-model="url" label="URL" class="text-h6" />
        </div>
        <div class="col-2 q-ma-none">
            <q-btn color="primary" icon="fas fa-arrow-right" class="no-border-radius no-shadow fit" />
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            method: 'GET',
            options: [
                'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
            ],
            url: 'https://my-json-server.typicode.com/typicode/demo/posts'
        };
    }
};
</script>
