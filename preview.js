const designs={monolith:'01-monolith',grain:'03-grain','world-tour':'04-world-tour'};
let key=new URLSearchParams(location.search).get('design');if(!designs[key])key='monolith';
document.documentElement.style.setProperty('--preview-accent',{monolith:'#ff662e',grain:'#ff8b38','world-tour':'#ef4023'}[key]);
const frame=document.querySelector('#preview'),loading=document.querySelector('#loading');
const buttons=[...document.querySelectorAll('[data-design]')];
const pill=document.querySelector('.glass-pill');
function positionPill(button){
  pill.style.width=`${button.offsetWidth}px`;
  pill.style.transform=`translateX(${button.offsetLeft-5}px)`;
}
buttons.forEach(button=>{
  button.setAttribute('aria-pressed',String(button.dataset.design===key));
  button.addEventListener('click',()=>{
    if(button.dataset.design===key)return;
    positionPill(button);
    const url=new URL(location.href);url.searchParams.set('design',button.dataset.design);
    // Let the glass settle before navigating; full navigation preserves Back behavior.
    buttons.forEach(item=>item.disabled=true);
    setTimeout(()=>location.assign(url),matchMedia('(prefers-reduced-motion: reduce)').matches?0:240);
  });
});
const current=buttons.find(button=>button.dataset.design===key);
new ResizeObserver(()=>positionPill(current)).observe(document.querySelector('nav'));
positionPill(current);
addEventListener('pageshow',()=>{buttons.forEach(button=>button.disabled=false);positionPill(current)});
frame.addEventListener('load',()=>loading.hidden=true);frame.contentWindow.location.replace(`templates/${designs[key]}/`);document.title=`TH Entertainment — ${key.toUpperCase()}`;
