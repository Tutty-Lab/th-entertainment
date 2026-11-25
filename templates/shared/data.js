// Dữ liệu sự kiện mẫu — sau này thay bằng API/CMS (Supabase/Sanity)
window.TH = {
  brand: "TH ENTERTAINMENT",
  slogan: "Giải Trí Không Biên Giới.",
  sub: "Kiến Tạo Trải Nghiệm. Kết Nối Cộng Đồng.",
  facebook: "https://www.facebook.com/thentertainment1988",
  stats: [
    { n: 15, s: "+", l: "Năm kinh nghiệm" },
    { n: 7, s: "", l: "Quốc gia" },
    { n: 300, s: "+", l: "Sự kiện" },
    { n: 50, s: "+", l: "Nghệ sĩ & DJ" },
  ],
  countries: ["Czech Republic", "Germany", "Poland", "United Kingdom", "Austria", "Slovakia", "Vietnam"],
  services: [
    ["Concert & Live Show", "Đại nhạc hội, liveshow, tour diễn với nghệ sĩ trong nước và quốc tế."],
    ["Music Festival", "Lễ hội âm nhạc đa thể loại, sự kiện ngoài trời quy mô lớn."],
    ["Artist Booking", "Kết nối & quản lý ca sĩ, rapper, DJ, MC, nhóm nhạc."],
    ["Nightlife & Club", "Đêm nhạc club, DJ showcase, party theo chủ đề cao cấp."],
    ["Cultural & Community", "Chương trình giao lưu văn hóa Việt Nam – châu Âu."],
    ["Corporate & Private", "Gala dinner, ra mắt thương hiệu, tiệc riêng."],
    ["Studio & Production", "Sản xuất âm nhạc, DJ programming, nội dung hình ảnh."],
  ],
  events: [
    { id: "blackout-prague", img: "../img/1.jpg", title: "BLACKOUT", sub: "Night Session Vol.07", date: "2026-12-19T22:00", city: "Prague", country: "CZ", venue: "Lucerna Music Bar", genre: "Club / K-Hiphop", status: "on-sale",
      tiers: [{ n: "General Admission", p: 25 }, { n: "VIP", p: 60 }, { n: "VVIP Table (6 pax)", p: 450 }] },
    { id: "nye-berlin", img: "../img/2.jpg", title: "NEW YEAR NOIR", sub: "Countdown 2027", date: "2026-12-31T21:00", city: "Berlin", country: "DE", venue: "Arena Berlin", genre: "Concert / EDM", status: "on-sale",
      tiers: [{ n: "General Admission", p: 45 }, { n: "VIP", p: 120 }, { n: "VVIP Table (8 pax)", p: 900 }] },
    { id: "monochrome-warsaw", img: "../img/3.jpg", title: "MONOCHROME", sub: "DJ Showcase", date: "2027-01-24T22:00", city: "Warsaw", country: "PL", venue: "Level 27", genre: "House / Techno", status: "few-left",
      tiers: [{ n: "General Admission", p: 20 }, { n: "VIP", p: 50 }] },
    { id: "vietnight-london", img: "../img/4.jpg", title: "VIET NIGHT", sub: "Live in London", date: "2027-02-14T19:00", city: "London", country: "UK", venue: "O2 Academy Islington", genre: "V-Pop Live", status: "sold-out",
      tiers: [{ n: "General Admission", p: 40 }, { n: "VIP Meet & Greet", p: 110 }] },
    { id: "spring-vienna", img: "../img/5.jpg", title: "BORDERLESS", sub: "Music Festival", date: "2027-04-18T16:00", city: "Vienna", country: "AT", venue: "Gasometer", genre: "Festival", status: "coming-soon",
      tiers: [{ n: "Day Pass", p: 55 }, { n: "VIP Pass", p: 140 }] },
    { id: "saigon-live", img: "../img/6.jpg", title: "HOMECOMING", sub: "Live Show", date: "2027-05-30T20:00", city: "Ho Chi Minh City", country: "VN", venue: "SECC Hall B", genre: "Concert", status: "coming-soon",
      tiers: [{ n: "GA", p: 30 }, { n: "VIP", p: 80 }, { n: "VVIP", p: 150 }] },
  ],
};
TH.hero = ["../img/7.jpg","../img/8.jpg","../img/9.jpg","../img/10.jpg","../img/11.jpg"];
TH.statusLabel = { "on-sale": "ON SALE", "few-left": "FEW LEFT", "sold-out": "SOLD OUT", "coming-soon": "COMING SOON" };
TH.fmtDate = (d, o = { day: "2-digit", month: "short", year: "numeric" }) => new Date(d).toLocaleDateString("en-GB", o).toUpperCase();
