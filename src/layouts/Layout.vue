<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-blue-grey-8 text-white">
            <q-toolbar class="bg-grey-2 q-pa-none justify-center">
                <div class="row fit">
                    <div class="col-2 q-px-sm">
                        <q-select borderless v-model="method" :options="options" label="Method" class="text-h6" />
                    </div>
                    <div class="col q-px-sm border-left">
                        <q-input borderless v-model="text" label="URL" class="text-h6" />
                    </div>
                    <div class="col-1 q-ma-none">
                        <q-btn color="primary" icon="fas fa-arrow-right" class="no-border-radius no-shadow fit" />
                    </div>
                </div>
            </q-toolbar>

            <div class="row">
                <div class="col">
                    <q-tabs align="left">
                        <q-route-tab to="/" label="Body" />
                        <q-route-tab to="/params" label="Parameters" />
                        <q-route-tab to="/headers" label="Headers" />
                        <q-route-tab to="/auth" label="Authorization" />
                    </q-tabs>
                </div>
                <div class="col border-left q-pa-sm">
                    <div class="row">
                        <div class="col">
                            <div class="text-h5 full-height vertical-middle">Response</div>
                        </div>
                    </div>
                </div>
            </div>
        </q-header>

        <q-page-container>
            <div class="row">
                <div class="col">
                    <router-view />
                </div>
                <div class="col border-left q-pa-sm">
                    <results />
                </div>
            </div>
        </q-page-container>

        <q-footer elevated class="bg-blue-grey-8 text-white">
            <q-toolbar class="justify-between">
                <q-btn dense flat>
                    <q-icon name="fas fa-cog" size="xs" />
                </q-btn>
                <q-btn dense flat>
                    <q-icon name="far fa-question-circle" size="xs" />
                </q-btn>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script>
import Results from 'components/Response';

export default {
    components: { Results },
    data () {
        return {
            method: 'GET',
            options: [
                'GET', 'POST', 'PUT', 'PATCH', 'DELETE'
            ],
            text: 'https://'
        };
    }
};
</script>

<style lang="scss">
    .q-toolbar {
        min-height: 0px;
    }
    .border-left {
        border-left: solid 1px $blue-grey;
    }
</style>
