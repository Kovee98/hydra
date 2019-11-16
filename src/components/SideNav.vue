<template>
    <q-drawer v-model="menu" side="left" mini behavior="desktop">
        <q-list class="q-gutter-sm q-my-sm">
            <q-item :class="item" clickable to="/" exact>
                <q-item-section avatar>
                    <div class="text-h6">{ ; }</div>
                </q-item-section>
            </q-item>
            <q-item :class="item" clickable to="/params" exact>
                <q-item-section avatar>
                    <q-icon name="storage" size="md" />
                </q-item-section>
            </q-item>
            <q-item :class="item" clickable to="/headers" exact>
                <q-item-section avatar>
                    <q-icon name="language" size="md" />
                </q-item-section>
            </q-item>
            <q-item :class="item" clickable :active="$route.path.includes('/auth')">
                <q-item-section avatar>
                    <q-icon name="lock" size="md" />
                </q-item-section>
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
        </q-list>
    </q-drawer>
</template>

<script>
export default {
    data () {
        return {
            menu: true,
            item: 'q-py-md'
        };
    }
};
</script>
