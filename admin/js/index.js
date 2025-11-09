///biểu đồ
const monthlyRevenue = [820, 950, 1100, 1050, 1200, 1300, 1150, 1080, 980, 900, 850, 780];
const recentOrders = [45, 38, 52, 41, 39];
const topBooks = [
    { name: "Atomic Habits", sold: 180 },
    { name: "The Psychology of Money", sold: 150 },
    { name: "Rich Dad Poor Dad", sold: 120 },
    { name: "Think and Grow Rich", sold: 95 },
    { name: "How to Win Friends", sold: 80 }
];
const inventoryByCategory = [
    { category: "Phát triển bản thân", stock: 245 },
    { category: "Kỹ năng sống", stock: 180 },
    { category: "Kinh doanh", stock: 120 },
    { category: "Văn học", stock: 95 },
    { category: "Thiếu nhi", stock: 80 }
];

new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
        labels: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
        datasets: [{
            label: 'Doanh thu ($)',
            data: monthlyRevenue,
            borderColor: '#198754',
            backgroundColor: 'rgba(25, 135, 84, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    options: { responsive: true, plugins: { legend: { position: 'top' } } }
});

new Chart(document.getElementById('ordersChart'), {
    type: 'bar',
    data: {
        labels: ['Hôm qua', 'Hôm kia', '3 ngày trước', '4 ngày trước', '5 ngày trước'],
        datasets: [{
            label: 'Số đơn',
            data: recentOrders,
            backgroundColor: '#198754'
        }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
});

new Chart(document.getElementById('topBooksChart'), {
    type: 'doughnut',
    data: {
        labels: topBooks.map(b => b.name),
        datasets: [{
            data: topBooks.map(b => b.sold),
            backgroundColor: ['#198754', '#2ea664', '#45b876', '#66c88a', '#88d3a0']
        }]
    },
    options: { responsive: true, plugins: { legend: { position: 'right' } } }
});

new Chart(document.getElementById('inventoryChart'), {
    type: 'polarArea',
    data: {
        labels: inventoryByCategory.map(i => i.category),
        datasets: [{
            data: inventoryByCategory.map(i => i.stock),
            backgroundColor: ['#198754', '#2ea664', '#45b876', '#66c88a', '#88d3a0']
        }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
});



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

///Biểu đồ 
