<template>
    <img src="~/assets/images/light-black.svg" class="w-3/6" alt="" v-if="!isOn">
    <img src="~/assets/images/light-on.svg" class="w-3/6" alt="" v-else>
</template>

<script setup>
const props = defineProps({
    isOn: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>

</style>