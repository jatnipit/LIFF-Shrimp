<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <div class="h-48 overflow-hidden">
      <img
        :src="menuItem.image"
        :alt="menuItem.name"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
      />
    </div>

    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold text-gray-900 flex-1 mr-2">
          {{ menuItem.name }}
        </h3>
        <span class="text-lg font-bold text-green-600">
          ${{ menuItem.price.toFixed(2) }}
        </span>
      </div>

      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {{ menuItem.description }}
      </p>

      <button
        @click="handleOrderClick"
        class="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
      >
        Order Now
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

<style scoped>
/* Custom CSS for line clamping (limiting description to 3 lines) */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
