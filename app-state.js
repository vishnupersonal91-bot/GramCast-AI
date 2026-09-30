/**
 * GramCast AI — Central Shared Application State & Data Flow Manager
 * Connects Farmer Profile, Panchayat Selection, Downscaled Weather,
 * Crop Advisory, Voice Alert, Delivery Simulation, and Dashboard.
 */

// 1. Comprehensive Regional Geographic Data
const GRAMCAST_GEO_DATA = {
  "Thiruvarur": {
    blocks: {
      "Needamangalam": ["Demo Panchayat", "Rayapuram", "Kovilvenni", "Munnavalkottai", "Adichapuram", "Perambur"],
      "Mannargudi": ["Asikkadu", "Edayarnatham", "Kallikudy", "Moovanallur", "Palaiyur"],
      "Valangaiman": ["Alangudi", "Avoor", "Govindapuram", "Madukkur", "Poonthottam"],
      "Kudavasal": ["Manakkal", "Peralam", "Simizhi", "Vadamattam"],
      "Nannilam": ["Achuthamangalam", "Kollumangudi", "Panangudi", "Thirukannapuram"],
      "Thiruthuraipoondi": ["Alathambadi", "Kattimedu", "Pallankoil", "Thiruthengoor"]
    }
  },
  "Thanjavur": {
    blocks: {
      "Thanjavur": ["Inathukanpatti", "Kandithampattu", "Kurungulam", "Pillaiyarpatti"],
      "Kumbakonam": ["Annalagraharam", "Ammachattram", "Daradaram", "Sakkottai"],
      "Papanasam": ["Avoor", "Ganapathi Agraharam", "Kabisthalam", "Thiruvaiyaru"],
      "Orathanadu": ["Kannanthankudi", "Kavalarpatti", "Pudur", "Thekkur"]
    }
  },
  "Nagapattinam": {
    blocks: {
      "Nagapattinam": ["Avarapoondi", "Manjakkollai", "Thevur", "Vadavoor"],
      "Kilvelur": ["Ananthagudi", "Kurukathi", "Radhamangalam", "Venmani"],
      "Keelaiyur": ["Madapuram", "Thalainayar", "Vettaikaraniruppu"]
    }
  },
  "Mayiladuthurai": {
    blocks: {
      "Mayiladuthurai": ["Arupathi", "Dharmapuram", "Koranad", "Moovalur"],
      "Sirkazhi": ["Kollidam", "Poompuhar", "Thirunagari", "Vaitheeswaran Koil"],
      "Kuthalam": ["Komal", "Manganallur", "Nallavur", "Therizhandur"]
    }
  },
  "Cuddalore": {
    blocks: {
      "Chidambaram": ["Bhuvanagiri", "Killai", "Lalpuram", "Parangipettai"],
      "Kattumannarkoil": ["Komaratchi", "Nattarmangalam", "Srimushnam"],
      "Kurinjipadi": ["Alapakkam", "Kullanchavadi", "Vadakkuthu"]
    }
  }
};

