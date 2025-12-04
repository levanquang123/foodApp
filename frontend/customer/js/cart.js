const API_ORDER = "http://localhost:5000/api/orders";
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= LOAD CART =================
function loadCart() {
    const table = document.getElementById("cartTable");
    const totalEl = document.getElementById("total");

    let total = 0;
    table.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        table.innerHTML += `
            <tr class="border-b">
                <td class="p-3">${item.name}</td>

                <td class="p-3 text-center flex items-center justify-center gap-3">
                    <button class="px-2 bg-gray-300 rounded" onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="px-2 bg-gray-300 rounded" onclick="changeQty(${index}, 1)">+</button>
                </td>

                <td class="p-3 text-center">${item.price * item.quantity} đ</td>

                <td class="p-3 text-center">
                    <button onclick="removeItem(${index})" 
                        class="bg-red-500 text-white px-2 rounded">X</button>
                </td>
            </tr>
        `;
    });

    totalEl.innerText = total + " đ";
    localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) cart.splice(index, 1);

    loadCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    loadCart();
}

// ========== PLACE ORDER ==========
async function placeOrder() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống!");
        return;
    }

    const orderData = {
        items: cart.map(item => ({
            foodId: item.id,
            quantity: item.quantity
        })),
        totalPrice: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    const res = await fetch(API_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData)
    });

    const data = await res.json();

    if (!data.order) {
        alert("Lỗi tạo đơn hàng!");
        return;
    }

    localStorage.setItem("lastOrder", JSON.stringify(data.order));
    localStorage.removeItem("cart");

    window.location.href = "checkout.html";
}

loadCart();
