// ✅ Load navbar
fetch('./navbar.html')
  .then(res => res.text())
  .then(html => document.getElementById('navbar-container').innerHTML = html);

document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const orders = document.querySelectorAll(".order-item");

  // ✅ Lọc trạng thái đơn hàng
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const status = btn.dataset.status;
      orders.forEach((order) => {
        order.style.display = status === "all" || order.dataset.status === status ? "block" : "none";
      });
    });
  });

  // ✅ Thông tin người nhận từng đơn
  const orderInfo = {
    MB1001: { name: "Nguyễn Văn A", address: "123 Lê Lợi, Q.1, TP.HCM", total: "490,000₫" },
    MB1002: { name: "Trần Thị B", address: "45 Trần Hưng Đạo, Q.5, TP.HCM", total: "290,000₫" },
    MB1003: { name: "Phạm Văn C", address: "99 Nguyễn Huệ, Q.1, TP.HCM", total: "150,000₫" },
  };

  const modal = new bootstrap.Modal(document.getElementById("orderDetailModal"));
  const receiverName = document.getElementById("receiverName");
  const receiverAddress = document.getElementById("receiverAddress");
  const orderTotal = document.getElementById("orderTotal");
  const detailContent = document.getElementById("order-detail-content");

  // ✅ Xem chi tiết từng đơn
  document.querySelectorAll(".view-detail").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card-body");
      const orderId = card.querySelector(".card-title").textContent.match(/#(MB\d+)/)[1];
      const info = orderInfo[orderId] || { name: "-", address: "-", total: "-" };

      receiverName.textContent = info.name;
      receiverAddress.textContent = info.address;
      orderTotal.textContent = info.total;

      detailContent.innerHTML = "";
      card.querySelectorAll(".book-item").forEach((item) => {
        const img = item.querySelector("img").src;
        const title = item.querySelector(".fw-bold").textContent;
        const price = item.querySelector("small").textContent;
        detailContent.innerHTML += `
          <div class="d-flex align-items-center border rounded p-2 mb-2">
            <img src="${img}" width="50" class="me-2 rounded" alt="">
            <div>
              <p class="mb-0 fw-bold">${title}</p>
              <small>${price}</small>
            </div>
          </div>
        `;
      });

      modal.show();
    });
  });

  // ✅ Mở modal nếu có query param ?open=MB1001
  const params = new URLSearchParams(window.location.search);
  const openOrder = params.get("open"); // ví dụ MB1001
  if (openOrder) {
    const card = Array.from(document.querySelectorAll(".order-item .card-title"))
      .find(el => el.textContent.includes(openOrder))
      ?.closest(".card-body");

    if (card) {
      const info = orderInfo[openOrder] || { name: "-", address: "-", total: "-" };
      receiverName.textContent = info.name;
      receiverAddress.textContent = info.address;
      orderTotal.textContent = info.total;

      detailContent.innerHTML = "";
      card.querySelectorAll(".book-item").forEach((item) => {
        const img = item.querySelector("img").src;
        const title = item.querySelector(".fw-bold").textContent;
        const price = item.querySelector("small").textContent;
        detailContent.innerHTML += `
          <div class="d-flex align-items-center border rounded p-2 mb-2">
            <img src="${img}" width="50" class="me-2 rounded" alt="">
            <div>
              <p class="mb-0 fw-bold">${title}</p>
              <small>${price}</small>
            </div>
          </div>
        `;
      });

      modal.show();
    }
  }
});
