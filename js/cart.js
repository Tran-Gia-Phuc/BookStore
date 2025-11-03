document.addEventListener("DOMContentLoaded", () => {
  const addAddressBtn = document.getElementById("addAddressBtn");
  const newAddressForm = document.getElementById("newAddressForm");
  const oldAddressSelect = document.getElementById("oldAddress");

  function updateTotal() {
    let total = 0;
    document.querySelectorAll("#cart-body tr").forEach(row => {
      const priceText = row.children[3].textContent.replace(/[₫,.]/g, "").trim();
      const quantity = parseInt(row.querySelector("input[type='number']").value);
      const price = parseInt(priceText);
      total += price * quantity;
    });
    document.getElementById("total-price").textContent =
      total.toLocaleString("vi-VN") + "₫";
  }

  // ✅ Xóa sản phẩm
  document.querySelectorAll(".btn-danger").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest("tr").remove();
      updateTotal();
      alert("🗑 Đã xóa sản phẩm khỏi giỏ hàng!");
    });
  });

  // ✅ Thay đổi số lượng
  document.querySelectorAll("#cart-body input[type='number']").forEach(input => {
    input.addEventListener("input", updateTotal);
  });

  // ✅ Toggle thêm địa chỉ mới
  addAddressBtn.addEventListener("click", () => {
    newAddressForm.classList.toggle("d-none");
    if (newAddressForm.classList.contains("d-none")) {
      addAddressBtn.textContent = "➕ Thêm địa chỉ mới";
      addAddressBtn.classList.remove("btn-danger");
      addAddressBtn.classList.add("btn-outline-primary");
    } else {
      addAddressBtn.textContent = "❌ Hủy thêm địa chỉ";
      addAddressBtn.classList.remove("btn-outline-primary");
      addAddressBtn.classList.add("btn-danger");
    }
  });

  // ✅ Lưu địa chỉ mới
  const saveBtn = newAddressForm.querySelector("button[type='button']");
  saveBtn.addEventListener("click", () => {
    const name = newAddressForm.querySelector("input[placeholder='Nhập họ tên người nhận']").value.trim();
    const phone = newAddressForm.querySelector("input[placeholder='Nhập số điện thoại']").value.trim();
    const address = newAddressForm.querySelector("textarea").value.trim();

    if (!name || !phone || !address) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const fullAddress = `${name} - ${phone} - ${address}`;
    const option = document.createElement("option");
    option.textContent = fullAddress;
    option.value = fullAddress;
    oldAddressSelect.appendChild(option);
    oldAddressSelect.value = fullAddress;

    newAddressForm.reset();
    newAddressForm.classList.add("d-none");
    addAddressBtn.textContent = "➕ Thêm địa chỉ mới";
    addAddressBtn.classList.remove("btn-danger");
    addAddressBtn.classList.add("btn-outline-primary");

    alert("✅ Đã lưu địa chỉ mới!");
  });

  // ✅ Tính tổng khi vừa tải trang
  updateTotal();
});

const checkoutBtn = document.querySelector(".btn-success.mt-3"); // nút thanh toán
checkoutBtn.addEventListener("click", () => {
  // Lưu thông tin muốn mở modal trong URL (vd: order.html?open=MB1001)
  window.location.href = "./order.html?open=MB1001";
});
