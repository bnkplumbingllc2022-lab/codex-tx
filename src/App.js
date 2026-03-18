import { useState, useRef } from "react";

// ─── TRANSLATIONS ────────────────────────────────────────────
const T = {
  en: {
    appSub: "TEXAS PLUMBING CODE",
    tagline: "The code book in your pocket.",
    taglineSub: "cities · inspector profiles · codes",
    voiceTap: "TAP TO SEARCH BY VOICE",
    voiceListening: "LISTENING... TAP TO STOP",
    voiceSub: "Hands dirty? Just say what you need",
    voiceSubOn: "Say a city name, code topic, or inspector",
    quickAccess: "Quick Access",
    codes: "CODE REFERENCE",
    codesSub: "Search Texas IPC & UPC in plain English",
    jurisdiction: "JURISDICTION LOOKUP",
    jurisdictionSub: "cities — amendments & direct contacts",
    inspectors: "INSPECTOR PROFILES",
    inspectorsSub: "What third-party inspectors look for",
    saved: "Saved Codes",
    searchCodes: "Search codes, topics, keywords...",
    searchCities: "Search cities or use voice...",
    available: "available",
    matching: "matching",
    jurisdictions: "Texas jurisdictions — A to Z",
    amendments: "Local Amendments",
    thirdParty: "Third-Party Inspectors Active Here",
    office: "Inspection Office",
    directLine: "Direct Inspection Line",
    scheduleHours: "Scheduling Hours",
    emergency: "Emergency Line",
    callNow: "CALL NOW",
    permitRequired: "PERMIT REQUIRED",
    importantNote: "⚠ IMPORTANT NOTE",
    alwaysVerify: "⚠ ALWAYS VERIFY",
    alwaysVerifyText: "Local amendments may override this code. Check your jurisdiction before pulling a permit.",
    plainEnglish: "Plain English",
    diagram: "Diagram",
    tags: "Tags",
    strictAreas: "Strict On These Areas",
    fieldTips: "Field Tips",
    inspectorCount: "Inspector Profiles",
    back: "BACK",
    amendments_label: "amendments",
    navHome: "HOME",
    navCodes: "CODES",
    navCities: "CITIES",
    navInspectors: "INSPECTORS",
    navIdentify: "IDENTIFY",
    pop: "Pop.",
    language: "EN",
    identifyTitle: "PART IDENTIFIER",
    identifySub: "Point your camera at any plumbing setup",
    identifyTap: "TAP TO TAKE PHOTO",
    identifyOrUpload: "or upload from camera roll",
    identifyAnalyzing: "Analyzing your photo...",
    identifyAnalyzingSub: "Identifying every part visible",
    identifyResults: "Parts Identified",
    identifyTapPart: "Tap any part for details",
    identifyCodeStatus: "Code Status",
    identifyStillMade: "Still Manufactured",
    identifyDiscontinued: "Discontinued",
    identifyWhereToBuy: "WHERE TO BUY",
    identifyNewPhoto: "IDENTIFY ANOTHER",
    identifyError: "Could not analyze — try again with better lighting",
    identifyApproved: "✅ Code Approved",
    identifyGrandfathered: "⚠ Grandfathered Only",
    identifyNotApproved: "❌ Not Code Approved",
    identifyRelatedVideos: "Related Repair Videos",
    identifySearchVideo: "Search on YouTube",
    identifyProTip: "Pro Tip",
  },
  es: {
    appSub: "CÓDIGO DE PLOMERÍA TEXAS",
    tagline: "El manual de códigos en tu bolsillo.",
    taglineSub: "ciudades · perfiles de inspectores · códigos",
    voiceTap: "TOCA PARA BUSCAR POR VOZ",
    voiceListening: "ESCUCHANDO... TOCA PARA PARAR",
    voiceSub: "¿Manos sucias? Solo di lo que necesitas",
    voiceSubOn: "Di el nombre de una ciudad, tema o inspector",
    quickAccess: "Acceso Rápido",
    codes: "REFERENCIA DE CÓDIGOS",
    codesSub: "Busca códigos IPC y UPC en español simple",
    jurisdiction: "BÚSQUEDA DE JURISDICCIÓN",
    jurisdictionSub: "ciudades — enmiendas y contactos directos",
    inspectors: "PERFILES DE INSPECTORES",
    inspectorsSub: "Qué buscan los inspectores de terceros",
    saved: "Códigos Guardados",
    searchCodes: "Buscar códigos, temas, palabras clave...",
    searchCities: "Buscar ciudades o usar voz...",
    available: "disponibles",
    matching: "coincidentes",
    jurisdictions: "jurisdicciones de Texas — A a Z",
    amendments: "Enmiendas Locales",
    thirdParty: "Inspectores de Terceros Activos Aquí",
    office: "Oficina de Inspección",
    directLine: "Línea Directa de Inspección",
    scheduleHours: "Horario de Programación",
    emergency: "Línea de Emergencia",
    callNow: "LLAMAR AHORA",
    permitRequired: "PERMISO REQUERIDO",
    importantNote: "⚠ NOTA IMPORTANTE",
    alwaysVerify: "⚠ SIEMPRE VERIFICA",
    alwaysVerifyText: "Las enmiendas locales pueden anular este código. Verifica tu jurisdicción antes de sacar un permiso.",
    plainEnglish: "En Español Simple",
    diagram: "Diagrama",
    tags: "Etiquetas",
    strictAreas: "Estrictos en Estas Áreas",
    fieldTips: "Consejos de Campo",
    inspectorCount: "Perfiles de Inspectores",
    back: "ATRÁS",
    amendments_label: "enmiendas",
    navHome: "INICIO",
    navCodes: "CÓDIGOS",
    navCities: "CIUDADES",
    navInspectors: "INSPECTORES",
    navIdentify: "IDENTIFICAR",
    pop: "Pob.",
    language: "ES",
    identifyTitle: "IDENTIFICADOR DE PARTES",
    identifySub: "Apunta tu cámara a cualquier instalación de plomería",
    identifyTap: "TOCA PARA TOMAR FOTO",
    identifyOrUpload: "o sube desde tu galería",
    identifyAnalyzing: "Analizando tu foto...",
    identifyAnalyzingSub: "Identificando cada parte visible",
    identifyResults: "Partes Identificadas",
    identifyTapPart: "Toca cualquier parte para ver detalles",
    identifyCodeStatus: "Estado del Código",
    identifyStillMade: "Aún se Fabrica",
    identifyDiscontinued: "Descontinuado",
    identifyWhereToBuy: "DÓNDE COMPRAR",
    identifyNewPhoto: "IDENTIFICAR OTRA",
    identifyError: "No se pudo analizar — intenta con mejor iluminación",
    identifyApproved: "✅ Aprobado por Código",
    identifyGrandfathered: "⚠ Solo Existente",
    identifyNotApproved: "❌ No Aprobado por Código",
    identifyRelatedVideos: "Videos de Reparación",
    identifySearchVideo: "Buscar en YouTube",
    identifyProTip: "Consejo Pro",
  }
};

// ─── SVG DIAGRAMS ────────────────────────────────────────────
const DIAGRAMS = {
  sedimentTrap: (
    <svg viewBox="0 0 280 245" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="245" fill="#1a1f24" rx="8" />
      <text x="140" y="16" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">SEDIMENT TRAP — CORRECT INSTALLATION</text>

      {/* ── GAS LINE ENTERING HORIZONTALLY ── */}
      <line x1="20" y1="130" x2="108" y2="130" stroke="#c87a20" strokeWidth="6" strokeLinecap="round" />
      <text x="60" y="120" textAnchor="middle" fill="#c87a20" fontSize="9" fontFamily="sans-serif">GAS IN →</text>

      {/* ── VERTICAL TEE (run = vertical, branch = horizontal inlet) ── */}
      {/* Vertical body of tee */}
      <rect x="108" y="98" width="24" height="64" fill="#4a5a6a" rx="2" />
      {/* Horizontal branch of tee (where gas enters from left) */}
      <rect x="84" y="118" width="28" height="24" fill="#4a5a6a" rx="2" />
      <text x="120" y="133" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif" fontWeight="bold">TEE</text>
      <text x="120" y="143" textAnchor="middle" fill="#7acae0" fontSize="7" fontFamily="sans-serif">(vertical)</text>

      {/* ── GAS EXITS UP — 90 DEGREE TURN TO APPLIANCE ── */}
      <line x1="120" y1="98" x2="120" y2="35" stroke="#c87a20" strokeWidth="6" strokeLinecap="round" />
      <text x="170" y="58" fill="#c87a20" fontSize="9" fontFamily="sans-serif">↑ TO APPLIANCE</text>
      <text x="170" y="70" fill="#4a6a7a" fontSize="8" fontFamily="sans-serif">(as close to inlet</text>
      <text x="170" y="80" fill="#4a6a7a" fontSize="8" fontFamily="sans-serif">as practical)</text>

      {/* Shutoff valve on the riser */}
      <rect x="106" y="48" width="28" height="18" fill="#2a6a4a" rx="2" />
      <text x="120" y="60" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="sans-serif" fontWeight="bold">S/V</text>
      <text x="148" y="56" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">shutoff</text>
      <text x="148" y="66" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">valve</text>

      {/* ── 90° TURN INDICATOR ── */}
      <path d="M 75 130 Q 95 130 95 110" fill="none" stroke="#4a9a6a" strokeWidth="1.5" strokeDasharray="3,2" />
      <text x="22" y="110" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">gas makes</text>
      <text x="22" y="121" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">90° turn ↑</text>
      <text x="22" y="132" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">sediment</text>
      <text x="22" y="143" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">drops down</text>

      {/* ── DIRT LEG DROPS STRAIGHT DOWN FROM BOTTOM OF TEE ── */}
      <line x1="120" y1="162" x2="120" y2="210" stroke="#6a8a9a" strokeWidth="6" strokeLinecap="round" />

      {/* Min 3" measurement on dirt leg */}
      <line x1="150" y1="163" x2="150" y2="208" stroke="#c8a030" strokeWidth="1" />
      <line x1="145" y1="163" x2="155" y2="163" stroke="#c8a030" strokeWidth="1" />
      <line x1="145" y1="208" x2="155" y2="208" stroke="#c8a030" strokeWidth="1" />
      <text x="165" y="183" fill="#c8a030" fontSize="9" fontFamily="sans-serif" fontWeight="bold">MIN 3"</text>
      <text x="165" y="194" fill="#c8a030" fontSize="8" fontFamily="sans-serif">nipple</text>

      {/* ── CAP AT BOTTOM ── */}
      <rect x="106" y="209" width="28" height="13" fill="#4a5a6a" rx="3" />
      <text x="120" y="219" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif">CAP</text>

      {/* Sediment collects */}
      <ellipse cx="120" cy="222" rx="11" ry="3" fill="#8a6a20" opacity="0.7" />
      <text x="120" y="236" textAnchor="middle" fill="#8a6a20" fontSize="8" fontFamily="sans-serif">sediment collects here</text>

      {/* Code ref */}
      <text x="140" y="244" textAnchor="middle" fill="#3a5a6a" fontSize="7" fontFamily="sans-serif">IFGC 408.4 · IRC G2419.4</text>
    </svg>
  ),
  tprValve: (
    <svg viewBox="0 0 280 240" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="240" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">TPR VALVE DISCHARGE</text>
      {/* Water heater body */}
      <rect x="80" y="30" width="80" height="120" fill="#2a3a4a" rx="8" stroke="#3a5a6a" strokeWidth="2" />
      <text x="120" y="95" textAnchor="middle" fill="#e0e8f0" fontSize="10" fontFamily="sans-serif">WATER</text>
      <text x="120" y="108" textAnchor="middle" fill="#e0e8f0" fontSize="10" fontFamily="sans-serif">HEATER</text>
      {/* TPR valve on side */}
      <rect x="160" y="55" width="22" height="18" fill="#c85a30" rx="2" />
      <text x="171" y="67" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="sans-serif">TPR</text>
      {/* Discharge pipe going down */}
      <line x1="171" y1="73" x2="171" y2="185" stroke="#6a8a9a" strokeWidth="5" />
      <text x="200" y="120" fill="#e0e8f0" fontSize="9" fontFamily="sans-serif">same size</text>
      <text x="200" y="132" fill="#e0e8f0" fontSize="9" fontFamily="sans-serif">as valve</text>
      <text x="200" y="144" fill="#e0e8f0" fontSize="9" fontFamily="sans-serif">outlet</text>
      {/* Floor line */}
      <line x1="40" y1="185" x2="240" y2="185" stroke="#4a5a6a" strokeWidth="2" strokeDasharray="4,3" />
      <text x="45" y="182" fill="#4a5a6a" fontSize="8" fontFamily="sans-serif">FLOOR</text>
      {/* 6 inch gap indicator */}
      <line x1="155" y1="185" x2="155" y2="200" stroke="#c8a030" strokeWidth="1" strokeDasharray="2,2" />
      <line x1="150" y1="192" x2="160" y2="192" stroke="#c8a030" strokeWidth="1" />
      <text x="105" y="196" fill="#c8a030" fontSize="9" fontFamily="sans-serif">6" MAX</text>
      <text x="105" y="207" fill="#c8a030" fontSize="9" fontFamily="sans-serif">from floor</text>
      {/* Termination */}
      <line x1="171" y1="185" x2="171" y2="198" stroke="#6a8a9a" strokeWidth="5" />
      <ellipse cx="171" cy="200" rx="8" ry="4" fill="#4a6a8a" />
      <text x="171" y="218" textAnchor="middle" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">visible termination</text>
      {/* No threads note */}
      <text x="140" y="232" textAnchor="middle" fill="#3a5a6a" fontSize="8" fontFamily="sans-serif">IPC 504.6 · no threads on discharge end</text>
    </svg>
  ),
  trapArm: (
    <svg viewBox="0 0 280 200" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="200" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">TRAP ARM DISTANCE</text>
      {/* Fixture drain */}
      <rect x="30" y="40" width="40" height="20" fill="#2a3a4a" rx="3" stroke="#3a5a6a" strokeWidth="1" />
      <text x="50" y="53" textAnchor="middle" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">FIXTURE</text>
      {/* Drain down */}
      <line x1="50" y1="60" x2="50" y2="90" stroke="#6a8a9a" strokeWidth="5" />
      {/* Trap P */}
      <path d="M 35 90 Q 35 115 50 115 Q 65 115 65 90" fill="none" stroke="#4a9a6a" strokeWidth="5" />
      <text x="50" y="135" textAnchor="middle" fill="#4a9a6a" fontSize="9" fontFamily="sans-serif">P-TRAP</text>
      {/* Trap arm horizontal */}
      <line x1="65" y1="100" x2="200" y2="100" stroke="#6a8a9a" strokeWidth="5" />
      {/* Distance arrow */}
      <line x1="65" y1="75" x2="200" y2="75" stroke="#c8a030" strokeWidth="1" markerEnd="url(#arrow)" />
      <text x="132" y="70" textAnchor="middle" fill="#c8a030" fontSize="9" fontFamily="sans-serif">TRAP ARM LENGTH</text>
      {/* Vent connection */}
      <rect x="188" y="85" width="20" height="30" fill="#2a3a4a" rx="2" stroke="#3a5a6a" strokeWidth="1" />
      <text x="198" y="103" textAnchor="middle" fill="#e0e8f0" fontSize="7" fontFamily="sans-serif">VENT</text>
      <line x1="198" y1="85" x2="198" y2="40" stroke="#7acae0" strokeWidth="3" />
      <text x="225" y="65" fill="#7acae0" fontSize="8" fontFamily="sans-serif">to</text>
      <text x="225" y="76" fill="#7acae0" fontSize="8" fontFamily="sans-serif">roof</text>
      {/* Measurements table */}
      <rect x="20" y="148" width="240" height="45" fill="#1e2428" rx="4" />
      <text x="30" y="162" fill="#7acae0" fontSize="9" fontFamily="sans-serif" fontWeight="bold">PIPE SIZE → MAX TRAP ARM</text>
      <text x="30" y="175" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">1¼"→30" | 1½"→42" | 2"→60" | 3"→72"</text>
      <text x="30" y="187" fill="#3a5a6a" fontSize="8" fontFamily="sans-serif">IPC Table 909.1</text>
    </svg>
  ),
  csst: (
    <svg viewBox="0 0 280 220" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="220" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">CSST BONDING</text>
      {/* CSST line */}
      <path d="M 20 100 Q 40 85 60 100 Q 80 115 100 100 Q 120 85 140 100 Q 160 115 180 100 Q 200 85 220 100 Q 240 115 260 100" fill="none" stroke="#c87a20" strokeWidth="6" />
      <text x="140" y="80" textAnchor="middle" fill="#c87a20" fontSize="9" fontFamily="sans-serif">CSST GAS LINE</text>
      {/* Bonding clamps */}
      <circle cx="60" cy="100" r="7" fill="#4a9a6a" stroke="#2a6a3a" strokeWidth="2" />
      <circle cx="160" cy="100" r="7" fill="#4a9a6a" stroke="#2a6a3a" strokeWidth="2" />
      <text x="60" y="125" textAnchor="middle" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">CLAMP</text>
      <text x="160" y="125" textAnchor="middle" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">CLAMP</text>
      {/* Distance indicator */}
      <line x1="60" y1="140" x2="160" y2="140" stroke="#c8a030" strokeWidth="1" />
      <line x1="60" y1="135" x2="60" y2="145" stroke="#c8a030" strokeWidth="1" />
      <line x1="160" y1="135" x2="160" y2="145" stroke="#c8a030" strokeWidth="1" />
      <text x="110" y="155" textAnchor="middle" fill="#c8a030" fontSize="10" fontFamily="sans-serif">MAX 6 FT</text>
      <text x="110" y="167" textAnchor="middle" fill="#c8a030" fontSize="8" fontFamily="sans-serif">(many TX cities require this spacing)</text>
      {/* Ground wire */}
      <line x1="60" y1="100" x2="60" y2="180" stroke="#7acae0" strokeWidth="2" strokeDasharray="4,3" />
      <line x1="160" y1="100" x2="160" y2="180" stroke="#7acae0" strokeWidth="2" strokeDasharray="4,3" />
      <line x1="40" y1="180" x2="180" y2="180" stroke="#7acae0" strokeWidth="2" />
      <text x="110" y="195" textAnchor="middle" fill="#7acae0" fontSize="8" fontFamily="sans-serif">bond wire to grounding electrode system</text>
      <text x="140" y="210" textAnchor="middle" fill="#3a5a6a" fontSize="8" fontFamily="sans-serif">NFPA 54 7.13 · IRC G2411.1</text>
    </svg>
  ),
  waterHeaterGarage: (
    <svg viewBox="0 0 280 230" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="230" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">WATER HEATER — GARAGE</text>
      {/* Garage floor */}
      <line x1="20" y1="190" x2="260" y2="190" stroke="#4a5a6a" strokeWidth="3" />
      <text x="45" y="205" fill="#4a5a6a" fontSize="8" fontFamily="sans-serif">GARAGE FLOOR</text>
      {/* Platform/stand */}
      <rect x="90" y="172" width="80" height="18" fill="#3a4a5a" rx="2" />
      <text x="130" y="184" textAnchor="middle" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">PLATFORM / STAND</text>
      {/* 18 inch measurement */}
      <line x1="75" y1="172" x2="75" y2="190" stroke="#c85a30" strokeWidth="1" />
      <line x1="70" y1="172" x2="80" y2="172" stroke="#c85a30" strokeWidth="1" />
      <line x1="70" y1="190" x2="80" y2="190" stroke="#c85a30" strokeWidth="1" />
      <text x="42" y="183" textAnchor="middle" fill="#c85a30" fontSize="10" fontFamily="sans-serif" fontWeight="bold">18" MIN</text>
      {/* Water heater body */}
      <rect x="95" y="80" width="70" height="92" fill="#2a3a4a" rx="6" stroke="#3a5a6a" strokeWidth="2" />
      <text x="130" y="130" textAnchor="middle" fill="#e0e8f0" fontSize="10" fontFamily="sans-serif">WATER</text>
      <text x="130" y="143" textAnchor="middle" fill="#e0e8f0" fontSize="10" fontFamily="sans-serif">HEATER</text>
      {/* Pan underneath */}
      <rect x="85" y="168" width="90" height="8" fill="#1a3a4a" rx="1" stroke="#3a8a9a" strokeWidth="1" />
      <text x="220" y="174" fill="#3a8a9a" fontSize="8" fontFamily="sans-serif">PAN req'd</text>
      {/* Ignition source note */}
      <rect x="20" y="130" width="65" height="30" fill="#2a1a1a" rx="4" stroke="#c85a30" strokeWidth="1" />
      <text x="52" y="142" textAnchor="middle" fill="#c85a30" fontSize="8" fontFamily="sans-serif">ignition source</text>
      <text x="52" y="153" textAnchor="middle" fill="#c85a30" fontSize="8" fontFamily="sans-serif">below 18" = ❌</text>
      <text x="140" y="222" textAnchor="middle" fill="#3a5a6a" fontSize="8" fontFamily="sans-serif">IPC 305.5 · most TX cities strictly enforce</text>
    </svg>
  ),
  drainSlope: (
    <svg viewBox="0 0 280 180" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="180" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">HORIZONTAL DRAIN SLOPE</text>
      {/* Pipe sloped */}
      <line x1="30" y1="70" x2="250" y2="110" stroke="#5a7aaa" strokeWidth="8" strokeLinecap="round" />
      {/* Flow direction arrow */}
      <polygon points="245,105 260,112 245,119" fill="#5a7aaa" />
      <text x="200" y="100" fill="#5a7aaa" fontSize="9" fontFamily="sans-serif">FLOW →</text>
      {/* Slope measurement */}
      <line x1="30" y1="70" x2="30" y2="110" stroke="#c8a030" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="130" y1="90" x2="130" y2="110" stroke="#c8a030" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="30" y1="110" x2="130" y2="110" stroke="#c8a030" strokeWidth="1" />
      <text x="80" y="125" textAnchor="middle" fill="#c8a030" fontSize="9" fontFamily="sans-serif">1 FOOT</text>
      <line x1="20" y1="70" x2="20" y2="90" stroke="#4a9a6a" strokeWidth="1" />
      <text x="8" y="82" fill="#4a9a6a" fontSize="9" fontFamily="sans-serif" fontWeight="bold">¼"</text>
      {/* Rules box */}
      <rect x="20" y="135" width="240" height="38" fill="#1e2428" rx="4" />
      <text x="30" y="149" fill="#7acae0" fontSize="9" fontFamily="sans-serif" fontWeight="bold">MINIMUM SLOPE REQUIRED:</text>
      <text x="30" y="161" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">Pipes 2½" and smaller → ¼" per foot (2%)</text>
      <text x="30" y="171" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">Pipes 3" and larger → ⅛" per foot (1%)</text>
    </svg>
  ),
  backflowPVB: (
    <svg viewBox="0 0 280 210" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="210" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">IRRIGATION BACKFLOW PREVENTION</text>
      {/* Water main */}
      <line x1="20" y1="80" x2="260" y2="80" stroke="#2a8a6a" strokeWidth="6" />
      <text x="140" y="68" textAnchor="middle" fill="#2a8a6a" fontSize="9" fontFamily="sans-serif">POTABLE WATER SUPPLY</text>
      {/* PVB device */}
      <rect x="100" y="65" width="80" height="30" fill="#1a3a4a" rx="4" stroke="#3a8a9a" strokeWidth="2" />
      <text x="140" y="83" textAnchor="middle" fill="#7acae0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">PVB</text>
      {/* Vent on top of PVB */}
      <line x1="140" y1="65" x2="140" y2="45" stroke="#6a8a9a" strokeWidth="3" />
      <rect x="130" y="38" width="20" height="10" fill="#3a4a5a" rx="2" />
      <text x="170" y="50" fill="#6a8a9a" fontSize="8" fontFamily="sans-serif">vent to atmosphere</text>
      {/* Irrigation line going down */}
      <line x1="140" y1="95" x2="140" y2="150" stroke="#4a6a8a" strokeWidth="5" />
      <text x="170" y="130" fill="#4a6a8a" fontSize="8" fontFamily="sans-serif">to irrigation</text>
      {/* 12 inch above highest head */}
      <line x1="60" y1="95" x2="60" y2="150" stroke="#c8a030" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="55" y1="95" x2="65" y2="95" stroke="#c8a030" strokeWidth="1" />
      <line x1="55" y1="150" x2="65" y2="150" stroke="#c8a030" strokeWidth="1" />
      <text x="20" y="128" fill="#c8a030" fontSize="8" fontFamily="sans-serif">12"</text>
      <text x="15" y="139" fill="#c8a030" fontSize="8" fontFamily="sans-serif">above</text>
      <text x="15" y="150" fill="#c8a030" fontSize="8" fontFamily="sans-serif">highest</text>
      <text x="15" y="161" fill="#c8a030" fontSize="8" fontFamily="sans-serif">head</text>
      {/* Options box */}
      <rect x="20" y="165" width="240" height="38" fill="#1e2428" rx="4" />
      <text x="30" y="178" fill="#7acae0" fontSize="9" fontFamily="sans-serif" fontWeight="bold">DEVICE REQUIRED:</text>
      <text x="30" y="190" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">Residential irrigation → PVB (minimum)</text>
      <text x="30" y="200" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">Chemical/fertilizer injection → RPZ required</text>
    </svg>
  ),
  ventClearance: (
    <svg viewBox="0 0 280 220" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="220" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">VENT TERMINATION CLEARANCES</text>
      {/* Roof outline */}
      <polygon points="20,120 140,50 260,120" fill="none" stroke="#4a5a6a" strokeWidth="2" />
      <rect x="20" y="120" width="240" height="20" fill="#2a3a4a" />
      <text x="140" y="133" textAnchor="middle" fill="#e0e8f0" fontSize="8" fontFamily="sans-serif">ROOF</text>
      {/* Vent pipe through roof */}
      <line x1="140" y1="50" x2="140" y2="20" stroke="#6a8a9a" strokeWidth="6" />
      <text x="165" y="35" fill="#6a8a9a" fontSize="9" fontFamily="sans-serif">VENT</text>
      {/* Window on side */}
      <rect x="30" y="75" width="30" height="25" fill="#1a3a5a" rx="2" stroke="#3a5a6a" strokeWidth="1" />
      <text x="45" y="90" textAnchor="middle" fill="#7acae0" fontSize="7" fontFamily="sans-serif">WIN</text>
      {/* 10 ft clearance from window */}
      <line x1="60" y1="87" x2="140" y2="87" stroke="#c85a30" strokeWidth="1" strokeDasharray="3,2" />
      <text x="100" y="80" textAnchor="middle" fill="#c85a30" fontSize="9" fontFamily="sans-serif">10 FT MIN</text>
      {/* HVAC intake */}
      <rect x="195" y="90" width="35" height="20" fill="#1a2a3a" rx="2" stroke="#3a5a6a" strokeWidth="1" />
      <text x="212" y="103" textAnchor="middle" fill="#7acae0" fontSize="7" fontFamily="sans-serif">HVAC</text>
      {/* 10 ft clearance from HVAC */}
      <line x1="140" y1="100" x2="195" y2="100" stroke="#c85a30" strokeWidth="1" strokeDasharray="3,2" />
      <text x="168" y="115" textAnchor="middle" fill="#c85a30" fontSize="9" fontFamily="sans-serif">10 FT</text>
      {/* 6 inch above roof */}
      <line x1="155" y1="50" x2="155" y2="20" stroke="#4a9a6a" strokeWidth="1" />
      <line x1="150" y1="50" x2="160" y2="50" stroke="#4a9a6a" strokeWidth="1" />
      <line x1="150" y1="20" x2="160" y2="20" stroke="#4a9a6a" strokeWidth="1" />
      <text x="175" y="38" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">6" min</text>
      <text x="175" y="48" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">above roof</text>
      <text x="140" y="212" textAnchor="middle" fill="#3a5a6a" fontSize="8" fontFamily="sans-serif">IPC 903.2 · local amendments may be stricter</text>
    </svg>
  ),
};

