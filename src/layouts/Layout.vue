<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-blue-grey-8 text-white">
            <q-toolbar class="bg-grey-2 q-pa-none justify-center">
                <inputs />
            </q-toolbar>

            <div class="row">
                <div class="col">
                    <q-tabs no-caps align="left">
                        <q-route-tab to="/" label="Body" />
                        <q-route-tab to="/params" label="Parameters" />
                        <q-route-tab to="/headers" label="Headers" />
                    </q-tabs>
                </div>
                <q-separator dark vertical />
                <div class="col">
                    <div class="row">
                        <div class="col-3">
                            <q-tabs no-caps indicator-color="transparent" align="left">
                                <q-route-tab to label="Response" />
                            </q-tabs>
                        </div>
                        <div class="col" />
                    </div>
                </div>
            </div>
        </q-header>

        <q-page-container>
            <div class="row">
                <div class="col">
                    <router-view />
                </div>
                <q-separator vertical class="fill" />
                <div class="col">
                    <response />
                </div>
            </div>
        </q-page-container>

        <q-footer elevated class="bg-blue-grey-8 text-white">
            <q-toolbar class="justify-between q-pa-xs">
                <settings />
                <q-btn dense flat>
                    <q-icon name="far fa-question-circle" size="xs" />
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item clickable v-close-popup>
                                <q-item-section>Suggest a feature</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup>
                                <q-item-section>Report a bug</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import Response from 'pages/Response';
import Settings from 'components/Settings';
import Inputs from 'components/Inputs';

export default {
    components: { Response, Settings, Inputs },
    data () {
        return {
        };
    }
};
</script>

<style lang="scss">
    .q-toolbar {
        min-height: 0px;
    }
</style>
