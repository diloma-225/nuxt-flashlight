<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>
<script setup>
import { App as CapacitorApp } from '@capacitor/app';

const router = useIonRouter();
const route = useRoute();
onMounted(() => {
  CapacitorApp.addListener('backButton', () => {
    if (route.path === '/home') {
      CapacitorApp.exitApp();
    } else {
      router.back();
    }
  });
});
</script>
