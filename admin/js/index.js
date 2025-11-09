// ==================== Pagination ====================
// Lặp qua tất cả các pagination trong trang
document.querySelectorAll(".pagination").forEach((pagination) => {
    const pageItems = pagination.querySelectorAll(".page-item");
    const infoText = pagination.closest("nav").querySelector(".info-text");

    pagination.addEventListener("click", function (e) {
        e.preventDefault();
        const target = e.target.closest(".page-link");
        if (!target) return;

        const li = target.parentElement;
        if (li.classList.contains("disabled")) return;

        const pages = Array.from(pageItems).filter(
            (item) => !item.querySelector(".page-link").textContent.match(/[‹›]/)
        );

        const currentActive = pagination.querySelector(".page-item.active");
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

        // Cập nhật text thông tin
        const start = currentPage * 5 + 1;
        const end = Math.min(start + 4, 25);
        if (infoText) infoText.textContent = `Hiển thị ${start}–${end} của 25 thông tin`;
    });
});





document.getElementById("resetBtn").addEventListener("click", function () {
    const form = document.getElementById("filterForm");

    form.querySelectorAll('input[type="date"]').forEach((input) => {
        input.value = "";
    });

    const select = form.querySelector("select");
    if (select) {
        select.selectedIndex = 0;
    }
});