'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const audienceItems = document.querySelectorAll('.audience__chip, .audience__note');
  const audienceChips = document.querySelectorAll('.audience__chip');
  const audienceNoteText = document.querySelector('.audience__note-text');
  const audienceNoteLink = document.querySelector('.audience__note-link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tariffPlans = [
    {
      id: 'angels',
      title: 'Angels Club',
      badge: 'ОСНОВНОЙ ПОТОК',
      highlight: '',
      description: 'Путь внутри комьюнити и системы: тренировки, таблица прогресса, материалы, поддержка и проверки техники.',
      price: '',
      oldPrice: '',
      image: 'assets/img/tariffs/angels-club.jpg',
      imageAlt: 'Автор курса в пудровом спортивном комплекте, визуал тарифа Angels Club',
      imageClass: 'tariffs__media--portrait',
      features: [
        'тренировки для дома и зала с прогрессией нагрузки',
        'видео с техникой выполнения',
        'умная таблица с встроенной периодизацией',
        'общий чат поддержки со мной',
        'проверка техники 1 раз в неделю по лимитам',
        'питание без ограничений: 125+ рецептов, сборники, калькулятор КБЖУ, гайды',
        'комплексы на кор и осанку',
        'работа над лимфой: дыхательные практики',
      ],
      note: '',
      chips: [],
      cta: 'Выбрать Angels Club',
      variant: 'main',
    },
    {
      id: 'private',
      title: 'Private Club',
      badge: 'ЛИЧНОЕ ВЕДЕНИЕ',
      highlight: '',
      description: 'Более глубокое сопровождение и личная работа на протяжении потока.',
      price: '',
      oldPrice: '',
      image: 'assets/img/tariffs/private-club.jpg',
      imageAlt: 'Автор курса выполняет упражнение на коврике, визуал тарифа Private Club',
      imageClass: 'tariffs__media--wide',
      features: [
        'всё, что входит в Angels Club',
        'личное сопровождение от меня',
        'индивидуальные рекомендации и корректировки',
        'более глубокий разбор техники',
        'помощь с прогрессией нагрузки',
        'адаптация программы под вас',
        'контроль прогресса на протяжении потока',
        'приоритетная поддержка и ответы',
      ],
      note: '',
      chips: [],
      cta: 'Хочу личное ведение',
      variant: 'premium',
    },
    {
      id: 'back',
      title: 'Back to GGC',
      badge: 'ДЛЯ ВЫПУСКНИЦ · −50%',
      highlight: '',
      description: 'Возвращение в систему и новый этап для себя.',
      price: '',
      oldPrice: '',
      image: 'assets/img/tariffs/back-to-ggc-discount.png',
      imageAlt: 'Пудровая premium-графика со скидкой 50% для выпускниц',
      imageClass: 'tariffs__media--graphic',
      text: 'Для тех, кто уже был на моём курсе и\u00a0хочет вернуться в поток, обновить результаты и пройти новый этап вместе с\u00a0нами.',
      features: [
        'всё, что входит в Angels Club',
        'доступ к новому потоку',
        'возвращение в систему тренировок',
        'специальная скидка 50% для участниц прошлых\u00a0потоков',
      ],
      note: '',
      chips: [],
      cta: 'Вернуться в GGC',
      variant: 'alumni',
    },
    {
      id: 'materials',
      title: 'Центр материалов',
      badge: 'САМОСТОЯТЕЛЬНЫЙ ДОСТУП',
      highlight: '',
      description: 'Материалы курса без участия в потоке и без сопровождения.',
      price: '',
      oldPrice: '',
      image: 'assets/img/tariffs/materials-center-premium.png',
      imageAlt: 'Минималистичный premium-визуал центра материалов с телефоном, папкой и карандашом',
      imageClass: 'tariffs__media--materials',
      features: [
        '125+ рецептов',
        'сборники по питанию',
        'калькулятор КБЖУ',
        'гайды по питанию, режиму и телу',
        'комплексы на кор и осанку',
        'дыхательные практики для работы с лимфой',
      ],
      note: 'Без чата, проверки техники, личных корректировок и тренировочного потока.',
      chips: [],
      cta: 'Получить материалы',
      variant: 'materials',
    },
  ];

  const tariffsGrid = document.querySelector('[data-tariffs-grid]');
  const createTextElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    element.textContent = text;
    return element;
  };

  if (tariffsGrid) {
    tariffPlans.forEach((tariff) => {
      const card = document.createElement('article');
      card.className = `tariffs__card tariffs__card--${tariff.variant} reveal-up`;
      card.dataset.tariffId = tariff.id;

      const top = document.createElement('div');
      top.className = 'tariffs__card-top';

      const badge = createTextElement('span', 'tariffs__badge', tariff.badge);
      top.append(badge);

      if (tariff.highlight) {
        top.append(createTextElement('span', 'tariffs__highlight', tariff.highlight));
      }

      card.append(top);

      if (tariff.image) {
        const media = document.createElement('figure');
        media.className = `tariffs__media ${tariff.imageClass || ''}`.trim();

        const image = document.createElement('img');
        image.src = tariff.image;
        image.alt = tariff.imageAlt || '';
        image.loading = 'lazy';
        image.addEventListener('error', () => {
          media.hidden = true;
        }, { once: true });

        media.append(image);
        card.append(media);
      }

      card.append(createTextElement('h3', 'tariffs__title', tariff.title));
      card.append(createTextElement('p', 'tariffs__description', tariff.description));

      if (tariff.text) {
        card.append(createTextElement('p', 'tariffs__text', tariff.text));
      }

      if (tariff.price) {
        const price = document.createElement('p');
        price.className = 'tariffs__price';
        if (tariff.oldPrice) {
          price.append(createTextElement('s', 'tariffs__old-price', tariff.oldPrice));
        }
        price.append(createTextElement('strong', '', tariff.price));
        card.append(price);
      }

      const list = document.createElement('ul');
      list.className = 'tariffs__features';
      tariff.features.forEach((feature) => {
        list.append(createTextElement('li', '', feature));
      });
      card.append(list);

      if (tariff.chips.length) {
        const chips = document.createElement('div');
        chips.className = 'tariffs__chips';
        tariff.chips.forEach((chip) => {
          chips.append(createTextElement('span', 'tariffs__chip', chip));
        });
        card.append(chips);
      }

      if (tariff.note) {
        card.append(createTextElement('p', 'tariffs__note', tariff.note));
      }

      const action = document.createElement('a');
      action.className = 'program__cta tariffs__cta';
      action.href = '#';
      action.dataset.tariffCta = tariff.id;
      action.textContent = tariff.cta;
      card.append(action);

      tariffsGrid.append(card);
    });
  }

  const tariffsCarousel = document.querySelector('.tariffs__carousel');
  const tariffsTrack = document.querySelector('[data-tariffs-track]');
  const tariffsProgress = document.querySelector('[data-tariffs-progress]');
  const tariffScrollButtons = document.querySelectorAll('[data-tariffs-scroll]');

  const updateTariffsProgress = () => {
    if (!tariffsTrack || !tariffsProgress) {
      return;
    }

    const maxScroll = tariffsTrack.scrollWidth - tariffsTrack.clientWidth;
    const visibleRatio = tariffsTrack.scrollWidth > 0
      ? tariffsTrack.clientWidth / tariffsTrack.scrollWidth
      : 1;
    const thumbWidth = Math.max(visibleRatio * 100, 16);
    const travel = 100 - thumbWidth;
    const progress = maxScroll > 0
      ? (tariffsTrack.scrollLeft / maxScroll) * travel
      : 0;
    const isAtStart = tariffsTrack.scrollLeft <= 1;
    const isAtEnd = maxScroll <= 1 || tariffsTrack.scrollLeft >= maxScroll - 1;
    const hasScroll = maxScroll > 1;

    tariffsProgress.style.width = `${thumbWidth}%`;
    tariffsProgress.style.marginLeft = `${progress}%`;
    tariffsCarousel?.classList.toggle('is-at-end', isAtEnd);
    tariffsCarousel?.classList.toggle('has-scroll', hasScroll);
    tariffScrollButtons.forEach((button) => {
      const isPrev = button.dataset.tariffsScroll === 'prev';
      button.disabled = !hasScroll || (isPrev ? isAtStart : isAtEnd);
    });
  };

  const getTariffsScrollAmount = () => {
    if (!tariffsTrack) {
      return 0;
    }

    const firstCard = tariffsTrack.querySelector('.tariffs__card');
    const trackStyles = window.getComputedStyle(tariffsTrack);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    return firstCard ? firstCard.getBoundingClientRect().width + gap : tariffsTrack.clientWidth;
  };

  tariffScrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!tariffsTrack) {
        return;
      }

      const direction = button.dataset.tariffsScroll === 'prev' ? -1 : 1;
      tariffsTrack.scrollBy({
        left: direction * getTariffsScrollAmount(),
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      window.requestAnimationFrame(updateTariffsProgress);
    });
  });

  if (tariffsTrack) {
    tariffsTrack.addEventListener('scroll', updateTariffsProgress, { passive: true });
    window.addEventListener('resize', updateTariffsProgress);
    updateTariffsProgress();
  }

  const resultPhotos = [
    {
      imageId: 'student-result-01',
      caseId: 'case-01',
      src: 'assets/img/proof/web/student-result-01.jpg',
      fullSrc: 'assets/img/proof/web/student-result-01.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 01',
      title: 'Кейс 01',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-02',
      caseId: 'case-02',
      src: 'assets/img/proof/web/student-result-02.jpg',
      fullSrc: 'assets/img/proof/web/student-result-02.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 02',
      title: 'Кейс 02',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-03',
      caseId: 'case-03',
      src: 'assets/img/proof/web/student-result-03.jpg',
      fullSrc: 'assets/img/proof/web/student-result-03.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 03',
      title: 'Кейс 03',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-04',
      caseId: 'case-04',
      src: 'assets/img/proof/web/student-result-04.jpg',
      fullSrc: 'assets/img/proof/web/student-result-04.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 04',
      title: 'Кейс 04',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-05',
      caseId: 'case-05',
      src: 'assets/img/proof/web/student-result-05.jpg',
      fullSrc: 'assets/img/proof/web/student-result-05.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 05',
      title: 'Кейс 05',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-06',
      caseId: 'case-06',
      src: 'assets/img/proof/web/student-result-06.jpg',
      fullSrc: 'assets/img/proof/web/student-result-06.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 06, боковой ракурс',
      title: 'Кейс 06 · ракурс 1',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-11',
      caseId: 'case-06',
      src: 'assets/img/proof/web/student-result-11.jpg',
      fullSrc: 'assets/img/proof/web/student-result-11.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 06, фронтальный ракурс',
      title: 'Кейс 06 · ракурс 2',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-07',
      caseId: 'case-07',
      src: 'assets/img/proof/web/student-result-07.jpg',
      fullSrc: 'assets/img/proof/web/student-result-07.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 07',
      title: 'Кейс 07',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-08',
      caseId: 'case-08',
      src: 'assets/img/proof/web/student-result-08.jpg',
      fullSrc: 'assets/img/proof/web/student-result-08.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 08, ракурс 1',
      title: 'Кейс 08 · ракурс 1',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-09',
      caseId: 'case-08',
      src: 'assets/img/proof/web/student-result-09.jpg',
      fullSrc: 'assets/img/proof/web/student-result-09.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 08, ракурс 2',
      title: 'Кейс 08 · ракурс 2',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
    {
      imageId: 'student-result-10',
      caseId: 'case-09',
      src: 'assets/img/proof/web/student-result-10.jpg',
      fullSrc: 'assets/img/proof/web/student-result-10.jpg',
      alt: 'Фотоотзыв ученицы курса, кейс 09',
      title: 'Кейс 09',
      previewFit: 'contain',
      previewPosition: 'center center',
      aspectRatio: '1 / 1',
    },
  ];

  const resultsById = new Map(resultPhotos.map((photo) => [photo.imageId, photo]));
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
  const resultsCarousel = document.querySelector('.results__carousel');
  const resultsTrack = document.querySelector('[data-results-track]');
  const resultsProgress = document.querySelector('[data-results-progress]');
  const resultScrollButtons = document.querySelectorAll('[data-results-scroll]');

  const updateResultsProgress = () => {
    if (!resultsTrack || !resultsProgress) {
      return;
    }

    const maxScroll = resultsTrack.scrollWidth - resultsTrack.clientWidth;
    const visibleRatio = resultsTrack.scrollWidth > 0
      ? resultsTrack.clientWidth / resultsTrack.scrollWidth
      : 1;
    const thumbWidth = Math.max(visibleRatio * 100, 16);
    const travel = 100 - thumbWidth;
    const progress = maxScroll > 0
      ? (resultsTrack.scrollLeft / maxScroll) * travel
      : 0;
    const isAtStart = resultsTrack.scrollLeft <= 1;
    const isAtEnd = maxScroll <= 1 || resultsTrack.scrollLeft >= maxScroll - 1;

    resultsProgress.style.width = `${thumbWidth}%`;
    resultsProgress.style.marginLeft = `${progress}%`;
    resultsCarousel?.classList.toggle('is-at-end', isAtEnd);
    resultScrollButtons.forEach((button) => {
      const isPrev = button.dataset.resultsScroll === 'prev';
      button.disabled = isPrev ? isAtStart : isAtEnd;
    });
  };

  const getResultsScrollAmount = () => {
    if (!resultsTrack) {
      return 0;
    }

    const firstCard = resultsTrack.querySelector('.results__card');
    const trackStyles = window.getComputedStyle(resultsTrack);
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0;

    return firstCard ? firstCard.getBoundingClientRect().width + gap : resultsTrack.clientWidth;
  };

  resultScrollButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (!resultsTrack) {
        return;
      }

      const direction = button.dataset.resultsScroll === 'prev' ? -1 : 1;
      resultsTrack.scrollBy({
        left: direction * getResultsScrollAmount(),
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
      window.requestAnimationFrame(updateResultsProgress);
    });
  });

  if (resultsTrack) {
    resultsTrack.addEventListener('scroll', updateResultsProgress, { passive: true });
    window.addEventListener('resize', updateResultsProgress);
    updateResultsProgress();
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
