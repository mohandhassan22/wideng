// ===== Intro animation (vintage car) =====
(function initIntro() {
  const intro = document.getElementById('intro');
  const car = document.getElementById('intro-car');
  const petalsWrap = document.getElementById('petals');

  // Spawn floating petals
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 4) + 's';
    p.style.animationDuration = (6 + Math.random() * 3) + 's';
    petalsWrap.appendChild(p);
  }

  // Drive car down, pause, drive out
  requestAnimationFrame(() => {
    setTimeout(() => car.classList.add('arrived'), 50);
  });

  setTimeout(() => {
    car.style.transition = 'transform 2s cubic-bezier(0.4,0,1,1)';
    car.style.transform = 'translate(-50%, 120vh)';
  }, 1500 + 5000);

  setTimeout(() => {
    intro.classList.add('hide');
    document.body.style.overflow = '';
  }, 9000);
})();

// ===== Countdown timer =====
(function initCountdown() {
  const targetDate = new Date('2026-11-08T19:00:00+02:00').getTime();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  function pad(n) { return n.toString().padStart(2, '0'); }

  function tick() {
    const diff = targetDate - Date.now();
    if (diff > 0) {
      els.days.textContent = pad(Math.floor(diff / 86400000));
      els.hours.textContent = pad(Math.floor((diff / 3600000) % 24));
      els.minutes.textContent = pad(Math.floor((diff / 60000) % 60));
      els.seconds.textContent = pad(Math.floor((diff / 1000) % 60));
    } else {
      els.days.textContent = els.hours.textContent = els.minutes.textContent = els.seconds.textContent = '00';
    }
  }
  tick();
  setInterval(tick, 1000);
})();

// ===== Music toggle =====
(function initMusic() {
  const btn = document.getElementById('music-btn');
  const audio = new Audio('assets/song.mp3');
  audio.loop = true;
  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    playing = !playing;
    btn.classList.toggle('playing', playing);
    btn.title = playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى';
  });
})();

// ===== RSVP form (stored locally in the browser) =====
(function initRsvp() {
  const form = document.getElementById('rsvp-form');
  const thanks = document.getElementById('rsvp-thanks');
  const yesBtn = document.getElementById('rsvp-yes');
  const noBtn = document.getElementById('rsvp-no');
  const guestsField = document.getElementById('rsvp-guests-field');
  const nameInput = document.getElementById('rsvp-name');
  const guestsInput = document.getElementById('rsvp-guests');
  const submitBtn = document.getElementById('rsvp-submit');

  let attending = null;

  function updateSubmitState() {
    submitBtn.disabled = !nameInput.value || attending === null;
  }

  yesBtn.addEventListener('click', () => {
    attending = true;
    yesBtn.classList.add('active-yes');
    noBtn.classList.remove('active-no');
    guestsField.style.display = 'block';
    updateSubmitState();
  });

  noBtn.addEventListener('click', () => {
    attending = false;
    noBtn.classList.add('active-no');
    yesBtn.classList.remove('active-yes');
    guestsField.style.display = 'none';
    updateSubmitState();
  });

  nameInput.addEventListener('input', updateSubmitState);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameInput.value || attending === null) return;

    const entry = {
      name: nameInput.value,
      attending,
      guests: attending ? Number(guestsInput.value || 0) : 0,
      createdAt: new Date().toISOString(),
    };

    try {
      const list = JSON.parse(localStorage.getItem('rsvpList') || '[]');
      list.push(entry);
      localStorage.setItem('rsvpList', JSON.stringify(list));
    } catch (err) {
      console.warn('Could not save RSVP locally', err);
    }

    form.style.display = 'none';
    thanks.style.display = 'block';
  });
})();

// ===== Guestbook (stored locally in the browser) =====
(function initGuestbook() {
  const form = document.getElementById('guestbook-form');
  const nameInput = document.getElementById('guestbook-name');
  const messageInput = document.getElementById('guestbook-message');
  const list = document.getElementById('guestbook-list');

  function loadEntries() {
    try {
      return JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    } catch {
      return [];
    }
  }

  function saveEntries(entries) {
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
  }

  function render() {
    const entries = loadEntries();
    list.innerHTML = '';
    if (entries.length === 0) {
      list.innerHTML = '<div class="guest-empty">كن أول من يترك كلمة للعروسين</div>';
      return;
    }
    entries.slice().reverse().forEach((entry) => {
      const div = document.createElement('div');
      div.className = 'guest-entry';
      const nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.textContent = entry.name;
      const msgP = document.createElement('p');
      msgP.textContent = entry.message;
      msgP.style.margin = '0';
      msgP.style.lineHeight = '1.7';
      div.appendChild(nameDiv);
      div.appendChild(msgP);
      list.appendChild(div);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!nameInput.value || !messageInput.value) return;
    const entries = loadEntries();
    entries.push({
      id: Date.now(),
      name: nameInput.value,
      message: messageInput.value,
      createdAt: new Date().toISOString(),
    });
    saveEntries(entries);
    nameInput.value = '';
    messageInput.value = '';
    render();
  });

  render();
})();

// ===== Scroll reveal for sections =====
(function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => observer.observe(el));
})();
