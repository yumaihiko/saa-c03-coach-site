"use strict";

/* Merge bilingual coach bank into main QUESTIONS (by id; bilingual wins). */
(function mergeBanks() {
  const base = window.QUESTIONS || [];
  const bi = window.QUESTIONS_BILINGUAL || [];
  const map = new Map();
  base.forEach((q) => map.set(q.id, q));
  bi.forEach((q) => map.set(q.id, q));
  window.QUESTIONS = [...map.values()];
})();

const Q = window.QUESTIONS || [];
const CARDS = window.FLASHCARDS || [];
const PASS = 0.72;
const KEYS = {
  theme: "zhengshuren-theme",
  lang: "zhengshuren-lang-v1",
  stats: "zhengshuren-qstats-v1",
  wrong: "zhengshuren-wrong-v1",
  wrongLog: "zhengshuren-wronglog-v1",
  history: "zhengshuren-history-v1",
  cards: "zhengshuren-cardstats-v1",
};

const I18N = {
  zh: {
    nav_home: "首頁",
    nav_quiz: "練習題",
    nav_cards: "知識卡",
    nav_progress: "進度",
    home_title: "證書人 · SAA-C03 溫書站",
    home_lead: "中英切換（像真考語言切換）、練習題、知識卡與弱點追蹤。進度存在瀏覽器本機。",
    home_note: "題庫以官方風格情境 MCQ 為主。證書人雙語題已標「雙語」；其餘題可顯示英文題幹＋中文介面。貼進度給證書人可即時補強。",
    answered: "累計答題",
    accuracy: "正確率",
    wrong_bank: "錯題庫",
    pass_est: "通過粗估",
    practice: "練習題",
    practice_sub: "快速／主題／錯題／雙語教練題",
    cards: "知識卡",
    cards_sub: "張 · 點擊翻面",
    progress: "進度儀表板",
    progress_sub: "弱項、複製給證書人、備份",
    suggest: "建議優先（依你目前弱點）",
    suggest_topics: "IAM · Networking（ALB/NLB、Egress-only IGW）· Database（Aurora Serverless v2）· Compute（SnapStart）",
    start_weak: "針對弱項主題練 10 題",
    start_bi: "雙語教練題（證書人）",
    start_cards_weak: "先翻弱項知識卡",
    quiz_title: "練習題",
    quiz_lead: "題 · 即時回饋與解析 · 可中英切換題幹",
    quick: "快速練習",
    quick_sub: "隨機 20 題，答完即看解析",
    by_topic: "依主題",
    by_topic_sub: "選 module 出題",
    review_wrong: "錯題重溫",
    pending: "題待複習",
    bilingual: "雙語教練題",
    bilingual_sub: "證書人原創中英對照",
    topic_settings: "主題設定",
    topic: "主題",
    all: "全部",
    count: "題數",
    start: "開始",
    no_questions: "沒有可用題目",
    multi: "多選",
    submit: "提交／看解析",
    prev: "上一題",
    next: "下一題",
    results: "看結果",
    quit: "結束",
    keys_hint: "鍵盤：A–D 選項 · Enter 提交 · ←/→ 換題 · L 切換語言",
    correct: "答對了",
    incorrect: "答錯了",
    right_ans: "正確答案",
    why_right: "為什麼對",
    explanation: "解析",
    end_confirm: "結束本次練習並看結果？",
    session_result: "本次結果",
    got_right: "答對",
    answered_of: "已作答",
    total_q: "共",
    q_unit: "題",
    again: "再來一輪同設定",
    to_wrong: "去錯題重溫",
    to_home: "回首頁",
    detail: "明細",
    your_vs: "你的／正解",
    unanswered: "未作答",
    no_wrong: "目前沒有錯題",
    result: "結果",
    cards_title: "知識卡",
    cards_lead: "張（含弱項精選）。點卡片翻面。",
    all_cards: "全部抽卡",
    random_order: "隨機順序",
    weak_picks: "弱項精選",
    weak_pick_sub: "IAM / LB / Aurora / IGW / SnapStart",
    anki: "Anki 匯入卡",
    anki_sub: "來自 MEMORY-CARDS",
    no_cards: "沒有卡片",
    front: "正面 · Front",
    back: "背面 · Back",
    tap_flip: "點擊翻面",
    flip: "翻面",
    know: "記得了",
    again_card: "還要再看",
    prev_card: "上一張",
    end_cards: "結束",
    cards_done: "本輪知識卡結束",
    remembered: "記得",
    review_again: "標記再看",
    more_cards: "再抽一輪",
    back_cards: "回知識卡首頁",
    progress_title: "進度儀表板",
    total_ans: "總答題",
    right: "答對",
    wrongs: "錯題",
    pass_label: "通過粗估：",
    pass_note: "非正式預測；官方通過線約 720/1000。建議各主題正確率穩定 ≥72% 再預約考試。",
    topic_acc: "各主題正確率",
    weak_dash: "弱點看板",
    weak_empty: "尚無錯題紀錄。答錯後會依主題累積在此。",
    review_n: "重溫",
    recent: "最近練習",
    no_hist: "尚無紀錄",
    coach_copy: "複製進度給證書人",
    coach_copy_sub: "產生 Markdown 摘要（分數、弱項、錯題），貼到與證書人的聊天即可。",
    copy_md: "複製 Markdown",
    copy_json: "複製 JSON",
    copied: "已複製到剪貼簿",
    copy_fail: "複製失敗，請手動選取",
    backup: "備份",
    backup_sub: "進度存在本機 localStorage。換裝置前請匯出 JSON。",
    export: "匯出備份",
    import: "匯入備份",
    reset: "清除所有進度",
    import_ok: "匯入成功",
    import_fail: "匯入失敗：檔案格式不正確",
    reset_confirm: "確定清除所有本地進度？此操作無法復原。",
    sample_low: "樣本不足",
    sample_detail: "至少再練 20 題才有參考價值",
    need_work: "仍需加強",
    near_pass: "接近通過水準",
    chance: "有機會，繼續練弱項",
    est_detail: "粗估通過信心約 {n}%（非正式預測）",
    missing_zh: "本題暫無中文譯文，顯示英文題幹（介面仍為中文）。切換到 EN 可練雙語切換。",
    bilingual_tag: "雙語",
    weak_tag: "弱",
    footer:
      "證書人溫書站 · 非官方工具，與 AWS 無隸屬關係。練習題改編自 ChathurangaVKD/SAA-C03（MIT）。進度僅存在你的瀏覽器。",
    time: "時間",
    mode: "模式",
    vs: "對/總",
    pct: "%",
  },
  en: {
    nav_home: "Home",
    nav_quiz: "Quiz",
    nav_cards: "Cards",
    nav_progress: "Progress",
    home_title: "Coach · SAA-C03 Study Site",
    home_lead: "Language toggle like the real exam, practice quizzes, flashcards, and weakness tracking. Progress stays in your browser.",
    home_note: "Questions follow official-style scenario MCQs. Coach bilingual items are tagged. Paste progress to 證書人 for live coaching.",
    answered: "Answered",
    accuracy: "Accuracy",
    wrong_bank: "Wrong bank",
    pass_est: "Pass estimate",
    practice: "Practice quiz",
    practice_sub: "Quick / topic / wrong / bilingual coach",
    cards: "Flashcards",
    cards_sub: "cards · tap to flip",
    progress: "Progress",
    progress_sub: "Weak areas, copy for coach, backup",
    suggest: "Suggested focus (your weak areas)",
    suggest_topics: "IAM · Networking (ALB/NLB, Egress-only IGW) · Database (Aurora Serverless v2) · Compute (SnapStart)",
    start_weak: "Drill weak topics · 10 Q",
    start_bi: "Bilingual coach set",
    start_cards_weak: "Weak-area flashcards",
    quiz_title: "Practice quiz",
    quiz_lead: "questions · instant feedback · bilingual stems when available",
    quick: "Quick practice",
    quick_sub: "20 random questions with explanations",
    by_topic: "By topic",
    by_topic_sub: "Filter by module",
    review_wrong: "Review wrong",
    pending: "to review",
    bilingual: "Bilingual coach",
    bilingual_sub: "Original ZH+EN scenarios",
    topic_settings: "Topic settings",
    topic: "Topic",
    all: "All",
    count: "Count",
    start: "Start",
    no_questions: "No questions available",
    multi: "Multi-select",
    submit: "Submit / explain",
    prev: "Previous",
    next: "Next",
    results: "Results",
    quit: "End",
    keys_hint: "Keys: A–D · Enter submit · ←/→ navigate · L language",
    correct: "Correct",
    incorrect: "Incorrect",
    right_ans: "Correct answer",
    why_right: "Why it's right",
    explanation: "Explanation",
    end_confirm: "End this session and show results?",
    session_result: "Session result",
    got_right: "Correct",
    answered_of: "answered",
    total_q: "of",
    q_unit: "",
    again: "Retry same setup",
    to_wrong: "Review wrong",
    to_home: "Home",
    detail: "Detail",
    your_vs: "Yours / key",
    unanswered: "Skipped",
    no_wrong: "No wrong answers yet",
    result: "Result",
    cards_title: "Flashcards",
    cards_lead: "cards (incl. weak picks). Tap to flip.",
    all_cards: "All cards",
    random_order: "Shuffled",
    weak_picks: "Weak picks",
    weak_pick_sub: "IAM / LB / Aurora / IGW / SnapStart",
    anki: "Anki import",
    anki_sub: "From MEMORY-CARDS",
    no_cards: "No cards",
    front: "Front",
    back: "Back",
    tap_flip: "Tap to flip",
    flip: "Flip",
    know: "Got it",
    again_card: "Review again",
    prev_card: "Previous",
    end_cards: "End",
    cards_done: "Card round done",
    remembered: "Known",
    review_again: "Marked review",
    more_cards: "Another round",
    back_cards: "Back to cards",
    progress_title: "Progress dashboard",
    total_ans: "Total answered",
    right: "Correct",
    wrongs: "Wrong",
    pass_label: "Pass estimate: ",
    pass_note: "Unofficial. Official scaled score ~720/1000. Aim for ≥72% per topic before booking.",
    topic_acc: "Accuracy by topic",
    weak_dash: "Weakness board",
    weak_empty: "No wrong-answer log yet. Misses accumulate here by topic.",
    review_n: "Review",
    recent: "Recent sessions",
    no_hist: "No history yet",
    coach_copy: "Copy progress for 證書人",
    coach_copy_sub: "Build a Markdown summary (scores, weak areas, wrong ids) to paste into chat with your coach.",
    copy_md: "Copy Markdown",
    copy_json: "Copy JSON",
    copied: "Copied to clipboard",
    copy_fail: "Copy failed — select manually",
    backup: "Backup",
    backup_sub: "Progress is in localStorage. Export JSON before switching devices.",
    export: "Export backup",
    import: "Import backup",
    reset: "Clear all progress",
    import_ok: "Import OK",
    import_fail: "Import failed: bad file",
    reset_confirm: "Clear all local progress? This cannot be undone.",
    sample_low: "Too few samples",
    sample_detail: "Practice at least 20 questions for a useful estimate",
    need_work: "Needs work",
    near_pass: "Near pass level",
    chance: "Possible — keep drilling weak areas",
    est_detail: "Rough pass confidence ~{n}% (unofficial)",
    missing_zh: "No Chinese stem yet — showing English (UI stays Chinese). Switch to EN to practice language toggle.",
    bilingual_tag: "Bilingual",
    weak_tag: "Weak",
    footer:
      "Coach study site · Unofficial, not affiliated with AWS. Practice items adapted from ChathurangaVKD/SAA-C03 (MIT). Progress stays in your browser.",
    time: "Time",
    mode: "Mode",
    vs: "OK/Total",
    pct: "%",
  },
};

