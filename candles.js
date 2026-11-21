/* ==========================================================================
   WITCH'S ALCHEMY - CANDLES & MATCHSTICK SYSTEM
   Realistic candle lighting, match striking, and dynamic ambient lighting
   ========================================================================== */

class CandleSystem {
  constructor() {
    this.candles = [
      { id: 1, isLit: false, el: null },
      { id: 2, isLit: false, el: null },
      { id: 3, isLit: false, el: null }
    ];
    this.isMatchLit = false;
    this.isDraggingMatch = false;
    this.matchstickEl = null;
    this.matchboxEl = null;
    this.candlesContainer = null;
    this.currentLightLevel = 0.18;
  }

  init() {
    this.matchstickEl = document.getElementById("interactive-matchstick");
    this.matchboxEl = document.getElementById("interactive-matchbox");
    this.candlesContainer = document.getElementById("candles-cluster");

    // Cache candle elements
    this.candles.forEach(c => {
      c.el = document.querySelector(`.candle-unit[data-candle-id="${c.id}"]`);
      if (c.el) {
        c.el.addEventListener("click", (e) => this.handleCandleClick(c, e));
        c.el.addEventListener("touchend", (e) => this.handleCandleTouch(c, e));
      }
    });

    // Matchbox click/touch to strike match
    if (this.matchboxEl) {
      this.matchboxEl.addEventListener("click", () => this.strikeMatch());
      this.matchboxEl.addEventListener("touchend", (e) => {
        e.preventDefault();
        this.strikeMatch();
      });
    }

    // Matchstick drag & click handling
    if (this.matchstickEl) {
      this.matchstickEl.addEventListener("click", () => this.strikeMatch());
      this.setupMatchPointerEvents();
    }

    // Update ambient room lighting initially
    this.updateRoomAmbience();
  }

  setupMatchPointerEvents() {
    const match = this.matchstickEl;

    const onPointerDown = (e) => {
      if (!this.isMatchLit) {
        this.strikeMatch();
      }
      this.isDraggingMatch = true;
      match.setPointerCapture(e.pointerId);
      match.style.cursor = "grabbing";
    };

    const onPointerMove = (e) => {
      if (!this.isDraggingMatch || !this.isMatchLit) return;

      // Check if hovering over any unlit candle wick
      this.candles.forEach(c => {
        if (!c.isLit && c.el) {
          const rect = c.el.getBoundingClientRect();
          if (
            e.clientX >= rect.left - 20 &&
            e.clientX <= rect.right + 20 &&
            e.clientY >= rect.top - 40 &&
            e.clientY <= rect.top + 50
          ) {
            this.igniteCandle(c);
          }
        }
      });
    };

    const onPointerUp = (e) => {
      this.isDraggingMatch = false;
      try {
        match.releasePointerCapture(e.pointerId);
      } catch (err) {}
      match.style.cursor = "grab";
    };

    match.addEventListener("pointerdown", onPointerDown);
    match.addEventListener("pointermove", onPointerMove);
    match.addEventListener("pointerup", onPointerUp);
    match.addEventListener("pointercancel", onPointerUp);
  }

  strikeMatch() {
    if (this.isMatchLit) return;

    this.isMatchLit = true;
    this.matchstickEl.classList.add("is-lit");

    // Play procedural match strike friction audio
    if (window.witchAudio) {
      window.witchAudio.playMatchStrike();
      setTimeout(() => window.witchAudio.playFlameIgnite(), 120);
    }

    // Spark burst visual particles
    this.spawnMatchSparks();

    // Subtle instruction update
    const hint = document.getElementById("match-hint");
    if (hint) {
      hint.textContent = "Kibrit yandı! Mumlara dokunarak yakabilirsin.";
      hint.style.color = "var(--brass-bright)";
    }

    // Match automatically burns out after 15 seconds if not used
    clearTimeout(this.matchTimeout);
    this.matchTimeout = setTimeout(() => {
      if (this.isMatchLit) {
        this.snuffMatch();
      }
    }, 15000);
  }