// 2. Crop Metadata and Tailored Agro-Climatic Advisory Rules
const GRAMCAST_CROPS = {
  "Paddy (Samba)": {
    en: "Paddy (Samba)",
    ta: "நெல் (சம்பா)",
    icon: "🌾",
    adviceHeavyRain: {
      en: "Avoid pesticide spraying on Paddy fields. Rain is likely to wash off systemic chemicals and cause toxic runoff into standing water.",
      ta: "நெல் பயிரில் பூச்சிக்கொல்லி மருந்து தெளிப்பதைத் தவிர்க்கவும். கனமழை மருந்தைக் கழுவிச் சென்று வயல் நீரில் கலந்து வீணாகும்."
    },
    actionHeavyRain: {
      en: "AVOID PESTICIDE SPRAYING",
      ta: "பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்க்கவும்"
    },
    riskHeavyRain: {
      en: "High risk of chemical wash-off and leaf blight spread under heavy wet conditions.",
      ta: "கனமழையால் மருந்து கழுவிச் செல்லுதல் மற்றும் இலைக்கருகல் நோய் பரவும் அபாயம் அதிகம்."
    }
  },
  "Black Gram (Pulses)": {
    en: "Black Gram (Pulses)",
    ta: "உளுந்து (பயறு வகை)",
    icon: "🌱",
    adviceHeavyRain: {
      en: "Avoid foliar spraying on Pulses. Prepare drainage channels immediately as black gram seedlings are highly susceptible to root-rot from water stagnation.",
      ta: "பயறு பயிரில் தெளிப்பு மருந்து அடிப்பதைத் தவிர்க்கவும். உளுந்து பயிர் தேங்கும் நீரில் அழுகும் வாய்ப்பு உள்ளதால் வடிகால் வசதி செய்யவும்."
    },
    actionHeavyRain: {
      en: "CLEAR DRAINAGE & AVOID SPRAYING",
      ta: "வடிகால் அமைக்கவும் & மருந்து தெளிப்பதைத் தவிர்க்கவும்"
    },
    riskHeavyRain: {
      en: "Severe root asphyxiation and damping-off risk within 6 hours of waterlogging.",
      ta: "தண்ணீர் தேங்கினால் 6 மணி நேரத்தில் வேரழுகல் நோய் ஏற்படும் அபாயம்."
    }
  },
  "Cotton": {
    en: "Cotton",
    ta: "பருத்தி",
    icon: "☁️",
    adviceHeavyRain: {
      en: "Avoid pesticide and fertilizer spraying on Cotton. Strong wind gusts (>15 km/h) and heavy precipitation will cause square and flower drop.",
      ta: "பருத்தி பயிரில் மருந்து தெளிப்பதைத் தவிர்க்கவும். பலத்த காற்று மற்றும் மழையால் பூ மற்றும் பிஞ்சுகள் உதிரும் அபாயம் உள்ளது."
    },
    actionHeavyRain: {
      en: "POSTPONE SPRAYING & DRAIN FIELD",
      ta: "மருந்து தெளிப்பை ஒத்திவைக்கவும்"
    },
    riskHeavyRain: {
      en: "Boll-shedding risk and high spray droplet drift caused by squally winds.",
      ta: "காற்றின் வேகத்தால் மருந்து காற்றில் வீணாகுதல் மற்றும் சப்பைகள் உதிர்தல்."
    }
  },
  "Sugarcane": {
    en: "Sugarcane",
    ta: "கரும்பு",
    icon: "🎋",
    adviceHeavyRain: {
      en: "Avoid urea top-dressing and pesticide application. Ensure deep furrows are open for rapid surplus rain discharge.",
      ta: "கரும்பு பயிருக்கு மேலுரம் இடுதல் மற்றும் பூச்சி மருந்து தெளிப்பதைத் தவிர்க்கவும். பாத்திகளில் தேங்கும் நீரை வெளியேற்றவும்."
    },
    actionHeavyRain: {
      en: "AVOID TOP-DRESSING & SPRAYING",
      ta: "மேலுரம் மற்றும் மருந்து தெளிப்பதைத் தவிர்க்கவும்"
    },
    riskHeavyRain: {
      en: "Nutrient leaching into lower soil strata due to high rainfall velocity.",
      ta: "கனமழையால் இடப்படும் உரங்கள் வேர்ப்பகுதியைத் தாண்டி அடித்துச் செல்லப்படும் அபாயம்."
    }
  },
  "Groundnut": {
    en: "Groundnut",
    ta: "நிலக்கடலை",
    icon: "🥜",
    adviceHeavyRain: {
      en: "Postpone pesticide spraying and harvesting. High soil moisture triggers pod germination and collar rot.",
      ta: "நிலக்கடலை பயிரில் மருந்து தெளிப்பது மற்றும் அறுவடையை ஒத்திவைக்கவும். அதிக ஈரப்பதம் காய்கள் முளைக்க வழிவகுக்கும்."
    },
    actionHeavyRain: {
      en: "POSTPONE HARVEST & SPRAYING",
      ta: "அறுவடை & மருந்து தெளிப்பை ஒத்திவைக்கவும்"
    },
    riskHeavyRain: {
      en: "Tikka leaf spot aggravation and underground pod damp rot.",
      ta: "திக்கா இலைப்புள்ளி நோய் தீவிரம் மற்றும் நிலத்தடி காய் அழுகல் அபாயம்."
    }
  },
  "Banana": {
    en: "Banana",
    ta: "வாழை",
    icon: "🍌",
    adviceHeavyRain: {
      en: "Provide mechanical support (casuarina poles) for bunched banana trees against squally wind gusts; withhold foliar sprays.",
      ta: "பலத்த காற்று வீசக்கூடும் என்பதால் தார் போட்ட வாழை மரங்களுக்கு முட்டு கொடுக்கவும்; மருந்து தெளிப்பதைத் தவிர்க்கவும்."
    },
    actionHeavyRain: {
      en: "PROVIDE PROPPING & AVOID SPRAYING",
      ta: "மரங்களுக்கு முட்டுக் கொடுக்கவும் & தெளிப்பதைத் தவிர்க்கவும்"
    },
    riskHeavyRain: {
      en: "Pseudostem breakage and lodging from convective wind shears above 20 km/h.",
      ta: "பலத்த காற்றின் வேகத்தால் மரங்கள் முறிந்து விழும் அபாயம்."
    }
  }
};

