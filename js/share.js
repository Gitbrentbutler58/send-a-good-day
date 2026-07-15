(function () {
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '', lines = [];
    for (const w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
      else line = test;
    }
    lines.push(line);
    lines.forEach((l, i) => ctx.fillText(l, x, y + i * lineHeight));
    return lines.length;
  }

  async function downloadCardImage(designId, msgText, to, from) {
    const c = document.createElement('canvas');
    c.width = 1080; c.height = 1350;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fffdf9';
    ctx.fillRect(0, 0, 1080, 1350);

    try {
      if (document.fonts && document.fonts.load) {
        await document.fonts.load('600 54px Fraunces');
      }
    } catch (e) { /* font not available locally — fall back to serif below */ }

    const svgMarkup = DESIGNS[designId].svg().replace(/var\(--([a-z]+)\)/g, (_, name) => {
      const map = {
        cream: '#faf6f0', paper: '#fffdf9', roast: '#2b1d14', coffee: '#6f4e37',
        taupe: '#7a6a5c', caramel: '#c98a3c', amber: '#e0a458', sand: '#f0dcc0',
        navy: '#1f3a5f', leaf: '#3f7d5a', sage: '#cfe4d6', blush: '#f6e2df', brick: '#b1503f',
      };
      return map[name] || '#000000';
    });
    const img = new Image();
    const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgMarkup);
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = svgUrl; });
    ctx.drawImage(img, 90, 90, 900, 675);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#2b1d14';
    ctx.font = '600 54px Fraunces, Georgia, serif';
    const lines = wrapText(ctx, msgText, 540, 880, 860, 68);

    ctx.font = '400 34px Fraunces, Georgia, serif';
    ctx.fillStyle = '#6f4e37';
    const names = to && from ? `To ${to} — from ${from}` : to ? `For ${to}` : from ? `From ${from}` : '';
    if (names) ctx.fillText(names, 540, 880 + lines * 68 + 40);

    ctx.font = '28px system-ui, sans-serif';
    ctx.fillStyle = '#7a6a5c';
    ctx.fillText('Send a Good Day  ·  by Good Day Coffee', 540, 1290);

    return new Promise(resolve => {
      c.toBlob(blob => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'a-good-day-for-you.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(a.href);
        resolve();
      }, 'image/png');
    });
  }

  window.wireShareButtons = function () {
    const data = window.SendAGoodDay || {};
    const copyBtn = document.getElementById('copy-link-btn');
    const nativeBtn = document.getElementById('native-share-btn');
    const downloadBtn = document.getElementById('download-btn');
    const status = document.getElementById('share-status');

    if (nativeBtn) nativeBtn.hidden = !navigator.share;

    if (copyBtn && !copyBtn.dataset.wired) {
      copyBtn.dataset.wired = '1';
      copyBtn.addEventListener('click', async () => {
        const link = window.SendAGoodDay.currentLink;
        try {
          await navigator.clipboard.writeText(link);
        } catch (e) {
          const input = document.createElement('input');
          input.value = link;
          input.setAttribute('readonly', '');
          input.style.position = 'absolute';
          input.style.left = '-9999px';
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
        }
        status.textContent = 'Copied! Now go make someone’s day.';
      });
    }

    if (nativeBtn && !nativeBtn.dataset.wired) {
      nativeBtn.dataset.wired = '1';
      nativeBtn.addEventListener('click', async () => {
        try {
          await navigator.share({ title: 'A good day, for you', url: window.SendAGoodDay.currentLink });
        } catch (e) { /* user cancelled share sheet — nothing to report */ }
      });
    }

    if (downloadBtn && !downloadBtn.dataset.wired) {
      downloadBtn.dataset.wired = '1';
      downloadBtn.addEventListener('click', async () => {
        downloadBtn.disabled = true;
        status.textContent = 'Preparing your image…';
        try {
          await downloadCardImage(
            window.SendAGoodDay.currentDesign,
            window.SendAGoodDay.currentMessage,
            window.SendAGoodDay.currentTo,
            window.SendAGoodDay.currentFrom
          );
          status.textContent = 'Downloaded!';
        } catch (e) {
          status.textContent = 'Could not create the image — try Copy link instead.';
        }
        downloadBtn.disabled = false;
      });
    }
  };
})();