  snuffMatch() {
    this.isMatchLit = false;
    if (this.matchstickEl) {
      this.matchstickEl.classList.remove("is-lit");
    }
    const hint = document.getElementById("match-hint");
    if (hint) {
      hint.textContent = "Kibriti yakmak için kutuya veya kibrite tıkla";
      hint.style.color = "var(--text-muted)";
    }
  }

  spawnMatchSparks() {
    const head = this.matchstickEl.querySelector(".matchstick-head");
    if (!head) return;

    for (let i = 0; i < 6; i++) {
      const spark = document.createElement("div");
      spark.className = "match-spark-particle";
      spark.style.left = `${Math.random() * 12 - 6}px`;
      spark.style.top = `${Math.random() * 12 - 6}px`;
      head.appendChild(spark);
      setTimeout(() => spark.remove(), 450);
    }
  }

  handleCandleClick(candle, e) {
    const now = Date.now();
    if (candle.lastToggled && now - candle.lastToggled < 350) {
      return;
    }
    candle.lastToggled = now;

    if (candle.isLit) {
      // Extinguish lit candle
      this.extinguishCandle(candle);
    } else {
      // If candle is unlit, ignite if match is lit, or strike match & ignite!
      if (!this.isMatchLit) {
        this.strikeMatch();
        setTimeout(() => this.igniteCandle(candle), 250);
      } else {
        this.igniteCandle(candle);
      }
    }
  }

  handleCandleTouch(candle, e) {
    e.preventDefault();
    this.handleCandleClick(candle, e);
  }

  igniteCandle(candle) {
    if (candle.isLit) return;

    candle.isLit = true;
    candle.el.classList.add("is-lit");

    if (window.witchAudio) {
      window.witchAudio.playFlameIgnite();
    }

    this.updateRoomAmbience();
  }

  extinguishCandle(candle) {
    if (!candle.isLit) return;

    candle.isLit = false;
    candle.el.classList.remove("is-lit");

    // Spawn smoke puff
    this.spawnSmoke(candle.el);

    if (window.witchAudio) {
      window.witchAudio.playExtinguish();
    }

    this.updateRoomAmbience();
  }

  spawnSmoke(candleEl) {
    const smokeContainer = candleEl.querySelector(".candle-smoke-puff");
    if (smokeContainer) {
      smokeContainer.classList.remove("smoke-puff-active");
      void smokeContainer.offsetWidth; // Force reflow
      smokeContainer.innerHTML = `
        <svg viewBox="0 0 30 60" width="100%" height="100%">
          <path d="M15 50 Q10 35 18 20 Q12 10 15 0" fill="none" stroke="rgba(200, 190, 180, 0.6)" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `;
      smokeContainer.classList.add("smoke-puff-active");
    }
  }

  updateRoomAmbience() {
    const litCount = this.candles.filter(c => c.isLit).length;
    // Ambient light values: 0 = 0.18, 1 = 0.45, 2 = 0.72, 3 = 1.0
    const lightFactors = [0.18, 0.45, 0.72, 1.0];
    this.currentLightLevel = lightFactors[litCount];

    document.documentElement.style.setProperty("--candle-light-factor", this.currentLightLevel);
    document.documentElement.style.setProperty("--candle-glow-radius", `${120 + litCount * 70}px`);

    // Subtle table glow enhancement
    const tableStage = document.getElementById("table-stage");
    if (tableStage) {
      const glowAlpha = (this.currentLightLevel * 0.4).toFixed(2);
      tableStage.style.boxShadow = `
        inset 0 0 80px rgba(0, 0, 0, 0.9),
        0 15px 35px rgba(0, 0, 0, 0.85),
        0 0 ${litCount * 25}px rgba(255, 150, 50, ${glowAlpha})
      `;
    }
  }

  // Quick action: Light all candles
  igniteAll() {
    this.candles.forEach(c => {
      if (!c.isLit) this.igniteCandle(c);
    });
  }
}

// Global candle system singleton
window.candleSystem = new CandleSystem();