const store = {
  get(k, d) {
    try {
      const v = JSON.parse(localStorage.getItem(k));
      return v ?? d;
    } catch {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {}
  },
  del(k) {
    try {
      localStorage.removeItem(k);
    } catch {}
  },
};

const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const shuffle = (a) => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const isRight = (q, sel) =>
  !!sel && sel.length === q.answer.length && q.answer.every((a) => sel.includes(a));

const hasZh = (q) => !!(q.q_zh && q.options_zh);

const modules = [...new Set(Q.map((q) => q.module))].sort();
const bilingualCount = Q.filter(hasZh).length;

let lang = store.get(KEYS.lang, "zh");
if (lang !== "zh" && lang !== "en") lang = "zh";

function t(key) {
  return (I18N[lang] && I18N[lang][key]) || I18N.zh[key] || key;
}

function applyLangChrome() {
  document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (k) el.textContent = t(k);
  });
  const btn = document.getElementById("langBtn");
  if (btn) {
    btn.textContent = lang === "zh" ? "中 / EN" : "EN / 中";
    btn.classList.toggle("on-zh", lang === "zh");
    btn.title = lang === "zh" ? "切換為 English" : "Switch to 中文";
  }
  const foot = document.getElementById("siteFooter");
  if (foot) {
    foot.innerHTML =
      esc(t("footer")) +
      ' · <a href="https://github.com/ChathurangaVKD/AWS-Certified-Solutions-Architect-Associate-SAA-C03" rel="noopener">source</a>';
  }
}

