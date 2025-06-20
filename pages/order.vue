<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">รายละเอียดการจัดส่ง</h1>
        <p v-if="orderItem" class="text-gray-600 mt-1 text-sm">
          Order: {{ orderItem.name }} - {{ orderItem.price }} บาท
        </p>
      </div>
    </header>

    <main class="px-4 py-4">
      <LocationStatus
        :loading="loading"
        :error="error"
        :location="location"
        :address="address"
        @retry="getCurrentLocation"
      />

      <LocationMap :location="location" />

      <div class="space-y-3 pt-4">
        <button
          v-if="!loading && !location"
          @click="getCurrentLocation"
          class="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-md text-base"
        >
          ค้นหาตำแหน่งของฉัน
        </button>

        <div v-if="location" class="space-y-3 pt-4">
          <button
            @click="getCurrentLocation"
            class="w-full bg-green-500 text-white font-medium py-3 px-4 rounded-md text-base"
          >
            อัปเดตตำแหน่ง
          </button>
          <button
            @click="confirmLocation"
            class="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-md text-base"
          >
            ยืนยันตำแหน่ง
          </button>
        </div>

        <button
          type="button"
          @click="goBack"
          class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const orderItem = computed(() => {
  if (route.query.item && route.query.name && route.query.price) {
    return {
      id: route.query.item,
      name: decodeURIComponent(route.query.name),
      price: route.query.price,
    };
  }
  return null;
});

const confirmLocation = () => {
  router.push({
    path: "/payment-selection",
    query: { ...route.query, address: address.value },
  });
};

const goBack = () => {
  router.push("/");
};

const { location, address, loading, error, getCurrentLocation } =
  useGeolocation();

onMounted(() => {
  getCurrentLocation();
});

// useHead({
//   title: "ตำแหน่งของคุณ",
// });
</script>
