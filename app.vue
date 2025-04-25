<template>
  <ion-page>
    <ion-content class="ion-padding">
      {{ test }}
      <ion-button shape="round" @click="checkFlashlightAvailability()">FLASH LIGHT</ion-button>
    </ion-content>
  </ion-page>
</template>
<script setup>
import { CapacitorFlash } from '@capgo/capacitor-flash';

const test = ref(null);
const checkFlashlightAvailability = () => {
  CapacitorFlash.isAvailable().then((result) => {
    test.value = result.value;
  });
};

</script>
