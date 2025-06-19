<template>
  <NuxtPage />
</template>

<script setup>
const { $liff } = useNuxtApp();
const isLiffInitialized = ref(false);

onMounted(async () => {
  try {
    await $liff.ready.then(() => {
      isLiffInitialized.value = true;
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
