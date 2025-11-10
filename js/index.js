// ---------------- Pagination ----------------
const pagination = document.querySelector(".pagination");
const pageItems = pagination.querySelectorAll(".page-item");
const infoText = document.querySelector(".info-text");

document.querySelectorAll(".pagination a").forEach(a => {
  a.addEventListener("click", e => e.preventDefault());
});

pagination.addEventListener("click", function (e) {
  const target = e.target.closest(".page-link");
  if (!target) return; // chỉ xử lý khi click vào thẻ a
  e.preventDefault(); // chặn hành vi mặc định sau khi chắc chắn là click vào link

  const li = target.parentElement;
  if (li.classList.contains("disabled")) return;

  const currentActive = pagination.querySelector(".page-item.active");
  const pages = Array.from(pageItems).filter(
    item => !item.querySelector(".page-link").textContent.match(/[‹›]/)
  );
  let currentPage = pages.indexOf(currentActive);

  if (target.textContent === "‹" && currentPage > 0) {
    currentPage--;
  } else if (target.textContent === "›" && currentPage < pages.length - 1) {
    currentPage++;
  } else if (!["‹", "›"].includes(target.textContent)) {
    currentPage = parseInt(target.textContent) - 1;
  }

  pageItems.forEach(item => item.classList.remove("active"));
  pages[currentPage].classList.add("active");

  pageItems[0].classList.toggle("disabled", currentPage === 0);
  pageItems[pageItems.length - 1].classList.toggle(
    "disabled",
    currentPage === pages.length - 1
  );

  const start = currentPage * 5 + 1;
  const end = Math.min(start + 4, 100);
  infoText.textContent = `Hiển thị ${start}–${end} `;
});
 

 // ---------------- Filter Buttons (Lọc danh mục) ----------------
const filterButtons = document.querySelectorAll(".filter-btn");
const books = document.querySelectorAll(".col-md-3[data-category]");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category");

    // Thay đổi nút đang active
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Ẩn/hiện sách
    books.forEach(book => {
      if (category === "all" || book.dataset.category === category) {
        book.style.display = "block";
      } else {
        book.style.display = "none";
      }
    });
  });
});


// ---------------- Book Actions ----------------
document.addEventListener("DOMContentLoaded", function () {
  // Nút xem chi tiết
  document.querySelectorAll(".view-detail").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "./detail.html";
    });
  });

  // Nút mua ngay
  document.querySelectorAll(".buy-now").forEach(btn => {
    btn.addEventListener("click", () => {
      alert("🎉 Mua thành công! Cảm ơn bạn đã ủng hộ ❤️");
    });
  });
    document.querySelectorAll(".view-detail2").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "./login.html";
    });
  });

  // Nút mua ngay (buy-now2)
  document.querySelectorAll(".buy-now2").forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "./login.html";
    });
  });
});

 
const input = document.getElementById('advancedSearchInput');
  const popup = document.getElementById('advancedSearchPopup');
  const saveBtn = document.getElementById('saveAdvancedSearch');

  // Hiện/ẩn popup khi click vào input
  input.addEventListener('click', () => {
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });

  // Click ra ngoài đóng popup
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !popup.contains(e.target)) {
      popup.style.display = 'none';
    }
  });

  // Nút Lưu reload trang
  saveBtn.addEventListener('click', () => {
    location.reload();
  });