function toggleLang() {
  lang = lang === "zh" ? "en" : "zh";
  store.set(KEYS.lang, lang);
  applyLangChrome();
  // re-render current view
  if (quizState && !quizState.finished) renderQuiz();
  else if (quizState && quizState.finished) renderQuizResult();
  else if (cardState) renderCard();
  else go(currentView || "home");
}

function clsPct(p) {
  return p >= 72 ? "g" : p >= 55 ? "y" : "r";
}

function applyTheme(th) {
  if (th) document.documentElement.dataset.theme = th;
}
applyTheme(
  store.get(KEYS.theme, matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light")
);

document.getElementById("theme").onclick = () => {
  const th = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(th);
  store.set(KEYS.theme, th);
};
document.getElementById("langBtn").onclick = () => toggleLang();

/* ---------- question localization helpers ---------- */
function qStem(q) {
  if (lang === "zh" && q.q_zh) return q.q_zh;
  return q.q;
}
function qOptions(q) {
  if (lang === "zh" && q.options_zh) return q.options_zh;
  return q.options;
}
function qExpl(q) {
  if (lang === "zh" && q.explanation_zh) return q.explanation_zh;
  return q.explanation || "";
}
function qWhy(q) {
  if (lang === "zh" && q.why_zh && q.why_zh.length) return q.why_zh;
  return q.why || [];
}

/* ---------- stats / wrong tracking ---------- */
function getStats() {
  return store.get(KEYS.stats, {});
}

function logWrongTopic(q) {
  const log = store.get(KEYS.wrongLog, []);
  log.unshift({
    id: q.id,
    module: q.module || "Unknown",
    at: new Date().toISOString(),
  });
  store.set(KEYS.wrongLog, log.slice(0, 500));
}

function recordAnswer(q, correct) {
  const stats = getStats();
  const m = q.module || "Unknown";
  if (!stats[m]) stats[m] = { correct: 0, total: 0, ids: {} };
  stats[m].total += 1;
  if (correct) stats[m].correct += 1;
  if (!stats[m].ids[q.id]) stats[m].ids[q.id] = { c: 0, t: 0 };
  stats[m].ids[q.id].t += 1;
  if (correct) stats[m].ids[q.id].c += 1;
  store.set(KEYS.stats, stats);

  const wrong = store.get(KEYS.wrong, []);
  if (!correct) {
    if (!wrong.includes(q.id)) wrong.push(q.id);
    logWrongTopic(q);
  } else {
    const i = wrong.indexOf(q.id);
    if (i >= 0) wrong.splice(i, 1);
  }
  store.set(KEYS.wrong, wrong);
}

function topicWrongCounts() {
  const wrong = new Set(store.get(KEYS.wrong, []));
  const counts = {};
  Q.forEach((q) => {
    if (wrong.has(q.id)) {
      const m = q.module || "Unknown";
      counts[m] = (counts[m] || 0) + 1;
    }
  });
  return counts;
}

function weaknessSummary() {
  const stats = getStats();
  const wrongCounts = topicWrongCounts();
  const rows = modules.map((m) => {
    const s = stats[m] || { correct: 0, total: 0 };
    const pct = s.total ? Math.round((100 * s.correct) / s.total) : null;
    return {
      module: m,
      correct: s.correct,
      total: s.total,
      pct,
      wrongOpen: wrongCounts[m] || 0,
      weak: pct != null && s.total >= 3 && pct < 55,
    };
  });
  return rows.sort((a, b) => {
    if (a.weak !== b.weak) return a.weak ? -1 : 1;
    const ap = a.pct == null ? 999 : a.pct;
    const bp = b.pct == null ? 999 : b.pct;
    return ap - bp;
  });
}

function overallAccuracy() {
  const stats = getStats();
  let c = 0,
    tot = 0;
  Object.values(stats).forEach((s) => {
    c += s.correct;
    tot += s.total;
  });
  return { c, t: tot, p: tot ? Math.round((100 * c) / tot) : 0 };
}

function passEstimate() {
  const { p, t: tot } = overallAccuracy();
  if (tot < 20) return { label: t("sample_low"), detail: t("sample_detail"), pct: p };
  const stats = getStats();
  const mods = Object.entries(stats).map(([k, s]) => ({
    k,
    p: s.total ? (100 * s.correct) / s.total : 0,
    t: s.total,
  }));
  const weak = mods.filter((m) => m.t >= 3 && m.p < 55).length;
  const est = Math.max(0, Math.min(95, Math.round(p - weak * 4)));
  let label = t("need_work");
  if (est >= 72) label = t("near_pass");
  else if (est >= 60) label = t("chance");
  return { label, detail: t("est_detail").replace("{n}", String(est)), pct: est };
}

/* ---------- coach copy ---------- */
function buildCoachPayload() {
  const { c, t: tot, p } = overallAccuracy();
  const est = passEstimate();
  const wrong = store.get(KEYS.wrong, []);
  const weak = weaknessSummary().filter((r) => r.weak || r.wrongOpen > 0);
  const byTopic = weaknessSummary().map((r) => ({
    module: r.module,
    correct: r.correct,
    total: r.total,
    accuracy: r.pct,
    openWrong: r.wrongOpen,
    flaggedWeak: r.weak,
  }));
  const wrongDetail = wrong.map((id) => {
    const q = Q.find((x) => x.id === id);
    return { id, module: q?.module || "?", bilingual: q ? hasZh(q) : false };
  });
  const hist = store.get(KEYS.history, []).slice(0, 8);
  return {
    exam: "SAA-C03",
    examDateTarget: "2026-12-18",
    exportedAt: new Date().toISOString(),
    langUI: lang,
    totals: { correct: c, answered: tot, accuracyPct: p },
    passEstimate: { label: est.label, pct: est.pct },
    byTopic,
    weakAreas: weak.map((w) => w.module),
    openWrongIds: wrong,
    wrongDetail,
    recentSessions: hist,
    site: "https://yumaihiko.github.io/saa-c03-coach-site/",
    note: "Paste to 證書人 (Grok Bot coach) for targeted bilingual drills.",
  };
}

function buildCoachMarkdown(payload) {
  const lines = [];
  lines.push("# SAA-C03 進度給證書人 / Progress for coach");
  lines.push("");
  lines.push(`- 匯出時間 / Exported: ${payload.exportedAt}`);
  lines.push(`- 目標考試日 / Target: ${payload.examDateTarget}`);
  lines.push(
    `- 累計 / Totals: ${payload.totals.correct}/${payload.totals.answered} (${payload.totals.accuracyPct}%)`
  );
  lines.push(`- 通過粗估 / Pass estimate: ${payload.passEstimate.label} (~${payload.passEstimate.pct}%)`);
  lines.push(`- 開放錯題 / Open wrong: ${payload.openWrongIds.length}`);
  lines.push(`- 弱項主題 / Weak areas: ${payload.weakAreas.join(", ") || "—"}`);
  lines.push("");
  lines.push("## 各主題 / By topic");
  payload.byTopic.forEach((r) => {
    if (!r.total && !r.openWrong) return;
    const acc = r.accuracy == null ? "—" : r.accuracy + "%";
    const flag = r.flaggedWeak ? " ⚠" : "";
    lines.push(
      `- ${r.module}: ${r.correct}/${r.total} (${acc}), openWrong=${r.openWrong}${flag}`
    );
  });
  lines.push("");
  lines.push("## 錯題 ID / Wrong IDs");
  if (!payload.wrongDetail.length) lines.push("- (none)");
  else
    payload.wrongDetail.forEach((w) =>
      lines.push(`- ${w.id} · ${w.module}${w.bilingual ? " · bilingual" : ""}`)
    );
  lines.push("");
  lines.push("請依弱項出中英 SAA 風格題並更新進度。 / Please drill weak areas with bilingual SAA-style items.");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(payload, null, 2));
  lines.push("```");
  return lines.join("\n");
}

