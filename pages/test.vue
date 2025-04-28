<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div :class="{ dark: isDarkMode }">
                <button @click="toggleDarkMode">
                  Toggle Dark Mode
                </button>
                <div class="bg-white dark:bg-black text-black dark:text-white">
                  Hello world!
                </div>
              </div>
        </ion-content>
      </ion-page>
</template>

<script setup>
const isDarkMode = ref(false)

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value
}
on

</script>

<style scoped>

</style>