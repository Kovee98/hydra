<template>
    <q-drawer v-model="menu" mini side="left" behavior="desktop" :width="150">
        <q-list>
            <q-item :class="item" clickable to="/" exact>
                <q-item-section avatar>
                    <div class="text-h6">{ ; }</div>
                </q-item-section>
                <hint :label="'Body'" />
            </q-item>
            <q-item :class="item" clickable to="/params" exact>
                <q-item-section avatar>
                    <q-icon name="storage" size="md" />
                </q-item-section>
                <hint :label="'Parameters'" />
            </q-item>
            <q-item :class="item" clickable to="/headers" exact>
                <q-item-section avatar>
                    <q-icon name="web_asset" size="md" />
                </q-item-section>
                <hint :label="'Headers'" />
            </q-item>
            <q-item :class="item" clickable :active="$route.path.includes('/auth')">
                <q-item-section avatar>
                    <q-icon name="lock" size="md" />
                </q-item-section>
                <hint :label="'Authentication'" />
                <q-menu auto-close anchor="top right" self="top left">
                    <q-list style="min-width: 100px">
                        <q-item clickable to="/auth/basic">
                            <q-item-section>Basic</q-item-section>
                        </q-item>
                        <q-item clickable to="/auth/bearer">
                            <q-item-section>Bearer</q-item-section>
                        </q-item>
                    </q-list>
                </q-menu>
            </q-item>
            <q-separator />
            <q-item :class="item" clickable @click="showSettings = true">
                <q-item-section avatar>
                    <q-icon name="settings" size="md" />
                </q-item-section>
                <hint :label="'Settings'" />
                <settings v-model="showSettings" />
            </q-item>
        </q-list>
    </q-drawer>
</template>

<script>
import Settings from 'components/Settings';
import Hint from 'components/Hint';

export default {
    components: { Settings, Hint },
    data () {
        return {
            showSettings: false,
            menu: true,
            item: 'q-my-md'
        };
    }
};
</script>
