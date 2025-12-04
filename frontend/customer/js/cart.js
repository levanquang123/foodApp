function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const table = document.getElementById("cartTable");
    const totalText = document.getElementById("total");

    table.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        table.innerHTML += `
        <tr class="border-b">
            <td class="p-3">${item.name}</td>

            <td class="p-3 text-center">
                <button onclick="changeQty(${index}, -1)" class="px-2 bg-gray-300">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button onclick="changeQty(${index}, 1)" class="px-2 bg-gray-300">+</button>
            </td>

            <td class="p-3 text-center">${item.price * item.quantity} đ</td>

            <td class="p-3 text-center">
                <button onclick="removeItem(${index})" class="bg-red-500 text-white px-3 py-1 rounded">X</button>
            </td>
        </tr>`;
    });

    totalText.innerText = total + " đ";
}

function changeQty(index, diff) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += diff;

    if (cart[index].quantity <= 0) cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

loadCart();
