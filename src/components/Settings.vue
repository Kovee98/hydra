<template>
    <div>
        <q-btn dense flat @click="show = true">
            <q-icon name="fas fa-cog" size="xs" />
        </q-btn>

        <q-dialog v-model="show" persistent maximized transition-show="slide-up" transition-hide="slide-down">
            <q-card class="bg-grey-dark" dark>
                <q-bar class="q-pa-xs">
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup />
                </q-bar>

                <q-card-section>
                    <div class="text-h4">Settings</div>
                </q-card-section>

                <div class="q-px-xl q-mx-xl">
                    <div class="column q-px-xl q-mx-xl">
                        <q-card-section class="col">
                            <span class="text-h6">Syntax Highlighting</span>
                            <div class="q-py-lg">
                                <syntax-color v-for="color in settings.colors"
                                              :key="color.id"
                                              :color="color.color"
                                              :label="color.type" />
                            </div>
                        </q-card-section>
                        <q-card-section class="col">
                            <span class="text-h6">History</span>
                            <div class="q-py-lg">
                                <q-checkbox dense v-model="settings.mostRecent" label="Save most recent" color="primary" />
                            </div>
                        </q-card-section>
                    </div>
                </div>

                <div class="fixed-bottom">
                    <q-separator />
                    <q-card-actions align="right" class="q-px-md q-gutter-md">
                        <confirm :btn="'Restore'"
                                 :msg="'restore the default settings?'"
                                 :action="restore" />
                        <confirm :btn="'Save'"
                                 :msg="'save settings?'"
                                 :action="save"
                                 :color="'primary'" />
                    </q-card-actions>
                </div>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import Confirm from 'components/Confirm';
import SyntaxColor from 'components/SyntaxColor';
import { notify } from '../js/util.js';

export default {
    components: { Confirm, SyntaxColor },
    data () {
        return {
            show: false,
            settings: this.$store.getters['settings/get']
        };
    },
    methods: {
        restore () {
            this.show = false;
            notify({ msg: 'Default settings have been restored' });
        },
        save () {
            this.show = false;
            this.$store.dispatch('settings/update', {
                colors: [
                    { type: 'Key', color: '#98e22b' },
                    { type: 'String', color: '#e7db74' },
                    { type: 'Number', color: '#ac80ff' },
                    { type: 'Boolean', color: '#0a49cc' },
                    { type: 'Null', color: '#ac80ff' }
                ],
                mostRecent: true
            });
            notify({ msg: 'Settings have been saved successfully' });
        }
    }
};
</script>
