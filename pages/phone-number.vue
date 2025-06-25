<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="px-4 py-4">
        <h1 class="text-xl font-bold text-gray-900">กรอกเบอร์โทรศัพท์</h1>
      </div>
    </header>

    <main class="px-4 py-4">
      <form @submit.prevent="submitPhone">
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 mb-2"
            >เบอร์โทรศัพท์</label
          >
          <input
            id="phone"
            v-model="phone"
            type="tel"
            maxlength="10"
            pattern="[0-9]{10}"
            placeholder="0812345678"
            class="w-full border rounded-md px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-md text-base"
        >
          ถัดไป
        </button>
      </form>
      <button
        @click="goBack"
        class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base mt-3"
      >
        ย้อนกลับ
      </button>
    </main>
  </div>
</template>

<script setup>
const router = useRouter();
const route = useRoute();
const phone = ref("");

const submitPhone = () => {
  if (/^[0-9]{10}$/.test(phone.value)) {
    router.push({
      path: "/order",
      query: { ...route.query, phone: phone.value },
    });
  } else {
    alert("กรุณากรอกเบอร์โทรศัพท์ 10 หลัก");
  }
};

const goBack = () => {
  router.back();
};
</script>

<style></style>
