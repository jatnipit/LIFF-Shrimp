<template>
  <div class="space-y-2 text-center">
    <button
      @click="triggerFileInput"
      class="bg-gray-500 text-white font-medium py-2 px-4 rounded-md"
    >
      {{ selectedFile ? "เลือกรูปภาพใหม่" : "อัปโหลดสลิป" }}
    </button>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileSelection"
      accept="image/jpeg,image/png"
      class="hidden"
    />
    <p v-if="selectedFileName" class="text-sm text-gray-600">
      Selected: {{ selectedFileName }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
});

const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);
const selectedFileName = ref(null);

const emit = defineEmits(["upload", "file-selected", "clear-selection"]);

const triggerFileInput = () => {
  if (selectedFile.value) {
    clearSelection();
  }

  setTimeout(() => {
    fileInput.value.click();
  }, 100);
};

const handleFileSelection = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  selectedFile.value = file;
  selectedFileName.value = file.name;

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
  previewUrl.value = URL.createObjectURL(file);

  emit("file-selected", file, previewUrl.value);
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    throw new Error("No file selected");
  }

  const formData = new FormData();
  formData.append("image", selectedFile.value);
  formData.append("userId", props.userId);

  try {
    const response = await fetch("/api/receipt/upload", {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      emit("upload", data.imageUrl);
      return data.imageUrl;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const clearSelection = () => {
  selectedFile.value = null;
  selectedFileName.value = null;

  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }

  if (fileInput.value) {
    fileInput.value.value = "";
  }

  emit("clear-selection");
};

defineExpose({
  uploadFile,
  hasFile: computed(() => !!selectedFile.value),
  clearSelection,
});

onUnmounted(() => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
  }
});
</script>
