'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const audienceItems = document.querySelectorAll('.audience__chip, .audience__note');
  const audienceChips = document.querySelectorAll('.audience__chip');
  const audienceNoteText = document.querySelector('.audience__note-text');
  const audienceNoteLink = document.querySelector('.audience__note-link');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    audienceNoteText.textContent = 'Gym Girls Club — не про гонку и жёсткие правила. Здесь ты собираешь тренировки, питание и прогресс в спокойную понятную систему';
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