function toast(msg) {
  let el = document.querySelector(".copy-toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "copy-toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(t("copied"));
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast(t("copied"));
      return true;
    } catch {
      toast(t("copy_fail"));
      return false;
    }
  }
}

/* ---------- routing ---------- */
const app = document.getElementById("app");
let quizState = null;
let cardState = null;
let currentView = "home";
let lastQuizCfg = null;

function setNav(active) {
  document.querySelectorAll("header nav button, .mobile-nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === active);
  });
}

function go(view) {
  currentView = view;
  setNav(view);
  window.onkeydown = null;
  if (view === "home") home();
  else if (view === "quiz") quizHome();
  else if (view === "cards") cardsHome();
  else if (view === "progress") progressView();
  else home();
}

document.getElementById("logo").onclick = () => go("home");
document.querySelectorAll("header nav button, .mobile-nav button").forEach((b) => {
  b.onclick = () => go(b.dataset.view);
});

/* ---------- home ---------- */
function home() {
  quizState = null;
  cardState = null;
  const { c, t: tot, p } = overallAccuracy();
  const wrong = store.get(KEYS.wrong, []);
  const est = passEstimate();
  app.innerHTML = `
    <section class="card hero">
      <h2>${esc(t("home_title"))}</h2>
      <p>${esc(t("home_lead"))}</p>
      <div class="note">${esc(t("home_note"))}</div>
    </section>
    <div class="stats">
      <div class="stat"><span class="muted small">${esc(t("answered"))}</span><b>${tot}</b></div>
      <div class="stat"><span class="muted small">${esc(t("accuracy"))}</span><b>${tot ? p + "%" : "—"}</b></div>
      <div class="stat"><span class="muted small">${esc(t("wrong_bank"))}</span><b>${wrong.length}</b></div>
      <div class="stat"><span class="muted small">${esc(t("pass_est"))}</span><b style="font-size:1.05rem">${esc(est.label)}</b></div>
    </div>
    <div class="modes">
      <button class="mode feat" data-go="quiz"><span class="ic">📝</span><b>${esc(t("practice"))}</b><span class="muted small">${esc(t("practice_sub"))}</span></button>
      <button class="mode" data-go="cards"><span class="ic">🎴</span><b>${esc(t("cards"))}</b><span class="muted small">${CARDS.length} ${esc(t("cards_sub"))}</span></button>
      <button class="mode" data-go="progress"><span class="ic">📊</span><b>${esc(t("progress"))}</b><span class="muted small">${esc(t("progress_sub"))}</span></button>
    </div>
    <section class="card" style="margin-top:16px">
      <h3>${esc(t("suggest"))}</h3>
      <p class="muted small">${esc(t("suggest_topics"))}</p>
      <div class="row" style="margin-top:10px">
        <button class="primary" id="startWeak">${esc(t("start_weak"))}</button>
        <button id="startBi">${esc(t("start_bi"))} (${bilingualCount})</button>
        <button id="startCardsWeak">${esc(t("start_cards_weak"))}</button>
      </div>
    </section>
  `;
  app.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
  document.getElementById("startWeak").onclick = () =>
    startQuiz({
      mode: "topic",
      modules: ["IAM", "Networking", "Database", "Compute"],
      count: 10,
      title: lang === "zh" ? "弱項加強 · 10 題" : "Weak drill · 10",
    });
  document.getElementById("startBi").onclick = () =>
    startQuiz({
      mode: "bilingual",
      title: lang === "zh" ? `雙語教練題 · ${bilingualCount}` : `Bilingual coach · ${bilingualCount}`,
    });
  document.getElementById("startCardsWeak").onclick = () => startCards({ filter: "weak" });
}

