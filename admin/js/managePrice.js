document.addEventListener("DOMContentLoaded", function() {
    // Chọn tất cả bảng trong tab category và product
    const tables = document.querySelectorAll("#category table, #product table");

    tables.forEach(table => {
        table.querySelectorAll("tbody tr").forEach(row => {
            const editBtn = row.querySelector("button");
            const profitCell = row.cells[row.cells.length - 2]; // ô % lợi nhuận

            editBtn.addEventListener("click", function() {
                if (editBtn.textContent === "Sửa") {
                    // Chuyển ô lợi nhuận thành input
                    const currentValue = profitCell.textContent.replace("%", "");
                    profitCell.innerHTML = `<input type="number" min="0" max="100" value="${currentValue}" class="form-control" style="width:80px">`;
                    editBtn.textContent = "Lưu";
                } else {
                    // Lưu giá trị tạm thời
                    const input = profitCell.querySelector("input");
                    let newValue = parseFloat(input.value);
                    if (isNaN(newValue) || newValue < 0) newValue = 0;
                    if (newValue > 100) newValue = 100;
                    profitCell.textContent = newValue + "%";
                    editBtn.textContent = "Sửa";

                    // Lưu tạm vào dataset của row (có thể dùng để gửi lên server)
                    row.dataset.profit = newValue;
                    console.log(`Lưu tạm: ${row.cells[1].textContent} = ${newValue}%`);
                }
            });
        });
    });
});
