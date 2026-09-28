// ==============================
// CONFIGURATION — edit these
// ==============================
const birthdayPerson = "Apoorva";
const senderName = "Akash";

const photoCaptions = [
    "Little you ♡",
    "Wrapped in love ♡",
    "Your beautiful smile ♡",
    "Lost in thought ♡",
    "Effortlessly you ♡",
    "Always you ♡"
];

// ---- PHOTOS: file names inside the images/ folder (any name, any extension) ----
const photoFiles = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg", "photo5.jpg", "photo6.jpg"];
const finalPhoto = "photo3.jpg"; // shown on the last page
// Where each photo is cropped inside its square frame (top-to-bottom %): raise the 2nd number to show lower parts
const photoFocus = ["50% 30%", "50% 35%", "50% 30%", "50% 8%", "50% 35%", "50% 15%"];

// ---- LETTER: replace the text between the backticks ----
const letterContent = `Dear ${birthdayPerson},

On your special day, I just wanted to remind you
how special you are.

You bring so much kindness and positivity into
the lives of the people around you.

I hope this new chapter of your life brings you
happiness, beautiful memories and countless
reasons to smile.

Happy Birthday ❤️

With love,
${senderName}`;

// ---- QUIZ: edit questions; "correct" is the answer's position (0 = first) ----
const quizQuestions = [
    { question: "What's my favorite type of food?", answers: ["Italian", "Chinese", "Indian", "Mexican"], correct: 1 },
    { question: "Which season do I like the most?", answers: ["Spring", "Summer", "Monsoon", "Winter"], correct: 2 },
    { question: "How do I like to relax?", answers: ["Watching movies", "Listening to music", "Going for a walk", "Sleeping"], correct: 0 },
    { question: "Which drink would I pick?", answers: ["Coffee", "Tea", "Cold coffee", "Juice"], correct: 2 },
    { question: "Where would I love to travel?", answers: ["Mountains", "Beach", "Old cities", "Countryside"], correct: 0 }
];

// ==============================
// SETUP (names, top bar, nav, particles)
// ==============================
const pages = ["index", "birthday", "gallery", "quiz", "letter", "special"];
const page = document.body.dataset.page;
const idx = pages.indexOf(page);
const $ = s => document.querySelector(s);
const store = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } };

document.querySelectorAll(".birthday-name").forEach(e => e.textContent = birthdayPerson);
document.querySelectorAll(".sender-name").forEach(e => e.textContent = senderName);
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => { window.location.href = b.dataset.go; }));

const bar = document.createElement("header");
bar.className = "topbar";
bar.innerHTML = `<span class="tb-heart" aria-hidden="true">♡</span><div class="dots" role="img" aria-label="Page ${idx + 1} of 6">${pages.map((p, i) => `<i class="${i === idx ? "on" : ""}"></i>`).join("")}</div><button class="music" id="music" aria-label="Play or pause music" aria-pressed="false">🎵</button>`;
document.body.prepend(bar);

const fx = document.createElement("div");
fx.className = "fx";
fx.setAttribute("aria-hidden", "true");
document.body.append(fx);
const glyphs = ["♥", "✦", "✧", "♡", "✿", "•"];
function floater(strong) {
    const s = document.createElement("span");
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 10 + Math.random() * 16 + "px";
    s.style.animationDuration = (strong ? 3 + Math.random() * 3 : 8 + Math.random() * 8) + "s";
    if (strong) s.style.opacity = ".8";
    fx.append(s);
    setTimeout(() => s.remove(), 17000);
}
function burstHearts(n) { for (let i = 0; i < n; i++) setTimeout(() => floater(true), i * 90); }
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (let i = 0; i < 6; i++) setTimeout(() => floater(false), i * 400);
    setInterval(() => floater(false), 1000);
}

