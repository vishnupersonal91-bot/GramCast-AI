# GramCast AI — Hyperlocal Weather & Agricultural Decision Support

GramCast AI uses AI-based weather downscaling (powered by LightGBM and high-resolution topographic parameters) to convert coarse Block-level forecasts into Panchayat-specific weather intelligence and actionable agricultural advisories.

---

## 🌾 Part 1: Panchayat Selection (`index.html`)

- **Design**: Clean modern agriculture-tech UI with light background (`slate-50`), green (`#15803d`) and blue (`#0284c7`) accents. Responsive across mobile, tablet, and desktop.
- **Header**: Logo, Navigation (`Home`, `Weather`, `Advisory`, `Voice Alert`, `Dashboard`), and interactive Tamil / English language toggle (`EN` / `தமிழ்`).
- **Hero Section**:
  - Title: *"GramCast AI"*
  - Subtitle: *"From Block-Level Weather Forecasts to Panchayat-Level Agricultural Decisions"*
  - Description: *"GramCast AI uses AI-based weather downscaling to convert coarse Block-level forecasts into Panchayat-specific weather information and actionable agricultural advisories."*
  - Visual 5-step workflow:
    $$\text{Block Forecast} \longrightarrow \text{Panchayat Geography} \longrightarrow \text{AI Downscaling} \longrightarrow \text{Agricultural Advisory} \longrightarrow \text{Tamil Voice Alert}$$
- **"Select Your Panchayat" Card**:
  - Three cascading dropdowns pre-filled with demo values:
    - **District**: `Thiruvarur`
    - **Block**: `Needamangalam`
    - **Panchayat**: `Demo Panchayat`
  - Large button: **"Get Panchayat Forecast"** (navigates to `weather.html`).

---

## ⚡ Part 2: Weather & AI Downscaling (`weather.html`)

- **Page Title**: `Weather & AI Downscaling`
- **Selected Location Header**:
  - **Panchayat**: `Demo Panchayat` | **Block**: `Needamangalam` | **District**: `Thiruvarur`
- **Card 1 — Block-Level Forecast**:
  - **Rainfall**: `35–45 mm` | **Temperature**: `31°C` | **Humidity**: `75%` | **Wind Speed**: `15 km/h`
  - Label: *"Block-Level Forecast"*
- **Card 2 — Panchayat Geographic Features**:
  - **Elevation**: `18 m` | **Average Slope**: `2.4°` | **Distance to Coast**: `32 km`
  - Label: *"Panchayat Geographic Features"*
- **Central AI Pipeline Diagram**:
  $$\text{BLOCK FORECAST} + \text{PANCHAYAT GEOGRAPHY} \longrightarrow \text{LIGHTGBM MODEL} \longrightarrow \text{PANCHAYAT WEATHER ESTIMATE}$$
- **Panchayat-Level Weather Estimate (Result Card)**:
  - **Rainfall**: `40–50 mm` | **Temperature**: `30–32°C`
  - Badge: **"AI Downscaled"**
  - Explanation: *"LightGBM combines the Block-level forecast with Panchayat-specific geographic features to estimate local weather conditions."*
  - Action button: **"View Agricultural Advisory"** (navigates to `advisory.html`).

---

## 🚜 Part 3: Today's Agricultural Advisory (`advisory.html`)

- **Page Title**: `Today's Agricultural Advisory`
- **Location & Date Header**:
  - **Panchayat**: `Demo Panchayat` | **Date**: `Today`
- **Large Farmer-Friendly Alert Card**:
  - **Headline**: `🌧️ HEAVY RAIN EXPECTED`
  - **Timing**: *"Rain is likely after 3 PM."*
  - **Main Recommendation**: `AVOID PESTICIDE SPRAYING`
  - **Reason**: *"Rain may wash away the pesticide and strong winds may reduce spraying effectiveness."*
- **"Conditions Detected" Section**:
  - **Rainfall**: `HIGH` | **Wind**: `HIGH` | **Spraying Risk**: `HIGH`
- **"Why this recommendation?" Section**:
  - **Active Rule Triggered**:
    $$\text{High rainfall} + \text{strong wind} \longrightarrow \text{Avoid pesticide spraying}$$
  - **Other Possible Advisory Rules**:
    - Low rainfall + high temperature $\longrightarrow$ *Consider irrigation*
    - Heavy rainfall $\longrightarrow$ *Take precautions against waterlogging*
    - Suitable weather $\longrightarrow$ *Normal agricultural activities*
- **Action Buttons**:
  - **"Listen in Tamil"**: Plays interactive voice audio in regional Tamil with speech synthesis and visual audio wave indicator.
  - **"View Weather"**: Navigates back to `weather.html`.

