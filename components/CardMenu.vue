<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div class="h-48 overflow-hidden">
      <img
        :src="menuItem.image"
        :alt="menuItem.name"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 flex-1 mr-2">
          {{ menuItem.name }}
        </h3>
        <span class="text-lg font-bold text-green-600">
          {{ menuItem.price.toFixed(2) }} บาท
        </span>
      </div>

      <p class="text-gray-600 text-sm mb-4">
        {{ menuItem.description }}
      </p>

      <button
        @click="handleOrderClick"
        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
      >
        สั่งเลย
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  menuItem: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["order"]);

const handleOrderClick = () => {
  emit("order", props.menuItem);
};
</script>
