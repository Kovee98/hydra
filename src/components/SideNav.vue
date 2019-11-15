<template>
    <q-drawer v-model="menu" side="left" mini behavior="desktop">
        <q-list class="q-gutter-sm q-my-sm">
            <!-- <q-item :class="item" clickable to="/" exact>
                <q-item-section avatar>
                    <q-icon name="code" />
                </q-item-section>
            </q-item> -->
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
            <q-item :class="item" clickable exact>
                <q-item-section avatar>
                    <q-icon name="lock" size="md" />
                </q-item-section>
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
