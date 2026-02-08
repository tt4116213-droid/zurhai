
import { GoogleGenAI } from "@google/genai";

// 1. Data Definitions
const ZODIAC_SIGNS = [
  { id: 'aries', name: 'Хонь', symbol: '♈', dates: '3/21 - 4/19', element: 'Гал', color: 'red', desc: 'Зоригтой, эрч хүчтэй, манлайлагч.', strengths: ['Зоригтой', 'Шийдэмгий'], weaknesses: ['Түргэн зантай'], mongolian: '“Хонь шиг номхон, арслан шиг хүчтэй”' },
  { id: 'taurus', name: 'Үхэр', symbol: '♉', dates: '4/20 - 5/20', element: 'Шороо', color: 'green', desc: 'Тогтвортой, найдвартай, хөдөлмөрч.', strengths: ['Тэвчээртэй', 'Үнэнч'], weaknesses: ['Зөрүүд'], mongolian: '“Үхэр шиг зүтгэлтэй, уул шиг түшигтэй”' },
  { id: 'gemini', name: 'Ихэр', symbol: '♊', dates: '5/21 - 6/20', element: 'Хий', color: 'yellow', desc: 'Оюунлаг, уян хатан, харилцааны чадвартай.', strengths: ['Ухаалаг', 'Сэргэлэн'], weaknesses: ['Тогтворгүй'], mongolian: '“Хоёр ихэр шиг хэлхээтэй, салхи шиг хурдан”' },
  { id: 'cancer', name: 'Мэлхий', symbol: '♋', dates: '6/21 - 7/22', element: 'Ус', color: 'blue', desc: 'Мэдрэмтгий, гэр бүлсэг, зөн совинтой.', strengths: ['Халамжтай', 'Зөн совинтой'], weaknesses: ['Гомдомтгой'], mongolian: '“Мэлхий шиг амгалан, эх шиг хайртай”' },
  { id: 'leo', name: 'Арслан', symbol: '♌', dates: '7/23 - 8/22', element: 'Гал', color: 'orange', desc: 'Өөртөө итгэлтэй, өгөөмөр, бүтээлч.', strengths: ['Өгөөмөр', 'Дулаан сэтгэлтэй'], weaknesses: ['Биеэ тоосон'], mongolian: '“Арслан шиг айдасгүй, хаан шиг хүндлэлтэй”' },
  { id: 'virgo', name: 'Охин', symbol: '♍', dates: '8/23 - 9/22', element: 'Шороо', color: 'emerald', desc: 'Нарийн мэдрэмжтэй, практик, тусламтгай.', strengths: ['Хичээнгүй', 'Нягт'], weaknesses: ['Шүүмжлэмтгий'], mongolian: '“Охин шиг ариун, өвс шиг уян”' },
  { id: 'libra', name: 'Жинлүүр', symbol: '♎', dates: '9/23 - 10/22', element: 'Хий', color: 'pink', desc: 'Шударга, дипломатч, эв найрамдалтай.', strengths: ['Нийтэч', 'Шударга'], weaknesses: ['Шийдэмгий бус'], mongolian: '“Дэнс шиг шударга, тэнгэр шиг уужим”' },
  { id: 'scorpio', name: 'Хилэнц', symbol: '♏', dates: '10/23 - 11/21', element: 'Ус', color: 'purple', desc: 'Нууцлаг, хүчирхэг, тэсвэр хатуужилтай.', strengths: ['Зоригтой', 'Найдвартай'], weaknesses: ['Хардамтгой'], mongolian: '“Хилэнц шиг хурц, гал шиг халуун”' },
  { id: 'sagittarius', name: 'Нум', symbol: '♐', dates: '11/22 - 12/21', element: 'Гал', color: 'blue', desc: 'Эрх чөлөөнд дуртай, адал явдалд тэмүүлэгч.', strengths: ['Өөдрөг', 'Инээдмийн мэдрэмжтэй'], weaknesses: ['Тэвчээргүй'], mongolian: '“Нум шиг оночтой, хүлэг шиг хурдан”' },
  { id: 'capricorn', name: 'Матар', symbol: '♑', dates: '12/22 - 1/19', element: 'Шороо', color: 'stone', desc: 'Сахилга баттай, хариуцлагатай, зорилготой.', strengths: ['Сахилга баттай', 'Тэвчээртэй'], weaknesses: ['Гутранги'], mongolian: '“Матар шиг тууштай, хад шиг бат”' },
  { id: 'aquarius', name: 'Хумх', symbol: '♒', dates: '1/20 - 2/18', element: 'Хий', color: 'cyan', desc: 'Өвөрмөц, хүмүүнлэг, бие даасан.', strengths: ['Прогрессив', 'Шударга'], weaknesses: ['Хөндий'], mongolian: '“Хумх шиг дүүрэн, хууур шиг аялгуутай”' },
  { id: 'pisces', name: 'Загас', symbol: '♓', dates: '2/19 - 3/20', element: 'Ус', color: 'teal', desc: 'Эмпатитай, урлагт дуртай, зөөлөн.', strengths: ['Өрөвч', 'Мэргэн'], weaknesses: ['Айдсаас зугтагч'], mongolian: '“Загас шиг ухаалаг, далай шиг гүн”' }
];

