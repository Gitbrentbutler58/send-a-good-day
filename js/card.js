(function () {
  const design = document.body.dataset.design;
  const params = new URLSearchParams(location.hash.slice(1));
  const msgId = params.get('m');
  const to = sanitizeName(params.get('t') ? decodeURIComponent(params.get('t')) : '');
  const from = sanitizeName(params.get('f') ? decodeURIComponent(params.get('f')) : '');

  const msg = (msgId && MESSAGES[msgId]) ? MESSAGES[msgId] : MESSAGES[DESIGNS[design].fallbackMsg];
  const showNames = msgId && MESSAGES[msgId]; // only show names on a genuine, intact link

  const artEl = document.getElementById('card-art');
  const messageEl = document.getElementById('card-message');
  const namesEl = document.getElementById('card-names');
  const sealBtn = document.getElementById('seal-btn');
  const sealStage = document.getElementById('seal-stage');
  const revealStage = document.getElementById('reveal-stage');

  artEl.innerHTML = DESIGNS[design].svg();
  messageEl.textContent = msg.text;

  if (showNames) {
    if (to && from) namesEl.textContent = `To ${to} — from ${from}`;
    else if (to) namesEl.textContent = `For ${to}`;
    else if (from) namesEl.textContent = `From ${from}`;
    else namesEl.textContent = '';
  } else {
    namesEl.textContent = '';
  }

  const giftLink = document.getElementById('gift-shop-link');
  const giftCode = document.getElementById('gift-code');
  const loopLink = document.getElementById('loop-link');
  const footerShopLink = document.getElementById('footer-shop-link');
  const footerStandingOrderLink = document.getElementById('footer-standing-order-link');

  giftCode.textContent = CONFIG.codes.recipient;
  giftLink.href = CONFIG.discountUrl(CONFIG.codes.recipient, 'recipient-gift', { utm_content: design });
  loopLink.href = CONFIG.linkUrl(SITE_BASE, 'loop');
  footerShopLink.href = CONFIG.linkUrl(CONFIG.shopBase, 'about-footer');
  footerStandingOrderLink.href = CONFIG.linkUrl(CONFIG.standingOrderUrl, 'team-footer');

  function open() {
    sealStage.hidden = true;
    revealStage.hidden = false;
    revealStage.classList.add('is-open');
    messageEl.focus({ preventScroll: true });
  }

  sealBtn.addEventListener('click', open);
  sealBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });
})();
