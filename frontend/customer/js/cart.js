const API_ORDER = "http://localhost:5000/api/orders";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ========== LOAD CART ==========
function loadCart() {
    const table = document.getElementById("cartTable");
    const totalEl = document.getElementById("totalPrice");

    table.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        table.innerHTML += `
        <tr class="border-b">
            <td class="p-3">${item.name}</td>

            <td class="p-3 text-center flex gap-2 justify-center">
                <button onclick="changeQty(${index}, -1)" class="bg-gray-300 px-2 rounded">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)" class="bg-gray-300 px-2 rounded">+</button>
            </td>

            <td class="p-3 text-center">${item.price * item.quantity} đ</td>

            <td class="p-3 text-center">
                <button onclick="removeItem(${index})" class="bg-red-500 text-white px-2 rounded">X</button>
            </td>
        </tr>`;
    });

    totalEl.innerText = total + " đ";
}

// ========== CHANGE QUANTITY ==========
function changeQty(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ========== REMOVE ITEM ==========
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ========== PLACE ORDER ==========
async function placeOrder() {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
    }

    const orderData = {
        items: cart.map(item => ({
            foodId: item.id,
            quantity: item.quantity
        })),
        totalPrice: cart.reduce((sum, x) => sum + x.price * x.quantity, 0)
    };

    const res = await fetch(API_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    });

    const result = await res.json();

    // Lưu order cho trang checkout
    localStorage.setItem("lastOrder", JSON.stringify(result.order));

    // Xóa giỏ hàng
    localStorage.removeItem("cart");

    // Chuyển sang trang thanh toán
    window.location.href = "checkout.html";
}

loadCart();
