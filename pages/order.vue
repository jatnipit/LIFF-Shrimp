<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-3xl mx-auto px-4 py-6">
        <h1 class="text-2xl font-bold text-gray-900">รายละเอียดการจัดส่ง</h1>
        <p v-if="orderItem" class="text-gray-600 mt-2">
          Order: {{ orderItem.name }} - ${{ orderItem.price }}
        </p>
      </div>
    </header>

    <main class="max-w-3xl mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ-นามสกุลผู้รับ:
            </label>
            <input
              v-model="form.fullName"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              เบอร์โทรศัพท์มือถือ:
            </label>
            <input
              v-model="form.phoneNumber"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              จังหวัด/เขต(อำเภอ)/แขวง(ตำบล):
            </label>
            <input
              v-model="form.addressLine1"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              ถนน/ชื่ออาคาร:
            </label>
            <input
              v-model="form.addressLine2"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              รหัสไปรษณีย์:
            </label>
            <input
              v-model="form.zipPostalCode"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="flex gap-4">
            <button
              type="button"
              @click="goBack"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Back to Menu
            </button>
            <button
              type="submit"
              class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
            >
              Place Order
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

  router.push("/");
};

const goBack = () => {
  router.push("/");
};
</script>
