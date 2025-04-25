<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div style="width: 100%;height: 100%;display: flex;align-items: center;justify-content: center;">
      <ion-button shape="round" @click="switchOnFlashlight()">SWITCH  FLASH ON</ion-button>
      <ion-button shape="round" @click="switchOffFlashlight()">SWITCH  FLASH OFF</ion-button>
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

async function switchOnFlashlight() {
  const options = {
    intensity: 100, // Set the intensity to 100%
  };
  await CapacitorFlash.switchOn(options);
}

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
}

</script>
