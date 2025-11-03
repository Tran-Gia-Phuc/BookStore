document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit-product");
    const modal = new bootstrap.Modal(document.getElementById("editProductModal"));
    const saveBtn = document.getElementById("saveProductBtn");

    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            document.getElementById("productName").value = row.cells[1].innerText;
            document.getElementById("productCategory").value = row.cells[2].innerText;
            document.getElementById("productCost").value = row.cells[3].innerText;
            document.getElementById("productPrice").value = row.cells[4].innerText;

            modal.show();
        });
    });

    saveBtn.addEventListener("click", () => {
        const name = document.getElementById("productName").value;
        const category = document.getElementById("productCategory").value;
        const cost = document.getElementById("productCost").value;
        const price = document.getElementById("productPrice").value;

        // Thông báo lưu thành công
        alert(`Sản phẩm "${name}" đã được lưu thành công!`);

        modal.hide();
    });
});
