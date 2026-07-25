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

// RSVP and guestbook are now handled by the embedded Jotform forms above,
// so responses are collected centrally instead of per-browser.

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
