// Preloader
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => pre.classList.add('hide'), 400);
});

// Invitation gate: lock scroll until opened, then play the door-opening reveal
document.documentElement.classList.add('locked');

const gate = document.getElementById('invite-gate');
const openInviteBtn = document.getElementById('open-invite-btn');
const hero = document.getElementById('hero');

function openInvitation() {
  if (gate.classList.contains('open')) return;
  gate.classList.add('open');
  document.documentElement.classList.remove('locked');
  setTimeout(() => hero.classList.add('play'), 450);
  setTimeout(() => { gate.style.display = 'none'; }, 1500);
}

openInviteBtn.addEventListener('click', openInvitation);

// Subtle 3D tilt on cards
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// Floating petals
const petalContainer = document.getElementById('petals');
const petalSymbols = ['❀', '✿', '❁', '❦'];
function spawnPetal() {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = (12 + Math.random() * 14) + 'px';
  const duration = 8 + Math.random() * 8;
  petal.style.animationDuration = duration + 's';
  petalContainer.appendChild(petal);
  setTimeout(() => petal.remove(), duration * 1000);
}
setInterval(spawnPetal, 900);

// Countdown to Nikah (8 Oct 2026)
const weddingDate = new Date('2026-10-08T16:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML = '<div class="count-box"><span class="count-num">It\'s Here!</span></div>';
    return;
  }
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();
