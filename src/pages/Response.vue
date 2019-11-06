<template>
    <div>
        <pre class="text-body1 q-ma-none">{{this.$store.getters['response/get'].data}}</pre>
    </div>
</template>

<script>
export default {
    data () {
        return {
        };
    }
};
</script>
