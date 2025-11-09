document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector("table tbody");
    const editModal = new bootstrap.Modal(document.getElementById("editImportModal"));
    const addModal = new bootstrap.Modal(document.getElementById("addImportModal"));

    let currentEditingRow = null;

    // ==================== MODAL SỬA ====================
    document.getElementById("saveEditBtn").addEventListener("click", function () {
        if (!currentEditingRow) return;

        const date = document.getElementById("editDate").value;
        const quantity = document.getElementById("editQuantity").value;
        const total = document.getElementById("editTotal").value;
        const status = document.getElementById("editStatus").value;

        if (!date || !quantity || !total || !status) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        currentEditingRow.cells[2].textContent = date;
        currentEditingRow.cells[3].textContent = quantity;
        currentEditingRow.cells[4].textContent = total;

        const badge = currentEditingRow.cells[5].querySelector("span");
        badge.textContent = status;
        badge.className = `badge rounded-pill px-3 py-2 ${getStatusClass(status)}`;

        editModal.hide();
        showToast("Cập nhật phiếu nhập thành công!");
        currentEditingRow = null;
    });

    // ==================== MODAL THÊM ====================
    document.getElementById("addImportBtn").addEventListener("click", () => {
        document.getElementById("addImportForm").reset();
        addModal.show();
    });

    document.getElementById("saveAddBtn").addEventListener("click", function () {
        const date = document.getElementById("addDate").value;
        const quantity = document.getElementById("addQuantity").value;
        const total = document.getElementById("addTotal").value;
        const status = document.getElementById("addStatus").value;

        if (!date || !quantity || !total || !status) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        // const newIndex = tableBody.rows.length + 1;
        // const code = `#PN${String(newIndex).padStart(3, '0')}`;

        // const newRow = document.createElement("tr");
        // newRow.innerHTML = `
        //     <td>${newIndex}</td>
        //     <td>${code}</td>
        //     <td>${date}</td>
        //     <td>${quantity}</td>
        //     <td>${total}</td>
        //     <td><span class="badge rounded-pill px-3 py-2 ${getStatusClass(status)}">${status}</span></td>
        //     <td>
        //         <button class="btn btn-sm btn-primary me-2 edit-import">Sửa</button>
        //         <button class="btn btn-sm btn-danger delete-import">Xóa</button>
        //     </td>
        // `;

        // tableBody.appendChild(newRow);
        addModal.hide();
        showToast("Thêm phiếu nhập thành công!");
        attachRowEvents(newRow);
    });

    // ==================== XỬ LÝ NÚT SỬA & XÓA ====================
    function attachRowEvents(row) {
        // Sửa
        row.querySelector(".edit-import").addEventListener("click", function () {
            const cells = row.cells;
            document.getElementById("editCode").value = cells[1].textContent;
            document.getElementById("editDate").value = cells[2].textContent;
            document.getElementById("editQuantity").value = cells[3].textContent;
            document.getElementById("editTotal").value = cells[4].textContent;
            document.getElementById("editStatus").value = cells[5].querySelector("span").textContent;

            currentEditingRow = row;
            editModal.show();
        });

        // Xóa
        row.querySelector(".delete-import").addEventListener("click", function () {
            const code = row.cells[1].textContent;
            if (confirm(`Xóa phiếu nhập ${code}?`)) {
                // row.remove();
                updateSTT();
                showToast("Đã xóa phiếu nhập!");
            }
        });
    }

    // Gắn sự kiện cho tất cả dòng
    document.querySelectorAll("tbody tr").forEach(attachRowEvents);

    // Cập nhật STT
    function updateSTT() {
        document.querySelectorAll("tbody tr").forEach((row, i) => {
            row.cells[0].textContent = i + 1;
            row.cells[1].textContent = `#PN${String(i + 1).padStart(3, '0')}`;
        });
    }

    // Lớp màu trạng thái
    function getStatusClass(status) {
        const map = {
            "Đang yêu cầu": "border-warning text-warning",
            "Đang xử lý": "border-info text-info",
            "Đang giao": "border-primary text-primary",
            "Hoàn thành": "border-success text-success",
            "Đã hủy": "border-danger text-danger"
        };
        return map[status] || "border-secondary text-secondary";
    }

    // Toast
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