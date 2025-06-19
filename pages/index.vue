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
const menuItems = ref([
  {
    id: 1,
    name: "Margherita Pizza",
    price: 50,
    description:
      "Classic pizza with fresh tomatoes, mozzarella cheese, and basil leaves on a crispy thin crust.",
    image:
      "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Grilled Salmon",
    price: 40,
    description:
      "Fresh Atlantic salmon grilled to perfection, served with lemon butter sauce and seasonal vegetables.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Chicken Caesar Salad",
    price: 40,
    description:
      "Crisp romaine lettuce, grilled chicken breast, parmesan cheese, croutons with our homemade Caesar dressing.",
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Beef Burger Deluxe",
    price: 40,
    description:
      "Juicy beef patty with lettuce, tomato, cheese, pickles, and our special sauce on a brioche bun.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Pasta Carbonara",
    price: 40,
    description:
      "Creamy pasta with pancetta, eggs, parmesan cheese, and black pepper. A Roman classic!",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    price: 50,
    description:
      "Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.",
    image:
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Fish Tacos",
    price: 13.99,
    description:
      "Grilled fish with fresh salsa, cabbage slaw, and lime crema in soft corn tortillas.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Mushroom Risotto",
    price: 16.99,
    description:
      "Creamy arborio rice with mixed mushrooms, white wine, and parmesan cheese.",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Thai Green Curry",
    price: 14.99,
    description:
      "Aromatic green curry with coconut milk, vegetables, and your choice of protein, served with jasmine rice.",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
  },
]);

const handleOrder = (menuItem) => {
  navigateTo(
    `/order?item=${menuItem.id}&name=${encodeURIComponent(menuItem.name)}&price=${menuItem.price}`
  );
};
</script>
