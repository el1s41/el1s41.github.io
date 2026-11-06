(() => {
  const dialog = document.getElementById('letter-dialog');
  if (!dialog) return;
  const trigger = document.querySelector('.compose-open');
  const form = dialog.querySelector('.letter-form');
  const submit = dialog.querySelector('.letter-submit');
  const status = document.getElementById('letter-status');
  const fallback = document.querySelector('.letter-fallback');
  let closeTimer;
  let sending = false;

  function resetMotion() {
    clearTimeout(closeTimer);
    dialog.classList.remove('is-sending');
    form.removeAttribute('aria-busy');
    submit.disabled = false;
    sending = false;
    document.body.classList.remove('lock');
  }

  trigger.addEventListener('click', () => {
    resetMotion();
    status.textContent = '';
    dialog.showModal();
    document.body.classList.add('lock');
  });
  dialog.querySelector('.letter-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', resetMotion);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog || sending) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const message = String(fields.get('message') || '').trim();
    if (!name || !message) {
      const empty = !name ? form.elements.name : form.elements.message;
      empty.setCustomValidity('Scrivi qualche parola prima di continuare.');
      empty.reportValidity();
      empty.addEventListener('input', () => empty.setCustomValidity(''), {once:true});
      return;
    }
    const body = message + '\n\n' + name + '\n' + email;
    const mailto = 'mailto:' + window.PORTFOLIO.email + '?subject=' + encodeURIComponent('Portfolio — messaggio di ' + name) + '&body=' + encodeURIComponent(body);
    fallback.href = mailto;
    fallback.hidden = false;
    sending = true;
    form.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    dialog.classList.add('is-sending');
    // Keep the mail handoff within the submit gesture; the animation remains local.
    window.location.href = mailto;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    closeTimer = window.setTimeout(() => {
      dialog.close();
      trigger.textContent = 'Riapri la lettera ↗';
      status.textContent = 'La bozza è pronta. Completa l’invio nella tua app di posta. Se non si è aperta, usa il collegamento qui sotto o scrivi direttamente all’indirizzo email.';
      trigger.focus();
    }, reduceMotion ? 200 : 1450);
  });
})();
