(() => {
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LS = { get: (k, d = '') => { try { return localStorage.getItem(k) ?? d } catch { return d } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch {} } };
const toast = m => { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 3200) };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---- API ---- */
async function api(path, opt = {}) {
  const base = LS.get('dm_base').replace(/\/$/, ''), key = LS.get('dm_key');
  let res;
  try { res = await fetch(base + '/api/v1' + path, { ...opt, headers: { 'Content-Type': 'application/json', ...(key && { 'x-api-key': key }) } }) }
  catch { throw new Error('تعذّر الوصول إلى الخادم. تحقق من العنوان في الإعدادات.') }
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(res.status === 401 || res.status === 403 ? 'مفتاح API غير صحيح. عدّله في الإعدادات.' : j.message || 'حدث خطأ في الخادم (' + res.status + ')');
  return j.data ?? j;
}

/* ---- التنقل ---- */
function route() {
  const p = ['create', 'tasks', 'settings'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'create';
  $$('[data-page]').forEach(s => s.hidden = s.dataset.page !== p);
  $$('[data-nav]').forEach(a => a.classList.toggle('on', a.dataset.nav === p));
  if (p === 'tasks') loadTasks();
}
addEventListener('hashchange', route);

/* ---- الأصوات ---- */
const V = [['ar-DZ-AminaNeural-Female', 'أمينة، الجزائر'], ['ar-DZ-IsmaelNeural-Male', 'إسماعيل، الجزائر'], ['ar-SA-ZariyahNeural-Female', 'زارية، السعودية'], ['ar-SA-HamedNeural-Male', 'حامد، السعودية'], ['ar-EG-SalmaNeural-Female', 'سلمى، مصر'], ['ar-EG-ShakirNeural-Male', 'شاكر، مصر'], ['ar-AE-FatimaNeural-Female', 'فاطمة، الإمارات'], ['ar-AE-HamdanNeural-Male', 'حمدان، الإمارات'], ['ar-MA-MounaNeural-Female', 'منى، المغرب'], ['ar-TN-ReemNeural-Female', 'ريم، تونس'], ['en-US-JennyNeural-Female', 'Jenny, English'], ['en-US-GuyNeural-Male', 'Guy, English'], ['fr-FR-DeniseNeural-Female', 'Denise, Français']];
$('#voice').innerHTML = V.map(([v, n]) => `<option value="${v}">${n}</option>`).join('');
api('/musics').then(d => { const l = d.files || d; if (Array.isArray(l)) $('#bgm').insertAdjacentHTML('beforeend', l.map(f => `<option value="${esc(f.file)}">${esc(f.name || f.file.split(/[\\/]/).pop())}</option>`).join('')) }).catch(() => {});

/* ---- حقول وقيم حيّة ---- */
[['clip', 'clipV'], ['count', 'countV'], ['vol', 'volV'], ['rate', 'rateV', v => (+v).toFixed(1)], ['bgmVol', 'bgmV'], ['fs', 'fsV'], ['sw', 'swV', v => (+v).toFixed(1)]].forEach(([i, o, f]) => $('#' + i).addEventListener('input', e => { $('#' + o).textContent = f ? f(e.target.value) : e.target.value; preview() }));
$('#aspect').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#aspect button').forEach(x => x.setAttribute('aria-checked', x === b)); preview() });
$('#subOn').addEventListener('change', e => { $('#subBox').classList.toggle('off', !e.target.checked); preview() });
['fc', 'sc', 'bc', 'bgOn', 'pos'].forEach(i => $('#' + i).addEventListener('input', preview));
const aspect = () => $('#aspect [aria-checked=true]').dataset.v;

function preview() {
  const a = aspect(), [w, h] = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080] }[a], f = $('#frame'), s = $('#sub');
  f.style.aspectRatio = w + '/' + h; f.style.maxWidth = a === '9:16' ? '210px' : '100%'; $('#pvRes').textContent = w + '×' + h;
  s.hidden = !$('#subOn').checked;
  const sc = 100 * (+$('#fs').value) / w; // حجم الخط نسبةً إلى عرض الإطار
  const st = +$('#sw').value, c = $('#sc').value;
  Object.assign(s.style, { fontSize: sc + 'cqw', color: $('#fc').value, webkitTextStroke: (st * sc / 60) + 'cqw ' + c, paintOrder: 'stroke fill', background: $('#bgOn').checked ? $('#bc').value : 'none', borderRadius: '2cqw', top: 'auto', bottom: 'auto', transform: 'none' });
  const p = $('#pos').value; if (p === 'top') s.style.top = '8%'; else if (p === 'center') { s.style.top = '50%'; s.style.transform = 'translateY(-50%)' } else s.style.bottom = p === 'bottom' ? '8%' : '28%';
}
preview();

