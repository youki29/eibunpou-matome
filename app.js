(() => {
  // 日本語訳を隠すモード
  const toggle = document.getElementById('hideJa');
  const KEY = 'eibunpou-hide-ja';
  try { toggle.checked = localStorage.getItem(KEY) === '1'; } catch (e) {}
  const apply = () => {
    document.body.classList.toggle('hide-ja', toggle.checked);
    document.querySelectorAll('.ex .ja.show').forEach(el => el.classList.remove('show'));
  };
  toggle.addEventListener('change', () => {
    apply();
    try { localStorage.setItem(KEY, toggle.checked ? '1' : '0'); } catch (e) {}
  });
  apply();
  document.addEventListener('click', e => {
    const ja = e.target.closest('.ex .ja');
    if (ja && document.body.classList.contains('hide-ja')) ja.classList.toggle('show');
  });

  // 現在のセクションに合わせてタブをハイライト
  const links = [...document.querySelectorAll('.tabs a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href')));
  const setActive = id => {
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', on);
      if (on) {
        const bar = a.parentElement;
        bar.scrollTo({ left: a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
      }
    });
  };
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => s && io.observe(s));

  document.querySelector('.totop').addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
