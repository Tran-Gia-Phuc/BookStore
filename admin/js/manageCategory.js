document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("table tbody");
    const editModal = new bootstrap.Modal(document.getElementById("editCategoryModal"));
    const addModal = new bootstrap.Modal(document.getElementById("addCategoryModal"));

    let currentEditingRow = null;

    // ==================== MODAL SỬA ====================
    document.getElementById("saveCategoryBtn").addEventListener("click", function () {
        if (!currentEditingRow) return;

        const name = document.getElementById("categoryName").value.trim();
        const quantity = document.getElementById("categoryQuantity").value || "0";
        const desc = document.getElementById("categoryDescription").value.trim() || "Chưa có mô tả";

        if (!name) {
            alert("Tên danh mục không được để trống!");
            return;
        }

        // currentEditingRow.cells[1].textContent = name;
        // currentEditingRow.cells[2].textContent = quantity;
        // currentEditingRow.cells[3].textContent = desc;

        editModal.hide();
        showToast("Cập nhật danh mục thành công!");
        currentEditingRow = null; 
    });

    // ==================== MODAL THÊM ====================
    document.getElementById("addCategoryBtn").addEventListener("click", () => {
        document.getElementById("addCategoryForm").reset();
        addModal.show();
    });

    document.getElementById("saveAddCategoryBtn").addEventListener("click", function () {
        const name = document.getElementById("addCategoryName").value.trim();
        const quantity = document.getElementById("addCategoryQuantity").value || "0";
        const desc = document.getElementById("addCategoryDescription").value.trim() || "Chưa có mô tả";

        if (!name) {
            alert("Vui lòng nhập tên danh mục!");
            return;
        }

        // const today = new Date().toISOString().split('T')[0];
        // const newIndex = tableBody.rows.length + 1;

        // const newRow = document.createElement("tr");
        // newRow.innerHTML = `
        //     <td>${newIndex}</td>
        //     <td>${name}</td>
        //     <td>${quantity}</td>
        //     <td>${desc}</td>
        //     <td>${today}</td>
        //     <td>
        //         <button class="btn btn-sm btn-primary me-2 edit-category">Sửa</button>
        //         <button class="btn btn-sm btn-danger delete-category">Xóa</button>
        //     </td>
        // `;

        // tableBody.appendChild(newRow);
        addModal.hide();
        showToast("Thêm danh mục thành công!");

        attachRowEvents(newRow); // Gắn sự kiện cho dòng mới
    });

    // ==================== XỬ LÝ NÚT SỬA & XÓA ====================
    function attachRowEvents(row) {
        // Nút Sửa
        const editBtn = row.querySelector(".edit-category");
        editBtn.addEventListener("click", function () {
            const cells = row.cells;

            document.getElementById("categoryName").value = cells[1].textContent;
            document.getElementById("categoryQuantity").value = cells[2].textContent;
            document.getElementById("categoryDescription").value = cells[3].textContent;

            // Lưu dòng đang sửa vào biến tạm
            currentEditingRow = row;

            editModal.show();
        });

        // Nút Xóa
        const deleteBtn = row.querySelector(".delete-category");
        deleteBtn.addEventListener("click", function () {
            const name = row.cells[1].textContent;
            if (confirm(`Xóa danh mục "${name}"?`)) {
                // row.remove();
                updateSTT();
                showToast("Đã xóa danh mục!");
            }
        });
    }

    // Gắn sự kiện cho tất cả dòng hiện có
    document.querySelectorAll("tbody tr").forEach(attachRowEvents);

    // Cập nhật STT sau khi xóa
    function updateSTT() {
        document.querySelectorAll("tbody tr").forEach((row, i) => {
            row.cells[0].textContent = i + 1;
        });
    }

    // Toast thông báo
    function showToast(message) {
        const toastEl = document.createElement("div");
        toastEl.className = "toast align-items-center text-bg-success border-0";
        toastEl.setAttribute("role", "alert");
        toastEl.style.position = "fixed";
        toastEl.style.top = "1rem";
        toastEl.style.right = "1rem";
        toastEl.style.zIndex = "1055";

        toastEl.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.body.appendChild(toastEl);
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
        toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    }
});