// Flex Tracker — site JS (v1)
// Handles: sticky header, mobile menu, back-to-top, footer year, demo animation.

const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = new Date().getFullYear();

function onScroll() {
  const scrolled = window.scrollY > 8;
  if (header) header.classList.toggle("is-scrolled", scrolled);
  if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 400);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Demo: simulate "stack detected" alert and then fade it out */
const demoFeed = document.getElementById("demoFeed");
const demoBtn = document.getElementById("demoRun");
const demoAuto = document.getElementById("demoAuto");

let autoTimer = null;

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function addTyping() {
  if (!demoFeed) return null;
  const node = el(`
    <div class="typing" id="typingRow">
      <span class="muted" style="font-weight:900;">Flex Tracker</span>
      <span class="dots">
        <span class="dotty"></span><span class="dotty"></span><span class="dotty"></span>
      </span>
    </div>
  `);
  demoFeed.appendChild(node);
  demoFeed.scrollTop = demoFeed.scrollHeight;
  return node;
}

function addAlert() {
  if (!demoFeed) return null;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const node = el(`
    <div class="dmsg spawn-in" id="alertRow">
      <div class="avatar bot">FT</div>
      <div>
        <div class="dmsg-head">
          <span class="name bot">Flex Tracker</span>
          <span class="tag">ALERT</span>
          <span class="time">${time}</span>
        </div>
        <div class="dmsg-body">
          <strong>Stack detected:</strong> 3 roster players queued together in Ranked Flex.
          <div class="meta-line">Players: KnubGod • PlayerTwo • PlayerThree</div>
          <div class="meta-line">Match: searching… (auto-check running)</div>
        </div>
      </div>
    </div>
  `);

  demoFeed.appendChild(node);
  demoFeed.scrollTop = demoFeed.scrollHeight;
  return node;
}

async function runDemoOnce() {
  if (!demoFeed) return;

  // clear old
  demoFeed.innerHTML = "";

  // typing
  const typing = addTyping();
  await new Promise(r => setTimeout(r, 950));

  if (typing) typing.remove();

  // alert
  const alert = addAlert();
  await new Promise(r => setTimeout(r, 2300));

  // fade out (like "ephemeral" / cleanup)
  if (alert) {
    alert.classList.add("fading");
    await new Promise(r => setTimeout(r, 600));
    alert.remove();
  }

  // idle hint
  demoFeed.appendChild(el(`
    <div class="muted" style="font-weight:800; padding:10px 6px;">
      Demo complete. Run again to replay the alert animation.
    </div>
  `));
}

function setAuto(on) {
  if (!demoAuto) return;
  demoAuto.checked = on;
  if (autoTimer) clearInterval(autoTimer);
  autoTimer = null;
  if (on) {
    runDemoOnce();
    autoTimer = setInterval(runDemoOnce, 5200);
  }
}

if (demoBtn) demoBtn.addEventListener("click", runDemoOnce);
if (demoAuto) demoAuto.addEventListener("change", (e) => setAuto(e.target.checked));

// Release bar (v1.2.2)
(function(){
  const bar = document.getElementById("releaseBar");
  const dismiss = document.getElementById("releaseDismiss");
  if (!bar || !dismiss) return;

  const KEY = "flextracker_release_122_hidden";

  if (localStorage.getItem(KEY) === "1") return;

  setTimeout(() => {
    bar.classList.add("is-visible");
  }, 300);

  dismiss.addEventListener("click", () => {
    bar.classList.remove("is-visible");
    localStorage.setItem(KEY, "1");
  });
})();