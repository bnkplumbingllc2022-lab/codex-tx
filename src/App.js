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
    pop: "Pop.",
    language: "EN",
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
    pop: "Pob.",
    language: "ES",
  }
};

// ─── SVG DIAGRAMS ────────────────────────────────────────────
const DIAGRAMS = {
  sedimentTrap: (
    <svg viewBox="0 0 280 220" style={{ width: "100%", maxWidth: 280, display: "block", margin: "0 auto" }}>
      <rect width="280" height="220" fill="#1a1f24" rx="8" />
      <text x="140" y="18" textAnchor="middle" fill="#7acae0" fontSize="11" fontFamily="sans-serif" fontWeight="bold">SEDIMENT TRAP / DIRT LEG</text>
      {/* Gas line coming in */}
      <line x1="20" y1="80" x2="100" y2="80" stroke="#c87a20" strokeWidth="6" />
      <text x="55" y="70" textAnchor="middle" fill="#c87a20" fontSize="9" fontFamily="sans-serif">GAS IN →</text>
      {/* Tee fitting */}
      <rect x="100" y="68" width="28" height="24" fill="#4a5a6a" rx="2" />
      <text x="114" y="85" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif">TEE</text>
      {/* Gas line going to appliance */}
      <line x1="128" y1="80" x2="220" y2="80" stroke="#c87a20" strokeWidth="6" />
      <text x="170" y="70" textAnchor="middle" fill="#c87a20" fontSize="9" fontFamily="sans-serif">→ APPLIANCE</text>
      {/* Vertical nipple down */}
      <line x1="114" y1="92" x2="114" y2="160" stroke="#6a8a9a" strokeWidth="6" />
      <text x="145" y="120" fill="#e0e8f0" fontSize="9" fontFamily="sans-serif">NIPPLE</text>
      <text x="145" y="132" fill="#e0e8f0" fontSize="9" fontFamily="sans-serif">MIN 3"</text>
      {/* Cap at bottom */}
      <rect x="100" y="158" width="28" height="14" fill="#4a5a6a" rx="3" />
      <text x="114" y="169" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="sans-serif">CAP</text>
      {/* Sediment collecting */}
      <ellipse cx="114" cy="172" rx="10" ry="4" fill="#8a6a20" opacity="0.6" />
      <text x="114" y="192" textAnchor="middle" fill="#8a6a20" fontSize="8" fontFamily="sans-serif">sediment collects here</text>
      {/* Shutoff valve */}
      <rect x="155" y="72" width="20" height="16" fill="#2a6a4a" rx="2" />
      <text x="165" y="83" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="sans-serif">SV</text>
      <text x="165" y="100" textAnchor="middle" fill="#4a9a6a" fontSize="8" fontFamily="sans-serif">shutoff</text>
      {/* Arrow showing flow */}
      <text x="114" y="48" textAnchor="middle" fill="#4a6a7a" fontSize="8" fontFamily="sans-serif">install as close to</text>
      <text x="114" y="58" textAnchor="middle" fill="#4a6a7a" fontSize="8" fontFamily="sans-serif">appliance inlet as practical</text>
      {/* Code ref */}
      <text x="140" y="210" textAnchor="middle" fill="#3a5a6a" fontSize="8" fontFamily="sans-serif">IFGC 408.4 · IRC G2419.4</text>
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
  { id: 1, category: "Gas", title: "Sediment trap (dirt leg)", titleEs: "Trampa de sedimentos (dirt leg)", code: "IFGC 408.4", plain: "A sediment trap must be installed downstream of the appliance shutoff valve, as close to the appliance inlet as practical. Use a tee fitting with a capped nipple (minimum 3 inches long) installed vertically in the bottommost opening. Required for furnaces, water heaters, boilers, and clothes dryers. NOT required for ranges, cooktops, outdoor grills, decorative gas logs, or gas lights.", plainEs: "Se debe instalar una trampa de sedimentos aguas abajo de la válvula de cierre del aparato, lo más cerca posible a la entrada del aparato. Se usa un accesorio en T con un niple tapado (mínimo 3 pulgadas de largo) instalado verticalmente en la abertura inferior. Requerido para hornos, calentadores de agua, calderas y secadoras. NO requerido para estufas, parrillas exteriores, registros decorativos de gas o lámparas de gas.", tags: ["gas", "sediment trap", "dirt leg", "drip leg", "appliance"], diagram: "sedimentTrap" },
  { id: 2, category: "Gas", title: "Appliance shutoff valve", titleEs: "Válvula de cierre del aparato", code: "IFGC 409.5", plain: "Each gas appliance must have its own shutoff valve located in the same room as the appliance, no more than 6 feet from the appliance, upstream of any union or connector. The valve must be accessible. Exception: decorative vented appliances may have remote shutoffs if they have ready access.", plainEs: "Cada aparato de gas debe tener su propia válvula de cierre ubicada en el mismo cuarto que el aparato, a no más de 6 pies del aparato, aguas arriba de cualquier unión o conector. La válvula debe ser accesible.", tags: ["gas", "shutoff valve", "appliance", "6 feet"] },
  { id: 3, category: "Gas", title: "CSST bonding requirement", titleEs: "Requisito de bonding para CSST", code: "NFPA 54 7.13", plain: "Corrugated Stainless Steel Tubing (CSST) must be electrically bonded to the building's grounding electrode system. Many Texas cities require a bonding clamp every 6 feet along the run. Always check local amendments — this varies by city.", plainEs: "La tubería corrugada de acero inoxidable (CSST) debe estar eléctricamente unida al sistema de electrodo de tierra del edificio. Muchas ciudades de Texas requieren una abrazadera de bonding cada 6 pies a lo largo del recorrido.", tags: ["CSST", "gas", "bonding", "grounding"], diagram: "csst" },
  { id: 4, category: "Gas", title: "Gas pressure test requirements", titleEs: "Requisitos de prueba de presión de gas", code: "IFGC 406.4", plain: "Gas piping systems must be tested with air, nitrogen, or CO2 at a minimum of 10 PSI for a minimum of 15 minutes. Many Texas cities require 30 minutes. Never test with gas. Document start and end pressures. Inspector may require witnessed test.", plainEs: "Los sistemas de tuberías de gas deben probarse con aire, nitrógeno o CO2 a un mínimo de 10 PSI por un mínimo de 15 minutos. Muchas ciudades de Texas requieren 30 minutos. Nunca pruebe con gas. Documente las presiones de inicio y fin.", tags: ["gas", "pressure test", "10 PSI", "leak test"] },
  { id: 5, category: "Gas", title: "Gas pipe sizing — general", titleEs: "Dimensionamiento de tubería de gas", code: "IFGC 402.1", plain: "Gas piping must be sized to deliver gas at sufficient pressure to meet the demand of all appliances simultaneously. Pipe sizing is based on BTU load, pipe length, and allowable pressure drop. Use manufacturer-published sizing tables or an approved engineering method. Under-sized gas piping is a very common inspection fail.", plainEs: "La tubería de gas debe dimensionarse para entregar gas a suficiente presión para satisfacer la demanda de todos los aparatos simultáneamente. El dimensionamiento se basa en la carga BTU, la longitud de la tubería y la caída de presión permitida.", tags: ["gas", "pipe sizing", "BTU", "pressure drop"] },
  { id: 6, category: "Gas", title: "Underground gas pipe material", titleEs: "Material de tubería de gas subterránea", code: "IFGC 404.8", plain: "Underground gas piping must be approved for burial. Polyethylene (PE) pipe with tracer wire is the most common choice. Black iron and steel must be protected from corrosion with approved coating. CSST is generally NOT approved for underground burial. Minimum burial depth is 12 inches for residential.", plainEs: "La tubería de gas subterránea debe ser aprobada para entierro. La tubería de polietileno (PE) con alambre trazador es la opción más común. El hierro negro y el acero deben protegerse de la corrosión. La profundidad mínima de entierro es de 12 pulgadas para uso residencial.", tags: ["gas", "underground", "PE pipe", "burial", "tracer wire"] },
  { id: 7, category: "Gas", title: "Flexible gas connectors", titleEs: "Conectores flexibles de gas", code: "IFGC 411.1", plain: "Flexible gas connectors connecting appliances to gas supply piping must be listed and labeled, and must not exceed 6 feet in length. They cannot be concealed inside walls, floors, or partitions. Connectors must not be kinked or twisted. Replace connectors that show any signs of corrosion or damage.", plainEs: "Los conectores flexibles de gas que conectan aparatos a la tubería de suministro de gas deben estar listados y etiquetados, y no deben exceder 6 pies de longitud. No pueden estar ocultos dentro de paredes, pisos o particiones.", tags: ["gas", "flex connector", "appliance", "6 feet", "concealed"] },
  // WATER HEATERS
  { id: 8, category: "Water Heaters", title: "TPR valve and discharge pipe", titleEs: "Válvula TPR y tubería de descarga", code: "IPC 504.6", plain: "Every water heater must have a temperature and pressure relief (TPR) valve. The discharge pipe must be the same size as the valve outlet, run full length to within 6 inches of the floor or to a drain, terminate in a visible location, and have NO threads on the discharge end. Never cap or plug a TPR discharge.", plainEs: "Cada calentador de agua debe tener una válvula de alivio de temperatura y presión (TPR). La tubería de descarga debe tener el mismo tamaño que la salida de la válvula, terminar a no más de 6 pulgadas del piso, en una ubicación visible, y NO tener roscas en el extremo de descarga.", tags: ["TPR", "water heater", "relief valve", "safety", "discharge"], diagram: "tprValve" },
  { id: 9, category: "Water Heaters", title: "Thermal expansion tank", titleEs: "Tanque de expansión térmica", code: "IPC 607.3", plain: "A thermal expansion tank is required whenever a backflow preventer, check valve, or pressure reducing valve creates a closed system on the cold water supply to the water heater. Size the tank to match the water heater capacity. Most Texas cities enforce this strictly — it's one of the most common inspection fails.", plainEs: "Se requiere un tanque de expansión térmica cuando un preventer de reflujo, válvula de retención o válvula reductora de presión crea un sistema cerrado en el suministro de agua fría al calentador de agua. Dimensione el tanque para que coincida con la capacidad del calentador.", tags: ["water heater", "expansion tank", "closed system", "backflow"] },
  { id: 10, category: "Water Heaters", title: "Garage installation — 18 inch rule", titleEs: "Instalación en garaje — regla de 18 pulgadas", code: "IPC 305.5", plain: "Water heaters installed in garages must be elevated so the ignition source is at least 18 inches above the garage floor. This prevents ignition of gasoline vapors. Most Texas cities strictly enforce this. A proper platform or listed stand must be used. The water heater pan is also required in garage installations.", plainEs: "Los calentadores de agua instalados en garajes deben elevarse para que la fuente de ignición esté al menos 18 pulgadas sobre el piso del garaje. Esto evita la ignición de vapores de gasolina. La mayoría de las ciudades de Texas lo hacen cumplir estrictamente.", tags: ["water heater", "garage", "18 inches", "ignition", "elevation"], diagram: "waterHeaterGarage" },
  { id: 11, category: "Water Heaters", title: "Attic installation requirements", titleEs: "Requisitos de instalación en ático", code: "IPC 502.3", plain: "Water heaters in attics require: a level working platform at least 24 inches wide on the service side, a continuous pan under the unit with a minimum 3/4 inch drain line to a visible location, a clear 20x30 inch access opening, a light with a switch at the access point, and an 18-inch clearance on the service side. These are strictly checked in Texas.", plainEs: "Los calentadores de agua en áticos requieren: una plataforma de trabajo nivelada de al menos 24 pulgadas de ancho en el lado de servicio, una bandeja continua bajo la unidad con una línea de drenaje mínima de 3/4 de pulgada, una abertura de acceso de 20x30 pulgadas, una luz con interruptor en el punto de acceso y un espacio de 18 pulgadas en el lado de servicio.", tags: ["water heater", "attic", "platform", "pan", "access", "light"] },
  { id: 12, category: "Water Heaters", title: "Water heater pan and drain", titleEs: "Bandeja y drenaje del calentador de agua", code: "IPC 504.7", plain: "A pan with a 3/4 inch minimum drain line is required when a water heater is located where leakage could cause property damage. Pan drain must run to a suitable location such as a floor drain, exterior, or termination point visible to the occupant. Many Texas cities require this in ALL locations.", plainEs: "Se requiere una bandeja con una línea de drenaje mínima de 3/4 de pulgada cuando un calentador de agua está ubicado donde una fuga podría causar daños a la propiedad. El drenaje de la bandeja debe ir a un lugar adecuado como un drenaje de piso, exterior o punto de terminación visible.", tags: ["water heater", "pan", "drain", "leak", "3/4 inch"] },
  { id: 13, category: "Water Heaters", title: "Water heater seismic strapping", titleEs: "Sujeción sísmica del calentador", code: "IPC 507.2", plain: "Water heaters must be strapped or braced in designated seismic zones. In Texas, many city jurisdictions and third-party inspectors require double strapping on units 40 gallons and larger, especially in garage locations, even outside the strict code mandate.", plainEs: "Los calentadores de agua deben estar sujetados o reforzados en zonas sísmicas designadas. En Texas, muchos inspectores de terceros requieren doble sujeción en unidades de 40 galones o más.", tags: ["water heater", "strapping", "seismic", "garage", "40 gallon"] },
  // DRAINAGE
  { id: 14, category: "Drainage", title: "Horizontal drain slope", titleEs: "Pendiente de drenaje horizontal", code: "IPC 704.1", plain: "Horizontal drainage pipes must slope uniformly not less than ¼ inch per foot toward the point of disposal for pipes 2½ inches or smaller. Pipes 3 inches and larger may slope at ⅛ inch per foot minimum. No horizontal drain shall be installed level.", plainEs: "Las tuberías de drenaje horizontales deben tener una pendiente uniforme de no menos de ¼ de pulgada por pie para tuberías de 2½ pulgadas o menores. Las tuberías de 3 pulgadas o más pueden tener una pendiente de ⅛ de pulgada por pie como mínimo.", tags: ["drain", "slope", "horizontal", "grade", "¼ inch"], diagram: "drainSlope" },
  { id: 15, category: "Drainage", title: "Cleanout spacing and access", titleEs: "Espaciado y acceso de limpiezas", code: "IPC 708.1", plain: "Cleanouts are required at each change of direction greater than 45 degrees in horizontal drainage lines, and at maximum 100-foot intervals. Cleanouts must be accessible and installed in the direction of flow for rodding. A cleanout within 5 feet of the building foundation is required in many Texas cities.", plainEs: "Se requieren limpiezas en cada cambio de dirección mayor de 45 grados en líneas de drenaje horizontal, y a intervalos máximos de 100 pies. Las limpiezas deben ser accesibles e instaladas en la dirección del flujo.", tags: ["cleanout", "access", "drain", "100 feet", "45 degrees"] },
  { id: 16, category: "Drainage", title: "Fixture unit values (DFU)", titleEs: "Valores de unidades de accesorios (DFU)", code: "IPC Table 709.1", plain: "Each fixture is assigned a Drainage Fixture Unit (DFU) value: Toilet = 4, Shower = 2, Lavatory = 1, Kitchen sink = 2, Clothes washer = 3, Floor drain = 2, Bathtub = 2, Dishwasher = 2, Urinal = 4. Sum all DFU values to size the building drain and sewer.", plainEs: "A cada accesorio se le asigna un valor de Unidad de Drenaje de Accesorio (DFU): Inodoro = 4, Ducha = 2, Lavabo = 1, Fregadero = 2, Lavadora = 3, Drenaje de piso = 2, Bañera = 2, Lavavajillas = 2, Urinario = 4.", tags: ["DFU", "fixture units", "drain sizing", "toilet", "shower"] },
  { id: 17, category: "Drainage", title: "Trap arm distance (trap to vent)", titleEs: "Distancia del brazo de trampa (trampa al venteo)", code: "IPC Table 909.1", plain: "Maximum trap arm distances from trap weir to vent: 1¼ inch pipe = 30 inches, 1½ inch pipe = 42 inches, 2 inch pipe = 60 inches, 3 inch pipe = 72 inches, 4 inch pipe = 10 feet. Exceeding these distances causes slow draining and sewer gas problems.", plainEs: "Distancias máximas del brazo de trampa desde el vertedero de la trampa al venteo: tubería de 1¼\" = 30\", tubería de 1½\" = 42\", tubería de 2\" = 60\", tubería de 3\" = 72\", tubería de 4\" = 10 pies.", tags: ["trap arm", "vent", "distance", "drain", "P-trap"], diagram: "trapArm" },
  { id: 18, category: "Drainage", title: "Grease interceptor requirements", titleEs: "Requisitos del interceptor de grasa", code: "IPC 1003.3", plain: "Grease interceptors are required on all food service establishments including restaurants, commercial kitchens, cafeterias, and food processing facilities. The interceptor must be sized based on fixture load and flow rate. It must be accessible for cleaning and inspection. Local health codes may have additional requirements.", plainEs: "Se requieren interceptores de grasa en todos los establecimientos de servicio de alimentos incluyendo restaurantes, cocinas comerciales y cafeterías. El interceptor debe dimensionarse según la carga de accesorios y la tasa de flujo.", tags: ["grease interceptor", "restaurant", "commercial kitchen", "grease trap"] },
  { id: 19, category: "Drainage", title: "Floor drain requirements", titleEs: "Requisitos de drenaje de piso", code: "IPC 412.2", plain: "Floor drains are required in commercial kitchens, laundry rooms, and mechanical rooms containing water heaters or HVAC equipment. Each floor drain must be connected to a trap. Floor drains subject to evaporation must have a trap primer or trap seal protection device.", plainEs: "Se requieren drenajes de piso en cocinas comerciales, cuartos de lavandería y cuartos mecánicos que contengan calentadores de agua o equipos HVAC. Cada drenaje de piso debe estar conectado a una trampa.", tags: ["floor drain", "trap", "commercial", "mechanical room", "laundry"] },
  // VENTING
  { id: 20, category: "Venting", title: "Minimum vent pipe diameter", titleEs: "Diámetro mínimo de tubería de venteo", code: "IPC 903.1", plain: "No vent pipe shall be less than 1¼ inches in diameter. Individual vents for sinks and lavatories may use 1¼ inch but main stacks require a minimum of 3 inches. Vent pipe must be the same diameter as the drain it serves or not less than 1¼ inches.", plainEs: "Ninguna tubería de venteo debe tener menos de 1¼ pulgadas de diámetro. Los venteos individuales para fregaderos y lavabos pueden usar 1¼ pulgadas, pero las columnas principales requieren un mínimo de 3 pulgadas.", tags: ["vent", "pipe size", "diameter", "stack", "1¼ inch"] },
  { id: 21, category: "Venting", title: "Vent termination clearances", titleEs: "Distancias de terminación del venteo", code: "IPC 903.2", plain: "Vent pipes must terminate at least 6 inches above the roof surface. They must be at least 10 feet horizontally from any door, window, or air intake opening when the vent terminates less than 2 feet above the opening. Many third-party inspectors measure this to the inch — don't guess.", plainEs: "Las tuberías de venteo deben terminar al menos 6 pulgadas sobre la superficie del techo. Deben estar al menos 10 pies horizontalmente de cualquier puerta, ventana o abertura de entrada de aire.", tags: ["vent", "termination", "roof", "clearance", "10 feet"], diagram: "ventClearance" },
  { id: 22, category: "Venting", title: "Wet venting requirements", titleEs: "Requisitos de venteo húmedo", code: "IPC 908.1", plain: "A wet vent may serve as both a drain and a vent for fixtures on the same floor level. The wet vent pipe must be one pipe size larger than required for the drain alone. Wet venting is limited to bathroom groups (toilet, lavatory, bathtub/shower) — you cannot wet vent kitchen sinks.", plainEs: "Un venteo húmedo puede servir como drenaje y venteo para accesorios en el mismo nivel de piso. La tubería de venteo húmedo debe ser un tamaño de tubería más grande que el requerido solo para el drenaje. No puede hacer venteo húmedo de fregaderos de cocina.", tags: ["wet vent", "vent", "bathroom group", "drain", "pipe size"] },
  { id: 23, category: "Venting", title: "Air admittance valves (AAV)", titleEs: "Válvulas de admisión de aire (AAV)", code: "IPC 918.1", plain: "Air admittance valves (AAVs) may be used in lieu of conventional venting for individual fixtures and branch vents. AAVs must be listed and labeled, installed in accessible locations, and have at least 4 inches of air above the trap weir. AAVs are NOT allowed as the sole vent for a drainage system — the system must still connect to open air somewhere. Not all Texas cities allow AAVs — verify locally.", plainEs: "Las válvulas de admisión de aire (AAVs) pueden usarse en lugar del venteo convencional para accesorios individuales. Las AAVs deben estar listadas y etiquetadas, instaladas en ubicaciones accesibles. No todas las ciudades de Texas permiten AAVs — verifique localmente.", tags: ["AAV", "air admittance valve", "vent", "studor", "island sink"] },
  // WATER SUPPLY
  { id: 24, category: "Water Supply", title: "Pressure reducing valve (PRV)", titleEs: "Válvula reductora de presión (PRV)", code: "IPC 604.8", plain: "Where the water pressure supplied exceeds 80 PSI, a pressure reducing valve is required on the building water service. Set the PRV to deliver between 60–80 PSI downstream. The PRV must be accessible for service and have a union for easy replacement.", plainEs: "Cuando la presión del agua suministrada excede 80 PSI, se requiere una válvula reductora de presión en el servicio de agua del edificio. Configure la PRV para entregar entre 60–80 PSI aguas abajo.", tags: ["pressure", "PRV", "water supply", "80 PSI", "pressure reducing"] },
  { id: 25, category: "Water Supply", title: "Individual fixture shutoff valves", titleEs: "Válvulas de cierre individuales por accesorio", code: "IPC 606.1", plain: "Accessible shutoff valves must be provided for each plumbing fixture. This includes valves on the hot and cold supply to lavatories, sinks, water closets, dishwashers, washing machines, and ice makers. Many Texas cities require isolation valves at every fixture — verify local amendments.", plainEs: "Se deben proporcionar válvulas de cierre accesibles para cada accesorio de plomería. Esto incluye válvulas en el suministro caliente y frío de lavabos, fregaderos, inodoros, lavavajillas y lavadoras.", tags: ["shutoff valve", "fixture", "isolation", "individual", "accessible"] },
  { id: 26, category: "Water Supply", title: "Water service pipe materials", titleEs: "Materiales de tubería de servicio de agua", code: "IPC 605.3", plain: "Water service pipe from the meter to the building must be approved materials: Type K or L copper, HDPE (PE 4710), or PVC (AWWA C900). Many Texas cities restrict to copper within a set distance of the meter. PEX is generally allowed inside the structure but verify for underground service. Always check local amendments.", plainEs: "La tubería de servicio de agua desde el medidor hasta el edificio debe ser de materiales aprobados: cobre Tipo K o L, HDPE, o PVC. Muchas ciudades de Texas restringen el uso de cobre dentro de cierta distancia del medidor.", tags: ["water service", "pipe material", "copper", "HDPE", "PVC", "PEX"] },
  { id: 27, category: "Water Supply", title: "Water hammer arrestors", titleEs: "Arrestadores de golpe de ariete", code: "IPC 604.9", plain: "Water hammer arrestors are required where quick-closing valves are used, such as dishwashers, washing machines, and solenoid valves. Arrestors must be listed per ASSE 1010. Install on both hot and cold supply lines serving the appliance. Size according to ASSE 1010 fixture unit load tables.", plainEs: "Se requieren arrestadores de golpe de ariete donde se usan válvulas de cierre rápido, como lavavajillas, lavadoras y válvulas solenoides. Los arrestadores deben estar listados según ASSE 1010.", tags: ["water hammer", "arrestor", "washing machine", "dishwasher", "solenoid", "ASSE 1010"] },
  { id: 28, category: "Water Supply", title: "Showerhead flow rate — IPC 2024", titleEs: "Caudal de cabezal de ducha — IPC 2024", code: "IPC 2024 408.2", plain: "The 2024 IPC limits showerhead flow to a maximum of 2.0 GPM. This applies in cities on IPC 2024: Plano (Aug 2025), The Colony (Jul 2025), Flower Mound (Oct 2025), Frisco (Mar 2026), McAllen (Jan 2026), Killeen, Sugar Land, San Antonio. Verify your city before selecting fixtures.", plainEs: "El IPC 2024 limita el caudal del cabezal de ducha a un máximo de 2.0 GPM. Se aplica en ciudades con IPC 2024: Plano, The Colony, Flower Mound, Frisco, McAllen, Killeen, Sugar Land, San Antonio.", tags: ["showerhead", "flow rate", "GPM", "IPC 2024", "water conservation"] },
  { id: 29, category: "Water Supply", title: "Hot water recirculation systems", titleEs: "Sistemas de recirculación de agua caliente", code: "IPC 607.2", plain: "Where the developed length of hot water piping from the source to any fixture exceeds 100 feet, a hot water recirculation system or heat-traced piping is required in many jurisdictions. Some Texas cities (McKinney, Frisco) require recirculation when the run exceeds 50 feet. Verify local requirements.", plainEs: "Cuando la longitud desarrollada de la tubería de agua caliente desde la fuente hasta cualquier accesorio excede 100 pies, se requiere un sistema de recirculación de agua caliente en muchas jurisdicciones. Algunas ciudades de Texas lo requieren a partir de 50 pies.", tags: ["recirculation", "hot water", "100 feet", "50 feet", "heat trace"] },
  // BACKFLOW
  { id: 30, category: "Backflow", title: "Irrigation backflow prevention", titleEs: "Prevención de reflujo en irrigación", code: "IPC 608.16.5", plain: "All lawn irrigation systems connected to a potable water supply must have a backflow preventer. A pressure vacuum breaker (PVB) is the minimum for residential irrigation. A reduced pressure zone (RPZ) assembly is required where chemicals, fertilizers, or pesticides are injected into the system.", plainEs: "Todos los sistemas de irrigación de césped conectados a un suministro de agua potable deben tener un preventor de reflujo. Un interruptor de vacío de presión (PVB) es el mínimo para irrigación residencial. Se requiere una zona de presión reducida (RPZ) donde se inyectan químicos.", tags: ["backflow", "irrigation", "PVB", "RPZ", "sprinkler"], diagram: "backflowPVB" },
  { id: 31, category: "Backflow", title: "Hose bibb vacuum breaker", titleEs: "Interruptor de vacío para toma de manguera", code: "IPC 608.15.4.1", plain: "All outdoor hose connection sillcocks must have an integral or field-installed vacuum breaker. Non-removable type is required. This prevents contaminated water (from a submerged hose) from being siphoned back into the potable supply. This is one of the most commonly missed items on inspections.", plainEs: "Todos los grifos de conexión de manguera al aire libre deben tener un interruptor de vacío integral o instalado en campo. Se requiere el tipo no removible. Esto evita que el agua contaminada sea sifoneada de vuelta al suministro de agua potable.", tags: ["hose bibb", "vacuum breaker", "sillcock", "backflow", "outdoor"] },
  { id: 32, category: "Backflow", title: "Reduced pressure zone (RPZ) assembly", titleEs: "Ensamble de zona de presión reducida (RPZ)", code: "IPC 608.13.2", plain: "An RPZ backflow preventer is required for high-hazard applications including: commercial irrigation with chemical injection, connections to industrial equipment, medical equipment connections, and in cities that require RPZ on all commercial irrigation. RPZ must be tested annually by a certified tester and installed in an accessible, above-grade location.", plainEs: "Se requiere un preventer de reflujo RPZ para aplicaciones de alto riesgo incluyendo: irrigación comercial con inyección de químicos, conexiones a equipos industriales, y en ciudades que requieren RPZ en toda irrigación comercial. El RPZ debe probarse anualmente.", tags: ["RPZ", "backflow", "commercial", "high hazard", "annual test"] },
  // FIXTURES
  { id: 33, category: "Fixtures", title: "Shower pressure balance valves", titleEs: "Válvulas de balance de presión en ducha", code: "IPC 412.3", plain: "All shower and tub/shower combination controls must be pressure-balancing or thermostatic mixing valves. Maximum delivered water temperature is 120°F. Required in all new construction and replacements. These prevent scalding when someone flushes a toilet while you're showering.", plainEs: "Todos los controles de ducha y combinación tina/ducha deben ser válvulas de balance de presión o mezcla termostática. La temperatura máxima entregada es 120°F. Requerida en toda construcción nueva y reemplazos.", tags: ["shower", "valve", "scald", "pressure balance", "thermostatic", "120°F"] },
  { id: 34, category: "Fixtures", title: "Water closet clearances", titleEs: "Espacios libres del inodoro", code: "IPC 405.3", plain: "Toilets must have a minimum of 15 inches from the center of the toilet to any side wall or obstruction, and 21 inches clear in front of the toilet. For accessible (ADA) toilets, clearances increase significantly. These measurements are checked on final inspection — rough-in placement matters.", plainEs: "Los inodoros deben tener un mínimo de 15 pulgadas desde el centro del inodoro hasta cualquier pared lateral u obstáculo, y 21 pulgadas libres al frente del inodoro.", tags: ["toilet", "water closet", "clearance", "15 inches", "21 inches", "ADA"] },
  { id: 35, category: "Fixtures", title: "Minimum shower size", titleEs: "Tamaño mínimo de ducha", code: "IPC 417.4", plain: "Shower compartments must have a minimum finished interior dimension of 30 inches in any direction and a minimum of 900 square inches of floor area. A shower measuring 30x30 inches technically meets minimum code but is considered very small — 36x36 is more practical.", plainEs: "Los compartimentos de ducha deben tener una dimensión interior terminada mínima de 30 pulgadas en cualquier dirección y un área mínima de piso de 900 pulgadas cuadradas.", tags: ["shower", "size", "minimum", "30 inches", "900 square inches"] },
  // GENERAL
  { id: 36, category: "Drainage", title: "Tracer wire — buried plastic pipe (IPC 2024)", titleEs: "Alambre trazador — tubería plástica enterrada (IPC 2024)", code: "IPC 2024 305.6", plain: "The 2024 IPC requires tracer wire on all buried plastic sewer piping. Wire must be continuous and accessible at each end. This applies in cities on IPC 2024 only. Not required under IPC 2021 as a code mandate, though many cities required it locally before 2024.", plainEs: "El IPC 2024 requiere alambre trazador en toda tubería de alcantarillado plástica enterrada. El alambre debe ser continuo y accesible en cada extremo.", tags: ["tracer wire", "buried pipe", "sewer", "IPC 2024", "plastic pipe"] },
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

      </div>

      {/* BOTTOM NAV */}
      <div className="nb">
        {[{ id: "home", label: t.navHome, icon: "home", color: "#7acae0" }, { id: "codes", label: t.navCodes, icon: "book", color: "#7acae0" }, { id: "jurisdiction", label: t.navCities, icon: "map", color: "#4a9a6a" }, { id: "inspectors", label: t.navInspectors, icon: "user", color: "#c8a030" }].map(item => {
          const active = screen === item.id;
          return <div key={item.id} className="ni" onClick={() => navTo(item.id)}><Icon name={item.icon} size={22} color={active ? item.color : "#3a4a5a"} /><span className="nl" style={{ color: active ? item.color : "#3a4a5a" }}>{item.label}</span></div>;
        })}
      </div>
    </div>
  );
}
