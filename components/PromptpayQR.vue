<template>
  <div class="p-4 text-center">
    <h2 class="text-xl font-bold mb-4">ชำระเงินผ่านพร้อมเพย์</h2>
    <img :src="qrImage" alt="QR PromptPay" class="mx-auto w-64 h-64" />
    <p class="mt-2">ยอดชำระ: {{ amount }}</p>
  </div>
</template>

<script setup>
import * as promptpay from "promptpay-qr";
import qrcode from "qrcode";

const qrImage = ref("");
const amount = ref(10);
const phoneNumber = process.env.PROMPTPAY_PHONE_NUMBER;

onMounted(async () => {
  try {
    const payload = await promptpay.generatePayload(phoneNumber, {
      amount: amount.value,
    });
    qrImage.value = await qrcode.toDataURL(payload);
  } catch (error) {
    console.error("Error generating QR: ", error);
  }
});
</script>
