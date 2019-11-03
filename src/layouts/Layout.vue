<template>
    <q-layout view="hHh lpR fFf">
        <q-header elevated class="bg-blue-grey-8 text-white">
            <q-toolbar class="bg-grey-2 q-pa-none justify-center">
                <inputs />
            </q-toolbar>

            <div class="row">
                <div class="col">
                    <q-tabs align="left">
                        <q-route-tab to="/" label="Body" />
                        <q-route-tab to="/params" label="Parameters" />
                        <q-route-tab to="/headers" label="Headers" />
                    </q-tabs>
                </div>
                <q-separator inset dark vertical />
                <div class="col">
                    <div class="row">
                        <div class="col-3">
                            <q-tabs indicator-color="transparent" align="left">
                                <q-route-tab to label="Response" />
                            </q-tabs>
                        </div>
                        <div class="col"></div>
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
                <settings />
                <q-btn dense flat>
                    <q-icon name="far fa-question-circle" size="xs" />
                </q-btn>
            </q-toolbar>
        </q-footer>

    </q-layout>
</template>

<script>
import Results from 'pages/Response';
import Settings from 'components/Settings';
import Inputs from 'components/Inputs';

export default {
    components: { Results, Settings, Inputs }
};
</script>

<style lang="scss">
    .q-toolbar {
        min-height: 0px;
    }
</style>
