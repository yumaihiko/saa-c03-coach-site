"use strict";

const Q = window.QUESTIONS || [];
const CARDS = window.FLASHCARDS || [];
const PASS = 0.72;
const KEYS = {
  theme: "zhengshuren-theme",
  stats: "zhengshuren-qstats-v1",
  wrong: "zhengshuren-wrong-v1",
  history: "zhengshuren-history-v1",
  cards: "zhengshuren-cardstats-v1",
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
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

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

const modules = [...new Set(Q.map((q) => q.module))].sort();

function clsPct(p) {
  return p >= 72 ? "g" : p >= 55 ? "y" : "r";
}

function applyTheme(t) {
  if (t) document.documentElement.dataset.theme = t;
}
applyTheme(
  store.get(KEYS.theme, matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light")
);

document.getElementById("theme").onclick = () => {
  const t = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(t);
  store.set(KEYS.theme, t);
};

/* ---------- stats helpers ---------- */
function getStats() {
  return store.get(KEYS.stats, {});
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
  } else {
    const i = wrong.indexOf(q.id);
    if (i >= 0) wrong.splice(i, 1);
  }
  store.set(KEYS.wrong, wrong);
}

function overallAccuracy() {
  const stats = getStats();
  let c = 0,
    t = 0;
  Object.values(stats).forEach((s) => {
    c += s.correct;
    t += s.total;
  });
  return { c, t, p: t ? Math.round((100 * c) / t) : 0 };
}

function passEstimate() {
  const { p, t } = overallAccuracy();
  if (t < 20) return { label: "樣本不足", detail: "至少再練 20 題才有參考價值", pct: p };
  // simple blend: overall * 0.7 + weak-penalty
  const stats = getStats();
  const mods = Object.entries(stats).map(([k, s]) => ({
    k,
    p: s.total ? (100 * s.correct) / s.total : 0,
    t: s.total,
  }));
  const weak = mods.filter((m) => m.t >= 3 && m.p < 55).length;
  const est = Math.max(0, Math.min(95, Math.round(p - weak * 4)));
  let label = "仍需加強";
  if (est >= 72) label = "接近通過水準";
  else if (est >= 60) label = "有機會，繼續練弱項";
  return { label, detail: `粗估通過信心約 ${est}%（非正式預測）`, pct: est };
}

/* ---------- routing ---------- */
const app = document.getElementById("app");
let quizState = null;
let cardState = null;

function setNav(active) {
  document.querySelectorAll("header nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === active);
  });
}

function go(view, ...args) {
  setNav(view);
  if (view === "home") home();
  else if (view === "quiz") quizHome();
  else if (view === "cards") cardsHome();
  else if (view === "progress") progressView();
  else home();
}

document.getElementById("logo").onclick = () => go("home");
document.querySelectorAll("header nav button").forEach((b) => {
  b.onclick = () => go(b.dataset.view);
});

/* ---------- home ---------- */
function home() {
  quizState = null;
  cardState = null;
  const { c, t, p } = overallAccuracy();
  const wrong = store.get(KEYS.wrong, []);
  const est = passEstimate();
  app.innerHTML = `
    <section class="card hero">
      <h2>證書人 · SAA-C03 溫書站</h2>
      <p>互動練習題、知識卡與弱點儀表板。題庫來源見頁尾授權說明。</p>
      <div class="note">📝 題庫目前為英文（貼近官方風格）。中英對照教練題由「證書人」對話另外提供；此站專注大量刷題與複習。</div>
    </section>
    <div class="stats">
      <div class="stat"><span class="muted small">累計答題</span><b>${t}</b></div>
      <div class="stat"><span class="muted small">正確率</span><b>${t ? p + "%" : "—"}</b></div>
      <div class="stat"><span class="muted small">錯題庫</span><b>${wrong.length}</b></div>
      <div class="stat"><span class="muted small">通過粗估</span><b style="font-size:1.1rem">${esc(est.label)}</b></div>
    </div>
    <div class="modes">
      <button class="mode feat" data-go="quiz"><span class="ic">📝</span><b>練習題</b><span class="muted small">快速練習／依主題／錯題重溫</span></button>
      <button class="mode" data-go="cards"><span class="ic">🎴</span><b>知識卡</b><span class="muted small">${CARDS.length} 張 · 點擊翻面</span></button>
      <button class="mode" data-go="progress"><span class="ic">📊</span><b>進度儀表板</b><span class="muted small">弱項、備份匯出／匯入</span></button>
    </div>
    <section class="card" style="margin-top:18px">
      <h3>建議優先（依你目前弱點）</h3>
      <p class="muted small">IAM · Networking（ALB/NLB、Egress-only IGW）· Database（Aurora Serverless v2）· Compute（SnapStart）</p>
      <div class="row" style="margin-top:10px">
        <button class="primary" id="startWeak">針對弱項主題練 10 題</button>
        <button id="startCardsWeak">先翻弱項知識卡</button>
      </div>
    </section>
  `;
  app.querySelectorAll("[data-go]").forEach((b) => (b.onclick = () => go(b.dataset.go)));
  document.getElementById("startWeak").onclick = () =>
    startQuiz({
      mode: "topic",
      modules: ["IAM", "Networking", "Database", "Compute"],
      count: 10,
      title: "弱項加強 · 10 題",
    });
  document.getElementById("startCardsWeak").onclick = () => startCards({ filter: "weak" });
}

