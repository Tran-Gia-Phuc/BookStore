const pagination = document.querySelector(".pagination");
const pageItems = pagination.querySelectorAll(".page-item");
const infoText = document.querySelector(".info-text");


document.querySelectorAll('.pagination a').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});



pagination.addEventListener("click", function (e) {
    const target = e.target.closest(".page-link");
    if (!target) return; // chỉ xử lý khi click vào thẻ a

    e.preventDefault(); // chặn hành vi mặc định sau khi chắc chắn là click vào link

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
    const end = Math.min(start + 4, 100);
    infoText.textContent = `Hiển thị ${start}–${end} của 15 khách hàng`;
});

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const searchInput2 = document.getElementById("searchInput2");

  // Ngăn reload form
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();  

    const query = searchInput ? searchInput.value.trim() : "";
    const query2 = searchInput2 ? searchInput2.value.trim() : "";

    if (query) {
      window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    } else if (query2) {
      window.location.href = `search2.html?q=${encodeURIComponent(query2)}`;
    } else {
      alert("Vui lòng nhập từ khóa cần tìm!");
    }
  });
});


const buttons = document.querySelectorAll('.filter-btn');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