const QUIZ_QUESTIONS = [
  { q: "Шийдвэр гаргахдаа юунд итгэдэг вэ?", opts: [{ t: "Зөн совин", v: 20 }, { t: "Логик", v: 10 }, { t: "Бусдын бодол", v: 5 }] },
  { q: "Амралтын өдрөө хэрхэн өнгөрөөх вэ?", opts: [{ t: "Гэртээ амрах", v: 10 }, { t: "Аялах", v: 20 }, { t: "Ажил хийх", v: 5 }] },
  { q: "Хүндрэл тулгарахад...", opts: [{ t: "Шууд нүүр тулах", v: 20 }, { t: "Төлөвлөх", v: 15 }, { t: "Зугтах", v: 5 }] }
];

const MOODS = {
  'Жаргалтай': 'Эерэг энергиэ бусадтай хуваалц. Өнөөдөр таны өдөр!',
  'Гунигтай': 'Гуниг бол түр зуурынх. Дуртай хөгжмөө сонсож амраарай.',
  'Ууртай': 'Гүнзгий амьсгаа ав. Тайван байх нь таны хамгийн том хүч.',
  'Ядарсан': 'Бие махбодоо сонсож, эрт унтаарай. Маргааш шинэ эрч хүч ирнэ.',
  'Түгшүүртэй': 'Бүх зүйл таны хяналтанд байх албагүй. Зүгээр л одоо байгаадаа анхаар.'
};

const QUOTES = [
  "Өөрийгөө сонс. Та зөв замдаа байна.",
  "Од бүхэн өөрийн гэсэн гэрэлтэй байдаг.",
  "Өнөөдрийн тэвчээр маргаашийн ялалт."
];

