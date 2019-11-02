<template>
    <div>
        {{ params }}
        {{ headers }}
    </div>
</template>

<script>
export default {
    data () {
        return {
            params: this.$store.getters['params/get'],
            headers: this.$store.getters['headers/get']
        };
    }
};
</script>
