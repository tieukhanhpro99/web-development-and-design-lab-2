# Lab 2 — Figma to Code, Layouts & Responsive Design

Bài 5: **Responsive Landing Page**, xây dựng trang VibeTech theo thiết kế e-commerce được liên kết trong trang 14 của `Lab 2.pdf`.

- Website: https://tieukhanhpro99.github.io/web-development-and-design-lab-2/
- Figma: https://www.figma.com/design/ZJ8VO4OBkr6HNWOLq75zKr/e-commerce?node-id=0-1

## Chạy bài

Mở `index.html` trực tiếp bằng trình duyệt, hoặc chạy tại thư mục này:

```sh
python3 -m http.server 8000
```

Truy cập http://localhost:8000. Không cần cài thư viện hoặc build.

## Nội dung

| File | Chức năng |
| --- | --- |
| `index.html` | Bài 5: landing page VibeTech, 8 sản phẩm |
| `styles.css` | CSS mobile-first, Flexbox, Grid, media queries, hover |
| `landing.js` | Menu mobile, lọc Deals, xem chi tiết và giỏ hàng demo |
| `assets/` | Ảnh cục bộ, SVG logo và ghi chú nguồn |
| `exercise1.html`, `exercise1.css` | Bài 1 được giữ nguyên |
| `excercise2.html`, `excercise2.css`, `script.js` | Bài 2 được giữ nguyên |
| `excercise3.html`, `excercise3.css` | Bài 3 được giữ nguyên |
| `Lab 2.pdf` | Đề bài |

## Đối chiếu yêu cầu bài 5

1. **Thiết kế:** bố cục, thương hiệu VibeTech, nội dung, tên và giá của 8 sản phẩm được tái hiện theo canvas Figma công khai. **Giới hạn:** phiên khách không export/inspect được tài nguyên gốc. Ảnh sản phẩm sử dụng ảnh minh họa thay thế từ Unsplash lưu trong `assets/`; logo SVG được vẽ lại, màu và font được suy ra bằng quan sát. Vì vậy yêu cầu tải ảnh/icon/màu trực tiếp từ Figma chưa được đáp ứng hoàn toàn. Xem `assets/README.md` để biết nguồn.
2. **Navbar:** Flexbox, `position: sticky`, nền trong suốt và `backdrop-filter`, hover dạng kính.
3. **Grid:** CSS Grid hiển thị 8 thẻ sản phẩm.
4. **Responsive:** 1 cột dưới 640px, 2 cột từ 640px, 4 cột từ 1024px; menu thu gọn dưới 768px.
5. **Hover:** ảnh zoom, caption fade-in, thẻ nâng nhẹ; hỗ trợ `:focus-visible` và `prefers-reduced-motion`.
6. **Deployment:** GitHub Pages, nhánh `main`, thư mục gốc `/`; `.nojekyll` cho website tĩnh.

## Tương tác

- **Products** hiển thị toàn bộ sản phẩm; **Deals** lọc 2 sản phẩm gắn nhãn Sale.
- Nhấn ảnh để xem chi tiết, **Add to Cart** để thêm sản phẩm.
- Biểu tượng túi mở giỏ hàng, hiển thị số lượng, tổng tiền và cho xóa sản phẩm.
- Giỏ hàng chỉ tồn tại trong phiên trang hiện tại; đây là demo, không thanh toán hay tạo đơn hàng.
- Dialog hỗ trợ Escape, khôi phục focus; menu mobile có `aria-expanded` và đóng khi chọn liên kết.
- Footer dẫn đến các bài 1–3.

## Kiểm tra

Đã kiểm tra trực tiếp bằng trình duyệt ở 375px, 768px và 1280px: lưới 1/2/4 cột, không tràn ngang, đủ 8 ảnh, menu mobile mở/đóng, bộ lọc Deals, giỏ hàng thêm/xóa và tổng tiền. Kiểm tra cú pháp: `node --check landing.js`.

Các file hệ thống `.DS_Store`, thư viện `node_modules/` được bỏ qua bằng `.gitignore`.