// 3. Default Connected Profile
const GRAMCAST_DEFAULT_PROFILE = {
  name: "Vishnu",
  phone: "+91 98401 23456",
  district: "Thiruvarur",
  block: "Needamangalam",
  panchayat: "Demo Panchayat",
  crop: "Paddy (Samba)",
  lang: "en"
};

/**
 * Get the current active Farmer Profile from localStorage, URL params, or defaults.
 */
function getFarmerProfile() {
  let profile = { ...GRAMCAST_DEFAULT_PROFILE };

  try {
    const saved = localStorage.getItem('gramcast_farmer_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      profile = { ...profile, ...parsed };
    }
  } catch (e) {
    console.warn("Could not read gramcast_farmer_profile from localStorage:", e);
  }

  // Check URL params for any explicit overrides
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('district')) profile.district = urlParams.get('district');
  if (urlParams.get('block')) profile.block = urlParams.get('block');
  if (urlParams.get('panchayat')) profile.panchayat = urlParams.get('panchayat');
  if (urlParams.get('lang')) profile.lang = urlParams.get('lang');
  if (urlParams.get('name')) profile.name = urlParams.get('name');
  if (urlParams.get('crop')) profile.crop = urlParams.get('crop');
  if (urlParams.get('phone')) profile.phone = urlParams.get('phone');

  return profile;
}

/**
 * Save the Farmer Profile to localStorage and dispatch update events
 */
function saveFarmerProfile(newProfile) {
  const current = getFarmerProfile();
  const merged = { ...current, ...newProfile };

  try {
    localStorage.setItem('gramcast_farmer_profile', JSON.stringify(merged));
    // Synchronize legacy keys
    localStorage.setItem('gramcast_district', merged.district);
    localStorage.setItem('gramcast_block', merged.block);
    localStorage.setItem('gramcast_panchayat', merged.panchayat);
    localStorage.setItem('gramcast_lang', merged.lang);
    localStorage.setItem('gramcast_crop', merged.crop);
    localStorage.setItem('gramcast_farmer_name', merged.name);
    localStorage.setItem('gramcast_farmer_phone', merged.phone);
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }

  // Dispatch custom event so all listeners on the page react immediately
  window.dispatchEvent(new CustomEvent('farmerProfileChanged', { detail: merged }));
  updateHeaderProfileBadge();
  syncAllNavigationLinks(merged);
  return merged;
}

/**
 * Automatically synchronize all internal links across navigation, buttons, and footers
 * to pass the active farmer profile parameters.
 */
function syncAllNavigationLinks(profile) {
  if (!profile) profile = getFarmerProfile();
  const q = new URLSearchParams({
    district: profile.district || 'Thiruvarur',
    block: profile.block || 'Needamangalam',
    panchayat: profile.panchayat || 'Demo Panchayat',
    crop: profile.crop || 'Paddy (Samba)',
    name: profile.name || 'Vishnu',
    phone: profile.phone || '+91 98401 23456',
    lang: profile.lang || 'en'
  }).toString();

  const targetPages = ['index.html', 'weather.html', 'advisory.html', 'voice.html', 'dashboard.html', 'history.html'];

  document.querySelectorAll('a').forEach(link => {
    const rawHref = link.getAttribute('href');
    if (!rawHref) return;

    if (rawHref.startsWith('#') || rawHref.startsWith('javascript:') || rawHref.startsWith('http:') || rawHref.startsWith('https:') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
      return;
    }

    const basePage = rawHref.split('?')[0];
    if (targetPages.includes(basePage)) {
      link.href = `${basePage}?${q}`;
    }
  });
}


