<template>
    <div>
        <q-btn dense flat @click="show = true">
            <q-icon name="fas fa-cog" size="xs" />
        </q-btn>

        <q-dialog v-model="show" persistent maximized transition-show="slide-up" transition-hide="slide-down">
            <q-card dark>
                <q-bar class="q-pa-xs">
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup />
                </q-bar>

                <q-card-section>
                    <div class="text-h4">Settings</div>
                </q-card-section>

                <q-scroll-area class="q-px-xl q-mx-xl fill">
                    <div class="column q-gutter-lg q-px-xl q-mx-xl">
                        <q-card-section class="col q-ml-none">
                            <span class="text-h6">Syntax Highlighting</span>
                            <div class="q-py-lg">
                                <syntax-color ref="syntaxColors" v-for="color in colors"
                                              :key="color.id"
                                              :color="color.color"
                                              :label="color.type" />
                            </div>
                        </q-card-section>
                        <q-card-section class="col q-ml-none">
                            <span class="text-h6">History</span>
                            <div class="q-py-lg">
                                <q-checkbox dense v-model="mostRecent" label="Save most recent" color="primary" />
                            </div>
                        </q-card-section>
                        <q-card-section class="col q-ml-none">
                            <span class="text-h6">Notifications</span>
                            <div class="column q-col-gutter-md q-py-lg">
                                <q-checkbox dense v-model="notifySuccess" label="On successful response" />
                                <q-checkbox dense v-model="notifyError" label="On general errors" />
                                <q-checkbox dense v-model="notifySettings" label="On settings change" />
                            </div>
                        </q-card-section>
                    </div>
                </q-scroll-area>

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
            mostRecent: this.$store.getters['settings/get'].mostRecent,
            notifySuccess: false,
            notifyError: true,
            notifySettings: true
        };
    },
    computed: {
        colors () {
            return this.$store.getters['settings/get'].colors;
        }
    },
    methods: {
        restore () {
            this.show = false;
            notify({ msg: 'Default settings have been restored' });
        },
        save () {
            let newColors = [];
            this.$refs.syntaxColors.forEach(syntaxColor => {
                newColors.push({
                    type: syntaxColor.label,
                    color: syntaxColor.currentColor
                });
            });

            this.$store.dispatch('settings/update', {
                colors: newColors,
                mostRecent: this.mostRecent
            }).then(() => {
                this.show = false;
                notify({ msg: 'Settings have been saved successfully' });
            });
        }
    }
};
</script>
