<template>
    <q-layout view="hHh lpR fFf">
        <q-header bordered class="bg-dark">
            <title-bar />
            <q-toolbar class="q-pa-none justify-center">
                <inputs />
            </q-toolbar>
        </q-header>
        <q-drawer v-model="menu" side="left" mini behavior="desktop" bordered>
            <q-list>
                <q-item clickable to="/" exact>
                    <q-item-section avatar>
                        <q-icon name="create" />
                    </q-item-section>
                    <q-item-section v-if="words">
                        Body
                    </q-item-section>
                </q-item>
                <q-item clickable to="/params" exact>
                    <q-item-section avatar>
                        <q-icon name="add_to_photos" />
                    </q-item-section>
                    <q-item-section v-if="words">
                        Parameters
                    </q-item-section>
                </q-item>
                <q-item clickable to="/headers" exact>
                    <q-item-section avatar>
                        <q-icon name="storage" />
                    </q-item-section>
                    <q-item-section v-if="words">
                        Headers
                    </q-item-section>
                </q-item>
                <q-item clickable exact>
                    <q-item-section avatar>
                        <q-icon name="lock" />
                    </q-item-section>
                    <q-item-section v-if="words">
                        Authorization
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
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
        <q-footer>
            <q-toolbar>
                <q-space />
                <status />
            </q-toolbar>
        </q-footer>
    </q-layout>
</template>

<script>
import Response from 'pages/Response';
import Inputs from 'components/Inputs';
import TitleBar from 'components/TitleBar';
import Status from 'components/Status';

export default {
    components: { Response, Inputs, TitleBar, Status },
    data () {
        return {
            menu: true,
            splitter: 50,
            words: false
        };
    }
};
</script>