---

## 📢 Part 4: Farmer Voice Advisory (`voice.html`)

- **Page Title**: `Farmer Voice Advisory`
- **Selected Location Header**:
  - **Panchayat**: `Demo Panchayat`
  - **Block**: `Needamangalam Block`
  - **District**: `Thiruvarur District`
- **Large Tamil Advisory Card**:
  - **Tamil Message**:
    > *"வணக்கம்! இன்று பிற்பகல் 3 மணிக்குப் பிறகு உங்கள் பஞ்சாயத்தில் கனமழை பெய்ய வாய்ப்பு உள்ளது. பூச்சிக்கொல்லி மருந்து தெளிப்பதைத் தவிர்க்கவும்."*
  - **Center Circular Button**:
    `▶ PLAY VOICE` (Interactive toggle between Play/Pause with pulsing ripple effect and Web Speech API playback in regional Tamil `ta-IN`).
  - **Metadata Badges**:
    - **Language**: `Tamil` | **Duration**: `~15 seconds` | **Status**: `Ready`
  - **Audio-Player Style Interface**:
    ```
    ▶ Play  ━━━━━━━━━━━━  00:00 / 00:15
    ```
  - **English Translation**:
    > *"Heavy rain is expected in your Panchayat today after 3 PM. Avoid spraying pesticide."*

---

## 🚀 Part 6: Advisory Delivery Simulation (`voice.html`)

Enhanced section seamlessly integrated into the Voice Alert module (`voice.html`):

- **Title**: `Advisory Delivery`
- **Card 1: 📱 WhatsApp Voice Message**:
  - Subtitle: *"Send the Tamil advisory directly to the farmer."*
  - Button: `Send Voice Message`
  - **Simulated Workflow**:
    1. Initial State: `Send Voice Message`
    2. Click State: Loading spinner with `Sending voice message...`
    3. Transmission Complete:
       - Button changes to: `✓ Sent`
       - Status Banner: `✅ Voice message sent successfully`
       - Recipient: `+91 XXXXX XXXXX`
       - Language: `Tamil`
       - Message: `"வணக்கம்! இன்று பிற்பகல் 3 மணிக்குப் பிறகு உங்கள் பஞ்சாயத்தில் கனமழை பெய்ய வாய்ப்பு உள்ளது. பூச்சிக்கொல்லி மருந்து தெளிப்பதைத் தவிர்க்கவும்."`
       - Status: `Delivered`
       - Timestamp: `Just now`
       - Updates WhatsApp row in the Delivery Status table.
- **Card 2: ☎️ Automated IVR Call**:
  - Subtitle: *"Deliver the advisory through an automated phone call."*
  - Button: `Start IVR Call`
  - **Simulated Workflow**:
    1. Initial State: `Start IVR Call`
    2. Click State: `📞 Calling...` with phone call interface showing `Calling Farmer`, `+91 XXXXX XXXXX`, and `Connecting...`
    3. Call Connected: `📞 Call Connected` badge with `Playing Tamil Advisory...`, Tamil message text, and animated progress bar (`▶ ━━━━━━━━━━━ 00:15`).
    4. Call Completed:
       - Banner: `✅ Call Completed`
       - Status: `Advisory delivered successfully`
       - Timestamp: `Just now`
       - Button changes to: `✓ Call Completed`
       - Updates IVR Call row in the Delivery Status table.
- **Delivery Status Matrix**:
  - Summary table displaying:
    | Channel | Recipient | Language | Status |
    |---|---|---|---|
    | 📱 WhatsApp | +91 XXXXX XXXXX | Tamil | ✅ Delivered |
    | ☎️ IVR Call | +91 XXXXX XXXXX | Tamil | ✅ Completed |
- **Zero-Friction Highlight**:
  > *"No application or login is required for the farmer."*
- **Demo Mode Notice**:
  > *"WhatsApp and IVR delivery are simulated for this prototype. No real message or phone call is placed."*

---

## 📊 Part 5: Officer Monitoring Dashboard & SIH Model Validation (`dashboard.html`)

- **Page Title**: `GramCast AI Dashboard`
- **SECTION 1 — SUMMARY (Four KPI Cards)**:
  - **Panchayats Monitored**: `120`
  - **Forecasts Processed**: `120`
  - **High-Risk Panchayats**: `18`
  - **Advisories Generated**: `120`
- **SECTION 2 — PANCHAYAT MAP**:
  - Interactive visual map of the pilot region (Thiruvarur Delta area grid).
  - Spatial risk color coding (🟢 Green, 🟡 Yellow, 🔴 Red).
  - Filters by District, Block, and Risk Level.
  - Interactive Panchayat Inspector Card.
