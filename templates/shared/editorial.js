/* Visual rhythm and scroll choreography shared by the three concepts. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const picture = (name, className = '') => `<img class="${className}" src="../img/${name}.jpg" alt="" loading="lazy" decoding="async">`;
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet'; sheet.href = '../shared/editorial.css?v=clean-layout-2'; document.head.append(sheet);

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
    strengths.innerHTML = groups.map(([title,image,indices]) => `<article class="strength-story rv"><div class="story-image">${picture(image)}</div><div class="story-copy"><h3>${title}</h3><ul>${indices.map(index=>`<li>${copy[index]}</li>`).join('')}</ul></div></article>`).join('');
  }

  // Preserve the profile, but give the vision its own photographic scene.
  document.querySelector('#vision')?.classList.add('vision-scene');
  document.querySelector('#culture')?.classList.add('culture-scene');

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


  document.querySelectorAll('.ms h2.t,.story-copy h3,.faq summary').forEach(element => {
    element.childNodes.forEach(node => { if (node.nodeType === Node.TEXT_NODE) node.textContent = node.textContent.replace(/[.]\s*$/, ''); });
  });

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
    interlude.innerHTML=`<div class="interlude-image">${picture('festival')}</div><div class="interlude-copy"><span>TH ENTERTAINMENT</span><p class="rv">FEEL IT<br>LIVE IT</p><span>ÂM NHẠC / CON NGƯỜI / KHOẢNH KHẮC</span></div>`;
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
