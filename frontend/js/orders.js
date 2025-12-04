const FOOD_API = "http://localhost:5000/api/foods";
const ORDER_API = "http://localhost:5000/api/orders";

let cart = [];

// Load món ăn
async function loadFoods() {
  const res = await fetch(FOOD_API);
  const foods = await res.json();

  const list = document.getElementById("foodList");
  list.innerHTML = "";

  foods.forEach(f => {
    list.innerHTML += `
      <div class="p-4 bg-white rounded shadow">
        <h3 class="text-lg font-bold">${f.name}</h3>
        <p class="text-gray-600">${f.description || ""}</p>
        <p class="mt-2 font-semibold">${f.price} đ</p>
        <button onclick="addToCart('${f._id}', '${f.name}', ${f.price})"
          class="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Thêm vào giỏ
        </button>
      </div>
    `;
  });
}

// Thêm vào giỏ hàng
function addToCart(id, name, price) {
  const item = cart.find(i => i.foodId === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ foodId: id, name, price, quantity: 1 });
  }
  renderCart();
}

// Render giỏ hàng
function renderCart() {
  const list = document.getElementById("cartList");
  list.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    list.innerHTML += `
      <tr class="border-b">
        <td class="p-3">${item.name}</td>
        <td class="p-3">
          <button onclick="changeQty(${index}, -1)" class="px-2">-</button>
          ${item.quantity}
          <button onclick="changeQty(${index}, 1)" class="px-2">+</button>
        </td>
        <td class="p-3">${item.price * item.quantity} đ</td>
        <td class="p-3">
          <button onclick="removeItem(${index})" class="bg-red-500 text-white px-2 rounded">X</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("total").innerText = total;
}

// Tăng / giảm số lượng
function changeQty(index, delta) {
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

// Xoá 1 món khỏi giỏ
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Tạo đơn hàng
async function createOrder() {
  if (cart.length === 0) return alert("Giỏ hàng trống!");

  const body = {
    items: cart.map(i => ({
      foodId: i.foodId,
      quantity: i.quantity
    })),
    totalPrice: cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  };

  await fetch(ORDER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  alert("Tạo đơn hàng thành công!");
  cart = [];
  renderCart();
  loadOrders();
}

// Load danh sách order
async function loadOrders() {
  const res = await fetch(ORDER_API);
  const orders = await res.json();

  const list = document.getElementById("orderList");
  list.innerHTML = "";

  orders.forEach(o => {
    const items = o.items.map(i => `${i.foodId.name} (x${i.quantity})`).join(", ");

    list.innerHTML += `
      <tr class="border-b">
        <td class="p-3">${items}</td>
        <td class="p-3">${o.totalPrice} đ</td>
        <td class="p-3">${new Date(o.createdAt).toLocaleString()}</td>
      </tr>
    `;
  });
}

// Load data khi mở trang
loadFoods();
loadOrders();
