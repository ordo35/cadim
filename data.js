/* ==========================================================================
   WITCH'S ALCHEMY - INGREDIENTS, SPELLS & GRIMOIRE DATA
   ========================================================================== */

const INGREDIENTS = [
  {
    id: "emir-hair",
    name: "Emir'in saç teli",
    desc: "Zarif bir cam tüp içinde korunan, hafif dalgalı koyu saç teli.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id="vialGlassEmir" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#bbf2f6" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.4"/>
          </linearGradient>
          <filter id="glowEmir" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Glass Vial Body -->
        <rect x="22" y="16" width="20" height="40" rx="9" fill="url(#vialGlassEmir)" stroke="#93c5fd" stroke-width="1.2"/>
        <!-- Cork Stopper -->
        <path d="M25 16 L27 8 L37 8 L39 16 Z" fill="#92400e" stroke="#78350f" stroke-width="1"/>
        <line x1="26" y1="12" x2="38" y2="12" stroke="#b45309" stroke-width="0.8"/>
        <!-- Curved Strand of Hair (Emir's) -->
        <path d="M28 22 C34 26, 26 34, 34 38 C38 40, 30 48, 33 51" 
              fill="none" stroke="#261b17" stroke-width="2.2" stroke-linecap="round" filter="url(#glowEmir)"/>
        <path d="M29 23 C35 27, 27 35, 35 39" 
              fill="none" stroke="#60a5fa" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>
        <!-- Specular Highlight on Glass -->
        <path d="M25 20 L25 48" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: "ecem-hair",
    name: "Ecem'in saç teli",
    desc: "Altın kurdeleli zarif kristal şişede, ışıltılı kestane-altın tonlarında saç teli.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id="vialGlassEcem" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="#f43f5e" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#d97706" stop-opacity="0.35"/>
          </linearGradient>
          <filter id="sparkleEcem">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Hexagonal Ornate Crystal Phial -->
        <path d="M26 18 L38 18 L43 28 L43 46 L38 55 L26 55 L21 46 L21 28 Z" 
              fill="url(#vialGlassEcem)" stroke="#fde047" stroke-width="1.2"/>
        <!-- Gold Stopper & Ribbon -->
        <rect x="27" y="10" width="10" height="8" rx="2" fill="#d97706" stroke="#fbbf24" stroke-width="1"/>
        <path d="M25 18 Q32 22 39 18" fill="none" stroke="#e11d48" stroke-width="2"/>
        <!-- Ecem's Hair Strand (Radiant wavy chestnut-gold) -->
        <path d="M27 24 Q36 29 28 36 Q38 42 30 49" 
              fill="none" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>
        <path d="M28 25 Q37 30 29 37 Q39 43 31 50" 
              fill="none" stroke="#fbbf24" stroke-width="0.9" stroke-linecap="round" filter="url(#sparkleEcem)"/>
        <!-- Star Sparkles -->
        <circle cx="36" cy="27" r="1.5" fill="#fef08a"/>
        <circle cx="26" cy="42" r="1.2" fill="#fef08a"/>
      </svg>
    `
  },
  {
    id: "kahve-cekirdegi",
    name: "Kahve çekirdeği",
    desc: "Kavrulmuş, yoğun kokulu, derin alacalı kadim kahve çekirdeği.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <radialGradient id="coffeeGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#6b3a1e"/>
            <stop offset="60%" stop-color="#3d1b0d"/>
            <stop offset="100%" stop-color="#1e0a05"/>
          </radialGradient>
        </defs>
        <!-- Brass Ritual Saucer / Spoon -->
        <ellipse cx="32" cy="44" rx="24" ry="10" fill="#713f12" stroke="#ca8a04" stroke-width="1.2"/>
        <ellipse cx="32" cy="42" rx="20" ry="7" fill="#451a03"/>
        <!-- Steam swirls -->
        <path d="M26 24 Q24 16 28 10" fill="none" stroke="#d6c7b2" stroke-width="1" stroke-linecap="round" opacity="0.45"/>
        <path d="M34 22 Q37 15 33 8" fill="none" stroke="#d6c7b2" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
        <!-- Plump Coffee Bean -->
        <ellipse cx="32" cy="38" rx="14" ry="11" transform="rotate(-15 32 38)" fill="url(#coffeeGrad)" stroke="#1a0804" stroke-width="1.2"/>
        <!-- Classic center split crack of coffee bean -->
        <path d="M23 43 C28 40, 29 36, 40 33 C33 36, 32 39, 23 43" fill="#180702" stroke="#0f0402" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Specular shine on bean -->
        <ellipse cx="27" cy="34" rx="4" ry="2" transform="rotate(-25 27 34)" fill="#a2572b" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: "keciboynuzu",
    name: "Keçiboynuzu",
    desc: "Koyu kabuklu, kıvrımlı, doğal tatlı ve şifalı keçiboynuzu baklası.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id="carobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#451a03"/>
            <stop offset="50%" stop-color="#2d1206"/>
            <stop offset="100%" stop-color="#140602"/>
          </linearGradient>
        </defs>
        <!-- Pod Stem -->
        <path d="M14 16 Q18 14 20 19" fill="none" stroke="#78350f" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Curved Carob Pod Body -->
        <path d="M19 18 C28 14, 45 16, 51 28 C56 38, 48 50, 36 53 C26 55, 18 48, 16 42 C14 36, 22 28, 30 26 C40 24, 46 32, 42 42" 
              fill="none" stroke="url(#carobGrad)" stroke-width="9" stroke-linecap="round"/>
        <!-- Texture ridges / segments -->
        <circle cx="28" cy="18" r="2" fill="#713f12" opacity="0.6"/>
        <circle cx="44" cy="22" r="2.2" fill="#713f12" opacity="0.6"/>
        <circle cx="50" cy="34" r="2.2" fill="#713f12" opacity="0.6"/>
        <circle cx="40" cy="49" r="2" fill="#713f12" opacity="0.6"/>
        <!-- Pod highlight -->
        <path d="M22 17 C30 14, 43 17, 48 26" fill="none" stroke="#9a3412" stroke-width="1.2" opacity="0.5"/>
      </svg>
    `
  },
  {
    id: "peygamber-devesi",
    name: "Kuru peygamber devesi",
    desc: "Kurutulmuş, ritüel amaçlı saklanan peygamber devesi kadavrası.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <filter id="mantisGlow">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.8"/>
          </filter>
        </defs>
        <g filter="url(#mantisGlow)">
          <!-- Antennae -->
          <path d="M30 12 Q24 6 18 8" fill="none" stroke="#78716c" stroke-width="0.8"/>
          <path d="M34 12 Q40 6 46 8" fill="none" stroke="#78716c" stroke-width="0.8"/>
          <!-- Triangular Head -->
          <polygon points="32,18 27,12 37,12" fill="#713f12" stroke="#3f2e14" stroke-width="0.8"/>
          <circle cx="27" cy="12" r="2" fill="#1c1917"/>
          <circle cx="37" cy="12" r="2" fill="#1c1917"/>
          <!-- Slender Thorax / Neck -->
          <line x1="32" y1="18" x2="32" y2="30" stroke="#854d0e" stroke-width="3" stroke-linecap="round"/>
          <!-- Raptor Forearms (Praying pose) -->
          <path d="M32 20 L23 16 L20 25" fill="none" stroke="#a16207" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M32 20 L41 16 L44 25" fill="none" stroke="#a16207" stroke-width="1.8" stroke-linecap="round"/>
          <!-- Spines on forelegs -->
          <line x1="22" y1="18" x2="20" y2="19" stroke="#ca8a04" stroke-width="0.8"/>
          <line x1="42" y1="18" x2="44" y2="19" stroke="#ca8a04" stroke-width="0.8"/>
          <!-- Abdomen (segmented dried brown) -->
          <ellipse cx="32" cy="42" rx="5" ry="13" fill="#573a14" stroke="#291a08" stroke-width="1"/>
          <!-- Veined Dried Wings -->
          <path d="M32 30 Q24 40 28 50 Q32 45 32 30" fill="#a8a29e" opacity="0.45" stroke="#78716c" stroke-width="0.6"/>
          <path d="M32 30 Q40 40 36 50 Q32 45 32 30" fill="#a8a29e" opacity="0.45" stroke="#78716c" stroke-width="0.6"/>
          <!-- Hind legs -->
          <path d="M32 32 L18 36 L12 48" fill="none" stroke="#78350f" stroke-width="1.2"/>
          <path d="M32 32 L46 36 L52 48" fill="none" stroke="#78350f" stroke-width="1.2"/>
        </g>
      </svg>
    `
  },
  {
    id: "delik-tas",
    name: "Ortası delik taş",
    desc: "Cadı taşı (Hag stone) — ortasında deniz dalgalarının açtığı doğal bir delik bulunan kutsal koruma taşı.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <radialGradient id="stoneGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stop-color="#78716c"/>
            <stop offset="60%" stop-color="#44403c"/>
            <stop offset="100%" stop-color="#1c1917"/>
          </radialGradient>
          <radialGradient id="holeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#c084fc" stop-opacity="0.9"/>
            <stop offset="70%" stop-color="#6b21a8" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <!-- Weathered Stone Contour -->
        <path d="M16 32 C13 20, 24 12, 38 13 C48 14, 54 24, 51 36 C48 48, 38 54, 25 52 C15 50, 18 40, 16 32 Z" 
              fill="url(#stoneGrad)" stroke="#292524" stroke-width="1.5"/>
        <!-- Natural Hole in Center (Seeing through to cosmos) -->
        <ellipse cx="33" cy="33" rx="8" ry="7" fill="#09060f" stroke="#1c1917" stroke-width="1.5"/>
        <circle cx="33" cy="33" r="6" fill="url(#holeGlow)"/>
        <!-- Cosmic Star shining through the hole -->
        <polygon points="33,29 34,32 37,33 34,34 33,37 32,34 29,33 32,32" fill="#fdf4ff"/>
        <!-- Cracks & mineral flecks -->
        <path d="M38 18 L42 24 L46 22" fill="none" stroke="#292524" stroke-width="0.8"/>
        <path d="M22 45 L26 42" fill="none" stroke="#292524" stroke-width="0.8"/>
        <circle cx="22" cy="26" r="1" fill="#a8a29e" opacity="0.6"/>
        <circle cx="44" cy="40" r="1.2" fill="#a8a29e" opacity="0.6"/>
      </svg>
    `
  },
  {
    id: "kuru-yengec",
    name: "Kuru yengeç",
    desc: "Kurutulmuş minyatür deniz yengeci kabuğu, ritüel tuzlarıyla bezenmiş.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <radialGradient id="crabGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#b45309"/>
            <stop offset="60%" stop-color="#78350f"/>
            <stop offset="100%" stop-color="#451a03"/>
          </radialGradient>
        </defs>
        <!-- Walking Legs -->
        <path d="M22 35 L12 38 L8 46" fill="none" stroke="#92400e" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M20 40 L12 45 L10 54" fill="none" stroke="#92400e" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M24 45 L16 52 L14 58" fill="none" stroke="#92400e" stroke-width="1.5" stroke-linecap="round"/>
        
        <path d="M42 35 L52 38 L56 46" fill="none" stroke="#92400e" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M44 40 L52 45 L54 54" fill="none" stroke="#92400e" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M40 45 L48 52 L50 58" fill="none" stroke="#92400e" stroke-width="1.5" stroke-linecap="round"/>

        <!-- Large Front Claws (Pincers) -->
        <path d="M24 28 L14 20 L16 12 C12 14, 10 18, 12 24 C14 28, 20 28, 24 28 Z" fill="#9a3412" stroke="#451a03" stroke-width="1"/>
        <path d="M16 12 C17 8, 21 10, 20 16 Z" fill="#c2410c"/>
        
        <path d="M40 28 L50 20 L48 12 C52 14, 54 18, 52 24 C50 28, 44 28, 40 28 Z" fill="#9a3412" stroke="#451a03" stroke-width="1"/>
        <path d="M48 12 C47 8, 43 10, 44 16 Z" fill="#c2410c"/>

        <!-- Carapace Body -->
        <ellipse cx="32" cy="38" rx="14" ry="11" fill="url(#crabGrad)" stroke="#270d04" stroke-width="1.4"/>
        <!-- Shell Ridges -->
        <path d="M26 34 Q32 38 38 34" fill="none" stroke="#d97706" stroke-width="1"/>
        <circle cx="28" cy="30" r="1.5" fill="#180702"/>
        <circle cx="36" cy="30" r="1.5" fill="#180702"/>
      </svg>
    `
  },
  {
    id: "dugumlenmis-ip",
    name: "Düğümlenmiş ip",
    desc: "Üç kadim cadı düğümüyle mühürlenmiş keten ritüel kordonu.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <filter id="knotShadow">
            <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-color="#000" flood-opacity="0.8"/>
          </filter>
        </defs>
        <g filter="url(#knotShadow)">
          <!-- Main twisted twine strand -->
          <path d="M12 16 C18 20, 22 28, 26 28 C30 28, 30 22, 24 22 C18 22, 22 36, 32 36 C42 36, 42 26, 36 26 C30 26, 32 46, 44 46 C50 46, 52 38, 46 38 C40 38, 46 54, 54 52" 
                fill="none" stroke="#b45309" stroke-width="4.5" stroke-linecap="round"/>
          <!-- Inner fiber highlight -->
          <path d="M12 16 C18 20, 22 28, 26 28 C30 28, 30 22, 24 22 C18 22, 22 36, 32 36 C42 36, 42 26, 36 26 C30 26, 32 46, 44 46 C50 46, 52 38, 46 38 C40 38, 46 54, 54 52" 
                fill="none" stroke="#fde68a" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="3,3"/>
          <!-- Knots (Tied intersections) -->
          <ellipse cx="25" cy="25" rx="5" ry="4" fill="#78350f" stroke="#451a03" stroke-width="1"/>
          <ellipse cx="36" cy="33" rx="5" ry="4" fill="#78350f" stroke="#451a03" stroke-width="1"/>
          <ellipse cx="46" cy="42" rx="5" ry="4" fill="#78350f" stroke="#451a03" stroke-width="1"/>
          <!-- Frayed cord ends -->
          <line x1="12" y1="16" x2="8" y2="14" stroke="#d97706" stroke-width="1.5"/>
          <line x1="12" y1="16" x2="9" y2="19" stroke="#d97706" stroke-width="1.2"/>
          <line x1="54" y1="52" x2="58" y2="50" stroke="#d97706" stroke-width="1.5"/>
          <line x1="54" y1="52" x2="57" y2="56" stroke="#d97706" stroke-width="1.2"/>
        </g>
      </svg>
    `
  },
  {
    id: "toprak",
    name: "Toprak",
    desc: "Kutsal koruluktan toplanmış, nemli ve verimli ritüel toprağı çanağı.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#9a3412"/>
            <stop offset="50%" stop-color="#7c2d12"/>
            <stop offset="100%" stop-color="#431407"/>
          </linearGradient>
          <radialGradient id="soilDark" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stop-color="#3d2112"/>
            <stop offset="60%" stop-color="#1f1008"/>
            <stop offset="100%" stop-color="#0d0603"/>
          </radialGradient>
        </defs>
        <!-- Clay Terracotta Bowl -->
        <path d="M14 34 L18 52 C20 56, 44 56, 46 52 L50 34 Z" fill="url(#potGrad)" stroke="#431407" stroke-width="1.5"/>
        <ellipse cx="32" cy="34" rx="18" ry="7" fill="#54210d" stroke="#431407" stroke-width="1.2"/>
        <!-- Mound of Soil -->
        <ellipse cx="32" cy="32" rx="16" ry="6" fill="url(#soilDark)"/>
        <!-- Texture Specks -->
        <circle cx="26" cy="31" r="1.2" fill="#78350f"/>
        <circle cx="34" cy="33" r="1.5" fill="#78350f"/>
        <circle cx="39" cy="30" r="1" fill="#78350f"/>
        <circle cx="30" cy="29" r="1.2" fill="#57534e"/>
        <!-- Tiny Green Sprout (Life in the soil) -->
        <path d="M32 29 Q31 22 28 20 Q32 21 32 29" fill="#15803d" stroke="#166534" stroke-width="0.8"/>
        <path d="M32 26 Q35 21 38 22 Q34 24 32 29" fill="#22c55e" stroke="#166534" stroke-width="0.8"/>
      </svg>
    `
  },
  {
    id: "mango-avokado",
    name: "Mango sanılmış avokado",
    desc: "Üzerine el yazısıyla 'MANGO (?)' etiketi yapıştırılmış gizemli olgun avokado.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <radialGradient id="avoSkin" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stop-color="#365314"/>
            <stop offset="50%" stop-color="#1a2e05"/>
            <stop offset="100%" stop-color="#0a1302"/>
          </radialGradient>
        </defs>
        <!-- Pear-shaped Avocado Body -->
        <path d="M32 14 C25 14, 22 22, 20 30 C17 40, 18 52, 32 52 C46 52, 47 40, 44 30 C42 22, 39 14, 32 14 Z" 
              fill="url(#avoSkin)" stroke="#090f02" stroke-width="1.5"/>
        <!-- Stem on top -->
        <rect x="30" y="10" width="4" height="5" rx="1.5" fill="#713f12" stroke="#451a03" stroke-width="0.8"/>
        <!-- Bumpy Skin Texture dots -->
        <circle cx="26" cy="34" r="1" fill="#4d7c0f" opacity="0.6"/>
        <circle cx="36" cy="38" r="1.2" fill="#4d7c0f" opacity="0.6"/>
        <circle cx="30" cy="46" r="1" fill="#4d7c0f" opacity="0.6"/>
        <!-- Humorous Taped Parchment Label: "MANGO(?)" -->
        <rect x="18" y="32" width="28" height="13" rx="2" transform="rotate(-6 32 38)" fill="#fef08a" stroke="#ca8a04" stroke-width="0.8"/>
        <!-- Tape strips -->
        <rect x="15" y="34" width="6" height="8" rx="1" transform="rotate(-6 18 38)" fill="#ffffff" opacity="0.5"/>
        <rect x="43" y="32" width="6" height="8" rx="1" transform="rotate(-6 46 36)" fill="#ffffff" opacity="0.5"/>
        <!-- Handwritten text MANGO (?) -->
        <text x="32" y="41" transform="rotate(-6 32 38)" font-family="monospace" font-size="6.5" font-weight="900" fill="#7f1d1d" text-anchor="middle">MANGO?</text>
      </svg>
    `
  },
  {
    id: "kayisi-suyu",
    name: "Ilık kayısı suyu",
    desc: "Güneşin sıcaklığını taşıyan, hafif buharı tüten turuncu-kehribar kayısı iksiri.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id="potionFlask" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fed7aa" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#fb923c" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#ea580c" stop-opacity="0.4"/>
          </linearGradient>
          <linearGradient id="juiceNectar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#fdba74"/>
            <stop offset="60%" stop-color="#f97316"/>
            <stop offset="100%" stop-color="#c2410c"/>
          </linearGradient>
        </defs>
        <!-- Steam rising -->
        <path d="M28 14 Q26 8 30 4" fill="none" stroke="#fed7aa" stroke-width="1" stroke-linecap="round" opacity="0.6"/>
        <path d="M35 12 Q38 7 34 3" fill="none" stroke="#fed7aa" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
        <!-- Round Bottom Potion Flask -->
        <path d="M27 16 L37 16 L37 25 L46 39 C50 45, 46 54, 38 55 L26 55 C18 54, 14 45, 18 39 L27 25 Z" 
              fill="url(#potionFlask)" stroke="#fed7aa" stroke-width="1.2"/>
        <!-- Apricot Juice Liquid inside -->
        <path d="M20 42 C18 48, 22 53, 27 53 L37 53 C42 53, 46 48, 44 42 L39 34 Q32 37 25 34 Z" 
              fill="url(#juiceNectar)"/>
        <!-- Surface meniscus -->
        <ellipse cx="32" cy="35" rx="7" ry="2" fill="#ffedd5" opacity="0.7"/>
        <!-- Tiny Apricot Fruit emblem on glass -->
        <circle cx="32" cy="46" r="3.5" fill="#ea580c" stroke="#9a3412" stroke-width="0.6"/>
        <path d="M32 43 Q34 40 36 41" fill="none" stroke="#15803d" stroke-width="1"/>
      </svg>
    `
  },
  {
    id: "kul",
    name: "Kül",
    desc: "Gümüşi gri tonlarında, korları sönmüş mistik ocak külü kasesi.",
    svg: `
      <svg viewBox="0 0 64 64" width="100%" height="100%">
        <defs>
          <linearGradient id="bowlStone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#57534e"/>
            <stop offset="70%" stop-color="#292524"/>
            <stop offset="100%" stop-color="#0c0a09"/>
          </linearGradient>
          <radialGradient id="ashGrad" cx="50%" cy="30%" r="65%">
            <stop offset="0%" stop-color="#e7e5e4"/>
            <stop offset="45%" stop-color="#a8a29e"/>
            <stop offset="85%" stop-color="#44403c"/>
            <stop offset="100%" stop-color="#1c1917"/>
          </radialGradient>
        </defs>
        <!-- Stone Crucible / Bowl -->
        <path d="M12 36 L17 50 C20 55, 44 55, 47 50 L52 36 Z" fill="url(#bowlStone)" stroke="#1c1917" stroke-width="1.5"/>
        <ellipse cx="32" cy="36" rx="20" ry="8" fill="#1c1917" stroke="#292524" stroke-width="1.2"/>
        <!-- Mound of Soft Silvery Ash -->
        <ellipse cx="32" cy="34" rx="18" ry="7" fill="url(#ashGrad)"/>
        <!-- Soft Ash Wisps / Cinder Texture -->
        <ellipse cx="28" cy="33" rx="4" ry="2" fill="#f5f5f4" opacity="0.5"/>
        <ellipse cx="36" cy="35" rx="5" ry="2" fill="#78716c" opacity="0.6"/>
        <!-- Dormant glowing ember sparkle -->
        <circle cx="34" cy="32" r="1.2" fill="#ef4444"/>
        <circle cx="34" cy="32" r="2.5" fill="#ef4444" opacity="0.3"/>
      </svg>
    `
  }
];

/* --------------------------------------------------------------------------
   THE 4 SPELL COMBINATIONS & EXACT OUTCOMES
   -------------------------------------------------------------------------- */
const SPELLS = [
  {
    id: "asik-etme",
    name: "Aşık Etme Büyüsü",
    // 5 ingredients required (order across slots does not matter)
    ingredients: [
      "Emir'in saç teli",
      "Ecem'in saç teli",
      "Kahve çekirdeği",
      "Kuru peygamber devesi",
      "Düğümlenmiş ip"
    ],
    outcomeType: "parchment",
    exactText: "Emir zaten sana aşık bu büyüyü yapamazsın",
    title: "Aşık Etme Büyüsü",
    footer: "Kadim mühür bozuldu • Aşk zaten hakikat"
  },
  {
    id: "yaren-buyusu",
    name: "Yaren Büyüsü",
    // 4 ingredients required (5th slot MUST be empty)
    ingredients: [
      "Ilık kayısı suyu",
      "Mango sanılmış avokado",
      "Kül",
      "Kuru yengeç"
    ],
    outcomeType: "side-eye",
    title: "Yaren Büyüsü",
    caption: "Bu bakış sana bir yerden tanıdık geldi mi?"
  },
  {
    id: "ruh-gorme",
    name: "Ruh Görme Büyüsü",
    // 4 ingredients required (5th slot MUST be empty)
    ingredients: [
      "Ortası delik taş",
      "Keçiboynuzu",
      "Toprak",
      "Emir'in saç teli"
    ],
    outcomeType: "soul-heart",
    exactText: "İyi ki cadısın ve ruhumu görebiliyorsun, bunu söylememe gerek yok zaten biliyorsundur da ruhuma çok iyi geliyorsun",
    title: "Ruh Görme Büyüsü"
  },
  {
    id: "ozlem-gorme",
    name: "Özlem Görme Büyüsü",
    // 4 ingredients required (5th slot MUST be empty)
    ingredients: [
      "Kuru peygamber devesi",
      "Ecem'in saç teli",
      "Düğümlenmiş ip",
      "Kahve çekirdeği"
    ],
    outcomeType: "longing-envelope",
    exactText: "Özlem derecesi = tuple(%100)",
    title: "Özlem Görme Büyüsü"
  }
];

/* --------------------------------------------------------------------------
   THE GRIMOIRE (SPELLBOOK) PAGES CONTENT
   Net büyü tarifleri, açık malzeme listeleri ve Türkçe ritüel kuralları
   -------------------------------------------------------------------------- */
const GRIMOIRE_PAGES = [
  {
    pageNum: "I & II",
    leftTitle: "AŞIK ETME BÜYÜSÜ",
    leftText: `
      <div class="grimoire-recipe-header">
        <span class="grimoire-recipe-badge">5 Malzeme Gerekli</span>
      </div>
      <div class="grimoire-ingredient-title">Gereken Malzemeler:</div>
      <ul class="grimoire-ingredient-list">
        <li>Emir'in saç teli</li>
        <li>Ecem'in saç teli</li>
        <li>Kahve çekirdeği</li>
        <li>Kuru peygamber devesi</li>
        <li>Düğümlenmiş ip</li>
      </ul>
      <div class="grimoire-rule-box">
        <strong>Ritüel Kuralı:</strong> Yıldızın 5 yuvasını da bu malzemelerle doldurun. Yerleşim sırası önemsizdir.
      </div>
    `,
    leftIllustration: `
      <svg viewBox="0 0 100 100" width="65" height="65">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#7a2a1d" stroke-width="2"/>
        <path d="M50 25 C30 5, 5 35, 50 78 C95 35, 70 5, 50 25 Z" fill="none" stroke="#991b1b" stroke-width="2"/>
        <circle cx="50" cy="45" r="8" fill="none" stroke="#5a2818" stroke-width="1.2"/>
        <circle cx="50" cy="45" r="3" fill="#7a2a1d"/>
      </svg>
    `,
    rightTitle: "YAREN BÜYÜSÜ",
    rightText: `
      <div class="grimoire-recipe-header">
        <span class="grimoire-recipe-badge">4 Malzeme Gerekli</span>
      </div>
      <div class="grimoire-ingredient-title">Gereken Malzemeler:</div>
      <ul class="grimoire-ingredient-list">
        <li>Ilık kayısı suyu</li>
        <li>Mango sanılmış avokado</li>
        <li>Kül</li>
        <li>Kuru yengeç</li>
      </ul>
      <div class="grimoire-rule-box">
        <strong>Ritüel Kuralı:</strong> Bu 4 malzemeyi yuvaya koyun, 5. yuvayı kesinlikle <strong>BOŞ</strong> bırakın!
      </div>
    `,
    rightIllustration: `
      <svg viewBox="0 0 100 100" width="65" height="65">
        <path d="M15 50 Q50 18 85 50 Q50 82 15 50 Z" fill="none" stroke="#5a2818" stroke-width="2"/>
        <circle cx="62" cy="50" r="14" fill="none" stroke="#7a3e20" stroke-width="1.8"/>
        <circle cx="66" cy="50" r="7" fill="#3d1b0d"/>
        <circle cx="64" cy="48" r="2" fill="#edd8b4"/>
        <path d="M30 30 Q55 22 80 25" fill="none" stroke="#5a2818" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    pageNum: "III & IV",
    leftTitle: "RUH GÖRME BÜYÜSÜ",
    leftText: `
      <div class="grimoire-recipe-header">
        <span class="grimoire-recipe-badge">4 Malzeme Gerekli</span>
      </div>
      <div class="grimoire-ingredient-title">Gereken Malzemeler:</div>
      <ul class="grimoire-ingredient-list">
        <li>Ortası delik taş</li>
        <li>Keçiboynuzu</li>
        <li>Toprak</li>
        <li>Emir'in saç teli</li>
      </ul>
      <div class="grimoire-rule-box">
        <strong>Ritüel Kuralı:</strong> 4 malzemeyi yerleştirin, 5. yuvayı <strong>BOŞ</strong> bırakın. Ruhun hakikati parıldar.
      </div>
    `,
    leftIllustration: `
      <svg viewBox="0 0 100 100" width="65" height="65">
        <path d="M50 20 C32 2, 8 30, 50 82 C92 30, 68 2, 50 20 Z" fill="none" stroke="#b91c1c" stroke-width="2"/>
        <circle cx="50" cy="46" r="14" fill="none" stroke="#5a2818" stroke-width="1.5" stroke-dasharray="3,3"/>
        <circle cx="50" cy="46" r="5" fill="#991b1b"/>
      </svg>
    `,
    rightTitle: "ÖZLEM GÖRME BÜYÜSÜ",
    rightText: `
      <div class="grimoire-recipe-header">
        <span class="grimoire-recipe-badge">4 Malzeme Gerekli</span>
      </div>
      <div class="grimoire-ingredient-title">Gereken Malzemeler:</div>
      <ul class="grimoire-ingredient-list">
        <li>Kuru peygamber devesi</li>
        <li>Ecem'in saç teli</li>
        <li>Düğümlenmiş ip</li>
        <li>Kahve çekirdeği</li>
      </ul>
      <div class="grimoire-rule-box">
        <strong>Ritüel Kuralı:</strong> 4 malzemeyi yerleştirin, 5. yuvayı <strong>BOŞ</strong> bırakın. Mühürlü zarf açılır.
      </div>
    `,
    rightIllustration: `
      <svg viewBox="0 0 100 100" width="65" height="65">
        <rect x="20" y="30" width="60" height="42" rx="4" fill="none" stroke="#5a2818" stroke-width="2"/>
        <path d="M20 30 L50 56 L80 30" fill="none" stroke="#7a3e20" stroke-width="1.8"/>
        <circle cx="50" cy="60" r="5" fill="#7a2a1d"/>
      </svg>
    `
  },
  {
    pageNum: "V & VI",
    leftTitle: "RİTÜEL YASALARI",
    leftText: `
      <div class="grimoire-gibberish">
        ✦ <b>Cadı Yıldızı (Witch's Knot):</b> 4 dış köşe (Kuzey, Doğu, Güney, Batı) ve 1 merkez olmak üzere 5 kutsal enerji noktasına sahiptir.<br><br>
        ✦ <b>Yerleşim Esnekliği:</b> Malzemelerin hangi yuvada olduğu önemsizdir; mühim olan yıldız üzerindeki tam malzeme kümesidir.<br><br>
        ✦ <b>Boş Yuva Kuralı:</b> 4 malzemeli büyülerde kalan 1 yuvanın kesinlikle boş olması şarttır.
      </div>
    `,
    leftIllustration: `
      <svg viewBox="0 0 100 100" width="65" height="65">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#5a2818" stroke-width="1.5" stroke-dasharray="4,3"/>
        <path d="M50 15 L50 85 M15 50 L85 50" stroke="#7a3e20" stroke-width="1.2"/>
        <polygon points="50,22 78,50 50,78 22,50" fill="none" stroke="#5a2818" stroke-width="1.5"/>
      </svg>
    `,
    rightTitle: "ATEŞİN GÜCÜ",
    rightText: `
      <div class="grimoire-gibberish">
        ✦ <b>Üç Kadim Mum:</b> Masanın sağındaki mumlar simya aurasını yükseltir. Alevler odayı ve sunağı ısıtır.<br><br>
        ✦ <b>Kibriti Çak:</b> Kibrit kutusuna veya kibrite tıklayarak ateşi uyandır, yanan kibriti mumlara değdirerek aydınlığı çağır.<br><br>
        ✦ <b>Temizleme:</b> İstediğin an 'Sunak Temizle' butonuyla masayı boşaltıp yeni tılsımlar deneyebilirsin.
      </div>
    `,
    rightIllustration: `
      <svg viewBox="0 0 100 100" width="65" height="65">
        <path d="M50 20 C60 38, 62 55, 50 72 C38 55, 40 38, 50 20 Z" fill="none" stroke="#c2410c" stroke-width="2"/>
        <circle cx="50" cy="52" r="7" fill="#ea580c" opacity="0.6"/>
        <line x1="30" y1="80" x2="70" y2="80" stroke="#78350f" stroke-width="2"/>
      </svg>
    `
  }
];
