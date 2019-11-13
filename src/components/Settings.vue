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
                                <syntax-color ref="syntaxColors"
                                              v-for="(color, i) in colors"
                                              :key="i"
                                              v-model="colors[i]" />
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
                                <q-checkbox dense v-model="notifyResponseSuccess" label="On response success" />
                                <q-checkbox dense v-model="notifyResponseError" label="On response error" />
                                <q-checkbox dense v-model="notifySettingsUpdate" label="On settings update" />
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
import path from 'path';
import { remote } from 'electron';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import { defaults } from '../js/settings/defaults.js';
import log from '../js/logger.js';

export default {
    components: { Confirm, SyntaxColor },
    data () {
        return {
            show: false,
            settingsFile: path.join(remote.app.getPath('userData'), 'settings.json')
        };
    },
    computed: {
        ...mapFields('settings', [
            // 'colors',
            '',
            'settings',
            'history.mostRecent',
            'notifications.notifyResponseSuccess',
            'notifications.notifyResponseError',
            'notifications.notifySettingsUpdate'
        ]),
        ...mapMultiRowFields('settings', ['colors'])
    },
    methods: {
        restore () {
            log('defaults:', defaults);
            this.$store.dispatch('settings/update', defaults)
                .then(() => {
                    this.$jsonfile.writeFile(this.settingsFile, defaults, { spaces: 4 })
                        .then(() => {
                            this.show = false;
                            notify({ msg: 'Default settings have been restored' });
                        })
                        .catch(err => notify({ msg: err.toString(), isOk: false }));
                })
                .catch(err => notify({ msg: err.toString(), isOk: false }));
        },
        save () {
            var newSettings = {
                colors: this.colors,
                history: {
                    mostRecent: this.mostRecent
                },
                notifications: {
                    notifyResponseSuccess: this.notifyResponseSuccess,
                    notifyResponseError: this.notifyResponseError,
                    notifySettingsUpdate: this.notifySettingsUpdate
                }
            };

            let settingsObj = this.settings;
            console.log(settingsObj);

            this.$store.dispatch('settings/update', newSettings)
                .then((savedSettings) => {
                    this.$jsonfile.writeFile(this.settingsFile, this.$store.getters['settings/get'], { spaces: 4 })
                        .then(() => {
                            this.show = false;
                            notify({ msg: 'Settings have been saved successfully' });
                        })
                        .catch(err => notify({ msg: err.toString(), isOk: false }));
                })
                .catch(err => notify({ msg: err.toString(), isOk: false }));
        }
    },
    mounted () {
        this.$jsonfile.readFile(this.settingsFile)
            .then(settings => {
                debugger;
                this.$store.dispatch('settings/update', settings)
                    .then((savedSettings) => {
                        debugger;
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
};
</script>
