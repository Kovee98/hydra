<template>
    <q-dialog v-model="show" persistent maximized transition-show="slide-up" transition-hide="slide-down">
        <q-card class="justify-center">
            <q-bar :style="bar">
                <div class="q-pa-sm">Settings</div>
                <q-space />
                <q-btn dense flat icon="close" @click="show = false" />
            </q-bar>
            <q-scroll-area class="fill q-pt-lg q-pt-xl"
                           :thumb-style="thumbStyle">
                <div class="column q-gutter-lg q-mx-auto" :style="{ maxWidth: '50vw' }">
                    <q-card-section class="col q-ml-none">
                        <span class="text-h6">Syntax Highlighting</span>
                        <div class="q-py-lg">
                            <color-picker v-for="(color, i) in colors"
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
</template>

<script>
import Confirm from 'components/Confirm';
import ColorPicker from 'components/ColorPicker';
import { notify } from '../js/util.js';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';
import { defaults } from '../js/settings/defaults.js';

export default {
    props: ['value'],
    components: { Confirm, ColorPicker },
    data () {
        return {
        };
    },
    computed: {
        ...mapFields('settings', [
            'history.mostRecent',
            'notifications.notifyResponseSuccess',
            'notifications.notifyResponseError',
            'notifications.notifySettingsUpdate'
        ]),
        ...mapMultiRowFields('settings', ['colors']),
        show: {
            get () {
                return this.value;
            },
            set (value) {
                this.$emit('input', value);
            }
        },
        thumbStyle () {
            return {
                width: '12px',
                right: '10px'
            };
        },
        bar () {
            return {
                height: '40px'
            };
        }
    },
    methods: {
        restore () {
            this.$store.dispatch('settings/update', defaults)
                .then(() => {
                    this.$file.settings.restore(defaults)
                        .then(() => {
                            this.show = false;
                        });
                }).catch((err) => {
                    notify({ msg: err.toString(), isOk: false });
                });
        },
        save () {
            this.$file.settings.save(this.$store.getters['settings/get']);
        }
    }
};
</script>
