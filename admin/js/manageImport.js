document.addEventListener("DOMContentLoaded", function () {
    const editModal = new bootstrap.Modal(document.getElementById("editImportModal"));
    const addModal = new bootstrap.Modal(document.getElementById("addImportModal"));

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