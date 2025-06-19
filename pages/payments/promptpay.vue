<template>
  <main>
    <PromptpayQR :amount="Number(price)" />

    <div class="space-y-3 p-6">
      <button
        @click="confirmPayment"
        class="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-md text-base"
      >
        ยืนยันการชำระเงิน
      </button>

      <button
        @click="goBack"
        class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base"
      >
        ย้อนกลับ
      </button>
    </div>
  </main>
</template>

<script setup>
const { $liff } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const price = computed(() => route.query.price || 0);

const goBack = () => {
  router.back();
};

const confirmPayment = () => {
  const { userAgent } = navigator;
  if (!$liff.isInClient() && userAgent.includes("Line")) {
    redirect();
  } else {
    $liff.closeWindow();
  }
};

const redirect = async () => {
  const liffUrl = await $liff.permanentLink.createUrlBy(window.location.href);
  window.location = liffUrl;
};
</script>