/* ---- الذكاء الاصطناعي ---- */
const busy = (b, on, t) => { b.disabled = on; if (t) { b._o ??= b.innerHTML; b.textContent = on ? t : ''; if (!on) b.innerHTML = b._o } };
$('#genScript').onclick = async e => {
  const s = $('#subject').value.trim(); if (!s) return toast('اكتب موضوع الفيديو أولاً.');
  busy(e.currentTarget, true, 'جارٍ كتابة النص…');
  try { const d = await api('/scripts', { method: 'POST', body: JSON.stringify({ video_subject: s, video_language: $('#language').value, paragraph_number: +$('#paras').value || 1 }) }); $('#script').value = d.video_script; toast('تمت كتابة النص.') }
  catch (x) { toast(x.message) } finally { busy(e.currentTarget, false, 1) }
};
$('#genTerms').onclick = async e => {
  const s = $('#subject').value.trim(); if (!s) return toast('اكتب موضوع الفيديو أولاً.');
  busy(e.currentTarget, true, 'جارٍ استخراج الكلمات…');
  try { const d = await api('/terms', { method: 'POST', body: JSON.stringify({ video_subject: s, video_script: $('#script').value, amount: 5 }) }); $('#terms').value = [].concat(d.video_terms).join(', '); toast('تم استخراج الكلمات المفتاحية.') }
  catch (x) { toast(x.message) } finally { busy(e.currentTarget, false, 1) }
};

/* ---- إنشاء الفيديو ---- */
const names = JSON.parse(LS.get('dm_names', '{}'));
$('#go').onclick = async e => {
  const subject = $('#subject').value.trim(); if (!subject) { $('#subject').focus(); return toast('اكتب موضوع الفيديو أولاً.') }
  const body = {
    video_subject: subject, video_script: $('#script').value, video_terms: $('#terms').value || null, video_language: $('#language').value,
    video_aspect: aspect(), video_source: $('#source').value, video_concat_mode: $('#concat').value, video_transition_mode: $('#transition').value || null,
    video_clip_duration: +$('#clip').value, video_count: +$('#count').value, voice_name: $('#voice').value, voice_volume: $('#vol').value / 100, voice_rate: +$('#rate').value,
    bgm_type: $('#bgm').value === '' ? '' : 'random', bgm_volume: $('#bgmVol').value / 100, subtitle_enabled: $('#subOn').checked, subtitle_position: $('#pos').value,
    font_name: $('#font').value, font_size: +$('#fs').value, text_fore_color: $('#fc').value, stroke_color: $('#sc').value, stroke_width: +$('#sw').value,
    text_background_color: $('#bgOn').checked ? $('#bc').value : false, paragraph_number: +$('#paras').value || 1
  };
  if (!['random', ''].includes($('#bgm').value)) { body.bgm_type = 'custom'; body.bgm_file = $('#bgm').value }
  e.currentTarget.disabled = true;
  try {
    const d = await api('/videos', { method: 'POST', body: JSON.stringify(body) });
    names[d.task_id] = subject; LS.set('dm_names', JSON.stringify(names));
    $('#live').hidden = false; toast('بدأ إنشاء الفيديو.'); poll(d.task_id);
  } catch (x) { toast(x.message); e.currentTarget.disabled = false }
};
function poll(id) {
  const t = setInterval(async () => {
    try {
      const d = await api('/tasks/' + id), p = d.progress ?? 0;
      $('#liveBar').style.width = p + '%'; $('#liveTxt').textContent = d.state === 1 ? 'اكتمل الفيديو.' : d.state === -1 ? 'فشلت المهمة. راجع سجلّ الخادم.' : 'جارٍ الإنشاء: ' + Math.round(p) + '%';
      if (d.state === 1 || d.state === -1) { clearInterval(t); $('#go').disabled = false; toast(d.state === 1 ? 'اكتمل الفيديو. ستجده في المهام.' : 'فشلت المهمة.'); refreshBusy() }
    } catch { clearInterval(t); $('#go').disabled = false }
  }, 2000);
}

