(() => {
  const dialog = document.getElementById('letter-dialog');
  if (!dialog) return;
  const trigger = document.querySelector('.compose-open');
  const form = dialog.querySelector('.letter-form');
  const submit = dialog.querySelector('.letter-submit');
  const close = dialog.querySelector('.letter-close');
  const status = document.getElementById('letter-status');
  const feedback = document.getElementById('letter-feedback');
  let sending = false;
  let animationTimer;

  function unlock() {
    sending = false;
    form.removeAttribute('aria-busy');
    submit.disabled = false;
    close.disabled = false;
    submit.innerHTML = 'Invia <span aria-hidden="true">↗</span>';
  }
  function resetMotion() {
    clearTimeout(animationTimer);
    dialog.classList.remove('is-sending');
    document.body.classList.remove('lock');
    unlock();
  }
  trigger.addEventListener('click', () => {
    if (sending) return;
    resetMotion();
    status.textContent = '';
    feedback.textContent = '';
    dialog.showModal();
    document.body.classList.add('lock');
  });
  close.addEventListener('click', () => { if (!sending) dialog.close(); });
  dialog.addEventListener('cancel', event => { if (sending) event.preventDefault(); });
  dialog.addEventListener('close', resetMotion);
  dialog.addEventListener('click', event => {
    if (event.target !== dialog || sending) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity()) return;
    const fields = new FormData(form);
    const name = String(fields.get('name') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const message = String(fields.get('message') || '').trim();
    const honey = String(fields.get('website') || '').trim();
    if (honey) return;
    if (!name || !message) {
      const empty = !name ? form.elements.name : form.elements.message;
      empty.setCustomValidity('Scrivi qualche parola prima di continuare.');
      empty.reportValidity();
      empty.addEventListener('input', () => empty.setCustomValidity(''), {once:true});
      return;
    }
    sending = true;
    form.setAttribute('aria-busy', 'true');
    submit.disabled = true;
    close.disabled = true;
    submit.textContent = 'Invio in corso…';
    feedback.textContent = 'Sto inoltrando il messaggio…';
    const controller = new AbortController();
    const requestTimeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await window.fetch('https://formsubmit.co/ajax/' + encodeURIComponent(window.PORTFOLIO.email), {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Accept':'application/json'},
        signal: controller.signal,
        body: JSON.stringify({
          name, email, message,
          _replyto: email,
          _subject: 'Portfolio — messaggio di ' + name,
          _template: 'table',
          _captcha: 'false',
          _honey: honey,
          _url: window.location.href
        })
      });
      const result = await response.json();
      const activation = /activat|confirm.{0,50}email|verify.{0,50}email/i.test(String(result.message || ''));
      if (activation) {
        feedback.textContent = 'Il modulo richiede la conferma dell’indirizzo del destinatario. Il messaggio non è ancora stato recapitato.';
        unlock();
        return;
      }
      if (!response.ok || !(result.success === true || result.success === 'true')) throw new Error('submission-rejected');
      feedback.textContent = '';
      dialog.classList.add('is-sending');
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      animationTimer = window.setTimeout(() => {
        dialog.close();
        form.reset();
        trigger.innerHTML = 'Scrivi un altro messaggio <span aria-hidden="true">↗</span>';
        status.textContent = 'Messaggio acquisito dal servizio di invio. Grazie per avermi scritto!';
        trigger.focus();
      }, reduced ? 200 : 1450);
    } catch (error) {
      feedback.textContent = error.name === 'AbortError'
        ? 'Il servizio non ha confermato l’invio in tempo. Il testo è ancora qui; riprova fra poco.'
        : 'Invio non riuscito. Il testo è ancora qui: controlla la connessione e riprova.';
      unlock();
    } finally {
      clearTimeout(requestTimeout);
    }
  });
})();