- **SECTION 3 — MODEL VALIDATION (SIH Presentation Core)**:
  - Leave-One-Station-Out Cross-Validation Pipeline.
  - 4 Quantitative Performance Metrics: MAE (`2.1 mm`), RMSE (`2.9 mm`), Baseline Error (`4.8 mm`), LightGBM Error (`2.1 mm` — 56% error reduction).
  - Visual Bar Chart: *"Block Forecast Baseline vs LightGBM"*.

---

## 📜 Part 7: Advisory History & Notification Center (`history.html`)

- **Page Title**: `Advisory History`
- **Purpose**: Enables farmers and agricultural officers to audit previously generated weather advisories, examine downscaled conditions, and track delivery across communication channels.

### SECTION 1 — TODAY'S ALERT
- **Latest Advisory Highlight**:
  - **Status**: `🌧️ Heavy Rain Expected`
  - **Panchayat**: `Demo Panchayat`
  - **Time**: `Today, 3:00 PM`
  - **Recommendation**: `"Avoid pesticide spraying."`
- **End-to-End Pipeline Checklist**:
  - **Weather**: `✓ Processed`
  - **Advisory**: `✓ Generated`
  - **Tamil Voice**: `✓ Generated`
  - **WhatsApp**: `✓ Delivered`
  - **IVR**: `✓ Completed`

### SECTION 2 — ADVISORY HISTORY (TRANSMISSION RECORDS)
- Responsive table and card list detailing transmission logs:
  - **29 Sep 2026**: 🌧️ Heavy Rain | Avoid pesticide spraying | Tamil | 📱 WhatsApp | ✅ Delivered
  - **28 Sep 2026**: ☀️ High Temperature | Consider irrigation | Tamil | ☎️ IVR | ✅ Completed
  - **27 Sep 2026**: 💨 Strong Wind | Avoid spraying | Tamil | 📱 WhatsApp | ✅ Delivered
  - Additional historical logs for neighboring Panchayats (`Rayapuram`, `Kovilvenni`).

### SECTION 3 — INTERACTIVE FILTERS
- Multi-dimensional filtering options with real-time DOM updates and a reset button:
  - **Date Filter**: All Dates, 29 Sep 2026, 28 Sep 2026, 27 Sep 2026, 26 Sep 2026.
  - **Panchayat Filter**: All Panchayats, Demo Panchayat, Rayapuram, Kovilvenni, Munnavalkottai.
  - **Advisory Type**: Avoid pesticide spraying, Consider irrigation, Avoid spraying, Normal activities.
  - **Delivery Channel**: 📱 WhatsApp, ☎️ IVR.
  - **Status**: Delivered, Completed.

### SECTION 4 — ADVISORY DETAILS PANEL (MODAL)
- Triggered by clicking any history card or table row:
  - **Location Hierarchy**: `Demo Panchayat > Needamangalam Block > Thiruvarur District`
  - **Weather Conditions**: Rainfall (`40–50 mm`), Temperature (`30–32°C`), Humidity (`75%`), Wind Speed (`15 km/h`).
  - **Panchayat Geographic Features**: Elevation (`18 m`), Slope (`2.4°`), Coastal Distance (`32 km`), Terrain Type (`Delta Plain`).
  - **AI Estimate (LightGBM Downscaled)**: Downscaled Rainfall and Temperature intervals.
  - **Generated Advisory & Rationale**: High rainfall combined with strong wind.
  - **Delivery Channel & Verification Status**: WhatsApp / IVR with confirmation badges.

### SECTION 5 — NOTIFICATION CENTER
- **Header Bell Icon**:
  - Unread count badge (`4`) with notification indicator.
  - Opens an interactive dropdown list featuring the 4 required notifications:
    1. 🌧️ *"Heavy rain advisory generated."* (Demo Panchayat • Just now)
    2. 🎙️ *"Tamil voice message ready."* (15s synthesized audio • 2 mins ago)
    3. 📱 *"WhatsApp delivery completed."* (To +91 XXXXX XXXXX • 5 mins ago)
    4. ☎️ *"IVR call completed."* (Auto-call verified • 10 mins ago)
  - **Mark all as read**: Clears unread badge, dims notification entries, and hides unread pips.
  - Click-outside auto-dismiss behavior.
  - Propagated across all pages (`index.html`, `weather.html`, `advisory.html`, `voice.html`, `dashboard.html`, `history.html`) for global UI consistency.

---

## 🔄 Part 8: Connected Data Flow & Farmer Profile System (`app-state.js`)

Part 8 introduces an end-to-end connected reactive state management layer across all pages without redesigning or removing any existing layouts, navigation, or components:

