const order = JSON.parse(localStorage.getItem("lastOrder"));
const el = document.getElementById("orderInfo");

if (!order) {
    el.innerHTML = "<p>Không tìm thấy đơn hàng.</p>";
} else {
    el.innerHTML = `
        <p><strong>Mã đơn:</strong> ${order._id}</p>
        <p><strong>Tổng tiền:</strong> ${order.totalPrice} đ</p>
        <p><strong>Ngày tạo:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
    `;
}
