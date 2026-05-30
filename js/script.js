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
let secs = [];
const links = document.querySelectorAll('.nav-links a');
const projIds = new Set(['project-1','project-2','project-3','project-4','project-5']);
function refreshSecs(){ secs = [...document.querySelectorAll('section[id]')]; }
refreshSecs();

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
    issuer: 'BNSP',
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

// ═══════════════════════════════════════════════════════════════
// IMAGE VIEWER MODAL
// ═══════════════════════════════════════════════════════════════

const imgModal = document.getElementById('img-modal');
const imgModalBody = document.getElementById('img-modal-body');
const imgFull = document.getElementById('img-modal-full');
const imgClose = document.getElementById('img-modal-close');
const zoomIn = document.getElementById('img-zoom-in');
const zoomOut = document.getElementById('img-zoom-out');
const zoomReset = document.getElementById('img-zoom-reset');

let zoomLevel = 1;
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let dragOffset = { x: 0, y: 0 };

function openImgModal(src){
  imgFull.src = src;
  zoomLevel = 1;
  dragOffset = { x: 0, y: 0 };
  updateZoom();
  imgModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeImgModal(){
  imgModal.classList.remove('open');
  document.body.style.overflow = '';
  imgFull.src = '';
}

function updateZoom(){
  imgFull.style.transform = `translate(${dragOffset.x}px,${dragOffset.y}px) scale(${zoomLevel})`;
}

imgClose.addEventListener('click',closeImgModal);

imgModal.addEventListener('click',e=>{
  if(e.target === imgModal) closeImgModal();
});

document.addEventListener('keydown',e=>{
  if(!imgModal.classList.contains('open')) return;
  if(e.key === 'Escape') closeImgModal();
  if(e.key === '+' || e.key === '='){ e.preventDefault(); zoomIn.click(); }
  if(e.key === '-'){ e.preventDefault(); zoomOut.click(); }
  if(e.key === '0'){ e.preventDefault(); zoomReset.click(); }
});

zoomIn.addEventListener('click',()=>{
  zoomLevel = Math.min(5, zoomLevel + 0.25);
  updateZoom();
});

zoomOut.addEventListener('click',()=>{
  zoomLevel = Math.max(0.25, zoomLevel - 0.25);
  updateZoom();
});

zoomReset.addEventListener('click',()=>{
  zoomLevel = 1;
  dragOffset = { x: 0, y: 0 };
  updateZoom();
});

imgModalBody.addEventListener('wheel',e=>{
  if(!imgModal.classList.contains('open')) return;
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  zoomLevel = Math.max(0.25, Math.min(5, zoomLevel + delta));
  updateZoom();
},{passive:false});

imgModalBody.addEventListener('mousedown',e=>{
  if(zoomLevel <= 1) return;
  isDragging = true;
  imgModalBody.classList.add('dragging');
  dragStart = { x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y };
});

document.addEventListener('mousemove',e=>{
  if(!isDragging) return;
  dragOffset.x = e.clientX - dragStart.x;
  dragOffset.y = e.clientY - dragStart.y;
  updateZoom();
});

document.addEventListener('mouseup',()=>{
  isDragging = false;
  imgModalBody.classList.remove('dragging');
});

imgModalBody.addEventListener('touchstart',e=>{
  if(zoomLevel <= 1) return;
  const t = e.touches[0];
  isDragging = true;
  dragStart = { x: t.clientX - dragOffset.x, y: t.clientY - dragOffset.y };
},{passive:true});

document.addEventListener('touchmove',e=>{
  if(!isDragging) return;
  const t = e.touches[0];
  dragOffset.x = t.clientX - dragStart.x;
  dragOffset.y = t.clientY - dragStart.y;
  updateZoom();
},{passive:true});

document.addEventListener('touchend',()=>{
  isDragging = false;
});

document.querySelector('.wrap').addEventListener('click',e=>{
  const img = e.target.closest('.proj-img');
  if(img) openImgModal(img.src);
});

// ═══════════════════════════════════════════════════════════════
// CV MODAL
// ═══════════════════════════════════════════════════════════════

const cvModal = document.getElementById('cv-modal');
const cvBtn = document.getElementById('btn-view-cv');
const cvClose = document.getElementById('cv-modal-close');

if (cvBtn && cvModal) {
  cvBtn.addEventListener('click', () => {
    cvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function closeCVModal() {
  cvModal.classList.remove('open');
  document.body.style.overflow = '';
}

cvClose?.addEventListener('click', closeCVModal);

cvModal?.addEventListener('click', e => {
  if (e.target === cvModal) closeCVModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && cvModal?.classList.contains('open')) closeCVModal();
});

// ═══════════════════════════════════════════════════════════════
// PROJECTS DATA & DYNAMIC RENDER
// ═══════════════════════════════════════════════════════════════

const ghIcon = '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/></svg>';
const arrowIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="16" height="16"><path d="M7 17l9-9M17 17V8H8"/></svg>';

const projects = [
  {
    id: 'project-1', alt: false,
    bg: '',
    svg: '<ellipse cx="120" cy="400" rx="200" ry="180" fill="rgba(180,255,45,.07)"/><ellipse cx="400" cy="180" rx="160" ry="140" fill="rgba(168,85,247,.09)"/>',
    imgs: [
      { src: 'assets/acwgangp/acwgangp-1.png', alt: 'ACWGAN-GP synthetic skin lesions' },
      { src: 'assets/acwgangp/acwgangp-2.png', alt: 'ACWGAN-GP classification results' }
    ],
    badges: ['ACWGAN-GP', '+12% Recall Macro', 'ResNet50 + Attention'],
    num: '01 / 05', name: 'ACWGAN-GP <span class="hl-g">Skin Classifier</span>',
    date: 'March 2026', role: 'Machine Learning &amp; AI Engineer',
    desc: ['Deep learning models for skin disease diagnosis are fundamentally biased. On the HAM10000 dataset, the majority class holds over 6,700 samples while rare but clinically critical classes like Dermatofibroma and Vascular Lesions have fewer than 150 each &mdash; causing models to achieve high accuracy while completely failing on the patients who need detection the most. I wanted to fix this, not by patching the model, but by enriching the data itself.',
      'I designed a hybrid generative architecture &mdash; ACWGAN-GP &mdash; that fuses ACGAN\'s class-label control with WGAN-GP\'s training stability to synthesize realistic, label-accurate skin lesion images for underrepresented classes. After tuning hyperparameters with Optuna, I validated image quality using FID, IS, and KID metrics, then used the synthetic data to train a ResNet50 with a Soft Attention module. The result: a 12% increase in macro average Recall, with Actinic Keratoses jumping from 0.25 to 0.69, and Vascular Lesions reaching a perfect 1.0 &mdash; all without sacrificing global accuracy.'],
    github: 'https://github.com/akbariffianto/gans-implmentation-ham10000', demo: 'https://acwgangp-skin-disease.streamlit.app/'
  },
  {
    id: 'project-2', alt: true,
    bg: 'linear-gradient(135deg,#0f0820,#1a1a1a)',
    svg: '<ellipse cx="380" cy="200" rx="200" ry="180" fill="rgba(168,85,247,.09)"/><ellipse cx="150" cy="450" rx="160" ry="140" fill="rgba(180,255,45,.05)"/>',
    imgs: [
      { src: 'assets/project-2/mlops-1.webp', alt: 'MLOps pipeline architecture' },
      { src: 'assets/project-2/mlops-2.webp', alt: 'MLOps monitoring dashboard' }
    ],
    badges: ['82.9% Accuracy', 'AUC 0.812', 'TFX + Keras', 'Prometheus'],
    num: '02 / 05', name: 'MLOps <span class="hl-p">Loan Approval</span>',
    date: 'February 2025', role: 'Machine Learning Developer',
    desc: ['Inaccurate loan classification decisions cost financial institutions in two directions at once &mdash; approving bad loans erodes capital, while rejecting good ones erodes trust. The core difficulty isn\'t just building a model that classifies well in a notebook; it\'s building one that stays reliable when data is imbalanced, features are messy, and real-world conditions drift over time. I wanted to tackle this not as a one-off model, but as a production-grade system that can be audited, updated, and monitored continuously.',
      'I built a full MLOps pipeline using TensorFlow Extended (TFX) &mdash; from automated data transformation and feature engineering through to model training, evaluation gating, and deployment. The neural network architecture handles both categorical and numerical features, regularized with Dropout to prevent overfitting, and hyperparameter-tuned with Keras Tuner to find the optimal layer and unit configuration. Only models that clear strict MAE, MSE, and RMSE thresholds receive a "blessing" and get pushed automatically to production on Railway. The final model achieved over 90% accuracy with a validation loss of 0.2, and I paired it with a Prometheus + Grafana monitoring stack to track request latency, call volume, and model health &mdash; giving the system a data-driven trigger for retraining when performance drifts.'],
    github: 'https://github.com/akbariffianto/mlops-loan-approval', demo: null
  },
  {
    id: 'project-3', alt: false,
    bg: 'linear-gradient(135deg,#081408,#1a1a1a)',
    svg: '<ellipse cx="150" cy="380" rx="200" ry="160" fill="rgba(180,255,45,.07)"/>',
    imgs: [
      { src: 'assets/project-5/afc-2.png', alt: 'AFC-CAE anomaly detection' },
      { src: 'assets/project-5/afc-3.png', alt: 'AFC-CAE compliance logs' }
    ],
    badges: ['Isolation Forest', 'XAI Explainer', 'FastAPI'],
    num: '03 / 05', name: 'AFC-CAE <span class="hl-g">Engine</span>',
    date: 'May 2026', role: 'ML Engineer &amp; Backend Developer',
    desc: ['Traditional financial audits are structurally broken at scale. On a dataset like Lending Club\'s 466,285 records across 75 columns &mdash; nearly 35 million data points &mdash; human auditors can only realistically check less than 1% of the population, run cycles that take 5&ndash;15 business days, and miss cross-column logic violations that quietly signal fraud or unauthorized overrides. The scariest part: those missed signals aren\'t data quality noise &mdash; they\'re the kind of inconsistencies that collapse lending platforms.',
      'I designed AFC-CAE as a continuous, AI-augmented audit engine that covers 100% of records in under 4 hours. The system runs two layers: a Rule-Based Assertion Engine (RBAE) with 40+ vectorized mathematical checks across 5 modules &mdash; covering loan reconciliation math, borrower profile integrity, and regulatory pricing compliance &mdash; followed by an Isolation Forest layer that catches multidimensional anomalies the rules miss. I engineered a novel Null Taxonomy system that classifies empty values into 4 governance categories rather than blindly imputing them, and built an Explainable AI (XAI) module so every flagged record comes with auditable, human-readable reasoning. The result is a FastAPI backend tracked in MLflow with full SHA-256 forensic traceability &mdash; a system that escalates critical findings to the CRO, CISO, and Audit Committee automatically when anomaly rates breach 5%.'],
    github: 'https://github.com/akbariffianto/afc-cae-engine', demo: 'https://afc-cae-engine.streamlit.app/'
  },
  {
    id: 'project-4', alt: false,
    bg: 'linear-gradient(135deg,#081208,#1a1a1a)',
    svg: '<ellipse cx="100" cy="350" rx="200" ry="160" fill="rgba(180,255,45,.07)"/>',
    imgs: [
      { src: 'assets/habitforge/habit-forge-1.png', alt: 'HabitForge gamification UI', link: 'https://canva.link/h5byxqgoip4cc05' },
      { src: 'assets/habitforge/habit-forge-2.png', alt: 'HabitForge habit tracking', link: 'https://habit-forge-iota.vercel.app/' }
    ],
    badges: ['Node.js / Express', 'IBM Granite AI', 'Gamification'],
    num: '04 / 05', name: 'Habit<span class="hl-g">Forge</span>',
    date: 'Sep 2025', role: 'AI Developer',
    desc: ['One of the biggest reasons people fail to build new habits isn\'t a lack of willpower &mdash; it\'s a lack of motivation and consistency. Most habit trackers are just plain checklists that feel like chores. Inspired by James Clear\'s Atomic Habits, I wanted to build something that actually keeps people coming back: an app that makes the process of showing up feel rewarding rather than obligatory.',
      'I built HabitForge using JavaScript and Node.js/Express, and integrated IBM Granite (via Replicate API) to automatically categorize each habit into relevant areas like Health, Learning, or Personal &mdash; so users never have to tag anything manually. On top of that, I designed a full gamification system: every completed habit earns EXP, unlocks level tiers from Rookie to Legend, and rewards achievement badges &mdash; all paired with a built-in Pomodoro timer to keep focus sharp. The result is a live, deployed web app that turns daily discipline into something that actually feels like progress.'],
    github: 'https://github.com/akbariffianto/habit-forge', demo: 'https://habit-forge-iota.vercel.app/'
  },
  {
    id: 'project-5', alt: true,
    bg: 'linear-gradient(135deg,#120820,#1a1a1a)',
    svg: '<ellipse cx="380" cy="250" rx="220" ry="180" fill="rgba(168,85,247,.1)"/>',
    imgs: [
      { src: 'assets/project-4/safespace-1.png', alt: 'SafeSpace API architecture' },
      { src: 'assets/project-4/safespace-3.png', alt: 'SafeSpace data flow' }
    ],
    badges: ['FastAPI + Async SQL', 'Gemini LLM', 'Kubernetes'],
    num: '05 / 05', name: '<span class="hl-p">Safe</span>Space',
    date: 'February 2026', role: 'Hacker &amp; Backend Developer',
    desc: ['Sexual violence victims frequently don\'t report what happened to them &mdash; not because they don\'t want justice, but because the systems designed to help them feel unsafe. Fear of stigma, loss of anonymity, and not knowing where to even start are the real barriers. During the Refactory Hackathon 2026, our team wanted to build something that lowers that threshold: a platform where someone can process what happened to them privately, at their own pace, without surrendering their identity to do it.',
      'I built the backend of SafeSpace using FastAPI with an async PostgreSQL connection pool, architected around a Zero PII principle &mdash; sessions are identified only by a randomly generated UUID4, with no names, emails, or IP addresses ever stored. A panic button triggers an irreversible hard delete, wiping all trace of the session from the database instantly. On top of that foundation, I integrated Google Gemini to automatically generate a structured formal complaint document in the user\'s own voice, based on the incident details they provide. The backend is containerized with Docker, deployed via Kubernetes, and covered with a full pytest suite &mdash; built under hackathon pressure, but designed to hold up in a real support context.'],
    github: 'https://github.com/Anything-But-Revisi', demo: 'https://frontend-pi-sage-59.vercel.app/landing'
  }
];

(function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = projects.map((p, i) => {
    const altClass = p.alt ? ' alt' : '';
    const visualDir = p.alt ? 'from-right' : 'from-left';
    const imgsHtml = p.imgs.map(img => {
      const inner = '<img src="'+img.src+'" alt="'+img.alt+'" class="proj-img" loading="lazy" decoding="async">';
      return '<div class="proj-img-wrap">'+(img.link ? '<a href="'+img.link+'" target="_blank" rel="noopener noreferrer">'+inner+'</a>' : inner)+'</div>';
    }).join('');
    const badgesHtml = p.badges.map(b => '<span class="badge b-outline-green">'+b+'</span>').join('');
    const visBg = p.bg ? ' style="background:'+p.bg+'"' : '';
    const actionsHtml = '<a href="'+p.github+'" target="_blank" rel="noopener noreferrer" class="act-btn act-gh">'+ghIcon+' GitHub</a>'+(p.demo ? '<a href="'+p.demo+'" target="_blank" rel="noopener noreferrer" class="act-btn act-demo">Live Demo '+arrowIcon+'</a>' : '<span class="act-btn act-demo disabled">Demo N/A '+arrowIcon+'</span>');

    return '<section id="'+p.id+'" class="proj-sec'+altClass+'">'+
      '<div class="proj-visual reveal '+visualDir+'"'+visBg+'>'+
        '<div class="proj-vis-bg"><svg viewBox="0 0 500 600" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">'+p.svg+'</svg></div>'+
        '<div class="proj-preview"><div class="proj-img-grid">'+imgsHtml+'</div><div class="proj-img-summary">'+badgesHtml+'</div></div>'+
      '</div>'+
      '<div class="proj-content">'+
        '<div class="proj-num reveal d1">'+p.num+'</div>'+
        '<h2 class="proj-name reveal d2">'+p.name+'</h2>'+
        '<div class="proj-meta reveal d3">'+
          '<span class="proj-meta-tag"><strong>'+p.date+'</strong></span>'+
          '<span class="proj-meta-tag"><strong>Role:</strong> '+p.role+'</span>'+
        '</div>'+
        '<p class="proj-desc reveal d4">'+p.desc[0]+'</p>'+
        '<p class="proj-desc reveal d5">'+p.desc[1]+'</p>'+
        '<div class="proj-actions reveal d6">'+actionsHtml+'</div>'+
      '</div>'+
    '</section>';
  }).join('');

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  refreshSecs();
})();
