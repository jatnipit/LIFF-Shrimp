<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <div v-if="loading" class="text-center">
      <div class="text-gray-600">กำลังค้นหาตำแหน่ง...</div>
    </div>

    <div v-else-if="error" class="text-center text-red-600">
      <div class="mb-2">{{ error }}</div>
      <button
        @click="$emit('retry')"
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
      >
        ลองอีกครั้ง
      </button>
    </div>

    <div v-else-if="location" class="space-y-2">
      <div class="text-sm text-gray-600">
        <strong>ละติจูด:</strong> {{ location.lat.toFixed(6) }}
      </div>
      <div class="text-sm text-gray-600">
        <strong>ลองจิจูด:</strong> {{ location.lng.toFixed(6) }}
      </div>
      <div v-if="address" class="text-sm text-gray-600">
        <strong>ที่อยู่:</strong> {{ address }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: Boolean,
  error: String,
  location: Object,
  address: String,
});

defineEmits(["retry"]);
</script>
