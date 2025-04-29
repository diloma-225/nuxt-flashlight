<template>
    <ion-page>
      <ion-content class="ion-padding">
        <div :class="{ dark: isDarkModeOn }">
            <div class="w-full h-screen bg-white dark:bg-bg-dark flex flex-col items-center justify-center">
            <h1 class="text-black dark:text-white text-[3rem] font-bold">Flashy</h1>
            <Light :is-on="isOn" v-if="isDarkModeOn"/>
            <LightDark :is-on="isOn" v-else />
    
            <h2 class="dark:text-white text-md font-light mt-0"> Flash <span :class="isOn ? 'text-primary' : 'text-danger'">{{ isOn ? 'ON' : 'OFF' }}</span></h2>
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
            <button
            @click="router.push('/settings')"
                id="open-action-sheet"
                class="flex items-center gap-2 mt-10 text-gray-800 dark:text-white text-xl font-normal bg-gray-100 dark:bg-slate-700 p-3 rounded-full shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600 transition"
            >
            <img src="~/assets/images/settings.svg" class="w-6" alt="settings icone" v-if="isDarkModeOn">
            <img src="~/assets/images/settings-black.svg" class="w-6" alt="settings icone" v-else>
            Settings
          </button>
          
            
            <footer class="dark:text-white text-xs fixed bottom-10">Copyright 2025, dilomapierrecoder</footer>
            </div>
        </div>
        
      </ion-content>
    </ion-page>
  </template>
  <script setup>
  import { CapacitorFlash } from '@capgo/capacitor-flash';
  import { Haptics, ImpactStyle } from '@capacitor/haptics';
  import { Preferences } from '@capacitor/preferences';
import LightDark from '~/components/light-dark.vue';
import { App as CapacitorApp } from '@capacitor/app'

  
  const router = useIonRouter()
  const route = useRoute();

  
  const isOn = ref(false)

  const isDarkModeOn = ref(false);

  const toggleFlash = async () => {
    isOn.value = !isOn.value
    const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
    if (isSwitchedOn.value) {
      await CapacitorFlash.switchOff();
    } else {
      const options = {
        intensity: 100, // Set the intensity to 100%
      };
      await CapacitorFlash.switchOn(options);
      
    }
    const { value } = await Preferences.get({ key: 'isHapticFeedbackOn' });
    if (value === 'true') {
        await Haptics.vibrate();
    } else if (value === 'false') {
     
    }
    
  }

const setDarkMode = async () => {
    const { value } = await Preferences.get({ key: 'isDarkModeOn' });
    
    if (value === 'true') {
      isDarkModeOn.value = true;
    } else if (value === 'false') {
      isDarkModeOn.value = false;
    }
    
}
onIonViewWillEnter(async() => {
    await setDarkMode();  
    await Preferences.set({
        key: 'currentPage',
        value: 'index',
    });
     /* console.log(await Preferences.get({ key: 'currentPage' })); */
       
});

onMounted(async () => {

        const { keys } = await Preferences.keys();
        if (!keys.includes('isHapticFeedbackOn')) {
        await Preferences.set({
            key: 'isHapticFeedbackOn',
            value: 'true',
        });
        }
        
        if (!keys.includes('isDarkModeOn')) {
            await Preferences.set({
                key: 'isDarkModeOn',
                value: 'true',
            });
        }
        await Preferences.set({
                key: 'currentPage',
                value: 'index',
            });
        await setDarkMode(); 
})

CapacitorApp.addListener('backButton', async ({ canGoBack }) => {
  const { keys } = await Preferences.keys();

  if (keys.includes('currentPage')) {
    const { value } = await Preferences.get({ key: 'currentPage' });
    if (value === 'index') {
      CapacitorApp.exitApp();
    } else {
      router.back();
    }
  } else {
    // Si aucune clé 'currentPage', comportement par défaut
    router.back();
  }
});

  
  
</script>  