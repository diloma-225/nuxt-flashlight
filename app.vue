<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="w-full h-screen bg-bg-dark flex flex-col items-center justify-center">
        <h1 class="text-white text-[3rem] font-bold">Flashy</h1>
        <img src="~/assets/images/light.svg" class="w-3/6" alt="" v-if="!isOn">
        <img src="~/assets/images/light-on.svg" class="w-3/6" alt="" v-else>

        <h2 class="text-white text-md font-light mt-0"> Flash <span :class="isOn ? 'text-primary' : 'text-danger'">{{ isOn ? 'ON' : 'OFF' }}</span></h2>
        <button
        @click="toggleFlash"
          class="w-32 h-16 rounded-full flex items-center px-1 transition-colors duration-300"
            :class="isOn ? 'bg-primary' : 'bg-danger'"
          >
            <div
              class="w-12 h-12 bg-bg-dark rounded-full shadow-md transform transition-transform duration-300"
              :class="isOn ? 'translate-x-14' : 'translate-x-0'"
            />
        </button>
        <p class="text-white flex items-center gap-2 mt-10 text-xl font-regular">
          <img src="~/assets/images/settings.svg" class="w-8 text-white" alt="">
          Settings
        </p>
        <footer class="text-white text-xs fixed bottom-0">Copyright 2025, dilomapierrecoder</footer>
      </div>
      
      
    </ion-content>
  </ion-page>
</template>
<script setup>
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const isOn = ref(false)
const toggleFlash = async () => {
  isOn.value = !isOn.value
  await CapacitorFlash.toggle();
  await Haptics.vibrate();
}
/* const checkFlashlightAvailability = () => {
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
} */

</script>