// 2. State & DOM References
let quizStep = 0;
let quizScore = 0;
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// 3. Functions
function showSection(id: string) {
  document.querySelectorAll('section').forEach(s => {
    s.classList.remove('active-section');
    s.classList.add('hidden-section');
  });
  const active = document.getElementById(`${id}-section`);
  if (active) {
    active.classList.remove('hidden-section');
    setTimeout(() => active.classList.add('active-section'), 50);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function fetchHoroscope(signName: string, container: HTMLElement | null) {
  if (!container) return;
  container.innerHTML = `<div class="flex flex-col items-center py-10 gap-4"><div class="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div><p class="animate-pulse opacity-60">Одод шивнэж байна...</p></div>`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Монгол хэл дээр ${signName}-ийн ордны өнөөдрийн зурхайг сонирхолтой, эерэг байдлаар богинохон бичиж өгнө үү. Төгсгөлд нь тохирох зүйр цэцэн үг нэмээрэй.`,
    });
    container.innerHTML = `<p class="text-white/80 whitespace-pre-line text-lg leading-relaxed">${response.text}</p>`;
  } catch (e) {
    container.innerHTML = `<p class="text-red-400">Зурхайг ачаалахад алдаа гарлаа. Дахин оролдоно уу.</p>`;
  }
}

function openDetail(signId: string) {
  const sign = ZODIAC_SIGNS.find(s => s.id === signId);
  if (!sign) return;
  const content = document.getElementById('zodiac-detail-content');
  if (!content) return;
  
  // Set Theme
  const elementClass = sign.element === 'Гал' ? 'theme-fire' : sign.element === 'Ус' ? 'theme-water' : sign.element === 'Хий' ? 'theme-air' : 'theme-earth';
  document.body.className = `bg-[#0b0e14] text-white overflow-x-hidden ${elementClass}`;

  content.innerHTML = `
    <div class="absolute -top-10 -right-10 text-[15rem] opacity-5 pointer-events-none">${sign.symbol}</div>
    <div class="flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10">
      <div class="text-center md:text-left">
        <div class="text-[10rem] animate-float drop-shadow-2xl leading-none">${sign.symbol}</div>
        <h2 class="text-6xl font-bold mb-2 tracking-tighter">${sign.name}</h2>
        <p class="text-xl text-yellow-400 font-medium">${sign.dates} • ${sign.element}</p>
      </div>
      <div class="flex-1 space-y-8">
        <p class="text-2xl text-white/90 leading-relaxed">${sign.desc}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="glass p-6 rounded-2xl border-l-4 border-green-400">
            <h4 class="font-bold text-green-400 mb-2">💪 Давуу тал</h4>
            <p>${sign.strengths.join(', ')}</p>
          </div>
          <div class="glass p-6 rounded-2xl border-l-4 border-red-400">
            <h4 class="font-bold text-red-400 mb-2">⚠️ Сул тал</h4>
            <p>${sign.weaknesses.join(', ')}</p>
          </div>
        </div>
        <div class="p-8 glass rounded-3xl border-t-2 border-yellow-400">
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-3">🇲🇳 Монгол зан чанар</h3>
          <p class="text-2xl italic font-serif">${sign.mongolian}</p>
        </div>
        <div class="p-8 bg-black/40 rounded-3xl border border-white/5">
          <h3 class="text-2xl font-bold text-yellow-400 mb-6">Өнөөдрийн мессеж 🔮</h3>
          <div id="horoscope-container"></div>
        </div>
      </div>
    </div>
  `;
  
  showSection('detail');
  fetchHoroscope(sign.name, document.getElementById('horoscope-container'));
}

function initQuiz() {
  quizStep = 0;
  quizScore = 0;
  renderQuizStep();
}

function renderQuizStep() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  if (quizStep < QUIZ_QUESTIONS.length) {
    const q = QUIZ_QUESTIONS[quizStep];
    container.innerHTML = `
      <div class="w-full bg-white/10 h-1 rounded-full mb-10 overflow-hidden">
        <div class="bg-yellow-400 h-full transition-all" style="width: ${((quizStep+1)/QUIZ_QUESTIONS.length)*100}%"></div>
      </div>
      <h2 class="text-3xl font-bold mb-10">${q.q}</h2>
      <div class="grid gap-4">
        ${q.opts.map((o) => `<button onclick="handleQuizAnswer(${o.v})" class="p-5 glass rounded-2xl hover:bg-yellow-400 hover:text-black transition-all text-left text-lg">${o.t}</button>`).join('')}
      </div>
    `;
  } else {
    const percent = Math.min(Math.round((quizScore / 60) * 100), 100);
    container.innerHTML = `
      <h2 class="text-2xl text-white/40 uppercase tracking-widest">Таны үр дүн</h2>
      <div class="text-8xl font-black text-yellow-400">${percent}%</div>
      <p class="text-xl text-white/80">Та ордныхоо зан чанартай ${percent}% нийцэж байна!</p>
      <button onclick="initQuiz()" class="px-8 py-3 bg-white/10 rounded-full hover:bg-white/20">Дахин эхлэх</button>
    `;
  }
}

(window as any).handleQuizAnswer = (val: number) => {
  quizScore += val;
  quizStep++;
  renderQuizStep();
};

(window as any).checkCompatibility = () => {
  const s1 = (document.getElementById('select-sign-1') as HTMLSelectElement)?.value;
  const s2 = (document.getElementById('select-sign-2') as HTMLSelectElement)?.value;
  if (!s1 || !s2) return;
  
  const resDiv = document.getElementById('comp-result');
  const percentSpan = document.getElementById('comp-percent');
  const textP = document.getElementById('comp-text');
  
  if (resDiv && percentSpan && textP) {
    resDiv.classList.remove('hidden');
    const percent = 50 + Math.floor(Math.random() * 50);
    percentSpan.innerText = `${percent}%`;
    textP.innerText = percent > 85 ? "Төгс хослол! 💍" : percent > 65 ? "Маш сайн тохирно 💖" : "Бие биенээ ойлгох хэрэгтэй 😊";
  }
};

(window as any).getMoodAdvice = (type: keyof typeof MOODS) => {
  const div = document.getElementById('mood-advice');
  const text = document.getElementById('mood-advice-text');
  if (div && text) {
    div.classList.remove('hidden');
    text.innerText = `"${MOODS[type]}"`;
  }
};

// 4. Initial Render
function init() {
  // Render Grid
  const grid = document.getElementById('zodiac-grid');
  if (grid) {
    ZODIAC_SIGNS.forEach(sign => {
      const card = document.createElement('div');
      card.className = 'glass p-6 rounded-2xl zodiac-card flex flex-col items-center cursor-pointer transition-all animate-fade-in-up';
      card.onclick = () => openDetail(sign.id);
      card.innerHTML = `
        <div class="text-5xl mb-4 transition-transform duration-500">${sign.symbol}</div>
        <h3 class="text-xl font-bold tracking-wider">${sign.name}</h3>
        <p class="text-xs opacity-50 mt-1">${sign.dates}</p>
        <div class="mt-2 text-[10px] px-2 py-0.5 rounded-full bg-white/10 uppercase tracking-tighter opacity-80">${sign.element}</div>
      `;
      grid.appendChild(card);
    });
  }

  // Render Select Options
  const s1 = document.getElementById('select-sign-1') as HTMLSelectElement;
  const s2 = document.getElementById('select-sign-2') as HTMLSelectElement;
  if (s1 && s2) {
    ZODIAC_SIGNS.forEach(sign => {
      const opt = `<option value="${sign.id}">${sign.symbol} ${sign.name}</option>`;
      s1.innerHTML += opt;
      s2.innerHTML += opt;
    });

    s1.onchange = (e) => {
      const target = e.target as HTMLSelectElement;
      const sign = ZODIAC_SIGNS.find(s => s.id === target.value);
      const slot = document.getElementById('comp-slot-1');
      if (slot && sign) slot.innerText = sign.symbol;
    };
    s2.onchange = (e) => {
      const target = e.target as HTMLSelectElement;
      const sign = ZODIAC_SIGNS.find(s => s.id === target.value);
      const slot = document.getElementById('comp-slot-2');
      if (slot && sign) slot.innerText = sign.symbol;
    };
  }

  // Theme Toggle
  let isDark = true;
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.onclick = () => {
      isDark = !isDark;
      document.documentElement.classList.toggle('dark');
      themeToggle.innerText = isDark ? '🌙' : '☀️';
      document.body.className = isDark ? 'bg-[#0b0e14] text-white overflow-x-hidden' : 'bg-slate-50 text-slate-900 overflow-x-hidden';
      const stars = document.getElementById('stars');
      if (stars) stars.style.display = isDark ? 'block' : 'none';
    };
  }

  // Daily Quote
  const quoteEl = document.getElementById('daily-quote');
  if (quoteEl) {
    quoteEl.innerText = `"${QUOTES[Math.floor(Math.random() * QUOTES.length)]}"`;
  }
  
  initQuiz();
}

(window as any).showSection = showSection;
(window as any).initQuiz = initQuiz;
(window as any).openDetail = openDetail;

init();
