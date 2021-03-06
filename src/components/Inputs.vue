<template>
    <q-toolbar class="q-pa-none">
        <div class="row full-width">
            <div class="select">
                <q-select dense square transition-show="flip-left" transition-hide="flip-right" filled v-model="method" :options="options" label="Method" class="text-h6" />
            </div>
            <div class="col">
                <q-input dense square filled v-model="url" label="URL" class="text-h6">
                    <template v-slot:append>
                        <q-btn v-if="url" dense flat @click="url = ''">
                            <q-icon name="clear" />
                        </q-btn>
                    </template>
                </q-input>
            </div>
            <div class="send">
                <q-btn filled dense @click="send" color="primary" class="no-border-radius no-shadow fit">
                    <q-icon v-if="!isLoading" name="send" />
                    <q-spinner v-if="isLoading" color="white" />
                </q-btn>
            </div>
        </div>
    </q-toolbar>
</template>

<script>
import { notify } from '../js/util.js';
import { mapFields } from 'vuex-map-fields';

export default {
    data () {
        return {
            isLoading: false,
            options: [
                'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
            ],
            startTime: 0
        };
    },
    computed: {
        ...mapFields('request', [
            'method',
            'url',
            'body',
            'params',
            'headers',
            'auth'
        ]),
        ...mapFields(['settings']),
        ...mapFields(['isUnsaved'])
    },
    watch: {
        method () { this.isUnsaved = true; },
        url () { this.isUnsaved = true; }
    },
    methods: {
        send () {
            let url = this.url.replace(/^(https?:\/\/)?/i, (a) => a || 'http://');

            if (!this.method) {
                notify({ msg: 'Method is required', isOk: false });
                return;
            }

            let params = {};
            this.params.forEach((param) => {
                if (param.active && param.key && param.value) {
                    params[param.key] = param.value;
                }
            });

            let headers = {};
            this.headers.forEach((header) => {
                if (header.active && header.key && header.value) {
                    headers[header.key] = header.value;
                }
            });

            if (this.auth.bearer.active) {
                headers['Authorization'] = `${this.auth.bearer.prefix} ${this.auth.bearer.token}`;
            }

            let auth = {
                username: this.auth.basic.username,
                password: this.auth.basic.password
            };

            this.isLoading = true;
            this.startTime = performance.now();

            let config = {
                method: this.method,
                url: url,
                params: params,
                headers: headers,
                auth: this.auth.basic.active ? auth : null
            };

            if (this.body) {
                config = {
                    ...config,
                    data: JSON.parse(this.body)
                };
            }

            this.$axios(config).then((res) => {
                this.handleRequest(res);
                if (this.settings.notify.responseSuccess) {
                    notify({ msg: 'Success!' });
                }
            }).catch((err) => {
                this.handleRequest(err);
                notify({ msg: err.message, isOk: false });
            }).finally(() => {
                this.isLoading = false;
            });
        },
        handleRequest (res) {
            let endTime = performance.now();

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
                data: res.data || {},
                status: {
                    code: res.status || '404',
                    text: res.statusText || 'Not Found',
                    time: time.toFixed(2) || '0.00',
                    units: units
                }
            });
        }
    }
};
</script>

<style lang="scss">
    .select {
        width: 110px;
    }
    .send {
        width: 95px;
    }
</style>
