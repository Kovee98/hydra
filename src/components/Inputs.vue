<template>
    <div class="row fit">
        <div class="col-2 q-px-sm">
            <q-select borderless v-model="method" :options="options" label="Method" class="text-h6" />
        </div>
        <div class="col q-px-sm border-left">
            <q-input borderless v-model="url" label="URL" class="text-h6">
                <template v-slot:append>
                    <q-icon v-if="url" name="fas fa-times" @click="url = ''" class="cursor-pointer q-px-md" />
                </template>
            </q-input>
        </div>
        <div class="col-1 q-ma-none">
            <q-btn @click="send" color="primary" class="no-border-radius no-shadow fit">
                <q-icon v-if="!isLoading" name="fas fa-arrow-right" />
                <q-spinner v-if="isLoading" color="white" />
            </q-btn>
        </div>
    </div>
</template>

<script>
import { isValidUrl, notify } from '../js/util.js';

export default {
    data () {
        return {
            isLoading: false,
            method: 'GET',
            options: [
                'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
            ],
            url: 'https://my-json-server.typicode.com/typicode/demo/posts'
        };
    },
    methods: {
        send () {
            if (!isValidUrl(this.url)) {
                notify({ msg: 'The url is invalid', isOk: false });
                return;
            }

            let body = this.$store.getters['body/get'];

            let params = {};
            this.$store.getters['params/get'].forEach(param => {
                params[param.key] = param.value;
            });

            let headers = {};
            this.$store.getters['headers/get'].forEach(header => {
                headers[header.key] = header.value;
            });

            if (this.method && this.url) {
                this.isLoading = true;
                let startTime = performance.now();

                this.$axios({
                    method: this.method,
                    url: this.url,
                    data: body,
                    params: params,
                    headers: headers
                }).then(res => {
                    let endTime = performance.now();
                    this.$store.dispatch('response/update', {
                        data: res.data,
                        status: res.status,
                        time: (endTime - startTime).toFixed(2)
                    });
                    this.isLoading = false;

                    notify({ msg: 'Success!', isOk: true });
                });
            } else {
                this.isLoading = false;
            }
        }
    }
};
</script>
