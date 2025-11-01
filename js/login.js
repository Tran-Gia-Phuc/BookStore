// Kiểm tra mật khẩu trùng khớp khi đăng ký
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");
  const errorMsg = document.getElementById("passwordError");

  form.addEventListener("submit", function (event) {
    if (password.value !== confirmPassword.value) {
      event.preventDefault(); // Chặn gửi form
      errorMsg.style.display = "block"; // Hiện thông báo
      confirmPassword.classList.add("is-invalid");
    } else {
      errorMsg.style.display = "none";
      confirmPassword.classList.remove("is-invalid");
    }
  });

  // Ẩn lỗi khi người dùng đang gõ lại
  confirmPassword.addEventListener("input", function () {
    if (password.value === confirmPassword.value) {
      errorMsg.style.display = "none";
      confirmPassword.classList.remove("is-invalid");
    }
  });
});
