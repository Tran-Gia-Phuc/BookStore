// ✅ navbar.js

document.addEventListener("click", function (e) {
  const searchBtn = e.target.closest("#searchBtn");
  if (!searchBtn) return; // Không bấm vào nút search thì bỏ qua

  e.preventDefault();

  // Tìm input hợp lệ gần nhất trong navbar (linh hoạt hơn)
  const searchInput =
    document.querySelector("#searchInput") ||
    document.querySelector("#searchInput2");

  const query = searchInput ? searchInput.value.trim() : "";

  if (!query) {
    alert("⚠️ Vui lòng nhập từ khóa cần tìm!");
    return;
  }

  // ✅ Nếu trang hiện tại là index.html → chuyển tới search.html
  // ✅ Nếu trang hiện tại là cart.html → vẫn chuyển được bình thường
  const currentPage = window.location.pathname.split("/").pop();
  const targetPage =
    currentPage.includes("search2") || currentPage.includes("index2")
      ? "search2.html"
      : "search.html";

  window.location.href = `${targetPage}?q=${encodeURIComponent(query)}`;
});
