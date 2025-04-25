<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
{{ test }}
      <ion-button shape="round" @click="checkFlashlightAvailability()">FLASH LIGHT</ion-button>
      </div>
      
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