// ==============================
// MUSIC
// ==============================
const audio = new Audio("music/birthday.mp3");
audio.loop = true;
const mbtn = $("#music");
const savedTime = parseFloat(store("bdTime")) || 0;
audio.addEventListener("loadedmetadata", () => { if (savedTime && savedTime < audio.duration) audio.currentTime = savedTime; });
audio.addEventListener("error", () => {});
function syncMusic() { const on = !audio.paused; mbtn.textContent = on ? "🔊" : "🎵"; mbtn.setAttribute("aria-pressed", on); }
function playMusic() { const p = audio.play(); if (p && p.then) p.then(syncMusic).catch(syncMusic); }
mbtn.addEventListener("click", () => {
    if (audio.paused) { store("bdMusic", "on"); playMusic(); } else { audio.pause(); store("bdMusic", "off"); syncMusic(); }
});
function firstInteraction(e) {
    removeEventListener("pointerdown", firstInteraction);
    removeEventListener("keydown", firstInteraction);
    if (e.target.closest && e.target.closest("#music")) return;
    if (store("bdMusic") !== "off") { store("bdMusic", "on"); playMusic(); }
}
addEventListener("pointerdown", firstInteraction);
addEventListener("keydown", firstInteraction);
addEventListener("pagehide", () => store("bdTime", audio.currentTime));
if (store("bdMusic") === "on") playMusic();

// ==============================
// CONFETTI
// ==============================
function confetti(n = 70) {
    const cols = ["#f4a9b8", "#d9c9ea", "#c9a36a", "#ffffff", "#d9788f", "#8a2547"];
    for (let i = 0; i < n; i++) {
        const c = document.createElement("i");
        const r = Math.random();
        c.className = "confetto";
        c.style.cssText = `left:${Math.random() * 100}%;width:${6 + r * 6}px;height:${8 + r * 8}px;background:${cols[i % cols.length]};border-radius:${r > .5 ? "50%" : "2px"};--d:${3 + r * 3}s;--dl:${Math.random() * 1.2}s`;
        document.body.append(c);
        setTimeout(() => c.remove(), 7500);
    }
}

// ==============================
// PAGE 2: BIRTHDAY REVEAL
// ==============================
if (page === "birthday") {
    const intro = $("#intro"), reveal = $("#reveal");
    setTimeout(() => {
        intro.classList.add("gone");
        setTimeout(() => {
            intro.style.display = "none";
            reveal.classList.add("show");
            [...reveal.children].forEach((c, i) => c.style.animationDelay = i * .25 + "s");
            burstHearts(8);
        }, 700);
    }, 2400);
}

// ==============================
// PAGE 3: GALLERY
// ==============================
// ==============================
// LIGHTBOX
// ==============================
if (page === "gallery") {
    const grid = $("#grid");
    let cur = 0, opener = null;
    photoCaptions.forEach((cap, i) => {
        const b = document.createElement("button");
        b.className = "pol";
        b.setAttribute("aria-label", "Open photo: " + cap);
        b.innerHTML = `<div class="im"><img src="images/${photoFiles[i]}" alt="${cap}" loading="lazy"></div><span class="cap">${cap}</span>`;
        b.querySelector("img").style.objectPosition = photoFocus[i];
        b.querySelector("img").addEventListener("error", e => e.target.remove());
        b.addEventListener("click", () => open(i, b));
        grid.append(b);
    });
    const lb = document.createElement("div");
    lb.className = "lb";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Photo viewer");
    lb.innerHTML = `<button class="lb-x" aria-label="Close">✕</button><button class="lb-p" aria-label="Previous photo">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="lb-n" aria-label="Next photo">›</button>`;
    document.body.append(lb);
    const img = lb.querySelector("img"), cp = lb.querySelector("figcaption");
    function show(i) {
        cur = (i + photoCaptions.length) % photoCaptions.length;
        img.src = `images/${photoFiles[cur]}`;
        img.alt = photoCaptions[cur];
        cp.textContent = photoCaptions[cur];
    }
    function open(i, from) { opener = from; show(i); lb.classList.add("on"); lb.querySelector(".lb-x").focus(); }
    function close() { lb.classList.remove("on"); if (opener) opener.focus(); }
    lb.addEventListener("click", e => { if (e.target === lb) close(); });
    lb.querySelector(".lb-x").addEventListener("click", close);
    lb.querySelector(".lb-p").addEventListener("click", () => show(cur - 1));
    lb.querySelector(".lb-n").addEventListener("click", () => show(cur + 1));
    addEventListener("keydown", e => {
        if (!lb.classList.contains("on")) return;
        if (e.key === "Escape") close();
        if (e.key === "ArrowLeft") show(cur - 1);
        if (e.key === "ArrowRight") show(cur + 1);
    });
}

