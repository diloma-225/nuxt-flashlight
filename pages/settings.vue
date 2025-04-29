<template>
    <ion-page>
        <ion-content class="ion-padding" :fullscreen="true">
            <div :class="{ dark: isDarkModeOn }">
                <div class="w-full h-screen bg-white dark:bg-bg-dark flex flex-col items-center justify-top relative pt-10">
                    <div class="absolute top-20 left-5 p-4 w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700" @click="router.replace('/')">
                        <img src="~/assets/images/arrow-back.svg" class="w-16" alt="">
                    </div>
                    <h1 class="text-black dark:text-white text-[3rem] font-bold mt-28">Settings</h1>
                    
                    <div class="w-5/6 dark:text-white flex items-center  gap-2 my-2">
                        <span class="w-3/6 text-left">Dark Mode</span> 
                        <button
                        class="w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300"
                        @click="toggleDarkMode"
                            :class="isDarkModeOn ? 'bg-blue-400' : 'bg-gray-700'"
                        >
                            <div
                            class="w-4 h-4 bg-gray-400 rounded-full shadow-md transform transition-transform duration-300"
                            :class="isDarkModeOn ? 'translate-x-7 bg-white' : 'translate-x-0'"
                            />
                        </button>
                    </div>
                    <div class="w-5/6 dark:text-white flex items-center  gap-2 my-2">
                        <span class="w-3/6 text-left">Haptic feedback</span> 
                        <button
                        class="w-14 h-7 rounded-full flex items-center px-1 transition-colors duration-300"
                        @click="toggleHaptic"
                            :class="isHapticFeedbackOn ? 'bg-blue-400' : 'bg-gray-700'"
                        >
                            <div
                            class="w-4 h-4 bg-gray-400 rounded-full shadow-md transform transition-transform duration-300"
                            :class="isHapticFeedbackOn ? 'translate-x-7 bg-white' : 'translate-x-0'"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </ion-content>
      </ion-page>
</template>

<script setup>
import { CapacitorFlash } from '@capgo/capacitor-flash';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';

const isDarkModeOn = ref(false);
const isHapticFeedbackOn = ref(false);


const router = useIonRouter()
const route = useRoute();

const toggleDarkMode = async ()=>{
    isDarkModeOn.value = !isDarkModeOn.value
    await Preferences.set({
        key: 'isDarkModeOn',
        value: isDarkModeOn.value.toString()
    });
    if (isHapticFeedbackOn.value) {
        await Haptics.vibrate();
    } 
}
const toggleHaptic = async()=>{
    isHapticFeedbackOn.value = !isHapticFeedbackOn.value
    await Preferences.set({
        key: 'isHapticFeedbackOn',
        value: isHapticFeedbackOn.value.toString()
    });

    const { isHaptic } = await Preferences.get({ key: 'isHapticFeedbackOn' });
    if (isHapticFeedbackOn.value) {
        await Haptics.vibrate();
    } 
}


const setDarkMode = async () => {
    const { value } = await Preferences.get({ key: 'isDarkModeOn' });
    
    if (value === 'true') {
      isDarkModeOn.value = true;
    } else if (value === 'false') {
      isDarkModeOn.value = false;
    }

    const { isHaptic } = await Preferences.get({ key: 'isHapticFeedbackOn' });
 
    
}

const setHaptic = async () => {
    const { value } = await Preferences.get({ key: 'isHapticFeedbackOn' });
    
    if (value === 'true') {
      isHapticFeedbackOn.value = true;
    } else if (value === 'false') {
      isHapticFeedbackOn.value = false;
    }
}

onIonViewWillEnter(async() => {
    await setDarkMode();
    await Preferences.set({
        key: 'currentPage',
        value: 'settings',
    });
   /*  console.log(await Preferences.get({ key: 'currentPage' })); */
         
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

    await setHaptic();
    await setDarkMode();
    await Preferences.set({
        key: 'currentPage',
        value: 'settings',
    });
})

</script>

<style scoped>

</style>