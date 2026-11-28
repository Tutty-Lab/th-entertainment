const designs={monolith:'01-monolith',grain:'03-grain','world-tour':'04-world-tour'};
let key=new URLSearchParams(location.search).get('design');if(!designs[key])key='monolith';
document.documentElement.style.setProperty('--preview-accent',{monolith:'#ff662e',grain:'#ff8b38','world-tour':'#ef4023'}[key]);
const frame=document.querySelector('#preview'),loading=document.querySelector('#loading');
document.querySelectorAll('[data-design]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.design===key));button.addEventListener('click',()=>{if(button.dataset.design===key)return;const url=new URL(location.href);url.searchParams.set('design',button.dataset.design);location.assign(url)})});
frame.addEventListener('load',()=>loading.hidden=true);frame.contentWindow.location.replace(`templates/${designs[key]}/`);document.title=`TH Entertainment — ${key.toUpperCase()}`;