/* ---------- quiz home ---------- */
function quizHome() {
  const wrong = store.get(KEYS.wrong, []);
  const opts = modules.map((m) => `<option value="${esc(m)}">${esc(m)}</option>`).join("");
  app.innerHTML = `
    <section class="card">
      <h2>練習題</h2>
      <p class="muted">題庫 ${Q.length} 題 · 即時回饋與解析 · 進度存於瀏覽器</p>
      <div class="modes" style="margin-top:14px">
        <button class="mode feat" id="mQuick"><span class="ic">⚡</span><b>快速練習</b><span class="muted small">隨機 20 題，答完即看解析</span></button>
        <button class="mode" id="mTopic"><span class="ic">📚</span><b>依主題</b><span class="muted small">選 module 出題</span></button>
        <button class="mode" id="mWrong" ${wrong.length ? "" : "disabled"}><span class="ic">🔁</span><b>錯題重溫</b><span class="muted small">${wrong.length} 題待複習</span></button>
      </div>
    </section>
    <section class="card" id="topicPanel">
      <h3>主題設定</h3>
      <div class="row">
        <label class="muted small">主題
          <select id="topicSel"><option value="">全部</option>${opts}</select>
        </label>
        <label class="muted small">題數
          <input type="number" id="topicCount" min="5" max="65" value="15" style="width:80px">
        </label>
        <button class="primary" id="topicGo">開始</button>
      </div>
    </section>
  `;
  document.getElementById("mQuick").onclick = () =>
    startQuiz({ mode: "quick", count: 20, title: "快速練習 · 20 題" });
  document.getElementById("mWrong").onclick = () => {
    if (!wrong.length) return;
    startQuiz({ mode: "wrong", title: `錯題重溫 · ${wrong.length} 題` });
  };
  document.getElementById("topicGo").onclick = () => {
    const mod = document.getElementById("topicSel").value;
    const count = Math.max(5, Math.min(65, Number(document.getElementById("topicCount").value) || 15));
    startQuiz({
      mode: "topic",
      modules: mod ? [mod] : modules,
      count,
      title: mod ? `${mod} · ${count} 題` : `混合主題 · ${count} 題`,
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
  } else if (cfg.modules) {
    const set = new Set(cfg.modules);
    pool = Q.filter((q) => set.has(q.module));
  }
  pool = shuffle(pool);
  const n = cfg.count ? Math.min(cfg.count, pool.length) : pool.length;
  return pool.slice(0, n);
}

function startQuiz(cfg) {
  const list = pickQuestions(cfg);
  if (!list.length) {
    alert("沒有可用題目");
    return;
  }
  quizState = {
    title: cfg.title || "練習",
    list,
    i: 0,
    answers: {}, // id -> selected letters[]
    revealed: {},
    finished: false,
  };
  renderQuiz();
}

function explHtml(q) {
  const right = q.answer
    .map((a) => `<li><span class="chip g">${a}</span><span>${esc(q.options[a])}</span></li>`)
    .join("");
  const why = (q.why || []).map((w) => `<li><span>•</span><span>${esc(w)}</span></li>`).join("");
  if (!right) return `<p>${esc(q.explanation || "")}</p>`;
  return `<div class="ex"><h4>✅ 正確答案</h4><ul>${right}</ul>${
    why ? `<h4>💡 為什麼對</h4><ul>${why}</ul>` : ""
  }${q.explanation ? `<h4>解析</h4><p>${esc(q.explanation)}</p>` : ""}</div>`;
}

function renderQuiz() {
  const S = quizState;
  if (!S) return quizHome();
  if (S.finished) return renderQuizResult();

  const q = S.list[S.i];
  const sel = S.answers[q.id] || [];
  const revealed = !!S.revealed[q.id];
  const letters = Object.keys(q.options);
  const pct = Math.round((100 * S.i) / S.list.length);

  app.innerHTML = `
    <section class="card">
      <div class="row">
        <span class="tag">${esc(S.title)}</span>
        <span class="tag">${esc(q.module)}</span>
        ${q.multi ? '<span class="tag warn">多選</span>' : ""}
        <span class="spacer"></span>
        <span class="muted small">${S.i + 1} / ${S.list.length}</span>
      </div>
      <div class="bar" style="margin:10px 0 16px"><i class="y" style="width:${pct}%"></i></div>
      <div class="qtext">${esc(q.q)}</div>
      <div id="opts"></div>
      <div id="explWrap"></div>
      <div class="actions row">
        <button id="prev" ${S.i === 0 ? "disabled" : ""}>上一題</button>
        <button id="check" class="primary" ${revealed || !sel.length ? "disabled" : ""}>提交／看解析</button>
        <button id="next">${S.i === S.list.length - 1 ? "看結果" : "下一題"}</button>
        <span class="spacer"></span>
        <button id="quit" class="danger">結束</button>
      </div>
      <p class="muted small" style="margin-top:8px">鍵盤：A–D 選項 · Enter 提交 · ←/→ 換題</p>
    </section>
  `;

  const optsEl = document.getElementById("opts");
  letters.forEach((L) => {
    const b = document.createElement("button");
    b.className = "opt";
    b.type = "button";
    b.innerHTML = `<span class="l">${L}</span><span>${esc(q.options[L])}</span>`;
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
      ok ? "✅ 答對了" : "❌ 答錯了"
    }${explHtml(q)}</div>`;
  }

  document.getElementById("prev").onclick = () => {
    if (S.i > 0) {
      S.i--;
      renderQuiz();
    }
  };
  document.getElementById("next").onclick = () => {
    if (S.i === S.list.length - 1) {
      finishQuiz();
    } else {
      S.i++;
      renderQuiz();
    }
  };
  document.getElementById("check").onclick = () => submitCurrent();
  document.getElementById("quit").onclick = () => {
    if (confirm("結束本次練習並看結果？")) finishQuiz();
  };

  window.onkeydown = (e) => {
    if (!quizState || quizState.finished) return;
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
  // auto-record any unanswered revealed? only record if revealed or attempt submit
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
        <td class="small muted">${done ? esc((sel || []).join("")) + " / " + esc(q.answer.join("")) : "未作答"}</td>
      </tr>`;
    })
    .join("");

  app.innerHTML = `
    <section class="card">
      <div class="row" style="gap:20px;align-items:center">
        <div class="ring" style="--p:${p};--c:${color}"><div>${p}%</div></div>
        <div>
          <h2>本次結果</h2>
          <p class="muted">${esc(S.title)}</p>
          <p>答對 <b>${correct}</b> / 已作答 ${answered.length}（共 ${S.list.length} 題）</p>
        </div>
      </div>
      <div class="row" style="margin-top:16px">
        <button class="primary" id="again">再來一輪同設定</button>
        <button id="toWrong">去錯題重溫</button>
        <button id="toHome">回首頁</button>
      </div>
    </section>
    <section class="card">
      <h3>明細</h3>
      <table>
        <thead><tr><th>#</th><th>主題</th><th>結果</th><th>你的／正解</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
  `;
  document.getElementById("toHome").onclick = () => go("home");
  document.getElementById("toWrong").onclick = () => {
    const wrong = store.get(KEYS.wrong, []);
    if (!wrong.length) {
      alert("目前沒有錯題");
      return;
    }
    startQuiz({ mode: "wrong", title: `錯題重溫 · ${wrong.length} 題` });
  };
  document.getElementById("again").onclick = () => {
    // restart with same list size/mode from title heuristic — re-pick
    const title = S.title;
    if (title.includes("錯題")) {
      startQuiz({ mode: "wrong", title });
    } else if (title.includes("弱項")) {
      startQuiz({
        mode: "topic",
        modules: ["IAM", "Networking", "Database", "Compute"],
        count: 10,
        title,
      });
    } else if (title.includes("快速")) {
      startQuiz({ mode: "quick", count: 20, title });
    } else {
      // try extract module
      const mod = modules.find((m) => title.startsWith(m));
      const countMatch = title.match(/(\d+)\s*題/);
      const count = countMatch ? Number(countMatch[1]) : 15;
      startQuiz({
        mode: "topic",
        modules: mod ? [mod] : modules,
        count,
        title,
      });
    }
  };
}

/* ---------- flashcards ---------- */
function cardsHome() {
  const weak = CARDS.filter((c) => (c.tags || []).includes("weak")).length;
  app.innerHTML = `
    <section class="card">
      <h2>知識卡</h2>
      <p class="muted">共 ${CARDS.length} 張（含 ${weak} 張針對你弱點的精選卡）。點卡片翻面。</p>
      <div class="modes" style="margin-top:14px">
        <button class="mode feat" id="cAll"><span class="ic">🎴</span><b>全部抽卡</b><span class="muted small">隨機順序</span></button>
        <button class="mode" id="cWeak"><span class="ic">🎯</span><b>弱項精選</b><span class="muted small">IAM / LB / Aurora / IGW / SnapStart</span></button>
        <button class="mode" id="cAnki"><span class="ic">📚</span><b>Anki 匯入卡</b><span class="muted small">來自 MEMORY-CARDS</span></button>
      </div>
    </section>
  `;
  document.getElementById("cAll").onclick = () => startCards({ filter: "all" });
  document.getElementById("cWeak").onclick = () => startCards({ filter: "weak" });
  document.getElementById("cAnki").onclick = () => startCards({ filter: "anki" });
}

function startCards(cfg) {
  let list = CARDS.slice();
  if (cfg.filter === "weak") list = CARDS.filter((c) => (c.tags || []).includes("weak") || c.source === "curated");
  else if (cfg.filter === "anki") list = CARDS.filter((c) => c.source === "anki");
  list = shuffle(list);
  if (!list.length) {
    alert("沒有卡片");
    return;
  }
  cardState = { list, i: 0, flipped: false, known: 0, review: 0 };
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
        ${(c.tags || []).map((t) => `<span class="tag ${t === "weak" ? "weak" : ""}">${esc(t)}</span>`).join("")}
        <span class="spacer"></span>
        <span class="muted small">記得 ${S.known} · 再看 ${S.review}</span>
      </div>
      <div class="flash-stage">
        <div class="flash-card ${S.flipped ? "flipped" : ""}" id="flash" role="button" tabindex="0" aria-label="翻轉知識卡">
          <div class="flash-face front">
            <div class="label">正面 · Front</div>
            <div class="body">${esc(c.front)}</div>
            <p class="muted small" style="margin-top:18px">點擊翻面</p>
          </div>
          <div class="flash-face back">
            <div class="label">背面 · Back</div>
            <div class="body">${esc(c.back)}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <button id="prevC" ${S.i === 0 ? "disabled" : ""}>上一張</button>
        <button id="flip">翻面</button>
        <button class="primary" id="know">記得了</button>
        <button id="againC">還要再看</button>
        <span class="spacer"></span>
        <button id="quitC">結束</button>
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
    // put current at end
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
          <h2>本輪知識卡結束</h2>
          <p>記得 ${S.known} · 標記再看 ${S.review}</p>
          <div class="row" style="margin-top:14px">
            <button class="primary" id="more">再抽一輪</button>
            <button id="back">回知識卡首頁</button>
          </div>
        </section>`;
      document.getElementById("more").onclick = () => startCards({ filter: "all" });
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
  const { c, t, p } = overallAccuracy();
  const est = passEstimate();
  const wrong = store.get(KEYS.wrong, []);
  const hist = store.get(KEYS.history, []);

  const rows = modules
    .map((m) => {
      const s = stats[m] || { correct: 0, total: 0 };
      const pct = s.total ? Math.round((100 * s.correct) / s.total) : null;
      const bar = pct == null ? 0 : pct;
      const weak = pct != null && s.total >= 3 && pct < 55;
      return `<tr>
        <td>${esc(m)} ${weak ? '<span class="tag bad">弱</span>' : ""}</td>
        <td>${s.correct}/${s.total}</td>
        <td style="min-width:120px"><div class="bar"><i class="${pct == null ? "y" : clsPct(pct)}" style="width:${bar}%"></i></div></td>
        <td>${pct == null ? "—" : pct + "%"}</td>
      </tr>`;
    })
    .join("");

  const histRows = hist
    .slice(0, 10)
    .map((h) => {
      const pp = h.answered ? Math.round((100 * h.correct) / h.answered) : 0;
      const when = new Date(h.at).toLocaleString("zh-HK", { hour12: false });
      return `<tr><td class="small">${esc(when)}</td><td>${esc(h.title)}</td><td>${h.correct}/${h.answered}</td><td class="${pp >= 72 ? "pass" : "fail"}">${pp}%</td></tr>`;
    })
    .join("");

  app.innerHTML = `
    <section class="card">
      <h2>進度儀表板</h2>
      <div class="stats" style="margin-top:12px">
        <div class="stat"><span class="muted small">總答題</span><b>${t}</b></div>
        <div class="stat"><span class="muted small">答對</span><b>${c}</b></div>
        <div class="stat"><span class="muted small">正確率</span><b>${t ? p + "%" : "—"}</b></div>
        <div class="stat"><span class="muted small">錯題</span><b>${wrong.length}</b></div>
      </div>
      <div class="hint">
        <b>通過粗估：</b>${esc(est.label)} — ${esc(est.detail)}
        <div class="muted small" style="margin-top:6px">非正式預測；官方通過線約 720/1000。建議各主題正確率穩定 ≥72% 再預約考試。</div>
      </div>
    </section>
    <section class="card">
      <h3>各主題正確率</h3>
      <table>
        <thead><tr><th>主題</th><th>對/總</th><th></th><th>%</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
    <section class="card">
      <h3>最近練習</h3>
      ${
        histRows
          ? `<table><thead><tr><th>時間</th><th>模式</th><th>對/答</th><th>%</th></tr></thead><tbody>${histRows}</tbody></table>`
          : '<p class="muted">尚無紀錄</p>'
      }
    </section>
    <section class="card">
      <h3>備份</h3>
      <p class="muted small">進度存在本機 localStorage。換裝置前請匯出 JSON。</p>
      <div class="row" style="margin-top:10px">
        <button class="primary" id="exp">匯出備份</button>
        <button id="imp">匯入備份</button>
        <button class="danger" id="reset">清除所有進度</button>
        <input type="file" id="impFile" accept="application/json,.json" class="hidden">
      </div>
    </section>
  `;

  document.getElementById("exp").onclick = () => {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      stats: store.get(KEYS.stats, {}),
      wrong: store.get(KEYS.wrong, []),
      history: store.get(KEYS.history, []),
      theme: store.get(KEYS.theme, "light"),
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
      if (data.history) store.set(KEYS.history, data.history);
      if (data.theme) {
        store.set(KEYS.theme, data.theme);
        applyTheme(data.theme);
      }
      alert("匯入成功");
      progressView();
    } catch {
      alert("匯入失敗：檔案格式不正確");
    }
  };
  document.getElementById("reset").onclick = () => {
    if (!confirm("確定清除所有本地進度？此操作無法復原。")) return;
    store.del(KEYS.stats);
    store.del(KEYS.wrong);
    store.del(KEYS.history);
    progressView();
  };
}

/* boot */
go("home");
