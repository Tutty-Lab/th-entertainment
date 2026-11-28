// Các section nội dung đầy đủ (từ profile TH Entertainment), dùng chung cho mọi template.
// Template đặt biến CSS: --bg --fg --mut --line --card --disp (font tiêu đề) và gọi renderSections("#more")
(function () {
  const strengths = [
    "Hơn 15 năm kinh nghiệm trong ngành giải trí",
    "Mạng lưới nghệ sĩ và đối tác booking quốc tế rộng lớn",
    "Dàn nghệ sĩ độc quyền và hệ thống cộng tác chuyên nghiệp",
    "Đội ngũ DJ riêng với nhiều phong cách âm nhạc",
    "Studio và năng lực sản xuất sáng tạo",
    "Hệ thống đối tác địa điểm và thỏa thuận hợp tác venue",
    "Kinh nghiệm triển khai đa dạng loại hình sự kiện",
    "Khả năng kết nối và sản xuất chương trình xuyên quốc gia",
    "Mạng lưới mạnh tại thị trường giải trí châu Âu và Việt Nam",
  ];
  const artists = [
    ["DJ NOIR", "Resident DJ · House / Techno", 3], ["MC LUNA", "Host · EN / VI / CZ", 6], ["DJ KAI", "K-Hiphop / Open format", 1],
    ["THE MONO", "Live band", 5], ["SORA", "Vocalist · V-Pop", 2], ["DJ VEX", "EDM / Big room", 8],
  ];
  const faq = [
    ["Mua vé như thế nào?", "Chọn sự kiện → chọn hạng vé → thanh toán online. Vé điện tử (QR) được gửi qua email ngay sau khi thanh toán."],
    ["Có được hoàn / đổi vé không?", "Vé không hoàn tiền trừ khi sự kiện bị hủy. Có thể chuyển nhượng tên vé trước sự kiện 48h."],
    ["Giới hạn độ tuổi?", "Sự kiện club / nightlife dành cho khách từ 18 tuổi, xuất trình giấy tờ tùy thân tại cửa."],
    ["Tôi muốn booking nghệ sĩ / hợp tác?", "Gửi thông tin qua form liên hệ bên dưới, đội ngũ sẽ phản hồi trong 24h."],
  ];
  const img = (n) => `../img/${n}.jpg`;

  const css = `
  .ms{padding:120px 32px;border-top:1px solid var(--line);color:var(--fg)}
  .ms .k{letter-spacing:.3em;font-size:12px;color:var(--mut);margin-bottom:20px;text-transform:uppercase}
  .ms h2.t{font:clamp(44px,7vw,110px)/.92 var(--disp);margin:0 0 48px;text-transform:uppercase}
  .ms h2.t em{font-style:normal;color:var(--mut)}
  .ms p.lead{font-size:clamp(18px,1.6vw,24px);line-height:1.55;max-width:900px;color:var(--fg);opacity:.85}
  .two{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
  .ph{position:relative;overflow:hidden;aspect-ratio:4/5;background:var(--card)}
  .ph img{width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.1);transition:transform 1.2s}.ph:hover img{transform:scale(1.05)}
  .quote{font:clamp(28px,3.4vw,52px)/1.15 var(--disp);margin:32px 0;text-transform:uppercase}
  .net{display:grid;grid-template-columns:repeat(7,1fr);border:1px solid var(--line)}
  .net div{padding:28px 18px;border-right:1px solid var(--line);position:relative;min-height:200px;display:flex;flex-direction:column;justify-content:space-between;transition:.3s}
  .net div:last-child{border-right:0}.net div:hover{background:var(--fg);color:var(--bg)}
  .net b{font:clamp(40px,4vw,64px)/1 var(--disp)}.net span{font-size:12px;letter-spacing:.15em;color:var(--mut)}
  .net i{position:absolute;top:22px;right:18px;width:8px;height:8px;border-radius:50%;background:var(--fg);animation:png 2s infinite}
  @keyframes png{0%{box-shadow:0 0 0 0 rgba(255,255,255,.6)}100%{box-shadow:0 0 0 14px rgba(255,255,255,0)}}
  .str{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line)}
  .str div{background:var(--bg);padding:32px;min-height:180px;display:flex;flex-direction:column;justify-content:space-between}
  .str b{font:48px/1 var(--disp);color:var(--mut)}.str p{margin:0;font-size:17px;line-height:1.45}
  .art{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
  .art .ph{aspect-ratio:3/4}.art .ph:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.85),transparent 55%)}
  .art .ph div{position:absolute;left:16px;bottom:14px;z-index:1;color:#fff}.art b{font:26px/1 var(--disp);display:block}.art small{font-size:11px;color:#aaa;letter-spacing:.08em}
  .art .ph:hover img{filter:grayscale(0)}
  .gal{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:260px 260px;gap:8px}
  .gal .ph{aspect-ratio:auto}.gal .ph:first-child{grid-row:span 2}
  .proc{display:grid;grid-template-columns:repeat(4,1fr);gap:32px}
  .proc div{border-top:2px solid var(--fg);padding-top:24px}.proc b{font:64px/1 var(--disp);color:var(--mut)}.proc h4{font:28px var(--disp);margin:16px 0 8px;text-transform:uppercase}.proc p{color:var(--mut);line-height:1.55;margin:0}
  .faq details{border-bottom:1px solid var(--line);padding:24px 0}.faq summary{font:clamp(20px,2vw,28px) var(--disp);cursor:pointer;list-style:none;display:flex;justify-content:space-between;text-transform:uppercase}
  .faq summary:after{content:"+"}.faq details[open] summary:after{content:"–"}.faq p{color:var(--mut);max-width:760px;line-height:1.6}
  .news{display:grid;grid-template-columns:1.2fr 1fr;gap:48px;align-items:end;background:var(--fg);color:var(--bg);padding:80px 32px}
  .news h2{font:clamp(40px,6vw,96px)/.92 var(--disp);margin:0;text-transform:uppercase}
  .news form{display:flex;border-bottom:2px solid var(--bg)}.news input{flex:1;background:none;border:0;padding:18px 0;font-size:18px;color:var(--bg);outline:0}
  .news button{background:var(--bg);color:var(--fg);border:0;padding:0 28px;font-weight:800;letter-spacing:.2em;cursor:pointer}
  .ct{display:grid;grid-template-columns:1fr 1.2fr;gap:64px}
  .ct dl{margin:0}.ct dt{font-size:11px;letter-spacing:.3em;color:var(--mut);margin-top:28px}.ct dd{margin:6px 0 0;font-size:20px}
  .ct form{display:grid;grid-template-columns:1fr 1fr;gap:16px}.ct input,.ct select,.ct textarea{background:transparent;border:1px solid var(--line);color:var(--fg);padding:16px;font:inherit}
  .ct textarea,.ct .full{grid-column:1/-1}.ct textarea{min-height:140px}
  .ct button{grid-column:1/-1;background:var(--fg);color:var(--bg);border:0;padding:18px;font-weight:800;letter-spacing:.25em;cursor:pointer}
  @media(max-width:900px){.two,.news,.ct{grid-template-columns:1fr}.net{grid-template-columns:repeat(2,1fr)}.net div{border-bottom:1px solid var(--line)}
  .str,.proc{grid-template-columns:1fr}.art{grid-template-columns:repeat(2,1fr)}.gal{grid-template-columns:1fr 1fr;grid-template-rows:auto}.gal .ph{aspect-ratio:1}.gal .ph:first-child{grid-row:auto;grid-column:span 2}
  .ms,.news{padding:80px 16px}.ct form{grid-template-columns:1fr}}`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  window.renderSections = function (sel, only) {
    const S = {
      about: `<section class="ms" id="about"><div class="two"><div>
        <h2 class="t">Giải trí<br><em>không biên giới.</em></h2>
        <p class="lead">TH Entertainment là đơn vị tổ chức sự kiện và sản xuất giải trí quốc tế với hơn 15 năm kinh nghiệm, chuyên xây dựng và triển khai những chương trình giải trí đa dạng, sáng tạo và quy mô.</p>
        <p class="lead">Sở hữu mạng lưới kết nối tại châu Âu, Việt Nam và các thị trường quốc tế, chúng tôi là cầu nối giữa nghệ sĩ, khán giả, đội ngũ sản xuất và đối tác trong ngành.</p></div>
        <div class="ph rv"><img src="${img(10)}"></div></div></section>`,
      vision: `<section class="ms" id="vision"><div class="two"><div class="ph rv"><img src="${img(8)}"></div><div>
        <p class="quote">“Âm nhạc, nghệ thuật và trải nghiệm trực tiếp có sức mạnh kết nối các nền văn hóa, cộng đồng và thế hệ.”</p>
        <p class="lead">Trở thành một trong những thương hiệu tổ chức sự kiện và giải trí quốc tế có sức ảnh hưởng — được ghi nhận bởi sự sáng tạo, chất lượng sản xuất và mạng lưới kết nối xuyên quốc gia. Một nền tảng nơi nghệ sĩ phát triển, khán giả được kết nối và những chương trình đặc sắc được hiện thực hóa.</p></div></div></section>`,
      network: `<section class="ms" id="network"><div class="network-layout">
        <div class="network-copy"><h2 class="t">Châu Âu<br><em>Việt Nam</em></h2><p class="lead">Kết nối nghệ sĩ, khán giả và năng lực sản xuất để hiện thực hóa những sân khấu xuyên biên giới</p></div>
        <figure class="geographic-map rv"><img src="../img/network-map.svg" width="1200" height="570" alt="Bản đồ thế giới với Việt Nam được tô cam và bản đồ chi tiết châu Âu đánh dấu Anh, Đức, Ba Lan, Séc, Áo, Slovakia" loading="lazy"><figcaption><a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">Natural Earth</a></figcaption></figure>
        </div><ul class="market-list" aria-label="Các quốc gia kết nối">${["Séc","Đức","Ba Lan","Anh","Áo","Slovakia","Việt Nam"].map(name=>`<li>${name}</li>`).join("")}</ul></section>`,
      strengths: `<section class="ms" id="strengths"><h2 class="t">Vì sao chọn<br><em>TH Entertainment.</em></h2>
        <div class="str">${strengths.map(s=>`<div class="rv"><p>${s}</p></div>`).join("")}</div></section>`,
      artists: `<section class="ms" id="artists"><h2 class="t">Artists<br><em>& resident DJs.</em></h2>
        <div class="art">${artists.map(a=>`<div class="ph rv"><img src="${img(a[2])}"><div><b>${a[0]}</b><small>${a[1]}</small></div></div>`).join("")}</div></section>`,
      gallery: `<section class="ms" id="gallery"><h2 class="t">Past <em>events</em></h2>
        <div class="gal">${[11,9,4,7,5].map(n=>`<div class="ph rv"><img src="${img(n)}"></div>`).join("")}</div></section>`,
      culture: `<section class="ms" id="culture"><div class="two"><div><h2 class="t">Việt Nam<br><em>× châu Âu.</em></h2>
        <p class="lead">Âm nhạc, nghệ thuật và tài năng sáng tạo Việt Nam là một phần quan trọng trong bản sắc của chúng tôi. Thông qua kết nối nghệ sĩ và cộng đồng tại Việt Nam và châu Âu, chúng tôi đưa nghệ thuật đến với các sân khấu quốc tế — đồng thời luôn rộng mở với mọi khán giả, dòng nhạc và nền văn hóa.</p>
        <p class="quote">Cam kết: ý tưởng xứng tầm, nghệ sĩ phù hợp, quy trình chuyên nghiệp.</p></div><div class="ph rv"><img src="${img(6)}"></div></div></section>`,
      faq: `<section class="ms faq" id="faq"><h2 class="t">FAQ</h2>${faq.map((f,i)=>`<details ${i?"":"open"}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join("")}</section>`,
      news: `<section class="news" id="presale"><h2>Nhận presale code<br>trước mọi người.</h2><form onsubmit="event.preventDefault();this.innerHTML='<p style=&quot;font-size:18px&quot;>Đã đăng ký ✓</p>'"><input type="email" placeholder="Email của bạn" required><button>ĐĂNG KÝ</button></form></section>`,
      contact: `<section class="ms" id="contact"><div class="ct"><div><h2 class="t">Let's<br><em>work together.</em></h2>
        <dl><dt>EMAIL</dt><dd>booking@thentertainment.com</dd><dt>HOTLINE</dt><dd>+420 000 000 000</dd><dt>VĂN PHÒNG</dt><dd>Prague, Czech Republic</dd><dt>SOCIAL</dt><dd><a style="color:inherit" href="https://www.facebook.com/thentertainment1988">Facebook</a> · Instagram · TikTok</dd></dl></div>
        <form class="contact-form" onsubmit="event.preventDefault()">
          <label for="contact-name">Họ và tên <span aria-hidden="true">*</span><input id="contact-name" name="name" autocomplete="name" maxlength="100" required></label>
          <label for="contact-email">Email <span aria-hidden="true">*</span><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" required></label>
          <label for="contact-phone">Số điện thoại<input id="contact-phone" name="phone" type="tel" autocomplete="tel" maxlength="30" placeholder="Không bắt buộc"></label>
          <label for="contact-request">Bạn cần hỗ trợ gì? <span aria-hidden="true">*</span><select id="contact-request" name="request" required><option value="" disabled selected>Chọn nhu cầu</option><option value="artist">Booking nghệ sĩ</option><option value="event">Tổ chức sự kiện</option><option value="corporate">Sự kiện doanh nghiệp</option><option value="partnership">Tài trợ / Đối tác</option></select></label>
          <label class="full" for="contact-message">Thông tin sự kiện <span aria-hidden="true">*</span><textarea id="contact-message" name="message" rows="5" maxlength="3000" required aria-describedby="contact-hint" placeholder="Chia sẻ ý tưởng của bạn"></textarea></label>
          <p class="form-hint full" id="contact-hint">Thời gian dự kiến, địa điểm và quy mô khách mời</p>
          <button type="submit">GỬI YÊU CẦU</button>
        </form></div></section>`,
    };
    const keys = only || Object.keys(S);
    document.querySelector(sel).innerHTML = keys.map((k) => S[k]).join("");
  };
})();