/* ---------- quiz ---------- */
function quizHome() {
  const wrong = store.get(KEYS.wrong, []);
  const opts = modules.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join("");
  app.innerHTML = `
    <section class="card">
      <h2>${esc(t("quiz_title"))}</h2>
      <p class="muted">${Q.length} ${esc(t("quiz_lead"))}</p>
      <div class="modes" style="margin-top:14px">
        <button class="mode feat" id="mQuick"><span class="ic">⚡</span><b>${esc(t("quick"))}</b><span class="muted small">${esc(t("quick_sub"))}</span></button>
        <button class="mode" id="mTopic"><span class="ic">📚</span><b>${esc(t("by_topic"))}</b><span class="muted small">${esc(t("by_topic_sub"))}</span></button>
        <button class="mode" id="mWrong" ${wrong.length ? "" : "disabled"}><span class="ic">🔁</span><b>${esc(t("review_wrong"))}</b><span class="muted small">${wrong.length} ${esc(t("pending"))}</span></button>
        <button class="mode" id="mBi"><span class="ic">🌐</span><b>${esc(t("bilingual"))}</b><span class="muted small">${esc(t("bilingual_sub"))} · ${bilingualCount}</span></button>
      </div>
    </section>
    <section class="card" id="topicPanel">
      <h3>${esc(t("topic_settings"))}</h3>
      <div class="row">
        <label class="muted small">${esc(t("topic"))}
          <select id="topicSel"><option value="">${esc(t("all"))}</option>${opts}</select>
        </label>
        <label class="muted small">${esc(t("count"))}
          <input type="number" id="topicCount" min="5" max="65" value="15" style="width:88px">
        </label>
        <button class="primary" id="topicGo">${esc(t("start"))}</button>
      </div>
    </section>
  `;
  document.getElementById("mQuick").onclick = () =>
    startQuiz({
      mode: "quick",
      count: 20,
      title: lang === "zh" ? "快速練習 · 20 題" : "Quick · 20",
    });
  document.getElementById("mWrong").onclick = () => {
    if (!wrong.length) return;
    startQuiz({
      mode: "wrong",
      title: lang === "zh" ? `錯題重溫 · ${wrong.length} 題` : `Wrong review · ${wrong.length}`,
    });
  };
  document.getElementById("mBi").onclick = () =>
    startQuiz({
      mode: "bilingual",
      title: lang === "zh" ? `雙語教練題 · ${bilingualCount}` : `Bilingual · ${bilingualCount}`,
    });
  document.getElementById("topicGo").onclick = () => {
    const mod = document.getElementById("topicSel").value;
    const count = Math.max(5, Math.min(65, Number(document.getElementById("topicCount").value) || 15));
    startQuiz({
      mode: "topic",
      modules: mod ? [mod] : modules,
      count,
      title: mod
        ? `${mod} · ${count}${lang === "zh" ? " 題" : ""}`
        : lang === "zh"
          ? `混合主題 · ${count} 題`
          : `Mixed · ${count}`,
    });
  };
  document.getElementById("mTopic").onclick = () =>
    document.getElementById("topicPanel").scrollIntoView({ behavior: "smooth" });
}

function pickQuestions(cfg) {
  let pool = Q.slice();
  if (cfg.mode === "wrong") {
    const wrong = new Set(store.get(KEYS.wrong, []));
    pool = Q.filter((q) => wrong.has(q.id));
  } else if (cfg.mode === "bilingual") {
    pool = Q.filter(hasZh);
  } else if (cfg.modules) {
    const set = new Set(cfg.modules);
    pool = Q.filter((q) => set.has(q.module));
  }
  pool = shuffle(pool);
  const n = cfg.count ? Math.min(cfg.count, pool.length) : pool.length;
  return pool.slice(0, n);
}

function startQuiz(cfg) {
  lastQuizCfg = cfg;
  const list = pickQuestions(cfg);
  if (!list.length) {
    alert(t("no_questions"));
    return;
  }
  quizState = {
    title: cfg.title || "Practice",
    list,
    i: 0,
    answers: {},
    revealed: {},
    finished: false,
    cfg,
  };
  currentView = "quiz";
  setNav("quiz");
  renderQuiz();
}

function explHtml(q) {
  const opts = qOptions(q);
  const right = q.answer
    .map((a) => `<li><span class="chip g">${a}</span><span>${esc(opts[a])}</span></li>`)
    .join("");
  const why = qWhy(q)
    .map((w) => `<li><span>•</span><span>${esc(w)}</span></li>`)
    .join("");
  const expl = qExpl(q);
  if (!right) return `<p>${esc(expl)}</p>`;
  return `<div class="ex"><h4>✅ ${esc(t("right_ans"))}</h4><ul>${right}</ul>${
    why ? `<h4>💡 ${esc(t("why_right"))}</h4><ul>${why}</ul>` : ""
  }${expl ? `<h4>${esc(t("explanation"))}</h4><p>${esc(expl)}</p>` : ""}</div>`;
}

