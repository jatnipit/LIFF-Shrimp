<template>
  <main>
    <PromptpayQR :amount="Number(price)" />

    <div>
      <input type="image" src="" alt="">
    </div>

    <div class="space-y-3 p-6">
      <button
        @click="confirmPayment"
        class="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-md text-base"
      >
        ยืนยันการชำระเงิน
      </button>

      <button
        @click="goBack"
        class="w-full bg-gray-500 text-white font-medium py-3 px-4 rounded-md text-base"
      >
        ย้อนกลับ
      </button>
    </div>
  </main>
</template>

<script setup>
const { $liff } = useNuxtApp();
const route = useRoute();
const router = useRouter();
const price = computed(() => route.query.price || 0);

const goBack = () => {
  router.back();
};

const sendOrderToN8N = async () => {
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
      throw new Error("Response is not OK");
    }

    console.log("Order data sent successfully");
  } catch (error) {
    console.error("Error sending data: ", error);
  }
};

const confirmPayment = async () => {
  await sendOrderToN8N();

  if (!$liff.isInClient()) {
    window.alert(
      "This button is unavailable as LIFF is currently being opened in an external browser."
    );
  } else {
    $liff.closeWindow();
  }
};
</script>
