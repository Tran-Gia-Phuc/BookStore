document.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.getElementById("editBtn");
  const modal = document.getElementById("editModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const form = document.getElementById("editForm");

  // 🟢 Mở form
  editBtn.addEventListener("click", () => {
    modal.classList.remove("d-none");
  });

  // 🔴 Đóng form
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("d-none");
  });

  // ✅ Lưu thông tin (demo)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("✅ Cập nhật thông tin thành công!");
    modal.classList.add("d-none");
  });

  // 🟣 Đóng khi click ngoài form
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("d-none");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector(".btn-outline-danger");

  logoutBtn.addEventListener("click", () => {
    window.location.href = "./index2.html";
  });
});
