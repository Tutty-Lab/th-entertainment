const designs={monolith:'01-monolith',grain:'03-grain','world-tour':'04-world-tour'};
const frame=document.querySelector('#preview'),loading=document.querySelector('#loading');
function select(key,update=true){if(!designs[key])key='monolith';loading.hidden=false;document.querySelectorAll('[data-design]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.design===key)));frame.src=`templates/${designs[key]}/`;if(update){const url=new URL(location.href);url.searchParams.set('design',key);history.pushState({key},'',url)}document.title=`TH Entertainment — ${key.toUpperCase()}`;}
document.querySelectorAll('[data-design]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.design)));
frame.addEventListener('load',()=>{loading.hidden=true});addEventListener('popstate',()=>select(new URLSearchParams(location.search).get('design'),false));select(new URLSearchParams(location.search).get('design'),false);
