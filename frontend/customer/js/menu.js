const API = "http://localhost:5000/api/foods";

// Load menu
async function loadMenu() {
    const res = await fetch(API);
    const foods = await res.json();

    const box = document.getElementById("menuList");
    box.innerHTML = "";

    foods.forEach(food => {
        box.innerHTML += `
        <div class="bg-white p-6 shadow rounded">
            <h3 class="text-xl font-semibold">${food.name}</h3>
            <p class="text-gray-500 mb-2">${food.description}</p>
            <p class="font-bold mb-3">${food.price} đ</p>

            <button onclick="addToCart('${food._id}', '${food.name}', ${food.price})"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Thêm vào giỏ
            </button>
        </div>`;
    });
}

// Add to cart
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = cart.find(i => i.id === id);

    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Đã thêm vào giỏ!");
}

loadMenu();
