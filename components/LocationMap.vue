<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div ref="mapContainer" id="map" class="w-full h-96"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  location: Object,
});

const mapContainer = ref(null);
let map = null;
let marker = null;

const initializeMap = async () => {
  if (!props.location) return;

  await nextTick();

  if (map) {
    map.remove();
  }

  if (!window.L) {
    await loadLeaflet();
  }

  map = window.L.map("map").setView(
    [props.location.lat, props.location.lng],
    16
  );

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  marker = window.L.marker([props.location.lat, props.location.lng])
    .addTo(map)
    .bindPopup("คุณอยู่ที่นี่")
    .openPopup();
};

const loadLeaflet = () => {
  return new Promise((resolve) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

watch(
  () => props.location,
  (newLocation) => {
    if (newLocation) {
      initializeMap();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});
</script>
