<template>
  <main>
    <PromptpayQR v-if="!hasUploadedImage" :amount="Number(price)" />

    <div v-if="hasUploadedImage" class="p-4 text-center">
      <h2 class="text-xl font-bold mb-4">สลิปการชำระเงิน</h2>
      <div class="flex justify-center">
        <img
          :src="uploadedImagePreview"
          alt="Payment Receipt"
          class="w-64 h-64 object-contain border border-gray-300 rounded-md"
        />
      </div>
      <p class="mt-2">ยอดชำระ: {{ price }} บาท</p>
    </div>

    <UploadReceipt
      ref="uploadReceiptRef"
      :user-id="route.query.userId"
      @upload="handleImageUpload"
      @file-selected="handleFileSelection"
      @clear-selection="handleImageClear"
    />
    <div class="space-y-3 p-6">
      <button
        @click="confirmPayment"
        :disabled="isProcessing"
        :class="[
          'w-full font-medium py-3 px-4 rounded-md text-base',
          isProcessing
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-orange-500 text-white hover:bg-orange-600',
        ]"
      >
        {{ isProcessing ? "กำลังดำเนินการ..." : "ยืนยันการชำระเงิน" }}
      </button>

      <button
        @click="goBack"
        :disabled="isProcessing"
        class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        ย้อนกลับ
      </button>
    </div>

    <div v-if="statusMessage" class="p-4 text-center">
      <p
        :class="
          statusMessage.type === 'error' ? 'text-red-600' : 'text-green-600'
        "
      >
        {{ statusMessage.text }}
      </p>
    </div>
  </main>
</template>

<script setup>
const { $liff } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const price = computed(() => route.query.price || 0);

const uploadReceiptRef = ref(null);
const uploadedImageUrl = ref(null);
const uploadedImagePreview = ref(null);
const selectedFile = ref(null);
const isProcessing = ref(false);
const statusMessage = ref(null);

const hasUploadedImage = computed(() => !!uploadedImagePreview.value);

const goBack = () => {
  if (!isProcessing.value) {
    router.back();
  }
};

const handleFileSelection = (file, previewUrl) => {
  selectedFile.value = file;
  uploadedImagePreview.value = previewUrl;
  statusMessage.value = null;
};

const handleImageUpload = (url) => {
  uploadedImageUrl.value = url;
};

const handleImageClear = () => {
  uploadedImageUrl.value = null;
  uploadedImagePreview.value = null;
  selectedFile.value = null;
  statusMessage.value = null;
};

const sendOrderToN8N = async (imageUrl = null) => {
  try {
    const now = new Date();
    const timestamp = now
      .toLocaleString("th-TH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "/");

    const orderData = {
      userId: route.query.userId,
      userName: route.query.userName,
      order: {
        id: route.query.item,
        name: decodeURIComponent(route.query.name),
        price: route.query.price,
      },
      address: route.query.address,
      paymentMethod: "พร้อมเพย์",
      timestamp: timestamp,
      receiptUrl: imageUrl || null,
      requestType: "order",
    };

    const response = await fetch(
      "https://jatnipit-k.app.n8n.cloud/webhook-test/ebb0e9b2-897c-4b73-b871-7e2d221b6a3e",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send order data");
    }

    console.log("Order data sent successfully");
  } catch (error) {
    console.error("Error sending data: ", error);
    throw error;
  }
};

const sendOrderSummary = async (receiptUrl) => {
  try {
    const orderData = createOrderData(receiptUrl);

    const response = await fetch("/api/line/order-summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to send order data");
    }

    console.log("Order data sent successfully");
  } catch (error) {
    console.error("Error sending data: ", error);
    throw error;
  }
};

const placeOrder = async (receiptUrl) => {
  try {
    const orderData = createOrderData(receiptUrl);

    const response = await fetch("/api/line/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    console.log("Order placed successfully");
  } catch (error) {
    console.error("Error placing order: ", error);
    throw error;
  }
};

const createOrderData = (receiptUrl) => {
  const now = new Date();
  const timestamp = now
    .toLocaleString("th-TH", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "/");

  return {
    userId: route.query.userId,
    userName: route.query.userName,
    order: {
      id: route.query.item,
      name: decodeURIComponent(route.query.name),
      price: route.query.price,
    },
    address: route.query.address,
    paymentMethod: "พร้อมเพย์",
    timestamp: timestamp,
    receiptUrl: receiptUrl,
    requestType: "order",
  };
};

const confirmPayment = async () => {
  if (isProcessing.value) return;

  if (!hasUploadedImage.value) {
    alert("กรุณาอัปโหลดสลิปการชำระเงินก่อนยืนยัน");
    return;
  }

  isProcessing.value = true;
  statusMessage.value = null;

  let receiptUrl = useRuntimeConfig().public.ngrokDomain;
  let imagePath = null;

  try {
    if (uploadReceiptRef.value?.hasFile) {
      statusMessage.value = { type: "info", text: "กำลังอัปโหลดสลิป..." };
      imagePath = await uploadReceiptRef.value.uploadFile();
      // console.log(imagePath);
      receiptUrl = receiptUrl + imagePath;
    }

    // await sendOrderToN8N(receiptUrl);
    await sendOrderSummary(receiptUrl);

    statusMessage.value = { type: "success", text: "ยืนยันการชำระเงินสำเร็จ!" };

    if (!$liff.isInClient()) {
      window.alert("การชำระเงินได้รับการยืนยันแล้ว");
    } else {
      $liff.closeWindow();
    }
  } catch (error) {
    if (imagePath) {
      await fetch("/api/receipt/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imagePath }),
      });
    }

    console.error("Error during payment confirmation:", error);
    statusMessage.value = {
      type: "error",
      text: "เกิดข้อผิดพลาดในการยืนยันการชำระเงิน กรุณาลองใหม่อีกครั้ง",
    };
  } finally {
    isProcessing.value = false;
  }
};
</script>
