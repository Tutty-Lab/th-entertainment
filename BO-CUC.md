# TH ENTERTAINMENT — Bố cục & Dàn ý website

**Định hướng:** Nightlife / Concert / K-pop ticketing. Tông **đen – trắng – xám** (monochrome), cảm hứng YG Entertainment: typography cực lớn, nhiều khoảng đen, chuyển động mạnh nhưng tối giản, ảnh grayscale.
**Mục tiêu:** Giới thiệu thương hiệu + **cập nhật sự kiện** + **đặt vé** (giống trang bán vé show K-pop).

---

## 1. Sitemap

```
/                 Trang chủ
/events           Danh sách sự kiện (lọc theo quốc gia / thể loại / tháng)
/events/:slug     Chi tiết sự kiện + chọn hạng vé + đặt vé
/checkout         Thanh toán (Stripe / PayPal / chuyển khoản)
/tickets          Vé của tôi (QR code)
/artists          Nghệ sĩ & DJ roster
/about            Về TH Entertainment (tầm nhìn, thế mạnh, cam kết)
/services         7 lĩnh vực hoạt động + form booking nghệ sĩ / B2B
/contact          Liên hệ, mạng xã hội
/admin            CMS: tạo/sửa sự kiện, hạng vé, số lượng, check-in QR
```

## 2. Bố cục trang chủ (wireframe theo thứ tự)

| # | Section | Nội dung | Motion |
|---|---------|----------|--------|
| 0 | **Intro loader** | Logo TH chớp sáng + âm thanh bass (ElevenLabs SFX) | Fade/strobe 1.5s |
| 1 | **Header** | Logo · Events · Artists · About · Services · Contact · nút **BUY TICKETS** · EN/VI/CZ | Sticky, blur khi scroll |
| 2 | **Hero** | Sự kiện nổi bật: tên show cực lớn, ngày, thành phố, countdown, CTA “Đặt vé” | Text reveal, video/ảnh grayscale parallax |
| 3 | **Marquee** | “GIẢI TRÍ KHÔNG BIÊN GIỚI — ENTERTAINMENT WITHOUT BORDERS —” | Chạy ngang vô tận |
| 4 | **Upcoming Events** | Grid / list kiểu “World Tour”: ngày · thành phố · venue · trạng thái (On sale / Sold out / Coming soon) | Stagger khi scroll |
| 5 | **About ngắn** | 15+ năm · 7 quốc gia · DJ riêng · Studio | Counter số chạy |
| 6 | **Services** | 7 lĩnh vực (Concert, Festival, Booking, Nightlife, Cultural, Corporate, Studio) | Hover đảo màu đen/trắng |
| 7 | **Network map** | CZ · DE · PL · UK · AT · SK · VN | Điểm sáng nhấp nháy |
| 8 | **Artists / DJ** | Ảnh grayscale, hover hiện màu/tên | Hover zoom |
| 9 | **Newsletter / Presale** | Đăng ký nhận presale code | — |
| 10 | **Footer** | Slogan, social (Facebook, Instagram, TikTok), pháp lý | — |
| — | **Booking modal** | Chọn hạng vé (GA / VIP / VVIP Table) · số lượng · tổng tiền → Checkout | Slide-in |

## 3. Dàn ý nội dung (copy)

1. **Hero:** “TH ENTERTAINMENT — Giải Trí Không Biên Giới. Kiến Tạo Trải Nghiệm. Kết Nối Cộng Đồng.”
2. **Giới thiệu:** đơn vị tổ chức sự kiện & sản xuất giải trí quốc tế, 15+ năm, cầu nối nghệ sĩ – khán giả – đối tác.
3. **Tầm nhìn:** thương hiệu giải trí quốc tế có sức ảnh hưởng; “giải trí không có biên giới”.
4. **Lĩnh vực hoạt động (7):** Concert & Live Show · Music & Entertainment Festival · Artist Booking & Management · Nightlife & Club Events · Cultural & Community Events · Corporate & Private Events · Studio & Music Production.
5. **Mạng lưới quốc tế:** Séc, Đức, Ba Lan, Anh, Áo, Slovakia, Việt Nam.
6. **Thế mạnh (9 gạch đầu dòng)** → dạng grid số.
7. **Dấu ấn văn hóa:** cầu nối nghệ thuật Việt Nam ↔ châu Âu.
8. **Cam kết:** ý tưởng xứng tầm, nghệ sĩ phù hợp, quy trình chuyên nghiệp.

## 4. Luồng đặt vé (giống bên show K-pop)

```
Event card → Event detail → Chọn hạng vé + số lượng → (Đăng nhập/Email)
→ Thanh toán → Email xác nhận + QR vé → Check-in tại cửa (admin quét QR)
```
Tính năng thêm: presale code, giới hạn vé/người, hàng chờ (queue) khi mở bán, trạng thái SOLD OUT realtime.

## 5. Đề xuất kỹ thuật (giai đoạn production)

- **Frontend:** Next.js + GSAP/Framer Motion (motion), Tailwind.
- **CMS/DB:** Supabase hoặc Sanity (quản lý sự kiện), admin tự đăng event.
- **Thanh toán:** Stripe (EUR/CZK) + VNPay/MoMo nếu bán vé VN.
- **Âm thanh/Voice:** ElevenLabs — SFX intro, nhạc nền ambient, voice-over giới thiệu sự kiện (EN/VI/CZ).

## 6. 5 template mẫu (thư mục `templates/`)

| # | Tên | Phong cách |
|---|-----|-----------|
| 01 | **MONOLITH** | Đen tuyền, chữ khổng lồ kiểu YG, marquee, grid event |
| 02 | **STROBE** | Nền trắng editorial, hiệu ứng chớp strobe, event cuộn ngang |
| 03 | **GRAIN** | Xám film-grain, split-screen, countdown lớn |
| 04 | **WORLD TOUR** | Poster tour K-pop: bảng lịch diễn theo thành phố |
| 05 | **NOIR GLITCH** | Glitch text, spotlight theo con trỏ, reveal khi scroll |
