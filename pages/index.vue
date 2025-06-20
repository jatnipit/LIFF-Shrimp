<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="px-4 py-4">
        <h1 class="text-2xl font-bold text-gray-900 text-center">
          ร้านกุ้งเต้น
        </h1>
      </div>
    </header>

    <main class="px-4 py-4">
      <div class="space-y-4">
        <CardMenu
          v-for="item in menuItems"
          :key="item.id"
          :menu-item="item"
          @order="handleOrder"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
const { $liff } = useNuxtApp();

const menuItems = ref([
  {
    id: 1,
    name: "ข้าวผัดกุ้ง",
    price: 50,
    description:
      "ข้าวผัดสุดฟิน รสชาติจัดจ้าน ผัดกับกุ้งสดเนื้อแน่น หอมกระทะทุกคำ เสิร์ฟพร้อมมะนาวและผักเคียง",
    image: "/images/ข้าวผัดกุ้ง.jpg",
  },
  {
    id: 2,
    name: "กะเพราหมูกรอบ",
    price: 40,
    description:
      "หมูกรอบจัดเต็ม ผัดกับพริกกระเทียมหอมๆ และใบกะเพราสด รสเผ็ดจัดจ้านถึงใจในแบบไทยแท้",
    image: "/images/กะเพราหมูกรอบ.jpg",
  },
  {
    id: 3,
    name: "ผัดไทยกุ้งสด",
    price: 40,
    description:
      "เส้นเหนียวนุ่ม ผัดคลุกซอสเข้มข้น พร้อมกุ้งสดตัวโต โรยถั่วลิสงบด เสิร์ฟร้อนๆ หอมเตะจมูก",
    image: "/images/ผัดไทยกุ้งสด.jpg",
  },
  {
    id: 4,
    name: "ข้าวไข่เจียวหมูสับ",
    price: 40,
    description:
      "ไข่เจียวฟูกรอบ หมูสับแน่นเต็มคำ เสิร์ฟบนข้าวสวยร้อนๆ กินง่าย อร่อยได้ทุกวัน",
    image: "/images/ข้าวไข่เจียวหมูสับ.png",
  },
  {
    id: 5,
    name: "ราดหน้าหมูหมัก",
    price: 40,
    description:
      "เส้นใหญ่เหนียวนุ่ม ราดซอสเข้มข้น กลมกล่อม พร้อมหมูหมักนุ่มละลายในปาก เสิร์ฟร้อนจานต่อจาน",
    image: "/images/ราดหน้าหมูหมัก.jpg",
  },
  {
    id: 6,
    name: "ข้าวหมูทอดกระเทียม",
    price: 50,
    description:
      "หมูทอดหมักเครื่องจนเข้าเนื้อ เจียวกระเทียมหอมๆ โรยหน้าแน่นๆ เสิร์ฟคู่ข้าวสวยร้อน",
    image: "/images/ข้าวหมูทอดกระเทียม.jpg",
  },
]);

const profile = await $liff.getProfile();
const userId = profile.userId;
const userName = profile.displayName;

const handleOrder = (menuItem) => {
  navigateTo(
    `/order?userId=${userId}&userName=${userName}&item=${menuItem.id}&name=${encodeURIComponent(menuItem.name)}&price=${menuItem.price}`
  );
};
</script>
