'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const audienceItems = document.querySelectorAll('.audience__chip, .audience__note');
  const audienceChips = document.querySelectorAll('.audience__chip');
  const audienceNoteText = document.querySelector('.audience__note-text');
  const audienceNoteLink = document.querySelector('.audience__note-link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const resultPhotos = [
    {
      id: 'result-01',
      src: 'assets/img/proof/web/result-01-featured.jpg',
      fullSrc: 'assets/img/proof/web/result-01-featured.jpg',
      alt: 'Фотоотзыв ученицы курса с боковым сравнением результата',
      title: 'Кейс 01 · 1,5 месяца',
      caption: 'Крупный фотоотзыв ученицы курса',
      isFeatured: true,
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      id: 'result-02',
      src: 'assets/img/proof/web/result-02.jpg',
      fullSrc: 'assets/img/proof/web/result-02.jpg',
      alt: 'Фотоотзыв ученицы курса с боковым сравнением до и после',
      title: 'Кейс 02 · 1,5 месяца',
      caption: 'Сравнение результата в одном ракурсе',
      isFeatured: false,
      previewFit: 'cover',
      previewPosition: 'center 66%',
      aspectRatio: '1 / 1',
    },
    {
      id: 'result-03',
      src: 'assets/img/proof/web/result-03.jpg',
      fullSrc: 'assets/img/proof/web/result-03.jpg',
      alt: 'Фотоотзыв ученицы курса с фронтальным сравнением до и после',
      title: 'Кейс 03 · 1,5 месяца',
      caption: 'Фотоотзыв ученицы курса',
      isFeatured: false,
      previewFit: 'cover',
      previewPosition: 'center 64%',
      aspectRatio: '1 / 1',
    },
    {
      id: 'result-04',
      src: 'assets/img/proof/web/result-04.jpg',
      fullSrc: 'assets/img/proof/web/result-04.jpg',
      alt: 'Фотоотзыв ученицы курса со сравнением в нескольких ракурсах',
      title: 'Кейс 04 · 1,5 месяца',
      caption: 'Сравнение в нескольких ракурсах',
      isFeatured: false,
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      id: 'result-05',
      src: 'assets/img/proof/web/result-05.jpg',
      fullSrc: 'assets/img/proof/web/result-05.jpg',
      alt: 'Фотоотзыв ученицы курса с боковым сравнением результата',
      title: 'Кейс 05 · 1,5 месяца',
      caption: 'Визуальный результат прохождения системы',
      isFeatured: false,
      previewFit: 'cover',
      previewPosition: 'center 65%',
      aspectRatio: '1 / 1',
    },
    {
      id: 'result-06',
      src: 'assets/img/proof/web/result-06.jpg',
      fullSrc: 'assets/img/proof/web/result-06.jpg',
      alt: 'Фотоотзыв ученицы курса с боковым сравнением до и после',
      title: 'Кейс 06 · 1,5 месяца',
      caption: 'Фотоотзыв после работы по программе',
      isFeatured: false,
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      id: 'result-07',
      src: 'assets/img/proof/web/result-07.jpg',
      fullSrc: 'assets/img/proof/web/result-07.jpg',
      alt: 'Фотоотзыв ученицы курса с несколькими ракурсами сравнения',
      title: 'Кейс 07 · 1,5 месяца',
      caption: 'Результат регулярных тренировок',
      isFeatured: false,
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
  ];

  const resultsById = new Map(resultPhotos.map((photo) => [photo.id, photo]));
  const resultLinks = document.querySelectorAll('[data-result-open]');
  const lightbox = document.querySelector('.results__lightbox');
  const lightboxImage = document.querySelector('.results__lightbox-image');
  const lightboxClose = document.querySelector('.results__lightbox-close');
  let lastResultTrigger = null;

  resultLinks.forEach((link) => {
    const photo = resultsById.get(link.dataset.resultOpen);
    const image = link.querySelector('img');

    if (!photo || !image) {
      return;
    }

    link.href = photo.fullSrc;
    link.style.setProperty('--result-fit', photo.previewFit);
    link.style.setProperty('--result-position', photo.previewPosition);
    link.style.setProperty('--result-ratio', photo.aspectRatio);
    image.src = photo.src;
    image.alt = photo.alt;
  });

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage || lightbox.hidden) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.src = '';
    lightboxImage.alt = 'Полное фотоотзыв ученицы курса';
    document.body.classList.remove('is-lightbox-open');

    if (lastResultTrigger) {
      lastResultTrigger.focus();
    }
  };

  const openLightbox = (photo, trigger) => {
    if (!lightbox || !lightboxImage || !lightboxClose) {
      return;
    }

    lastResultTrigger = trigger;
    lightboxImage.src = photo.fullSrc;
    lightboxImage.alt = photo.alt;
    lightbox.hidden = false;
    document.body.classList.add('is-lightbox-open');
    lightboxClose.focus();
  };

  resultLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const photo = resultsById.get(link.dataset.resultOpen);

      if (!photo) {
        return;
      }

      event.preventDefault();
      openLightbox(photo, link);
    });
  });

  if (lightbox && lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  const getPointWord = (count) => {
    const lastTwo = count % 100;
    const last = count % 10;

    if (lastTwo >= 11 && lastTwo <= 14) {
      return 'пунктов';
    }

    if (last === 1) {
      return 'пункт';
    }

    if (last >= 2 && last <= 4) {
      return 'пункта';
    }

    return 'пунктов';
  };

  const updateAudienceResult = () => {
    if (!audienceNoteText || !audienceNoteLink) {
      return;
    }

    const selectedCount = document.querySelectorAll('.audience__chip.is-selected').length;
    const messages = {
      2: 'Уже есть совпадения — похоже, тебе нужна не мотивация, а более понятный план',
      3: 'Ты отметила 3 пункта — похоже, тебе не хватает структуры, которая спокойно ведёт к результату',
      4: '4 совпадения — сейчас тебе особенно важно убрать хаос и собрать понятную систему',
      5: '5 совпадений — очень похоже, что ты давно пытаешься справиться сама, но тебе нужна структура',
      6: '6 совпадений — тебе точно подойдёт формат, где всё разложено спокойно и по шагам',
      7: '7 совпадений — тебе не нужен ещё один рывок, тебе нужна система, которая наконец останется с тобой',
      8: 'Ты отметила почти всё — похоже, тебе правда нужна спокойная система без хаоса и вечного начала заново',
      9: 'Ты отметила всё — тебе точно нужна система, где понятно, что делать с тренировками, питанием и прогрессом',
    };

    audienceNoteText.parentElement.classList.toggle('is-active', selectedCount >= 2);

    if (selectedCount >= 2) {
      audienceNoteText.textContent = messages[selectedCount] || `Ты отметила ${selectedCount} ${getPointWord(selectedCount)} — похоже, тебе нужна понятная система, где тренировки, питание и прогресс наконец складываются вместе`;
      audienceNoteLink.hidden = false;
      return;
    }

    if (selectedCount === 1) {
      audienceNoteText.textContent = 'Даже один пункт — повод не ругать себя, а спокойно понять, где сейчас не хватает системы';
      audienceNoteText.parentElement.classList.remove('is-active');
      audienceNoteLink.hidden = true;
      return;
    }

    audienceNoteText.textContent = 'Gym Girls Club — это забота о себе через тренировки, питание и систему, которая помогает прийти к результату спокойно и без\u00a0выгорания';
    audienceNoteText.parentElement.classList.remove('is-active');
    audienceNoteLink.hidden = true;
  };

  audienceChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const isSelected = chip.classList.toggle('is-selected');
      chip.setAttribute('aria-pressed', String(isSelected));
      updateAudienceResult();
    });
  });

  if (!audienceItems.length || reduceMotion || !('IntersectionObserver' in window)) {
    audienceItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
  });

  audienceItems.forEach((item) => observer.observe(item));
});
