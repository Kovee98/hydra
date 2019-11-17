<template>
    <q-tooltip anchor="center right"
               self="center left"
               :offset="[0, 0]"
               transition-show="fade"
               transition-hide="fade"
               :delay="750"
               content-class="tooltip">
        {{ label }}
    </q-tooltip>
</template>

<script>
export default {
    props: ['label']
};
</script>
