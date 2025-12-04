const API_MENU = "http://localhost:5000/api/foods";

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// LOAD MENU
async function loadMenu() {
    const res = await fetch(API_MENU);
    const foods = await res.json();

    const list = document.getElementById("menuList");
    list.innerHTML = "";

    foods.forEach(food => {
        list.innerHTML += `
        <div class="bg-white p-5 shadow rounded">
            <h2 class="text-xl font-bold">${food.name}</h2>
            <p class="text-gray-600">${food.description || ""}</p>
            <p class="mt-2 font-semibold">${food.price} đ</p>

            <button onclick="addToCart('${food._id}', '${food.name}', ${food.price})"
                class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Thêm vào giỏ
            </button>
        </div>`;
    });
}

function addToCart(id, name, price) {
    let found = cart.find(x => x.id === id);

    if (found) {
        found.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ!");
}

loadMenu();
