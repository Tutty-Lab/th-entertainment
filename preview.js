(() => {
  const designs = { monolith: '01-monolith', grain: '03-grain', 'world-tour': '04-world-tour' };
  const base = new URL('./', document.currentScript.src);
  const routeKey = Object.keys(designs).find(key => location.pathname.includes(`/templates/${designs[key]}/`));
  const requested = new URLSearchParams(location.search).get('design');
  const key = routeKey || (designs[requested] ? requested : 'monolith');
  const destination = name => new URL(`templates/${designs[name]}/`, base);
  if (!routeKey) {
    const target = destination(key);
    target.hash = location.hash;
    location.replace(target);
    return;
  }

  const accents = { monolith: '#ff662e', grain: '#ff8b38', 'world-tour': '#ef4023' };
  document.documentElement.style.setProperty('--preview-accent', accents[key]);
  document.documentElement.style.setProperty('--glass-accent', accents[key]);
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet'; stylesheet.href = new URL('preview.css?v=bottom-dock', base);
  document.head.append(stylesheet);
  document.body.classList.add('has-design-dock');

  const dock = document.createElement('aside');
  dock.className = 'design-dock';
  dock.setAttribute('aria-label', 'Chuyển phương án thiết kế');
  dock.innerHTML = `<div class="design-switch" role="group" aria-label="Phương án thiết kế"><span class="glass-pill" aria-hidden="true"></span>${Object.entries({ monolith: 'Monolith', grain: 'Grain', 'world-tour': 'World Tour' }).map(([name, label]) => `<button type="button" data-design="${name}" aria-pressed="${name === key}">${label}</button>`).join('')}</div>`;
  document.body.append(dock);

  const buttons = [...dock.querySelectorAll('button')];
  const pill = dock.querySelector('.glass-pill');
  const group = dock.querySelector('.design-switch');
  const current = buttons.find(button => button.dataset.design === key);
  const positionPill = button => {
    pill.style.width = `${button.offsetWidth}px`;
    pill.style.transform = `translateX(${button.offsetLeft - 5}px)`;
  };
  buttons.forEach(button => button.addEventListener('click', () => {
    if (button.dataset.design === key) return;
    positionPill(button);
    buttons.forEach(item => item.disabled = true);
    setTimeout(() => location.assign(destination(button.dataset.design)), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 240);
  }));
  new ResizeObserver(() => positionPill(current)).observe(group);
  positionPill(current);
  addEventListener('pageshow', () => { buttons.forEach(button => button.disabled = false); positionPill(current); });

  const booking = document.querySelector('.thb-back');
  if (booking) new MutationObserver(() => {
    dock.inert = booking.classList.contains('open');
    dock.hidden = dock.inert;
  }).observe(booking, { attributes: true, attributeFilter: ['class'] });
})();
