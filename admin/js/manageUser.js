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

    // Lưu user (chỉ hiện thông báo)
    document.getElementById("saveUserBtn").addEventListener("click", function() {
        modal.hide();

        // Tạo toast thông báo
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

    // ==================== Pagination ====================
    const pagination = document.querySelector(".pagination");
    const pageItems = pagination.querySelectorAll(".page-item");
    const infoText = document.querySelector(".info-text");

    pagination.addEventListener("click", function (e) {
        e.preventDefault();
        const target = e.target.closest(".page-link");
        if (!target) return;

        const li = target.parentElement;
        if (li.classList.contains("disabled")) return;

        const currentActive = pagination.querySelector(".page-item.active");
        const pages = Array.from(pageItems).filter(
            (item) => !item.querySelector(".page-link").textContent.match(/[‹›]/)
        );

        let currentPage = pages.indexOf(currentActive);
        if (target.textContent === "‹" && currentPage > 0) {
            currentPage--;
        } else if (target.textContent === "›" && currentPage < pages.length - 1) {
            currentPage++;
        } else if (!["‹", "›"].includes(target.textContent)) {
            currentPage = parseInt(target.textContent) - 1;
        }

        pageItems.forEach((item) => item.classList.remove("active"));
        pages[currentPage].classList.add("active");

        pageItems[0].classList.toggle("disabled", currentPage === 0);
        pageItems[pageItems.length - 1].classList.toggle(
            "disabled",
            currentPage === pages.length - 1
        );

        const start = currentPage * 5 + 1;
        const end = Math.min(start + 4, 25); // cập nhật tổng số khách hàng nếu cần
        infoText.textContent = `Hiển thị ${start}–${end} của 25 khách hàng`;
    });
});
