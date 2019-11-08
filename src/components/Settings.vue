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

                <div class="row">
                    <div class="col">
                        <q-card-section class="column">
                            <span class="text-h6">Syntax Highlighting</span>
                            <div class="q-py-lg">
                                <syntax-color v-for="color in settings.colors"
                                              :key="color.id"
                                              :color="color.color"
                                              :label="color.type" />
                            </div>
                        </q-card-section>
                    </div>
                    <div class="col">
                        <q-card-section class="column">
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
            console.log('restoring...');
            this.show = false;
        },
        save () {
            console.log('saving...');
            this.show = false;
        }
    }
};
</script>
