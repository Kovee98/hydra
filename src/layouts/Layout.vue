<template>
    <q-layout view="hHh lpR fFf">
        <q-header bordered class="bg-dark">
            <q-toolbar class="q-pa-none justify-center">
                <inputs />
            </q-toolbar>
            <div class="row items-center">
                <q-tabs no-caps align="left">
                    <q-route-tab to="/" label="Body" />
                    <q-route-tab to="/params" label="Parameters" />
                    <q-route-tab to="/headers" label="Headers" />
                </q-tabs>
                <div class="col">
                    <div class="row q-pr-sm">
                        <div class="col text-right">
                            <q-chip square outline>
                                {{time}} ms
                            </q-chip>
                            <q-chip v-if="status.code" square :color="status.color" class="text-white">
                                {{status.code}}
                            </q-chip>
                        </div>
                    </div>
                </div>
            </div>
        </q-header>

        <q-page-container>
            <q-splitter v-model="splitter" class="fill">
                <template v-slot:before>
                    <router-view />
                </template>
                <template v-slot:after>
                    <response />
                </template>
            </q-splitter>
        </q-page-container>

        <q-footer bordered class="">
            <q-toolbar class="justify-between q-pa-xs">
                <settings />
                <q-btn dense flat>
                    <q-icon name="far fa-question-circle" size="xs" />
                    <q-menu>
                        <q-list style="min-width: 100px">
                            <q-item clickable @click="suggestFeature">
                                <q-item-section>Suggest a feature</q-item-section>
                            </q-item>
                            <q-item clickable @click="reportBug">
                                <q-item-section>Report a bug</q-item-section>
                            </q-item>
                            <!-- <suggest-feature />
                            <report-bug /> -->
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
import { openURL } from 'quasar';
import { mapFields } from 'vuex-map-fields';
// import SuggestFeature from 'components/SuggestFeature';
// import ReportBug from 'components/ReportBug';

export default {
    components: { Response, Settings, Inputs },
    data () {
        return {
            splitter: 50,
            // showBug: false,
            // showFeature: false,
            issuesUrl: 'https://github.com/Kovee98/hydra-2/issues/new'
        };
    },
    computed: {
        ...mapFields('response', [
            'status',
            'time'
        ])
    },
    methods: {
        suggestFeature () {
            openURL(this.issuesUrl);
        },
        reportBug () {
            openURL(this.issuesUrl);
        }
    }
};
</script>

<style lang="scss">
    .q-toolbar {
        min-height: 0px;
    }
    .q-header {
        // border-bottom: 1px solid $grey-7;
    }
    .border {
        border-color: $grey-7;
    }
</style>
