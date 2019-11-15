<template>
    <div class="column" @mouseenter="show = true" @mouseleave="show = false">
        <div class="row items-center justify-around q-gutter-xs">
            <div class="col-1 text-center">
                <q-checkbox size="lg" v-model="value.active" />
            </div>
            <div class="col">
                <q-input filled v-model="value.key" />
            </div>
            <div class="col-1 text-center">
                <div class="text-h5">=</div>
            </div>
            <div class="col">
                <q-input filled v-model="value.value" />
            </div>
            <div class="col-1 text-center">
                <transition appear
                            enter-active-class="animated fadeIn"
                            leave-active-class="animated fadeOut">
                    <q-btn v-if="show" size="lg" dense flat @click="removeArg" tabindex="-1">
                        <q-icon name="delete" size="sm" />
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
