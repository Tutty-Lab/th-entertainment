// Modal đặt vé dùng chung + nút bật âm thanh (file từ ElevenLabs)
(function () {
  const css = `
  .thb-back{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);display:none;z-index:999;align-items:center;justify-content:center;padding:16px}
  .thb-back.open{display:flex;animation:thbf .3s}
  .thb{background:#0b0b0b;color:#f2f2f2;border:1px solid #333;width:100%;max-width:520px;max-height:90vh;overflow:auto;font-family:"Be Vietnam Pro",sans-serif;animation:thbs .45s cubic-bezier(.2,.9,.2,1)}
  .thb header{padding:24px;border-bottom:1px solid #222}
  .thb h3{margin:0;font-size:28px;letter-spacing:.02em;text-transform:uppercase}
  .thb small{color:#8a8a8a;letter-spacing:.12em;font-size:11px}
  .thb .tier{display:flex;justify-content:space-between;align-items:center;padding:16px 24px;border-bottom:1px solid #1a1a1a}
  .thb .tier b{display:block;font-size:14px}.thb .tier span{color:#999;font-size:13px}
  .thb .q{display:flex;align-items:center;gap:10px}
  .thb .q button{width:32px;height:32px;border:1px solid #444;background:none;color:#fff;cursor:pointer;font-size:16px}
  .thb .q button:hover{background:#fff;color:#000}
  .thb footer{padding:24px;display:flex;justify-content:space-between;align-items:center;gap:12px}
  .thb .total{font-size:24px;font-weight:700}
  .thb .go{background:#fff;color:#000;border:0;padding:14px 26px;font-weight:800;letter-spacing:.15em;cursor:pointer}
  .thb .go:disabled{opacity:.3;cursor:not-allowed}
  .thb .x{float:right;background:none;border:0;color:#888;font-size:22px;cursor:pointer}
  .thb input{width:100%;box-sizing:border-box;background:#111;border:1px solid #333;color:#fff;padding:12px;margin-top:8px}
  .thb-sound{position:fixed;right:16px;bottom:16px;z-index:998;border:1px solid currentColor;background:transparent;color:inherit;padding:10px 14px;font:700 11px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.2em;cursor:pointer;mix-blend-mode:difference;color:#fff}
  .th-bg{position:absolute!important;inset:0;width:100%;height:100%;object-fit:cover;filter:grayscale(1) contrast(1.15);z-index:0;pointer-events:none;transition:transform 1.2s cubic-bezier(.2,.9,.2,1),opacity .5s}
  @keyframes thbf{from{opacity:0}} @keyframes thbs{from{transform:translateY(40px);opacity:0}}`;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);
  const back = document.createElement("div");
  back.className = "thb-back";
  document.body.appendChild(back);
  back.addEventListener("click", (e) => e.target === back && close());
  function close() { back.classList.remove("open"); }

  window.openBooking = function (id) {
    const ev = TH.events.find((e) => e.id === id);
    if (!ev) return;
    if (ev.status === "sold-out" || ev.status === "coming-soon") {
      back.innerHTML = `<div class="thb"><header><button class="x">×</button><small>${TH.statusLabel[ev.status]}</small><h3>${ev.title}</h3></header>
      <div style="padding:24px"><p>${ev.status === "sold-out" ? "Vé đã bán hết. Để lại email để nhận thông báo khi có vé trả lại." : "Sắp mở bán. Đăng ký nhận presale code:"}</p>
      <input type="email" placeholder="email@domain.com"></div><footer><span></span><button class="go">ĐĂNG KÝ</button></footer></div>`;
    } else {
      const qty = ev.tiers.map(() => 0);
      back.innerHTML = `<div class="thb"><header><button class="x">×</button><small>${TH.fmtDate(ev.date)} · ${ev.city.toUpperCase()} · ${ev.venue}</small><h3>${ev.title}</h3></header>
      ${ev.tiers.map((t, i) => `<div class="tier"><div><b>${t.n}</b><span>€${t.p}</span></div><div class="q"><button data-i="${i}" data-d="-1">−</button><span id="q${i}">0</span><button data-i="${i}" data-d="1">+</button></div></div>`).join("")}
      <footer><div><small>TỔNG</small><div class="total" id="tt">€0</div></div><button class="go" disabled>THANH TOÁN</button></footer></div>`;
      back.querySelectorAll(".q button").forEach((b) => b.onclick = () => {
        const i = +b.dataset.i; qty[i] = Math.max(0, Math.min(10, qty[i] + +b.dataset.d));
        back.querySelector("#q" + i).textContent = qty[i];
        const total = qty.reduce((s, q, k) => s + q * ev.tiers[k].p, 0);
        back.querySelector("#tt").textContent = "€" + total;
        back.querySelector(".go").disabled = !total;
      });
    }
    back.querySelector(".x").onclick = close;
    back.querySelector(".go").onclick = () => {
      back.querySelector(".thb").innerHTML = `<div style="padding:48px 24px;text-align:center"><small>DEMO</small><h3 style="margin:12px 0">Cảm ơn bạn!</h3><p style="color:#999">Bản production sẽ chuyển sang Stripe checkout và gửi vé QR qua email.</p><button class="go" style="margin-top:16px">ĐÓNG</button></div>`;
      back.querySelector(".go").onclick = close;
    };
    back.classList.add("open");
  };

  // Âm thanh nền (tạo bằng scripts/generate-audio.mjs). Tự ẩn nếu chưa có file.
  window.setupSound = function (src) {
    const a = new Audio(src); a.loop = true; a.volume = 0.5;
    a.addEventListener("error", () => btn.remove());
    const btn = document.createElement("button");
    btn.className = "thb-sound"; btn.textContent = "SOUND OFF";
    btn.setAttribute('aria-pressed', 'false');
    btn.onclick = async () => {
      if (a.paused) {
        try { await a.play(); btn.textContent = 'SOUND ON'; btn.setAttribute('aria-pressed', 'true'); }
        catch { btn.textContent = 'THỬ BẬT ÂM THANH'; }
      } else { a.pause(); btn.textContent = 'SOUND OFF'; btn.setAttribute('aria-pressed', 'false'); }
    };
    document.body.appendChild(btn); a.load();
  };

  // Reveal khi scroll: thêm class .rv cho phần tử
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
  window.observeReveal = () => document.querySelectorAll(".rv").forEach((el) => io.observe(el));

  // Chế độ chụp mockup: ?mockup=900 (chiều cao hero) — hiện hết nội dung, ghi chiều cao trang vào title
  const m = new URLSearchParams(location.search).get("mockup");
  if (m) {
    document.head.insertAdjacentHTML("beforeend", `<style>.rv{opacity:1!important;transform:none!important;filter:none!important}.mask{background-position:0 0!important;color:transparent!important}
    .loader,.thb-sound{display:none!important}.hero,.split,.poster{height:${m}px!important;min-height:${m}px!important}.split>div{min-height:0!important}.spot{display:none}</style>`);
    addEventListener("load", () => setTimeout(() => (document.title = "H=" + document.documentElement.scrollHeight), 300));
  }
})();
