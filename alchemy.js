/* ==========================================================================
   WITCH'S ALCHEMY - SLOTS, INGREDIENTS & SPELL CASTING LOGIC
   ========================================================================== */

class AlchemyEngine {
  constructor() {
    // 5 ritual slots: 0: Top, 1: Right, 2: Bottom, 3: Left, 4: Center
    this.slots = [null, null, null, null, null];
    this.selectedIngredient = null; // For click-to-place on mobile/desktop
    this.modalEl = null;
    this.modalContainer = null;
    this.statusEl = null;
  }

  init() {
    this.modalEl = document.getElementById("spell-result-modal");
    this.modalContainer = document.getElementById("spell-modal-content-area");
    this.statusEl = document.getElementById("altar-status-text");

    this.renderShelfIngredients();
    this.setupSlotsListeners();
    this.setupClearButton();
    this.setupModalClose();
  }

  // --- Render 12 Items across 2 Shelves ---
  renderShelfIngredients() {
    const shelf1 = document.getElementById("shelf-row-1");
    const shelf2 = document.getElementById("shelf-row-2");
    if (!shelf1 || !shelf2) return;

    shelf1.innerHTML = "";
    shelf2.innerHTML = "";

    INGREDIENTS.forEach((item, index) => {
      const targetShelf = index < 6 ? shelf1 : shelf2;

      const slot = document.createElement("div");
      slot.className = "ingredient-slot-shelf";
      slot.id = `shelf-item-${item.id}`;
      slot.setAttribute("data-item-id", item.id);
      slot.setAttribute("data-tooltip", item.desc);
      slot.setAttribute("draggable", "true");

      slot.innerHTML = `
        <div class="ingredient-icon-wrapper">
          ${item.svg}
        </div>
        <div class="ingredient-label">${item.name}</div>
      `;

      // HTML5 Drag Events
      slot.addEventListener("dragstart", (e) => this.handleDragStart(item, e));
      slot.addEventListener("dragend", (e) => this.handleDragEnd(e));

      // Click / Touch to select for placing
      slot.addEventListener("click", () => this.handleShelfItemClick(item));

      targetShelf.appendChild(slot);
    });
  }

