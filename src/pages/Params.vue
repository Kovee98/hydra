<template>
    <div>
        <arguments :args="params"
                   :name="name" />
    </div>
</template>

<script>
import Arguments from 'components/Arguments';

export default {
    components: { Arguments },
    data () {
        return {
            name: 'params',
            params: this.$store.getters['params/get']
        };
    }
};
</script>
