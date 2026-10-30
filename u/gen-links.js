// Tạo trang link cá nhân cho từng thành viên đối tác: u/<mã viết thường, bỏ gạch>/index.html
//
//   cd emma-website
//   node u/gen-links.js
//
// Thêm/bớt người: sửa u/members.json rồi chạy lại lệnh trên, commit + push.
// appleProviderToken: mã "pt=" trong App Store Connect → Analytics → Campaigns
// (để trống thì link iPhone vẫn chạy, chỉ là Apple không thống kê theo từng người).
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://owqayzsscqypeoulrnyd.supabase.co';
// Khoá công khai (anon) — cùng loại khoá đã nằm trong app, chỉ gọi được các hàm cho phép.
const SUPABASE_ANON_KEY = fs.readFileSync(path.join(__dirname, 'anon-key.txt'), 'utf8').trim();
const APP_STORE_ID = '6798245439';
const PLAY_ID = 'com.emmamanifest.app';
const OG_IMAGE = 'https://img.emmamanifest.com/cdn-cgi/image/width=1200,height=630,fit=cover,quality=80,format=jpeg/Beauty%26Lifestyle/bright-hot-air-balloons-in-sky-of-cappadocia-turk_36GJCUH5V2.jpg';
const HERO_IMAGE = 'https://img.emmamanifest.com/cdn-cgi/image/width=900,height=600,fit=cover,quality=75,format=auto/Beauty%26Lifestyle/bright-hot-air-balloons-in-sky-of-cappadocia-turk_36GJCUH5V2.jpg';

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'members.json'), 'utf8'));
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const slugOf = (code) => code.toLowerCase().replace(/[^a-z0-9]/g, '');

