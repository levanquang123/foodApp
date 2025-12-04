const API = "http://localhost:5000/api/categories";

// Load categories
async function loadCategories() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("categoryList");
    list.innerHTML = "";

    data.forEach(c => {
        list.innerHTML += `
        <tr class="border-b">
            <td class="p-3">${c.name}</td>
            <td class="p-3 text-center">
                <button onclick="deleteCategory('${c._id}')"
                    class="bg-red-500 text-white px-3 py-1 rounded">
                    Xóa
                </button>
            </td>
        </tr>`;
    });
}

async function addCategory() {
    const name = document.getElementById("categoryName").value;
    if (!name) return alert("Nhập tên danh mục");

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    });

    document.getElementById("categoryName").value = "";
    loadCategories();
}

async function deleteCategory(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadCategories();
}

loadCategories();
