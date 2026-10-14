(() => {
  const storageKey = 'fusionia-cart-v1';
  let cart = {};
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    for (const p of products) {
      const quantity = saved?.[p.type];
      if (Number.isInteger(quantity) && quantity > 0) cart[p.type] = Math.min(99, quantity);
    }
  } catch {}
  const header = document.querySelector('header');
  header.insertAdjacentHTML('beforeend', '<button type="button" class="cart-trigger" aria-haspopup="dialog" aria-controls="cart-dialog" aria-label="Abrir carrito, 0 productos"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 3h3l3 13h11l3-10H6"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></svg><span class="cart-label">Carrito</span><span id="cart-count">0</span></button>');
  document.body.insertAdjacentHTML('beforeend', `<dialog id="cart-dialog" class="cart-dialog" aria-labelledby="cart-title"><div class="cart-panel"><div class="cart-heading"><div><div class="eyebrow">FUSIONIA / TU PRÓXIMO SETUP</div><h2 id="cart-title">Tu carrito<span>.</span></h2></div><button type="button" class="cart-close" aria-label="Cerrar carrito">×</button></div><p class="cart-intro">Tus próximos upgrades, en un solo lugar.</p><div id="cart-items" class="cart-items"></div><div class="cart-summary" id="cart-summary"><div class="cart-total"><span>Total referencial</span><strong id="cart-total"></strong></div><p>Valores de demostración en CLP. Disponibilidad, precio final y despacho por confirmar con Fusionia.</p><button type="button" class="cart-bank-payment" disabled title="Disponible próximamente">Realizar pago con tarjetas bancarias</button><a id="cart-checkout" class="button cart-checkout" target="_blank" rel="noopener">Enviar pedido por WhatsApp ↗</a></div><button type="button" class="cart-continue">Seguir explorando <span>→</span></button><p class="cart-storage-note">Guardado en este navegador.</p></div></dialog><div id="cart-status" class="cart-status" role="status" aria-live="polite"></div>`);
  const dialog = document.getElementById('cart-dialog');
  const items = document.getElementById('cart-items');
  const trigger = document.querySelector('.cart-trigger');
  let returnFocus, toastTimer;
  function save() {
    try { localStorage.setItem(storageKey, JSON.stringify(cart)); } catch {}
  }
  function update() {
    const entries = products.filter(p => cart[p.type]);
    const count = entries.reduce((sum, p) => sum + cart[p.type], 0);
    const total = entries.reduce((sum, p) => sum + p.price * cart[p.type], 0);
    document.getElementById('cart-count').textContent = count;
    trigger.setAttribute('aria-label', `Abrir carrito, ${count} productos`);
    items.innerHTML = entries.length ? entries.map(p => `<article class="cart-item"><div class="cart-thumb">${art(p.type)}</div><div class="cart-item-info"><span>${p.category}</span><h3>${p.name}</h3><p>${money(p.price)} c/u</p><div class="cart-item-actions"><div class="cart-quantity"><button type="button" data-quantity="${p.type}" data-step="-1" aria-label="Reducir cantidad de ${p.name}" ${cart[p.type] === 1 ? 'disabled' : ''}>−</button><output aria-label="Cantidad de ${p.name}">${cart[p.type]}</output><button type="button" data-quantity="${p.type}" data-step="1" aria-label="Aumentar cantidad de ${p.name}" ${cart[p.type] === 99 ? 'disabled' : ''}>+</button></div><strong>${money(p.price * cart[p.type])}</strong></div><button type="button" class="cart-remove" data-remove="${p.type}" aria-label="Eliminar ${p.name} del carrito">Eliminar</button></div></article>`).join('') : '<div class="cart-empty"><span>＋</span><h3>Tu próximo setup empieza aquí.</h3><p>Agrega un producto para armar tu pedido.</p></div>';
    document.getElementById('cart-total').textContent = money(total);
    document.getElementById('cart-summary').hidden = !entries.length;
    const message = ['Hola Fusionia, quiero consultar por estos productos:', '', ...entries.map(p => `• ${p.name} — ${cart[p.type]} unidad(es) x ${money(p.price)} = ${money(p.price * cart[p.type])}`), '', `Total referencial: ${money(total)} CLP.`, 'Entiendo que son precios de demostración. ¿Me confirman disponibilidad, precio final y despacho?'].join('\n');
    document.getElementById('cart-checkout').href = 'https://wa.me/56966274175?text=' + encodeURIComponent(message);
  }
  function announce(message) {
    const toast = document.getElementById('cart-status');
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 2800);
  }
  function add(type) {
    const p = products.find(p => p.type === type);
    if (!p) return;
    if ((cart[type] || 0) >= 99) { announce('Máximo 99 unidades por producto.'); return; }
    cart[type] = (cart[type] || 0) + 1;
    save(); update();
    announce(p.name + ' agregado al carrito');
  }
  trigger.onclick = () => {
    returnFocus = document.activeElement;
    clearInterval(timer);
    dialog.showModal();
    document.body.classList.add('cart-open');
    dialog.querySelector('.cart-close').focus();
  };
  const close = () => dialog.close();
  dialog.querySelector('.cart-close').onclick = close;
  dialog.querySelector('.cart-continue').onclick = close;
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('cart-open'); returnFocus?.focus(); restart(); });
  document.addEventListener('click', e => { const button = e.target.closest('[data-add-product]'); if (button) add(button.dataset.addProduct); });
  items.addEventListener('click', e => {
    const quantity = e.target.closest('[data-quantity]');
    const remove = e.target.closest('[data-remove]');
    if (quantity) {
      const type = quantity.dataset.quantity;
      cart[type] = Math.max(1, Math.min(99, cart[type] + Number(quantity.dataset.step)));
      save(); update();
      const replacement = items.querySelector(`[data-quantity="${type}"][data-step="${quantity.dataset.step}"]`);
      (replacement?.disabled ? items.querySelector(`[data-quantity="${type}"]:not(:disabled)`) : replacement)?.focus();
    }
    if (remove) {
      const p = products.find(p => p.type === remove.dataset.remove);
      delete cart[remove.dataset.remove]; save(); update();
      (items.querySelector('button:not(:disabled)') || dialog.querySelector('.cart-continue')).focus();
      announce(p.name + ' eliminado del carrito');
    }
  });
  window.addEventListener('storage', e => {
    if (e.key !== storageKey && e.key !== null) return;
    try { const data = JSON.parse(e.newValue || '{}'); cart = {}; for (const p of products) if (Number.isInteger(data?.[p.type]) && data[p.type] > 0) cart[p.type] = Math.min(99, data[p.type]); update(); } catch {}
  });
  update();
})();
