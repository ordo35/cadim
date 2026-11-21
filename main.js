/* ==========================================================================
   WITCH'S ALCHEMY - MAIN ORCHESTRATION & AMBIENCE
   ========================================================================== */

function startWitchcraft() {
  // Initialize Subsystems
  if (window.witchAudio) window.witchAudio.init();
  if (window.candleSystem) window.candleSystem.init();
  if (window.alchemyEngine) window.alchemyEngine.init();

  // Grimoire Navigation
  setupGrimoire();

  // Ambient Particles on Canvas
  initAmbientParticles();

  // Audio Toggle Button
  setupAudioControl();

  // First User Interaction Audio Unlock
  const unlockAudio = () => {
    if (window.witchAudio) window.witchAudio.init();
    document.removeEventListener("pointerdown", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };
  document.addEventListener("pointerdown", unlockAudio);
  document.addEventListener("keydown", unlockAudio);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startWitchcraft);
} else {
  startWitchcraft();
}

/* --------------------------------------------------------------------------
   GRIMOIRE (SPELLBOOK) NAVIGATION
   -------------------------------------------------------------------------- */
let currentGrimoirePageIndex = 0;

function setupGrimoire() {
  const prevBtn = document.getElementById("btn-grimoire-prev");
  const nextBtn = document.getElementById("btn-grimoire-next");
  const pageIndicator = document.getElementById("grimoire-page-indicator");

  function renderGrimoirePage(index) {
    const pageData = GRIMOIRE_PAGES[index];
    if (!pageData) return;

    const leftPage = document.getElementById("grimoire-page-left");
    const rightPage = document.getElementById("grimoire-page-right");

    if (leftPage && rightPage) {
      // 3D Flip Animation Trigger
      leftPage.classList.add("grimoire-page-flip");
      rightPage.classList.add("grimoire-page-flip");

      setTimeout(() => {
        leftPage.innerHTML = `
          <div class="grimoire-page-content">
            <h3>${pageData.leftTitle}</h3>
            <div class="grimoire-illustration">${pageData.leftIllustration}</div>
            <div class="grimoire-gibberish">${pageData.leftText}</div>
          </div>
        `;

        rightPage.innerHTML = `
          <div class="grimoire-page-content">
            <h3>${pageData.rightTitle}</h3>
            <div class="grimoire-illustration">${pageData.rightIllustration}</div>
            <div class="grimoire-gibberish">${pageData.rightText}</div>
          </div>
        `;

        leftPage.classList.remove("grimoire-page-flip");
        rightPage.classList.remove("grimoire-page-flip");
      }, 250);
    }

    if (pageIndicator) {
      pageIndicator.textContent = `Sayfa ${pageData.pageNum}`;
    }

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === GRIMOIRE_PAGES.length - 1;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentGrimoirePageIndex > 0) {
        currentGrimoirePageIndex--;
        renderGrimoirePage(currentGrimoirePageIndex);
        if (window.witchAudio) window.witchAudio.playPageFlip();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentGrimoirePageIndex < GRIMOIRE_PAGES.length - 1) {
        currentGrimoirePageIndex++;
        renderGrimoirePage(currentGrimoirePageIndex);
        if (window.witchAudio) window.witchAudio.playPageFlip();
      }
    });
  }

  // Initial render
  renderGrimoirePage(0);
}

/* --------------------------------------------------------------------------
   AUDIO TOGGLE
   -------------------------------------------------------------------------- */
function setupAudioControl() {
  const soundBtn = document.getElementById("btn-toggle-sound");
  if (!soundBtn) return;

  soundBtn.addEventListener("click", () => {
    const isMuted = window.witchAudio.toggleMute();
    soundBtn.innerHTML = isMuted ? "🔇" : "🔊";
    soundBtn.title = isMuted ? "Sesi Aç" : "Sesi Kapat";
  });
}

/* --------------------------------------------------------------------------
   AMBIENT FLOATING PARTICLES (EMBERS & DUST MOTES)
   -------------------------------------------------------------------------- */
function initAmbientParticles() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2, // Drift upward
      opacity: Math.random() * 0.6 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      isEmber: Math.random() > 0.65 // Some are warm candle embers, others subtle dust motes
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const candleFactor = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--candle-light-factor") || "0.2"
    );

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.03;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse)) * (0.5 + candleFactor * 0.8);

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      if (p.isEmber) {
        ctx.fillStyle = `rgba(255, 170, 70, ${alpha})`;
        ctx.shadowBlur = 6 * candleFactor;
        ctx.shadowColor = "rgba(255, 120, 30, 0.8)";
      } else {
        ctx.fillStyle = `rgba(200, 180, 240, ${alpha * 0.7})`;
        ctx.shadowBlur = 3;
        ctx.shadowColor = "rgba(168, 85, 247, 0.4)";
      }

      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
