/* ─── DATA ─── */
const certs = [
  { name: 'Java Programming Certification', issuer: 'Tech Certification', type: 'image', file: 'assets/java_certificate.jpg' },
  { name: 'HTML & CSS Bootcamp Certification', issuer: 'DevTown', type: 'image', file: 'assets/devtown_html_css_certificate.jpg' },
  { name: 'Manual & Automation Testing Certification', issuer: 'GroqSkills IT', type: 'image', file: 'assets/manual_automation_certificate.jpg' }
];
let activeCertIdx = null;

/* ─── LEARNING PROJECTS ACCORDION ─── */
function toggleProject(idx) {
  const card = document.getElementById('project-' + idx);
  if (!card) return;
  
  // Toggle current card
  card.classList.toggle('expanded');
  
  // Close other cards when one expands
  document.querySelectorAll('.project-card').forEach(otherCard => {
    if (otherCard !== card && otherCard.classList.contains('expanded')) {
      otherCard.classList.remove('expanded');
    }
  });
}


/* ─── CERT MODAL OPEN ─── */
function openCert(idx) {
  activeCertIdx = idx;
  const c = certs[idx];
  document.getElementById('modalTitle').textContent = c.name;
  document.getElementById('modalIssuer').textContent = c.issuer;
  renderModalBody();
  document.getElementById('certModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalBody() {
  const c = certs[activeCertIdx];
  const body = document.getElementById('modalBody');
  
  if (c.type === 'image') {
    body.innerHTML = `<img src="${c.file}" alt="${c.name}" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);" />`;
  } else if (c.type === 'pdf') {
    body.innerHTML = `<iframe src="${c.file}" width="100%" height="500px" style="border: none; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"></iframe>`;
  }
}

function openCertInNewTab() {
  if (activeCertIdx === null) return;
  const c = certs[activeCertIdx];
  window.open(c.file, '_blank');
}

/* ─── CLOSE MODAL ─── */
function closeCert() {
  document.getElementById('certModal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModal(e) {
  if (e.target === document.getElementById('certModal')) closeCert();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCert(); });

/* ─── SCROLL EFFECTS ─── */
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.getElementById('toTop').classList.toggle('show', y > 400);
  document.getElementById('navbar').classList.toggle('scrolled', y > 10);
});

/* ─── REVEAL ON SCROLL ─── */
const io = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('in'), i * 70);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ─── PROGRESS BAR ANIMATION ─── */
const barIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.querySelectorAll('.prog-fill').forEach(b => {
        const w = b.getAttribute('data-w');
        setTimeout(() => b.style.width = w + '%', 250);
      });
      barIO.unobserve(en.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.sidebar-card').forEach(c => barIO.observe(c));

/* ─── NAV ACTIVE HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id], div[id]');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});