// ─── CODES DATA ──────────────────────────────────────────────
const CODES = [
  // GAS
  { id: 1, category: "Gas", title: "Sediment trap (dirt leg)", titleEs: "Trampa de sedimentos (dirt leg)", code: "IFGC 408.4 · UPC 1212.9", plain: "A sediment trap must be installed downstream of the appliance shutoff valve, as close to the appliance inlet as practical. The tee MUST be oriented vertically — the nipple hangs straight down and is capped at the bottom. Gas cannot flow straight through; it must make a 90-degree turn, which is what forces sediment to drop into the leg.\n\n⚠ IPC vs UPC — CHECK YOUR CITY:\n\n🔵 IPC CITIES (Dallas, Fort Worth, Plano, San Antonio, most of Texas): Two valid tee orientations — gas can enter from the top flowing down and exit the horizontal tap, OR gas can enter the horizontal tap and exit upward. Either way the nipple hangs straight down. Nipple length: \"any length\" per code, though 3 inches is the field standard.\n\n🟠 UPC CITIES (Houston, Austin): The UPC figure specifically shows gas entering from the TOP of the tee, flowing down, and exiting the horizontal tap to the appliance. Only this orientation matches the UPC figure. Additionally, the UPC explicitly requires the trap to be installed BEFORE the flex connector — between the shutoff valve and the flex. Nipple minimum: 3 inches, explicitly stated.\n\nRequired on: furnaces, water heaters, boilers. NOT required on: ranges, cooktops, outdoor grills, decorative gas logs, gas fireplaces, gas lights.", plainEs: "Se debe instalar una trampa de sedimentos aguas abajo de la válvula de cierre del aparato. El T DEBE estar vertical — el niple cuelga recto hacia abajo y está tapado. El gas debe hacer un giro de 90 grados.\n\n⚠ IPC vs UPC — VERIFICA TU CIUDAD:\n\n🔵 CIUDADES IPC (Dallas, Fort Worth, Plano, San Antonio, mayoría de Texas): Dos orientaciones válidas del T. Longitud del niple: cualquier longitud, aunque 3\" es el estándar de campo.\n\n🟠 CIUDADES UPC (Houston, Austin): La figura del UPC muestra el gas entrando POR ARRIBA. El UPC requiere la trampa ANTES del conector flexible. Mínimo del niple: 3 pulgadas explícitamente.\n\nRequerido en: hornos, calentadores, calderas. NO requerido en: estufas, parrillas, chimeneas de gas.", tags: ["gas", "sediment trap", "dirt leg", "drip leg", "appliance", "IPC", "UPC", "Houston", "Austin", "flex connector"], diagram: "sedimentTrap" },
  { id: 2, category: "Gas", title: "Appliance shutoff valve", titleEs: "Válvula de cierre del aparato", code: "IFGC 409.5 · UPC 1211.11", plain: "Each gas appliance must have its own shutoff valve located in the same room, no more than 6 feet from the appliance, upstream of any union or connector. The valve must be accessible.\n\n🔵 IPC/IFGC & 🟠 UPC: Both codes agree — accessible shutoff valve required at each appliance. No meaningful difference for Texas field work.", plainEs: "Cada aparato de gas debe tener su propia válvula de cierre en el mismo cuarto, a no más de 6 pies del aparato. La válvula debe ser accesible.\n\n🔵 IPC y 🟠 UPC: Ambos códigos están de acuerdo — se requiere válvula de cierre accesible en cada aparato.", tags: ["gas", "shutoff valve", "appliance", "6 feet"] },
  { id: 3, category: "Gas", title: "CSST bonding requirement", titleEs: "Requisito de bonding para CSST", code: "NFPA 54 7.13 · UPC 1211.2", plain: "Corrugated Stainless Steel Tubing (CSST) must be electrically bonded to the building's grounding electrode system. Many Texas cities require a bonding clamp every 6 feet along the run. Always check local amendments — this varies by city.\n\n🔵 IPC/IFGC & 🟠 UPC: Both reference NFPA 54 for CSST bonding. Requirement is the same under both codes. Local Texas city amendments commonly add the 6-foot spacing rule on top of base code.", plainEs: "La tubería CSST debe estar eléctricamente unida al sistema de tierra del edificio. Muchas ciudades de Texas requieren una abrazadera cada 6 pies.\n\n🔵 IPC y 🟠 UPC: Ambos códigos referencian NFPA 54 para el bonding de CSST. El requisito es igual en ambos.", tags: ["CSST", "gas", "bonding", "grounding"], diagram: "csst" },
  { id: 4, category: "Gas", title: "Gas pressure test requirements", titleEs: "Requisitos de prueba de presión de gas", code: "IFGC 406.4 · UPC 1213.2", plain: "Gas piping systems must be tested with air, nitrogen, or CO2. Never test with gas.\n\n🔵 IPC/IFGC: Minimum 10 PSI for 15 minutes. Many Texas IPC cities require 30 minutes.\n\n🟠 UPC (Houston, Austin): Minimum 10 PSI. Test duration and witnessed test requirements vary by local amendment — Houston typically requires 30 minutes witnessed. Always document start and end pressures.", plainEs: "Las tuberías de gas deben probarse con aire, nitrógeno o CO2. Nunca con gas.\n\n🔵 IPC/IFGC: Mínimo 10 PSI por 15 minutos. Muchas ciudades requieren 30 minutos.\n\n🟠 UPC (Houston, Austin): Mínimo 10 PSI. Houston generalmente requiere 30 minutos presenciados.", tags: ["gas", "pressure test", "10 PSI", "leak test"] },
  { id: 5, category: "Gas", title: "Gas pipe sizing — general", titleEs: "Dimensionamiento de tubería de gas", code: "IFGC 402.1 · UPC 1215.2", plain: "Gas piping must be sized to deliver gas at sufficient pressure to meet the demand of all appliances simultaneously. Sizing is based on BTU load, pipe length, and allowable pressure drop.\n\n🔵 IPC/IFGC & 🟠 UPC: Both codes require adequate sizing for simultaneous demand. Tables and methods differ slightly but the field outcome is the same — use manufacturer sizing charts or an approved method. Under-sized gas piping is a very common inspection fail.", plainEs: "La tubería de gas debe dimensionarse para satisfacer la demanda de todos los aparatos simultáneamente.\n\n🔵 IPC/IFGC y 🟠 UPC: Ambos requieren dimensionamiento adecuado. Las tablas difieren ligeramente pero el resultado de campo es el mismo.", tags: ["gas", "pipe sizing", "BTU", "pressure drop"] },
  { id: 6, category: "Gas", title: "Underground gas pipe material", titleEs: "Material de tubería de gas subterránea", code: "IFGC 404.8 · UPC 1210.1", plain: "Underground gas piping must be approved for burial. PE pipe with tracer wire is the most common choice. Black iron and steel must be coated for corrosion protection. CSST is generally NOT approved for underground burial. Minimum burial depth is 12 inches for residential.\n\n🔵 IPC/IFGC & 🟠 UPC: Both codes agree on approved materials and 12-inch minimum depth. Tracer wire on plastic pipe is required by many Texas cities regardless of code edition.", plainEs: "La tubería de gas subterránea debe ser aprobada para entierro. El tubo PE con alambre trazador es lo más común. Profundidad mínima: 12 pulgadas.\n\n🔵 IPC/IFGC y 🟠 UPC: Ambos coinciden en materiales aprobados y profundidad mínima de 12\".", tags: ["gas", "underground", "PE pipe", "burial", "tracer wire"] },
  { id: 7, category: "Gas", title: "Flexible gas connectors", titleEs: "Conectores flexibles de gas", code: "IFGC 411.1 · UPC 1212.6", plain: "Flexible gas connectors must be listed and labeled, and must not exceed 6 feet in length. They cannot be concealed inside walls, floors, or partitions. Connectors must not be kinked or twisted.\n\n🔵 IPC/IFGC & 🟠 UPC: Both codes limit flex connectors to 6 feet maximum and prohibit concealment. No meaningful difference. Replace any connector showing corrosion or damage.", plainEs: "Los conectores flexibles de gas deben estar listados y no deben exceder 6 pies de longitud. No pueden estar ocultos dentro de paredes o pisos.\n\n🔵 IPC/IFGC y 🟠 UPC: Ambos limitan los conectores a 6 pies máximo y prohíben ocultarlos.", tags: ["gas", "flex connector", "appliance", "6 feet", "concealed"] },
  // WATER HEATERS
  { id: 8, category: "Water Heaters", title: "TPR valve and discharge pipe", titleEs: "Válvula TPR y tubería de descarga", code: "IPC 504.6 · UPC 608.5", plain: "Every water heater must have a TPR valve. The discharge pipe must be the same size as the valve outlet and terminate in a visible location.\n\n🔵 IPC CITIES (Dallas, Fort Worth, most of Texas): Discharge must terminate no more than 6 inches above the floor. Can discharge to floor, pan, waste receptor, or outdoors.\n\n🟠 UPC CITIES (Houston, Austin): Discharge must terminate minimum 6 inches above floor AND maximum 24 inches above floor — a tighter window than IPC. Cannot discharge directly into a pan — must have an air gap. Both codes: NO threads on discharge end, pipe must not be trapped, must flow by gravity.", plainEs: "Cada calentador de agua debe tener válvula TPR. La tubería de descarga debe ser del mismo tamaño que la salida de la válvula.\n\n🔵 CIUDADES IPC: La descarga debe terminar a no más de 6 pulgadas del piso.\n\n🟠 CIUDADES UPC (Houston, Austin): La descarga debe terminar entre 6 y 24 pulgadas del piso — una ventana más estrecha que el IPC. No puede descargar directamente en una bandeja.", tags: ["TPR", "water heater", "relief valve", "safety", "discharge", "IPC", "UPC"], diagram: "tprValve" },
  { id: 9, category: "Water Heaters", title: "Thermal expansion tank", titleEs: "Tanque de expansión térmica", code: "IPC 607.3 · UPC 608.3", plain: "Required whenever a backflow preventer, check valve, or PRV creates a closed system.\n\n🔵 IPC CITIES: Required specifically when a closed system exists with STORAGE water heating equipment. If you have a tankless water heater with no storage buffer, the IPC technically does not require an expansion tank — but many Texas cities require it anyway via local amendment.\n\n🟠 UPC CITIES (Houston, Austin): Required on ALL closed systems regardless of water heater type — tankless included. The UPC draws no distinction. Both codes: tank installs on the cold water supply side, downstream of all check valves and PRVs.", plainEs: "Requerido cuando un backflow preventer, válvula de retención o PRV crea un sistema cerrado.\n\n🔵 CIUDADES IPC: Técnicamente requerido solo con calentadores de almacenamiento, aunque muchas ciudades lo exigen en todos.\n\n🟠 CIUDADES UPC (Houston, Austin): Requerido en TODOS los sistemas cerrados sin importar el tipo de calentador — incluyendo calentadores sin tanque.", tags: ["water heater", "expansion tank", "closed system", "backflow", "tankless", "IPC", "UPC"] },
  { id: 10, category: "Water Heaters", title: "Garage installation — 18 inch rule", titleEs: "Instalación en garaje — regla de 18 pulgadas", code: "IPC 305.5 · UPC 507.3", plain: "Water heaters in garages must be elevated so the ignition source is at least 18 inches above the garage floor. This prevents ignition of gasoline vapors.\n\n🔵 IPC/IFGC & 🟠 UPC: Both codes agree — 18-inch minimum elevation required. A proper platform or listed stand must be used. Most Texas cities strictly enforce this regardless of IPC or UPC. The water heater pan is also required in garage installations.", plainEs: "Los calentadores de agua en garajes deben elevarse para que la fuente de ignición esté al menos 18 pulgadas sobre el piso del garaje.\n\n🔵 IPC y 🟠 UPC: Ambos códigos están de acuerdo — se requiere elevación mínima de 18 pulgadas.", tags: ["water heater", "garage", "18 inches", "ignition", "elevation"], diagram: "waterHeaterGarage" },
  { id: 11, category: "Water Heaters", title: "Attic installation requirements", titleEs: "Requisitos de instalación en ático", code: "IPC 502.3 · UPC 507.2", plain: "Water heaters in attics require: a level working platform at least 24 inches wide on the service side, a continuous pan with minimum 3/4 inch drain line to a visible location, a clear 20x30 inch access opening, a light with switch at the access point, and 18-inch clearance on the service side.\n\n🔵 IPC & 🟠 UPC: Platform, pan, access, and light requirements are consistent between both codes. Strictly checked in Texas by both city and third-party inspectors.", plainEs: "Los calentadores en áticos requieren: plataforma de 24\" de ancho, bandeja continua con drenaje de 3/4\", abertura de acceso de 20x30\", luz con interruptor y 18\" de espacio libre.\n\n🔵 IPC y 🟠 UPC: Requisitos de plataforma, bandeja, acceso y luz son consistentes en ambos códigos.", tags: ["water heater", "attic", "platform", "pan", "access", "light"] },
  { id: 12, category: "Water Heaters", title: "Water heater pan and drain", titleEs: "Bandeja y drenaje del calentador de agua", code: "IPC 504.7 · UPC 507.4", plain: "A pan with a 3/4 inch minimum drain line is required when a water heater is located where leakage could cause property damage. Pan drain must run to a suitable visible location.\n\n🔵 IPC: Pan required where damage could occur — floor, waste receptor, or outdoors are all acceptable termination points.\n\n🟠 UPC (Houston, Austin): Pan required in same circumstances, but UPC is stricter on termination — drain must terminate to an indirect waste receptor or other approved location visible to the occupant. Many Texas cities require pans in ALL locations regardless of code.", plainEs: "Se requiere una bandeja con drenaje mínimo de 3/4\" cuando una fuga podría causar daños.\n\n🔵 IPC: Requerida donde pueda ocurrir daño. Termina en piso, receptor o exterior.\n\n🟠 UPC (Houston, Austin): Mismas circunstancias, pero el UPC es más estricto sobre el punto de terminación.", tags: ["water heater", "pan", "drain", "leak", "3/4 inch"] },
  { id: 13, category: "Water Heaters", title: "Water heater seismic strapping", titleEs: "Sujeción sísmica del calentador", code: "IPC 507.2 · UPC 507.5", plain: "Water heaters must be strapped or braced in designated seismic zones.\n\n🔵 IPC & 🟠 UPC: Both codes require seismic strapping where applicable. In Texas, the seismic risk is generally low by code maps, but many third-party inspectors (Crossroads, Roadrunner, Veritas) require double strapping on units 40 gallons and larger regardless, especially in garages.", plainEs: "Los calentadores de agua deben estar sujetados en zonas sísmicas.\n\n🔵 IPC y 🟠 UPC: Ambos requieren sujeción sísmica donde aplique. En Texas, muchos inspectores de terceros requieren doble sujeción en unidades de 40 galones o más.", tags: ["water heater", "strapping", "seismic", "garage", "40 gallon"] },
  // DRAINAGE
  { id: 14, category: "Drainage", title: "Horizontal drain slope", titleEs: "Pendiente de drenaje horizontal", code: "IPC 704.1 · UPC 708.0", plain: "Horizontal drainage pipes must slope toward the point of disposal.\n\n🔵 IPC & 🟠 UPC: Both codes agree on the same minimum slopes — ¼ inch per foot for pipes 2½ inches and smaller, ⅛ inch per foot for pipes 3 inches and larger. No meaningful difference between codes on this one. No horizontal drain shall be installed level.", plainEs: "Las tuberías de drenaje horizontales deben tener pendiente hacia el punto de disposición.\n\n🔵 IPC y 🟠 UPC: Ambos códigos coinciden — ¼\" por pie para tuberías de 2½\" o menores, ⅛\" por pie para 3\" o más.", tags: ["drain", "slope", "horizontal", "grade", "¼ inch"], diagram: "drainSlope" },
  { id: 15, category: "Drainage", title: "Cleanout spacing and access", titleEs: "Espaciado y acceso de limpiezas", code: "IPC 708.1 · UPC 719.0", plain: "Cleanouts are required at each change of direction greater than 45 degrees and at maximum 100-foot intervals in horizontal drainage lines.\n\n🔵 IPC & 🟠 UPC: Both codes require cleanouts at direction changes and at maximum 100-foot intervals. Both require accessible installation in the direction of flow. A cleanout within 5 feet of the building foundation is required by many Texas cities as a local amendment.", plainEs: "Se requieren limpiezas en cada cambio de dirección mayor de 45° y a intervalos máximos de 100 pies.\n\n🔵 IPC y 🟠 UPC: Ambos códigos requieren limpiezas en cambios de dirección y cada 100 pies máximo.", tags: ["cleanout", "access", "drain", "100 feet", "45 degrees"] },
  { id: 16, category: "Drainage", title: "Fixture unit values (DFU)", titleEs: "Valores de unidades de accesorios (DFU)", code: "IPC Table 709.1 · UPC Table 702.1", plain: "Each fixture is assigned a Drainage Fixture Unit (DFU) value used to size drains and sewers.\n\n🔵 IPC: Toilet = 4, Shower = 2, Lavatory = 1, Kitchen sink = 2, Clothes washer = 3, Floor drain = 2, Bathtub = 2, Dishwasher = 2, Urinal = 4.\n\n🟠 UPC (Houston, Austin): Values are similar but the UPC table uses slightly different numbers for some fixtures. Always use the table from the correct code for your city when sizing.", plainEs: "A cada accesorio se le asigna un valor DFU para dimensionar drenajes.\n\n🔵 IPC: Inodoro=4, Ducha=2, Lavabo=1, Fregadero=2, Lavadora=3, Drenaje piso=2, Bañera=2.\n\n🟠 UPC (Houston, Austin): Los valores son similares pero la tabla del UPC puede diferir ligeramente en algunos accesorios.", tags: ["DFU", "fixture units", "drain sizing", "toilet", "shower"] },
  { id: 17, category: "Drainage", title: "Trap arm distance (trap to vent)", titleEs: "Distancia del brazo de trampa (trampa al venteo)", code: "IPC Table 909.1 · UPC Table 1007.3", plain: "Maximum trap arm distances from trap weir to vent.\n\n🔵 IPC: 1¼\" pipe = 30\", 1½\" = 42\", 2\" = 60\", 3\" = 72\", 4\" = 10 ft.\n\n🟠 UPC (Houston, Austin): Distances are based on pipe diameter as a multiple — generally 2½x the pipe diameter for the maximum horizontal distance. This can produce slightly different numbers than the IPC table. When working in Houston or Austin, use UPC Table 1007.3, not IPC Table 909.1.", plainEs: "Distancias máximas del brazo de trampa hasta el venteo.\n\n🔵 IPC: 1¼\"=30\", 1½\"=42\", 2\"=60\", 3\"=72\", 4\"=10 pies.\n\n🟠 UPC (Houston, Austin): Las distancias se basan en múltiplos del diámetro de la tubería. Usa la Tabla 1007.3 del UPC en Houston o Austin.", tags: ["trap arm", "vent", "distance", "drain", "P-trap"], diagram: "trapArm" },
  { id: 18, category: "Drainage", title: "Grease interceptor requirements", titleEs: "Requisitos del interceptor de grasa", code: "IPC 1003.3 · UPC 1017.0", plain: "Grease interceptors are required on all food service establishments. The interceptor must be sized based on fixture load and flow rate and must be accessible for cleaning and inspection.\n\n🔵 IPC & 🟠 UPC: Both codes require grease interceptors on food service facilities. Sizing methods differ slightly — IPC uses flow rate, UPC uses fixture unit method. Local health codes and the city fire marshal may add requirements on top of base code.", plainEs: "Se requieren interceptores de grasa en todos los establecimientos de servicio de alimentos.\n\n🔵 IPC y 🟠 UPC: Ambos códigos los requieren. El método de dimensionamiento difiere ligeramente — IPC usa tasa de flujo, UPC usa unidades de accesorio.", tags: ["grease interceptor", "restaurant", "commercial kitchen", "grease trap"] },
  { id: 19, category: "Drainage", title: "Floor drain requirements", titleEs: "Requisitos de drenaje de piso", code: "IPC 412.2 · UPC 411.0", plain: "Floor drains are required in commercial kitchens, laundry rooms, and mechanical rooms containing water heaters or HVAC equipment. Each floor drain must be connected to a trap.\n\n🔵 IPC & 🟠 UPC: Both codes agree on where floor drains are required and that each must have a trap. Floor drains subject to evaporation must have a trap primer or trap seal protection device under both codes.", plainEs: "Se requieren drenajes de piso en cocinas comerciales, cuartos de lavandería y cuartos mecánicos. Cada drenaje debe estar conectado a una trampa.\n\n🔵 IPC y 🟠 UPC: Ambos códigos coinciden en los requisitos de drenaje de piso.", tags: ["floor drain", "trap", "commercial", "mechanical room", "laundry"] },
  // VENTING
  { id: 20, category: "Venting", title: "Minimum vent pipe diameter", titleEs: "Diámetro mínimo de tubería de venteo", code: "IPC 903.1 · UPC 901.1", plain: "No vent pipe shall be less than 1¼ inches in diameter. Main stacks require a minimum of 3 inches.\n\n🔵 IPC & 🟠 UPC: Both codes set 1¼ inch as the minimum individual vent size. Both require the main stack to be at least 3 inches. No meaningful difference for Texas field work.", plainEs: "Ninguna tubería de venteo debe tener menos de 1¼\" de diámetro. Las columnas principales requieren mínimo 3\".\n\n🔵 IPC y 🟠 UPC: Ambos establecen 1¼\" como mínimo y 3\" para la columna principal.", tags: ["vent", "pipe size", "diameter", "stack", "1¼ inch"] },
  { id: 21, category: "Venting", title: "Vent termination clearances", titleEs: "Distancias de terminación del venteo", code: "IPC 903.2 · UPC 906.2", plain: "Vent pipes must terminate at least 6 inches above the roof surface.\n\n🔵 IPC & 🟠 UPC: Both codes require 6 inches above roof and 10 feet horizontally from any door, window, or air intake when terminating less than 2 feet above the opening. No meaningful difference. Third-party inspectors in Texas measure this to the inch.", plainEs: "Las tuberías de venteo deben terminar al menos 6\" sobre el techo y 10 pies horizontalmente de puertas, ventanas o entradas de aire.\n\n🔵 IPC y 🟠 UPC: Ambos requieren 6\" sobre el techo y 10 pies de separación horizontal.", tags: ["vent", "termination", "roof", "clearance", "10 feet"], diagram: "ventClearance" },
  { id: 22, category: "Venting", title: "Wet venting requirements", titleEs: "Requisitos de venteo húmedo", code: "IPC 908.1 · UPC 908.0", plain: "A wet vent may serve as both a drain and a vent for fixtures on the same floor level.\n\n🔵 IPC: Wet vent pipe must be one pipe size larger than required for the drain alone. Limited to bathroom groups.\n\n🟠 UPC (Houston, Austin): UPC permits wet venting but with different sizing requirements — the UPC is generally more restrictive on fixture combinations that can share a wet vent. When working in Houston or Austin, verify your specific wet vent configuration is permitted under UPC 908.0. You cannot wet vent kitchen sinks under either code.", plainEs: "Un venteo húmedo puede servir como drenaje y venteo.\n\n🔵 IPC: La tubería debe ser un tamaño más grande. Limitado a grupos de baño.\n\n🟠 UPC (Houston, Austin): Permite venteo húmedo pero con requisitos de dimensionamiento diferentes y más restrictivos en combinaciones de accesorios.", tags: ["wet vent", "vent", "bathroom group", "drain", "pipe size"] },
  { id: 23, category: "Venting", title: "Air admittance valves (AAV)", titleEs: "Válvulas de admisión de aire (AAV)", code: "IPC 918.1 · UPC 905.0", plain: "AAVs may be used in lieu of conventional venting for individual fixtures.\n\n🔵 IPC CITIES: AAVs are permitted for individual fixtures and branch vents. Must be listed, installed in accessible locations, with at least 4 inches of air above the trap weir.\n\n🟠 UPC CITIES (Houston, Austin): The UPC historically was more restrictive on AAVs than the IPC. AAVs are permitted in the UPC but only in specific applications. Houston and Austin may have local amendments further restricting AAV use. ALWAYS verify locally before installing an AAV in Houston or Austin.", plainEs: "Las AAVs pueden usarse en lugar del venteo convencional.\n\n🔵 CIUDADES IPC: Permitidas para accesorios individuales. Deben estar listadas y ser accesibles.\n\n🟠 CIUDADES UPC (Houston, Austin): El UPC es históricamente más restrictivo. Verifique siempre localmente antes de instalar una AAV en Houston o Austin.", tags: ["AAV", "air admittance valve", "vent", "studor", "island sink"] },
  // WATER SUPPLY
  { id: 24, category: "Water Supply", title: "Pressure reducing valve (PRV)", titleEs: "Válvula reductora de presión (PRV)", code: "IPC 604.8 · UPC 608.2", plain: "Where supply pressure exceeds 80 PSI, a PRV is required on the building water service. Set to deliver 60–80 PSI downstream. PRV must be accessible with a union for easy replacement.\n\n🔵 IPC & 🟠 UPC: Both codes trigger the PRV requirement at 80 PSI and agree on placement and accessibility. The UPC (Section 608.2) also explicitly requires a strainer upstream of the PRV — the IPC does not mandate this, though it is good practice under both codes.", plainEs: "Cuando la presión supera 80 PSI, se requiere una PRV. Configure para entregar 60–80 PSI aguas abajo.\n\n🔵 IPC y 🟠 UPC: Ambos activan el requisito de PRV a 80 PSI. El UPC también requiere explícitamente un colador aguas arriba de la PRV.", tags: ["pressure", "PRV", "water supply", "80 PSI", "pressure reducing"] },
  { id: 25, category: "Water Supply", title: "Individual fixture shutoff valves", titleEs: "Válvulas de cierre individuales por accesorio", code: "IPC 606.1 · UPC 605.5", plain: "Accessible shutoff valves must be provided for each plumbing fixture — lavatories, sinks, water closets, dishwashers, washing machines, and ice makers.\n\n🔵 IPC & 🟠 UPC: Both codes require individual shutoff valves at each fixture. No meaningful difference. Many Texas cities add local amendments requiring isolation valves at every fixture, including both IPC and UPC jurisdictions.", plainEs: "Se deben proporcionar válvulas de cierre accesibles para cada accesorio de plomería.\n\n🔵 IPC y 🟠 UPC: Ambos códigos requieren válvulas individuales por accesorio. Sin diferencia significativa.", tags: ["shutoff valve", "fixture", "isolation", "individual", "accessible"] },
  { id: 26, category: "Water Supply", title: "Water service pipe materials", titleEs: "Materiales de tubería de servicio de agua", code: "IPC 605.3 · UPC 604.1", plain: "Water service pipe from meter to building must be approved materials.\n\n🔵 IPC CITIES: Type K or L copper, HDPE (PE 4710), PVC (AWWA C900), or PEX where permitted. Many Texas IPC cities restrict to copper within a set distance of the meter.\n\n🟠 UPC CITIES (Houston, Austin): Type K or L copper, HDPE, PVC. Houston is particularly strict — copper is the preferred material near the meter. PEX is allowed inside the structure under both codes but check local amendments for underground service.", plainEs: "La tubería desde el medidor hasta el edificio debe ser de materiales aprobados.\n\n🔵 CIUDADES IPC: Cobre Tipo K o L, HDPE, PVC o PEX donde esté permitido.\n\n🟠 CIUDADES UPC (Houston, Austin): Cobre Tipo K o L, HDPE, PVC. Houston prefiere cobre cerca del medidor.", tags: ["water service", "pipe material", "copper", "HDPE", "PVC", "PEX"] },
  { id: 27, category: "Water Supply", title: "Water hammer arrestors", titleEs: "Arrestadores de golpe de ariete", code: "IPC 604.9 · UPC 609.10", plain: "Required where quick-closing valves are used — dishwashers, washing machines, solenoid valves. Arrestors must be listed per ASSE 1010. Install on both hot and cold supply lines.\n\n🔵 IPC & 🟠 UPC: Both codes require water hammer arrestors at quick-closing valves and reference ASSE 1010 for listing. Size per the ASSE 1010 fixture unit load tables under both codes.", plainEs: "Requeridos donde se usan válvulas de cierre rápido. Deben estar listados per ASSE 1010.\n\n🔵 IPC y 🟠 UPC: Ambos requieren arrestadores en válvulas de cierre rápido y referencian ASSE 1010.", tags: ["water hammer", "arrestor", "washing machine", "dishwasher", "solenoid", "ASSE 1010"] },
  { id: 28, category: "Water Supply", title: "Showerhead flow rate", titleEs: "Caudal de cabezal de ducha", code: "IPC 2024 408.2 · UPC 402.2", plain: "🔵 IPC 2021 CITIES (most of Texas): Maximum showerhead flow is 2.5 GPM.\n\n🔵 IPC 2024 CITIES (Plano, The Colony, Flower Mound, Frisco, Killeen, McAllen, Sugar Land, San Antonio): Maximum is 2.0 GPM.\n\n🟠 UPC CITIES (Houston, Austin): UPC Section 402.2 limits showerheads to 2.0 GPM — Houston and Austin have been at 2.0 GPM longer than most IPC cities. Always verify fixture specs before purchasing.", plainEs: "🔵 CIUDADES IPC 2021 (mayoría de Texas): Caudal máximo de ducha 2.5 GPM.\n\n🔵 CIUDADES IPC 2024 (Plano, Flower Mound, Frisco, Killeen, McAllen, etc.): Máximo 2.0 GPM.\n\n🟠 CIUDADES UPC (Houston, Austin): UPC limita a 2.0 GPM — Houston y Austin ya estaban en 2.0 GPM antes que la mayoría de ciudades IPC.", tags: ["showerhead", "flow rate", "GPM", "IPC 2024", "UPC", "water conservation", "Houston", "Austin"] },
  { id: 29, category: "Water Supply", title: "Hot water recirculation systems", titleEs: "Sistemas de recirculación de agua caliente", code: "IPC 607.2 · UPC 610.0", plain: "Where hot water piping exceeds 100 feet in developed length, a recirculation system or heat-traced piping is required in many jurisdictions.\n\n🔵 IPC & 🟠 UPC: Both codes address recirculation but treat it as a design requirement rather than a hard trigger at 100 feet in the base code. The enforcement comes from local amendments. Some Texas IPC cities (McKinney, Frisco) require recirculation at 50 feet. Austin (UPC) requires recirculation on all new residential construction.", plainEs: "Cuando la tubería de agua caliente excede 100 pies, se requiere un sistema de recirculación en muchas jurisdicciones.\n\n🔵 IPC y 🟠 UPC: Ambos abordan la recirculación. Austin (UPC) requiere recirculación en toda construcción residencial nueva.", tags: ["recirculation", "hot water", "100 feet", "50 feet", "heat trace"] },
  // BACKFLOW
  { id: 30, category: "Backflow", title: "Irrigation backflow prevention", titleEs: "Prevención de reflujo en irrigación", code: "IPC 608.16.5 · UPC 603.5.7", plain: "All lawn irrigation systems connected to potable water must have a backflow preventer.\n\n🔵 IPC CITIES: PVB is the minimum for residential irrigation. RPZ required for chemical injection applications.\n\n🟠 UPC CITIES (Houston, Austin): UPC requires RPZ on all irrigation systems connected to potable water in many applications — the UPC is generally more aggressive on backflow protection for irrigation than the IPC. Houston requires RPZ on all commercial irrigation. Always check with the local water utility, as TCEQ rules also apply statewide.", plainEs: "Todos los sistemas de irrigación conectados a agua potable deben tener un preventor de reflujo.\n\n🔵 CIUDADES IPC: PVB es el mínimo para irrigación residencial.\n\n🟠 CIUDADES UPC (Houston, Austin): El UPC generalmente requiere protección más agresiva. Houston requiere RPZ en toda irrigación comercial.", tags: ["backflow", "irrigation", "PVB", "RPZ", "sprinkler", "IPC", "UPC"], diagram: "backflowPVB" },
  { id: 31, category: "Backflow", title: "Hose bibb vacuum breaker", titleEs: "Interruptor de vacío para toma de manguera", code: "IPC 608.15.4.1 · UPC 603.4.11", plain: "All outdoor hose connection sillcocks must have an integral or field-installed vacuum breaker. Non-removable type is required.\n\n🔵 IPC & 🟠 UPC: Both codes require vacuum breakers on all hose bibbs. This is one of the most commonly missed items on inspections under both codes. Non-removable type is required under both.", plainEs: "Todos los grifos de manguera al aire libre deben tener un interruptor de vacío no removible.\n\n🔵 IPC y 🟠 UPC: Ambos códigos lo requieren. Es uno de los ítems más frecuentemente omitidos en inspecciones.", tags: ["hose bibb", "vacuum breaker", "sillcock", "backflow", "outdoor"] },
  { id: 32, category: "Backflow", title: "Reduced pressure zone (RPZ) assembly", titleEs: "Ensamble de zona de presión reducida (RPZ)", code: "IPC 608.13.2 · UPC 603.5.9", plain: "RPZ assemblies are required for high-hazard applications. RPZ must be tested annually by a certified tester, installed in an accessible above-grade location.\n\n🔵 IPC: RPZ required for high-hazard applications — chemical injection, industrial connections, medical equipment.\n\n🟠 UPC (Houston, Austin): UPC generally requires RPZ in more situations than the IPC for irrigation and industrial connections. Houston requires RPZ on all commercial irrigation regardless. Both codes: annual testing by certified backflow tester required.", plainEs: "Los ensambles RPZ son requeridos para aplicaciones de alto riesgo y deben probarse anualmente.\n\n🔵 IPC: RPZ requerido para aplicaciones de alto riesgo — inyección de químicos, equipos industriales.\n\n🟠 UPC (Houston, Austin): El UPC requiere RPZ en más situaciones. Houston lo requiere en toda irrigación comercial.", tags: ["RPZ", "backflow", "commercial", "high hazard", "annual test"] },
  // FIXTURES
  { id: 33, category: "Fixtures", title: "Shower pressure balance valves", titleEs: "Válvulas de balance de presión en ducha", code: "IPC 412.3 · UPC 408.3", plain: "All shower and tub/shower combination controls must be pressure-balancing or thermostatic mixing valves. Maximum delivered water temperature is 120°F.\n\n🔵 IPC & 🟠 UPC: Both codes require pressure-balance or thermostatic valves on all showers and set 120°F as the maximum delivered temperature. Required in all new construction and replacements under both codes. No meaningful difference.", plainEs: "Todos los controles de ducha deben ser válvulas de balance de presión o termostáticas. Temperatura máxima: 120°F.\n\n🔵 IPC y 🟠 UPC: Ambos requieren válvulas de balance de presión o termostáticas y establecen 120°F como temperatura máxima.", tags: ["shower", "valve", "scald", "pressure balance", "thermostatic", "120°F"] },
  { id: 34, category: "Fixtures", title: "Water closet clearances", titleEs: "Espacios libres del inodoro", code: "IPC 405.3 · UPC 407.5", plain: "Minimum clearances from toilet centerline to walls and obstructions.\n\n🔵 IPC CITIES: 15 inches from centerline to any side wall or obstruction, 21 inches clear in front.\n\n🟠 UPC CITIES (Houston, Austin): UPC requires 15 inches from centerline to side wall AND 24 inches clear in front — 3 inches more than the IPC. If you're roughing in a toilet in Houston or Austin and you leave only 21 inches in front, it will fail. Rough-in placement matters — measure before you pour.", plainEs: "🔵 CIUDADES IPC: 15\" del centro a la pared lateral, 21\" libres al frente.\n\n🟠 CIUDADES UPC (Houston, Austin): 15\" del centro a la pared lateral, pero 24\" libres al frente — 3 pulgadas más que el IPC. Si dejas solo 21\" en Houston o Austin, fallará la inspección.", tags: ["toilet", "water closet", "clearance", "15 inches", "21 inches", "24 inches", "UPC", "IPC"] },
  { id: 35, category: "Fixtures", title: "Minimum shower size", titleEs: "Tamaño mínimo de ducha", code: "IPC 417.4 · UPC 411.7", plain: "Shower compartments must meet minimum finished interior dimensions.\n\n🔵 IPC CITIES: Minimum 30 inches in any direction AND minimum 900 square inches of floor area.\n\n🟠 UPC CITIES (Houston, Austin): UPC requires minimum 30 inches in any direction AND minimum 1,024 square inches of floor area — roughly a 32x32 inch shower. The IPC allows a 30x30 (900 sq in) but the UPC does not. If you're tiling a shower in Houston or Austin, 30x30 will fail.", plainEs: "🔵 CIUDADES IPC: Mínimo 30\" en cualquier dirección y 900 pulgadas cuadradas de área.\n\n🟠 CIUDADES UPC (Houston, Austin): Mínimo 30\" en cualquier dirección pero 1,024 pulgadas cuadradas de área — una ducha de 32x32\". Una ducha de 30x30 pasará en ciudades IPC pero fallará en Houston o Austin.", tags: ["shower", "size", "minimum", "30 inches", "900 square inches", "1024", "UPC", "IPC"] },
  // DRAINAGE
  { id: 36, category: "Drainage", title: "Tracer wire — buried plastic pipe (IPC 2024)", titleEs: "Alambre trazador — tubería plástica enterrada (IPC 2024)", code: "IPC 2024 305.6", plain: "The 2024 IPC requires tracer wire on all buried plastic sewer piping. Wire must be continuous and accessible at each end.\n\n🔵 IPC 2024 CITIES ONLY (Plano, Frisco, The Colony, Flower Mound, Killeen, McAllen, Sugar Land, San Antonio): Required by code. Not required under IPC 2021 as a base code mandate, though many cities required it locally before 2024.\n\n🟠 UPC CITIES (Houston, Austin): The UPC does not have an equivalent tracer wire requirement in the base code, but Houston requires it by local amendment. Always check with the city.", plainEs: "El IPC 2024 requiere alambre trazador en toda tubería de alcantarillado plástica enterrada.\n\n🔵 SOLO CIUDADES IPC 2024 (Plano, Frisco, The Colony, etc.): Requerido por código.\n\n🟠 CIUDADES UPC (Houston, Austin): El UPC base no lo requiere, pero Houston lo exige por enmienda local.", tags: ["tracer wire", "buried pipe", "sewer", "IPC 2024", "plastic pipe"] },
];

