<template>
    <q-toolbar class="q-pa-none">
        <div class="row full-width">
            <div class="select">
                <q-select transition-show="flip-left" transition-hide="flip-right" filled v-model="method" :options="options" label="Method" class="text-h6" />
            </div>
            <div class="col">
                <q-input filled v-model="url" label="URL" class="text-h6">
                    <template v-slot:append>
                        <q-btn v-if="url" dense flat @click="url = ''">
                            <q-icon name="clear" />
                        </q-btn>
                    </template>
                </q-input>
            </div>
            <div class="send">
                <q-btn filled @click="send" color="primary" class="no-border-radius no-shadow fit">
                    <q-icon v-if="!isLoading" size="md" name="double_arrow" />
                    <q-spinner v-if="isLoading" color="white" />
                </q-btn>
            </div>
        </div>
    </q-toolbar>
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
            url: 'https://my-json-server.typicode.com/kovee98/json-server/posts',
            startTime: 0
        };
    },
    computed: {
        ...mapFields('request', [
            'auth',
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
                if (param.active && param.key && param.value) {
                    params[param.key] = param.value;
                }
            });

            let headers = {};
            this.headers.forEach(header => {
                if (header.active && header.key && header.value) {
                    headers[header.key] = header.value;
                }
            });

            this.isLoading = true;
            this.startTime = performance.now();

            this.$axios({
                method: this.method,
                url: this.url || '',
                data: this.body,
                params: params,
                headers: headers,
                auth: this.auth.basic
            }).then(res => {
                this.handleRequest(res);
                notify({ msg: 'Success!' });
            }).catch(err => {
                err.response.msg = err.message;
                throw err.response;
            }).catch((res) => {
                this.handleRequest(res);
                notify({ msg: res.msg, isOk: false });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        handleRequest (res) {
            let endTime = performance.now();

            let color = 'info';
            if (res.status >= 200 && res.status <= 226) {
                color = 'positive';
            } else if (res.status >= 400) {
                color = 'red';
            }

            let time = (endTime - this.startTime);
            let units = 'ms';
            if (time >= 1000) {
                time /= 1000;
                units = 's';
                if (time >= 60) {
                    time /= 60;
                    units = 'm';
                }
            }

            this.$store.dispatch('response/update', {
                data: res.data,
                status: {
                    code: res.status,
                    text: res.statusText,
                    color: color,
                    time: time.toFixed(2),
                    units: units
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .send {
        width: 120px;
    }
    .select {
        width: 150px;
    }
</style>
