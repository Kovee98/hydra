<template>
    <q-layout view="hHh lpR fFf">
        <top-bar />
        <side-bar />
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
        <bottom-bar />
    </q-layout>
</template>

<script>
import TopBar from 'components/TopBar';
import Response from 'pages/Response';
import SideBar from 'components/SideBar';
import BottomBar from 'components/BottomBar';

export default {
    components: { TopBar, Response, SideBar, BottomBar },
    data () {
        return {
            splitter: 50
        };
    }
};
</script>
