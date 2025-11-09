const products = [
  { id: 1, name: "Tuổi Trẻ Đáng Giá Bao Nhiêu", cost: 95000, profit: 35 },
  { id: 2, name: "Đắc Nhân Tâm", cost: 86000, profit: 28 },
  { id: 3, name: "Người Thầy", cost: 99000, profit: 40 },
  { id: 4, name: "Trên Đường Băng", cost: 75000, profit: 32 },
  { id: 5, name: "Nhà Giả Kim", cost: 120000, profit: 25 },
  { id: 6, name: "Dấu Chân Trên Cát", cost: 68000, profit: 30 },
  { id: 7, name: "Sapiens: Lược Sử Loài Người", cost: 180000, profit: 45 },
  { id: 8, name: "Tư Duy Nhanh Và Chậm", cost: 210000, profit: 38 }
];

const categories = [
  "Phát triển bản thân",
  "Kỹ năng sống",
  "Truyền cảm hứng",
  "Phát triển cá nhân",
  "Văn học nước ngoài",
  "Văn học thiếu nhi",
  "Khoa học",
  "Tâm lý học"
];

const formatPrice = (price) => new Intl.NumberFormat('vi-VN').format(price) + 'đ';


function populateSelects() {
  ['catSelect', 'catSelectProd', 'catSelectPrice'].forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">-- Chọn danh mục --</option>';
    categories.forEach(cat => {
      const opt = new Option(cat, cat);
      select.appendChild(opt);
    });
  });

  ['prodSelect', 'prodSelectPrice'].forEach(id => {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = '<option value="">-- Chọn sản phẩm --</option>';
    products.forEach(p => {
      const opt = new Option(p.name, p.id);
      select.appendChild(opt);
    });
  });
}

function updateSellingPrice(row) {
  const profitCell = row.querySelector('.profit-cell');
  const id = profitCell.dataset.id;
  const profit = parseFloat(profitCell.textContent.trim());

  if (isNaN(profit) || profit < 0) return;

  const prod = products.find(p => p.id == id);
  if (!prod) return;

  prod.profit = profit;
  const sellingPrice = Math.round(prod.cost * (1 + profit / 100));
  const priceCell = row.cells[6]; // cột "Giá bán" ở Tab 3
  if (priceCell) {
    priceCell.textContent = formatPrice(sellingPrice);
  }
}

// XỬ LÝ NÚT LƯU
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-save')) {
    const row = e.target.closest('tr');
    const cell = row.querySelector('.profit-cell');
    const newProfit = parseFloat(cell.textContent.trim());

    if (isNaN(newProfit) || newProfit < 0) {
      alert('Vui lòng nhập số hợp lệ ≥ 0');
      return;
    }

    const type = cell.dataset.type;
    const id = cell.dataset.id;

    if (type === 'category') {
      const catName = cell.dataset.name;
      // Cập nhật tất cả sản phẩm cùng danh mục
      products.forEach(p => {
        const prodRow = document.querySelector(`#tableProdProfit tr td:nth-child(2):contains('${p.name}')`)?.closest('tr');
        if (prodRow && prodRow.cells[4].textContent === catName) {
          p.profit = newProfit;
          const profitCell = prodRow.querySelector('.profit-cell');
          if (profitCell) profitCell.textContent = newProfit;
        }
      });
      // Cập nhật bảng giá bán
      document.querySelectorAll('#tablePriceLookup tbody tr').forEach(tr => {
        const name = tr.cells[1].querySelector('.fw-bold')?.textContent;
        const prod = products.find(p => p.name === name);
        if (prod && tr.cells[3].textContent === catName) {
          tr.querySelector('.profit-cell').textContent = newProfit;
          updateSellingPrice(tr);
        }
      });
    } else {
      // Cập nhật sản phẩm
      const prod = products.find(p => p.id == id);
      if (prod) {
        prod.profit = newProfit;
        updateSellingPrice(row);
      }
    }

    // Thông báo
    if (typeof showToast === 'function') {
      showToast('Lưu tỷ lệ lợi nhuận thành công!', 'success');
    } else {
      alert('Lưu thành công!');
    }
  }
});

// KHỞI TẠO
document.addEventListener('DOMContentLoaded', () => {
  populateSelects();
});