// ─── JURISDICTIONS (abbreviated — same as before, keeping key cities) ─────────
const JURISDICTIONS = {
  "Allen": { code: "IPC 2021", population: "107K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "All permits through CSS portal before work begins", "Call (214) 509-4130 between 8-9 AM on day of inspection for time window", "Backflow prevention required — irrigation backflow tester must be licensed", "Call 811 before any excavation for underground plumbing"], inspector: "Allen Building & Permitting", phone: "(214) 509-4130", directLine: "(214) 509-4130", scheduleHours: "8–9 AM day of inspection", permitRequired: true, permitUrl: "cityofallen.org/building-permitting", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Amarillo": { code: "IPC 2021", population: "200K", region: "Texas Panhandle", amendments: ["Roof vents must terminate with a listed and labeled cap per manufacturer specs", "Clothes dryer exhaust: no screens at termination, backdraft damper required", "Pressure test required — document start and end PSI", "Review Ordinance 7101 for all local amendments"], inspector: "Amarillo Building Safety", phone: "(806) 378-3033", directLine: "(806) 378-3033", scheduleHours: "Mon–Fri 7:30AM–5PM", permitRequired: true, permitUrl: "amarillo.gov/building-safety", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Arlington": { code: "IPC 2021", population: "394K", region: "North Texas (DFW)", amendments: ["All permits through Accela online portal — required before work begins", "Inspection requests must be submitted before 7AM on the day needed", "NCTCOG regional amendments apply"], inspector: "Arlington Development Services", phone: "(817) 459-6502", directLine: "(817) 459-6504", scheduleHours: "Submit before 7AM for same-day inspection", emergency: "(817) 459-6502", permitRequired: true, permitUrl: "arlingtontx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Code Solutions Inc.", "Bureau Veritas"] },
  "Austin": { code: "UPC 2021 ⚠", population: "978K", region: "Central Texas", amendments: ["⚠ Austin uses the UPC — NOT the IPC", "Reclaimed water rough-in required on all new construction", "Low-flow fixtures: 1.28 GPF max on toilets", "Green building code overlay applies in designated zones"], inspector: "Austin Development Services", phone: "(512) 978-4000", directLine: "(512) 978-4000", scheduleHours: "Online via AB+C Portal or by phone", permitRequired: true, permitUrl: "austintexas.gov/permits", thirdParty: ["Veritas Inspections", "Crossroads Inspections", "Fox Energy Specialists"], warning: "Austin uses the UPC, not the IPC. Surrounding cities use the IPC. Always confirm before pulling a permit near Austin city limits." },
  "Bedford": { code: "IPC 2021", population: "49K", region: "North Texas (HEB Area)", amendments: ["NCTCOG regional amendments apply", "HEB area — Hurst, Euless, Bedford share similar code environment", "Thermal expansion tank required on all closed water systems", "Water heater elevation required in garage — 18\" minimum"], inspector: "Bedford Building Inspections", phone: "(817) 952-2200", directLine: "(817) 952-2200", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "bedfordtx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Burleson": { code: "IPC 2021", population: "50K", region: "North Texas (Fort Worth suburb)", amendments: ["NCTCOG regional amendments apply", "Johnson/Tarrant county line — verify which county governs your address", "Fire code review required before Fire Marshal submittal", "Thermal expansion tank required on all closed water systems"], inspector: "Burleson Building Permits & Inspections", phone: "(817) 426-9600", directLine: "(817) 426-9600", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "burlesontx.com/building", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"] },
  "Carrollton": { code: "IPC 2021", population: "135K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Permits required for MEP system repairs and replacements", "Thermal expansion tank required on all closed water systems", "CSST bonding required per NFPA 54"], inspector: "Carrollton Building Inspection", phone: "(972) 466-3016", directLine: "(972) 466-3016", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofcarrollton.com/building-inspection", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Cedar Park": { code: "IPC 2021", population: "82K", region: "Central Texas", amendments: ["IPC adopted — switched from UPC", "CPPID utility pre-approval required for new water service connections", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections"], inspector: "Cedar Park Development Services", phone: "(512) 401-5000", directLine: "(512) 401-5000", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cedarparktexas.gov/permits", thirdParty: ["Fox Energy Specialists", "Crossroads Inspections", "Bureau Veritas"] },
  "Conroe": { code: "IPC 2021", population: "106K", region: "Greater Houston", amendments: ["All permits and inspections through OpenGov portal (effective Dec 8, 2025)", "Morning inspections: schedule before 7AM same day", "Afternoon inspections: schedule 7AM–noon same day", "Montgomery County MUD rules may apply in outer areas"], inspector: "Conroe Building Inspections", phone: "(936) 522-3610", directLine: "(936) 522-3616", scheduleHours: "AM inspections before 7AM | PM inspections 7AM–noon", permitRequired: true, permitUrl: "cityofconroe.org/building-inspections", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Dallas": { code: "IPC 2021", population: "1.3M", region: "North Texas", amendments: ["Thermal expansion tanks mandatory on all closed water systems", "PEX-A only for in-slab (PEX-B not allowed)", "Isolation valve required at each individual fixture", "Water heater must be elevated 18\" off floor in garage", "CSST bonding required per NFPA 54"], inspector: "Dallas Development Services", phone: "(214) 948-4480", directLine: "(214) 948-4480", scheduleHours: "Mon–Fri 7:30AM–4:30PM", permitRequired: true, permitUrl: "dallascityhall.com/permits", thirdParty: ["Crossroads Inspections", "Roadrunner Inspections", "Master Code", "Bureau Veritas"] },
  "Denton": { code: "IPC 2021", population: "148K", region: "North Texas", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "CSST must be bonded per NFPA 54", "Underground plastic sewer piping requires tracer wire"], inspector: "Denton Development Services", phone: "(940) 349-8360", directLine: "(940) 349-8360", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofdenton.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },
  "El Paso": { code: "IPC 2021", population: "678K", region: "Far West Texas", amendments: ["Water conservation fixtures mandatory on all new construction", "Seismic zone — water heater strapping required", "El Paso Water approval required before water service connections", "Gas pressure test: 10 PSI minimum, witnessed by inspector"], inspector: "El Paso Development Services", phone: "(915) 212-0104", directLine: "(915) 212-0104", scheduleHours: "Mon–Fri 7:30AM–4:30PM", permitRequired: true, permitUrl: "elpasotexas.gov/development-services", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Euless": { code: "IPC 2021", population: "56K", region: "North Texas (HEB Area)", amendments: ["NCTCOG regional amendments apply", "HEB area — Hurst, Euless, Bedford share similar code environment", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation systems"], inspector: "Euless Building Inspections", phone: "(817) 685-1400", directLine: "(817) 685-1400", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "eulesscityhall.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Flower Mound": { code: "IPC 2024 ⚠", population: "82K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective October 1, 2025", "Emergency permits: call (972) 874-6355 before 3:30PM — inspector arrives within 1 hour", "Water heater pan required wherever leakage could cause property damage", "Showerhead flow limited to 2.0 GPM — IPC 2024"], inspector: "Flower Mound Building Inspections", phone: "(972) 874-6355", directLine: "(972) 874-6355", scheduleHours: "Inspector office hours 7:30–8:30AM Mon–Fri | Emergency: call before 3:30PM", emergency: "(972) 874-6355 (before 3:30PM)", permitRequired: true, permitUrl: "flowermound.gov/building", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "Flower Mound is on IPC 2024 effective October 1, 2025. Key changes: 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Fort Worth": { code: "IPC 2021", population: "935K", region: "North Texas", amendments: ["Copper or CPVC only for water service pipe inside slab", "Water heater pan and drain required in all locations", "Shower valve must be pressure-balance or thermostatic", "Cleanout required within 5 ft of building foundation"], inspector: "Fort Worth Development", phone: "(817) 392-2222", directLine: "(817) 392-2222", scheduleHours: "Mon–Fri 7:30AM–4:30PM", permitRequired: true, permitUrl: "fortworthtexas.gov/permits", thirdParty: ["Code Solutions Inc.", "Master Code", "Bureau Veritas", "Crossroads Inspections"] },
  "Frisco": { code: "IPC 2024 ⚠", population: "230K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective March 1, 2026", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer piping", "Thermal expansion tank required on all water heater installs"], inspector: "Frisco Development Services", phone: "(972) 292-5330", directLine: "(972) 292-5330", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "friscotexas.gov/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"], warning: "Frisco moved to IPC 2024 on March 1, 2026. 2.0 GPM max showerheads and tracer wire on buried plastic sewer." },
  "Garland": { code: "IPC 2021", population: "238K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tanks required on all closed systems", "CSST bonding required", "Water heater elevated 18\" in garage — strictly enforced"], inspector: "Garland Building Inspections", phone: "(972) 205-2350", directLine: "(972) 205-2350", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "garlandtx.gov/building", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Georgetown": { code: "IPC 2021", population: "90K", region: "Central Texas", amendments: ["IPC adopted — switched from UPC", "Williamson County MUD rules may apply in outer areas", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections"], inspector: "Georgetown Development Services", phone: "(512) 930-3456", directLine: "(512) 930-3456", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "georgetown.org/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Crossroads Inspections"] },
  "Grand Prairie": { code: "IPC 2021", population: "196K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Straddles Dallas and Tarrant counties — confirm jurisdiction before pulling permit", "Thermal expansion tank required on closed water systems"], inspector: "Grand Prairie Building Inspections", phone: "(972) 237-8255", directLine: "(972) 237-8255", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "gptx.org/permits", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"], warning: "Grand Prairie spans Dallas and Tarrant counties. Always confirm the exact jurisdiction for your job address." },
  "Grapevine": { code: "IPC 2021", population: "55K", region: "North Texas (DFW)", amendments: ["IPC 2021 adopted effective January 1, 2024", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Water heater elevated 18\" in garage"], inspector: "Grapevine Building Inspections", phone: "(817) 410-3165", directLine: "(817) 410-3165", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "grapevinetexas.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Houston": { code: "UPC 2021 ⚠", population: "2.3M", region: "Gulf Coast", amendments: ["⚠ Houston uses the UPC — NOT the IPC", "Effective January 1, 2024 per Ordinance No. 2023-907", "Backflow preventer required on all irrigation systems", "Thermal expansion tank required on all water heater installs", "Gas pressure test: 10 PSI minimum hold for 30 minutes"], inspector: "Houston Permitting Center", phone: "(832) 394-8800", directLine: "(832) 394-8880", scheduleHours: "Mon–Fri 8AM–5PM | Online 24/7", permitRequired: true, permitUrl: "houstonpermittingcenter.org", thirdParty: ["Crossroads Inspections", "Veritas Inspections", "Bureau Veritas", "Burgess Construction Consultants", "Fox Energy Specialists"], warning: "Houston uses the UPC, not the IPC. Codes differ significantly from surrounding cities." },
  "Hurst": { code: "IPC 2021", population: "39K", region: "North Texas (HEB Area)", amendments: ["NCTCOG regional amendments apply", "HEB area code environment", "Thermal expansion tank required on all closed water systems", "Water heater pan required where leakage could cause damage"], inspector: "Hurst Building Inspections", phone: "(817) 788-7025", directLine: "(817) 788-7025", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "hursttx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Irving": { code: "IPC 2021", population: "240K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Permits required before any work begins", "Thermal expansion tank required on all closed water systems", "Water heater elevation: 18\" minimum in garage"], inspector: "Irving Building Inspections", phone: "(972) 721-2371", directLine: "(972) 721-2371", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofirving.org/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Katy": { code: "IPC 2021", population: "22K", region: "Greater Houston", amendments: ["Harris County MUD rules apply outside city limits — verify jurisdiction", "Expansion tank required on all water heater replacements", "Gas test: 10 PSI for 30 min — inspector must witness", "Water service: copper only within 5 ft of meter"], inspector: "Katy Building Department", phone: "(281) 391-4800", directLine: "(281) 391-4800", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofkaty.com", thirdParty: ["Crossroads Inspections", "Roadrunner Inspections", "Bureau Veritas", "Fox Energy Specialists"] },
  "Keller": { code: "IPC 2021", population: "48K", region: "North Texas (DFW)", amendments: ["IPC 2021 adopted", "⚠ Customer service inspection required before final on any project affecting water supply or irrigation", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems"], inspector: "Keller Building Services", phone: "(817) 743-4000", directLine: "(817) 743-4000", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofkeller.com/building", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "Keller requires a customer service inspection before scheduling final on any project affecting water supply or irrigation." },
  "Killeen": { code: "IPC 2024 ⚠", population: "155K", region: "Central Texas", amendments: ["⚠ IPC 2024 adopted", "MGO Connect portal for permits", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "5 PSI air test allowed during wet weather only"], inspector: "Killeen Building Inspections", phone: "(254) 501-7640", directLine: "(254) 501-7640", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "killeentexas.gov/building-inspections", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"], warning: "Killeen is on IPC 2024. Key changes: 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Laredo": { code: "IPC 2021", population: "255K", region: "South Texas (Border)", amendments: ["Laredo Water (LWWD-DC) pre-approval required for water service connections", "Backflow prevention required on all commercial and irrigation connections", "High mineral content — additional water heater protection recommended", "Gas pressure test: 10 PSI hold for 15 minutes minimum"], inspector: "Laredo Building Development Services", phone: "(956) 794-1620", directLine: "(956) 794-1620", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.laredo.tx.us/building", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "League City": { code: "IPC 2021", population: "117K", region: "Greater Houston", amendments: ["Galveston County jurisdiction — verify MUD rules", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections", "Gas pressure test: 10 PSI minimum for 30 minutes"], inspector: "League City Inspections", phone: "(281) 554-1060", directLine: "(281) 554-1060", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "leaguecitytx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Crossroads Inspections"] },
  "Lewisville": { code: "IPC 2021", population: "115K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Water softener loop rough-in required on new construction", "CSST bonding required and verified at rough-in", "Underground plastic sewer requires tracer wire"], inspector: "Lewisville Development Services", phone: "(972) 219-3500", directLine: "(972) 219-3500", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityoflewisville.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },
  "Longview": { code: "IPC 2021", population: "82K", region: "East Texas", amendments: ["All inspection requests through automated line: (903) 239-5598", "Plan review required for all commercial and residential construction", "Gas pressure test required — document results for inspector"], inspector: "Longview Building Inspection", phone: "(903) 239-5598", directLine: "(903) 239-5598", scheduleHours: "Automated request line 24/7", permitRequired: true, permitUrl: "longviewtexas.gov/building-inspection", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Lubbock": { code: "IPC 2021", population: "258K", region: "West Texas", amendments: ["Adopted IPC 2021 via Ordinance 2024-O0026", "Backflow prevention: all connections must comply with 30 TAC 290.44(h)", "Backflow assembly tester must be certified", "Slab inspection required before concrete pour"], inspector: "Lubbock Building Safety", phone: "(806) 775-2087", directLine: "(806) 775-2087", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.lubbock.tx.us/departments/building-safety", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Mansfield": { code: "IPC 2018 ⚠", population: "77K", region: "North Texas (DFW)", amendments: ["⚠ Mansfield is on IPC 2018 — older than most surrounding DFW cities", "Inspection requests submitted by 4PM are inspected the next business day", "Backflow testers must register with Vepo LLC", "Single trade permits submitted via MyGov system"], inspector: "Mansfield Building Safety", phone: "(817) 276-4200", directLine: "(817) 276-4200", scheduleHours: "Submit by 4PM for next-day inspection | After 4PM Fri = Tuesday", permitRequired: true, permitUrl: "mansfieldtexas.gov/building", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"], warning: "Mansfield is on IPC 2018 — older than most surrounding DFW cities. Verify code edition requirements carefully." },
  "McAllen": { code: "IPC 2024 ⚠", population: "143K", region: "Rio Grande Valley", amendments: ["⚠ IPC 2024 adopted effective January 1, 2026", "Saturday inspections: 8:30AM–4:30PM — request Friday 12–4PM", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer"], inspector: "McAllen Building Permits & Inspections", phone: "(956) 681-1300", directLine: "(956) 681-1328", scheduleHours: "Mon–Fri 8AM–5PM | Saturday 8:30AM–4:30PM", permitRequired: true, permitUrl: "mcallen.net/permits", thirdParty: ["Bureau Veritas", "ECS Limited"], warning: "McAllen moved to IPC 2024 effective January 1, 2026. Saturday inspections now available." },
  "McKinney": { code: "IPC 2021", population: "222K", region: "North Texas", amendments: ["Recirculation required on hot water systems over 50 ft on new residential", "Water softener loop required on all new construction", "Dual check backflow required on all irrigation systems", "Underground gas: PE pipe only with tracer wire"], inspector: "McKinney Development Services", phone: "(972) 547-7400", directLine: "(972) 547-7400", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "mckinneytexas.org/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Mesquite": { code: "IPC 2021", population: "145K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required — verified at rough-in", "Water heater in garage must be elevated 18\" minimum"], inspector: "Mesquite Building Inspections", phone: "(972) 216-6200", directLine: "(972) 216-6200", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofmesquite.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Midland": { code: "IPC 2021", population: "132K", region: "West Texas (Permian Basin)", amendments: ["Permian Basin: high soil expansion — bedding requirements strictly enforced", "Water heater strapping required", "Gas pressure test: 10 PSI for 30 minutes"], inspector: "Midland Building Inspections", phone: "(432) 685-7444", directLine: "(432) 685-7444", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "midlandtexas.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "New Braunfels": { code: "IPC 2021", population: "107K", region: "Central Texas", amendments: ["IPC adopted — switched from UPC", "Plans through ProjectDox electronic plan review", "Plumbing permits available online as standalone permit", "Thermal expansion tank required on all water heater installs"], inspector: "New Braunfels Development Services", phone: "(830) 221-4020", directLine: "(830) 221-4020", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "newbraunfels.gov/buildingpermits", thirdParty: ["Bureau Veritas", "Fox Energy Specialists", "Texas Third Party Inspections LLC"] },
  "North Richland Hills": { code: "IPC 2021", population: "74K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Water heater elevated 18\" in garage"], inspector: "NRH Building Inspections", phone: "(817) 427-6300", directLine: "(817) 427-6300", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "nrhtx.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Odessa": { code: "IPC 2021", population: "114K", region: "West Texas (Permian Basin)", amendments: ["Permian Basin: expansive soil — granular bedding required", "Water heater strapping required at all locations", "Industrial connections: RPZ backflow required"], inspector: "Odessa Building Inspections", phone: "(432) 335-3265", directLine: "(432) 335-3265", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "odessatx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Pasadena": { code: "IPC 2021", population: "151K", region: "Greater Houston", amendments: ["Harris County — verify MUD jurisdiction before pulling permit", "UPC used by neighboring Houston — confirm which code governs your job", "Thermal expansion tank required on all water heater installs"], inspector: "Pasadena Building Inspections", phone: "(713) 475-5560", directLine: "(713) 475-5560", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.pasadena.tx.us/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Crossroads Inspections"], warning: "Pasadena borders Houston which uses the UPC. Confirm which code governs your address." },
  "Pearland": { code: "IPC 2021", population: "125K", region: "Greater Houston", amendments: ["Brazoria County MUD rules may apply — verify jurisdiction", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation systems"], inspector: "Pearland Community Development", phone: "(281) 652-1600", directLine: "(281) 652-1600", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "pearlandtx.gov/departments/community-development", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Pflugerville": { code: "IPC 2021", population: "74K", region: "Central Texas", amendments: ["Tap fees paid to Pflugerville MUD before permit issuance", "Backflow test report required within 30 days of installation", "MUD inspection required separately from city inspection", "Call 811 required and documentation submitted with permit"], inspector: "Pflugerville Building Inspections", phone: "(512) 990-6100", directLine: "(512) 990-6100", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofpflugerville.com/permits", thirdParty: ["Fox Energy Specialists", "Burgess Construction Consultants", "Crossroads Inspections"] },
  "Plano": { code: "IPC 2024 ⚠", population: "285K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective August 1, 2025", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "Water softener loop required on all new residential construction", "Permits through Accela portal"], inspector: "Plano Building Inspections", phone: "(972) 941-7151", directLine: "(972) 941-7151", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "plano.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "Plano moved to IPC 2024 on August 1, 2025. 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Prosper": { code: "IPC 2021", population: "42K", region: "North Texas (DFW)", amendments: ["CSS portal for permits", "Permits expire 180 days from issuance", "General contractor pulls main permit and lists all subcontractors", "Subcontractors must be registered to work in Prosper"], inspector: "Prosper Building Inspections", phone: "(972) 346-3502", directLine: "(972) 346-3502", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "prospertx.gov/building", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Richardson": { code: "IPC 2021", population: "121K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Backflow prevention required on all irrigation connections"], inspector: "Richardson Building Inspections", phone: "(972) 744-4150", directLine: "(972) 744-4150", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cor.net/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Rockwall": { code: "IPC 2021", population: "51K", region: "North Texas (DFW)", amendments: ["Rockwall County seat — verify ETJ if working near city limits", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Backflow prevention required on all irrigation connections"], inspector: "Rockwall Building Inspections", phone: "(972) 771-7700", directLine: "(972) 771-7700", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "rockwall.com/buildinginspections", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Round Rock": { code: "IPC 2021", population: "133K", region: "Central Texas", amendments: ["Strict one-permit system — all trades on same permit", "All contractors must be registered before permit issued", "Permit invalid if work not started within 6 months", "Chandler Creek and Vista Oaks MUD: same permits as city"], inspector: "Round Rock Building Inspections", phone: "(512) 218-5550", directLine: "(512) 218-5550", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "roundrocktexas.gov/building-inspection", thirdParty: ["Fox Energy Specialists", "Burgess Construction Consultants", "Bureau Veritas"] },
  "Rowlett": { code: "IPC 2021", population: "66K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required", "Water heater elevated 18\" in garage"], inspector: "Rowlett Building Inspections", phone: "(972) 412-6100", directLine: "(972) 412-6100", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "rowlett.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Sachse": { code: "IPC 2021", population: "30K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Collin/Dallas county line — verify which county governs your address", "Thermal expansion tank required", "CSST bonding required per NFPA 54"], inspector: "Sachse Building Inspections", phone: "(972) 495-1212", directLine: "(972) 495-1212", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofsachse.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "San Antonio": { code: "IPC 2024", population: "1.4M", region: "South Texas", amendments: ["SAWS approval required before any water service connection", "RPZ backflow required on all commercial irrigation systems", "Gas line pressure test: 10 PSI hold for 15 minutes minimum", "Water heater pan and drain required in all install locations", "Grease trap required on all food service establishments"], inspector: "SA Development Services", phone: "(210) 207-1111", directLine: "(210) 207-1111", scheduleHours: "Mon–Fri 7:30AM–4:30PM", permitRequired: true, permitUrl: "sanantonio.gov/DSD", thirdParty: ["Roadrunner Inspections", "Veritas Inspections", "Bureau Veritas", "ECS Limited"] },
  "Schertz": { code: "IPC 2021", population: "43K", region: "San Antonio Suburb (3 Counties)", amendments: ["Spans Comal, Guadalupe, and Bexar counties — verify which governs your address", "CityView portal for all permits and inspections", "Permits required for water heaters, water softeners, and irrigation backflow"], inspector: "Schertz Building Inspections", phone: "(210) 619-1750", directLine: "(210) 619-1750", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "schertz.com/building", thirdParty: ["Roadrunner Inspections", "Bureau Veritas", "Texas Third Party Inspections LLC"], warning: "Schertz spans three counties. Always confirm which county governs your specific job address." },
  "Southlake": { code: "IPC 2021", population: "32K", region: "North Texas (DFW)", amendments: ["Emergency plumbing work allowed without permit — get permit next business day", "FOG worksheet required for food service plumbing — must be sealed by engineer", "CSST bonding required per NFPA 54", "Thermal expansion tank required"], inspector: "Southlake Building Inspections", phone: "(817) 748-8236", directLine: "(817) 748-8237", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofsouthlake.com/permits", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"] },
  "Sugar Land": { code: "IPC 2024 ⚠", population: "111K", region: "Greater Houston", amendments: ["⚠ IPC 2024 adopted via Ordinance 2395", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "Fort Bend County MUD rules may apply in outer areas"], inspector: "Sugar Land Building Inspections", phone: "(281) 275-2400", directLine: "(281) 275-2400", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "sugarlandtx.gov/building", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"], warning: "Sugar Land is on IPC 2024. 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Temple": { code: "IPC 2021", population: "82K", region: "Central Texas", amendments: ["Permits required for all plumbing work", "Gas pressure test: 10 PSI minimum hold", "Thermal expansion tank required on all closed water systems", "Water heater pan required in all interior locations"], inspector: "Temple Building Inspections", phone: "(254) 298-5640", directLine: "(254) 298-5640", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "templetx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "The Colony": { code: "IPC 2024 ⚠", population: "50K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective July 17, 2025", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "Permits now required for roof, siding, and foundation repair (Oct 1, 2025)"], inspector: "The Colony Building Inspections", phone: "(972) 625-1106", directLine: "(972) 625-1106", scheduleHours: "Mon–Fri 8AM–5PM | Inspections via ETrakIt", permitRequired: true, permitUrl: "thecolonytx.gov/building-inspections", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "The Colony moved to IPC 2024 on July 17, 2025. Also: permits now required for roof replacement, siding, and foundation repair." },
  "Tyler": { code: "IPC 2021", population: "105K", region: "East Texas", amendments: ["New codes effective January 1, 2024 — reference code by name and date on plans", "Permit applications denied if plans do not reference correct code", "2023 NEC applies to all electrical work associated with plumbing"], inspector: "Tyler Development Services", phone: "(903) 531-1210", directLine: "(903) 531-1210", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityoftyler.org/development-services", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Waco": { code: "IPC 2021", population: "139K", region: "Central Texas", amendments: ["Model construction codes with local amendments", "Gas pressure test: 10 PSI minimum", "Thermal expansion tank required on all closed water systems", "CSST bonding required per NFPA 54"], inspector: "Waco Inspection Services", phone: "(254) 750-5630", directLine: "(254) 750-5630", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "waco-texas.com/inspection-services", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Wichita Falls": { code: "IPC 2021", population: "102K", region: "North Texas", amendments: ["Permits and inspections through MGOconnect online portal", "After-hours and emergency inspections available", "All contractors must register and obtain code compliance bond", "Gas pressure test: 10 PSI minimum, witnessed test may be required"], inspector: "Wichita Falls Building Inspections", phone: "(940) 761-7442", directLine: "(940) 761-7442", scheduleHours: "Mon–Fri 8AM–5PM | After-hours available", permitRequired: true, permitUrl: "wichitafallstx.gov/building-inspections", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
};

const THIRD_PARTY = {
  "Bureau Veritas": { strictAreas: ["Commercial projects: full plan review required before any inspections scheduled", "Documentation heavy — keep all material submittals organized and on site", "Fire protection and plumbing coordination — they inspect systems interaction", "Energy code compliance — will verify plumbing insulation requirements"], tips: ["Largest third-party firm operating in Texas — used on major commercial projects", "Schedule inspections at least 48 hours in advance", "Common fail: missing required plumbing isolation valves on commercial systems", "They operate statewide — same standards apply regardless of city"], builders: ["Commercial & large residential developers statewide"], region: "Statewide Texas" },
  "Burgess Construction Consultants": { strictAreas: ["Quality assurance — they verify work quality beyond minimum code", "QAQC documentation — expect detailed reporting on all phases", "Plumbing system performance testing — not just visual inspection", "Energy efficiency verification including hot water system performance"], tips: ["National firm with strong Texas presence — used on larger production communities", "They prioritize quality over speed — build in extra time", "Common fail: workmanship issues that meet minimum code but fail QA standards", "Used heavily in master-planned communities across Houston and Austin suburbs"], builders: ["Perry Homes", "Ashton Woods", "Chesmar Homes"], region: "Houston metro, Austin suburbs" },
  "Code Solutions Inc.": { strictAreas: ["Residential plumbing rough-in — they check every item on the IPC checklist", "Water heater installation — elevation, strapping, pan, drain, TPR all verified", "Gas pressure test — require witnessed test with documented results", "Permit documentation must be on site and accessible"], tips: ["North Texas based — operates primarily in Fort Worth and surrounding areas", "Call (817) 379-1129 to schedule", "Common fail: missing or incorrectly sized TPR discharge pipe", "Certified for Fort Worth third-party inspection program"], builders: ["Custom builders and smaller production builders in North Texas"], region: "North Texas, Fort Worth area" },
  "Crossroads Inspections": { strictAreas: ["CSST bonding — they measure distance between every clamp, bring your tape measure", "Water heater strapping — requires double-strap on any unit 40 gal or larger", "Vent termination clearances — will measure to the inch from windows and HVAC intakes", "Pressure test documentation — requires written log with start/end PSI and times"], tips: ["Arrive with written material spec sheets — they will ask for pipe manufacturer info", "Required: photos submitted to their portal before covering any in-slab work", "Common fail: missing dielectric unions on water heater connections", "Call their office by 7AM if you need a same-day inspection slot"], builders: ["DR Horton", "Meritage Homes", "Century Communities"], region: "DFW, Houston, Austin" },
  "ECS Limited": { strictAreas: ["Commercial and mixed-use: MEP systems evaluation for full code compliance", "Domestic water and sanitary sewer systems — quality and efficiency reviewed", "Fire protection and plumbing coordination on commercial projects", "ADA accessibility compliance for plumbing fixture placement"], tips: ["Primarily commercial and institutional projects — less common on residential", "Submit project documentation well in advance of inspection date", "Common fail: plumbing fixture placement violating ADA clearance requirements", "They provide in-depth written reports — review carefully before final walkthrough"], builders: ["Commercial developers, institutional projects"], region: "Statewide Texas (commercial focus)" },
  "Fox Energy Specialists": { strictAreas: ["Unincorporated county areas — they specialize in county/MUD inspections outside city limits", "Foundation plumbing verification — check pipe connections and slope before pour", "Framing/rough-in: plumbing top-out verified alongside electrical and HVAC", "Energy code compliance for plumbing insulation in county jurisdictions"], tips: ["Primary value: they do inspections in unincorporated Texas where no city inspector exists", "ICC Certified Residential Combination Inspectors on staff", "Critical for subdivision work in Harris, Montgomery, Brazoria, and surrounding counties", "Temporary pole inspection included when applicable"], builders: ["Production builders in unincorporated Harris County and surrounding counties"], region: "Unincorporated Houston metro, Central Texas counties" },
  "L3 Inspections": { strictAreas: ["Residential plumbing and irrigation system inspections", "Pool and spa plumbing — separate inspection from main plumbing system", "Utility and outbuilding plumbing connections", "Sprinkler system backflow verification"], tips: ["Operates in Arlington metro area — licensed and insured", "Offers next-day inspections — good for tight schedules", "100% money-back guarantee", "Common fail: irrigation backflow preventer installation or location"], builders: ["Residential buyers, sellers, and investors in Arlington metro"], region: "Arlington Metro, DFW" },
  "Master Code": { strictAreas: ["Plan review focused — they catch issues before work starts", "Plumbing material compliance — verify all materials are listed and labeled", "CSST bonding documentation — require bond wire size and attachment method", "Cleanout accessibility — must be reachable per code"], tips: ["Based in Arlington — primary coverage in DFW metro", "Submit complete permit applications — incomplete apps cause delays", "Common fail: plans don't match installed work", "Fast turnaround on re-inspections when corrections are straightforward"], builders: ["Various DFW production builders"], region: "DFW Metro" },
  "Roadrunner Inspections": { strictAreas: ["Pressure test duration — they require 4-hour hold minimum, not the standard 1 hour", "Cleanout locations — strict on maximum distance rules, will walk the entire line", "Fixture unit calculations — will request to see your written DFU worksheet", "Horizontal drain slope — they probe with a level on every accessible run"], tips: ["Call ahead the day before — they run tight inspection windows, don't be late", "They prefer all fittings listed on a materials sheet submitted with permit", "Common fail: improper slope on long horizontal drain runs in slab", "They photograph every inspection — keep your work clean and labeled"], builders: ["Lennar", "Taylor Morrison", "Pulte Homes"], region: "Houston, San Antonio, DFW" },
  "Texas Third Party Inspections LLC": { strictAreas: ["Residential new construction phase inspections — foundation through final", "Plumbing rough-in at foundation: pipe connections and slope verified before pour", "Top-out inspection: all venting, fixture rough-ins, and pressure test", "Final inspection: all fixtures installed, no open connections, permits in order"], tips: ["Smaller firm — often more accessible and responsive than national companies", "Good for smaller builders who need flexible scheduling", "Common fail: foundation plumbing slope insufficient before slab pour", "Statewide coverage across Texas"], builders: ["Smaller custom and semi-custom builders across Texas"], region: "Statewide Texas" },
  "Veritas Inspections": { strictAreas: ["Gas documentation — requires manufacturer spec sheets physically on site", "Water service depth — they probe with a rod for minimum 12\" cover", "Shower pan liner — flood test required for full 24 hours before sign-off", "TPR valve discharge — checks material, size, length, and termination point"], tips: ["Most thorough of the major third-party firms operating in Texas", "Submit digital as-builts 48 hours before they arrive on commercial jobs", "Common fail: TPR discharge pipe wrong material or terminates too high", "They will re-inspect failed items at no charge if corrected within 48 hours"], builders: ["Toll Brothers", "Highland Homes", "David Weekley"], region: "Austin, DFW, San Antonio, Houston" },
};

// ─── ICON COMPONENT ─────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    home: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    book: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/></svg>,
    user: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    search: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    mic: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    chevron: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
    back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    bookmark: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
    x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    globe: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    camera: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  };
  return icons[name] || null;
};

// ─── MAIN APP ────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const [screen, setScreen] = useState("home");
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(null);
  const [selectedThirdParty, setSelectedThirdParty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [jSearchQuery, setJSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCode, setSelectedCode] = useState(null);
  const [bookmarks, setBookmarks] = useState([1, 8, 14]);
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [showDiagram, setShowDiagram] = useState(false);
  const recognitionRef = useRef(null);

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoiceStatus(lang === "en" ? "Voice not supported on this browser" : "Voz no soportada en este navegador"); setTimeout(() => setVoiceStatus(""), 3000); return; }
    if (recognitionRef.current) recognitionRef.current.stop();
    const r = new SR();
    recognitionRef.current = r;
    r.continuous = false; r.interimResults = false; r.lang = lang === "en" ? "en-US" : "es-MX";
    r.onstart = () => { setIsListening(true); setVoiceStatus(lang === "en" ? "Listening..." : "Escuchando..."); };
    r.onresult = (e) => {
      const heard = e.results[0][0].transcript.toLowerCase().trim();
      setVoiceStatus(`${lang === "en" ? "Heard" : "Escuché"}: "${heard}"`); setIsListening(false);
      const cityNames = Object.keys(JURISDICTIONS).map(c => c.toLowerCase());
      const matchCity = cityNames.find(c => heard.includes(c));
      if (matchCity) { const city = Object.keys(JURISDICTIONS).find(c => c.toLowerCase() === matchCity); setScreen("jurisdiction"); setSelectedJurisdiction(city); }
      else if (heard.includes("city") || heard.includes("ciudad") || heard.includes("permit") || heard.includes("permiso") || heard.includes("jurisdiction")) { setScreen("jurisdiction"); setJSearchQuery(heard.replace(/city|ciudad|jurisdiction|search|find|buscar|permiso|permit/gi, "").trim()); setSelectedJurisdiction(null); }
      else if (heard.includes("inspector") || heard.includes("inspection") || heard.includes("inspecci")) { setScreen("inspectors"); setSelectedThirdParty(null); }
      else { setScreen("codes"); setSearchQuery(heard); setSelectedCode(null); }
      setTimeout(() => setVoiceStatus(""), 3000);
    };
    r.onerror = () => { setIsListening(false); setVoiceStatus(lang === "en" ? "Could not hear — try again" : "No se escuchó — intenta de nuevo"); setTimeout(() => setVoiceStatus(""), 3000); };
    r.onend = () => setIsListening(false);
    r.start();
  };
  const stopVoice = () => { if (recognitionRef.current) recognitionRef.current.stop(); setIsListening(false); setVoiceStatus(""); };

  const categories = ["All", ...new Set(CODES.map(c => c.category))];
  const filteredCodes = CODES.filter(c => {
    const q = searchQuery.toLowerCase();
    const title = lang === "en" ? c.title : c.titleEs;
    const plain = lang === "en" ? c.plain : c.plainEs;
    const matchCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchCat && (!q || title.toLowerCase().includes(q) || c.tags.some(tg => tg.toLowerCase().includes(q)) || c.code.toLowerCase().includes(q) || plain.toLowerCase().includes(q));
  });
  const sortedJ = Object.entries(JURISDICTIONS).sort(([a], [b]) => a.localeCompare(b));
  const filteredJ = sortedJ.filter(([city]) => !jSearchQuery || city.toLowerCase().includes(jSearchQuery.toLowerCase()));
  const toggleBookmark = (id) => setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  const goBack = () => { if (showDiagram) { setShowDiagram(false); return; } if (selectedCode) { setSelectedCode(null); return; } if (selectedJurisdiction) { setSelectedJurisdiction(null); return; } if (selectedThirdParty) { setSelectedThirdParty(null); return; } };
  const showBack = selectedCode || selectedJurisdiction || selectedThirdParty || showDiagram;
  const navTo = (s) => { setScreen(s); setSelectedCode(null); setSelectedJurisdiction(null); setSelectedThirdParty(null); setSearchQuery(""); setJSearchQuery(""); setSelectedCategory("All"); setShowDiagram(false); };
  const catColors = { "Venting": "#4a9a8a", "Water Heaters": "#c87a20", "Drainage": "#5a7aaa", "Water Supply": "#2a8a6a", "Gas": "#c85a30", "Backflow": "#8a5aaa", "Fixtures": "#8a8a30" };
  const cityCount = sortedJ.length;

  const callPhone = (phone) => { window.location.href = `tel:${phone.replace(/[^0-9]/g, '')}`; };

  return (
    <div style={{ fontFamily: "'Georgia',serif", background: "#111518", minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
        body{background:#111518}
        ::-webkit-scrollbar{display:none}
        .p{transition:opacity .15s,transform .15s;cursor:pointer;-webkit-user-select:none;user-select:none}
        .p:active{opacity:.7;transform:scale(.98)}
        .cc{background:#1a1f24;border:1px solid #2a3038;border-radius:12px;padding:16px;margin-bottom:10px}
        .jc{background:#1a1f24;border:1px solid #2a3038;border-radius:12px;padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:12px}
        .jc:active{background:#1f252c}
        .pill{display:inline-flex;align-items:center;background:rgba(255,255,255,.06);border-radius:20px;padding:3px 10px;font-size:11px;font-family:'Barlow Condensed',sans-serif;letter-spacing:.05em;font-weight:600}
        .sw{position:relative;margin-bottom:14px}
        .si{width:100%;background:#1a1f24;border:1px solid #2a3038;border-radius:10px;padding:12px 48px 12px 42px;color:#e0e8f0;font-family:'Lora',serif;font-size:15px;outline:none;transition:border-color .2s}
        .si:focus{border-color:#3a8a9a}
        .si::placeholder{color:#3a4a5a}
        .sic{position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none;color:#4a5a6a}
        .mb{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center}
        .mb.on{animation:pulse 1s infinite}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        .cs{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;margin-bottom:16px}
        .cb{flex-shrink:0;background:#1a1f24;border:1px solid #2a3038;border-radius:20px;padding:6px 14px;color:#6a8a9a;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;letter-spacing:.05em;cursor:pointer;transition:all .15s;white-space:nowrap}
        .cb.active{background:#1a3a4a;border-color:#3a8a9a;color:#7acae0}
        .sl{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:.15em;font-weight:700;color:#3a5a6a;text-transform:uppercase;margin-bottom:10px}
        .ar{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid #1e2428;align-items:flex-start}
        .ar:last-child{border-bottom:none}
        .dot{width:6px;height:6px;border-radius:50%;background:#3a8a9a;margin-top:7px;flex-shrink:0}
        .wd{background:#c87a20}.rd{background:#c85a40}
        .nb{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:#151a1f;border-top:1px solid #1e2428;display:flex;padding:8px 0 20px;z-index:100}
        .ni{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 0;cursor:pointer}
        .ni:active{opacity:.6}
        .nl{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:.08em;font-weight:600}
        .hdr{position:sticky;top:0;background:#111518;border-bottom:1px solid #1e2428;z-index:50;padding:0 16px;display:flex;align-items:center;height:56px;gap:8px}
        .cnt{flex:1;overflow-y:auto;padding:16px 16px 90px}
        .hb{background:#1a1f24;border:1px solid #2a3038;border-radius:14px;padding:18px 16px;display:flex;align-items:center;gap:14px;margin-bottom:10px;cursor:pointer}
        .hb:active{background:#1f252c}
        .ib{background:#1a1f24;border:1px solid #2a3038;border-radius:12px;padding:16px;margin-bottom:12px}
        .wb{background:#1a1a0f;border:1px solid #4a4a1a;border-radius:10px;padding:12px 14px;margin-bottom:16px}
        .tc{background:#1a2a1a;border:1px solid #2a4a2a;border-radius:8px;padding:8px 12px;display:inline-flex;align-items:center;gap:6px;margin:4px;cursor:pointer}
        .tc:active{opacity:.7}
        .vb{background:#1a2a3a;border-bottom:1px solid #2a4a6a;padding:8px 16px;display:flex;align-items:center;gap:10px}
        .vbig{width:100%;background:linear-gradient(135deg,#1a3a4a,#0f2030);border:1px solid #3a8a9a;border-radius:14px;padding:18px;display:flex;align-items:center;gap:12px;cursor:pointer;margin-bottom:16px}
        .vbig.on{border-color:#c85a30;background:linear-gradient(135deg,#2a1a0f,#1a0f08)}
        .vbig:active{opacity:.8;transform:scale(.98)}
        .call-btn{display:flex;align-items:center;gap:8px;background:#1a3a2a;border:1px solid #2a6a3a;border-radius:10px;padding:12px 16px;cursor:pointer;transition:all .15s;margin-bottom:10px;width:100%}
        .call-btn:active{background:#2a4a3a;transform:scale(.98)}
        .lang-btn{background:rgba(58,138,154,.15);border:1px solid #3a8a9a;border-radius:8px;padding:5px 10px;cursor:pointer;display:flex;align-items:center;gap:4px}
        .tab-btn{flex:1;padding:8px;border:none;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;border-radius:6px;transition:all .15s}
        .diagram-box{background:#1a1f24;border:1px solid #2a3038;border-radius:12px;padding:16px;margin-bottom:16px}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes scanLine{0%{top:10%}100%{top:90%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .part-card{background:#1a1f24;border:1px solid #2a3038;border-radius:12px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:all .15s;animation:fadeUp .3s ease forwards;opacity:0}
        .part-card:active{background:#1f252c;transform:scale(.98)}
        .scanner-box{position:relative;border-radius:12px;overflow:hidden;background:#0a0f14;border:1px solid #2a3038}
        .scan-line{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#c85a30,transparent);animation:scanLine 1.8s ease-in-out infinite alternate}
        .corner{position:absolute;width:20px;height:20px;border-color:#c85a30;border-style:solid}
        .corner-tl{top:10px;left:10px;border-width:2px 0 0 2px}
        .corner-tr{top:10px;right:10px;border-width:2px 2px 0 0}
        .corner-bl{bottom:10px;left:10px;border-width:0 0 2px 2px}
        .corner-br{bottom:10px;right:10px;border-width:0 2px 2px 0}
        .upload-zone{border:2px dashed #2a3038;border-radius:14px;padding:32px 16px;text-align:center;cursor:pointer;transition:all .2s}
        .upload-zone:active{border-color:#c85a30;background:rgba(200,90,48,.05)}
        .buy-btn{display:flex;align-items:center;gap:8px;background:#1a3a2a;border:1px solid #2a6a3a;border-radius:10px;padding:10px 14px;cursor:pointer;width:100%;margin-bottom:8px;transition:all .15s}
        .buy-btn:active{background:#2a4a3a}
        .yt-btn{display:flex;align-items:center;gap:8px;background:#2a1a1a;border:1px solid #6a2a2a;border-radius:10px;padding:10px 14px;cursor:pointer;width:100%;margin-bottom:8px;transition:all .15s}
        .yt-btn:active{background:#3a1a1a}
      `}</style>

      {/* HEADER */}
      <div className="hdr">
        {showBack ? (
          <div className="p" onClick={goBack} style={{ color: "#7acae0", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="back" size={22} color="#7acae0" />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: ".05em" }}>{t.back}</span>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#2a6a8a,#1a4a6a)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔧</div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: ".1em", color: "#e0e8f0", lineHeight: 1 }}>CODEX TX</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, color: "#3a5a6a", letterSpacing: ".15em" }}>{t.appSub}</div>
            </div>
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          {/* LANGUAGE TOGGLE */}
          <button className="lang-btn p" onClick={() => setLang(l => l === "en" ? "es" : "en")}>
            <Icon name="globe" size={13} color="#7acae0" />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#7acae0", fontWeight: 700, letterSpacing: ".08em" }}>{lang === "en" ? "ES" : "EN"}</span>
          </button>
          {/* VOICE BUTTON */}
          <button onClick={isListening ? stopVoice : startVoice} style={{ background: isListening ? "rgba(200,90,48,.2)" : "rgba(58,138,154,.15)", border: `1px solid ${isListening ? "#c85a30" : "#3a8a9a"}`, borderRadius: 8, padding: "5px 9px", display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <Icon name="mic" size={14} color={isListening ? "#c85a30" : "#7acae0"} />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, color: isListening ? "#c85a30" : "#7acae0", fontWeight: 700, letterSpacing: ".06em" }}>{isListening ? "STOP" : "VOZ"}</span>
          </button>
        </div>
      </div>

      {voiceStatus && <div className="vb"><Icon name="mic" size={14} color={isListening ? "#c85a30" : "#7acae0"} /><span style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: isListening ? "#c87a60" : "#7acae0", flex: 1 }}>{voiceStatus}</span></div>}

      <div className="cnt">

        {/* HOME */}
        {screen === "home" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 32, letterSpacing: ".04em", color: "#e0e8f0", lineHeight: 1.1, marginBottom: 6 }}>{t.tagline.split(".")[0]}.<br /><span style={{ color: "#3a8a9a" }}>{t.tagline.split(".")[1]}</span></div>
              <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#4a6a7a", lineHeight: 1.6 }}>{cityCount} {t.taglineSub}</div>
            </div>
            <button className={`vbig ${isListening ? "on" : ""}`} onClick={isListening ? stopVoice : startVoice}>
              <Icon name="mic" size={26} color={isListening ? "#c85a30" : "#7acae0"} />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: ".06em", color: isListening ? "#c87a60" : "#c0d8e8" }}>{isListening ? t.voiceListening : t.voiceTap}</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginTop: 2 }}>{isListening ? t.voiceSubOn : t.voiceSub}</div>
              </div>
            </button>
            <div style={{ marginBottom: 20 }}>
              <div className="sl">{t.quickAccess}</div>
              {[{ s: "codes", icon: "book", bg: "#1a3a4a", ic: "#7acae0", ti: t.codes, sub: t.codesSub }, { s: "jurisdiction", icon: "map", bg: "#1a3a2a", ic: "#4a9a6a", ti: t.jurisdiction, sub: `${cityCount} ${t.jurisdictionSub}` }, { s: "inspectors", icon: "user", bg: "#2a2a1a", ic: "#c8a030", ti: t.inspectors, sub: t.inspectorsSub }].map(item => (
                <div key={item.s} className="hb p" onClick={() => navTo(item.s)}>
                  <div style={{ width: 42, height: 42, background: item.bg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name={item.icon} size={20} color={item.ic} /></div>
                  <div><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: ".05em", color: "#e0e8f0", marginBottom: 2 }}>{item.ti}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>{item.sub}</div></div>
                  <div style={{ marginLeft: "auto", color: "#3a5a6a" }}><Icon name="chevron" size={18} /></div>
                </div>
              ))}
            </div>
            {bookmarks.length > 0 && <div><div className="sl">{t.saved}</div>{CODES.filter(c => bookmarks.includes(c.id)).map(c => <div key={c.id} className="cc p" onClick={() => { setScreen("codes"); setSelectedCode(c); setShowDiagram(false); }}><div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, color: "#c0d8e8", flex: 1, paddingRight: 8 }}>{lang === "en" ? c.title : c.titleEs}</div><span className="pill" style={{ color: catColors[c.category] || "#7a9aaa" }}>{c.code}</span></div></div>)}</div>}
          </div>
        )}

        {/* CODES LIST */}
        {screen === "codes" && !selectedCode && (
          <div>
            <div className="sw"><div className="sic"><Icon name="search" size={16} /></div><input className="si" placeholder={t.searchCodes} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><button className={`mb ${isListening ? "on" : ""}`} onClick={isListening ? stopVoice : startVoice}><Icon name="mic" size={16} color={isListening ? "#c85a30" : "#3a8a9a"} /></button></div>
            <div className="cs">{categories.map(c => <button key={c} className={`cb ${selectedCategory === c ? "active" : ""}`} onClick={() => setSelectedCategory(c)}>{c}</button>)}</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginBottom: 12 }}>{filteredCodes.length} {searchQuery ? t.matching : t.available}</div>
            {filteredCodes.map(code => <div key={code.id} className="cc p" onClick={() => { setSelectedCode(code); setShowDiagram(false); }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15, color: "#c0d8e8", flex: 1, paddingRight: 8 }}>{lang === "en" ? code.title : code.titleEs}</div><span className="pill" style={{ color: catColors[code.category] || "#7a9aaa", flexShrink: 0 }}>{code.code}</span></div><div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", lineHeight: 1.5, marginBottom: 8 }}>{(lang === "en" ? code.plain : code.plainEs).substring(0, 90)}…</div>{code.diagram && <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, color: "#3a8a9a", letterSpacing: ".08em" }}>📐 {t.diagram}</span>}</div>)}
          </div>
        )}

        {/* CODE DETAIL */}
        {screen === "codes" && selectedCode && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><span className="pill" style={{ color: catColors[selectedCode.category] || "#7a9aaa", fontSize: 12 }}>{selectedCode.category}</span><div className="p" style={{ padding: 8 }} onClick={() => toggleBookmark(selectedCode.id)}><Icon name="bookmark" size={22} color={bookmarks.includes(selectedCode.id) ? "#7acae0" : "#3a5a6a"} /></div></div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: ".04em", color: "#e0e8f0", lineHeight: 1.15, marginBottom: 6 }}>{(lang === "en" ? selectedCode.title : selectedCode.titleEs).toUpperCase()}</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#3a8a9a", letterSpacing: ".1em", marginBottom: 20 }}>{selectedCode.code}</div>

            {/* TAB BAR if diagram exists */}
            {selectedCode.diagram && (
              <div style={{ display: "flex", gap: 6, marginBottom: 16, background: "#1a1f24", borderRadius: 8, padding: 4 }}>
                <button className="tab-btn" style={{ background: !showDiagram ? "#1a3a4a" : "transparent", color: !showDiagram ? "#7acae0" : "#3a5a6a" }} onClick={() => setShowDiagram(false)}>{t.plainEnglish}</button>
                <button className="tab-btn" style={{ background: showDiagram ? "#1a3a4a" : "transparent", color: showDiagram ? "#7acae0" : "#3a5a6a" }} onClick={() => setShowDiagram(true)}>📐 {t.diagram}</button>
              </div>
            )}

            {showDiagram && selectedCode.diagram ? (
              <div className="diagram-box">{DIAGRAMS[selectedCode.diagram]}</div>
            ) : (
              <>
                <div className="sl">{t.plainEnglish}</div>
                <div className="ib"><p style={{ fontFamily: "'Lora',serif", fontSize: 15, lineHeight: 1.75, color: "#c0d0d8" }}>{lang === "en" ? selectedCode.plain : selectedCode.plainEs}</p></div>
              </>
            )}

            <div className="sl" style={{ marginTop: 16 }}>{t.tags}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>{selectedCode.tags.map(tg => <span key={tg} className="pill" style={{ color: "#4a7a8a", fontSize: 12, padding: "5px 12px" }}>{tg}</span>)}</div>
            <div style={{ padding: "12px 14px", background: "#1a2a1a", border: "1px solid #2a4a2a", borderRadius: 10 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: ".1em", color: "#3a7a3a", marginBottom: 4 }}>{t.alwaysVerify}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a4a", lineHeight: 1.5 }}>{t.alwaysVerifyText}</div></div>
          </div>
        )}

        {/* JURISDICTION LIST */}
        {screen === "jurisdiction" && !selectedJurisdiction && (
          <div>
            <div className="sw"><div className="sic"><Icon name="search" size={16} /></div><input className="si" placeholder={t.searchCities} value={jSearchQuery} onChange={e => setJSearchQuery(e.target.value)} /><button className={`mb ${isListening ? "on" : ""}`} onClick={isListening ? stopVoice : startVoice}><Icon name="mic" size={16} color={isListening ? "#c85a30" : "#3a8a9a"} /></button></div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginBottom: 14 }}>{filteredJ.length} {t.jurisdictions}</div>
            {filteredJ.map(([city, data]) => <div key={city} className="jc p" onClick={() => setSelectedJurisdiction(city)}><div style={{ width: 38, height: 38, background: data.code.includes("UPC") ? "#2a1a1a" : "#1a3a2a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="map" size={18} color={data.code.includes("UPC") ? "#c87a50" : "#4a9a6a"} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 17, color: "#e0e8f0", marginBottom: 2 }}>{city}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>{data.amendments.length} {t.amendments_label} · {data.code} · {data.region}</div></div><Icon name="chevron" size={16} color="#3a5a6a" /></div>)}
          </div>
        )}

        {/* JURISDICTION DETAIL */}
        {screen === "jurisdiction" && selectedJurisdiction && (() => {
          const j = JURISDICTIONS[selectedJurisdiction];
          return (
            <div>
              <div style={{ marginBottom: 12 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 30, letterSpacing: ".06em", color: "#e0e8f0", lineHeight: 1 }}>{selectedJurisdiction.toUpperCase()}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", marginTop: 4 }}>{j.region} · {t.pop} {j.population}</div></div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}><span className="pill" style={{ color: j.code.includes("UPC") ? "#c87a50" : "#4a9a6a", background: j.code.includes("UPC") ? "#2a1a1a" : "#1a3a2a", padding: "5px 12px" }}>{j.code}</span>{j.permitRequired && <span className="pill" style={{ color: "#c8a030", background: "#2a2a1a", padding: "5px 12px" }}>{t.permitRequired}</span>}</div>
              {j.warning && <div className="wb"><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: ".1em", color: "#8a8a20", marginBottom: 4 }}>{t.importantNote}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#c8c870", lineHeight: 1.5 }}>{j.warning}</div></div>}

              {/* CALL BUTTONS */}
              <div className="sl">{t.office}</div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15, color: "#e0e8f0", marginBottom: 10 }}>{j.inspector}</div>
                <button className="call-btn p" onClick={() => callPhone(j.phone)}>
                  <Icon name="phone" size={18} color="#4a9a6a" />
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>{j.phone}</div>
                    <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>{t.office}</div>
                  </div>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#4a9a6a", fontWeight: 700, letterSpacing: ".08em" }}>{t.callNow}</span>
                </button>
                {j.directLine && j.directLine !== j.phone && (
                  <button className="call-btn p" onClick={() => callPhone(j.directLine)}>
                    <Icon name="phone" size={18} color="#7acae0" />
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>{j.directLine}</div>
                      <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>{t.directLine}</div>
                    </div>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#7acae0", fontWeight: 700, letterSpacing: ".08em" }}>{t.callNow}</span>
                  </button>
                )}
                {j.emergency && (
                  <button className="call-btn p" onClick={() => callPhone(j.emergency)} style={{ background: "#2a1a1a", borderColor: "#6a2a2a" }}>
                    <Icon name="phone" size={18} color="#c85a30" />
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>{j.emergency}</div>
                      <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#6a4a4a" }}>{t.emergency}</div>
                    </div>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#c85a30", fontWeight: 700, letterSpacing: ".08em" }}>{t.callNow}</span>
                  </button>
                )}
                {j.scheduleHours && <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", padding: "6px 0" }}>🕐 {t.scheduleHours}: {j.scheduleHours}</div>}
                {j.permitUrl && <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", padding: "4px 0" }}>🌐 {j.permitUrl}</div>}
              </div>

              <div className="sl">{t.amendments}</div>
              <div className="ib" style={{ marginBottom: 16 }}>{j.amendments.map((a, i) => <div key={i} className="ar"><div className="dot" /><div style={{ fontFamily: "'Lora',serif", fontSize: 14, color: "#b0c8d8", lineHeight: 1.6 }}>{a}</div></div>)}</div>
              {j.thirdParty && j.thirdParty.length > 0 && <><div className="sl">{t.thirdParty}</div><div style={{ display: "flex", flexWrap: "wrap", marginBottom: 16 }}>{j.thirdParty.map(tp => <div key={tp} className="tc p" onClick={() => { setSelectedThirdParty(tp); setScreen("inspectors"); }}><span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a9a6a", fontWeight: 600 }}>{tp}</span><Icon name="chevron" size={12} color="#2a6a2a" /></div>)}</div></>}
            </div>
          );
        })()}

        {/* INSPECTOR LIST */}
        {screen === "inspectors" && !selectedThirdParty && (
          <div>
            <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#4a6a7a", lineHeight: 1.6, marginBottom: 20 }}>{lang === "en" ? "Builder jobs often use third-party inspectors with requirements beyond city code. Know what they look for before you show up." : "Los trabajos de constructores a menudo usan inspectores de terceros con requisitos más allá del código de la ciudad. Sepa qué buscan antes de llegar."}</div>
            <div className="sl">{Object.keys(THIRD_PARTY).length} {t.inspectorCount}</div>
            {Object.entries(THIRD_PARTY).sort(([a], [b]) => a.localeCompare(b)).map(([name, data]) => <div key={name} className="jc p" onClick={() => setSelectedThirdParty(name)}><div style={{ width: 38, height: 38, background: "#2a2a1a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={18} color="#c8a030" /></div><div style={{ flex: 1 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#e0e8f0", marginBottom: 2 }}>{name}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>{data.strictAreas.length} {lang === "en" ? "strict areas" : "áreas estrictas"} · {data.region}</div></div><Icon name="chevron" size={16} color="#3a5a6a" /></div>)}
          </div>
        )}

        {/* INSPECTOR DETAIL */}
        {screen === "inspectors" && selectedThirdParty && (() => {
          const ins = THIRD_PARTY[selectedThirdParty];
          return (
            <div>
              <div style={{ marginBottom: 20 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: ".05em", color: "#e0e8f0", lineHeight: 1.1 }}>{selectedThirdParty.toUpperCase()}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", marginTop: 4 }}>{ins.region}</div><div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>{ins.builders.map(b => <span key={b} className="pill" style={{ color: "#c8a030", background: "#2a2a1a", padding: "4px 10px", fontSize: 11 }}>{b}</span>)}</div></div>
              <div className="sl" style={{ color: "#8a4a3a" }}>{t.strictAreas}</div>
              <div className="ib" style={{ marginBottom: 16, borderColor: "#3a2020" }}>{ins.strictAreas.map((a, i) => <div key={i} className="ar"><div className="dot rd" /><div style={{ fontFamily: "'Lora',serif", fontSize: 14, color: "#d0a8a0", lineHeight: 1.6 }}>{a}</div></div>)}</div>
              <div className="sl" style={{ color: "#7a6a20" }}>{t.fieldTips}</div>
              <div className="ib" style={{ borderColor: "#3a2a10" }}>{ins.tips.map((tip, i) => <div key={i} className="ar"><div className="dot wd" /><div style={{ fontFamily: "'Lora',serif", fontSize: 14, color: "#d0c080", lineHeight: 1.6 }}>{tip}</div></div>)}</div>
            </div>
          );
        })()}

        {/* ── IDENTIFY SCREEN ── */}
        {screen === "identify" && (
          <IdentifyScreen t={t} lang={lang} />
        )}

      </div>

      {/* BOTTOM NAV */}
      <div className="nb" style={{ alignItems: "center" }}>
        {[
          { id: "home", label: t.navHome, icon: "home", color: "#7acae0" },
          { id: "codes", label: t.navCodes, icon: "book", color: "#7acae0" },
          { id: "identify", label: t.navIdentify, icon: "camera", color: "#c85a30" },
          { id: "jurisdiction", label: t.navCities, icon: "map", color: "#4a9a6a" },
          { id: "inspectors", label: t.navInspectors, icon: "user", color: "#c8a030" },
        ].map(item => {
          const active = screen === item.id;
          const isCamera = item.id === "identify";
          if (isCamera) {
            return (
              <div key={item.id} className="ni" onClick={() => navTo(item.id)}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: active ? "#c85a30" : "linear-gradient(135deg,#2a1a0f,#1a2a3a)", border: `2px solid ${active ? "#ff7a50" : "#c85a30"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${active ? "16px" : "6px"} rgba(200,90,48,${active ? ".6" : ".3"})`, marginBottom: 2 }}>
                  <Icon name="camera" size={22} color={active ? "#fff" : "#c85a30"} />
                </div>
                <span className="nl" style={{ color: active ? "#c85a30" : "#c85a30", opacity: active ? 1 : 0.7 }}>{item.label}</span>
              </div>
            );
          }
          return (
            <div key={item.id} className="ni" onClick={() => navTo(item.id)}>
              <Icon name={item.icon} size={22} color={active ? item.color : "#3a4a5a"} />
              <span className="nl" style={{ color: active ? item.color : "#3a4a5a" }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── IDENTIFY SCREEN COMPONENT ───────────────────────────────
function IdentifyScreen({ t, lang }) {
  const [phase, setPhase] = useState("idle"); // idle | analyzing | results | detail
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [parts, setParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const handleImage = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const base64 = dataUrl.split(",")[1];
      setImagePreview(dataUrl);
      setImageData(base64);
      setPhase("analyzing");
      setError(null);
      await analyzeImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64) => {
    const enPrompt = "You are an expert master plumber and parts identifier with 30+ years of experience. When shown a plumbing photo, identify every visible component. Respond ONLY with a valid JSON array, no markdown, no preamble. Each object must have: id (number), name (short part name), category (one of: Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description (2-3 sentences: what it is and what it does), codeStatus (one of: approved|grandfathered|not-approved), codeNote (brief code status note), stillMade (true or false), manufacturer (brand if visible), whereToFind (Home Depot, Ferguson, Grainger, etc.), estimatedCost (price range like $8-$15), proTip (one field tip a master plumber would share), searchTerm (YouTube search term for repair video), affiliateSearch (Home Depot search keyword).";
    const esPrompt = "Eres un maestro plomero experto con mas de 30 anos de experiencia. Cuando se muestra una foto de plomeria, identifica cada componente visible. Responde SOLO con un array JSON valido, sin markdown, sin preambulo. Cada objeto debe tener: id (numero), name (nombre corto), category (uno de: Valve|Pipe|Fitting|Water Heater|Fixture|Gas|Backflow|Vent|Pump|Filter|Unknown), description (2-3 oraciones en espanol: que es y que hace), codeStatus (uno de: approved|grandfathered|not-approved), codeNote (nota breve sobre codigo), stillMade (true o false), manufacturer (marca si visible), whereToFind (donde comprar), estimatedCost (rango de precio), proTip (consejo de campo), searchTerm (busqueda en YouTube), affiliateSearch (palabra clave Home Depot).";
    const systemPrompt = lang === "en" ? enPrompt : esPrompt;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/jpeg", data: base64 } },
              { type: "text", text: lang === "en" ? "Identify every plumbing part you can see in this photo. Return JSON array only." : "Identifica cada parte de plomería visible en esta foto. Devuelve solo el array JSON." }
            ]
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(i => i.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setParts(Array.isArray(parsed) ? parsed : []);
      setPhase("results");
    } catch (err) {
      setError(t.identifyError);
      setPhase("idle");
    }
  };

  const reset = () => { setPhase("idle"); setImageData(null); setImagePreview(null); setParts([]); setSelectedPart(null); setError(null); };

  const codeColor = (status) => ({ approved: "#4a9a6a", grandfathered: "#c8a030", "not-approved": "#c85a30" }[status] || "#4a6a7a");
  const codeLabel = (status) => ({ approved: t.identifyApproved, grandfathered: t.identifyGrandfathered, "not-approved": t.identifyNotApproved }[status] || status);
  const catColor = { Valve: "#7acae0", Pipe: "#5a7aaa", Fitting: "#4a9a8a", "Water Heater": "#c87a20", Fixture: "#8a8a30", Gas: "#c85a30", Backflow: "#8a5aaa", Vent: "#4a9a6a", Pump: "#6a7a9a", Filter: "#7a6a8a", Unknown: "#4a5a6a" };

  return (
    <div>
      {/* IDLE — upload prompt */}
      {phase === "idle" && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: ".06em", color: "#e0e8f0", lineHeight: 1.1 }}>{t.identifyTitle}</div>
            <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#4a6a7a", marginTop: 6, lineHeight: 1.5 }}>{t.identifySub}</div>
          </div>

          {error && <div style={{ background: "#2a1a1a", border: "1px solid #6a2a2a", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontFamily: "'Lora',serif", fontSize: 13, color: "#c87a60" }}>{error}</div>}

          <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => handleImage(e.target.files[0])} />

          {/* Main camera button */}
          <div className="upload-zone" onClick={() => fileRef.current?.click()}>
            <div style={{ width: 72, height: 72, background: "linear-gradient(135deg,#2a1a0f,#3a2a1a)", border: "2px solid #c85a30", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#c85a30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: ".08em", color: "#e0e8f0", marginBottom: 6 }}>{t.identifyTap}</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a" }}>{t.identifyOrUpload}</div>
          </div>

          {/* What it can identify */}
          <div style={{ marginTop: 24 }}>
            <div className="sl">What Bob can identify</div>
            {[
              ["🔧", "Valves", "Ball, gate, globe, check, PRV, TPR"],
              ["🚿", "Fixtures", "Faucets, showerheads, toilets, drains"],
              ["🔥", "Gas parts", "Sediment traps, flex connectors, regulators"],
              ["💧", "Backflow", "PVB, RPZ, double check, vacuum breakers"],
              ["🔩", "Fittings & pipe", "Copper, galvanized, cast iron, PVC, PEX"],
              ["♻️", "Water heaters", "Tank, tankless, mixing valves, expansion tanks"],
            ].map(([icon, title, sub]) => (
              <div key={title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #1e2428" }}>
                <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, color: "#c0d8e8" }}>{title}</div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a" }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ANALYZING */}
      {phase === "analyzing" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20 }}>
          {imagePreview && (
            <div className="scanner-box" style={{ width: "100%", marginBottom: 24 }}>
              <img src={imagePreview} alt="analyzing" style={{ width: "100%", maxHeight: 280, objectFit: "cover", display: "block", opacity: 0.7 }} />
              <div className="scan-line" />
              <div className="corner corner-tl" /><div className="corner corner-tr" />
              <div className="corner corner-bl" /><div className="corner corner-br" />
            </div>
          )}
          <div style={{ width: 48, height: 48, border: "3px solid #1a3a4a", borderTopColor: "#c85a30", borderRadius: "50%", animation: "spin 0.9s linear infinite", marginBottom: 16 }} />
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: ".08em", color: "#e0e8f0", marginBottom: 6 }}>{t.identifyAnalyzing}</div>
          <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: "#3a5a6a" }}>{t.identifyAnalyzingSub}</div>
        </div>
      )}

      {/* RESULTS LIST */}
      {phase === "results" && !selectedPart && (
        <div>
          {imagePreview && <img src={imagePreview} alt="analyzed" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 12, marginBottom: 16, border: "1px solid #2a3038" }} />}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 20, color: "#e0e8f0" }}>{parts.length} {t.identifyResults}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a" }}>{t.identifyTapPart}</div>
            </div>
            <button onClick={reset} style={{ background: "none", border: "1px solid #2a3038", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#4a6a7a", letterSpacing: ".06em" }}>{t.identifyNewPhoto}</button>
          </div>
          {parts.map((part, i) => (
            <div key={part.id} className="part-card" style={{ animationDelay: `${i * 60}ms`, borderLeftColor: catColor[part.category] || "#3a5a6a", borderLeftWidth: 3 }} onClick={() => setSelectedPart(part)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#e0e8f0", flex: 1, paddingRight: 8 }}>{part.name}</div>
                <span className="pill" style={{ color: catColor[part.category] || "#4a6a7a", background: "rgba(255,255,255,.04)", fontSize: 10, flexShrink: 0 }}>{part.category}</span>
              </div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", lineHeight: 1.5, marginBottom: 8 }}>{part.description.substring(0, 80)}…</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="pill" style={{ color: codeColor(part.codeStatus), background: "rgba(255,255,255,.04)", fontSize: 10 }}>{codeLabel(part.codeStatus)}</span>
                {part.estimatedCost && <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#4a9a6a", letterSpacing: ".04em" }}>{part.estimatedCost}</span>}
                <span style={{ marginLeft: "auto", color: "#3a5a6a" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg></span>
              </div>
            </div>
          ))}
          <button onClick={reset} style={{ width: "100%", background: "none", border: "1px solid #2a3038", borderRadius: 10, padding: "12px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a6a7a", letterSpacing: ".06em", marginTop: 8 }}>📷 {t.identifyNewPhoto}</button>
        </div>
      )}

      {/* PART DETAIL */}
      {phase === "results" && selectedPart && (
        <div>
          <button onClick={() => setSelectedPart(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#7acae0", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: ".05em", marginBottom: 16, padding: 0 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
            BACK TO RESULTS
          </button>

          {/* Part header */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
              <span className="pill" style={{ color: catColor[selectedPart.category] || "#4a6a7a", background: "rgba(255,255,255,.06)", padding: "4px 12px" }}>{selectedPart.category}</span>
              <span className="pill" style={{ color: codeColor(selectedPart.codeStatus), background: "rgba(255,255,255,.06)", padding: "4px 12px" }}>{codeLabel(selectedPart.codeStatus)}</span>
            </div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: ".04em", color: "#e0e8f0", lineHeight: 1.1, marginBottom: 6 }}>{selectedPart.name.toUpperCase()}</div>
            {selectedPart.manufacturer && <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#3a5a6a" }}>{selectedPart.manufacturer}</div>}
          </div>

          {/* Description */}
          <div className="sl">What it is</div>
          <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: 16, marginBottom: 16 }}>
            <p style={{ fontFamily: "'Lora',serif", fontSize: 15, lineHeight: 1.75, color: "#c0d0d8", margin: 0 }}>{selectedPart.description}</p>
          </div>

          {/* Code status */}
          <div className="sl">{t.identifyCodeStatus}</div>
          <div style={{ background: selectedPart.codeStatus === "approved" ? "#1a2a1a" : selectedPart.codeStatus === "grandfathered" ? "#2a2a1a" : "#2a1a1a", border: `1px solid ${codeColor(selectedPart.codeStatus)}40`, borderRadius: 12, padding: 14, marginBottom: 16 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, color: codeColor(selectedPart.codeStatus), marginBottom: 4 }}>{codeLabel(selectedPart.codeStatus)}</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#8a9aaa", lineHeight: 1.5 }}>{selectedPart.codeNote}</div>
          </div>

          {/* Pro tip */}
          {selectedPart.proTip && <>
            <div className="sl" style={{ color: "#7a6a20" }}>{t.identifyProTip}</div>
            <div style={{ background: "#1e1a0a", border: "1px solid #3a3010", borderRadius: 12, padding: 14, marginBottom: 16 }}>
              <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#c8b870", lineHeight: 1.6 }}>💡 {selectedPart.proTip}</div>
            </div>
          </>}

          {/* Where to buy */}
          <div className="sl">{t.identifyWhereToBuy}</div>
          <div style={{ marginBottom: 16 }}>
            {selectedPart.estimatedCost && <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a9a6a", letterSpacing: ".04em", marginBottom: 10 }}>Estimated cost: {selectedPart.estimatedCost}</div>}
            <button className="buy-btn" onClick={() => window.open(`https://www.homedepot.com/s/${encodeURIComponent(selectedPart.affiliateSearch || selectedPart.name)}`, "_blank")}>
              <span style={{ fontSize: 18 }}>🏠</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>Home Depot</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>{selectedPart.whereToFind?.includes("Home Depot") ? "Typically in stock" : "Check availability"}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4a9a6a" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
            <button className="buy-btn" onClick={() => window.open(`https://www.amazon.com/s?k=${encodeURIComponent(selectedPart.affiliateSearch || selectedPart.name)}+plumbing`, "_blank")} style={{ background: "#1a2a3a", borderColor: "#2a4a6a" }}>
              <span style={{ fontSize: 18 }}>📦</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>Amazon</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>Wide selection, fast shipping</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7acae0" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
            <button className="buy-btn" onClick={() => window.open(`https://www.ferguson.com/search?term=${encodeURIComponent(selectedPart.name)}`, "_blank")} style={{ background: "#1a1a2a", borderColor: "#2a2a4a" }}>
              <span style={{ fontSize: 18 }}>🔧</span>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>Ferguson</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>Pro supply house</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8a7aaa" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
          </div>

          {/* YouTube */}
          <div className="sl">{t.identifyRelatedVideos}</div>
          <button className="yt-btn" onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedPart.searchTerm || selectedPart.name + " plumbing repair")}`, "_blank")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#c85a30"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>{t.identifySearchVideo}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#6a4a4a" }}>{selectedPart.searchTerm}</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c85a30" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </button>

          <div style={{ height: 12 }} />
        </div>
      )}
    </div>
  );
}