/**
 * Calculate realistic micro-topographic and downscaled weather features for a given Panchayat
 */
function getPanchayatDownscaledData(panchayatName, districtName) {
  // Deterministic hash based on panchayat name for consistent demo values
  let hash = 0;
  for (let i = 0; i < panchayatName.length; i++) {
    hash = (hash << 5) - hash + panchayatName.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  // Elevation between 14m and 28m for Cauvery Delta
  const elevation = 14 + (absHash % 14);
  // Slope between 1.5° and 3.5°
  const slope = (1.5 + ((absHash % 20) / 10)).toFixed(1);
  // Distance to coast based on district/hash
  let baseCoast = 32;
  if (districtName === "Nagapattinam") baseCoast = 8 + (absHash % 10);
  else if (districtName === "Mayiladuthurai") baseCoast = 12 + (absHash % 12);
  else if (districtName === "Cuddalore") baseCoast = 10 + (absHash % 15);
  else if (districtName === "Thanjavur") baseCoast = 48 + (absHash % 18);
  else baseCoast = 28 + (absHash % 12); // Thiruvarur

  // Downscaled rainfall calculation (orographic + coastal moisture adjustment)
  const rainMin = 38 + (absHash % 8);
  const rainMax = rainMin + 10;
  const tempMin = 30;
  const tempMax = 32 + (absHash % 2);

  return {
    elevation: `${elevation} m`,
    slope: `${slope}°`,
    coast: `${baseCoast} km`,
    rainRange: `${rainMin}–${rainMax} mm`,
    tempRange: `${tempMin}–${tempMax}°C`,
    humidity: `${72 + (absHash % 8)}%`,
    windSpeed: `${14 + (absHash % 8)} km/h`
  };
}

/**
 * Render/Update the Farmer Profile badge in the page header
 */
function updateHeaderProfileBadge() {
  const profile = getFarmerProfile();
  const profileBtn = document.getElementById('btn-header-farmer-profile');
  
  if (profileBtn) {
    const nameEl = profileBtn.querySelector('.header-farmer-name');
    const locEl = profileBtn.querySelector('.header-farmer-loc');
    const avatarEl = profileBtn.querySelector('.header-farmer-avatar');
    
    if (nameEl) nameEl.textContent = profile.name || "Vishnu";
    if (locEl) locEl.textContent = profile.panchayat || "Demo Panchayat";
    if (avatarEl && profile.name) avatarEl.textContent = profile.name.charAt(0).toUpperCase();
  }
}

/**
 * Open the interactive Farmer Profile Modal
 */
function openFarmerProfileModal() {
  let modal = document.getElementById('farmer-profile-modal');
  if (!modal) {
    injectFarmerProfileModal();
    modal = document.getElementById('farmer-profile-modal');
  }

  const profile = getFarmerProfile();

  // Populate fields
  const nameInput = document.getElementById('prof-input-name');
  const phoneInput = document.getElementById('prof-input-phone');
  const cropSelect = document.getElementById('prof-select-crop');
  const distSelect = document.getElementById('prof-select-district');
  const blockSelect = document.getElementById('prof-select-block');
  const panchSelect = document.getElementById('prof-select-panchayat');
  const langSelect = document.getElementById('prof-select-lang');

  if (nameInput) nameInput.value = profile.name || "Vishnu";
  if (phoneInput) phoneInput.value = profile.phone || "+91 98401 23456";
  if (cropSelect) cropSelect.value = profile.crop || "Paddy (Samba)";
  if (langSelect) langSelect.value = profile.lang || "en";

  // Populate District
  if (distSelect) {
    distSelect.innerHTML = '';
    Object.keys(GRAMCAST_GEO_DATA).forEach(dist => {
      const opt = document.createElement('option');
      opt.value = dist;
      opt.textContent = dist;
      if (dist === profile.district) opt.selected = true;
      distSelect.appendChild(opt);
    });
  }

  // Populate Block
  populateModalBlocks(profile.district, profile.block);

  // Populate Panchayat
  populateModalPanchayats(profile.district, profile.block, profile.panchayat);

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeFarmerProfileModal() {
  const modal = document.getElementById('farmer-profile-modal');
  if (modal) modal.classList.add('hidden');
}

function populateModalBlocks(selectedDist, selectedBlock) {
  const blockSelect = document.getElementById('prof-select-block');
  if (!blockSelect) return;
  blockSelect.innerHTML = '';

  const distData = GRAMCAST_GEO_DATA[selectedDist];
  if (distData && distData.blocks) {
    const blocks = Object.keys(distData.blocks);
    blocks.forEach(b => {
      const opt = document.createElement('option');
      opt.value = b;
      opt.textContent = b;
      if (b === selectedBlock) opt.selected = true;
      blockSelect.appendChild(opt);
    });
  }
}

function populateModalPanchayats(selectedDist, selectedBlock, selectedPanchayat) {
  const panchSelect = document.getElementById('prof-select-panchayat');
  if (!panchSelect) return;
  panchSelect.innerHTML = '';

  const distData = GRAMCAST_GEO_DATA[selectedDist];
  if (distData && distData.blocks && distData.blocks[selectedBlock]) {
    const panchayats = distData.blocks[selectedBlock];
    panchayats.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      if (p === selectedPanchayat) opt.selected = true;
      panchSelect.appendChild(opt);
    });
  }
}

