/* Visual rhythm and scroll choreography shared by the three concepts. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const picture = (name, className = '') => `<img class="${className}" src="../img/${name}.jpg" alt="" loading="lazy" decoding="async">`;
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet'; sheet.href = '../shared/editorial.css'; document.head.append(sheet);

  // Services: an image beside each capability, rather than a wall of labels.
  const serviceImages = ['stage','festival','performance','lights','live','crowd','9'];
  document.querySelectorAll('.svc > div,.cols > div').forEach((item,i) => {
    item.classList.add('service-visual');
    item.insertAdjacentHTML('afterbegin', `<div class="service-photo">${picture(serviceImages[i % serviceImages.length])}</div>`);
  });

  const strengths = document.querySelector('#strengths .str');
  if (strengths) {
    const copy = [...strengths.querySelectorAll('p')].map(p => p.textContent);
    const groups = [
      ['KINH NGHIỆM','stage',[0,6,7]],
      ['KẾT NỐI','performance',[1,2,8]],
      ['SẢN XUẤT','lights',[3,4,5]]
    ];
    strengths.className = 'strength-stories';
    strengths.innerHTML = groups.map(([title,image,indices],i) => `<article class="strength-story rv"><div class="story-image">${picture(image)}</div><div class="story-copy"><span class="story-index">0${i+1}</span><h3>${title}</h3><ul>${indices.map(index=>`<li>${copy[index]}</li>`).join('')}</ul></div></article>`).join('');
  }

  document.querySelectorAll('.proc > div').forEach((item,i) => {
    item.insertAdjacentHTML('afterbegin', `<div class="process-photo">${picture(['festival','performance','lights','crowd'][i])}</div>`);
  });

  // Preserve the profile, but give the vision its own photographic scene.
  document.querySelector('#vision')?.classList.add('vision-scene');
  document.querySelector('#culture')?.classList.add('culture-scene');
  const network = document.querySelector('#network');
  if (network) {
    const map = `<svg viewBox="0 0 1000 380" role="img" aria-label="Kết nối châu Âu và Việt Nam"><defs><radialGradient id="network-glow"><stop stop-color="#aaa" stop-opacity=".18"/><stop offset="1" stop-color="#aaa" stop-opacity="0"/></radialGradient></defs><ellipse cx="500" cy="190" rx="470" ry="180" fill="url(#network-glow)"/><g class="network-grid" fill="none" stroke="currentColor" opacity=".16"><ellipse cx="500" cy="190" rx="440" ry="160"/><ellipse cx="500" cy="190" rx="300" ry="160"/><ellipse cx="500" cy="190" rx="140" ry="160"/><path d="M60 190H940M105 120H895M105 260H895"/></g><g class="network-routes" fill="none" stroke="currentColor"><path d="M300 165Q520 -40 800 260"/><path d="M280 190Q490 30 800 260"/><path d="M350 175Q580 100 800 260"/><path d="M300 165Q250 95 245 130"/><path d="M300 165L325 145L350 175L330 205L300 165L280 190"/></g><g fill="currentColor">${[[245,130,'UK'],[300,165,'DE'],[325,145,'PL'],[350,175,'CZ'],[330,205,'SK'],[280,190,'AT'],[800,260,'VN']].map(([x,y,label])=>`<circle cx="${x}" cy="${y}" r="4"/><text x="${x+12}" y="${y-10}">${label}</text>`).join('')}</g></svg>`;
    network.querySelector('.net').insertAdjacentHTML('beforebegin', `<div class="network-canvas rv">${picture('live','network-photo')}${map}<span class="network-caption">EUROPE / VIETNAM</span></div>`);
    network.querySelector('.lead').textContent = 'Năng lực sản xuất tại châu Âu. Nguồn lực sáng tạo từ Việt Nam. Cùng hiện thực hóa những sân khấu xuyên biên giới.';
  }

  const gallery = document.querySelector('#gallery');
  if (gallery) {
    const images = ['crowd','performance','festival','lights','stage'];
    gallery.querySelectorAll('.gal img').forEach((img,i)=>img.src=`../img/${images[i]}.jpg`);
  }
  const faq = document.querySelector('#faq');
  if(faq) {
    const content = document.createElement('div');content.className='faq-content';
    [...faq.querySelectorAll('details')].forEach(item=>content.append(item));
    const layout=document.createElement('div');layout.className='faq-layout';
    layout.innerHTML=`<div class="faq-photo rv">${picture('crowd')}</div>`;
    layout.append(content);faq.append(layout);
  }

  const aboutCopy=document.querySelectorAll('#about .lead');
  if(aboutCopy[0])aboutCopy[0].textContent='Hơn 15 năm kiến tạo concert, festival và trải nghiệm giải trí quốc tế. TH Entertainment kết nối nghệ sĩ, khán giả và đối tác từ châu Âu đến Việt Nam.';
  aboutCopy[1]?.remove();
  const visionCopy=document.querySelector('#vision .lead');
  if(visionCopy)visionCopy.textContent='Một nền tảng giải trí quốc tế. Nơi nghệ sĩ phát triển, cộng đồng kết nối và những sân khấu khác biệt được hiện thực hóa.';
  const cultureCopy=document.querySelector('#culture .lead');
  if(cultureCopy)cultureCopy.textContent='Đưa tài năng và âm nhạc Việt Nam đến sân khấu quốc tế. Mở ra cuộc gặp gỡ giữa nghệ sĩ, khán giả và những nền văn hóa — bằng trải nghiệm trực tiếp.';

  // A full-width image break separates company profile from ticketing.
  const about = document.querySelector('#about');
  if(about) {
    const interlude = document.createElement('section');interlude.className='visual-interlude';
    interlude.innerHTML=`<div class="interlude-image">${picture('festival')}</div><div class="interlude-copy"><span>TH ENTERTAINMENT</span><p class="rv">FEEL IT.<br>LIVE IT.</p><span>ÂM NHẠC. CON NGƯỜI. KHOẢNH KHẮC.</span></div>`;
    about.before(interlude);
  }
  const contact = document.querySelector('#contact .ct > div');
  contact?.insertAdjacentHTML('beforeend', `<div class="contact-photo">${picture('stage')}</div>`);

  if(reduced)return;
  const scenes = [...document.querySelectorAll('.vision-scene,.visual-interlude,.culture-scene,.network-canvas')];
  const visible = new Set();
  const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){visible.add(entry.target);entry.target.classList.add('scene-visible');requestAnimationFrame(draw)}else visible.delete(entry.target);
  }),{rootMargin:'100px'});
  scenes.forEach(scene=>observer.observe(scene));
  let pending=false;
  function draw(){
    const height=innerHeight;
    visible.forEach(scene=>{
      const rect=scene.getBoundingClientRect();
      const progress=Math.max(-1,Math.min(1,(height/2-rect.top-rect.height/2)/height));
      scene.style.setProperty('--drift',`${progress*48}px`);
    });pending=false;
  }
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(draw)}},{passive:true});
  draw();
})();
