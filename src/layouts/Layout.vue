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
                <q-separator dark vertical inset />
                <div class="col">
                    <div class="row items-center justify-between">
                        <div class="col-3">
                            <q-tabs no-caps indicator-color="transparent" align="left">
                                <q-route-tab to label="Response" />
                            </q-tabs>
                        </div>
                        <div class="col">
                            <div class="row justify-end q-pr-sm">
                                <div class="col text-right">
                                    <q-chip square>{{this.$store.getters['response/get'].time}} ms</q-chip>
                                </div>
                                <div v-if="this.$store.getters['response/get'].status" class="col-2 text-center">
                                    <q-chip square>{{this.$store.getters['response/get'].status}}</q-chip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-header>

        <q-page-container>
            <q-splitter v-model="splitter" class="fill">
                <template v-slot:before>
                    <div class="q-px-md">
                        <router-view />
                    </div>
                </template>

                <template v-slot:after>
                    <div class="q-pa-md">
                        <response />
                    </div>
                </template>
            </q-splitter>
        </q-page-container>

        <q-footer elevated class="bg-blue-grey-8 text-white">
            <q-toolbar class="justify-between q-pa-xs">
                <settings />
                <q-btn dense flat>
                    <q-icon name="far fa-question-circle" size="xs" />
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <suggest-feature />
                            <report-bug />
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
import SuggestFeature from 'components/SuggestFeature';
import ReportBug from 'components/ReportBug';

export default {
    components: { Response, Settings, Inputs, SuggestFeature, ReportBug },
    data () {
        return {
            splitter: 50,
            showBug: false,
            showFeature: false
        };
    }
};
</script>

<style lang="scss">
    .q-toolbar {
        min-height: 0px;
    }
</style>
