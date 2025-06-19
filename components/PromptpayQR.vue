<template>
  <div class="p-4 text-center">
    <h2 class="text-xl font-bold mb-4">ชำระเงินผ่านพร้อมเพย์</h2>
    <div v-if="qrImage">
      <img :src="qrImage" alt="QR PromptPay" class="mx-auto w-64 h-64" />
      <p class="mt-2">ยอดชำระ: {{ amount }} บาท</p>
    </div>
    <div v-else class="text-red-500">
      ไม่สามารถสร้าง QR code ได้ กรุณาลองใหม่อีกครั้ง
    </div>
  </div>
</template>

<script setup>
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";

const props = defineProps({
  amount: {
    type: Number,
    required: true,
  },
});

const qrImage = ref("");
const phoneNumber = useRuntimeConfig().public.promptpayPhoneNumber;

onMounted(async () => {
  try {
    const payload = generatePayload(phoneNumber, {
      amount: props.amount,
    });
    qrImage.value = await qrcode.toDataURL(payload);
  } catch (error) {
    console.error("Error generating QR: ", error);
  }
});
</script>