function onModalDistrictChange() {
  const distSelect = document.getElementById('prof-select-district');
  const selectedDist = distSelect.value;
  const blocks = Object.keys(GRAMCAST_GEO_DATA[selectedDist].blocks);
  const firstBlock = blocks[0];
  populateModalBlocks(selectedDist, firstBlock);
  onModalBlockChange();
}

function onModalBlockChange() {
  const distSelect = document.getElementById('prof-select-district');
  const blockSelect = document.getElementById('prof-select-block');
  const selectedDist = distSelect.value;
  const selectedBlock = blockSelect.value;
  const panchayats = GRAMCAST_GEO_DATA[selectedDist].blocks[selectedBlock] || [];
  populateModalPanchayats(selectedDist, selectedBlock, panchayats[0] || "");
}

function saveFarmerProfileFromModal(event) {
  if (event) event.preventDefault();

  const name = document.getElementById('prof-input-name').value.trim() || "Vishnu";
  const phone = document.getElementById('prof-input-phone').value.trim() || "+91 98401 23456";
  const crop = document.getElementById('prof-select-crop').value;
  const district = document.getElementById('prof-select-district').value;
  const block = document.getElementById('prof-select-block').value;
  const panchayat = document.getElementById('prof-select-panchayat').value;
  const lang = document.getElementById('prof-select-lang').value;

  const updated = saveFarmerProfile({
    name,
    phone,
    crop,
    district,
    block,
    panchayat,
    lang
  });

  closeFarmerProfileModal();

  // Show a quick unobtrusive toast notification
  showConnectedToast(`Profile saved! Updated to ${name} (${panchayat}) • ${crop}`);

  // Re-sync language if user changed preferred language in modal
  if (typeof setLanguage === 'function' && lang !== currentLang) {
    setLanguage(lang);
  }

  // Refresh page or trigger local page update
  if (typeof updatePageWithConnectedProfile === 'function') {
    updatePageWithConnectedProfile(updated);
  } else {
    // Reload with query parameters to ensure consistency
    const query = new URLSearchParams({
      district: updated.district,
      block: updated.block,
      panchayat: updated.panchayat,
      lang: updated.lang
    });
    window.location.search = query.toString();
  }
}

/**
 * Toast confirmation banner
 */
