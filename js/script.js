// ── Intersection Observer (scroll-reveal) ─────────────────────
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// ── Skill bars – animate when skills section enters ───────────
// (removed — skills now use static badge layout)

// ── Active nav highlight ──────────────────────────────────────
const wrap = document.getElementById('main-wrap');
const secs = [...document.querySelectorAll('section[id]')];
const links = document.querySelectorAll('.nav-links a');
const projIds = new Set(['project-1','project-2','project-3','project-4','project-5']);

wrap.addEventListener('scroll',()=>{
  const st = wrap.scrollTop + wrap.offsetHeight/3;
  let cur='';
  secs.forEach(s=>{if(s.offsetTop<=st) cur=s.id});
  links.forEach(a=>{
    const href=a.getAttribute('href').slice(1);
    const match = href===cur || (href==='project-1' && projIds.has(cur));
    a.classList.toggle('active', match);
  });
},{ passive:true });

// ── Mobile nav toggle ──────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if(navToggle && navLinks){
  navToggle.addEventListener('click',()=>{
    navLinks.classList.toggle('open');
    navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
  });
}

// ── Smooth scroll for nav & close mobile menu ──────────────────
links.forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    if(navLinks) navLinks.classList.remove('open');
    if(navToggle) navToggle.textContent = '☰';
    const t=document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth'});
  });
});

// ── Hero CTA → scroll to About ────────────────────────────────
document.querySelector('.btn-primary')?.addEventListener('click',()=>{
  document.querySelector('#about').scrollIntoView({behavior:'smooth'});
});

// ═══════════════════════════════════════════════════════════════
// CERTIFICATIONS DATA & RENDER
// ═══════════════════════════════════════════════════════════════

const certifications = [
  {
    icon: '🤖',
    name: 'Dev Certification for Machine Learning with TensorFlow (DCML)',
    issuer: 'dev.cert',
    date: 'May 2025',
    url: 'https://dev.id/certificate/verify/OLV3MMZWP3'
  },
  {
    icon: '🧠',
    name: 'Associate Data Scientist',
    issuer: 'BNSP (Badan Nasional Sertifikasi Profesi)',
    date: 'Sep 2025',
    url: 'https://drive.google.com/file/d/1ouGcW1BzHcbKkI_KJLnzm25Lc-AmQ-Dq/view'
  },
  {
    icon: '🌐',
    name: 'Junior Web Developer',
    issuer: 'BNSP',
    date: 'Sep 2024',
    url: 'https://drive.google.com/file/d/1fWVQK9XKwBAWo-aDsniMALDRdK-V8p2u/view?usp=drive_link'
  },
  {
    icon: '⚙️',
    name: 'System Analyst',
    issuer: 'BNSP',
    date: 'July 2024',
    url: 'https://drive.google.com/file/d/1j9hmn-J9ljs9gTudsBKuxhy3M7Q6CvtX/view?usp=drive_link'
  }
];

const certList = document.getElementById('cert-list');
if (certList) {
  certList.innerHTML = certifications.map(c => `
    <li class="cert-item clickable" data-url="${c.url}">
      <div class="cert-ico">${c.icon}</div>
      <div>
        <div class="cert-name">${c.name}</div>
        <div class="cert-org">${c.issuer} · <span class="date-tag" style="font-size:9px;padding:2px 6px">${c.date}</span></div>
      </div>
    </li>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
// SKILLS CATEGORIES DATA & RENDER
// ═══════════════════════════════════════════════════════════════

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: ['Python', 'JavaScript', 'TypeScript', 'React', 'Bash', 'Node.js', 'C++', 'Java']
  },
  {
    title: 'Technologies & Infrastructure',
    skills: ['TensorFlow', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Grafana', 'Prometheus', 'PostgreSQL', 'Git', 'Tailwind CSS', 'Figma']
  },
  {
    title: 'Core Domains & Professional Skills',
    skills: ['Computer Vision', 'Deep Learning', 'Machine Learning', 'Analytical Thinking', 'Problem Solving', 'Team Leadership']
  },
  {
    title: 'Languages',
    skills: ['English (TOEFL 537)', 'Bahasa Indonesia']
  }
];

const skillsContent = document.getElementById('skills-content');
if (skillsContent) {
  skillsContent.innerHTML = skillCategories.map(cat => `
    <div class="skill-cat">
      <div class="skill-cat-title">${cat.title}</div>
      <div class="skill-badges">${cat.skills.map(s => `<span class="skill-badge">${s}</span>`).join('')}</div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
// CONFIRMATION MODAL
// ═══════════════════════════════════════════════════════════════

const modalOverlay = document.getElementById('cert-modal');
const modalYes = document.getElementById('modal-yes');
const modalNo = document.getElementById('modal-no');
let pendingUrl = '';

function openModal(url){
  pendingUrl = url;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  pendingUrl = '';
}

modalYes.addEventListener('click',()=>{
  if(pendingUrl){
    window.open(pendingUrl, '_blank', 'noopener,noreferrer');
  }
  closeModal();
});

modalNo.addEventListener('click',closeModal);

modalOverlay.addEventListener('click',e=>{
  if(e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown',e=>{
  if(e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});

// Delegate clicks on dynamically rendered cert items
certList?.addEventListener('click',e=>{
  const item = e.target.closest('.cert-item.clickable');
  if(item){
    const url = item.dataset.url;
    if(url) openModal(url);
  }
});

// ═══════════════════════════════════════════════════════════════
// TRAINING DATA & RENDER
// ═══════════════════════════════════════════════════════════════

const trainings = [
  {
    icon: '☁️',
    name: 'AWS re/Start',
    issuer: 'AWS',
    date: '2026',
    url: 'https://drive.google.com/file/d/1Dxv_h5Ewt8jhRdO6Wcy-o7iBPZ8rsnA6/view'
  },
  {
    icon: '📊',
    name: 'PBI Rakamin Academy',
    issuer: 'Rakamin Academy',
    date: '2025',
    url: 'https://drive.google.com/file/d/18nh5sBLUPZV9qhB9BopIIyRBF-2bFUcA/view'
  },
  {
    icon: '🤖',
    name: 'Bangkit Academy led by Google, GoTo, and Traveloka',
    subtitle: 'Machine Learning Cohort',
    issuer: 'Bangkit Academy',
    date: 'Sep 2024 - Dec 2024',
    url: 'https://drive.google.com/file/d/1zcT1FS2EuN8GOzk2Xr8iiOgqUB7QLMZZ/view?usp=drive_link'
  },
  {
    icon: '📜',
    name: 'Dicoding Academy',
    subtitle: '33 Certificates',
    issuer: 'Dicoding Academy',
    date: '2022 - Present',
    url: 'https://www.dicoding.com/users/akbar04/academies'
  }
];

const trainList = document.getElementById('train-list');
if (trainList) {
  trainList.innerHTML = trainings.map(t => `
    <li class="cert-item clickable" data-url="${t.url}">
      <div class="cert-ico">${t.icon}</div>
      <div>
        <div class="cert-name">${t.name}${t.subtitle ? `<br><span style="font-size:10px;color:var(--muted)">${t.subtitle}</span>` : ''}</div>
        <div class="cert-org">${t.issuer} · <span class="date-tag" style="font-size:9px;padding:2px 6px">${t.date}</span></div>
      </div>
    </li>
  `).join('');
}

// Delegate clicks on dynamically rendered training items
trainList?.addEventListener('click',e=>{
  const item = e.target.closest('.cert-item.clickable');
  if(item){
    const url = item.dataset.url;
    if(url) openModal(url);
  }
});
