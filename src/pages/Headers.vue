<template>
    <div>
        <arguments :args="headers"
                   :name="name" />
    </div>
</template>

<script>
import Arguments from 'components/Arguments';

export default {
    components: { Arguments },
    data () {
        return {
            name: 'headers',
            headers: this.$store.getters['headers/get']
        };
    }
};
</script>
