const API_FOOD = "http://localhost:5000/api/foods";
const API_CAT = "http://localhost:5000/api/categories";

// Load categories in dropdown
async function loadCategories() {
    const res = await fetch(API_CAT);
    const cats = await res.json();

    const select = document.getElementById("foodCategory");
    select.innerHTML = "";

    cats.forEach(c => {
        select.innerHTML += `<option value="${c._id}">${c.name}</option>`;
    });
}

// Load list of foods
async function loadFoods() {
    const res = await fetch(API_FOOD);
    const foods = await res.json();

    const list = document.getElementById("foodList");
    list.innerHTML = "";

    foods.forEach(f => {
        list.innerHTML += `
            <tr class="border-b">
                <td class="p-3">${f.name}</td>
                <td class="p-3">${f.price.toLocaleString()}đ</td>
                <td class="p-3">${f.description}</td>
                <td class="p-3">${f.categoryId ? f.categoryId.name : "Không có"}</td>

                <td class="p-3 text-center space-x-2">
                    <button onclick="deleteFood('${f._id}')"
                        class="bg-red-500 text-white px-3 py-1 rounded">
                        Xóa
                    </button>
                </td>
            </tr>
        `;
    });
}

// Add food
async function addFood() {
    const name = document.getElementById("foodName").value;
    const price = document.getElementById("foodPrice").value;
    const description = document.getElementById("foodDesc").value;
    const categoryId = document.getElementById("foodCategory").value;

    if (!name || !price) return alert("Tên món và giá không được để trống");

    await fetch(API_FOOD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, price, description, categoryId
        })
    });

    // Clear inputs
    document.getElementById("foodName").value = "";
    document.getElementById("foodPrice").value = "";
    document.getElementById("foodDesc").value = "";

    loadFoods();
}

// Delete food
async function deleteFood(id) {
    await fetch(`${API_FOOD}/${id}`, { method: "DELETE" });
    loadFoods();
}

// Initialize
loadCategories();
loadFoods();