function showConnectedToast(message) {
  let toast = document.getElementById('gramcast-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'gramcast-toast';
    toast.className = 'fixed bottom-5 right-5 z-[9999] bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 transform translate-y-20 opacity-0 transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-xs">✓</span>
    <span>${message}</span>
  `;
  toast.classList.remove('translate-y-20', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

/**
 * Inject the shared Farmer Profile Modal into the page
 */
function injectFarmerProfileModal() {
  if (document.getElementById('farmer-profile-modal')) return;

  const modalHtml = `
    <div id="farmer-profile-modal" class="hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 sm:p-7 relative max-h-[92vh] overflow-y-auto animate-fadeIn">
        
        <!-- Close button -->
        <button onclick="closeFarmerProfileModal()" type="button" class="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors" aria-label="Close Profile">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
          <i data-lucide="user-check" class="w-4 h-4"></i>
          <span>Connected Farmer Profile</span>
        </div>
        <h3 class="text-2xl font-black text-slate-900 mb-1">
          Farmer & Land Configuration
        </h3>
        <p class="text-xs text-slate-500 mb-5">
          Changes here update the weather downscaling, crop recommendations, voice alerts, and delivery simulation across the entire platform.
        </p>

        <form id="farmer-profile-form" onsubmit="saveFarmerProfileFromModal(event)" class="space-y-4">
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <!-- Farmer Name -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Farmer Name</label>
              <div class="relative">
                <i data-lucide="user" class="w-4 h-4 absolute left-3 top-3 text-slate-400"></i>
                <input 
                  type="text" 
                  id="prof-input-name" 
                  required
                  placeholder="e.g. Vishnu"
                  class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Phone Number (WhatsApp/IVR)</label>
              <div class="relative">
                <i data-lucide="phone" class="w-4 h-4 absolute left-3 top-3 text-slate-400"></i>
                <input 
                  type="tel" 
                  id="prof-input-phone" 
                  required
                  placeholder="+91 XXXXX XXXXX"
                  class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            </div>
          </div>

          <!-- Crop Selection -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Primary Cultivated Crop</label>
            <div class="relative">
              <i data-lucide="sprout" class="w-4 h-4 absolute left-3 top-3 text-emerald-600"></i>
              <select 
                id="prof-select-crop"
                class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
              >
                <option value="Paddy (Samba)">🌾 Paddy (Samba) - நெல்</option>
                <option value="Black Gram (Pulses)">🌱 Black Gram (Pulses) - உளுந்து</option>
                <option value="Cotton">☁️ Cotton - பருத்தி</option>
                <option value="Sugarcane">🎋 Sugarcane - கரும்பு</option>
                <option value="Groundnut">🥜 Groundnut - நிலக்கடலை</option>
                <option value="Banana">🍌 Banana - வாழை</option>
              </select>
            </div>
          </div>

          <!-- Location Cascade: District, Block, Panchayat -->
          <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
            <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
              Panchayat Location Boundary
            </span>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label class="block text-[10px] font-bold text-slate-500 mb-0.5">District</label>
                <select 
                  id="prof-select-district" 
                  onchange="onModalDistrictChange()" 
                  class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
                ></select>
              </div>

              <div>
                <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Block</label>
                <select 
                  id="prof-select-block" 
                  onchange="onModalBlockChange()" 
                  class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
                ></select>
              </div>

              <div>
                <label class="block text-[10px] font-bold text-slate-500 mb-0.5">Panchayat</label>
                <select 
                  id="prof-select-panchayat" 
                  class="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
                ></select>
              </div>
            </div>
          </div>

          <!-- Preferred Language -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Preferred Voice & Advisory Language</label>
            <select 
              id="prof-select-lang"
              class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
          </div>

          <!-- Action Buttons -->
          <div class="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button 
              type="button" 
              onclick="closeFarmerProfileModal()"
              class="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              class="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white font-bold text-xs shadow-md shadow-emerald-700/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Save & Sync Profile</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  if (window.lucide) lucide.createIcons();
}

// Auto-initialize header badge, profile modal, and sync navigation links on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  injectFarmerProfileModal();
  updateHeaderProfileBadge();
  syncAllNavigationLinks();
});

window.addEventListener('farmerProfileChanged', (e) => {
  if (e.detail) {
    updateHeaderProfileBadge();
    syncAllNavigationLinks(e.detail);
  }
});

// Explicit window exports for 100% cross-script reliability
if (typeof window !== 'undefined') {
  window.GRAMCAST_GEO_DATA = GRAMCAST_GEO_DATA;
  window.GRAMCAST_CROPS = GRAMCAST_CROPS;
  window.GRAMCAST_DEFAULT_PROFILE = GRAMCAST_DEFAULT_PROFILE;
  window.getFarmerProfile = getFarmerProfile;
  window.saveFarmerProfile = saveFarmerProfile;
  window.getPanchayatDownscaledData = getPanchayatDownscaledData;
  window.updateHeaderProfileBadge = updateHeaderProfileBadge;
  window.syncAllNavigationLinks = syncAllNavigationLinks;
  window.openFarmerProfileModal = openFarmerProfileModal;
  window.closeFarmerProfileModal = closeFarmerProfileModal;
}