function renderQuiz() {
  const S = quizState;
  if (!S) return quizHome();
  if (S.finished) return renderQuizResult();

  const q = S.list[S.i];
  const sel = S.answers[q.id] || [];
  const revealed = !!S.revealed[q.id];
  const opts = qOptions(q);
  const letters = Object.keys(opts);
  const pct = Math.round((100 * S.i) / S.list.length);
  const showMissing = lang === "zh" && !hasZh(q);

  app.innerHTML = `
    <section class="card">
      <div class="row">
        <span class="tag">${esc(S.title)}</span>
        <span class="tag">${esc(q.module)}</span>
        ${q.multi ? `<span class="tag warn">${esc(t("multi"))}</span>` : ""}
        ${hasZh(q) ? `<span class="tag bi">${esc(t("bilingual_tag"))}</span>` : ""}
        <span class="spacer"></span>
        <span class="muted small">${S.i + 1} / ${S.list.length}</span>
      </div>
      <div class="bar" style="margin:10px 0 14px"><i class="y" style="width:${pct}%"></i></div>
      <div class="lang-badge">🌐 ${lang === "zh" ? "中文" : "English"} · ${esc(t("keys_hint").split("·").pop().trim())}</div>
      ${showMissing ? `<div class="missing-zh">${esc(t("missing_zh"))}</div>` : ""}
      <div class="qtext">${esc(qStem(q))}</div>
      <div id="opts"></div>
      <div id="explWrap"></div>
      <div class="actions row">
        <button id="prev" ${S.i === 0 ? "disabled" : ""}>${esc(t("prev"))}</button>
        <button id="check" class="primary" ${revealed || !sel.length ? "disabled" : ""}>${esc(t("submit"))}</button>
        <button id="next">${S.i === S.list.length - 1 ? esc(t("results")) : esc(t("next"))}</button>
        <button id="quit" class="danger">${esc(t("quit"))}</button>
      </div>
      <p class="muted small" style="margin-top:8px">${esc(t("keys_hint"))}</p>
    </section>
  `;

  const optsEl = document.getElementById("opts");
  letters.forEach((L) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.type = "button";
    b.innerHTML = `<span class="l">${L}</span><span>${esc(opts[L])}</span>`;
    if (sel.includes(L)) b.classList.add("sel");
    if (revealed) {
      b.disabled = true;
      if (q.answer.includes(L)) b.classList.add("ok");
      else if (sel.includes(L)) b.classList.add("bad");
    } else {
      b.onclick = () => {
        let next;
        if (q.multi) {
          next = sel.includes(L) ? sel.filter((x) => x !== L) : sel.concat(L);
        } else {
          next = [L];
        }
        S.answers[q.id] = next;
        renderQuiz();
      };
    }
    optsEl.appendChild(b);
  });

  if (revealed) {
    const ok = isRight(q, sel);
    const wrap = document.getElementById("explWrap");
    wrap.innerHTML = `<div class="expl ${ok ? "ok" : "bad"}">${
      ok ? "✅ " + esc(t("correct")) : "❌ " + esc(t("incorrect"))
    }${explHtml(q)}</div>`;
  }

  document.getElementById("prev").onclick = () => {
    if (S.i > 0) {
      S.i--;
      renderQuiz();
    }
  };
  document.getElementById("next").onclick = () => {
    if (S.i === S.list.length - 1) finishQuiz();
    else {
      S.i++;
      renderQuiz();
    }
  };
  document.getElementById("check").onclick = () => submitCurrent();
  document.getElementById("quit").onclick = () => {
    if (confirm(t("end_confirm"))) finishQuiz();
  };

  window.onkeydown = (e) => {
    if (!quizState || quizState.finished) return;
    if (e.key === "l" || e.key === "L") {
      e.preventDefault();
      toggleLang();
      return;
    }
    const key = e.key.toUpperCase();
    if ("ABCD".includes(key) && !revealed) {
      const btn = [...optsEl.children].find((x) => x.querySelector(".l")?.textContent === key);
      if (btn && !btn.disabled) btn.click();
    } else if (e.key === "Enter" && !revealed) submitCurrent();
    else if (e.key === "ArrowLeft") document.getElementById("prev")?.click();
    else if (e.key === "ArrowRight") document.getElementById("next")?.click();
  };
}

function submitCurrent() {
  const S = quizState;
  const q = S.list[S.i];
  const sel = S.answers[q.id] || [];
  if (!sel.length || S.revealed[q.id]) return;
  S.revealed[q.id] = true;
  const ok = isRight(q, sel);
  recordAnswer(q, ok);
  renderQuiz();
}

function finishQuiz() {
  const S = quizState;
  S.list.forEach((q) => {
    if (!S.revealed[q.id] && S.answers[q.id]?.length) {
      S.revealed[q.id] = true;
      recordAnswer(q, isRight(q, S.answers[q.id]));
    }
  });
  S.finished = true;
  const hist = store.get(KEYS.history, []);
  const answered = S.list.filter((q) => S.revealed[q.id]);
  const correct = answered.filter((q) => isRight(q, S.answers[q.id])).length;
  hist.unshift({
    at: new Date().toISOString(),
    title: S.title,
    total: S.list.length,
    answered: answered.length,
    correct,
  });
  store.set(KEYS.history, hist.slice(0, 50));
  window.onkeydown = null;
  renderQuizResult();
}

function renderQuizResult() {
  const S = quizState;
  const answered = S.list.filter((q) => S.revealed[q.id]);
  const correct = answered.filter((q) => isRight(q, S.answers[q.id])).length;
  const p = answered.length ? Math.round((100 * correct) / answered.length) : 0;
  const color = p >= 72 ? "var(--ok)" : p >= 55 ? "var(--accent)" : "var(--bad)";

  const rows = S.list
    .map((q, idx) => {
      const sel = S.answers[q.id];
      const done = S.revealed[q.id];
      const ok = done && isRight(q, sel);
      return `<tr>
        <td>${idx + 1}</td>
        <td>${esc(q.module)}</td>
        <td>${done ? (ok ? '<span class="pass">✓</span>' : '<span class="fail">✗</span>') : "—"}</td>
        <td class="small muted">${done ? esc((sel || []).join("")) + " / " + esc(q.answer.join("")) : esc(t("unanswered"))}</td>
      </tr>`;
    })
    .join("");

  app.innerHTML = `
    <section class="card">
      <div class="row" style="gap:16px;align-items:center">
        <div class="ring" style="--p:${p};--c:${color}"><div>${p}%</div></div>
        <div>
          <h2>${esc(t("session_result"))}</h2>
          <p class="muted">${esc(S.title)}</p>
          <p>${esc(t("got_right"))} <b>${correct}</b> / ${esc(t("answered_of"))} ${answered.length}（${esc(t("total_q"))} ${S.list.length} ${esc(t("q_unit"))}）</p>
        </div>
      </div>
      <div class="row" style="margin-top:16px">
        <button class="primary" id="again">${esc(t("again"))}</button>
        <button id="toWrong">${esc(t("to_wrong"))}</button>
        <button id="copyCoach">${esc(t("copy_md"))}</button>
        <button id="toHome">${esc(t("to_home"))}</button>
      </div>
    </section>
    <section class="card">
      <h3>${esc(t("detail"))}</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>${esc(t("topic"))}</th><th>${esc(t("result"))}</th><th>${esc(t("your_vs"))}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>
  `;
  document.getElementById("toHome").onclick = () => go("home");
  document.getElementById("copyCoach").onclick = () => {
    const payload = buildCoachPayload();
    copyText(buildCoachMarkdown(payload));
  };
  document.getElementById("toWrong").onclick = () => {
    const wrong = store.get(KEYS.wrong, []);
    if (!wrong.length) {
      alert(t("no_wrong"));
      return;
    }
    startQuiz({
      mode: "wrong",
      title: lang === "zh" ? `錯題重溫 · ${wrong.length} 題` : `Wrong review · ${wrong.length}`,
    });
  };
  document.getElementById("again").onclick = () => {
    if (lastQuizCfg) startQuiz(lastQuizCfg);
    else if (S.cfg) startQuiz(S.cfg);
  };
}