/* ---- المهام ---- */
async function loadTasks() {
  const box = $('#taskList'); let d;
  try { d = await api('/tasks?page=1&page_size=50') } catch (x) { box.innerHTML = `<p class="empty">${esc(x.message)}</p>`; return }
  const L = d.tasks || [], n = s => L.filter(t => s(t.state)).length;
  $('#stats').innerHTML = [['الإجمالي', L.length], ['مكتملة', n(s => s === 1)], ['قيد التنفيذ', n(s => s === 4)], ['فاشلة', n(s => s === -1)]].map(([a, b]) => `<div><span>${a}</span><strong class="latin">${b}</strong></div>`).join('');
  box.innerHTML = L.length ? L.map(t => {
    const v = (t.videos || [])[0], b = t.state === 1 ? ['soft', 'مكتملة'] : t.state === -1 ? ['err', 'فاشلة'] : ['solid', 'قيد التنفيذ'];
    return `<article class="card task"><div class="meta"><h3>${esc(names[t.task_id] || 'فيديو بلا عنوان')}</h3><span class="badge ${b[0]}">${b[1]}</span></div>
    ${v ? `<video src="${esc(v)}" controls preload="metadata"></video>` : `<div class="bar"><i style="width:${t.progress || 0}%"></i></div>`}
    <div class="acts">${v ? `<a class="btn outline" href="${esc(v)}" download><svg class="ic"><use href="#i-down"/></svg>تنزيل</a>` : ''}<button class="btn outline danger" data-del="${esc(t.task_id)}"><svg class="ic"><use href="#i-trash"/></svg>حذف</button></div></article>`
  }).join('') : '<p class="empty">لا توجد مهام بعد. أنشئ أول فيديو من صفحة «إنشاء فيديو».</p>';
}
$('#taskList').addEventListener('click', async e => {
  const b = e.target.closest('[data-del]'); if (!b || !confirm('حذف هذا الفيديو نهائياً؟')) return;
  try { await api('/tasks/' + b.dataset.del, { method: 'DELETE' }); toast('تم الحذف.'); loadTasks() } catch (x) { toast(x.message) }
});
async function refreshBusy() { try { const d = await api('/tasks?page=1&page_size=50'), n = (d.tasks || []).filter(t => t.state === 4).length; const e = $('#busy'); e.textContent = n; e.hidden = !n } catch {} }

/* ---- الإعدادات ---- */
$('#base').value = LS.get('dm_base'); $('#key').value = LS.get('dm_key');
$('#save').onclick = () => { LS.set('dm_base', $('#base').value.trim()); LS.set('dm_key', $('#key').value.trim()); toast('تم حفظ الإعدادات.'); ping() };
$('#ping').onclick = ping;
async function ping() { const c = $('#conn'); try { await api('/tasks?page=1&page_size=1'); c.textContent = 'متصل'; c.className = 'badge solid' } catch (x) { c.textContent = 'غير متصل'; c.className = 'badge err'; toast(x.message) } }

/* ---- لوحة الأوامر ---- */
const CMD = [['إنشاء فيديو', 'i-create', () => location.hash = 'create'], ['المهام', 'i-list', () => location.hash = 'tasks'], ['الإعدادات', 'i-settings', () => location.hash = 'settings'], ['اكتب النص بالذكاء الاصطناعي', 'i-spark', () => { location.hash = 'create'; $('#genScript').click() }], ['استخرج الكلمات المفتاحية', 'i-spark', () => { location.hash = 'create'; $('#genTerms').click() }], ['إنشاء الفيديو الآن', 'i-bolt', () => { location.hash = 'create'; $('#go').click() }]];
const pal = $('#pal'), pq = $('#pq'), pl = $('#pl'); let sel = 0, shown = CMD;
const draw = () => { pl.innerHTML = shown.map((c, i) => `<li role="option" data-i="${i}" aria-selected="${i === sel}"><svg class="ic"><use href="#${c[1]}"/></svg>${c[0]}</li>`).join('') || '<li>لا توجد نتائج</li>' };
const openPal = () => { pq.value = ''; shown = CMD; sel = 0; draw(); pal.showModal(); pq.focus() };
const run = i => { const c = shown[i]; if (c) { pal.close(); c[2]() } };
$('#kbtn').onclick = openPal;
addEventListener('keydown', e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.open ? pal.close() : openPal() } });
pq.addEventListener('input', () => { shown = CMD.filter(c => c[0].includes(pq.value.trim())); sel = 0; draw() });
pq.addEventListener('keydown', e => { if (e.key === 'ArrowDown') sel = Math.min(sel + 1, shown.length - 1); else if (e.key === 'ArrowUp') sel = Math.max(sel - 1, 0); else if (e.key === 'Enter') return run(sel); else return; e.preventDefault(); draw() });
pl.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (li) run(+li.dataset.i) });
pal.addEventListener('click', e => { if (e.target === pal) pal.close() });

route(); refreshBusy(); setInterval(refreshBusy, 10000);
})();
