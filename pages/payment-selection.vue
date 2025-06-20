<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">เลือกวิธีการชำระเงิน</h1>
      </div>
    </header>

    <main class="px-4 py-4">
      <div class="space-y-4">
        <div
          @click="selectPromptPay"
          class="bg-white rounded-lg shadow-md p-4 border-2 border-transparent cursor-pointer"
        >
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"
                />
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900">PromptPay QR</h3>
              <p class="text-sm text-gray-600">สแกน QR Code เพื่อชำระเงิน</p>
            </div>
            <svg
              class="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="pt-6">
        <button
          @click="goBack"
          class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base"
        >
          ย้อนกลับ
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

// const orderItem = computed(() => {
//   if (route.query.item && route.query.name && route.query.price) {
//     return {
//       id: route.query.item,
//       name: decodeURIComponent(route.query.name),
//       price: route.query.price,
//     };
//   }
//   return null;
// });

const selectPromptPay = () => {
  const query = route.query;
  router.push({
    path: "/payments/promptpay",
    query: query,
  });
};

const goBack = () => {
  router.back();
};
</script>
