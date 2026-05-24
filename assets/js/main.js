'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const audienceItems = document.querySelectorAll('.audience__chip, .audience__note');
  const audienceChips = document.querySelectorAll('.audience__chip');
  const audienceNoteText = document.querySelector('.audience__note-text');
  const audienceNoteLink = document.querySelector('.audience__note-link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
