(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const concept = location.pathname.includes('03-grain') ? 'grain' : location.pathname.includes('04-world-tour') ? 'tour' : 'monolith';
  document.body.dataset.concept = concept;
  const style = document.createElement('link');
  style.rel = 'stylesheet'; style.href = '../shared/polish.css'; document.head.append(style);
  const color = document.createElement('link');
  color.rel = 'stylesheet'; color.href = '../shared/color.css?v=20261128'; document.head.append(color);
  const nav = document.querySelector('nav');
  const links = [['events','SỰ KIỆN'],['artists','NGHỆ SĨ'],['about','GIỚI THIỆU'],['contact','LIÊN HỆ']];
  nav.innerHTML = `<a class="brand" href="#top" aria-label="TH Entertainment — đầu trang">TH<span>ENTERTAINMENT</span></a><div class="nav-links">${links.map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</div>`;
  document.body.id = 'top';
  const progress = document.createElement('div'); progress.className='reading-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
  let scheduled = false;
  const update = () => {
    const max = document.documentElement.scrollHeight-innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? scrollY/max : 0})`;
    nav.classList.toggle('scrolled',scrollY>40); scheduled=false;
  };
  addEventListener('scroll',()=>{if(!scheduled){requestAnimationFrame(update);scheduled=true}},{passive:true}); update();
  document.querySelectorAll('.ms').forEach(section=>{
    section.querySelectorAll('.k,h2,.lead,.quote').forEach(el=>el.classList.add('rv'));
  });
  document.querySelectorAll('.str,.proc,.art,.net,.grid').forEach(group=>{
    [...group.children].forEach((el,i)=>el.style.transitionDelay=`${(i%3)*85}ms`);
  });
  document.querySelectorAll('img').forEach(img=>{
    img.alt = img.closest('#artists') ? 'Ảnh minh họa nghệ sĩ và sân khấu' : 'Không khí concert và nightlife — ảnh minh họa';
    if(!img.closest('.hero,.split,.poster')){img.loading='lazy';img.decoding='async'}
  });
  document.querySelectorAll('.card[onclick],.row[onclick]').forEach(card=>{
    card.tabIndex=0;card.setAttribute('role','button');
    card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click()}});
  });
  document.querySelectorAll('.stats b').forEach((el,i)=>{if(i>1){el.removeAttribute('data-n');el.textContent='—'}});
  // Existing counter runs briefly; remove unverified metrics entirely.
  const stats = document.querySelector('.stats');if(stats) [...stats.children].slice(2).forEach(el=>el.style.display='none');
  document.querySelectorAll('input,textarea,select').forEach(el=>{
    el.setAttribute('aria-label',el.placeholder||'Loại yêu cầu');
    if(/email/i.test(el.placeholder)){el.type='email';el.required=true}
  });
  document.querySelectorAll('.news form,.ct form').forEach(form=>{
    form.onsubmit=e=>{
      e.preventDefault();
      let status=form.querySelector('[role=status]');
      if(!status){status=document.createElement('p');status.setAttribute('role','status');status.className='full';form.append(status)}
      status.textContent='Đây là bản duyệt giao diện. Thông tin chưa được gửi hoặc lưu.';
    };
  });
  const contact = document.querySelector('.ct dl');
  if(contact)contact.innerHTML='<dt>KẾT NỐI CHÍNH THỨC</dt><dd><a href="https://www.facebook.com/thentertainment1988" target="_blank" rel="noopener noreferrer">TH Entertainment trên Facebook</a></dd><dt>HỢP TÁC QUỐC TẾ</dt><dd>Châu Âu · Việt Nam</dd>';
  document.querySelectorAll('.faq p').forEach((el,i)=>{if(i===0)el.textContent='Giao diện mô phỏng chọn hạng vé và số lượng. Bán vé sẽ mở khi có thông báo chính thức.';if(i===1)el.textContent='Chính sách hoàn và đổi vé sẽ được công bố riêng cho từng sự kiện.';if(i===3)el.textContent='Kết nối TH Entertainment qua Facebook chính thức để trao đổi về hợp tác.'});
  // Accessible modal lifecycle, including dynamically replaced content.
  const back=document.querySelector('.thb-back');let trigger=null;
  const original=window.openBooking;
  window.openBooking=id=>{
    trigger=document.activeElement; original(id);
    const modal=back.querySelector('.thb');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Xem trước đặt vé — chưa mở bán');
    const note=document.createElement('p');note.className='booking-note';note.textContent='DEMO · Không thu tiền, không phát hành vé.';modal.prepend(note);
    back.querySelector('.x').setAttribute('aria-label','Đóng');
    back.querySelectorAll('.q button').forEach(b=>b.setAttribute('aria-label',`${b.dataset.d==='1'?'Tăng':'Giảm'} số vé ${b.closest('.tier').querySelector('b').textContent}`));
    back.querySelectorAll('input').forEach(el=>el.setAttribute('aria-label','Email nhận thông báo'));
    const go=back.querySelector('.go');go.addEventListener('click',()=>{const p=back.querySelector('.thb p');if(p)p.textContent='Đây là bản xem trước. Chưa có giao dịch hay đăng ký nào được thực hiện.'});
    document.body.style.overflow='hidden';back.querySelector('button').focus();
  };
  new MutationObserver(()=>{if(!back.classList.contains('open')){document.body.style.overflow='';trigger?.focus()}}).observe(back,{attributes:true,attributeFilter:['class']});
  addEventListener('keydown',e=>{
    if(!back.classList.contains('open'))return;
    if(e.key==='Escape'){back.classList.remove('open');return}
    if(e.key==='Tab'){
      const focus=[...back.querySelectorAll('button:not(:disabled),input,a[href]')];const first=focus[0],last=focus.at(-1);
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  });
  if(!reduced){
    const hero=document.querySelector('.hero,.split,.poster');
    hero.querySelectorAll('h1,.pre,.yr,.cd,.meta,.cities').forEach((el,i)=>{
      if(concept==='monolith'&&el.tagName==='H1')return;
      el.animate([{opacity:0,transform:concept==='grain'?'translateY(30px)':'translateY(48px)',filter:'blur(5px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],{duration:1100,delay:150+i*130,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});
    });
    if(matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const img=hero.querySelector('img');if(img)img.style.transform=`scale(1.04) translate(${(e.clientX/innerWidth-.5)*10}px,${(e.clientY/innerHeight-.5)*8}px)`});hero.addEventListener('pointerleave',()=>{const img=hero.querySelector('img');if(img)img.style.transform='scale(1.02)'})}
  }
  document.querySelectorAll('.svc > div > i,.cols > div > small').forEach(el=>el.remove());
  document.querySelectorAll('.lbl').forEach(el=>{el.textContent=el.textContent.replace(/^\(\s*\d+\s*\)\s*—\s*/, '')});
  // Remove terminal full stops from display copy without touching dates, URLs or code.
  document.querySelectorAll('h1,h2,h3,h4,p,.svc span,.cols p,.info p').forEach(el=>{
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach((node,index)=>{
      const next=node.nextSibling;
      if(index===nodes.length-1||next?.nodeName==='BR')node.textContent=node.textContent.replace(/\.+(\s*)$/, '$1');
    });
  });
  if(reduced)document.querySelectorAll('.rv').forEach(el=>el.classList.add('in'));
  observeReveal();
})();
