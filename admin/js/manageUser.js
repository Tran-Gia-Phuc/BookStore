document.addEventListener("DOMContentLoaded", function() {
    // ==================== Modal chỉnh sửa user ====================
    const editButtons = document.querySelectorAll("table tbody tr button.btn-primary");
    const modalElement = document.getElementById("editUserModal");
    const modal = new bootstrap.Modal(modalElement);
    const form = document.getElementById("editUserForm");

    editButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const row = btn.closest("tr");

            // Điền dữ liệu row vào modal
            form.userName.value = row.cells[1].querySelector(".fw-bold").textContent;
            form.userEmail.value = row.cells[1].querySelector("small").textContent;
            form.userPhone.value = row.cells[3].textContent;
            form.userAddress.value = row.cells[4].textContent;
            form.userStatus.value = row.cells[7].querySelector("button").textContent;

            modal.show();
        });
    });

    document.getElementById("saveUserBtn").addEventListener("click", function() {
        modal.hide();

        const toast = document.createElement("div");
        toast.className = "toast align-items-center text-bg-success border-0 show";
        toast.setAttribute("role", "alert");
        toast.style.position = "fixed";
        toast.style.top = "1rem";
        toast.style.right = "1rem";
        toast.style.zIndex = 1055;
        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    Cập nhật thông tin khách hàng thành công!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    });
});
