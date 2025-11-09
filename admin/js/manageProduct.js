document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("table tbody");
    const editModal = new bootstrap.Modal(document.getElementById("editProductModal"));
    const addModal = new bootstrap.Modal(document.getElementById("addProductModal"));

    // ==================== MODAL SỬA SẢN PHẨM ====================
    const currentImage = document.getElementById("currentProductImage");
    const previewImage = document.getElementById("previewImage");
    const fileInput = document.getElementById("productImage");
    const editForm = document.getElementById("editProductForm");

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

    document.getElementById("saveProductBtn").addEventListener("click", function () {
        editModal.hide();
        showToast("Cập nhật sản phẩm thành công!");
    });

    // ==================== MODAL THÊM SẢN PHẨM ====================
    const addFileInput = document.getElementById("addProductImage");
    const addPreview = document.getElementById("addPreviewImage");
    const addForm = document.getElementById("addProductForm");

    document.getElementById("addProductBtn").addEventListener("click", () => {
        addForm.reset();
        addPreview.src = "";
        addPreview.classList.add("d-none");
        addModal.show();
    });

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

    document.getElementById("saveAddProductBtn").addEventListener("click", function () {
        const name = document.getElementById("addProductName").value.trim();
        const file = addFileInput.files[0];

        if (!name || !file) {
            alert("Vui lòng nhập tên sản phẩm và chọn ảnh!");
            return;
        }
        addModal.hide();
        showToast("Thêm sản phẩm thành công!");
    });

    // ==================== XỬ LÝ NÚT SỬA & XÓA ====================
    function attachRowEvents(row) {
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

        row.querySelector(".delete-category").addEventListener("click", function () {
            const name = row.cells[1].querySelector(".fw-bold").textContent.trim();
            if (confirm(`Xóa sản phẩm "${name}"?`)) {
                // row.remove();
                updateSTT();
                showToast("Đã xóa sản phẩm!");
            }
        });
    }

    document.querySelectorAll("table tbody tr").forEach(attachRowEvents);

    function updateSTT() {
        document.querySelectorAll("table tbody tr").forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }

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