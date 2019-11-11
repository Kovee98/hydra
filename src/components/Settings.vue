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
// import { mapState } from 'vuex';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
    components: { Confirm, SyntaxColor },
    data () {
        return {
            show: false
            // mostRecent: this.settings.history.mostRecent,
            // mostRecentProxy: null,
            // historyProxy: {},
            // notifyResponseSuccess: this.settings.notifications.notifyResponseSuccess || false,
            // notifyResponseError: this.settings.notifications.notifyResponseError,
            // notifySettingsUpdate: this.settings.notifications.notifySettingsUpdate
            // notificationsProxy: {}
        };
    },
    computed: {
        // ...mapState('settings', ['settings']),
        ...mapFields('settings', [
            'settings.history.mostRecent',
            'settings.notifications.notifyResponseSuccess',
            'settings.notifications.notifyResponseError',
            'settings.notifications.notifySettingsUpdate'
        ]),
        ...mapMultiRowFields('settings', [
            'settings.colors'
        ])
        // colors () {
        //     return this.settings.colors;
        // }
        // mostRecent: {
        //     get () {
        //         return this.settings.history.mostRecent;
        //     },
        //     set (mostRecent) {
        //         // this.$store.dispatch('settings/updateMostRecent', mostRecent);
        //         // this.settings.history.mostRecent = mostRecent;
        //     }
        // },
        // notifications: {
        //     get () {
        //         return this.settings.notifications;
        //     },
        //     set (notifications) {
        //         // this.$store.dispatch('settings/updateNotifications', notifications);
        //     }
        // }
        // history: {
        //     get () {
        //         return this.settings.history;
        //     },
        //     set (history) {
        //         // this.$store.dispatch('settings/updateHistory', history);
        //         this.historyProxy = history;
        //     }
        // }
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

            let newSettings = {
                colors: newColors,
                history: {
                    mostRecent: this.mostRecent
                },
                notifications: {
                    notifyResponseSuccess: this.notifyResponseSuccess,
                    notifyResponseError: this.notifyResponseError,
                    notifySettingsUpdate: this.notifySettingsUpdate
                }
            };

            this.$store.dispatch('settings/update', newSettings)
                .then(() => {
                    this.show = false;
                    notify({ msg: 'Settings have been saved successfully' });
                })
                .catch(err => {
                    notify({ msg: err.toString(), isOk: false });
                });

            let settingsFile = path.join(remote.app.getPath('userData'), 'settings.json');
            this.$jsonfile.writeFile(settingsFile, newSettings, { spaces: 4 })
                .then(() => {
                    console.log('Settings file updated');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    mounted () {
        let settingsFile = path.join(remote.app.getPath('userData'), 'settings.json');
        this.$jsonfile.readFile(settingsFile)
            .then(settings => {
                this.$store.dispatch('settings/update', settings)
                    .then(() => {})
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
};
</script>
