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
      <div class="bg-white rounded-lg shadow-md p-4">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ-นามสกุลผู้รับ:
            </label>
            <input
              v-model="form.fullName"
              type="text"
              required
              class="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              เบอร์โทรศัพท์มือถือ:
            </label>
            <input
              v-model="form.phoneNumber"
              type="tel"
              required
              class="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              จังหวัด/เขต(อำเภอ)/แขวง(ตำบล):
            </label>
            <input
              v-model="form.addressLine1"
              type="text"
              required
              class="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ถนน/ชื่ออาคาร:
            </label>
            <input
              v-model="form.addressLine2"
              type="text"
              class="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              รหัสไปรษณีย์:
            </label>
            <input
              v-model="form.zipPostalCode"
              type="text"
              required
              class="w-full px-3 py-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div class="space-y-3 pt-4">
            <button
              type="submit"
              class="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-md text-base"
            >
              ชำระเงิน
            </button>
            <button
              type="button"
              @click="goBack"
              class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base"
            >
              กลับสู่หน้าหลัก
            </button>
          </div>
        </form>
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

const form = ref({
  fullName: "",
  phoneNumber: "",
  addressLine1: "",
  addressLine2: "",
  zipPostalCode: "",
});

const handleSubmit = () => {
  console.log("Order submitted:", {
    order: orderItem.value,
    address: form.value,
  });

  router.push({ path: "/payment-selection", query: route.query });
};

const goBack = () => {
  router.push("/");
};
</script>
