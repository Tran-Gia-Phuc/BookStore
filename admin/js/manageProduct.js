document.addEventListener("DOMContentLoaded", function () {
    // ==================== CÁC BIẾN CHUNG ====================
    const tableBody = document.querySelector("table tbody");
    const editModal = new bootstrap.Modal(document.getElementById("editProductModal"));
    const addModal = new bootstrap.Modal(document.getElementById("addProductModal"));

    // ==================== MODAL SỬA SẢN PHẨM ====================
    const currentImage = document.getElementById("currentProductImage");
    const previewImage = document.getElementById("previewImage");
    const fileInput = document.getElementById("productImage");
    const editForm = document.getElementById("editProductForm");

    // Xem trước ảnh khi sửa
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                previewImage.src = e.target.result;
                previewImage.classList.remove("d-none");
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.classList.add("d-none");
        }
    });

    // Lưu sửa
    document.getElementById("saveProductBtn").addEventListener("click", function () {
        editModal.hide();
        showToast("Cập nhật sản phẩm thành công!");
    });

    // ==================== MODAL THÊM SẢN PHẨM ====================
    const addFileInput = document.getElementById("addProductImage");
    const addPreview = document.getElementById("addPreviewImage");
    const addForm = document.getElementById("addProductForm");

    // Mở modal thêm
    document.getElementById("addProductBtn").addEventListener("click", () => {
        addForm.reset();
        addPreview.src = "";
        addPreview.classList.add("d-none");
        addModal.show();
    });

    // Xem trước ảnh khi thêm
    addFileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                addPreview.src = e.target.result;
                addPreview.classList.remove("d-none");
            };
            reader.readAsDataURL(file);
        } else {
            addPreview.classList.add("d-none");
        }
    });

    // Lưu thêm sản phẩm
    document.getElementById("saveAddProductBtn").addEventListener("click", function () {
        const name = document.getElementById("addProductName").value.trim();
        const author = document.getElementById("addProductAuthor").value.trim() || "Không rõ";
        const category = document.getElementById("addProductCategory").value.trim() || "Chưa phân loại";
        const price = document.getElementById("addProductPrice").value.trim() || "0₫";
        const quantity = document.getElementById("addProductQuantity").value || "0";
        const file = addFileInput.files[0];

        if (!name || !file) {
            alert("Vui lòng nhập tên sản phẩm và chọn ảnh!");
            return;
        }

        // Tạo URL ảnh tạm (frontend)
        const imageUrl = URL.createObjectURL(file);
        const today = new Date().toISOString().split('T')[0];
        const newIndex = tableBody.rows.length + 1;

        // Tạo dòng mới
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${newIndex}</td>
            <td>
                <div class="fw-bold">${name}</div>
                <small class="text-muted">${author}</small>
            </td>
            <td>${category}</td>
            <td><img src="${imageUrl}" width="60" class="rounded"></td>
            <td>${price}</td>
            <td>${quantity}</td>
            <td>${today}</td>
            <td>
                <button class="btn btn-sm btn-primary me-2 edit-category">Sửa</button>
                <button class="btn btn-sm btn-danger delete-category">Xóa</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        addModal.hide();
        showToast("Thêm sản phẩm thành công!");

        // Gắn lại sự kiện cho nút mới
        attachRowEvents(newRow);
    });

    // ==================== XỬ LÝ NÚT SỬA & XÓA ====================
    function attachRowEvents(row) {
        // Nút Sửa
        row.querySelector(".edit-category").addEventListener("click", function () {
            const cells = row.cells;

            editForm.productName.value = cells[1].querySelector(".fw-bold").textContent.trim();
            editForm.productCategory.value = cells[2].textContent.trim();
            editForm.productPrice.value = cells[4].textContent.trim();

            const imgSrc = cells[3].querySelector("img").src;
            currentImage.src = imgSrc;
            previewImage.classList.add("d-none");
            fileInput.value = "";

            editModal.show();
        });

        // Nút Xóa
        row.querySelector(".delete-category").addEventListener("click", function () {
            const name = row.cells[1].querySelector(".fw-bold").textContent.trim();
            if (confirm(`Xóa sản phẩm "${name}"?`)) {
                // row.remove();
                updateSTT();
                showToast("Đã xóa sản phẩm!");
            }
        });
    }

    // Gắn sự kiện cho tất cả dòng hiện có
    document.querySelectorAll("table tbody tr").forEach(attachRowEvents);

    // Cập nhật lại STT sau khi xóa
    function updateSTT() {
        document.querySelectorAll("table tbody tr").forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }

    // Toast chung
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
                <button type="button" class="ojn btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

        document.body.appendChild(toastEl);
        const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
        toast.show();
        toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
    }
});