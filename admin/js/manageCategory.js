document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-category");
    const modal = new bootstrap.Modal(document.getElementById("editCategoryModal"));
    const saveBtn = document.getElementById("saveCategoryBtn");

    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            document.getElementById("categoryName").value = row.cells[1].innerText;
            document.getElementById("categoryQuantity").value = row.cells[2].innerText;
            document.getElementById("categoryDescription").value = row.cells[3].innerText;
            modal.show();
        });
    });

    saveBtn.addEventListener("click", () => {
        const name = document.getElementById("categoryName").value;
        const quantity = document.getElementById("categoryQuantity").value;
        const desc = document.getElementById("categoryDescription").value;

        alert(`Danh mục "${name}" với số lượng ${quantity} đã được lưu thành công!`);
        modal.hide();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-category");
    const deleteButtons = document.querySelectorAll(".delete-category");
    const modal = new bootstrap.Modal(document.getElementById("editCategoryModal"));
    const saveBtn = document.getElementById("saveCategoryBtn");

    // Chỉnh sửa danh mục
    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            document.getElementById("categoryName").value = row.cells[1].innerText;
            document.getElementById("categoryQuantity").value = row.cells[2].innerText;
            document.getElementById("categoryDescription").value = row.cells[3].innerText;
            modal.show();
        });
    });

    saveBtn.addEventListener("click", () => {
        const name = document.getElementById("categoryName").value;
        const quantity = document.getElementById("categoryQuantity").value;
        const desc = document.getElementById("categoryDescription").value;

        alert(`Danh mục "${name}" với số lượng ${quantity} đã được lưu thành công!`);
        modal.hide();
    });

    // Xóa danh mục
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            const categoryName = row.cells[1].innerText;
            if (confirm(`Bạn có chắc muốn xóa danh mục "${categoryName}" không?`)) {
                row.remove();
                alert(`Danh mục "${categoryName}" đã được xóa thành công!`);
            }
        });
    });
});
