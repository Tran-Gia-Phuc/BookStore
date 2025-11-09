document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", price: 80000 },
        { id: 2, name: "Đắc Nhân Tâm", author: "Dale Carnegie", price: 70000 },
        { id: 3, name: "Người Thầy", author: "Nguyễn Chí Vịnh", price: 85000 },
        { id: 4, name: "Trên Đường Băng", author: "Tony Buổi Sáng", price: 65000 },
        { id: 5, name: "Nhà Giả Kim", author: "Paulo Coelho", price: 100000 }
    ];

    const tbody = document.getElementById("importTable").querySelector("tbody");
    const productSelect = document.getElementById("productSelect");
    const searchInput = document.getElementById("searchProduct");
    let cart = [];
    let rowCount = 0;

    function loadProducts(filter = "") {
        productSelect.innerHTML = "";
        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(filter.toLowerCase()) ||
            p.author.toLowerCase().includes(filter.toLowerCase())
        );
        filtered.forEach(p => {
            const opt = document.createElement("option");
            opt.value = p.id;
            opt.textContent = `${p.name} - ${p.author} (${formatPrice(p.price)}₫)`;
            productSelect.appendChild(opt);
        });
    }
    loadProducts();

    searchInput.addEventListener("input", () => loadProducts(searchInput.value));

    document.getElementById("addToCart").addEventListener("click", () => {
        const selected = productSelect.value;
        if (!selected) return alert("Vui lòng chọn sản phẩm!");

        const product = products.find(p => p.id == selected);
        if (cart.some(item => item.id === product.id)) {
            return alert("Sản phẩm đã có trong phiếu!");
        }

        rowCount++;
        const row = document.createElement("tr");
        row.dataset.id = product.id;
        row.innerHTML = `
                    <td>${rowCount}</td>
                    <td>
                        <div class="fw-bold">${product.name}</div>
                        <small class="text-muted">${product.author}</small>
                    </td>
                    <td><input type="number" class="form-control form-control-sm qty" min="1" value="1"></td>
                    <td><input type="number" class="form-control form-control-sm price" value="${product.price}" readonly></td>
                    <td class="subtotal text-end">${formatPrice(product.price)}₫</td>
                    <td><button type="button" class="btn btn-sm btn-danger remove-row">Xóa</button></td>
                `;
        tbody.appendChild(row);

        cart.push({ ...product, quantity: 1 });
        updateTotals();

        row.querySelector(".remove-row").addEventListener("click", () => {
            cart = cart.filter(item => item.id != product.id);
            row.remove();
            updateSTT();
            updateTotals();
        });

        row.querySelector(".qty").addEventListener("input", function () {
            const qty = parseInt(this.value) || 1;
            const item = cart.find(i => i.id == product.id);
            if (item) item.quantity = qty;
            updateTotals();
        });
    });

    function updateSTT() {
        rowCount = 0;
        tbody.querySelectorAll("tr").forEach((r, i) => {
            r.cells[0].textContent = i + 1;
            rowCount = i + 1;
        });
    }

    function updateTotals() {
        let totalProds = cart.length;
        let totalQty = cart.reduce((s, i) => s + i.quantity, 0);
        let totalAmt = cart.reduce((s, i) => s + (i.quantity * i.price), 0);

        tbody.querySelectorAll("tr").forEach(row => {
            const id = row.dataset.id;
            const item = cart.find(i => i.id == id);
            if (item) {
                const subtotal = item.quantity * item.price;
                row.querySelector(".qty").value = item.quantity;
                row.querySelector(".subtotal").textContent = formatPrice(subtotal) + "₫";
            }
        });

        document.getElementById("totalProducts").textContent = totalProds;
        document.getElementById("totalQuantity").textContent = totalQty;
        document.getElementById("totalAmount").textContent = formatPrice(totalAmt) + "₫";
    }

    function formatPrice(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    document.getElementById("addImportForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const date = document.getElementById("importDate").value;
        if (!date || cart.length === 0) {
            return alert("Vui lòng nhập ngày và chọn ít nhất 1 sản phẩm!");
        }

        showToast("Thêm phiếu nhập thành công!");
        setTimeout(() => {
            window.location.href = "managerImport.html";
        }, 1500);
    });

    function showToast(msg) {
        const toast = document.createElement("div");
        toast.className = "toast align-items-center text-bg-success border-0";
        toast.style.position = "fixed"; toast.style.top = "1rem"; toast.style.right = "1rem"; toast.style.zIndex = "1055";
        toast.innerHTML = `<div class="d-flex"><div class="toast-body">${msg}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
        document.body.appendChild(toast);
        new bootstrap.Toast(toast, { delay: 3000 }).show();
        toast.addEventListener('hidden.bs.toast', () => toast.remove());
    }
});