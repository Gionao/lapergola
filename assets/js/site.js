(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = value => Math.max(0, Math.min(1, value));

  function mountCinematic() {
    const root = $('[data-cinematic]');
    if (!root) return;
    const stage = $('.stage', root);
    const header = $('.site-header');
    const content = $('.hero-content', root);
    const bottom = $('.scene-bottom', root);
    const shade = $('.shade', root);
    const sunset = $('.scene-sunset', root);
    const night = $('.scene-night', root);
    const controls = $('.intro-controls', root);
    const skip = $('.skip-intro', root);
    const arrow = $('.scroll-arrow', root);
    const heading = $('#hero-heading');
    const preference = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 520px)');
    let frame = 0;
    let active = false;
    let revealed;
    let distance = 0;
    let start = 0;

    function access(visible) {
      if (visible === revealed) return;
      const focused = document.activeElement;
      const inContent = header.contains(focused) || content.contains(focused) || bottom.contains(focused);
      const inControls = controls.contains(focused);
      revealed = visible;
      for (const element of [header, content, bottom]) {
        element.inert = !visible;
        element.setAttribute('aria-hidden', String(!visible));
      }
      controls.hidden = visible;
      if (!visible && inContent) skip.focus({ preventScroll: true });
      if (visible && inControls) heading.focus({ preventScroll: true });
    }

    function draw() {
      frame = 0;
      if (!active) return;
      const progress = clamp((scrollY - start) / distance);
      sunset.style.opacity = clamp((progress - .04) / .3);
      night.style.opacity = clamp((progress - .38) / .3);
      const reveal = clamp((progress - .75) / .24);
      shade.style.opacity = clamp((progress - .68) / .08);
      header.style.opacity = clamp((progress - .72) / .10);
      header.style.visibility = progress > .72 ? 'visible' : 'hidden';
      content.style.opacity = reveal;
      content.style.visibility = reveal > 0 ? 'visible' : 'hidden';
      bottom.style.opacity = reveal;
      bottom.style.visibility = reveal > 0 ? 'visible' : 'hidden';
      arrow.style.visibility = progress < .1 ? 'visible' : 'hidden';
      access(progress >= .99);
    }

    function requestDraw() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function measure() {
      start = root.getBoundingClientRect().top + scrollY;
      distance = Math.max(1, root.offsetHeight - stage.offsetHeight);
      requestDraw();
    }

    function configure() {
      active = preference.matches;
      root.classList.toggle('is-cinematic', active);
      document.documentElement.classList.toggle('intro-active', active);
      if (active) {
        revealed = undefined;
        measure();
        draw();
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        for (const element of [sunset, night, header, content, shade, bottom, arrow]) element.removeAttribute('style');
        for (const element of [header, content, bottom]) {
          element.inert = false;
          element.removeAttribute('aria-hidden');
        }
        controls.hidden = true;
      }
      document.documentElement.classList.remove('intro-boot');
    }

    skip.addEventListener('click', () => {
      window.scrollTo({ top: start + distance, behavior: 'instant' });
      draw();
      heading.focus({ preventScroll: true });
    });
    arrow.addEventListener('click', () => {
      skip.focus({ preventScroll: true });
      window.scrollTo({ top: start + distance * .36, behavior: 'smooth' });
    });
    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('pageshow', measure);
    preference.addEventListener('change', configure);
    configure();
  }

  function mountNavigation() {
    const menu = $('.mobile-nav');
    if (!menu) return;
    const summary = $('summary', menu);
    menu.addEventListener('toggle', () => summary.setAttribute('aria-label', menu.open ? 'Chiudi navigazione' : 'Apri navigazione'));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; summary.focus(); }
    });
    document.addEventListener('click', event => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  }

  function mountGallery() {
    const dialog = $('#lightbox');
    if (!dialog || typeof dialog.showModal !== 'function') return;
    const links = all('[data-lightbox]');
    const image = $('img', dialog);
    const caption = $('p', dialog);
    let index = 0;
    let opener;
    function show(next) {
      index = (next + links.length) % links.length;
      image.src = links[index].href;
      image.alt = $('img', links[index]).alt;
      caption.textContent = (index + 1) + ' / ' + links.length + ' · ' + image.alt;
    }
    links.forEach((link, i) => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      show(i);
      dialog.showModal();
    }));
    $('[data-close]', dialog).addEventListener('click', () => dialog.close());
    $('[data-prev]', dialog).addEventListener('click', () => show(index - 1));
    $('[data-next]', dialog).addEventListener('click', () => show(index + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        show(index + (event.key === 'ArrowLeft' ? -1 : 1));
      }
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { opener?.focus(); image.removeAttribute('src'); });
  }

  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function imagePath(value) {
    return typeof value === 'string' && /^assets\/[a-z0-9/_., -]+\.(avif|webp|png|jpe?g)$/i.test(value) && !value.includes('..');
  }

  function mountMenu() {
    const container = $('#menu-list');
    const data = window.PERGOLA?.menu;
    if (!container || !data?.items?.length) return;
    const visibleCategories = data.categories.filter(category => data.items.some(item => item.category === category.id));
    if (!visibleCategories.length) return;
    container.replaceChildren();
    $('.page-title .lead').textContent = 'Esplora le proposte per categoria.';
    const filter = $('#category');
    $('.menu-tools').hidden = false;
    const money = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' });
    for (const category of visibleCategories) {
      const items = data.items.filter(item => item.category === category.id);
      const option = node('option', category.name);
      option.value = category.id;
      filter.append(option);
      const section = node('section', undefined, 'menu-group');
      section.dataset.category = category.id;
      section.append(node('h2', category.name));
      for (const item of items) {
        const article = node('article', undefined, 'menu-item');
        if (imagePath(item.image)) {
          const picture = node('img');
          picture.src = item.image;
          picture.alt = item.name;
          picture.loading = 'lazy';
          article.append(picture);
        }
        const description = node('div');
        description.append(node('h3', item.name));
        if (item.description) description.append(node('p', item.description));
        if (item.ingredients?.length) description.append(node('p', 'Ingredienti · ' + item.ingredients.join(', ')));
        if (item.allergens?.length) description.append(node('p', 'Allergeni · ' + item.allergens.join(', ')));
        description.append(node('p', (item.seasonal ? 'Stagionale · ' : '') + (item.available ? 'Disponibile' : 'Al momento non disponibile')));
        article.append(description);
        if (Number.isFinite(item.price)) article.append(node('strong', money.format(item.price)));
        section.append(article);
      }
      container.append(section);
    }
    filter.addEventListener('change', () => {
      all('[data-category]', container).forEach(section => {
        section.hidden = !!filter.value && section.dataset.category !== filter.value;
      });
    });
  }

  function mountEvents() {
    const list = $('#events-list');
    const detail = $('#event-detail');
    const events = (window.PERGOLA?.events || []).filter(event => event.published && Number.isFinite(Date.parse(event.startsAt)));
    const date = value => new Intl.DateTimeFormat('it-IT', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Rome' }).format(new Date(value));
    if (list) {
      const future = events.filter(event => Date.parse(event.endsAt || event.startsAt) >= Date.now())
        .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
      if (future.length) list.replaceChildren();
      for (const event of future) {
        const article = node('article', undefined, 'event-card');
        const time = node('time', date(event.startsAt));
        time.dateTime = event.startsAt;
        const heading = node('h2');
        const link = node('a', event.title);
        link.href = 'evento.html?slug=' + encodeURIComponent(event.slug);
        heading.append(link);
        article.append(time, heading, node('p', event.summary));
        list.append(article);
      }
    }
    if (detail) {
      const slug = new URLSearchParams(location.search).get('slug');
      const event = events.find(event => event.slug === slug);
      if (!event) return;
      document.title = event.title + ' | La Pergola';
      $('h1', detail).textContent = event.title;
      $('.lead', detail).textContent = event.summary;
      const body = $('.content-section', detail);
      const contents = node('div', undefined, 'prose');
      const time = node('time', date(event.startsAt));
      time.dateTime = event.startsAt;
      contents.append(time);
      for (const paragraph of event.description.split('\n').filter(Boolean)) contents.append(node('p', paragraph));
      body.prepend(contents);
    }
  }

  function mountContacts() {
    const restaurant = window.PERGOLA?.restaurant;
    if (!restaurant) return;
    all('[data-contact]').forEach(element => {
      const value = restaurant[element.dataset.contact];
      if (typeof value === 'string') element.textContent = value;
    });
    all('a[href^="tel:"]').forEach(link => {
      if (/^\+\d+$/.test(restaurant.telephone)) link.href = 'tel:' + restaurant.telephone;
    });
    all('[data-map]').forEach(link => {
      const value = restaurant[link.dataset.map];
      if (typeof value === 'string' && value.startsWith('https://')) link.href = value;
    });
  }

  mountCinematic();
  mountNavigation();
  mountGallery();
  mountMenu();
  mountEvents();
  mountContacts();
})();

