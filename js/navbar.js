// ✅ navbar.js

// --- Xử lý nút tìm kiếm ---
document.addEventListener("click", function (e) {
  const searchBtn = e.target.closest("#searchBtn");
  if (!searchBtn) return; // Không bấm vào nút search thì bỏ qua

  e.preventDefault();

  // Tìm input hợp lệ gần nhất trong navbar
  const searchInput =
    document.querySelector("#searchInput") ||
    document.querySelector("#searchInput2");

  const query = searchInput ? searchInput.value.trim() : "";

  if (!query) {
    alert("⚠️ Vui lòng nhập từ khóa cần tìm!");
    return;
  }

  // Xác định trang đích
  const currentPage = window.location.pathname.split("/").pop();
  const targetPage =
    currentPage.includes("search2") || currentPage.includes("index2")
      ? "search2.html"
      : "search.html";

  window.location.href = `${targetPage}?q=${encodeURIComponent(query)}`;
});

// --- Xử lý highlight menu ---
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  // Click vào menu → highlight link vừa click
  navLinks.forEach(link => {
    link.addEventListener("click", function () {
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Khi load trang → highlight đúng theo file hiện tại
  const currentPage = window.location.pathname.split("/").pop();

  navLinks.forEach(link => {
    const hrefFile = link.getAttribute("href")?.split("/").pop(); // Lấy tên file cuối cùng
    if (hrefFile === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
