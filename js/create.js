(function () {
  const categoryChips = document.getElementById('category-chips');
  const messageOptions = document.getElementById('message-options');
  const designSwatches = document.getElementById('design-swatches');
  const toInput = document.getElementById('to-name');
  const fromInput = document.getElementById('from-name');
  const toHint = document.getElementById('to-hint');
  const fromHint = document.getElementById('from-hint');
  const previewArt = document.getElementById('preview-art');
  const previewMessage = document.getElementById('preview-message');
  const previewNames = document.getElementById('preview-names');
  const form = document.getElementById('creator-form');
  const sharePanel = document.getElementById('share-panel');
  const senderShopLink = document.getElementById('sender-shop-link');
  const senderCode = document.getElementById('sender-code');
  const footerShopLink = document.getElementById('footer-shop-link');
  const footerStandingOrderLink = document.getElementById('footer-standing-order-link');

  let state = {
    category: CATEGORIES[0].id,
    messageId: null,
    designId: CATEGORIES[0].suggests,
  };

  function messagesForCategory(catId) {
    return Object.entries(MESSAGES).filter(([, m]) => m.cat === catId);
  }

  function renderCategories() {
    categoryChips.innerHTML = CATEGORIES.map((c, i) => `
      <div class="chip">
        <input type="radio" name="category" id="cat-${c.id}" value="${c.id}" ${i === 0 ? 'checked' : ''}>
        <label for="cat-${c.id}">${c.label}</label>
      </div>
    `).join('');
    categoryChips.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        state.category = input.value;
        const cat = CATEGORIES.find(c => c.id === input.value);
        state.designId = cat.suggests;
        renderMessages();
        renderDesigns();
        updatePreview();
      });
    });
  }

  function renderMessages() {
    const msgs = messagesForCategory(state.category);
    state.messageId = msgs[0][0];
    messageOptions.innerHTML = msgs.map(([id, m], i) => `
      <div class="option-card">
        <input type="radio" name="message" id="msg-${id}" value="${id}" ${i === 0 ? 'checked' : ''}>
        <label for="msg-${id}">${escapeHtml(m.text)}</label>
      </div>
    `).join('');
    messageOptions.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        state.messageId = input.value;
        updatePreview();
      });
    });
  }

  function renderDesigns() {
    designSwatches.innerHTML = Object.entries(DESIGNS).map(([id, d]) => `
      <div class="design-swatch">
        <input type="radio" name="design" id="design-${id}" value="${id}" ${id === state.designId ? 'checked' : ''}>
        <label for="design-${id}">${d.svg()}</label>
        <span class="swatch-name">${d.name}</span>
      </div>
    `).join('');
    designSwatches.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', () => {
        state.designId = input.value;
        updatePreview();
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function namesLine(to, from) {
    if (to && from) return `To ${to} — from ${from}`;
    if (to) return `For ${to}`;
    if (from) return `From ${from}`;
    return '';
  }

  function updatePreview() {
    const design = DESIGNS[state.designId];
    previewArt.innerHTML = design.svg();
    previewMessage.textContent = MESSAGES[state.messageId].text;
    const to = sanitizeName(toInput.value);
    const from = sanitizeName(fromInput.value);
    previewNames.textContent = namesLine(to, from);
  }

  function validateNameField(input, hint) {
    const raw = input.value.trim();
    if (!raw) { hint.textContent = ''; hint.classList.remove('show'); return; }
    const clean = sanitizeName(raw);
    if (!clean) {
      hint.textContent = 'Just letters, please — up to 24.';
      hint.classList.add('show');
    } else {
      hint.textContent = '';
      hint.classList.remove('show');
    }
  }

  toInput.addEventListener('input', () => { validateNameField(toInput, toHint); updatePreview(); });
  fromInput.addEventListener('input', () => { validateNameField(fromInput, fromHint); updatePreview(); });

  function buildLink() {
    const frag = new URLSearchParams();
    frag.set('m', state.messageId);
    const to = sanitizeName(toInput.value);
    const from = sanitizeName(fromInput.value);
    if (to) frag.set('t', to);
    if (from) frag.set('f', from);
    return `${SITE_BASE}card/${state.designId}.html#${frag.toString()}`;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const link = buildLink();
    sharePanel.hidden = false;
    senderCode.textContent = CONFIG.codes.sender;
    senderShopLink.href = CONFIG.discountUrl(CONFIG.codes.sender, 'sender-thanks');
    window.SendAGoodDay = window.SendAGoodDay || {};
    window.SendAGoodDay.currentLink = link;
    window.SendAGoodDay.currentDesign = state.designId;
    window.SendAGoodDay.currentMessage = MESSAGES[state.messageId].text;
    window.SendAGoodDay.currentTo = sanitizeName(toInput.value);
    window.SendAGoodDay.currentFrom = sanitizeName(fromInput.value);
    sharePanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.wireShareButtons) window.wireShareButtons();
  });

  footerShopLink.href = CONFIG.linkUrl(CONFIG.shopBase, 'footer');
  footerStandingOrderLink.href = CONFIG.linkUrl(CONFIG.standingOrderUrl, 'footer-team');

  renderCategories();
  renderMessages();
  renderDesigns();
  updatePreview();
})();