// ==============================
// QUIZ
// ==============================
if (page === "quiz") {
    const total = quizQuestions.length;
    let q = 0, score = 0, locked = false;
    function render() {
        const d = quizQuestions[q];
        locked = false;
        $("#qnum").textContent = `Question ${q + 1} of ${total}`;
        $("#bar").style.width = ((q + 1) / total * 100) + "%";
        $("#qtext").textContent = d.question;
        $("#fb").textContent = "";
        const box = $("#answers");
        box.innerHTML = "";
        d.answers.forEach((a, i) => {
            const b = document.createElement("button");
            b.className = "ans";
            b.innerHTML = `<span></span><b aria-hidden="true"></b>`;
            b.firstChild.textContent = a;
            b.addEventListener("click", () => pick(i, b));
            box.append(b);
        });
    }
    function pick(i, btn) {
        if (locked) return;
        locked = true;
        const d = quizQuestions[q], btns = [...document.querySelectorAll(".ans")];
        btns.forEach(b => b.disabled = true);
        if (i === d.correct) {
            score++;
            btn.classList.add("ok");
            btn.lastChild.textContent = "✓";
            $("#fb").textContent = "Correct! 🎉";
        } else {
            btn.classList.add("bad");
            btn.lastChild.textContent = "✕";
            btns[d.correct].classList.add("ok");
            btns[d.correct].lastChild.textContent = "✓";
            $("#fb").textContent = "Not quite — the answer is highlighted.";
        }
        setTimeout(() => { q++; q < total ? render() : finish(); }, 1100);
    }
    function finish() {
        const msg = score <= 1 ? "We definitely need to spend more time together 😂"
            : score <= 3 ? "Not bad! ❤️"
            : score === total ? "Okay... you know me way too well! ❤️"
            : "You really know me well! 🥹";
        $("#bar").style.width = "100%";
        $("#quiz").innerHTML = `<div class="result"><div class="emoji">🎉</div><h2>Quiz Complete!</h2><p>You got ${score} / ${total} correct!</p><p>${msg}</p><button class="btn" data-go="letter.html">Continue to Your Letter →</button></div>`;
        $("#quiz [data-go]").addEventListener("click", () => { window.location.href = "letter.html"; });
        confetti(40);
    }
    render();
}

// ==============================
// PAGE 5: LETTER
// ==============================
if (page === "letter") {
    $("#paper").textContent = letterContent;
    $("#openLetter").addEventListener("click", e => {
        e.target.style.display = "none";
        $("#env").classList.add("open");
        setTimeout(() => {
            $("#env").classList.add("gone");
            $("#lt").textContent = "For you ♡";
            $("#paper").classList.add("show");
            $("#nextBtn").style.display = "inline-block";
            burstHearts(10);
        }, 900);
    });
}

// ==============================
// PAGE 6: FINAL GIFT
// ==============================
if (page === "special") {
    const gift = $("#gift"), stage = $("#stage"), fin = $("#final"), flash = $("#flash");
    let done = false;
    function openGift() {
        if (done) return;
        done = true;
        $("#openGift").disabled = true;
        gift.classList.add("shake");
        setTimeout(() => { gift.classList.remove("shake"); gift.classList.add("open"); }, 750);
        setTimeout(() => { flash.classList.add("on"); document.body.classList.add("bright"); }, 1300);
        setTimeout(() => { flash.classList.remove("on"); confetti(80); }, 1800);
        setTimeout(() => burstHearts(24), 2300);
        setTimeout(() => {
            stage.classList.add("gone");
            setTimeout(() => { stage.style.display = "none"; fin.classList.add("show"); fin.scrollIntoView({ block: "center" }); }, 700);
        }, 3300);
    }
    gift.addEventListener("click", openGift);
    gift.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGift(); } });
    $("#openGift").addEventListener("click", openGift);
    fin.querySelector("img").src = "images/" + finalPhoto;
    fin.querySelector("img").style.objectPosition = photoFocus[Math.max(0, photoFiles.indexOf(finalPhoto))];
    fin.querySelector("img").addEventListener("error", e => e.target.remove());
}