/* ---------- flashcards ---------- */
function cardsHome() {
  const weak = CARDS.filter((c) => (c.tags || []).includes("weak")).length;
  app.innerHTML = `
    <section class="card">
      <h2>${esc(t("cards_title"))}</h2>
      <p class="muted">${CARDS.length} ${esc(t("cards_lead"))} (${weak})</p>
      <div class="modes" style="margin-top:14px">
        <button class="mode feat" id="cAll"><span class="ic">🎴</span><b>${esc(t("all_cards"))}</b><span class="muted small">${esc(t("random_order"))}</span></button>
        <button class="mode" id="cWeak"><span class="ic">🎯</span><b>${esc(t("weak_picks"))}</b><span class="muted small">${esc(t("weak_pick_sub"))}</span></button>
        <button class="mode" id="cAnki"><span class="ic">📚</span><b>${esc(t("anki"))}</b><span class="muted small">${esc(t("anki_sub"))}</span></button>
      </div>
    </section>
  `;
  document.getElementById("cAll").onclick = () => startCards({ filter: "all" });
  document.getElementById("cWeak").onclick = () => startCards({ filter: "weak" });
  document.getElementById("cAnki").onclick = () => startCards({ filter: "anki" });
}

function startCards(cfg) {
  let list = CARDS.slice();
  if (cfg.filter === "weak")
    list = CARDS.filter((c) => (c.tags || []).includes("weak") || c.source === "curated");
  else if (cfg.filter === "anki") list = CARDS.filter((c) => c.source === "anki");
  list = shuffle(list);
  if (!list.length) {
    alert(t("no_cards"));
    return;
  }
  cardState = { list, i: 0, flipped: false, known: 0, review: 0, filter: cfg.filter };
  currentView = "cards";
  setNav("cards");
  renderCard();
}

function renderCard() {
  const S = cardState;
  if (!S) return cardsHome();
  const c = S.list[S.i];
  app.innerHTML = `
    <section class="card">
      <div class="row">
        <span class="tag">${S.i + 1} / ${S.list.length}</span>
        ${(c.tags || [])
          .map((tg) => `<span class="tag ${tg === "weak" ? "weak" : ""}">${esc(tg)}</span>`)
          .join("")}
        <span class="spacer"></span>
        <span class="muted small">${esc(t("remembered"))} ${S.known} · ${esc(t("review_again"))} ${S.review}</span>
      </div>
      <div class="flash-stage">
        <div class="flash-card ${S.flipped ? "flipped" : ""}" id="flash" role="button" tabindex="0" aria-label="Flip card">
          <div class="flash-face front">
            <div class="label">${esc(t("front"))}</div>
            <div class="body">${esc(c.front)}</div>
            <p class="muted small" style="margin-top:18px">${esc(t("tap_flip"))}</p>
          </div>
          <div class="flash-face back">
            <div class="label">${esc(t("back"))}</div>
            <div class="body">${esc(c.back)}</div>
          </div>
        </div>
      </div>
      <div class="actions row">
        <button id="prevC" ${S.i === 0 ? "disabled" : ""}>${esc(t("prev_card"))}</button>
        <button id="flip">${esc(t("flip"))}</button>
        <button class="primary" id="know">${esc(t("know"))}</button>
        <button id="againC">${esc(t("again_card"))}</button>
        <button id="quitC">${esc(t("end_cards"))}</button>
      </div>
    </section>
  `;
  const flip = () => {
    S.flipped = !S.flipped;
    renderCard();
  };
  document.getElementById("flash").onclick = flip;
  document.getElementById("flip").onclick = flip;
  document.getElementById("prevC").onclick = () => {
    if (S.i > 0) {
      S.i--;
      S.flipped = false;
      renderCard();
    }
  };
  document.getElementById("know").onclick = () => {
    S.known++;
    nextCard();
  };
  document.getElementById("againC").onclick = () => {
    S.review++;
    const cur = S.list.splice(S.i, 1)[0];
    S.list.push(cur);
    S.flipped = false;
    if (S.i >= S.list.length) S.i = 0;
    renderCard();
  };
  document.getElementById("quitC").onclick = () => {
    cardState = null;
    cardsHome();
  };
  function nextCard() {
    S.flipped = false;
    if (S.i >= S.list.length - 1) {
      app.innerHTML = `
        <section class="card">
          <h2>${esc(t("cards_done"))}</h2>
          <p>${esc(t("remembered"))} ${S.known} · ${esc(t("review_again"))} ${S.review}</p>
          <div class="row" style="margin-top:14px">
            <button class="primary" id="more">${esc(t("more_cards"))}</button>
            <button id="back">${esc(t("back_cards"))}</button>
          </div>
        </section>`;
      document.getElementById("more").onclick = () => startCards({ filter: S.filter || "all" });
      document.getElementById("back").onclick = () => cardsHome();
      return;
    }
    S.i++;
    renderCard();
  }
}