function page({ code, name }) {
  const slug = slugOf(code);
  const ios = `https://apps.apple.com/vn/app/emma-manifest-daily/id${APP_STORE_ID}` +
    (cfg.appleProviderToken ? `?pt=${encodeURIComponent(cfg.appleProviderToken)}&ct=${encodeURIComponent(code)}&mt=8` : '');
  const android = `https://play.google.com/store/apps/details?id=${PLAY_ID}&referrer=${encodeURIComponent('code=' + code)}`;
  const title = `${name} mời bạn trải nghiệm Emma`;
  const desc = 'Emma — nghe hướng dẫn manifest bằng tiếng Việt, mỗi ngày vài phút cho tình yêu, tiền bạc, sự nghiệp và giấc ngủ. Nhấn để tải miễn phí.';
  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
<meta name="robots" content="noindex" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://emmamanifest.com/u/${slug}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:image" content="${OG_IMAGE}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;600;700&display=swap" rel="stylesheet" />
<style>
  :root { --a:#D9731A; --b:#F4A521; --ink:#0F1F2E; --soft:#5A6B78; --bg:#F4F7F6; --line:#E4EAE8; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font-family:'Be Vietnam Pro',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; -webkit-font-smoothing:antialiased; }
  .wrap { max-width:460px; margin:0 auto; padding:0 16px 40px; }
  .hero { position:relative; height:240px; border-radius:0 0 28px 28px; overflow:hidden; margin:0 -16px; background:linear-gradient(135deg,var(--a),var(--b)); }
  .hero .bg { width:100%; height:100%; object-fit:cover; display:block; }
  .hero::after { content:''; position:absolute; inset:0; background:linear-gradient(180deg,rgba(15,31,46,.05) 30%,rgba(15,31,46,.65)); }
  .logo { position:absolute; top:16px; left:16px; z-index:1; height:34px; width:auto; padding:7px 12px; background:rgba(255,255,255,.9); border-radius:999px; box-sizing:border-box; }
  .hero h1 { position:absolute; left:20px; right:20px; bottom:18px; z-index:1; margin:0; color:#fff; font-size:24px; line-height:1.25; font-weight:700; }
  .lead { color:var(--soft); font-size:15px; line-height:1.6; margin:20px 2px 18px; }
  .card { background:#fff; border:1px solid var(--line); border-radius:20px; padding:18px; box-shadow:0 8px 24px rgba(15,31,46,.06); }
  .label { font-size:12px; letter-spacing:2px; color:var(--soft); text-transform:uppercase; margin-bottom:8px; }
  .coderow { display:flex; align-items:center; justify-content:space-between; gap:10px; }
  .code { font-size:26px; font-weight:700; letter-spacing:1px; word-break:break-all; }
  .copy { border:1px solid var(--line); background:#fff; color:var(--ink); border-radius:999px; padding:9px 14px; font-weight:600; font-size:14px; font-family:inherit; cursor:pointer; white-space:nowrap; }
  .cta { display:block; width:100%; margin:16px 0 8px; padding:16px; border:0; border-radius:999px; color:#fff; font-weight:700; font-size:17px; font-family:inherit; text-align:center; text-decoration:none; background:linear-gradient(135deg,var(--a),var(--b)); box-shadow:0 10px 24px rgba(217,115,26,.35); cursor:pointer; }
  .cta.secondary { background:#fff; color:var(--ink); border:1px solid var(--line); box-shadow:none; font-weight:600; }
  .toast { text-align:center; color:var(--a); font-size:14px; min-height:20px; font-weight:600; }
  ol { margin:22px 0 0; padding-left:20px; color:var(--ink); font-size:15px; line-height:1.6; }
  ol li { margin-bottom:6px; }
  .muted { color:var(--soft); font-size:13px; text-align:center; margin-top:26px; }
  .muted a { color:var(--soft); }
  .only-ios, .only-android, .only-desktop { display:none; }
  body.ios .only-ios, body.android .only-android, body.desktop .only-desktop { display:block; }
</style>
</head>
<body>
<div class="wrap">
  <div class="hero">
    <img class="bg" src="${HERO_IMAGE}" alt="" />
    <img class="logo" src="/u/logo.png" alt="Emma" />
    <h1>${esc(title)}</h1>
  </div>
  <p class="lead">Emma là ứng dụng nghe hướng dẫn manifest bằng tiếng Việt. Mỗi ngày vài phút đeo tai nghe, để tâm trí quen dần với cuộc sống bạn mong muốn — tình yêu, tiền bạc, sự nghiệp, sự tự tin và giấc ngủ.</p>

  <div class="card">
    <div class="label">Mã giới thiệu của bạn</div>
    <div class="coderow"><div class="code" id="code">${esc(code)}</div><button class="copy" type="button" id="copyBtn">Sao chép</button></div>
  </div>

  <a class="cta only-ios" id="iosBtn" href="${ios}">Tải Emma miễn phí</a>
  <a class="cta only-android" id="androidBtn" href="${android}">Tải Emma trên Google Play</a>
  <div class="only-desktop">
    <a class="cta" href="${ios}">Tải trên App Store (iPhone)</a>
    <a class="cta secondary" href="${android}">Tải trên Google Play (Android)</a>
  </div>
  <div class="toast" id="toast"></div>

  <ol class="only-ios">
    <li>Bấm <b>Tải Emma miễn phí</b> — mã của bạn được sao chép sẵn.</li>
    <li>Cài và mở Emma.</li>
    <li>Ở màn hình <b>"Bạn có mã giới thiệu không?"</b>, bấm <b>Dán mã</b> (hoặc giữ ngón tay vào ô nhập → Dán, hay gõ mã ở trên) rồi bấm Xác nhận.</li>
  </ol>
  <ol class="only-android">
    <li>Bấm <b>Tải Emma trên Google Play</b> và cài app.</li>
    <li>Mở Emma — mã của bạn đã được điền sẵn ở màn hình <b>"Bạn có mã giới thiệu không?"</b>, chỉ cần bấm Xác nhận.</li>
  </ol>
  <ol class="only-desktop">
    <li>Mở trang này trên điện thoại để tải Emma, hoặc chọn cửa hàng ở trên.</li>
    <li>Khi mở app lần đầu, nhập mã <b>${esc(code)}</b> ở màn hình "Bạn có mã giới thiệu không?".</li>
  </ol>

  <p class="muted">Tải app và nghe chuỗi bài Hướng Dẫn miễn phí. · <a href="/terms.html">Điều khoản</a> · <a href="/privacy.html">Quyền riêng tư</a></p>
</div>
<script>
(function () {
  var CODE = ${JSON.stringify(code)};
  var ua = navigator.userAgent || '';
  var isAndroid = /Android/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var platform = isIOS ? 'ios' : isAndroid ? 'android' : 'other';
  document.body.className = isIOS ? 'ios' : isAndroid ? 'android' : 'desktop';

  // Đếm 1 lượt bấm link mỗi lần mở trang (không lưu IP hay thông tin thiết bị).
  try {
    var key = 'emma-click-' + CODE;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      fetch(${JSON.stringify(SUPABASE_URL)} + '/rest/v1/rpc/record_link_click', {
        method: 'POST', keepalive: true,
        headers: { apikey: ${JSON.stringify(SUPABASE_ANON_KEY)}, Authorization: 'Bearer ' + ${JSON.stringify(SUPABASE_ANON_KEY)}, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_code: CODE, p_platform: platform })
      }).catch(function () {});
    }
  } catch (e) {}

  var toast = document.getElementById('toast');
  function copyCode() {
    var done = function () { toast.textContent = 'Đã sao chép mã ' + CODE; };
    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(CODE).then(done, fallback);
        return;
      }
    } catch (e) {}
    fallback();
    function fallback() {
      // Trình duyệt trong Zalo / Facebook / Messenger thường chặn navigator.clipboard.
      try {
        var t = document.createElement('textarea');
        t.value = CODE; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
        document.body.appendChild(t); t.select(); t.setSelectionRange(0, 99);
        document.execCommand('copy'); document.body.removeChild(t); done();
      } catch (e) { toast.textContent = 'Hãy ghi nhớ mã ' + CODE + ' để nhập khi mở app'; }
    }
  }
  document.getElementById('copyBtn').addEventListener('click', copyCode);
  document.getElementById('iosBtn').addEventListener('click', function (e) {
    e.preventDefault(); copyCode();
    var href = this.href; setTimeout(function () { location.href = href; }, 350);
  });
  if (isAndroid) {
    // Android: mã đi kèm link Google Play, tự chuyển sau giây lát.
    setTimeout(function () { location.href = document.getElementById('androidBtn').href; }, 1200);
  }
})();
</script>
</body>
</html>
`;
}

for (const m of cfg.members) {
  const dir = path.join(__dirname, slugOf(m.code));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(m));
  console.log(`u/${slugOf(m.code)}/  ->  ${m.name} (${m.code})`);
}
