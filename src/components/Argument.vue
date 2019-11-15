<template>
    <div class="column" @mouseenter="show = true" @mouseleave="show = false">
        <div class="row items-center justify-around q-gutter-xs">
            <div class="col-1 text-center">
                <transition appear
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                    <q-checkbox v-if="show" v-model="value.active" />
                </transition>
            </div>
            <div class="col">
                <q-input filled dense v-model="value.key" placeholder="key" />
            </div>
            <div class="col-1 text-center">
                <div class="text-h5">=</div>
            </div>
            <div class="col">
                <q-input filled dense v-model="value.value" placeholder="value" />
            </div>
            <div class="col-1 text-center">
                <transition appear
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                    <q-btn v-if="show" flat dense @click="removeArg" tabindex="-1">
                        <q-icon name="delete" />
                    </q-btn>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'remove'],
    data () {
        return {
            show: false
        };
    },
    methods: {
        removeArg () {
            this.$store.dispatch(this.remove, this.i);
        }
    }
};
</script>