/* ---------- progress ---------- */
function progressView() {
  const stats = getStats();
  const { c, t: tot, p } = overallAccuracy();
  const est = passEstimate();
  const wrong = store.get(KEYS.wrong, []);
  const hist = store.get(KEYS.history, []);
  const weakRows = weaknessSummary();

  const rows = weakRows
    .map((r) => {
      const bar = r.pct == null ? 0 : r.pct;
      return `<tr>
        <td>${esc(r.module)} ${r.weak ? `<span class="tag bad">${esc(t("weak_tag"))}</span>` : ""}</td>
        <td>${r.correct}/${r.total}</td>
        <td>${r.wrongOpen}</td>
        <td style="min-width:100px"><div class="bar"><i class="${r.pct == null ? "y" : clsPct(r.pct)}" style="width:${bar}%"></i></div></td>
        <td>${r.pct == null ? "—" : r.pct + "%"}</td>
      </tr>`;
    })
    .join("");

  const weakBoard = weakRows
    .filter((r) => r.wrongOpen > 0 || r.weak)
    .map(
      (r) => `<li>
        <div><b>${esc(r.module)}</b>
          <div class="muted small">${r.wrongOpen} open · ${r.pct == null ? "—" : r.pct + "%"} (${r.correct}/${r.total})</div>
        </div>
        <button data-mod="${esc(r.module)}" class="primary">${esc(t("review_n"))}</button>
      </li>`
    )
    .join("");

  const histRows = hist
    .slice(0, 10)
    .map((h) => {
      const pp = h.answered ? Math.round((100 * h.correct) / h.answered) : 0;
      const when = new Date(h.at).toLocaleString(lang === "zh" ? "zh-HK" : "en-HK", {
        hour12: false,
        timeZone: "Asia/Hong_Kong",
      });
      return `<tr><td class="small">${esc(when)}</td><td>${esc(h.title)}</td><td>${h.correct}/${h.answered}</td><td class="${pp >= 72 ? "pass" : "fail"}">${pp}%</td></tr>`;
    })
    .join("");

  app.innerHTML = `
    <section class="card">
      <h2>${esc(t("progress_title"))}</h2>
      <div class="stats" style="margin-top:12px">
        <div class="stat"><span class="muted small">${esc(t("total_ans"))}</span><b>${tot}</b></div>
        <div class="stat"><span class="muted small">${esc(t("right"))}</span><b>${c}</b></div>
        <div class="stat"><span class="muted small">${esc(t("accuracy"))}</span><b>${tot ? p + "%" : "—"}</b></div>
        <div class="stat"><span class="muted small">${esc(t("wrongs"))}</span><b>${wrong.length}</b></div>
      </div>
      <div class="hint">
        <b>${esc(t("pass_label"))}</b>${esc(est.label)} — ${esc(est.detail)}
        <div class="muted small" style="margin-top:6px">${esc(t("pass_note"))}</div>
      </div>
    </section>

    <section class="card">
      <h3>${esc(t("coach_copy"))}</h3>
      <p class="muted small">${esc(t("coach_copy_sub"))}</p>
      <div class="row" style="margin-top:10px">
        <button class="primary" id="copyMd">${esc(t("copy_md"))}</button>
        <button id="copyJson">${esc(t("copy_json"))}</button>
      </div>
    </section>

    <section class="card">
      <h3>${esc(t("weak_dash"))}</h3>
      ${
        weakBoard
          ? `<ul class="weak-list">${weakBoard}</ul>`
          : `<p class="muted">${esc(t("weak_empty"))}</p>`
      }
      <div class="row" style="margin-top:10px">
        <button id="revAllWrong" ${wrong.length ? "" : "disabled"}>${esc(t("review_wrong"))} (${wrong.length})</button>
      </div>
    </section>

    <section class="card">
      <h3>${esc(t("topic_acc"))}</h3>
      <div class="table-wrap">
        <table>
          <thead><tr><th>${esc(t("topic"))}</th><th>${esc(t("vs"))}</th><th>Wrong</th><th></th><th>${esc(t("pct"))}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h3>${esc(t("recent"))}</h3>
      ${
        histRows
          ? `<div class="table-wrap"><table><thead><tr><th>${esc(t("time"))}</th><th>${esc(t("mode"))}</th><th>OK</th><th>%</th></tr></thead><tbody>${histRows}</tbody></table></div>`
          : `<p class="muted">${esc(t("no_hist"))}</p>`
      }
    </section>

    <section class="card">
      <h3>${esc(t("backup"))}</h3>
      <p class="muted small">${esc(t("backup_sub"))}</p>
      <div class="row" style="margin-top:10px">
        <button class="primary" id="exp">${esc(t("export"))}</button>
        <button id="imp">${esc(t("import"))}</button>
        <button class="danger" id="reset">${esc(t("reset"))}</button>
        <input type="file" id="impFile" accept="application/json,.json" class="hidden">
      </div>
    </section>
  `;

  document.getElementById("copyMd").onclick = () => {
    const payload = buildCoachPayload();
    copyText(buildCoachMarkdown(payload));
  };
  document.getElementById("copyJson").onclick = () => {
    copyText(JSON.stringify(buildCoachPayload(), null, 2));
  };
  document.getElementById("revAllWrong").onclick = () => {
    if (!wrong.length) return;
    startQuiz({
      mode: "wrong",
      title: lang === "zh" ? `錯題重溫 · ${wrong.length} 題` : `Wrong review · ${wrong.length}`,
    });
  };
  app.querySelectorAll(".weak-list [data-mod]").forEach((btn) => {
    btn.onclick = () => {
      const mod = btn.getAttribute("data-mod");
      const wrongSet = new Set(store.get(KEYS.wrong, []));
      // prefer wrongs in that module; else topic drill
      const inMod = Q.filter((q) => q.module === mod && wrongSet.has(q.id));
      if (inMod.length) {
        quizState = {
          title: lang === "zh" ? `${mod} 錯題` : `${mod} wrongs`,
          list: shuffle(inMod),
          i: 0,
          answers: {},
          revealed: {},
          finished: false,
          cfg: { mode: "wrong" },
        };
        lastQuizCfg = { mode: "wrong", title: quizState.title };
        currentView = "quiz";
        setNav("quiz");
        renderQuiz();
      } else {
        startQuiz({
          mode: "topic",
          modules: [mod],
          count: 10,
          title: `${mod} · 10`,
        });
      }
    };
  });

  document.getElementById("exp").onclick = () => {
    const payload = {
      version: 2,
      exportedAt: new Date().toISOString(),
      stats: store.get(KEYS.stats, {}),
      wrong: store.get(KEYS.wrong, []),
      wrongLog: store.get(KEYS.wrongLog, []),
      history: store.get(KEYS.history, []),
      theme: store.get(KEYS.theme, "light"),
      lang: store.get(KEYS.lang, "zh"),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `zhengshuren-saa-c03-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  document.getElementById("imp").onclick = () => document.getElementById("impFile").click();
  document.getElementById("impFile").onchange = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (data.stats) store.set(KEYS.stats, data.stats);
      if (data.wrong) store.set(KEYS.wrong, data.wrong);
      if (data.wrongLog) store.set(KEYS.wrongLog, data.wrongLog);
      if (data.history) store.set(KEYS.history, data.history);
      if (data.theme) {
        store.set(KEYS.theme, data.theme);
        applyTheme(data.theme);
      }
      if (data.lang === "zh" || data.lang === "en") {
        lang = data.lang;
        store.set(KEYS.lang, lang);
        applyLangChrome();
      }
      alert(t("import_ok"));
      progressView();
    } catch {
      alert(t("import_fail"));
    }
  };
  document.getElementById("reset").onclick = () => {
    if (!confirm(t("reset_confirm"))) return;
    store.del(KEYS.stats);
    store.del(KEYS.wrong);
    store.del(KEYS.wrongLog);
    store.del(KEYS.history);
    progressView();
  };
}

/* boot */
applyLangChrome();
go("home");
