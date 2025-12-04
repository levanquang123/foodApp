const API = "http://localhost:5000/api/orders";

async function loadOrders() {
    const res = await fetch(API);
    const orders = await res.json();

    const list = document.getElementById("orderList");
    list.innerHTML = "";

    orders.forEach(order => {
        const itemsText = order.items
            .map(i => `${i.foodId.name} (x${i.quantity})`)
            .join(", ");

        list.innerHTML += `
            <tr class="border-b">
                <td class="p-3">${itemsText}</td>
                <td class="p-3 text-center">${order.totalPrice} đ</td>
                <td class="p-3 text-center">${new Date(order.createdAt).toLocaleString()}</td>
            </tr>
        `;
    });
}

loadOrders();