### 1. Farmer Profile Management
- **Single Source of Truth (`app-state.js`)**:
  - Centralized store managing:
    - **Farmer Name** (Default: `Vishnu`)
    - **Phone Number** (Default: `+91 98401 23456`)
    - **District** (Default: `Thiruvarur`)
    - **Block** (Default: `Needamangalam`)
    - **Panchayat** (Default: `Demo Panchayat`)
    - **Preferred Language** (`ta` / `en`)
    - **Crop** (`Paddy (Samba)`, `Black Gram (Pulses)`, `Cotton`, `Sugarcane`, `Groundnut`, `Banana`)
- **Universal Quick-Edit Profile Modal**:
  - Accessible from the header of **every page** via the interactive Farmer Badge: `👨‍🌾 Vishnu • Paddy (Samba)`.
  - Also directly editable via the main form on `index.html` or inline buttons on other pages.
  - Updates propagate instantaneously to all DOM components via custom event broadcasting (`farmerProfileChanged`).

### 2. Connected Panchayat Data Flow
- Selecting a Panchayat on `index.html` immediately synchronizes across the entire platform:
  - **Weather (`weather.html`)**: Automatically updates Card 2 (Elevation, Average Slope, Coastal Distance) and the downscaled estimate based on realistic Delta topographic features.
  - **Advisory (`advisory.html`)**: Dynamically binds Panchayat name to location banners, advisory recommendations, and conditions.
  - **Voice Alert & Delivery Simulation (`voice.html`)**: Personalizes regional Tamil voice greetings and recipient details.
  - **Dashboard (`dashboard.html`)**: Automatically identifies, pins, and highlights the farmer's Panchayat on the interactive GIS risk map.
  - **History (`history.html`)**: Synchronizes the latest alert banner with the active Panchayat.

### 3. Connected Crop-Specific Intelligence
- Advisory recommendations and risk rationales adapt dynamically to the farmer's selected crop:
  - **🌾 Paddy (Samba)**: *Avoid pesticide spraying* (Prevents chemical wash-off and toxic runoff into drainage canals).
  - **🌱 Black Gram (Pulses)**: *Clear field drainage & suspend spraying* (Prevents acute root asphyxiation, collar rot, and waterlogging).
  - **☁️ Cotton**: *Suspend spraying & clear furrows* (Prevents flower/square shedding and fungal boll rot caused by humid moisture traps).
  - **🎋 Sugarcane**: *Postpone top-dressing & fertilizer application* (Prevents nitrogen leaching beyond the root zone).
  - **🥜 Groundnut**: *Delay harvesting & clear surface drainage* (Prevents pod rotting and premature in-situ seed germination).
  - **🍌 Banana**: *Provide propping & trench drainage* (Protects against pseudostem lodging and bunch breakage from wind gusts).

### 4. Connected Delivery Simulation
- Simulated **WhatsApp Voice Message** and **Automated IVR Call** reflect the farmer's configured profile:
  - Recipient phone and name: `+91 98401 23456 (Vishnu)`.
  - Tamil voice audio: Uses Web Speech API synthesis (`ta-IN`) addressing the farmer by name and delivering crop-specific advice.
  - Delivery Status Matrix: Shows the farmer's personalized contact record.

---

## 🚀 How to Run & View

### Option 1: Direct in Browser
Double-click any HTML file in file explorer:
- [`index.html`](file:///c:/Users/vishnu%20vardhan%20p/OneDrive/Desktop/New%20folder%20(3)/index.html) (Part 1 - Panchayat Selection)
- [`weather.html`](file:///c:/Users/vishnu%20vardhan%20p/OneDrive/Desktop/New%20folder%20(3)/weather.html) (Part 2 - Weather & AI Downscaling)
- [`advisory.html`](file:///c:/Users/vishnu%20vardhan%20p/OneDrive/Desktop/New%20folder%20(3)/advisory.html) (Part 3 - Agricultural Advisory)
- [`voice.html`](file:///c:/Users/vishnu%20vardhan%20p/OneDrive/Desktop/New%20folder%20(3)/voice.html) (Part 4 & Part 6 - Voice Advisory & Delivery Simulation)
- [`dashboard.html`](file:///c:/Users/vishnu%20vardhan%20p/OneDrive/Desktop/New%20folder%20(3)/dashboard.html) (Part 5 - Officer Dashboard & Model Validation)
- [`history.html`](file:///c:/Users/vishnu%20vardhan%20p/OneDrive/Desktop/New%20folder%20(3)/history.html) (Part 7 - Advisory History & Notification Center)

### Option 2: Local HTTP Server
Run in PowerShell:
```bash
python -m http.server 8000
```
Open `http://localhost:8000` in your web browser.