  // --- Drag & Drop Handlers ---
  handleDragStart(item, e) {
    if (this.isItemPlaced(item.id)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", item.id);
    e.dataTransfer.effectAllowed = "move";
    if (window.witchAudio) {
      window.witchAudio.playItemPick();
    }
  }

  handleDragEnd(e) {
    document.querySelectorAll(".ritual-slot").forEach(slot => {
      slot.classList.remove("drag-over");
    });
  }

  // --- Click to Select & Place Handlers (Mobile Friendly) ---
  handleShelfItemClick(item) {
    if (this.isItemPlaced(item.id)) return;

    // Toggle selection
    if (this.selectedIngredient && this.selectedIngredient.id === item.id) {
      this.deselectIngredient();
      return;
    }

    this.selectIngredient(item);
  }

  selectIngredient(item) {
    this.deselectIngredient();
    this.selectedIngredient = item;

    const el = document.getElementById(`shelf-item-${item.id}`);
    if (el) {
      el.style.borderColor = "var(--brass-bright)";
      el.style.boxShadow = "0 0 15px var(--brass-bright)";
    }

    if (window.witchAudio) {
      window.witchAudio.playItemPick();
    }

    this.updateStatus(`${item.name} seçildi. Yerleştirmek için bir yıldıza dokun.`);
  }

  deselectIngredient() {
    if (this.selectedIngredient) {
      const el = document.getElementById(`shelf-item-${this.selectedIngredient.id}`);
      if (el) {
        el.style.borderColor = "";
        el.style.boxShadow = "";
      }
    }
    this.selectedIngredient = null;
    this.updateStatus("");
  }

  // --- Ritual Slots Setup ---
  setupSlotsListeners() {
    const slotElements = document.querySelectorAll(".ritual-slot");
    slotElements.forEach(slotEl => {
      const index = parseInt(slotEl.getAttribute("data-slot-index"), 10);

      // Drag over & leave
      slotEl.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        slotEl.classList.add("drag-over");
      });

      slotEl.addEventListener("dragleave", () => {
        slotEl.classList.remove("drag-over");
      });

      // Drop
      slotEl.addEventListener("drop", (e) => {
        e.preventDefault();
        slotEl.classList.remove("drag-over");
        const itemId = e.dataTransfer.getData("text/plain");
        const item = INGREDIENTS.find(i => i.id === itemId);
        if (item) {
          this.placeItemInSlot(item, index);
        }
      });

      // Click slot (either place selected item, or remove placed item)
      slotEl.addEventListener("click", () => {
        if (this.selectedIngredient) {
          this.placeItemInSlot(this.selectedIngredient, index);
          this.deselectIngredient();
        } else if (this.slots[index]) {
          // Remove item from slot
          this.removeItemFromSlot(index);
        }
      });
    });
  }

  placeItemInSlot(item, slotIndex) {
    // If this item is already on another slot, remove it from there first
    const existingIndex = this.slots.findIndex(s => s && s.id === item.id);
    if (existingIndex !== -1) {
      this.removeItemFromSlot(existingIndex);
    }

    // If target slot already had an item, it gets replaced
    if (this.slots[slotIndex]) {
      this.removeItemFromSlot(slotIndex);
    }

    // Place new item
    this.slots[slotIndex] = item;
    this.renderSlot(slotIndex);

    // Update shelf item appearance
    const shelfItem = document.getElementById(`shelf-item-${item.id}`);
    if (shelfItem) {
      shelfItem.classList.add("is-placed");
      shelfItem.setAttribute("draggable", "false");
    }

    if (window.witchAudio) {
      window.witchAudio.playItemPlace();
    }

    this.checkSpells();
  }

  removeItemFromSlot(slotIndex) {
    const item = this.slots[slotIndex];
    if (!item) return;

    this.slots[slotIndex] = null;
    this.renderSlot(slotIndex);

    // Re-enable shelf item
    const shelfItem = document.getElementById(`shelf-item-${item.id}`);
    if (shelfItem) {
      shelfItem.classList.remove("is-placed");
      shelfItem.setAttribute("draggable", "true");
    }

    if (window.witchAudio) {
      window.witchAudio.playItemPick();
    }

    this.updateStatus(`${item.name} rafa geri döndü.`);
  }

  renderSlot(slotIndex) {
    const slotEl = document.querySelector(`.ritual-slot[data-slot-index="${slotIndex}"]`);
    if (!slotEl) return;

    const item = this.slots[slotIndex];
    if (item) {
      slotEl.classList.add("is-filled");
      slotEl.innerHTML = `
        <div class="placed-item" title="${item.name} (Kaldırmak için tıkla)">
          <div class="placed-item-icon">${item.svg}</div>
          <div class="placed-item-remove-hint">✕</div>
        </div>
      `;
    } else {
      slotEl.classList.remove("is-filled");
      // Rune placeholders: 0: ᛟ, 1: ᚱ, 2: ᚲ, 3: ᚷ, 4: ✦
      const runes = ["ᛟ", "ᚱ", "ᚲ", "ᚷ", "✦"];
      slotEl.innerHTML = `<span class="slot-placeholder-rune">${runes[slotIndex]}</span>`;
    }
  }

  isItemPlaced(itemId) {
    return this.slots.some(s => s && s.id === itemId);
  }

  setupClearButton() {
    const clearBtn = document.getElementById("btn-clear-altar");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => this.clearAltar());
    }
  }

  clearAltar() {
    let hasItems = false;
    for (let i = 0; i < 5; i++) {
      if (this.slots[i]) {
        hasItems = true;
        this.removeItemFromSlot(i);
      }
    }
    this.deselectIngredient();
    if (hasItems && window.witchAudio) {
      window.witchAudio.playClear();
    }
    this.updateStatus("Sunak temizlendi. Yeni bir büyü örmeye hazırsın.");
  }

  updateStatus(msg) {
    if (this.statusEl) {
      this.statusEl.textContent = msg;
    }
  }

  // --- Spell Matching Engine ---
  checkSpells() {
    // Gather all currently placed item names (non-null)
    const placedItems = this.slots.filter(s => s !== null).map(s => s.name);
    const placedCount = placedItems.length;

    // Match against each defined spell
    for (const spell of SPELLS) {
      // Must match exact count (e.g., 4 items must have exactly 4 items placed, 5th slot empty!)
      if (placedCount !== spell.ingredients.length) {
        continue;
      }

      // Check if every required ingredient is present
      const allMatch = spell.ingredients.every(name => placedItems.includes(name));
      if (allMatch) {
        // Trigger spell outcome!
        setTimeout(() => this.triggerSpellOutcome(spell), 350);
        return;
      }
    }
  }

  triggerSpellOutcome(spell) {
    // Altar channeling visual
    const stoneRing = document.getElementById("altar-stone-ring");
    if (stoneRing) {
      stoneRing.classList.add("is-channeling");
    }

    if (window.witchAudio) {
      window.witchAudio.playSpellSuccess();
    }

    // Render corresponding modal
    this.renderModalContent(spell);
    this.openModal();
  }

  renderModalContent(spell) {
    if (!this.modalContainer) return;
    this.modalContainer.innerHTML = "";

    if (spell.outcomeType === "parchment") {
      // 1. Aşık Etme Büyüsü - Ancient glowing parchment
      this.modalContainer.innerHTML = `
        <div class="parchment-scroll-container">
          <div class="parchment-sigil-top">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#7b2c1d" stroke-width="2.5"/>
              <path d="M50 20 L50 80 M20 50 L80 50" stroke="#7b2c1d" stroke-width="1.5"/>
              <circle cx="50" cy="50" r="14" fill="none" stroke="#7b2c1d" stroke-width="2"/>
              <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#7b2c1d" stroke-width="1.8"/>
            </svg>
          </div>
          <h2 class="parchment-spell-title">${spell.title}</h2>
          <div class="parchment-exact-text">
            "${spell.exactText}"
          </div>
          <div class="parchment-footer-note">${spell.footer}</div>
        </div>
      `;
    } else if (spell.outcomeType === "side-eye") {
      // 2. Yaren Büyüsü - Expressive side-eye animation
      this.modalContainer.innerHTML = `
        <div class="side-eye-stage animate-side-eye">
          <h2 class="side-eye-title">${spell.title}</h2>
          <div class="side-eye-face">
            <div class="eyebrow left"></div>
            <div class="eyebrow right"></div>
            <div class="eye-socket left">
              <div class="eyeball-iris">
                <div class="eyeball-pupil"></div>
                <div class="eyeball-glint"></div>
              </div>
            </div>
            <div class="eye-socket right">
              <div class="eyeball-iris">
                <div class="eyeball-pupil"></div>
                <div class="eyeball-glint"></div>
              </div>
            </div>
          </div>
          <div class="side-eye-caption">${spell.caption}</div>
        </div>
      `;
      // Play side-eye sound
      if (window.witchAudio) {
        setTimeout(() => window.witchAudio.playSideEye(), 400);
      }
    } else if (spell.outcomeType === "soul-heart") {
      // 3. Ruh Görme Büyüsü - Note over glowing heart
      this.modalContainer.innerHTML = `
        <div class="soul-vision-stage">
          <div class="soul-heart-bg">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <path d="M50 30 C30 5, 0 35, 50 88 C100 35, 70 5, 50 30 Z" 
                    fill="url(#heartGlowGrad)" stroke="#f43f5e" stroke-width="2.5"/>
              <defs>
                <radialGradient id="heartGlowGrad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stop-color="#fb7185"/>
                  <stop offset="60%" stop-color="#e11d48"/>
                  <stop offset="100%" stop-color="#881337"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          <div class="soul-note-card">
            <div class="soul-exact-text">
              "${spell.exactText}"
            </div>
          </div>
        </div>
      `;
    } else if (spell.outcomeType === "longing-envelope") {
      // 4. Özlem Görme Büyüsü - Open envelope over heart
      this.modalContainer.innerHTML = `
        <div class="longing-vision-stage">
          <div class="longing-heart-bg">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <path d="M50 30 C30 5, 0 35, 50 88 C100 35, 70 5, 50 30 Z" 
                    fill="url(#longingHeartGrad)" stroke="#c084fc" stroke-width="2"/>
              <defs>
                <radialGradient id="longingHeartGrad" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stop-color="#d8b4fe"/>
                  <stop offset="60%" stop-color="#9333ea"/>
                  <stop offset="100%" stop-color="#581c87"/>
                </radialGradient>
              </defs>
            </svg>
          </div>
          <div class="envelope-wrapper" id="spell-envelope">
            <div class="envelope-flap"></div>
            <div class="envelope-body"></div>
            <div class="envelope-letter">
              <div class="longing-exact-text">
                "${spell.exactText}"
              </div>
            </div>
          </div>
        </div>
      `;

      // Trigger envelope open animation after short delay
      setTimeout(() => {
        const env = document.getElementById("spell-envelope");
        if (env) env.classList.add("is-open");
      }, 300);
    }
  }

  openModal() {
    if (this.modalEl) {
      this.modalEl.classList.add("is-active");
    }
  }

  closeModal() {
    if (this.modalEl) {
      this.modalEl.classList.remove("is-active");
    }
    const stoneRing = document.getElementById("altar-stone-ring");
    if (stoneRing) {
      stoneRing.classList.remove("is-channeling");
    }
  }

  setupModalClose() {
    const closeBtn = document.getElementById("btn-close-spell-modal");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.modalEl) {
      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) {
          this.closeModal();
        }
      });
    }
  }
}

// Global alchemy singleton
window.alchemyEngine = new AlchemyEngine();
