<template>
    <div class="column q-pa-xl q-gutter-lg">
        <div class="text-h4">
            Basic
            <q-checkbox v-model="active">
                <hint :label="active ? 'enabled' : 'disabled'" />
            </q-checkbox>
        </div>
        <q-input filled v-model="username" label="Username" class="col" />
        <q-input filled v-model="password" label="Password" :type="isPassword ? 'password' : 'text'">
            <template v-slot:append>
                <q-icon :name="isPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPassword = !isPassword" />
            </template>
        </q-input>
    </div>
</template>

<script>
import Hint from 'components/Hint';
import { mapFields } from 'vuex-map-fields';

export default {
    components: { Hint },
    data () {
        return {
            isPassword: true
        };
    },
    computed: {
        ...mapFields('request', [
            'auth.basic.username',
            'auth.basic.password',
            'auth.basic.active'
        ])
    }
};
</script>
