<template>
    <div class="row fit bg-grey-10">
        <div class="col-2">
            <q-select dark filled v-model="method" :options="options" label="Method" class="text-h6" />
        </div>
        <div class="col">
            <q-input dark filled v-model="url" label="URL" class="text-h6">
                <template v-slot:append>
                    <q-icon v-if="url" name="fas fa-times" @click="url = ''" class="cursor-pointer q-px-md" />
                </template>
            </q-input>
        </div>
        <div class="col-1">
            <q-btn dark filled @click="send" color="primary" class="no-border-radius no-shadow fit">
                <q-icon v-if="!isLoading" name="fas fa-arrow-right" />
                <q-spinner v-if="isLoading" color="white" />
            </q-btn>
        </div>
    </div>
</template>

<script>
import { isValidUrl, notify } from '../js/util.js';
import { mapFields } from 'vuex-map-fields';

export default {
    data () {
        return {
            isLoading: false,
            method: 'GET',
            options: [
                'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
            ],
            url: 'https://my-json-server.typicode.com/kovee98/json-server/posts'
        };
    },
    computed: {
        ...mapFields('request', [
            'body',
            'params',
            'headers'
        ])
    },
    methods: {
        send () {
            if (!isValidUrl(this.url)) {
                notify({ msg: 'The url is invalid', isOk: false });
                return;
            }

            let params = {};
            this.params.forEach(param => {
                params[param.key] = param.value;
            });

            let headers = {};
            this.headers.forEach(header => {
                headers[header.key] = header.value;
            });

            this.isLoading = true;
            let startTime = performance.now();

            this.$axios({
                method: this.method || '',
                url: this.url || '',
                data: this.body || {},
                params: params || {},
                headers: headers || {}
            }).then(res => {
                let endTime = performance.now();

                let color = 'warning';
                if (res.status >= 200 && res.status <= 226) {
                    color = 'positive';
                } else if (res.status >= 400) {
                    color = 'negative';
                }

                this.$store.dispatch('response/update', {
                    data: res.data,
                    status: {
                        code: res.status,
                        text: res.statusText,
                        color: color
                    },
                    time: (endTime - startTime).toFixed(2)
                });

                notify({ msg: 'Success!' });
            }).catch(err => {
                console.log(err);
                let endTime = performance.now();
                this.$store.dispatch('response/update', {
                    data: err.toString(),
                    status: {
                        code: '',
                        text: ''
                    },
                    time: (endTime - startTime).toFixed(2)
                });

                notify({ msg: err.toString(), isOk: false });
            }).finally(() => {
                this.isLoading = false;
            });
        }
    }
};
</script>
