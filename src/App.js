import { useState, useRef, useEffect, Component } from "react";

// ─── ERROR BOUNDARY ──────────────────────────────────────────
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("App crashed:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", background: "#0e1215", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, color: "#c8d8e8" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 12, color: "#e8f0f8" }}>Something went wrong</div>
          <div style={{ fontFamily: "sans-serif", fontSize: 14, color: "#4a6a7a", marginBottom: 12, textAlign: "center" }}>The app hit an unexpected error. Tap below to reload.</div>
          {this.state.error && <div style={{ fontFamily: "monospace", fontSize: 11, color: "#c85a30", marginBottom: 20, textAlign: "center", maxWidth: 340, wordBreak: "break-word", padding: "8px 12px", background: "#1a0a0a", borderRadius: 8, border: "1px solid #3a1a1a" }}>{this.state.error.toString()}</div>}
          <button onClick={() => window.location.reload()} style={{ background: "linear-gradient(135deg,#d4820a,#8a5006)", border: "none", borderRadius: 12, padding: "14px 32px", cursor: "pointer", fontFamily: "sans-serif", fontWeight: 700, fontSize: 16, color: "#fff" }}>RELOAD APP</button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    jobModeTitle: "JOB MODE",
    jobModeSub: "Take up to 10 photos — Bob builds your parts list",
    jobModeStart: "START NEW JOB",
    jobModeAddress: "Job Address (optional)",
    jobModeAddressPlaceholder: "123 Main St, City, TX",
    jobModePhoto: "ADD PHOTO",
    jobModePhotoCount: "photos taken",
    jobModeAnalyzing: "Analyzing photo",
    jobModeDone: "BUILD PARTS LIST",
    jobModeReset: "START OVER",
    jobModePartsTitle: "JOB PARTS LIST",
    jobModeTotal: "Estimated Total",
    jobModeShareReport: "SHARE REPORT",
    jobModeCopyReport: "COPY REPORT",
    jobModeNoIssues: "All parts code approved",
    jobModeIssues: "issues need attention",
    jobModeEstimate: "ESTIMATE",
    estimateTitle: "JOB ESTIMATOR",
    estimateSub: "Material + labor estimate for this job",
    estimateMaterial: "Materials",
    estimateLabor: "Labor (est.)",
    estimatePermit: "Permit Fee (est.)",
    estimateMarkup: "Markup",
    estimateTotal: "Total Bid",
    estimateMarkupLabel: "Markup %",
    estimateLaborHours: "Labor Hours",
    estimateLaborRate: "Labor Rate / hr",
    estimateDisclaimer: "Estimates based on current market rates. Verify locally before bidding.",
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
    jobModeTitle: "MODO TRABAJO",
    jobModeSub: "Toma hasta 10 fotos — Bob construye tu lista de partes",
    jobModeStart: "INICIAR TRABAJO",
    jobModeAddress: "Dirección del Trabajo (opcional)",
    jobModeAddressPlaceholder: "123 Calle Principal, Ciudad, TX",
    jobModePhoto: "AGREGAR FOTO",
    jobModePhotoCount: "fotos tomadas",
    jobModeAnalyzing: "Analizando foto",
    jobModeDone: "CREAR LISTA DE PARTES",
    jobModeReset: "EMPEZAR DE NUEVO",
    jobModePartsTitle: "LISTA DE PARTES",
    jobModeTotal: "Total Estimado",
    jobModeShareReport: "COMPARTIR REPORTE",
    jobModeCopyReport: "COPIAR REPORTE",
    jobModeNoIssues: "Todas las partes aprobadas",
    jobModeIssues: "problemas necesitan atención",
    jobModeEstimate: "ESTIMAR",
    estimateTitle: "ESTIMADOR DE TRABAJO",
    estimateSub: "Estimado de material + mano de obra",
    estimateMaterial: "Materiales",
    estimateLabor: "Mano de Obra (est.)",
    estimatePermit: "Costo de Permiso (est.)",
    estimateMarkup: "Markup",
    estimateTotal: "Precio Total",
    estimateMarkupLabel: "Markup %",
    estimateLaborHours: "Horas de Trabajo",
    estimateLaborRate: "Tarifa / hr",
    estimateDisclaimer: "Estimados basados en precios actuales del mercado. Verifica localmente antes de cotizar.",
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
  { id: 37, category: "Drainage", title: "Street cleanout — driveway protection (steel boot)", titleEs: "Limpieza de calle — protección en entrada (boot de acero)", code: "IPC 305.3 · UPC 314.1", plain: "Any cleanout installed in a location exposed to vehicle traffic — driveways, parking areas, alleys — must be protected from damage. Simply installing a standard plastic or brass cap flush with a driveway surface does NOT meet code.\n\nWhat's required:\n• A traffic-rated cast iron or steel cleanout box (\"steel boot\") with a load-bearing lid rated for vehicle traffic\n• The cleanout cap must remain accessible — do not pour concrete over it without a properly rated cover\n• The finished top of the cleanout assembly must be flush with the surrounding surface\n\n🔵 IPC 305.3: \"Components of a plumbing system installed along alleyways, driveways, parking garages or other locations exposed to damage shall be recessed into the wall or otherwise protected in an approved manner.\"\n\n🟠 UPC 314.1: Same protection requirement — any plumbing component subject to damage from vehicles must be protected in an approved manner.\n\n⚠ FIELD NOTE: If a civil developer placed the stub-out and it landed in the driveway, the fix is the steel boot — not moving the cleanout. Moving the cleanout may require the civil engineer of record to revise the site plan. See Code #39 for jurisdiction-specific rules on who can relocate a street cleanout.", plainEs: "Cualquier limpieza instalada en una ubicación expuesta al tráfico vehicular debe protegerse del daño. Una tapa estándar al ras de la entrada NO cumple con el código.\n\nQué se requiere:\n• Un cajón de hierro fundido o acero clasificado para tráfico (\"boot de acero\") con tapa resistente al peso de vehículos\n• La tapa del cleanout debe permanecer accesible\n• La parte superior del conjunto debe quedar al ras con la superficie circundante\n\n⚠ NOTA DE CAMPO: Si el desarrollador civil colocó el stub y quedó en la entrada, la solución es el boot de acero, no mover el cleanout.", tags: ["cleanout", "driveway", "steel boot", "traffic rated", "protection", "IPC 305.3", "UPC 314.1", "cast iron", "vehicle"] },
  { id: 38, category: "Drainage", title: "Building sewer cleanout — location & spacing", titleEs: "Limpieza de albañal — ubicación y espaciado", code: "IPC 708.3.2 · UPC 719.1", plain: "The building sewer must have cleanouts at specific locations and intervals. This is one of the most commonly failed rough inspections in new construction.\n\nRequired cleanout locations:\n• At the junction of the building drain and building sewer — within 10 feet upstream of the connection\n• At every change of horizontal direction greater than 45 degrees\n• At intervals not exceeding 100 feet for sewers smaller than 8 inches\n• At the upper terminal of each horizontal drain\n\n🔵 IPC 708.3.2: Building sewers smaller than 8\" require cleanouts every 100 feet measured from the upstream entry of the cleanout. Where more than one direction change greater than 45° occurs within 40 feet, a single cleanout at the first change serves all changes within that 40-foot run.\n\n🟠 UPC 719.1: UPC requires cleanouts at intervals of 100 feet in the building sewer AND at each change of direction. The UPC is generally consistent with the IPC on spacing but is more explicit about requiring cleanouts at the base of each stack.\n\n⚠ FIELD TIP: On a slab pour, the inspector is looking for the cleanout at the building drain/sewer junction — if it's missing or more than 10 feet upstream, expect a fail. Mark it with a flag stake before the pour so the concrete crew doesn't bury it.", plainEs: "El albañal debe tener limpiezas en ubicaciones específicas e intervalos.\n\nUbicaciones requeridas:\n• En la unión del drenaje del edificio y el albañal — dentro de 10 pies aguas arriba\n• En cada cambio de dirección horizontal mayor de 45 grados\n• A intervalos que no excedan 100 pies\n• En el terminal superior de cada drenaje horizontal\n\n🔵 IPC 708.3.2: Un cleanout en el primer cambio de dirección sirve para todos los cambios dentro de 40 pies.\n\n🟠 UPC 719.1: Consistente con el IPC en espaciado, más explícito sobre la base de cada bajante.\n\n⚠ CONSEJO DE CAMPO: En una losa, el inspector busca el cleanout en la unión del drenaje — si falta o está a más de 10 pies aguas arriba, espera un rechazo.", tags: ["cleanout", "building sewer", "100 feet", "45 degrees", "stack", "junction", "spacing", "IPC 708", "UPC 719"] },
  { id: 39, category: "Drainage", title: "Street cleanout relocation — civil vs. plumbing scope", titleEs: "Reubicación de limpieza de calle — alcance civil vs. plomería", code: "IPC 708 · Local Civil / Site Plan", plain: "This is one of the most misunderstood scope boundaries in Texas new construction plumbing — and it varies by city.\n\n⚠ THE CORE ISSUE:\nThe stub-out coming from the street (the wye and lateral stub installed by the civil contractor during subdivision infrastructure work) is NOT part of your plumbing permit. It was designed and permitted as civil/site work under the developer's engineering plan, often reviewed by the city's public works or engineering department — completely separate from the building department that issues your plumbing permit.\n\nThis means: where that cleanout lands is largely set before a house plan exists. When the driveway gets platted, it sometimes falls right on top of the stub.\n\nWHO CAN MOVE IT — varies by jurisdiction:\n\n🔴 DEVELOPER-CONTROLLED CITIES (Marble Falls, some Hill Country jurisdictions): The stub was installed under a civil permit. Relocating it requires the civil engineer of record to revise the site plan drawings, the developer to authorize the work, and a separate public works or utility permit. The plumber cannot move it unilaterally even with an approved plumbing permit. Your only option without developer authorization is the steel boot (see Code #37).\n\n🟡 CASE-BY-CASE CITIES (most Texas municipalities): Call the inspector before the pour. Explain that the stub landed in the drive. Many inspectors will grant a field authorization to offset the cleanout out of the traffic path, provided it stays within code spacing requirements and you document it. This is the most common outcome in DFW and Central Texas.\n\n🟢 PLUMBER-CAN-RELOCATE CITIES (some Central Texas cities including parts of Round Rock and Cedar Park): The licensed plumber pulling the building permit has authority to relocate the building sewer cleanout as part of the permitted scope, provided the relocation complies with IPC 708 spacing requirements and is inspected.\n\nPRACTICAL STEPS:\n1. Before you set out — locate the stub and confirm it's not in the driveway footprint\n2. If it is — call the inspector and the super the same day you discover it\n3. Ask the inspector if a field authorization is available or if you need developer involvement\n4. If you must leave it in the drive — install a traffic-rated steel boot (Code #37)\n5. Document everything — a photo before and after protects you\n\n⚠ NEVER pour a slab over a cleanout without a properly rated traffic cover. That is a failed inspection and a future liability.", plainEs: "Este es uno de los límites de alcance más incomprendidos en la plomería de nueva construcción en Texas — y varía por ciudad.\n\n⚠ EL PROBLEMA CENTRAL:\nEl stub de la calle (el Y y el stub lateral instalado por el contratista civil) NO es parte de tu permiso de plomería. Fue diseñado y permitido como trabajo civil bajo el plan de ingeniería del desarrollador.\n\nQUIÉN PUEDE MOVERLO — varía por jurisdicción:\n\n🔴 CIUDADES CONTROLADAS POR DESARROLLADOR (Marble Falls, algunas jurisdicciones de Hill Country): Requiere que el ingeniero civil revise los planos. El plomero NO puede moverlo unilateralmente.\n\n🟡 CIUDADES CASO POR CASO (mayoría de municipios de Texas): Llama al inspector antes de la colada. Muchos inspectores otorgan autorización de campo para compensar el cleanout fuera del camino de tráfico.\n\n🟢 CIUDADES DONDE EL PLOMERO PUEDE REUBICAR (algunas ciudades del centro de Texas): El plomero con el permiso del edificio tiene autoridad para reubicar el cleanout.\n\nPASOS PRÁCTICOS:\n1. Antes de comenzar — localiza el stub y confirma que no está en la entrada\n2. Si lo está — llama al inspector y al supervisor el mismo día\n3. Pregunta si hay autorización de campo disponible\n4. Si debe quedarse en la entrada — instala un boot de acero (Código #37)\n5. Documenta todo con fotos", tags: ["cleanout", "street cleanout", "driveway", "civil", "developer", "relocation", "Marble Falls", "scope", "stub-out", "building sewer", "field authorization", "new construction"] },
  { id: 40, category: "Drainage", title: "No-hub couplings — new construction vs. repair", titleEs: "Acoples no-hub — nueva construcción vs. reparación", code: "IPC 705.5 · ASTM C1540", plain: "No-hub couplings (mechanical couplings — Fernco, Mission, etc.) are code-approved under IPC 705.5 and ASTM C1540 for joining drainage piping. They are the standard repair method when graders or other trades break a pipe in rough-in work.\n\nCODE SAYS: No-hub couplings are approved for use in drainage systems under both IPC and UPC when listed and labeled per ASTM C1540 or C564. Code does not distinguish between new construction and repair applications.\n\nFIELD REALITY — INSPECTOR DISCRETION:\nDespite code approval, some inspectors in Texas — particularly in smaller Hill Country jurisdictions — do not allow no-hub couplings on new construction rough-in under slab. This is inspector preference, not a code requirement, but it has the same practical effect as a written restriction.\n\n!! MARBLE FALLS — CONFIRMED RESTRICTION:\nThe Marble Falls building inspector does NOT accept no-hub (mechanical) couplings for new construction rough-in repairs. If a grader breaks a pipe and you repair it with a Fernco-style coupling, it will fail inspection. Your options:\n1. Cut out the damaged section completely and rejoin with a PVC solvent-weld coupling (preferred)\n2. If the break is mid-run, extend back to the nearest hub fitting and re-run with solid PVC\n3. Worst case — re-rough the entire affected bathroom group\n\nALWAYS call the inspector before making any under-slab grader-damage repair in a smaller or Hill Country jurisdiction. A 5-minute phone call can prevent a full re-rough.\n\n🟢 MOST TEXAS CITIES (DFW, Houston, Austin, San Antonio): No-hub couplings accepted for both new construction repair work and existing system repairs when properly listed and installed.", plainEs: "Los acoples no-hub (Fernco, Mission, etc.) están aprobados por código bajo IPC 705.5 y ASTM C1540.\n\nREALIDAD DE CAMPO:\nAlgunos inspectores no aceptan acoples no-hub en nueva construcción bajo losa.\n\n!! MARBLE FALLS — RESTRICCION CONFIRMADA:\nEl inspector NO acepta acoples mecánicos en reparaciones de rough-in de nueva construcción.\n\n🟢 MAYORIA DE CIUDADES DE TEXAS: Acoples no-hub aceptados para reparaciones.", tags: ["no-hub", "mechanical coupling", "Fernco", "Mission", "grader damage", "repair", "new construction", "Marble Falls", "under slab", "IPC 705.5", "ASTM C1540", "inspector preference", "Hill Country"] },
  { id: 41, category: "Drainage", title: "Horizontal drain slope requirements", titleEs: "Requisitos de pendiente en drenajes horizontales", code: "IPC 704.1 · UPC 708.0", plain: "Horizontal drainage pipe must maintain minimum slope for the pipe to self-clean and drain properly. This is one of the most commonly failed slab inspections in Texas new construction.\n\nMINIMUM SLOPES BY PIPE SIZE:\n• 2-1/2 inch and smaller: 1/4 inch per foot (2% slope)\n• 3 inch and 4 inch: 1/8 inch per foot (1% slope)\n• 6 inch: 1/8 inch per foot (1% slope)\n• 8 inch and larger: 1/16 inch per foot (0.5% slope)\n\n🔵 IPC 704.1 & 🟠 UPC 708.0: Both codes use the same minimum slope table. No meaningful difference between IPC and UPC cities on this requirement.\n\nCOMMON FAIL SCENARIOS:\n• Running 3-inch or 4-inch drain pipe at 1/4 inch per foot — technically more slope than required but if it creates a sag or inconsistent grade, it fails\n• Long horizontal runs that lose slope at the far end due to inconsistent trench bottom\n• Piping that dips in the middle — creates a belly that holds solids and eventually clogs\n\nFIELD TIP: On a slab pour, inspectors probe with a level on accessible horizontal runs. Mark your high and low points with spray paint before the inspector arrives. A consistent grade is more important than exceeding minimum slope.", plainEs: "La tubería de drenaje horizontal debe mantener la pendiente mínima para auto-limpiarse.\n\nPENDIENTES MINIMAS:\n• 2-1/2 pulgadas y menores: 1/4 pulg/pie\n• 3 y 4 pulgadas: 1/8 pulg/pie\n• 6 pulgadas: 1/8 pulg/pie\n• 8 pulgadas y mayores: 1/16 pulg/pie\n\n🔵 IPC y 🟠 UPC: Mismas pendientes mínimas en ambos códigos.\n\nCONSEJO DE CAMPO: Marca los puntos altos y bajos con pintura antes de la inspección.", tags: ["drain slope", "horizontal drain", "1/4 inch per foot", "1/8 inch", "slab", "inspection fail", "IPC 704", "UPC 708", "new construction"] },
  { id: 42, category: "Drainage", title: "Pipe penetration sealing — annular space", titleEs: "Sellado de penetraciones de tubería", code: "IPC 305.6 · UPC 313.0", plain: "Any pipe passing through a wall, floor, or ceiling assembly must have the annular space — the gap between the outside of the pipe and the opening — sealed properly. This is one of the most commonly missed items on top-out and final inspections.\n\nWHAT IS REQUIRED:\nThe annular space must be sealed with an approved material — caulking compound, foam sealant, or a listed gasketing system — that is compatible with both the pipe material and the building material around it.\n\n🔵 IPC 305.6: The annular space between the outside of a pipe and a wall, floor, or ceiling assembly penetrated by a pipe shall be sealed in an approved manner with caulking material, foam sealant, or a gasketing system.\n\n🟠 UPC 313.0: Same requirement — pipe sleeves and openings must be sealed to prevent entry of rodents, insects, gases, or water.\n\nFIRE-RATED ASSEMBLIES — CRITICAL:\nWhere a pipe penetrates a fire-resistance-rated wall or floor, a standard caulk seal is NOT sufficient. You must use a listed and labeled intumescent firestop product — a wrap, collar, putty pad, or firestop caulk rated for that specific pipe material and wall assembly. This is strictly enforced on commercial jobs and increasingly on residential.\n\nCOMMON FAIL: Inspectors walk the attic and basement looking for open pipe penetrations through top plates, fire blocking, and floor assemblies. An unsealed penetration through a top plate on a two-story home is an automatic fail.", plainEs: "Cualquier tubería que pase por una pared, piso o techo debe tener el espacio anular sellado correctamente.\n\n🔵 IPC 305.6 y 🟠 UPC 313.0: El espacio entre la tubería y la abertura debe sellarse con material aprobado.\n\nASAMBLEAS CON CLASIFICACION CONTRA INCENDIO: Se requiere producto de sellado cortafuego listado — no basta con silicona regular.", tags: ["pipe penetration", "annular space", "firestop", "sealing", "caulk", "top plate", "IPC 305.6", "UPC 313", "fire rated", "inspection fail"] },
  { id: 43, category: "Drainage", title: "S-trap prohibition", titleEs: "Prohibición de trampa en S", code: "IPC 1002.1 · UPC 1002.1", plain: "S-traps are prohibited under both the IPC and UPC. They were common in older homes but are no longer allowed in new construction or remodel work.\n\nWHY S-TRAPS FAIL:\nAn S-trap has the drain entering from the top, looping down and back up, then exiting downward. The problem is self-siphoning — when water flows through the trap rapidly, it pulls the water seal right out of the trap behind it. Once the water seal is gone, sewer gas has a direct path into the living space. This is a health hazard and an immediate inspection fail.\n\n🔵 IPC 1002.1 & 🟠 UPC 1002.1: Both codes require traps to be properly vented to prevent siphoning. An S-trap by definition cannot be properly vented — the vent connection comes after the trap seal, not between the fixture and the trap.\n\nWHERE YOU FIND THEM:\n• Under sinks in older homes where a vent was never run\n• Remodel work where someone added a drain without thinking about venting\n• Kitchen sinks moved during a remodel where the drain now has to go down through the floor\n\nTHE FIX: Run a proper vent. If the wall vent is not accessible, an air admittance valve (AAV) is permitted by the IPC as an alternative in most jurisdictions — but NOT under the UPC in Houston and Austin without special approval. Check local amendments before installing an AAV.", plainEs: "Las trampas en S están prohibidas bajo IPC y UPC por auto-sifonamiento — el sello de agua se elimina y el gas cloacal entra al espacio habitable.\n\n🔵 IPC 1002.1 y 🟠 UPC 1002.1: Ambos códigos requieren ventilación adecuada.\n\nDONDE SE ENCUENTRAN: En casas antiguas bajo lavabos y cocinas donde nunca se instaló ventilación.\n\nLA SOLUCIÓN: Instalar ventilación correcta o válvula de admisión de aire (AAV) donde sea permitido.", tags: ["S-trap", "trap", "siphon", "sewer gas", "vent", "AAV", "air admittance valve", "IPC 1002", "UPC 1002", "prohibited"] },
  { id: 44, category: "Water Supply", title: "Individual fixture shutoff valves", titleEs: "Válvulas de cierre individuales por accesorio", code: "IPC 606.1 · UPC 605.4", plain: "Every plumbing fixture must have its own individual shutoff valve installed in an accessible location. This is one of the most common final inspection failures in both new construction and remodel work.\n\nREQUIRED AT EVERY:\n• Toilet — angle stop or straight stop at the supply inlet\n• Lavatory (bathroom sink) — hot and cold angle stops under the sink\n• Kitchen sink — hot and cold angle stops under the sink\n• Dishwasher — shutoff on the hot supply line\n• Ice maker — shutoff on the supply line\n• Water heater — shutoff on cold inlet\n• Washing machine — hot and cold shutoffs at the wall box\n\n🔵 IPC 606.1: Individual shutoff valves required on the fixture supply to each plumbing fixture in all occupancies except specific hotel/motel exceptions.\n\n🟠 UPC 605.4: Same requirement — individual shutoff valves at each fixture.\n\nFIELD STANDARD:\nBall valve angle stops are the current standard — not the old compression-style stops which fail over time. Braided stainless steel flex supply lines with metal fittings are the standard. Plastic braided lines are not accepted by most Texas inspectors.\n\nWHEN YOU ARRIVE AND THERE ARE NO SHUTOFFS (very common on older homes):\n• Do not just do the repair and leave — if you are touching a fixture the right thing is to add the shutoff as part of the job\n• If the customer cannot afford it today, document in writing that no individual shutoff exists and that you recommended it. This protects you if there is ever a water loss claim.\n• To add an angle stop where none exists — shut off the house main, cut the supply stub, solder or press a new angle stop, restore water\n• On older homes with compression-style stops that have been in place 20+ years — when you close them to do the repair they often will not reopen or they drip. Replace them while you are there. Turning an old compression stop is how you turn a service call into an emergency.\n\nOLD CORRODED STOPS:\n• A stop that spins freely and does not shut off = failed packing — replace it\n• A stop with green corrosion around the packing nut = leaking packing — replace it\n• A stop that cannot be turned by hand = do not force it with pliers — shut off the house main and replace the stop\n• Always test every stop on the job before you leave — open and close it to confirm it works", plainEs: "Cada accesorio de plomería debe tener su propia válvula de cierre individual accesible.\n\nREQUERIDO EN: Inodoro, lavabo, fregadero, lavavajillas, máquina de hielo, calentador, lavadora.\n\n🔵 IPC 606.1 y 🟠 UPC 605.4: Válvulas individuales requeridas en todos los accesorios.\n\nCUANDO LLEGAS Y NO HAY VÁLVULAS (muy común en casas antiguas):\n• No hagas solo la reparación y te vayas — agrega la válvula como parte del trabajo\n• Si el cliente no puede pagarlo hoy, documenta por escrito que no existe válvula y que lo recomendaste\n• Válvulas de compresión antiguas de 20+ años — cuando las cierras para hacer la reparación a menudo no se vuelven a abrir. Reemplázalas mientras estás ahí.\n• Siempre prueba cada válvula en el trabajo antes de salir.", tags: ["shutoff valve", "angle stop", "fixture", "individual", "toilet", "lavatory", "kitchen", "IPC 606", "UPC 605", "inspection fail", "no shutoff", "old home", "compression stop", "corroded", "service call"] },
  { id: 45, category: "Fixtures", title: "Dishwasher drain — air gap vs. high loop", titleEs: "Drenaje de lavavajillas — espacio de aire vs. lazo alto", code: "IPC 807.4 · UPC 807.3", plain: "The dishwasher drain must be protected against backflow from the drain system. There are two accepted methods — and which one is required depends on your code and jurisdiction.\n\nMETHOD 1 — AIR GAP DEVICE:\nA listed air gap fitting mounted at the sink deck or countertop, with the drain hose connecting from the dishwasher to the inlet of the air gap, and a second hose from the outlet of the air gap to the disposal or drain. The air gap physically breaks the connection and prevents backflow under any condition.\n\nMETHOD 2 — HIGH LOOP:\nThe dishwasher drain hose is looped as high as possible under the counter — typically secured to the underside of the countertop — before connecting to the disposal or drain tailpiece. This relies on gravity to prevent backflow.\n\n🔵 IPC 807.4 CITIES (Dallas, Fort Worth, most of Texas): Both the air gap device AND the high loop are accepted methods. High loop is commonly used in IPC cities.\n\n🟠 UPC 807.3 CITIES (Houston, Austin): The UPC strongly prefers the air gap device as the primary method. Many Houston and Austin inspectors require the air gap device and will not accept a high loop as equivalent protection. Verify with your inspector before installation.\n\nFIELD TIP: If in doubt, install the air gap. It costs $8 and takes 10 minutes. Arguing with an inspector about high loops costs more than that.", plainEs: "El drenaje del lavavajillas debe protegerse contra el reflujo.\n\nMETODO 1 — ESPACIO DE AIRE: Accesorio listado montado en la cubierta del fregadero.\n\nMETODO 2 — LAZO ALTO: La manguera se eleva lo más posible bajo el mostrador.\n\n🔵 IPC (Dallas, DFW): Ambos métodos aceptados.\n🟠 UPC (Houston, Austin): Se prefiere el espacio de aire — verificar con el inspector.", tags: ["dishwasher", "air gap", "high loop", "drain", "backflow", "IPC 807", "UPC 807", "Houston", "Austin"] },
  { id: 46, category: "Fixtures", title: "Ballcock / non-anti-siphon fill valve — cross-connection violation", titleEs: "Llave de bola / válvula de llenado sin anti-sifonamiento", code: "IPC 425.3 · UPC 603.4.1 · TCEQ 30 TAC 290.46", plain: "The old-style ballcock — the toilet fill valve with a large float ball on a brass arm — is not technically banned by name in the plumbing code, but it fails code because it lacks anti-siphon protection. Both the IPC and UPC require all toilet fill valves to be anti-siphon type.\n\nWHY IT IS A PROBLEM:\nThe classic ballcock submerges the fill tube below the waterline inside the tank. This creates a direct cross-connection — if water pressure in the main drops (from a water main break, open fire hydrant, or any pressure loss event), tank water can back-siphon directly into the potable water supply. Tank water contains bacteria, cleaning products, and other contaminants.\n\n🔵 IPC 425.3 & 🟠 UPC 603.4.1: Fill valves must be of the anti-siphon type, listed to ASSE 1002. The modern anti-siphon fill valve (Fluidmaster 400A style) terminates above the waterline and cannot back-siphon.\n\nTEXAS TCEQ REQUIREMENT:\nThis is not just a plumbing code issue — it is a public health violation under TCEQ 30 TAC 290.46. Non-anti-siphon toilet fill valves are considered an unprotected cross-connection under Texas water supply rules.\n\nREPORTING:\nIf you find a non-anti-siphon ballcock — especially in a commercial or multi-family property — you can report it to TCEQ. TCEQ Cross-Connection Control hotline: (512) 239-4691. A water provider can terminate service to a connection where an unprotected health hazard exists.\n\nTHE FIX: Replace with any listed anti-siphon fill valve. Fluidmaster 400A, Korky 528, or equivalent. Cost is under $15. Takes 15 minutes.", plainEs: "El grifo de bola antiguo carece de protección anti-sifonamiento y viola el código.\n\n🔵 IPC 425.3 y 🟠 UPC 603.4.1: Las válvulas de llenado deben ser tipo anti-sifonamiento listadas según ASSE 1002.\n\nREQUISITO TCEQ: Es una violación de salud pública bajo TCEQ 30 TAC 290.46.\n\nREPORTAR: Línea de control de conexiones cruzadas TCEQ: (512) 239-4691.\n\nLA SOLUCIÓN: Reemplazar con válvula anti-sifonamiento listada (Fluidmaster 400A o equivalente). Costo menos de $15.", tags: ["ballcock", "fill valve", "anti-siphon", "cross-connection", "TCEQ", "toilet", "back-siphon", "IPC 425", "UPC 603", "ASSE 1002", "potable water", "public health"] },
  { id: 47, category: "Water Heater", title: "Water heater installation — top 10 inspection fails", titleEs: "Instalación de calentador — 10 fallas de inspección más comunes", code: "IPC 501-504 · UPC 501-510 · NFPA 54", plain: "Water heater inspections are one of the most commonly failed finals in Texas. Here are the top reasons inspectors write up water heaters:\n\n1. MISSING SEISMIC STRAPS — Texas does not require seismic straps statewide but many cities (Austin, parts of DFW) do. Always check local amendment.\n\n2. TPR VALVE DISCHARGE PIPE — must be full-size (same diameter as TPR outlet, minimum 3/4 inch), run to within 6 inches of floor or outside, no threaded end cap, no reduction, no valves. This is the #1 water heater fail in Texas.\n\n3. EXPANSION TANK MISSING — any water heater on a closed water system (check valve, PRV, or backflow preventer on the supply) requires a thermal expansion tank. Most Texas homes qualify. Most inspectors check for it at final.\n\n4. GAS SHUTOFF TOO FAR — gas shutoff must be within 6 feet of the appliance and accessible without moving the appliance.\n\n5. VENT CONNECTOR SLOPE — must slope upward toward the vent at minimum 1/4 inch per foot with no sags or dips.\n\n6. COMBUSTION AIR — mechanical room must have adequate combustion air openings. Two openings required for confined spaces — see Code #9 (combustion air).\n\n7. SEDIMENT TRAP MISSING — on gas water heaters, a sediment trap (drip leg) must be installed in the gas line within 12 inches of the connection.\n\n8. WATER CONNECTIONS WRONG WAY — cold supply to cold inlet, hot to hot outlet. Sounds obvious but gets crossed more often than you think.\n\n9. EARTHQUAKE STRAP LOCATION — straps must be in the upper and lower thirds of the tank, not both in the middle.\n\n10. FLOOR PAN MISSING — water heaters in any location where a leak could cause damage to the structure or finishes require a drain pan with a 3/4 inch drain line to an approved location.\n\n🔵 IPC CITIES: Sections 501-504 govern water heaters.\n🟠 UPC CITIES (Houston, Austin): Sections 501-510 apply. Houston additionally requires a ball valve within 6 inches of the cold inlet.", plainEs: "Las 10 fallas más comunes en inspecciones de calentadores de agua en Texas:\n\n1. Falta de correas sísmicas donde se requieren\n2. Tubería de descarga de válvula TPR incorrecta — debe ser diámetro completo, sin reducción, sin tapa roscada\n3. Tanque de expansión faltante en sistemas cerrados\n4. Llave de gas muy lejos — debe estar a menos de 6 pies\n5. Conector de ventilación sin pendiente correcta\n6. Aire de combustión insuficiente en espacio confinado\n7. Trampa de sedimentos faltante en línea de gas\n8. Conexiones de agua invertidas\n9. Correas sísmicas en posición incorrecta\n10. Charola de drenaje faltante donde se requiere", tags: ["water heater", "TPR valve", "expansion tank", "gas shutoff", "vent connector", "sediment trap", "drain pan", "combustion air", "inspection fail", "IPC 501", "UPC 501"] },
  { id: 48, category: "Water Heater", title: "TPR valve — temperature and pressure relief", titleEs: "Válvula TPR — alivio de temperatura y presión", code: "IPC 504.6 · UPC 608.3", plain: "The Temperature and Pressure Relief (TPR) valve is the single most critical safety device on a water heater. It must be installed correctly or it is completely ineffective.\n\nREQUIREMENTS:\n• Must be listed and labeled for the water heater BTU rating and working pressure\n• Must sense both temperature AND pressure — a pressure-only relief valve is NOT acceptable\n• Sensing element must be immersed in the top 6 inches of water in the tank\n• Cannot be installed in the cold water inlet — must be in the hot water side or designated port\n\nDISCHARGE PIPE REQUIREMENTS (most common inspection fail):\n• Must be full-size — same diameter as the TPR outlet (minimum 3/4 inch)\n• Must run full size to within 6 inches of the floor or outside discharge point\n• No reducers, elbows that reduce flow, or valves of any kind on the discharge pipe\n• Cannot terminate upward — must terminate downward or horizontally with a slight downward slope\n• Cannot have a threaded cap, plug, or fitting at the end\n• Must terminate at a visible, accessible location where hot water discharge will be noticed\n• If discharging outside, must terminate at least 6 inches above grade and away from any electrical equipment\n\n🔵 IPC 504.6 & 🟠 UPC 608.3: Both codes have virtually identical TPR requirements.\n\nWHAT TO DO WHEN YOU FIND IT WRONG:\n• Cap on the discharge pipe — remove it immediately. This is a life safety hazard, not just a code violation. Explain to the homeowner why before you remove it.\n• No discharge pipe at all — install one before you leave regardless of whether this is a service call or a replacement job. You cannot leave a water heater with an open TPR outlet.\n• Pipe terminates into a drain pan — acceptable in some jurisdictions but not all. Best practice is floor level termination.\n• Reduced discharge pipe (1/2 inch instead of 3/4 inch) — replace the entire run. A reducer on a TPR pipe can cause back pressure that prevents the valve from opening fully in an emergency.\n• Wrong TPR valve installed (pressure-only, wrong BTU rating) — replace the valve. A wrong valve is the same as no valve.\n• Old TPR valve that has never been tested — recommend replacement to the homeowner. TPR valves that have never been actuated can seize closed over time.\n\nFIELD TIP: A TPR valve with a black plastic cap on the end is an immediate fail AND a safety hazard. If it ever activates the cap prevents discharge and the tank can fail catastrophically. Remove all caps immediately and document that you did.", plainEs: "La válvula TPR es el dispositivo de seguridad más crítico en un calentador de agua.\n\nREQUISITOS DE TUBERÍA DE DESCARGA (falla más común):\n• Diámetro completo igual al orificio de la válvula TPR (mínimo 3/4 pulgada)\n• Sin reductores, válvulas ni tapas en la tubería de descarga\n• Debe terminar hacia abajo o hacia afuera — nunca hacia arriba\n• Sin tapa roscada, tapón o accesorio en el extremo\n• Debe terminar a menos de 6 pulgadas del piso\n\nQUÉ HACER CUANDO ESTÁ MAL:\n• Tapa en la tubería de descarga — retirarla de inmediato, es un peligro de seguridad\n• Sin tubería de descarga — instalarla antes de salir, sin importar el tipo de llamada de servicio\n• Tubería reducida — reemplazar todo el recorrido\n• Válvula TPR incorrecta — reemplazarla\n\nUna tapa negra de plástico en el extremo es falla inmediata Y peligro de seguridad.", tags: ["TPR valve", "temperature pressure relief", "discharge pipe", "water heater", "safety", "IPC 504.6", "UPC 608.3", "inspection fail", "garage", "cap", "not up to code", "field repair"] },
  { id: 49, category: "Water Heater", title: "Thermal expansion tank — when required and sizing", titleEs: "Tanque de expansión térmico — cuándo se requiere y cómo dimensionarlo", code: "IPC 607.3 · UPC 608.3", plain: "Thermal expansion tanks are one of the most commonly missed items on new residential construction finals in Texas.\n\nWHEN REQUIRED:\nAny water heater connected to a closed water system requires a thermal expansion tank. A system is closed when there is any device on the supply side that prevents water from expanding back into the main:\n• Pressure reducing valve (PRV) — most Texas homes have one\n• Check valve on the meter\n• Backflow preventer\n• Any combination of the above\n\nIf your home has a PRV — which almost every Texas home built after 1990 does — you need an expansion tank.\n\nSIZING:\nExpansion tanks must be sized for the water heater capacity and system pressure. Most residential applications use a Watts ET-5 or equivalent rated for 2-gallon capacity at 80 PSI. Always match the tank rating to the system working pressure.\n\nINSTALLATION:\n• Must be installed on the cold water supply line to the water heater\n• Must be accessible for inspection\n• Bladder-type tanks must be pre-charged to match system pressure before installation\n• Cannot be installed on the hot side\n\n🔵 IPC 607.3 & 🟠 UPC 608.3: Both codes require expansion tanks on closed systems.\n\nFIELD TIP: Check the PRV setting before sizing the expansion tank. If system pressure is 80 PSI and the expansion tank is charged to 40 PSI, the bladder will fail within a year.", plainEs: "Los tanques de expansión térmica son uno de los ítems más frecuentemente omitidos en inspecciones finales residenciales en Texas.\n\nCUÁNDO SE REQUIERE:\nCualquier calentador conectado a un sistema cerrado requiere un tanque de expansión. Un sistema es cerrado cuando hay una válvula reductora de presión (PRV), válvula de retención en el medidor, o preventor de reflujo.\n\nLa mayoría de casas en Texas tienen una PRV — por lo tanto, casi todas necesitan un tanque de expansión.\n\nINSTALACIÓN: En la línea de suministro de agua fría. Precargado a la presión del sistema antes de instalar.", tags: ["expansion tank", "thermal expansion", "closed system", "PRV", "pressure reducing valve", "water heater", "IPC 607", "UPC 608", "inspection fail", "Watts ET-5"] },
  { id: 50, category: "Gas", title: "Gas water heater installation — full walkthrough including non-code situations", titleEs: "Instalación de calentador de agua a gas — procedimiento completo incluyendo situaciones fuera de código", code: "IPC 501-504 · NFPA 54 · IRC G2427", plain: "Installing a gas water heater correctly — including what to do when the existing installation is NOT up to code. This is the most common job a Texas plumber does and the existing setup is often wrong.\n\nSTEP 0 — ASSESSMENT BEFORE YOU START (critical):\nBefore touching anything, walk the job and answer these questions:\n\n• IS THERE A GAS SHUTOFF WITHIN 6 FEET OF THE UNIT?\nIf YES — you can use it. If NO — you must shut off the house main gas supply at the meter before any work begins. Do not proceed without a shutoff. Installing a new unit requires a code-compliant shutoff — this means you are adding one as part of this job.\n\n• IS THE EXISTING GAS LINE PROPERLY CONNECTED?\nLook for: old black iron pipe with no union (cannot be disconnected without cutting), corroded flexible connector (replace mandatory), connector older than 5 years (replace regardless), connector running through a wall or cabinet (not allowed — must be accessible and visible).\n\n• IS THERE A SEDIMENT TRAP (DRIP LEG)?\nIf not, you are adding one. This is not optional on a gas appliance replacement.\n\n• IS THE VENTING INTACT AND PROPERLY SIZED?\nLook for: rust, holes, disconnected joints, wrong pitch (should slope up toward flue), single-wall connector too long (over 5 feet), vent connector going into a B-vent that is blocked or deteriorated.\n\n• IS THERE A TPR VALVE WITH A PROPER DISCHARGE PIPE?\nIf no discharge pipe, or pipe has a cap, or pipe terminates up instead of down — you are fixing this as part of the job.\n\n• IS THERE AN EXPANSION TANK?\nIf the house has a PRV or check valve on the supply (most Texas homes) and no expansion tank — you are adding one.\n\n• IS THE UNIT IN A GARAGE?\nIf yes — check whether it is elevated 18 inches off the floor. If sitting on the floor, the new unit must go on a platform.\n\nSTEP 1 — GAS SHUTOFF:\n• If existing shutoff present and within 6 feet — close it\n• If NO shutoff present — turn off house main at the meter before any work. Then install a new ball valve shutoff within 6 feet of the unit location as part of the job. This brings the installation up to code.\n• Verify gas is off with a gas detector — never assume\n\nSTEP 2 — WATER SHUTOFF AND DRAIN:\n• Close cold supply valve to the water heater\n• If no shutoff on the cold supply — add one now\n• Connect a garden hose to the drain valve and drain the tank\n• Open a hot water faucet in the house to break the vacuum and speed draining\n\nSTEP 3 — DISCONNECT OLD UNIT:\n• Disconnect gas line at the union or flex connector\n• If no union — the gas line must be cut and a union installed before reconnecting. This is a code requirement — no threaded-only connection on an appliance that may need service.\n• Disconnect water lines at unions — if no unions, add them\n• Disconnect vent connector at draft hood — note the condition of the vent connector for replacement decision\n• Old vent connectors contain rust scale — tilt carefully and do not let it fall into the building\n\nSTEP 4 — INSTALL NEW UNIT:\n• Position new unit — 18-inch clearance from combustibles on sides, front access clear\n• Garage install: unit must be on an 18-inch elevated platform\n• Connect cold inlet and hot outlet — cold to cold, hot to hot\n• Install dielectric unions where copper meets steel\n• Install thermal expansion tank on cold supply line\n\nSTEP 5 — GAS CONNECTION:\n• Install NEW flexible gas connector — never reuse an old connector, period\n• Install sediment trap (drip leg) within 12 inches of the appliance connection\n• Verify gas shutoff is in place and within 6 feet\n• Pressure test the gas line — 10 PSI for 15 minutes minimum in Texas before restoring gas\n\nSTEP 6 — VENTING:\n• Install new vent connector — never reuse old single-wall connector\n• Slope upward minimum 1/4 inch per foot toward the flue\n• Secure every joint with 3 sheet metal screws minimum\n• Single-wall connector maximum 5 feet in length\n• Check that the B-vent above is intact and sized correctly for the new appliance BTU rating\n\nSTEP 7 — TPR VALVE AND DISCHARGE:\n• Install new TPR valve — always install new, do not reuse the old one\n• Run 3/4 inch discharge pipe full size from TPR to within 6 inches of floor\n• No valves, reducers, elbows that restrict flow, or caps on discharge pipe\n• Pipe terminates downward — never upward\n\nSTEP 8 — COMMISSION:\n• Restore cold water supply, open a hot faucet to purge air\n• Check all water connections for leaks before touching gas\n• Restore gas and check every gas connection with an approved leak detector — never a flame\n• Light pilot per manufacturer instructions\n• Set thermostat to 120 degrees F\n• Document everything added that was not present — shutoff, sediment trap, expansion tank, TPR discharge — this protects you and is your record that the installation was brought up to code", plainEs: "Instalación de calentador de agua a gas — incluyendo qué hacer cuando la instalación existente NO está al código.\n\nPASO 0 — EVALUACIÓN ANTES DE COMENZAR:\n• ¿Hay una llave de gas a menos de 6 pies de la unidad? Si NO — apagar el gas principal en el medidor y agregar válvula como parte del trabajo.\n• ¿Hay trampa de sedimentos? Si no — agregarla.\n• ¿Está la ventilación en buen estado? Buscar óxido, desconexiones, pendiente incorrecta.\n• ¿Hay válvula TPR con tubería de descarga correcta? Si no — corregir.\n• ¿Hay tanque de expansión si la casa tiene PRV? Si no — agregar.\n• ¿Está en el garaje sin plataforma de 18 pulgadas? Si sí — instalar plataforma.\n\nPASO 1: Si no hay válvula de gas — cerrar suministro principal en el medidor e instalar válvula nueva\nPASO 2: Cerrar agua fría, agregar válvula si no existe, drenar tanque\nPASO 3: Desconectar gas y agua — instalar uniones si no existen\nPASO 4: Instalar unidad nueva con espacios libres correctos, uniones dieléctricas, tanque de expansión\nPASO 5: Conector de gas NUEVO, trampa de sedimentos, prueba de presión 10 PSI\nPASO 6: Ventilación nueva con pendiente correcta y tornillos\nPASO 7: Válvula TPR nueva con tubería de descarga completa a 6 pulgadas del piso\nPASO 8: Revisar fugas, encender piloto, ajustar a 120°F, documentar todo lo que se corrigió", tags: ["gas water heater", "installation", "how to install", "water heater", "gas", "TPR", "expansion tank", "vent", "sediment trap", "garage", "120 degrees", "step by step", "no shutoff", "not up to code", "assessment", "drip leg", "union", "expansion tank", "bring up to code"] },
  { id: 51, category: "Drainage", title: "Stack venting and wet venting — when it is allowed", titleEs: "Ventilación de bajante y ventilación húmeda — cuándo está permitida", code: "IPC 909 · UPC 908", plain: "Wet venting allows a single pipe to serve as both a drain and a vent for multiple fixtures — properly done it eliminates a lot of individual vent runs.\n\nIPC WET VENTING (IPC 909 — DFW, most Texas cities):\nAllowed for bathtubs, showers, lavatories, and water closets in the same bathroom group. The wet vent pipe must be sized one pipe size larger than the drain it serves. Maximum 6 fixture units on a 2-inch wet vent, 12 fixture units on a 3-inch wet vent.\n\nUPC WET VENTING (UPC 908 — Houston, Austin):\nThe UPC is more restrictive on wet venting than the IPC. Wet venting is permitted under the UPC but only for specific bathroom configurations and pipe sizing must comply with UPC Table 908.1.\n\nCOMMON WET VENT SETUP IN TEXAS:\nLavatory wet vented through a toilet — the lav drain connects above the toilet drain and the combined pipe serves as the vent for the lav while draining both. This works if sized correctly.\n\nSTACK VENTING (IPC 913):\nA single stack that serves both drainage and venting without separate vent pipes. Limited applications — typically small residential installations. The stack must be 3 inches minimum and serve no more than two fixture units between floors.\n\nCOMMON FAIL: A wet vent that is the same size as the drain — it must be one size up. Inspector sees a 2-inch drain feeding a 2-inch wet vent instead of a 3-inch wet vent — automatic fail.", plainEs: "La ventilación húmeda permite que una sola tubería funcione como drenaje y ventilación para múltiples accesorios.\n\nIPC (DFW, mayoría de Texas): Permitida para bañeras, duchas, lavabos e inodoros en el mismo grupo de baño. Debe ser una pulgada más grande que el drenaje que sirve.\n\nUPC (Houston, Austin): Más restrictivo — solo para configuraciones específicas de baño.\n\nFALLA COMUN: Ventilación húmeda del mismo tamaño que el drenaje — debe ser una talla más grande.", tags: ["wet vent", "stack vent", "venting", "IPC 909", "UPC 908", "bathroom group", "lavatory", "toilet", "drain", "pipe sizing"] },
  { id: 52, category: "Drainage", title: "Air admittance valves — where allowed in Texas", titleEs: "Válvulas de admisión de aire — dónde están permitidas en Texas", code: "IPC 918 · UPC Appendix H", plain: "Air admittance valves (AAVs) open to admit air when a drain creates negative pressure, then close to prevent sewer gas entry. They are a popular alternative to running a vent through the roof.\n\n🔵 IPC CITIES (Dallas, Fort Worth, most Texas cities):\nAAVs are permitted under IPC Section 918 as an alternative to conventional venting in accessible locations. Requirements:\n• Must be listed and labeled to ASSE 1051\n• Must be installed in an accessible location — inside a cabinet under a sink qualifies\n• Cannot be the only vent for the building drain — at least one conventional vent through the roof is required per building\n• Cannot be installed in spaces subject to freezing\n• Cannot be installed outdoors unless listed for that use\n\n🟠 UPC CITIES (Houston, Austin) — IMPORTANT RESTRICTION:\nThe base UPC does not include AAVs. Houston and Austin operate under the UPC, which restricts AAV use to Appendix H of the UPC. Appendix H adoption varies by jurisdiction:\n• Houston: AAVs generally NOT accepted without special approval — verify with inspector before installing\n• Austin: AAVs restricted — Austin Water has specific rules. Verify with Austin Development Services before installation.\n\nFIELD TIP: In DFW an AAV under a kitchen sink island is completely standard and fast to install. In Houston you may get a fail — always call first.\n\nCOMMON FAIL: AAV installed in an inaccessible location, such as in a wall cavity or above a sealed ceiling. Must remain accessible.", plainEs: "Las válvulas de admisión de aire (AAV) son alternativas a la ventilación convencional.\n\n🔵 CIUDADES IPC (Dallas, DFW): Permitidas bajo IPC 918 si están listadas ASSE 1051 y en ubicación accesible.\n\n🟠 CIUDADES UPC (Houston, Austin): El UPC base no incluye AAVs. Houston generalmente NO las acepta. Austin las restringe. Siempre verificar antes de instalar.\n\nFALLA COMUN: AAV instalada en lugar inaccesible — debe permanecer accesible.", tags: ["AAV", "air admittance valve", "vent", "IPC 918", "UPC Appendix H", "Houston", "Austin", "ASSE 1051", "island sink", "kitchen", "sewer gas"] },
  { id: 53, category: "Water Supply", title: "Pressure reducing valve — requirements and settings", titleEs: "Válvula reductora de presión — requisitos y ajustes", code: "IPC 604.8 · UPC 608.2", plain: "Pressure reducing valves (PRVs) are required when street pressure exceeds 80 PSI. In Texas many water districts deliver water at 80-120 PSI — PRVs are extremely common.\n\nREQUIRED WHEN:\n• Street/supply pressure exceeds 80 PSI at the meter\n• Both IPC and UPC require a PRV when supply pressure exceeds 80 PSI\n\nINSTALLATION REQUIREMENTS:\n• Must be installed on the supply side before any branch connections\n• Must be accessible for adjustment and replacement\n• A union or other means of removal must be provided on each side\n• An integral bypass is NOT required but a strainer is strongly recommended upstream\n• PRV setting: typically adjusted to 60-70 PSI for residential applications\n\nWHEN PRESSURE IS TOO HIGH WITHOUT A PRV:\n• Fixture washers and cartridges fail prematurely\n• Water hammer increases\n• Expansion tank fails faster\n• Appliances fail under warranty due to over-pressure\n\nCLOSED SYSTEM REMINDER:\nA PRV creates a closed system. Any home with a PRV requires a thermal expansion tank on the water heater. Inspectors check for this combination — PRV present but no expansion tank is a common fail.\n\n🔵 IPC 604.8 & 🟠 UPC 608.2: Both require PRVs when supply exceeds 80 PSI. Maximum delivered pressure is 80 PSI under both codes.\n\nFIELD TIP: Test inlet pressure with a gauge before installing a PRV. If the street is already under 80 PSI the PRV is not code-required — but may still be wise depending on the system.", plainEs: "Las válvulas reductoras de presión (PRV) son requeridas cuando la presión de suministro supera 80 PSI.\n\n🔵 IPC 604.8 y 🟠 UPC 608.2: Ambos requieren PRV cuando la presión supera 80 PSI.\n\nINSTALACIÓN: Antes de cualquier conexión de derivación, accesible, con uniones en ambos lados.\n\nRECUERDA: Una PRV crea un sistema cerrado — requiere tanque de expansión en el calentador de agua.", tags: ["PRV", "pressure reducing valve", "pressure", "80 PSI", "closed system", "expansion tank", "IPC 604.8", "UPC 608.2", "water pressure", "inspection fail"] },
  { id: 54, category: "Gas", title: "CSST gas piping — bonding requirements Texas", titleEs: "Tubería de gas CSST — requisitos de bonding en Texas", code: "IPC 1209.5 · NFPA 54 7.13 · NFPA 780", plain: "Corrugated Stainless Steel Tubing (CSST) is the flexible yellow-jacketed gas piping used extensively in Texas new construction. It must be bonded to the electrical grounding system.\n\nWHY BONDING IS REQUIRED:\nLightning strikes cause a transient electrical surge through the home's grounding system. When CSST is not bonded, that surge can arc through the thin stainless steel wall of the tubing, creating a pinhole that leaks gas. This has caused house fires in Texas.\n\nBONDING REQUIREMENTS:\n• CSST must be bonded to the building's grounding electrode system\n• Bonding conductor: minimum #6 AWG copper\n• Bonding clamp must be attached to the CSST jacket at an accessible location — typically at the manifold or meter connection\n• Some CSST brands (TracPipe CounterStrike, FlashShield) have a bonded jacket and only require one bond clamp at the point of connection to black iron — verify the manufacturer specs\n\nTEXAS JURISDICTIONS THAT STRICTLY ENFORCE:\n• Dallas, Fort Worth, Arlington, Plano: CSST bonding checked at rough-in AND final\n• Austin: Bonding required and verified — Austin is strict\n• Most DFW cities: Inspectors will call it out if the bonding clamp is missing or not accessible\n\nCOMMON FAILS:\n• No bonding clamp installed at all\n• Bonding clamp on the outside of the yellow jacket (must pierce or clamp the jacket to the metal corrugation)\n• Bonding conductor undersized — less than #6 AWG\n• Bonding clamp installed in inaccessible location inside wall\n\n🔵 IPC CITIES & 🟠 UPC CITIES: Both require CSST bonding per the manufacturer installation instructions which reference NFPA 54 7.13.", plainEs: "La tubería CSST (tubería de acero inoxidable corrugado) de chaqueta amarilla usada en nueva construcción en Texas debe estar enlazada al sistema de tierra eléctrica.\n\nPOR QUÉ SE REQUIERE: Los rayos causan arcos eléctricos a través de la pared delgada del CSST no enlazado, creando fugas de gas que han causado incendios en Texas.\n\nREQUISITOS:\n• Conductor de enlace mínimo #6 AWG de cobre\n• Abrazadera accesible en la chaqueta del CSST\n\nFALLAS COMUNES: Sin abrazadera, abrazadera en lugar inaccesible, conductor menor de #6 AWG.", tags: ["CSST", "gas pipe", "bonding", "lightning", "NFPA 54", "grounding", "#6 AWG", "yellow jacket", "inspection fail", "Dallas", "Fort Worth", "Austin", "TracPipe", "FlashShield"] },
  { id: 55, category: "Drainage", title: "Vent through roof — termination requirements", titleEs: "Ventilación a través del techo — requisitos de terminación", code: "IPC 903 · UPC 906", plain: "Vent pipes terminating through the roof must meet specific height and location requirements. This is commonly missed on top-out inspections.\n\nHEIGHT REQUIREMENTS:\n• Minimum 6 inches above the roof surface\n• Where the roof is used for any purpose other than weather protection — such as a deck or terrace — vent must extend 7 feet above the roof\n• In areas of heavy snow (not applicable to most of Texas) additional height may be required\n\nLOCATION REQUIREMENTS:\n• Must be at least 10 feet from any window, door, or opening that can be opened\n• Must be at least 10 feet from any fresh air intake for mechanical equipment\n• Must be at least 3 feet above any opening within 10 feet horizontal distance\n\nFLASHING:\n• All roof penetrations must be properly flashed with an approved lead, rubber, or metal flashing to prevent water intrusion\n• No open gaps around the pipe at the roof decking level\n\n🔵 IPC 903 (DFW, most Texas cities): 6-inch minimum above roof, 10 feet from openings.\n🟠 UPC 906 (Houston, Austin): Same minimum 6-inch height, same separation from openings.\n\nCOMMON FAILS:\n• Vent pipe cut too short — only 2-3 inches above the roof deck\n• Vent too close to an HVAC fresh air intake on the roof\n• Vent flashing not sealed — creates a water leak path\n• Roof vent cap installed on a sanitary vent — caps are only for fresh air intakes, not sanitary vents. Sanitary vents must be open-ended.\n\nFIELD TIP: Never put a cap or screen on a sanitary vent — it will frost over in cold weather and block the vent completely, causing gurgling drains and sewer gas entry.", plainEs: "Los tubos de ventilación que terminan en el techo deben cumplir requisitos específicos de altura y ubicación.\n\nREQUISITOS DE ALTURA:\n• Mínimo 6 pulgadas sobre la superficie del techo\n• Al menos 10 pies de cualquier ventana, puerta o abertura que pueda abrirse\n\n🔵 IPC 903 y 🟠 UPC 906: Mismos requisitos básicos.\n\nFALLAS COMUNES:\n• Tubo cortado demasiado corto — solo 2-3 pulgadas sobre el techo\n• Tapa o malla instalada en ventilación sanitaria — NUNCA se debe tapar una ventilación sanitaria\n• Ventilación demasiado cerca de entrada de aire fresco del HVAC", tags: ["vent", "roof", "termination", "6 inches", "10 feet", "flashing", "cap", "screen", "IPC 903", "UPC 906", "top out", "inspection fail", "sewer gas"] },
  { id: 56, category: "Water Supply", title: "Water service pipe — size, material, and burial depth", titleEs: "Tubería de servicio de agua — tamaño, material y profundidad de enterramiento", code: "IPC 603 · UPC 609 · Texas Plumbing Code", plain: "The water service line from the meter to the house is one of the first things roughed in and must meet size, material, and depth requirements.\n\nMINIMUM SIZE:\n• 3/4 inch for single family residential is the code minimum but 1 inch is the current standard in most Texas cities for new construction\n• Many cities now require 1-inch service minimum — check local amendment before sizing\n• Undersized service lines are a permanent problem — the house will never have adequate flow\n\nAPPROVED MATERIALS FOR UNDERGROUND SERVICE:\n• Type K copper — the gold standard for underground water service\n• HDPE (High Density Polyethylene) — flexible, excellent for long runs\n• PVC Schedule 40 or 80 with approved fittings — most common in Texas new construction\n• PEX — permitted in many Texas cities underground with proper burial depth and protection\n• NOT permitted underground: galvanized steel, CPVC\n\nBURIAL DEPTH IN TEXAS:\n• Minimum 12 inches below finished grade in most of Texas\n• In the Texas Panhandle (Amarillo area) — some jurisdictions require 18-24 inches due to freeze depth\n• Must have 12 inches of cover over the top of the pipe — not to the center\n• Bedding: in rocky soil (Hill Country) granular bedding under and around the pipe prevents damage from sharp rocks\n\nTRACER WIRE:\n• Plastic water service pipe must have continuous metallic tracer wire or detectable tape for utility locating\n• Blue color = water per APWA universal color coding\n\n🔵 IPC 603 & 🟠 UPC 609: Both codes allow the materials listed above with proper listing and installation.\n\nFIELD TIP: In Central Texas Hill Country — caliche and limestone gravel can crush PVC service line over time. Use Schedule 80 or PE pipe and bed it in clean sand or pea gravel for long service life.", plainEs: "La línea de servicio de agua desde el medidor hasta la casa debe cumplir requisitos de tamaño, material y profundidad.\n\nTAMAÑO MINIMO: 3/4 pulgada es el mínimo del código pero 1 pulgada es el estándar actual en la mayoría de las ciudades de Texas.\n\nMATERIALES APROBADOS PARA ENTERRAMIENTO: Cobre Tipo K, HDPE, PVC Schedule 40/80, PEX. NO permitido: acero galvanizado, CPVC.\n\nPROFUNDIDAD EN TEXAS: Mínimo 12 pulgadas bajo el nivel terminado. En el Panhandle: 18-24 pulgadas.\n\nALAMBRE TRAZADOR: La tubería plástica requiere alambre trazador metálico continuo o cinta detectora azul.", tags: ["water service", "service line", "Type K copper", "HDPE", "PVC", "PEX", "burial depth", "12 inches", "tracer wire", "blue tape", "IPC 603", "UPC 609", "meter", "Hill Country", "caliche"] },
];

// ─── JURISDICTIONS (abbreviated — same as before, keeping key cities) ─────────
const JURISDICTIONS = {
  "Allen": { code: "IPC 2021", population: "107K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "All permits through CSS (Citizen Self-Service) portal before work begins", "Call (214) 509-4130 between 8–9 AM on day of inspection to get time window", "Cancel before 8:30 AM: call (214) 509-4130 | After 8:30 AM: use CSS or IVR", "IVR 24-hour hotline: (844) 381-8759", "Backflow prevention required — irrigation backflow tester must be licensed", "Virtual inspections available — schedule at inspections.oncamino.com/allen-tx"], inspector: "Allen Building & Permitting", phone: "(214) 509-4130", directLine: "(214) 509-4130", scheduleHours: "8–9 AM day of inspection for time window | IVR 24hrs: (844) 381-8759", permitRequired: true, permitUrl: "cityofallen.org/departments/community_development/building_and_permitting", staffDirectory: "cityofallen.org/departments/community_development/building_and_permitting", inspectorContacts: [{ name: "Building & Permitting Main", title: "Permits, Inspections, Registration", office: "(214) 509-4130", email: "permits@allentx.gov" }, { name: "Plan Review Questions", title: "Add/Remove Inspection from Workflow", office: "(214) 509-4130", email: "bpplanreview@allentx.gov" }, { name: "IVR Hotline", title: "24-Hour Schedule/Cancel/Status", office: "(844) 381-8759", email: "" }, { name: "Virtual Inspection Scheduling", title: "Video inspection option available", office: "(214) 509-4130 or 4132 by 3PM prior day", email: "" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Amarillo": { code: "IPC 2021", population: "200K", region: "Texas Panhandle", amendments: ["Roof vents must terminate with a listed and labeled cap per manufacturer specs", "Clothes dryer exhaust: no screens at termination, backdraft damper required", "Pressure test required — document start and end PSI", "Review Ordinance 7101 for all local amendments"], inspector: "Amarillo Building Safety", phone: "(806) 378-3033", directLine: "(806) 378-3033", scheduleHours: "Mon–Fri 7:30AM–5PM", permitRequired: true, permitUrl: "amarillo.gov/building-safety", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Arlington": { code: "IPC 2021", population: "394K", region: "North Texas (DFW)", amendments: ["All permits through Accela online portal — required before work begins", "Inspection requests must be submitted before 7AM on the day needed", "After-hours inspection: $90/hr flat rate effective October 1, 2025 — 2hr minimum", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems"], inspector: "Arlington Planning & Development Services", phone: "(817) 459-6502", directLine: "(817) 459-6504", scheduleHours: "Submit before 7AM for same-day inspection | After-hours available at $90/hr", emergency: "(817) 459-6502", permitRequired: true, permitUrl: "arlingtontx.gov/Business/Planning-Development/Permitting-Inspections", inspectorContacts: [{ name: "Planning & Development Services", title: "Permits, Inspections, Scheduling", office: "(817) 459-6502", email: "planning@arlingtontx.gov" }, { name: "After-Hours Inspections", title: "Flat rate $90/hr effective Oct 1 2025", office: "(817) 459-6502", email: "" }], thirdParty: ["Crossroads Inspections", "Master Code", "Code Solutions Inc.", "Bureau Veritas"] },
  "Austin": { code: "UPC 2021 ⚠", population: "978K", region: "Central Texas", amendments: ["⚠ Austin uses the UPC — NOT the IPC", "⚠ Austin also uses the 2024 IBC and 2024 IRC for building — but PLUMBING is UPC", "Reclaimed water rough-in required on all new construction", "Low-flow fixtures: 1.28 GPF max on toilets", "Green building code overlay applies in designated zones", "After-hours inspections available — contact assigned inspector directly", "Austin Water: water meter inspections (610/611) — call (512) 972-1000 option 3"], inspector: "Austin Development Services — Building Inspections", phone: "(512) 974-2000", directLine: "(512) 974-9405", scheduleHours: "Schedule via AB+C Portal or IVR (512) 974-9405 | Inspections 24hrs after scheduling", permitRequired: true, permitUrl: "austintexas.gov/page/building-inspections", staffDirectory: "austintexas.gov/page/building-inspections — use Find Your Inspector tool", inspectorContacts: [{ name: "Building Inspections Email", title: "General Questions & Emergency Inspections", office: "(512) 974-2000", email: "building.inspections@austintexas.gov" }, { name: "IVR Scheduling Line", title: "Schedule/Cancel/Status 24hrs", office: "(512) 974-9405", email: "" }, { name: "Austin 3-1-1", title: "General City Services", office: "311 or (512) 974-2000", email: "" }, { name: "Austin Water - Taps Office", title: "Water Meter Inspections (610/611)", office: "(512) 972-1000 option 3", email: "AWTaps@austintexas.gov" }, { name: "Hyatt Dunn", title: "After-Hours Electrical Shutdown Inspections", office: "Contact via building.inspections@austintexas.gov", email: "" }], thirdParty: ["Veritas Inspections", "Crossroads Inspections", "Fox Energy Specialists"], warning: "Austin uses the UPC, not the IPC. Plumbing code is UPC 2021. Surrounding cities use the IPC. Always confirm before pulling a permit near Austin city limits." },
  "Bedford": { code: "IPC 2021", population: "49K", region: "North Texas (HEB Area)", amendments: ["NCTCOG regional amendments apply", "HEB area — Hurst, Euless, Bedford share similar code environment", "Thermal expansion tank required on all closed water systems", "Water heater elevation required in garage — 18\" minimum"], inspector: "Bedford Building Inspections", phone: "(817) 952-2200", directLine: "(817) 952-2200", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "bedfordtx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Burleson": { code: "IPC 2021", population: "50K", region: "North Texas (Fort Worth suburb)", amendments: ["NCTCOG regional amendments apply", "Johnson/Tarrant county line — verify which county governs your address", "Fire code review required before Fire Marshal submittal", "Thermal expansion tank required on all closed water systems"], inspector: "Burleson Building Permits & Inspections", phone: "(817) 426-9600", directLine: "(817) 426-9600", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "burlesontx.com/building", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"] },
  "Carrollton": { code: "IPC 2021", population: "135K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Permits required for MEP system repairs and replacements", "Thermal expansion tank required on all closed water systems", "CSST bonding required per NFPA 54"], inspector: "Carrollton Building Inspection", phone: "(972) 466-3016", directLine: "(972) 466-3016", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofcarrollton.com/building-inspection", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Cedar Park": { code: "IPC 2021", population: "82K", region: "Central Texas", amendments: ["IPC 2021 adopted June 1, 2022 — switched from UPC", "Permits and scheduling via MGO Connect portal (mgoconnect.org)", "CPPID utility pre-approval required for new water service connections", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections", "Two free inspections per permit type; additional inspections $75 each"], inspector: "Cedar Park Building Permits & Inspections", phone: "(512) 401-5100", directLine: "(512) 401-5100", scheduleHours: "Mon–Fri 8AM–5PM | Schedule via MGO Connect", permitRequired: true, permitUrl: "cedarparktexas.gov/163/Building-Permits-Inspections", staffDirectory: "cedarparktexas.gov/672", inspectorContacts: [{ name: "Ken Crow, C.B.O.", title: "Chief Building Official", office: "512-401-5106", email: "kcrow@cedarparktexas.gov" }, { name: "Chad McTeer", title: "Deputy Building Official", office: "512-401-5108", email: "cmcteer@cedarparktexas.gov" }, { name: "John Wilkinson", title: "Building Inspector I", office: "512-401-5113", email: "jwilkinson@cedarparktexas.gov" }, { name: "Bob Thomas", title: "Plans Examiner", office: "512-401-5110", email: "bthomas@cedarparktexas.gov" }, { name: "Permits & Inspections Main", title: "General Permits & Inspections", office: "(512) 401-5100", email: "permits@cedarparktexas.gov" }], thirdParty: ["Fox Energy Specialists", "Crossroads Inspections", "Bureau Veritas"] },
  "Conroe": { code: "IPC 2021", population: "106K", region: "Greater Houston", amendments: ["All permits and inspections through OpenGov portal (effective Dec 8, 2025)", "Morning inspections: schedule before 7AM same day", "Afternoon inspections: schedule 7AM–noon same day", "Montgomery County MUD rules may apply in outer areas"], inspector: "Conroe Building Inspections", phone: "(936) 522-3610", directLine: "(936) 522-3616", scheduleHours: "AM inspections before 7AM | PM inspections 7AM–noon", permitRequired: true, permitUrl: "cityofconroe.org/building-inspections", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Dallas": { code: "IPC 2021", population: "1.3M", region: "North Texas", amendments: ["Thermal expansion tanks mandatory on all closed water systems", "PEX-A only for in-slab (PEX-B not allowed)", "Isolation valve required at each individual fixture", "Water heater must be elevated 18\" off floor in garage", "CSST bonding required per NFPA 54", "Dallas operates multiple district offices — your inspector depends on job address"], inspector: "Dallas Development Services", phone: "(214) 948-4480", directLine: "(214) 948-4480", scheduleHours: "Mon–Fri 7:30AM–4:30PM", permitRequired: true, permitUrl: "dallascityhall.com/permits", staffDirectory: "dallascityhall.com/departments/sustainabledevelopment/buildinginspection/Pages/contact_us.aspx", inspectorContacts: [{ name: "Oscar Smith", title: "Sr. Plumbing/Mechanical Inspector — NW District", office: "(214) 671-1509", email: "oscar.smith@dallascityhall.com" }, { name: "Reggie Slagle", title: "Plumbing/Mechanical Inspector — NW District", office: "(214) 671-1507", email: "reggie.slagle@dallascityhall.com" }, { name: "Randall McLemore", title: "Plumbing/Mechanical Inspector — NW District", office: "(214) 671-0268", email: "randall.mclemore@dallascityhall.com" }, { name: "Jonathan Petti", title: "Plumbing/Mechanical Inspector — NW District", office: "(214) 671-0217", email: "jonathan.petti@dallascityhall.com" }, { name: "Shar Blatnick", title: "Sr. Plumbing/Mechanical Inspector — SW District", office: "(214) 671-1539", email: "shar.blatnick@dallascityhall.com" }, { name: "Troy Letz", title: "Plumbing/Mechanical Inspector — SW District", office: "(214) 671-1536", email: "tory.letz@dallascityhall.com" }, { name: "Jeffrey Tate", title: "Plumbing/Mechanical Inspector — SW District", office: "(214) 671-1535", email: "Jeffery.Tate@dallascityhall.com" }, { name: "NW District Office", title: "7610 N. Stemmons Frwy Suite 190", office: "(214) 671-0720", email: "" }, { name: "SW District Office (OCMC)", title: "320 E. Jefferson Blvd.", office: "(214) 671-1531", email: "" }], thirdParty: ["Crossroads Inspections", "Roadrunner Inspections", "Master Code", "Bureau Veritas"] },
  "Denton": { code: "IPC 2021", population: "148K", region: "North Texas", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "CSST must be bonded per NFPA 54", "Underground plastic sewer piping requires tracer wire", "Hours: Mon-Thu 7:30AM-5:30PM, Fri 7:30-11:30AM"], inspector: "Denton Development Services Building Safety", phone: "(940) 349-8600", directLine: "(940) 349-8600", scheduleHours: "Mon-Thu 7:30AM-5:30PM | Fri 7:30-11:30AM | 401 N Elm St", permitRequired: true, permitUrl: "cityofdenton.com/238/Building-Safety", staffDirectory: "cityofdenton.com/building-safety", inspectorContacts: [{ name: "Scott A. McDonald", title: "Director of Development Services / Chief Building Official", office: "(940) 349-8600", email: "building@cityofdenton.com" }, { name: "Building Safety Division", title: "Permits, Inspections, Scheduling", office: "(940) 349-8600", email: "building@cityofdenton.com" }, { name: "Certificate of Occupancy", title: "CO Questions and Submittals", office: "(940) 349-8600", email: "coa@cityofdenton.com" }], thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },
  "El Paso": { code: "IPC 2021", population: "678K", region: "Far West Texas", amendments: ["Water conservation fixtures mandatory on all new construction", "Seismic zone — water heater strapping required", "El Paso Water approval required before water service connections", "Gas pressure test: 10 PSI minimum, witnessed by inspector"], inspector: "El Paso Development Services", phone: "(915) 212-0104", directLine: "(915) 212-0104", scheduleHours: "Mon–Fri 7:30AM–4:30PM", permitRequired: true, permitUrl: "elpasotexas.gov/development-services", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Euless": { code: "IPC 2021", population: "56K", region: "North Texas (HEB Area)", amendments: ["NCTCOG regional amendments apply", "HEB area — Hurst, Euless, Bedford share similar code environment", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation systems"], inspector: "Euless Building Inspections", phone: "(817) 685-1400", directLine: "(817) 685-1400", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "eulesscityhall.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Flower Mound": { code: "IPC 2024 ⚠", population: "82K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective October 1, 2025", "Emergency permits: call (972) 874-6355 before 3:30PM — inspector arrives within 1 hour", "Water heater pan required wherever leakage could cause property damage", "Showerhead flow limited to 2.0 GPM — IPC 2024", "Plans Examiner walk-in hours: 8–9AM or 4–5PM Mon–Fri"], inspector: "Flower Mound Building Inspections", phone: "(972) 874-6355", directLine: "(972) 874-6355", scheduleHours: "Inspector office hours 7:30-8:30AM Mon-Fri | Emergency: call before 3:30PM", emergency: "(972) 874-6355 (before 3:30PM)", permitRequired: true, permitUrl: "flowermound.gov/119/Building-Inspections", staffDirectory: "flowermound.gov/2084/Building-and-Inspections-Services-Staff", inspectorContacts: [{ name: "Joelle Hainley, CBO", title: "Building Official", office: "(972) 874-6355", email: "joelle.hainley@flowermound.gov" }, { name: "Tasha Coates, CBO", title: "Asst. Building Official - Plan Review", office: "972-874-6367", email: "tasha.coates@flowermound.gov" }, { name: "Brace Dunham", title: "Asst. Building Official - Inspections", office: "972-874-6360", email: "brace.dunham@flowermound.gov" }, { name: "Cody Stricker", title: "Chief Building Inspector", office: "972-874-6365", email: "cody.stricker@flowermound.gov" }, { name: "Emily Chapman", title: "Building Inspections Supervisor", office: "972-874-6356", email: "emily.chapman@flowermound.gov" }, { name: "Building Inspections Main", title: "Permits and Scheduling", office: "(972) 874-6355", email: "buildinginspections@flowermound.gov" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "Flower Mound is on IPC 2024 effective October 1, 2025. Key changes: 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Fort Worth": { code: "IPC 2021", population: "935K", region: "North Texas", amendments: ["Copper or CPVC only for water service pipe inside slab", "Water heater pan and drain required in all locations", "Shower valve must be pressure-balance or thermostatic", "Cleanout required within 5 ft of building foundation", "Inspectors arrive separately — keep building unlocked until ALL four trades inspect", "Max 5 buildings inspected per day per permit", "Re-inspection fee: $50 per inspector per failed trade"], inspector: "Fort Worth Development Services", phone: "(817) 392-2222", directLine: "(817) 392-2222", scheduleHours: "IVR 24hrs: (817) 392-2222 | Administration: (817) 392-7820", permitRequired: true, permitUrl: "fortworthtexas.gov/departments/development-services", staffDirectory: "fortworthtexas.gov/departments/development-services/inspections", inspectorContacts: [{ name: "Customer Service", title: "Permits, Inspections, Scheduling", office: "(817) 392-2222", email: "" }, { name: "Administration", title: "Development Services Admin", office: "(817) 392-7820", email: "" }, { name: "IVR Hotline", title: "24-Hour Schedule/Cancel/Status", office: "(817) 392-2222", email: "" }], thirdParty: ["Code Solutions Inc.", "Master Code", "Bureau Veritas", "Crossroads Inspections"] },
  "Frisco": { code: "IPC 2024 ⚠", population: "230K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective March 1, 2026", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer piping", "Thermal expansion tank required on all water heater installs", "Inspections scheduled via eTRAKiT — NOT by phone", "Cancel inspections by contacting your assigned inspector directly", "Journeyman plumber must be on site at all times during work"], inspector: "Frisco Building Inspections", phone: "(972) 292-5301", directLine: "(972) 292-5301", scheduleHours: "Schedule via eTRAKiT before 7AM for same-day | After 7AM = next day", permitRequired: true, permitUrl: "friscotexas.gov/395/Building-Inspections", staffDirectory: "friscotexas.gov/directory.aspx?did=53", inspectorContacts: [{ name: "Mike Trotter", title: "Plumbing Inspection Supervisor", office: "(972) 292-5378", mobile: "(972) 670-4679", email: "mtrotter@friscotexas.gov" }, { name: "James Smith", title: "Building Inspection Supervisor (Elec)", office: "(972) 292-5399", mobile: "(469) 446-6369", email: "jsmith@friscotexas.gov" }, { name: "Jeffrey Rodriguez", title: "Building Inspection Supervisor", office: "(972) 292-5349", mobile: "(469) 714-9708", email: "jrodriguez2@friscotexas.gov" }, { name: "Gilbert Urvina", title: "Building Official", office: "(972) 292-5329", email: "gurvina@friscotexas.gov" }, { name: "Jon Worley", title: "Assistant Building Official", office: "(972) 292-5375", mobile: "(972) 670-4288", email: "jworley@friscotexas.gov" }, { name: "Customer Service", title: "Permits & General Questions", office: "(972) 292-5301", email: "bicsr@friscotexas.gov" }], thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"], warning: "Frisco moved to IPC 2024 on March 1, 2026. Journeyman must be on site during all plumbing work. Inspections via eTRAKiT only — no phone scheduling." },
  "Garland": { code: "IPC 2021", population: "238K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "24-hour inspection request line — cut-off 7AM for same day", "Inspector office hours 7:30–8:30AM and 3–4PM Mon–Fri", "Field inspections 8:30AM–3PM Mon–Fri", "Thermal expansion tanks required on all closed systems", "CSST bonding required", "Water heater elevated 18 inches in garage — strictly enforced"], inspector: "Garland Building Inspections", phone: "(972) 205-2300", directLine: "(972) 205-2300", scheduleHours: "24-hr request line (972) 205-2300 | Inspector office hrs 7:30-8:30AM and 3-4PM", permitRequired: true, permitUrl: "garlandtx.gov/221/Building-Inspection", staffDirectory: "garlandtx.gov/Directory.aspx?DID=12", inspectorContacts: [{ name: "Jim Olk", title: "Building Official", office: "972-205-2300", email: "buildinginspections@garlandtx.gov" }, { name: "Jonathan Reynolds", title: "Asst Building Official - Field Operations", office: "972-205-2313", email: "buildinginspections@garlandtx.gov" }, { name: "Brad Barker", title: "Chief Inspector", office: "972-205-2315", email: "" }, { name: "Don Wall", title: "Building Inspector", office: "972-205-2323", email: "" }, { name: "Robert Pauken", title: "Building Inspector", office: "972-205-2306", email: "" }, { name: "Samantha Morrow", title: "Office Manager / Permit Supervisor", office: "972-205-2895", email: "" }, { name: "Abdul Ali", title: "Commercial Plans Examiner", office: "972-205-2320", email: "" }, { name: "Inspection Request Line", title: "24-Hour Schedule Inspections", office: "(972) 205-2300", email: "permits@garlandtx.gov" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Georgetown": { code: "IPC 2021", population: "90K", region: "Central Texas", amendments: ["IPC 2021 adopted — switched from UPC", "All permits and inspections through MGO Connect portal (mgoconnect.org)", "Schedule inspections by 3PM for next available business day", "Georgetown Utility (GUS) pre-approval required for new water service connections", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections", "All pools engineered required effective Aug. 1, 2024"], inspector: "Georgetown Inspection Services (Permits)", phone: "(512) 930-2550", directLine: "(512) 930-2550", scheduleHours: "Mon–Fri 8AM–5PM | Schedule via mgoconnect.org by 3PM for next day", permitRequired: true, permitUrl: "georgetowntexas.gov/development_services/permits", staffDirectory: "georgetowntexas.gov/government/city_management/contact_us.php", inspectorContacts: [{ name: "Travis", title: "Plumbing Field Inspector — verified by local master plumber", office: "(512) 507-8204", mobile: "(512) 507-8204", email: "" }, { name: "Inspection Services Main", title: "Permits, Scheduling, General Questions", office: "(512) 930-2550", email: "permits@georgetowntexas.gov" }, { name: "Plan Review Questions", title: "Permits Under Review or Issued", office: "(512) 930-2550", email: "planreview@georgetowntexas.gov" }, { name: "MGO Connect Support", title: "Portal Help — Schedule Inspections", office: "(866) 957-3764", email: "" }, { name: "After Hours Utilities", title: "Water/Electric Emergencies", office: "(512) 930-3640", email: "" }], thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Crossroads Inspections"] },
  "Grand Prairie": { code: "IPC 2021", population: "196K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Straddles Dallas and Tarrant counties — confirm jurisdiction before pulling permit", "Thermal expansion tank required on closed water systems"], inspector: "Grand Prairie Building Inspections", phone: "(972) 237-8255", directLine: "(972) 237-8255", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "gptx.org/permits", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"], warning: "Grand Prairie spans Dallas and Tarrant counties. Always confirm the exact jurisdiction for your job address." },
  "Grapevine": { code: "IPC 2021", population: "55K", region: "North Texas (DFW)", amendments: ["IPC 2021 adopted effective January 1, 2024", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Water heater elevated 18\" in garage"], inspector: "Grapevine Building Inspections", phone: "(817) 410-3165", directLine: "(817) 410-3165", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "grapevinetexas.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Houston": { code: "UPC 2021 ⚠", population: "2.3M", region: "Gulf Coast", amendments: ["⚠ Houston uses the UPC — NOT the IPC", "Effective January 1, 2024 per Ordinance No. 2023-907", "Backflow preventer required on all irrigation systems", "Thermal expansion tank required on all water heater installs", "Gas pressure test: 10 PSI minimum hold for 30 minutes", "300+ field inspectors — no individual numbers published", "Plumbing inspections: call (832) 394-8870 to schedule"], inspector: "Houston Permitting Center", phone: "(832) 394-8800", directLine: "(832) 394-8870", scheduleHours: "Mon–Fri 8AM–5PM | Online 24/7 via hpceservices.org", permitRequired: true, permitUrl: "houstonpermittingcenter.org", staffDirectory: "houstonpermittingcenter.org/building-code-enforcement/plumbing-inspections", inspectorContacts: [{ name: "Plumbing Inspection Scheduling", title: "Schedule All Plumbing Inspections", office: "(832) 394-8870", email: "" }, { name: "Houston Permitting Center", title: "Main Line — All Inquiries", office: "(832) 394-8800", email: "" }, { name: "Online Services", title: "Permits & Inspection Scheduling 24/7", office: "", email: "houston.permittingcenter@houstontx.gov" }], thirdParty: ["Crossroads Inspections", "Veritas Inspections", "Bureau Veritas", "Burgess Construction Consultants", "Fox Energy Specialists"], warning: "Houston uses the UPC, not the IPC. Codes differ significantly from surrounding cities." },
  "Hurst": { code: "IPC 2021", population: "39K", region: "North Texas (HEB Area)", amendments: ["NCTCOG regional amendments apply", "HEB area code environment", "Thermal expansion tank required on all closed water systems", "Water heater pan required where leakage could cause damage"], inspector: "Hurst Building Inspections", phone: "(817) 788-7025", directLine: "(817) 788-7025", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "hursttx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Irving": { code: "IPC 2021", population: "240K", region: "North Texas (DFW)", amendments: ["IPC 2021 adopted — considering 2024 codes as of March 2026", "NCTCOG regional amendments apply", "Permits and scheduling via MGO Connect portal", "Validate trade onto building permit via email — cannot use MGO portal", "Schedule inspections by 6AM same day requested; after 6AM = next business day", "Thermal expansion tank required on all closed water systems", "Water heater elevation: 18 inch minimum in garage"], inspector: "Irving Inspections Department", phone: "(972) 721-2600", directLine: "(972) 721-2600", scheduleHours: "Schedule via MGO Connect by 6AM same day", permitRequired: true, permitUrl: "irvingtx.gov/building-inspections", staffDirectory: "directory.tml.org/profile/city/981", inspectorContacts: [{ name: "Wayne K. Snell Jr., MPA, CPM, CBO", title: "Inspections Director", office: "(972) 721-2600", email: "inspections@irvingtx.gov" }, { name: "Herb Gilliland, CBO, CPM", title: "Asst. Director of Inspections", office: "(972) 721-2600", email: "" }, { name: "Albert Pearson", title: "Sr. Plumbing & Mechanical Inspector", office: "(972) 721-2600", email: "" }, { name: "Clint Sparks", title: "Chief Plumbing & Mechanical Inspector", office: "(972) 721-2600", email: "" }, { name: "Marino Enriquez", title: "Sr. Electrical Inspector", office: "(972) 721-2600", email: "" }, { name: "Inspections Dept Main", title: "Permits, Scheduling, Trade Validation", office: "(972) 721-2600", email: "inspections@irvingtx.gov" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Katy": { code: "IPC 2021", population: "22K", region: "Greater Houston", amendments: ["Harris County MUD rules apply outside city limits — verify jurisdiction", "Expansion tank required on all water heater replacements", "Gas test: 10 PSI for 30 min — inspector must witness", "Water service: copper only within 5 ft of meter"], inspector: "Katy Building Department", phone: "(281) 391-4800", directLine: "(281) 391-4800", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofkaty.com", thirdParty: ["Crossroads Inspections", "Roadrunner Inspections", "Bureau Veritas", "Fox Energy Specialists"] },
  "Keller": { code: "IPC 2021", population: "48K", region: "North Texas (DFW)", amendments: ["IPC 2021 adopted", "⚠ Customer service inspection REQUIRED before Final on any project affecting water supply or irrigation", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Inspections for home-occupied repairs (water heater, gas line) performed 8AM–1PM same day", "Friday inspections available — request by 12PM Thursday"], inspector: "Keller Building Services", phone: "(817) 743-4110", directLine: "(817) 743-4110", scheduleHours: "Mon–Thu 7:30AM–5:30PM | Fri inspections: request by 12PM Thursday", permitRequired: true, permitUrl: "cityofkeller.com/services/community-development/building-inspections", staffDirectory: "cityofkeller.com/Home/Components/StaffDirectory/StaffDirectory/391", inspectorContacts: [{ name: "Payne Randell", title: "Building Official", office: "(817) 743-4110", email: "prandell@cityofkeller.com" }, { name: "Building Services Main", title: "Permits, Inspections, Registration", office: "(817) 743-4110", email: "buildingservices@cityofkeller.com" }, { name: "Fax", title: "Building Services Fax", office: "(817) 743-4195", email: "" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "Keller requires a customer service inspection before scheduling final on any project affecting water supply or irrigation." },
  "Killeen": { code: "IPC 2024 ⚠", population: "155K", region: "Central Texas", amendments: ["⚠ IPC 2024 adopted", "MGO Connect portal for permits", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "5 PSI air test allowed during wet weather only"], inspector: "Killeen Building Inspections", phone: "(254) 501-7640", directLine: "(254) 501-7640", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "killeentexas.gov/building-inspections", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"], warning: "Killeen is on IPC 2024. Key changes: 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Laredo": { code: "IPC 2021", population: "255K", region: "South Texas (Border)", amendments: ["Laredo Water (LWWD-DC) pre-approval required for water service connections", "Backflow prevention required on all commercial and irrigation connections", "High mineral content — additional water heater protection recommended", "Gas pressure test: 10 PSI hold for 15 minutes minimum"], inspector: "Laredo Building Development Services", phone: "(956) 794-1620", directLine: "(956) 794-1620", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.laredo.tx.us/building", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "League City": { code: "IPC 2021", population: "117K", region: "Greater Houston", amendments: ["Galveston County jurisdiction — verify MUD rules", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections", "Gas pressure test: 10 PSI minimum for 30 minutes"], inspector: "League City Inspections", phone: "(281) 554-1060", directLine: "(281) 554-1060", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "leaguecitytx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Crossroads Inspections"] },
  "Lewisville": { code: "IPC 2021", population: "115K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Water softener loop rough-in required on new construction", "CSST bonding required and verified at rough-in", "Underground plastic sewer requires tracer wire", "Inspector hours: Mon-Thu 7:30AM-5:30PM, Fri 7:30-11:30AM"], inspector: "Lewisville Development Services", phone: "(972) 219-3500", directLine: "(972) 219-3500", scheduleHours: "Mon-Thu 7:30AM-5:30PM | Fri 7:30-11:30AM", permitRequired: true, permitUrl: "cityoflewisville.com/permits", inspectorContacts: [{ name: "Building Inspections Main", title: "Permits, Scheduling, Contractor Registration", office: "(972) 219-3500", email: "building@cityoflewisville.com" }], thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },
  "Longview": { code: "IPC 2021", population: "82K", region: "East Texas", amendments: ["All inspection requests through automated line: (903) 239-5598", "Plan review required for all commercial and residential construction", "Gas pressure test required — document results for inspector"], inspector: "Longview Building Inspection", phone: "(903) 239-5598", directLine: "(903) 239-5598", scheduleHours: "Automated request line 24/7", permitRequired: true, permitUrl: "longviewtexas.gov/building-inspection", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Lubbock": { code: "IPC 2021", population: "258K", region: "West Texas", amendments: ["Adopted IPC 2021 via Ordinance 2024-O0026", "Backflow prevention: all connections must comply with 30 TAC 290.44(h)", "Backflow assembly tester must be certified", "Slab inspection required before concrete pour", "Permit valid 180 days from issuance"], inspector: "Lubbock Building Safety", phone: "(806) 775-2087", directLine: "(806) 775-3159", scheduleHours: "Mon-Fri 8AM-5PM | Inspector line: (806) 775-3159", permitRequired: true, permitUrl: "ci.lubbock.tx.us/departments/building-safety", staffDirectory: "ci.lubbock.tx.us/departments/building-safety", inspectorContacts: [{ name: "Building Safety Main", title: "Permits and General Questions", office: "(806) 775-2087", email: "buildingsafety@mylubbock.us" }, { name: "Inspector Line", title: "Schedule Inspections / Credit Card Payments", office: "(806) 775-3159", email: "" }], thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Marble Falls": { code: "IPC 2021", population: "7K", region: "Hill Country (Burnet County)", amendments: ["!! Street cleanout relocation requires developer/civil engineer authorization — plumber cannot relocate unilaterally (see Code #39)", "Cleanouts landing in driveways must have traffic-rated steel boot with cast iron lid — required before slab pour", "Subdivision infrastructure stubs are permitted under civil/site plan — separate from plumbing permit scope", "!! No-hub (mechanical) couplings NOT accepted for new construction rough-in repairs — inspector requires PVC couplings only or full re-rough of affected run. No-hub couplings are code-approved but this inspector does not allow them on new construction under slab. Verify before making any grader-damage repairs.", "Permit and inspection scheduling through Development Services at (830) 693-3615", "Burnet County seat — Highland Lakes area with significant new construction growth", "Thermal expansion tank required on closed water systems", "All new construction requires slab inspection before pour"], inspector: "Marble Falls Development Services — Building Division", phone: "(830) 693-3615", directLine: "(830) 693-3615", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "marblefallstx.gov/154/Building", inspectorContacts: [{ name: "Development Services - Building", title: "Permits, Inspections, Code Enforcement", office: "(830) 693-3615", email: "" }, { name: "City Engineer", title: "Civil / Site Plan Questions — Utility & Drainage", office: "(830) 693-3615", email: "" }], thirdParty: ["Bureau Veritas"], warning: "Two critical Marble Falls quirks: (1) Street cleanout stubs are civil scope — developer authorization required to relocate. Install steel boot if in driveway. (2) Inspector does not allow no-hub mechanical couplings on new construction rough-in — PVC couplings only or re-rough the entire run." },
  "Mansfield": { code: "IPC 2018", population: "77K", region: "North Texas (DFW)", amendments: ["Mansfield is on IPC 2018 — older than most surrounding DFW cities", "Inspection requests submitted by 4PM are inspected the next business day", "Backflow testers must register with Vepo LLC", "Single trade permits submitted via MyGov system"], inspector: "Mansfield Building Safety", phone: "(817) 276-4200", directLine: "(817) 276-4200", scheduleHours: "Submit by 4PM for next-day inspection | After 4PM Fri = Tuesday", permitRequired: true, permitUrl: "mansfieldtexas.gov/building", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"], warning: "Mansfield is on IPC 2018 — older than most surrounding DFW cities. Verify code edition requirements carefully." },
  "McAllen": { code: "IPC 2024 ⚠", population: "143K", region: "Rio Grande Valley", amendments: ["⚠ IPC 2024 adopted effective January 1, 2026", "Saturday inspections: 8:30AM–4:30PM — request Friday 12–4PM", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer"], inspector: "McAllen Building Permits & Inspections", phone: "(956) 681-1300", directLine: "(956) 681-1328", scheduleHours: "Mon–Fri 8AM–5PM | Saturday 8:30AM–4:30PM", permitRequired: true, permitUrl: "mcallen.net/permits", thirdParty: ["Bureau Veritas", "ECS Limited"], warning: "McAllen moved to IPC 2024 effective January 1, 2026. Saturday inspections now available." },
  "McKinney": { code: "IPC 2021", population: "222K", region: "North Texas", amendments: ["⚠ IPC 2024 adopted effective October 1, 2025", "Recirculation required on hot water systems over 50 ft on new residential", "Water softener loop required on all new construction", "Dual check backflow required on all irrigation systems", "Underground gas: PE pipe only with tracer wire", "All inspections must be scheduled through Citizen Self Service (CSS)", "Cancel before 9AM: call (469) 617-4800 | After 9AM: call inspector directly", "Backflow test reports for all devices picked up by Plumbing Inspector at inspection"], inspector: "McKinney Building Inspections", phone: "(469) 617-4800", directLine: "(972) 547-7400", scheduleHours: "Mon–Fri 8AM–5PM | Sa 8AM–5PM | Su 1–5PM for inspections", permitRequired: true, permitUrl: "mckinneytexas.org/243/Building-Inspections", staffDirectory: "mckinneytexas.org/263/Notices — click Contact List/Org Chart", inspectorContacts: [{ name: "Building Inspections Main", title: "Permits & Inspections", office: "(469) 617-4800", email: "" }, { name: "Legacy Permit Line", title: "Forms & Code Questions", office: "(972) 547-7400", email: "" }, { name: "Fire Marshal Office", title: "Fire Code Questions", office: "(972) 547-2862", email: "fmo@mckinneytexas.org" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Mesquite": { code: "IPC 2021", population: "145K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required — verified at rough-in", "Water heater in garage must be elevated 18\" minimum"], inspector: "Mesquite Building Inspections", phone: "(972) 216-6200", directLine: "(972) 216-6200", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofmesquite.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Midland": { code: "IPC 2021", population: "132K", region: "West Texas (Permian Basin)", amendments: ["Permian Basin: high soil expansion — bedding requirements strictly enforced", "Water heater strapping required", "Gas pressure test: 10 PSI for 30 minutes"], inspector: "Midland Building Inspections", phone: "(432) 685-7444", directLine: "(432) 685-7444", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "midlandtexas.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "New Braunfels": { code: "IPC 2021", population: "107K", region: "Central Texas", amendments: ["IPC adopted — switched from UPC", "Plans through ProjectDox electronic plan review", "Plumbing permits available online as standalone permit", "Thermal expansion tank required on all water heater installs"], inspector: "New Braunfels Development Services", phone: "(830) 221-4020", directLine: "(830) 221-4020", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "newbraunfels.gov/buildingpermits", thirdParty: ["Bureau Veritas", "Fox Energy Specialists", "Texas Third Party Inspections LLC"] },
  "North Richland Hills": { code: "IPC 2021", population: "74K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Water heater elevated 18\" in garage"], inspector: "NRH Building Inspections", phone: "(817) 427-6300", directLine: "(817) 427-6300", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "nrhtx.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Odessa": { code: "IPC 2021", population: "114K", region: "West Texas (Permian Basin)", amendments: ["Permian Basin: expansive soil — granular bedding required", "Water heater strapping required at all locations", "Industrial connections: RPZ backflow required"], inspector: "Odessa Building Inspections", phone: "(432) 335-3265", directLine: "(432) 335-3265", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "odessatx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Pasadena": { code: "IPC 2021", population: "151K", region: "Greater Houston", amendments: ["Harris County — verify MUD jurisdiction before pulling permit", "UPC used by neighboring Houston — confirm which code governs your job", "Thermal expansion tank required on all water heater installs"], inspector: "Pasadena Building Inspections", phone: "(713) 475-5560", directLine: "(713) 475-5560", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.pasadena.tx.us/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Crossroads Inspections"], warning: "Pasadena borders Houston which uses the UPC. Confirm which code governs your address." },
  "Pearland": { code: "IPC 2021", population: "125K", region: "Greater Houston", amendments: ["Brazoria County MUD rules may apply — verify jurisdiction", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation systems"], inspector: "Pearland Community Development", phone: "(281) 652-1600", directLine: "(281) 652-1600", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "pearlandtx.gov/departments/community-development", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Pflugerville": { code: "IPC 2021", population: "74K", region: "Central Texas", amendments: ["Pflugerville MUD tap fees paid before permit issuance", "Backflow test report required within 30 days of installation", "MUD inspection required separately from city inspection", "Call 811 required — documentation submitted with permit"], inspector: "Pflugerville Building Inspections", phone: "(512) 990-6100", directLine: "(512) 990-6100", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofpflugerville.com/permits", staffDirectory: "pflugervilletx.gov/city-government/people-and-culture/staff-directory", inspectorContacts: [{ name: "Building Inspections Main", title: "Permits & Scheduling", office: "(512) 990-6100", email: "building@pflugervilletx.gov" }], thirdParty: ["Fox Energy Specialists", "Burgess Construction Consultants", "Crossroads Inspections"] },
  "Hutto": { code: "IPC 2021", population: "32K", region: "Central Texas", amendments: ["IPC 2021 adopted", "All permits and payments processed through GovWell portal", "Williamson County MUD coordination may be required for new connections", "HOA deed restrictions may apply independent of city permit requirements"], inspector: "Hutto Building Inspections", phone: "(512) 759-5973", directLine: "(512) 759-5973", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "huttotx.gov/158/Building", staffDirectory: "huttotx.gov/directory.aspx?did=6", inspectorContacts: [{ name: "Matthew Reyna", title: "Building Inspector", office: "737-244-2061", email: "" }, { name: "Aaron Gillum", title: "Building Inspector", office: "512-365-9345", email: "" }, { name: "Tyler Wiggins", title: "Building Inspector", office: "737-325-7818", email: "" }, { name: "Building Inspections Main", title: "Permits & Scheduling", office: "(512) 759-5973", email: "building@huttotx.gov" }], thirdParty: ["Fox Energy Specialists", "Crossroads Inspections"] },
  "Plano": { code: "IPC 2024 ⚠", population: "285K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective August 1, 2025", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "Water softener loop required on all new residential construction", "Permits through Accela portal"], inspector: "Plano Building Inspections", phone: "(972) 941-7151", directLine: "(972) 941-7151", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "plano.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "Plano moved to IPC 2024 on August 1, 2025. 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Prosper": { code: "IPC 2021", population: "42K", region: "North Texas (DFW)", amendments: ["CSS portal for permits", "Permits expire 180 days from issuance", "General contractor pulls main permit and lists all subcontractors", "Subcontractors must be registered to work in Prosper"], inspector: "Prosper Building Inspections", phone: "(972) 346-3502", directLine: "(972) 346-3502", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "prospertx.gov/building", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Richardson": { code: "IPC 2021", population: "121K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "All contractors must be registered before permit issued", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Backflow prevention required on all irrigation connections", "After-hours inspections available for storm repairs"], inspector: "Richardson Building Inspection", phone: "(972) 744-4180", directLine: "(972) 744-4180", scheduleHours: "Mon-Fri 8AM-5PM | Inspection requests via portal or (972) 744-4180", permitRequired: true, permitUrl: "cor.net/departments/building-inspection", staffDirectory: "cor.net/departments/building-inspection/contact-us-faq", inspectorContacts: [{ name: "Jennifer Patrick", title: "Building Inspection Manager", office: "972-744-4195", email: "Jennifer.Patrick@cor.gov" }, { name: "Building Inspection Main", title: "Permits, Inspections, Contractor Registration", office: "(972) 744-4180", email: "permits@cor.gov" }, { name: "Permit Questions", title: "Permit Submittal and Status", office: "(972) 744-4164", email: "permits@cor.gov" }, { name: "Express Permitting", title: "3-business-day plan review for qualifying projects", office: "972-744-4195", email: "permits@cor.gov" }], thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Rockwall": { code: "IPC 2021", population: "51K", region: "North Texas (DFW)", amendments: ["Rockwall County seat — verify ETJ if working near city limits", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Backflow prevention required on all irrigation connections"], inspector: "Rockwall Building Inspections", phone: "(972) 771-7700", directLine: "(972) 771-7700", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "rockwall.com/buildinginspections", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Round Rock": { code: "IPC 2021", population: "133K", region: "Central Texas", amendments: ["Strict one-permit system — all trades on same permit", "All contractors must be registered before permit issued", "Permit invalid if work not started within 6 months", "Chandler Creek and Vista Oaks MUD: same permits as city", "Schedule inspections by 4PM for next day — not guaranteed", "Two free inspections per permit type; $75 re-inspection fee after that"], inspector: "Round Rock Building Inspections", phone: "(512) 218-5550", directLine: "(512) 218-5550", scheduleHours: "Mon–Fri 8AM–3PM field | Schedule by 4PM for next day via Permit Portal", permitRequired: true, permitUrl: "roundrocktexas.gov/building-inspection", staffDirectory: "roundrocktexas.gov/city-departments/planning-and-development-services/pdsorgchart-current/", inspectorContacts: [{ name: "James Shine", title: "Building Official", office: "512-470-9543", email: "jshine@roundrocktexas.gov" }, { name: "Bryan Fails", title: "Chief Plumbing Inspector", office: "512-845-6249", email: "bfails@roundrocktexas.gov" }, { name: "Roger Gonzalez", title: "Commercial Plumbing Inspector", office: "737-423-5203", email: "rgonzales@roundrocktexas.gov" }, { name: "Jorge Scott", title: "Assistant Building Official", office: "512-218-7029", email: "jscott@roundrocktexas.gov" }, { name: "Jake Morrison", title: "Chief Residential Inspector", office: "737-376-0954", email: "jmorrison@roundrocktexas.gov" }, { name: "Jimmy Spencer", title: "Chief Electrical Inspector", office: "512-470-9507", email: "jimmyspencer@roundrocktexas.gov" }, { name: "Amos Harrison", title: "Chief Structural Inspector", office: "512-639-0218", email: "aharrison@roundrocktexas.gov" }, { name: "Matt Krueger", title: "Chief Civil Inspector", office: "512-748-9092", email: "mkrueger@roundrocktexas.gov" }, { name: "Building Permits Main", title: "Permits & Scheduling", office: "(512) 218-5550", email: "buildingpermits@roundrocktexas.gov" }], thirdParty: ["Fox Energy Specialists", "Burgess Construction Consultants", "Bureau Veritas"] },
  "Rowlett": { code: "IPC 2021", population: "66K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required", "Water heater elevated 18\" in garage"], inspector: "Rowlett Building Inspections", phone: "(972) 412-6100", directLine: "(972) 412-6100", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "rowlett.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Sachse": { code: "IPC 2021", population: "30K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Collin/Dallas county line — verify which county governs your address", "Thermal expansion tank required", "CSST bonding required per NFPA 54"], inspector: "Sachse Building Inspections", phone: "(972) 495-1212", directLine: "(972) 495-1212", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofsachse.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "San Antonio": { code: "IPC 2024", population: "1.4M", region: "South Texas", amendments: ["SAWS approval required before any water service connection", "RPZ backflow required on all commercial irrigation systems", "Gas line pressure test: 10 PSI hold for 15 minutes minimum", "Water heater pan and drain required in all install locations", "Grease trap required on all food service establishments", "Field inspector office hours: 7:45–9AM and 3–4:30PM (inspectors in field rest of day)"], inspector: "SA Development Services", phone: "(210) 207-1111", directLine: "(210) 207-1111", scheduleHours: "Mon–Fri 7:30AM–4:30PM | Inspector office hours 7:45–9AM & 3–4:30PM", permitRequired: true, permitUrl: "sanantonio.gov/DSD", staffDirectory: "docsonline.sanantonio.gov/FileUploads/dsd/InspectorsContactInfo.pdf", inspectorContacts: [{ name: "Manuel Rodriguez", title: "Sr. Plumbing Inspector — School Team", office: "(210) 260-5152", email: "" }, { name: "Tony Frye", title: "Plumbing Inspector", office: "(210) 760-7306", email: "" }, { name: "Daniel Flores", title: "Plumbing Inspector", office: "(210) 313-4375", email: "" }, { name: "Jerome Truss", title: "Plumbing Inspector", office: "(210) 260-5359", email: "" }, { name: "Joe Hernandez", title: "Plumbing Inspector", office: "(210) 237-9720", email: "" }, { name: "Kenneth Cordes", title: "Plumbing Inspector", office: "(210) 760-7295", email: "" }, { name: "Santos Dimas", title: "Plumbing Inspector", office: "(210) 845-8358", email: "" }, { name: "Ramiro Carrillo", title: "Development Services Manager", office: "(210) 207-8314", mobile: "(210) 294-1326", email: "" }, { name: "Inspectors FAX", title: "Field Services Fax", office: "(210) 207-6073", email: "" }, { name: "Main DSD Line", title: "General & Scheduling", office: "(210) 207-1111", email: "" }], thirdParty: ["Roadrunner Inspections", "Veritas Inspections", "Bureau Veritas", "ECS Limited"] },
  "Schertz": { code: "IPC 2021", population: "43K", region: "San Antonio Suburb (3 Counties)", amendments: ["Spans Comal, Guadalupe, and Bexar counties — verify which governs your address", "CityView portal for all permits and inspections", "Permits required for water heaters, water softeners, and irrigation backflow"], inspector: "Schertz Building Inspections", phone: "(210) 619-1750", directLine: "(210) 619-1750", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "schertz.com/building", thirdParty: ["Roadrunner Inspections", "Bureau Veritas", "Texas Third Party Inspections LLC"], warning: "Schertz spans three counties. Always confirm which county governs your specific job address." },
  "Southlake": { code: "IPC 2021", population: "32K", region: "North Texas (DFW)", amendments: ["Emergency plumbing work allowed without permit — get permit next business day", "FOG worksheet required for food service plumbing — must be sealed by engineer", "CSST bonding required per NFPA 54", "Thermal expansion tank required", "Photo documentation option available in lieu of on-site inspections for water heaters, roofs, windows, certain mechanical equipment"], inspector: "Southlake Building Inspections", phone: "(817) 748-8236", directLine: "(817) 748-8237", scheduleHours: "Mon-Fri 8AM-5PM | Schedule via EP&L Civic Access portal", permitRequired: true, permitUrl: "cityofsouthlake.com/111/Building-Inspections-Code-Enforcement", staffDirectory: "cityofsouthlake.com/2734/Staff-Contacts", inspectorContacts: [{ name: "Charles Wright", title: "Deputy Building Official - Inspections", office: "(817) 748-8969", email: "cwright@cityofsouthlake.com" }, { name: "Susan Hernandez", title: "Deputy Building Official - Administration", office: "(817) 748-8238", email: "shernandez@cityofsouthlake.com" }, { name: "Taylor Markle", title: "Building Inspector", office: "817-748-8048", email: "tmarkle@cityofsouthlake.com" }, { name: "Ernie Aguilar", title: "Building Inspector", office: "(817) 748-8226", email: "eaguilar@cityofsouthlake.com" }, { name: "Skip Vandergrifft", title: "Plans Examiner", office: "(817) 748-8390", email: "svandergrifft@cityofsouthlake.com" }, { name: "Carol Nemoto", title: "Plans Examiner", office: "(817) 748-8040", email: "cnemoto@cityofsouthlake.com" }, { name: "Denia Reyes", title: "Permit Technician", office: "817-748-8256", email: "dreyes@cityofsouthlake.com" }, { name: "Building Inspections Main", title: "Permits and Scheduling", office: "(817) 748-8236", email: "buildinginspections@cityofsouthlake.com" }], thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"] },
  "Sugar Land": { code: "IPC 2024 ⚠", population: "111K", region: "Greater Houston", amendments: ["⚠ IPC 2024 adopted via Ordinance 2395", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "Fort Bend County MUD rules may apply in outer areas"], inspector: "Sugar Land Building Inspections", phone: "(281) 275-2400", directLine: "(281) 275-2400", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "sugarlandtx.gov/building", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"], warning: "Sugar Land is on IPC 2024. 2.0 GPM max showerheads, tracer wire on buried plastic sewer." },
  "Temple": { code: "IPC 2021", population: "82K", region: "Central Texas", amendments: ["Permits required for all plumbing work", "Gas pressure test: 10 PSI minimum hold", "Thermal expansion tank required on all closed water systems", "Water heater pan required in all interior locations"], inspector: "Temple Building Inspections", phone: "(254) 298-5640", directLine: "(254) 298-5640", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "templetx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "The Colony": { code: "IPC 2024 ⚠", population: "50K", region: "North Texas (DFW)", amendments: ["⚠ IPC 2024 adopted effective July 17, 2025", "Showerhead flow limited to 2.0 GPM", "Tracer wire required on buried plastic sewer", "Permits now required for roof, siding, and foundation repair (Oct 1, 2025)"], inspector: "The Colony Building Inspections", phone: "(972) 625-1106", directLine: "(972) 625-1106", scheduleHours: "Mon–Fri 8AM–5PM | Inspections via ETrakIt", permitRequired: true, permitUrl: "thecolonytx.gov/building-inspections", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"], warning: "The Colony moved to IPC 2024 on July 17, 2025. Also: permits now required for roof replacement, siding, and foundation repair." },
  "Tyler": { code: "IPC 2021", population: "105K", region: "East Texas", amendments: ["New codes effective January 1, 2024 — reference code by name and date on plans", "Permit applications denied if plans do not reference correct code", "2023 NEC applies to all electrical work associated with plumbing"], inspector: "Tyler Development Services", phone: "(903) 531-1210", directLine: "(903) 531-1210", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityoftyler.org/development-services", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Waco": { code: "IPC 2021", population: "139K", region: "Central Texas", amendments: ["Model construction codes with local amendments", "Gas pressure test: 10 PSI minimum", "Thermal expansion tank required on all closed water systems", "CSST bonding required per NFPA 54"], inspector: "Waco Inspection Services", phone: "(254) 750-5630", directLine: "(254) 750-5630", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "waco-texas.com/inspection-services", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Wichita Falls": { code: "IPC 2021", population: "102K", region: "North Texas", amendments: ["Permits and inspections through MGOconnect online portal", "After-hours and emergency inspections available", "All contractors must register and obtain code compliance bond", "Gas pressure test: 10 PSI minimum, witnessed test may be required"], inspector: "Wichita Falls Building Inspections", phone: "(940) 761-7442", directLine: "(940) 761-7442", scheduleHours: "Mon–Fri 8AM–5PM | After-hours available", permitRequired: true, permitUrl: "wichitafallstx.gov/building-inspections", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Abilene": { code: "IPC 2021", population: "125K", region: "West Texas", amendments: ["All permits through Accela online portal", "Gas pressure test: 10 PSI minimum hold for 15 minutes", "Thermal expansion tank required on all closed water systems", "Water heater pan required in all interior locations"], inspector: "Abilene Building Inspections", phone: "(325) 676-6246", directLine: "(325) 676-6246", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "abilenetx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Allen": { code: "IPC 2021", population: "107K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "All permits through CSS portal before work begins", "Call (214) 509-4130 between 8-9 AM on day of inspection for time window", "Backflow prevention required — irrigation backflow tester must be licensed"], inspector: "Allen Building & Permitting", phone: "(214) 509-4130", directLine: "(214) 509-4130", scheduleHours: "8–9 AM day of inspection", permitRequired: true, permitUrl: "cityofallen.org/building-permitting", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Anna": { code: "IPC 2021", population: "22K", region: "North Texas (DFW)", amendments: ["Fast-growing Collin County suburb — permit volume high, plan ahead", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Underground plastic sewer requires tracer wire"], inspector: "Anna Building Inspections", phone: "(972) 924-2616", directLine: "(972) 924-2616", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "annatexas.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Aubrey": { code: "IPC 2021", population: "10K", region: "North Texas (DFW)", amendments: ["Denton County — verify ETJ if working near city limits", "NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required per NFPA 54"], inspector: "Aubrey Building Department", phone: "(940) 440-9343", directLine: "(940) 440-9343", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "aubreytx.gov", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Bastrop": { code: "IPC 2021", population: "10K", region: "Central Texas", amendments: ["Historic district overlay — special considerations for older homes", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections", "Verify MUD district rules if outside city limits"], inspector: "Bastrop Building Department", phone: "(512) 332-8800", directLine: "(512) 332-8800", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofbastrop.org/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Baytown": { code: "IPC 2021", population: "83K", region: "Greater Houston", amendments: ["Harris County border — verify jurisdiction before pulling permit", "Petrochemical area — additional gas line requirements may apply", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation and commercial connections"], inspector: "Baytown Building Inspections", phone: "(281) 420-5464", directLine: "(281) 420-5464", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "baytown.org/building-inspections", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Beaumont": { code: "IPC 2021", population: "117K", region: "Southeast Texas", amendments: ["All permits through online portal", "Gas pressure test: 10 PSI for 30 minutes", "Thermal expansion tank required on all closed water systems", "Jefferson County rules apply in unincorporated areas"], inspector: "Beaumont Building Inspections", phone: "(409) 880-3763", directLine: "(409) 880-3763", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "beaumonttexas.gov/building", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Boerne": { code: "IPC 2021", population: "22K", region: "San Antonio Suburb (Hill Country)", amendments: ["Hill Country — expansive soil conditions, granular bedding may be required", "Kendall County rules apply outside city limits", "Thermal expansion tank required on all water heater installs", "Water service connections require city utility pre-approval"], inspector: "Boerne Building Inspections", phone: "(830) 249-9511", directLine: "(830) 249-9511", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.boerne.tx.us/permits", thirdParty: ["Roadrunner Inspections", "Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Buda": { code: "IPC 2021", population: "27K", region: "Central Texas (Austin suburb)", amendments: ["Fast-growing Hays County suburb — permit processing may take longer", "Buda Utility Board pre-approval required for water connections", "Thermal expansion tank required", "Backflow prevention required on all irrigation systems"], inspector: "Buda Planning & Development", phone: "(512) 312-0084", directLine: "(512) 312-0084", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofbuda.org/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Cedar Hill": { code: "IPC 2021", population: "48K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Straddles Dallas and Ellis counties — verify jurisdiction", "Thermal expansion tank required", "Water heater elevated 18\" in garage"], inspector: "Cedar Hill Building Inspections", phone: "(972) 291-5100", directLine: "(972) 291-5100", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cedarhilltx.gov/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Celina": { code: "IPC 2021", population: "35K", region: "North Texas (DFW)", amendments: ["One of the fastest growing cities in Texas — high permit volume", "NCTCOG regional amendments apply", "Collin County — verify ETJ for addresses near city limits", "Thermal expansion tank required on all closed water systems"], inspector: "Celina Building Inspections", phone: "(972) 382-2682", directLine: "(972) 382-2682", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "celina.tx.us/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Cleburne": { code: "IPC 2021", population: "32K", region: "North Texas (Fort Worth suburb)", amendments: ["Johnson County seat — verify county rules for unincorporated areas", "NCTCOG regional amendments apply", "Thermal expansion tank required", "Gas pressure test: 10 PSI minimum"], inspector: "Cleburne Building Inspections", phone: "(817) 645-0977", directLine: "(817) 645-0977", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cleburne.net/permits", thirdParty: ["Code Solutions Inc.", "Bureau Veritas"] },
  "College Station": { code: "IPC 2021", population: "120K", region: "Brazos Valley", amendments: ["Texas A&M University area — commercial and student housing codes strictly enforced", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation systems", "Gas pressure test: 10 PSI for 15 minutes minimum"], inspector: "College Station Building", phone: "(979) 764-3570", directLine: "(979) 764-3570", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cstx.gov/building", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Corpus Christi": { code: "IPC 2021", population: "318K", region: "Coastal Bend", amendments: ["Coastal zone — corrosion-resistant materials required for exposed piping", "Wind-driven rain protection required on vent terminations", "Nueces County MUD rules may apply outside city limits", "Backflow prevention required on all connections near marine areas"], inspector: "Corpus Christi Development Services", phone: "(361) 826-3240", directLine: "(361) 826-3240", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cctexas.com/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Coppell": { code: "IPC 2021", population: "42K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Straddles Dallas and Denton counties — verify jurisdiction", "Thermal expansion tank required", "CSST bonding required per NFPA 54"], inspector: "Coppell Building Inspections", phone: "(972) 304-3500", directLine: "(972) 304-3500", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "coppelltx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Copperas Cove": { code: "IPC 2021", population: "35K", region: "Central Texas (Fort Hood area)", amendments: ["Coryell County — verify jurisdiction near Fort Cavazos boundary", "Military housing area — additional requirements may apply near base", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Copperas Cove Building Inspections", phone: "(254) 542-0368", directLine: "(254) 542-0368", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "copperascovetx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Deer Park": { code: "IPC 2021", population: "34K", region: "Greater Houston", amendments: ["Harris County — verify MUD jurisdiction", "Petrochemical corridor — gas line requirements strictly enforced", "Thermal expansion tank required", "Backflow prevention required on all commercial connections"], inspector: "Deer Park Building Inspections", phone: "(281) 478-7258", directLine: "(281) 478-7258", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "deerparktx.org/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "DeSoto": { code: "IPC 2021", population: "57K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Dallas County suburb — permits through city portal", "Thermal expansion tank required", "Water heater elevated 18\" in garage — strictly enforced"], inspector: "DeSoto Building Inspections", phone: "(972) 230-9600", directLine: "(972) 230-9600", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "desototexas.gov/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Duncanville": { code: "IPC 2021", population: "40K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Dallas County — permits required before work begins", "Thermal expansion tank required", "CSST bonding required per NFPA 54"], inspector: "Duncanville Building Inspections", phone: "(972) 780-5000", directLine: "(972) 780-5000", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "duncanville.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Edinburg": { code: "IPC 2021", population: "101K", region: "Rio Grande Valley", amendments: ["Hidalgo County seat — verify county rules for unincorporated areas", "High mineral content water — additional water heater protection recommended", "Backflow prevention required on all irrigation connections", "Gas pressure test: 10 PSI minimum"], inspector: "Edinburg Building Inspections", phone: "(956) 388-8203", directLine: "(956) 388-8203", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofedinburg.com/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "Friendswood": { code: "IPC 2021", population: "40K", region: "Greater Houston", amendments: ["Galveston/Harris county line — verify which county governs your address", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation systems", "Gas pressure test: 10 PSI for 30 minutes"], inspector: "Friendswood Building Inspections", phone: "(281) 996-3200", directLine: "(281) 996-3200", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "friendswood.com/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Harlingen": { code: "IPC 2021", population: "65K", region: "Rio Grande Valley", amendments: ["Cameron County — verify county rules for unincorporated areas", "High mineral content water — water softener loop recommended on new construction", "Backflow prevention required on all irrigation connections", "Thermal expansion tank required on all closed water systems"], inspector: "Harlingen Building Inspections", phone: "(956) 216-5080", directLine: "(956) 216-5080", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "myharlingen.us/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "Humble": { code: "IPC 2021", population: "16K", region: "Greater Houston", amendments: ["Harris County MUD rules commonly apply — verify jurisdiction", "Thermal expansion tank required", "Backflow prevention required on all irrigation systems", "Gas pressure test: 10 PSI for 30 minutes"], inspector: "Humble Building Inspections", phone: "(281) 446-4661", directLine: "(281) 446-4661", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofhumble.com/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Huntsville": { code: "IPC 2021", population: "43K", region: "East Texas (Sam Houston area)", amendments: ["Walker County seat — verify county rules for unincorporated areas", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold", "Water heater pan required in all interior locations"], inspector: "Huntsville Building Inspections", phone: "(936) 291-5415", directLine: "(936) 291-5415", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "huntsvilletx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Joshua": { code: "IPC 2021", population: "8K", region: "North Texas (Fort Worth suburb)", amendments: ["Johnson County — verify ETJ boundaries", "NCTCOG regional amendments apply", "Thermal expansion tank required", "Gas pressure test required — document results"], inspector: "Joshua Building Department", phone: "(817) 558-7447", directLine: "(817) 558-7447", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "joshuatx.gov", thirdParty: ["Code Solutions Inc.", "Bureau Veritas"] },
  "Katy": { code: "IPC 2021", population: "22K", region: "Greater Houston", amendments: ["Harris County MUD rules apply outside city limits — verify jurisdiction", "Expansion tank required on all water heater replacements", "Gas test: 10 PSI for 30 min — inspector must witness", "Water service: copper only within 5 ft of meter"], inspector: "Katy Building Department", phone: "(281) 391-4800", directLine: "(281) 391-4800", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofkaty.com", thirdParty: ["Crossroads Inspections", "Roadrunner Inspections", "Bureau Veritas", "Fox Energy Specialists"] },
  "Kyle": { code: "IPC 2021", population: "65K", region: "Central Texas (Austin suburb)", amendments: ["Hays County fast-growing suburb — high permit volume, plan ahead", "Kyle Water pre-approval required for new water service connections", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation systems"], inspector: "Kyle Building Inspections", phone: "(512) 262-3945", directLine: "(512) 262-3945", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofkyle.com/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Lancaster": { code: "IPC 2021", population: "40K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Dallas County suburb — permits required before work begins", "Thermal expansion tank required on all closed water systems", "Water heater elevated 18\" in garage"], inspector: "Lancaster Building Inspections", phone: "(972) 218-1300", directLine: "(972) 218-1300", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "lancaster-tx.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Little Elm": { code: "IPC 2021", population: "57K", region: "North Texas (DFW)", amendments: ["Fast-growing Denton County suburb", "NCTCOG regional amendments apply", "Thermal expansion tank required", "Underground plastic sewer requires tracer wire"], inspector: "Little Elm Building Inspections", phone: "(214) 975-0400", directLine: "(214) 975-0400", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "littleelm.org/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Lufkin": { code: "IPC 2021", population: "35K", region: "East Texas", amendments: ["Angelina County seat — verify county rules for unincorporated areas", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold for 15 minutes", "Water heater pan required in all interior locations"], inspector: "Lufkin Building Inspections", phone: "(936) 633-0217", directLine: "(936) 633-0217", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityoflufkin.com/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Manor": { code: "IPC 2021", population: "18K", region: "Central Texas (Austin suburb)", amendments: ["Travis County fast-growing suburb", "Manor Water utility pre-approval required for new connections", "Thermal expansion tank required", "Backflow prevention required on all irrigation systems"], inspector: "Manor Building Department", phone: "(512) 272-5555", directLine: "(512) 272-5555", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cityofmanor.org/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Marshall": { code: "IPC 2021", population: "22K", region: "East Texas", amendments: ["Harrison County seat", "Permits required for all plumbing work including water heater replacements", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Marshall Building Inspections", phone: "(903) 935-4450", directLine: "(903) 935-4450", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "marshalltexas.net/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Missouri City": { code: "IPC 2021", population: "75K", region: "Greater Houston", amendments: ["Fort Bend County — verify MUD district rules", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation systems", "Gas pressure test: 10 PSI for 30 minutes"], inspector: "Missouri City Building Inspections", phone: "(281) 403-8700", directLine: "(281) 403-8700", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "missouricitytx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Mount Pleasant": { code: "IPC 2021", population: "17K", region: "Northeast Texas", amendments: ["Titus County seat", "Permits required for all plumbing work", "Gas pressure test: 10 PSI minimum hold", "Thermal expansion tank required on all closed water systems"], inspector: "Mount Pleasant Building Inspections", phone: "(903) 575-4000", directLine: "(903) 575-4000", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "mpcity.net/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Nacogdoches": { code: "IPC 2021", population: "33K", region: "East Texas (Deep East Texas)", amendments: ["Stephen F. Austin University area — student housing codes enforced", "Nacogdoches Water utility approval required for new connections", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Nacogdoches Building Inspections", phone: "(936) 559-2571", directLine: "(936) 559-2571", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.nacogdoches.tx.us/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "North Richland Hills": { code: "IPC 2021", population: "74K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required per NFPA 54", "Water heater elevated 18\" in garage"], inspector: "NRH Building Inspections", phone: "(817) 427-6300", directLine: "(817) 427-6300", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "nrhtx.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Odessa": { code: "IPC 2021", population: "114K", region: "West Texas (Permian Basin)", amendments: ["Permian Basin: expansive soil — granular bedding required", "Water heater strapping required at all locations", "Industrial connections: RPZ backflow required"], inspector: "Odessa Building Inspections", phone: "(432) 335-3265", directLine: "(432) 335-3265", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "odessatx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Port Arthur": { code: "IPC 2021", population: "55K", region: "Southeast Texas", amendments: ["Jefferson County — verify jurisdiction in unincorporated areas", "Coastal/industrial area — corrosion protection required on exposed piping", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all commercial connections"], inspector: "Port Arthur Building Inspections", phone: "(409) 983-8160", directLine: "(409) 983-8160", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "portarthurtx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "Rowlett": { code: "IPC 2021", population: "66K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required", "Water heater elevated 18\" in garage"], inspector: "Rowlett Building Inspections", phone: "(972) 412-6100", directLine: "(972) 412-6100", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "rowlett.com/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "San Angelo": { code: "IPC 2021", population: "100K", region: "West Texas", amendments: ["Tom Green County seat — verify county rules for unincorporated areas", "Water conservation fixtures mandatory on all new construction", "Gas pressure test: 10 PSI minimum hold for 15 minutes", "Thermal expansion tank required on all closed water systems"], inspector: "San Angelo Building Inspections", phone: "(325) 657-4407", directLine: "(325) 657-4407", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "cosatx.us/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "San Marcos": { code: "IPC 2021", population: "70K", region: "Central Texas", amendments: ["Texas State University area — student housing codes enforced", "Hays County fast-growing area — high permit volume", "San Marcos Utilities pre-approval required for new water connections", "Thermal expansion tank required on all water heater installs"], inspector: "San Marcos Building Inspections", phone: "(512) 393-8150", directLine: "(512) 393-8150", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "sanmarcostx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Sherman": { code: "IPC 2021", population: "44K", region: "North Texas (Texoma)", amendments: ["Grayson County seat", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Sherman Building Inspections", phone: "(903) 892-7227", directLine: "(903) 892-7227", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.sherman.tx.us/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Stafford": { code: "IPC 2021", population: "19K", region: "Greater Houston", amendments: ["Fort Bend County — no city property tax, but permits still required", "Harris/Fort Bend county line — verify jurisdiction", "Thermal expansion tank required", "Backflow prevention required on all irrigation systems"], inspector: "Stafford Building Inspections", phone: "(281) 261-3900", directLine: "(281) 261-3900", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "staffordtx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Stephenville": { code: "IPC 2021", population: "22K", region: "North Texas (Erath County)", amendments: ["Tarleton State University area", "Erath County — verify county rules for unincorporated areas", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Stephenville Building Department", phone: "(254) 918-1224", directLine: "(254) 918-1224", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "stephenvilletx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Sulphur Springs": { code: "IPC 2021", population: "16K", region: "Northeast Texas", amendments: ["Hopkins County seat", "Permits required for all plumbing work", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Sulphur Springs Building Inspections", phone: "(903) 885-7541", directLine: "(903) 885-7541", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "sulphurspringstx.org/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Texarkana": { code: "IPC 2021", population: "37K", region: "Northeast Texas (Arkansas border)", amendments: ["Texas/Arkansas state line — confirm you are in the Texas jurisdiction", "Bowie County — verify county rules for unincorporated areas", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold for 15 minutes"], inspector: "Texarkana TX Building Inspections", phone: "(903) 798-3900", directLine: "(903) 798-3900", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "ci.texarkana.tx.us/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"], warning: "Texarkana straddles the Texas/Arkansas state line. Always confirm your job address is on the Texas side before pulling a permit." },
  "Texas City": { code: "IPC 2021", population: "51K", region: "Greater Houston (Galveston County)", amendments: ["Galveston County coastal area — corrosion protection required on exposed piping", "Wind-driven rain protection required on vent terminations", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all connections"], inspector: "Texas City Building Inspections", phone: "(409) 643-5600", directLine: "(409) 643-5600", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "texascity-tx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Victoria": { code: "IPC 2021", population: "67K", region: "South Texas (Crossroads)", amendments: ["Victoria County seat — verify county rules for unincorporated areas", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation connections", "Gas pressure test: 10 PSI minimum hold for 15 minutes"], inspector: "Victoria Building Inspections", phone: "(361) 485-3010", directLine: "(361) 485-3010", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "victoriatx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Weatherford": { code: "IPC 2021", population: "38K", region: "North Texas (Parker County)", amendments: ["Parker County seat — verify ETJ boundaries", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Weatherford Building Inspections", phone: "(817) 598-4298", directLine: "(817) 598-4298", scheduleHours: "Mon–Fri 8AM–5PM", permitRequired: true, permitUrl: "weatherfordtx.gov/permits", thirdParty: ["Code Solutions Inc.", "Bureau Veritas", "Crossroads Inspections"] },
  "Wylie": { code: "IPC 2021", population: "60K", region: "North Texas (DFW)", amendments: ["NCTCOG regional amendments apply", "Collin County — verify ETJ for addresses near city limits", "Thermal expansion tank required", "CSST bonding required per NFPA 54"], inspector: "Wylie Building Inspections", phone: "(972) 516-6340", directLine: "(972) 516-6340", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "wylietexas.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Waxahachie": { code: "IPC 2021", population: "43K", region: "North Texas (Ellis County)", amendments: ["Ellis County seat — verify ETJ boundaries carefully", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Waxahachie Building Inspections", phone: "(972) 937-7330", directLine: "(972) 937-7330", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "waxahachietx.gov/building", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"] },
  "Forney": { code: "IPC 2021", population: "40K", region: "North Texas (DFW)", amendments: ["Fast-growing Kaufman County suburb", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Underground plastic sewer requires tracer wire"], inspector: "Forney Building Inspections", phone: "(972) 552-6474", directLine: "(972) 552-6474", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "forneytx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },
  "Granbury": { code: "IPC 2021", population: "12K", region: "North Texas (Hood County)", amendments: ["Hood County seat — historic district overlays may apply downtown", "Parker/Hood county line areas — verify jurisdiction", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Granbury Building Inspections", phone: "(817) 573-1114", directLine: "(817) 573-1114", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "granburytx.gov/permits", thirdParty: ["Code Solutions Inc.", "Bureau Veritas"] },
  "Lockhart": { code: "IPC 2021", population: "16K", region: "Central Texas (Caldwell County)", amendments: ["Caldwell County seat — BBQ capital of Texas", "Verify MUD district if working outside city limits", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation connections"], inspector: "Lockhart Building Department", phone: "(512) 398-3461", directLine: "(512) 398-3461", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "lockhart-tx.com/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Seguin": { code: "IPC 2021", population: "30K", region: "Central Texas (Guadalupe County)", amendments: ["Guadalupe County seat — verify ETJ boundaries", "High growth area — permit volume increasing", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation connections"], inspector: "Seguin Building Inspections", phone: "(830) 401-2484", directLine: "(830) 401-2484", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "seguintexas.gov/permits", thirdParty: ["Roadrunner Inspections", "Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Converse": { code: "IPC 2021", population: "30K", region: "San Antonio Suburb (Bexar County)", amendments: ["Bexar County suburb — fast growing", "San Antonio Building Code environment — verify IPC vs local amendments", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all irrigation systems"], inspector: "Converse Building Inspections", phone: "(210) 659-5031", directLine: "(210) 659-5031", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "conversetx.net/permits", thirdParty: ["Roadrunner Inspections", "Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Cibolo": { code: "IPC 2021", population: "31K", region: "San Antonio Suburb (Guadalupe County)", amendments: ["One of fastest growing cities in Texas", "Guadalupe County — verify MUD/ETJ boundaries", "CityView portal for permits and inspections", "Thermal expansion tank required on all closed water systems"], inspector: "Cibolo Building Inspections", phone: "(210) 566-9700", directLine: "(210) 566-9700", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "cibolotx.gov/permits", thirdParty: ["Roadrunner Inspections", "Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Harker Heights": { code: "IPC 2021", population: "32K", region: "Central Texas (Fort Hood area)", amendments: ["Coryell/Bell county area — near Fort Cavazos", "Military community — verify civilian permit requirements vs on-base work", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Harker Heights Building Inspections", phone: "(254) 953-5635", directLine: "(254) 953-5635", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "hhtx.com/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Belton": { code: "IPC 2021", population: "25K", region: "Central Texas (Bell County)", amendments: ["Bell County seat", "Adjacent to Temple and Killeen — verify jurisdiction on border addresses", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Belton Building Inspections", phone: "(254) 933-5820", directLine: "(254) 933-5820", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "beltontexas.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Galveston": { code: "IPC 2021", population: "53K", region: "Gulf Coast (Galveston County)", amendments: ["Coastal zone — all exposed piping must be corrosion resistant", "Wind-driven rain protection required on all vent terminations", "Elevated structure requirements — piping support on piers", "Flood zone: all water heaters and HVAC elevated above base flood elevation"], inspector: "Galveston Building Inspection Division", phone: "(409) 797-3660", directLine: "(409) 797-3660", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "galvestontx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"], warning: "Galveston is a coastal flood zone. All plumbing equipment must be elevated above base flood elevation. Corrosion-resistant materials required on all exposed exterior piping." },
  "Dickinson": { code: "IPC 2021", population: "24K", region: "Greater Houston (Galveston County)", amendments: ["Galveston County coastal area", "Flood zone considerations — verify base flood elevation", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections"], inspector: "Dickinson Building Inspections", phone: "(281) 337-6200", directLine: "(281) 337-6200", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "dickinsontexas.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Alvin": { code: "IPC 2021", population: "28K", region: "Greater Houston (Brazoria County)", amendments: ["Brazoria County — MUD districts common, verify jurisdiction", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation and commercial connections", "Gas pressure test: 10 PSI minimum"], inspector: "Alvin Building Inspections", phone: "(281) 388-4200", directLine: "(281) 388-4200", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "cityofalvin.com/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Angleton": { code: "IPC 2021", population: "19K", region: "Greater Houston (Brazoria County)", amendments: ["Brazoria County seat", "Verify MUD district rules if working in unincorporated areas", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Angleton Building Department", phone: "(979) 849-4364", directLine: "(979) 849-4364", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "angleton.tx.us/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas", "Burgess Construction Consultants"] },
  "Nederland": { code: "IPC 2021", population: "17K", region: "Southeast Texas (Jefferson County)", amendments: ["Jefferson County — industrial area near Port Arthur", "Petrochemical corridor — gas line requirements strictly enforced", "Thermal expansion tank required on all closed water systems", "Backflow prevention required on all connections"], inspector: "Nederland Building Inspections", phone: "(409) 723-1503", directLine: "(409) 723-1503", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "ci.nederland.tx.us/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "Lumberton": { code: "IPC 2021", population: "14K", region: "Southeast Texas (Hardin County)", amendments: ["Hardin County — growing suburban area", "Verify county vs city jurisdiction on permits", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Lumberton Building Department", phone: "(409) 755-0581", directLine: "(409) 755-0581", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "cityoflumberton.com/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "Pharr": { code: "IPC 2021", population: "78K", region: "Rio Grande Valley (Hidalgo County)", amendments: ["Hidalgo County — high growth Valley area", "High mineral content water — water softener loop recommended on new construction", "Backflow prevention required on all irrigation and commercial connections", "Thermal expansion tank required on all closed water systems"], inspector: "Pharr Building Inspections", phone: "(956) 402-4200", directLine: "(956) 402-4200", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "pharr-tx.com/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Mission": { code: "IPC 2021", population: "87K", region: "Rio Grande Valley (Hidalgo County)", amendments: ["Hidalgo County — fast-growing Valley city", "High mineral content water — additional water heater protection recommended", "Backflow prevention required on all irrigation connections", "Gas pressure test: 10 PSI minimum"], inspector: "Mission Building Department", phone: "(956) 580-8700", directLine: "(956) 580-8700", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "missiontexas.us/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Brownsville": { code: "IPC 2021", population: "182K", region: "Rio Grande Valley (Cameron County)", amendments: ["Southernmost major Texas city — Cameron County seat", "High humidity coastal environment — corrosion protection recommended", "Backflow prevention required on all irrigation and commercial connections", "High mineral content water — water softener loop recommended on new construction"], inspector: "Brownsville Building Safety", phone: "(956) 548-6030", directLine: "(956) 548-6030", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "brownsvilletx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Weslaco": { code: "IPC 2021", population: "42K", region: "Rio Grande Valley (Hidalgo County)", amendments: ["Hidalgo County — Valley area", "High mineral content water — water softener loop recommended", "Backflow prevention required on all irrigation connections", "Thermal expansion tank required on all closed water systems"], inspector: "Weslaco Building Department", phone: "(956) 968-3181", directLine: "(956) 968-3181", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "weslacotx.gov/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "San Juan": { code: "IPC 2021", population: "37K", region: "Rio Grande Valley (Hidalgo County)", amendments: ["Hidalgo County — Valley area growing suburb", "High mineral content water — additional protection recommended", "Backflow prevention required on all irrigation and commercial connections", "Thermal expansion tank required"], inspector: "San Juan Building Department", phone: "(956) 223-2200", directLine: "(956) 223-2200", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "cityofsanjuan.com/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },
  "Longview": { code: "IPC 2021", population: "82K", region: "East Texas", amendments: ["All inspection requests through automated line: (903) 239-5598", "Plan review required for all commercial and residential construction", "Gas pressure test required — document results for inspector", "Thermal expansion tank required on all closed water systems"], inspector: "Longview Building Inspection", phone: "(903) 239-5598", directLine: "(903) 239-5598", scheduleHours: "Automated request line 24/7", permitRequired: true, permitUrl: "longviewtexas.gov/building-inspection", thirdParty: ["Bureau Veritas", "ECS Limited", "Texas Third Party Inspections LLC"] },
  "Midlothian": { code: "IPC 2021", population: "38K", region: "North Texas (Ellis County)", amendments: ["Fast-growing Ellis County suburb", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Underground plastic sewer requires tracer wire"], inspector: "Midlothian Building Inspections", phone: "(972) 775-7120", directLine: "(972) 775-7120", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "midlothian.tx.us/permits", thirdParty: ["Crossroads Inspections", "Code Solutions Inc.", "Bureau Veritas"] },
  "Red Oak": { code: "IPC 2021", population: "16K", region: "North Texas (Ellis County)", amendments: ["Ellis County growing suburb south of Dallas", "NCTCOG regional amendments apply", "Thermal expansion tank required", "Gas pressure test: 10 PSI minimum hold"], inspector: "Red Oak Building Inspections", phone: "(972) 617-3638", directLine: "(972) 617-3638", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "redoaktexas.gov/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Ennis": { code: "IPC 2021", population: "20K", region: "North Texas (Ellis County)", amendments: ["Ellis County — Bluebonnet city", "Verify ETJ boundaries for addresses near city limits", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Ennis Building Inspections", phone: "(972) 878-1234", directLine: "(972) 878-1234", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "ennisgov.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },
  "Corsicana": { code: "IPC 2021", population: "23K", region: "North Texas (Navarro County)", amendments: ["Navarro County seat", "Verify county rules for addresses outside city limits", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Corsicana Building Department", phone: "(903) 654-4800", directLine: "(903) 654-4800", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "corsicanatx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Athens": { code: "IPC 2021", population: "13K", region: "East Texas (Henderson County)", amendments: ["Henderson County seat", "East Texas expansive soil — granular bedding under slab recommended", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Athens Building Department", phone: "(903) 675-2341", directLine: "(903) 675-2341", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "athenstexas.net/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Jacksonville": { code: "IPC 2021", population: "14K", region: "East Texas (Cherokee County)", amendments: ["Cherokee County seat", "Verify county rules if working outside city limits", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Jacksonville Building Department", phone: "(903) 586-1511", directLine: "(903) 586-1511", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "jacksonvilletexas.com/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Marshall": { code: "IPC 2021", population: "23K", region: "East Texas (Harrison County)", amendments: ["Harrison County seat", "East Texas industrial and commercial growth area", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum"], inspector: "Marshall Building Department", phone: "(903) 935-4406", directLine: "(903) 935-4406", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "marshalltexas.net/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Kerrville": { code: "IPC 2021", population: "25K", region: "Central Texas (Hill Country)", amendments: ["Kerr County seat — Hill Country resort and retirement area", "Expansive limestone soils — granular bedding under slab strongly recommended", "Water conservation amendments — low-flow fixtures required", "Thermal expansion tank required on all closed water systems"], inspector: "Kerrville Building Inspections", phone: "(830) 258-1010", directLine: "(830) 258-1010", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "kerrvilletx.gov/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
  "Fredericksburg": { code: "IPC 2021", population: "12K", region: "Central Texas (Hill Country)", amendments: ["Gillespie County seat — heavy wine country tourism growth", "Historic district overlay applies downtown", "Expansive limestone soils — granular bedding under slab required", "Water conservation amendments — low-flow fixtures required"], inspector: "Fredericksburg Building Department", phone: "(830) 997-7521", directLine: "(830) 997-7521", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "fbgtx.org/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },

  "Elgin": { code: "IPC 2021", population: "10K", region: "Central Texas (Bastrop County)", amendments: ["Fast-growing Bastrop County suburb east of Austin", "Verify MUD district if working outside city limits", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections"], inspector: "Elgin Building Department", phone: "(512) 285-5413", directLine: "(512) 285-5413", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "elgintx.com/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Taylor": { code: "IPC 2021", population: "17K", region: "Central Texas (Williamson County)", amendments: ["Williamson County — Samsung megafab industrial growth corridor", "High permit volume in 2024-2026 due to Samsung development nearby", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections"], inspector: "Taylor Building Department", phone: "(512) 352-3675", directLine: "(512) 352-3675", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "taylortx.gov/permits", thirdParty: ["Fox Energy Specialists", "Bureau Veritas"] },
  "Liberty Hill": { code: "IPC 2021", population: "15K", region: "Central Texas (Williamson County)", amendments: ["One of fastest growing small cities in Texas", "Williamson County — verify ETJ boundaries carefully", "Thermal expansion tank required on all water heater installs", "Backflow prevention required on all irrigation connections"], inspector: "Liberty Hill Building Inspections", phone: "(512) 778-5449", directLine: "(512) 778-5449", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "libertyhilltexas.gov/permits", thirdParty: ["Fox Energy Specialists", "Crossroads Inspections", "Bureau Veritas"] },

  "Rockwall": { code: "IPC 2021", population: "52K", region: "North Texas (Rockwall County)", amendments: ["Rockwall County seat — fastest growing county in Texas by percentage", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Underground plastic sewer requires tracer wire", "CSST bonding required per NFPA 54", "Inspections via online portal — no walk-ins"], inspector: "Rockwall Building Inspections", phone: "(972) 771-7700", directLine: "(972) 771-7700", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "rockwall.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },

  "Sachse": { code: "IPC 2021", population: "27K", region: "North Texas (DFW — Dallas/Collin County)", amendments: ["Sits on Dallas and Collin county line — verify which county for permits", "NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required", "Underground plastic sewer requires tracer wire"], inspector: "Sachse Building Inspections", phone: "(972) 466-9866", directLine: "(972) 466-9866", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "cityofsachse.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },

  "Rowlett": { code: "IPC 2021", population: "68K", region: "North Texas (DFW — Dallas/Rockwall County)", amendments: ["Straddles Dallas and Rockwall county line — verify jurisdiction by address", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "CSST bonding required per NFPA 54"], inspector: "Rowlett Building Inspections", phone: "(972) 412-6100", directLine: "(972) 412-6100", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "rowlett.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },

  "Prosper": { code: "IPC 2021", population: "38K", region: "North Texas (DFW — Collin/Denton County)", amendments: ["One of fastest growing towns in Collin County", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Underground plastic sewer requires tracer wire", "All permits online via Energov portal"], inspector: "Prosper Building Inspections", phone: "(972) 569-1010", directLine: "(972) 569-1010", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "prospertx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },

  "Little Elm": { code: "IPC 2021", population: "58K", region: "North Texas (DFW — Denton County)", amendments: ["Denton County lakefront community — high growth", "NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required", "Tracer wire required on underground plastic sewer"], inspector: "Little Elm Building Inspections", phone: "(214) 975-0400", directLine: "(214) 975-0400", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "littleelm.org/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },

  "Anna": { code: "IPC 2021", population: "24K", region: "North Texas (Collin County)", amendments: ["Fast-growing Collin County suburb north of McKinney", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Tracer wire required on underground plastic sewer"], inspector: "Anna Building Inspections", phone: "(972) 924-2616", directLine: "(972) 924-2616", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "annatexas.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },

  "Celina": { code: "IPC 2021", population: "35K", region: "North Texas (Collin County)", amendments: ["One of fastest growing cities in Texas — massive residential development", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "Tracer wire required on all underground plastic sewer piping", "Inspections via online portal — high volume, schedule ahead"], inspector: "Celina Building Inspections", phone: "(972) 382-2682", directLine: "(972) 382-2682", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "celinatx.gov/permits", thirdParty: ["Crossroads Inspections", "Master Code", "Bureau Veritas"] },

  "Aubrey": { code: "IPC 2021", population: "10K", region: "North Texas (Denton County)", amendments: ["Fast-growing Denton County suburb", "NCTCOG regional amendments apply", "Verify ETJ boundaries for addresses outside city limits", "Thermal expansion tank required"], inspector: "Aubrey Building Department", phone: "(940) 440-9343", directLine: "(940) 440-9343", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "aubreytx.gov/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },

  "Mansfield": { code: "IPC 2021", population: "78K", region: "North Texas (DFW — Tarrant/Johnson County)", amendments: ["Straddles Tarrant and Johnson county lines — verify county by address", "NCTCOG regional amendments apply", "Thermal expansion tank required on all closed water systems", "CSST bonding required per NFPA 54", "Underground plastic sewer requires tracer wire"], inspector: "Mansfield Building Inspections", phone: "(817) 276-4200", directLine: "(817) 276-4200", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "mansfieldtexas.gov/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas", "Master Code"] },

  "Burleson": { code: "IPC 2021", population: "52K", region: "North Texas (DFW — Tarrant/Johnson County)", amendments: ["Johnson and Tarrant county line — verify jurisdiction by address", "NCTCOG regional amendments apply", "Thermal expansion tank required", "CSST bonding required", "Gas pressure test: 10 PSI minimum hold"], inspector: "Burleson Building Inspections", phone: "(817) 426-9600", directLine: "(817) 426-9600", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "burlesontx.com/permits", thirdParty: ["Crossroads Inspections", "Bureau Veritas"] },

  "Alvin": { code: "IPC 2021", population: "29K", region: "Gulf Coast (Brazoria County)", amendments: ["Brazoria County — petrochemical corridor area", "Flood zone requirements — slab elevation and equipment elevation rules apply", "Backflow prevention required on all irrigation connections", "Thermal expansion tank required on all closed water systems"], inspector: "Alvin Building Inspections", phone: "(281) 388-4370", directLine: "(281) 388-4370", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "alvincc.com/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },

  "Angleton": { code: "IPC 2021", population: "20K", region: "Gulf Coast (Brazoria County)", amendments: ["Brazoria County seat", "Flood zone regulations apply — verify FEMA flood map before rough-in", "Backflow prevention required on all irrigation and commercial connections", "Thermal expansion tank required on all closed water systems"], inspector: "Angleton Building Inspections", phone: "(979) 849-4364", directLine: "(979) 849-4364", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "angleton.tx.us/permits", thirdParty: ["Bureau Veritas", "ECS Limited"] },

  "Nacogdoches": { code: "IPC 2021", population: "32K", region: "East Texas (Nacogdoches County)", amendments: ["Oldest town in Texas — Stephen F. Austin State University area", "East Texas expansive clay soils — granular bedding under slab recommended", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum hold"], inspector: "Nacogdoches Building Department", phone: "(936) 559-2573", directLine: "(936) 559-2573", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "ci.nacogdoches.tx.us/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },

  "Lufkin": { code: "IPC 2021", population: "35K", region: "East Texas (Angelina County)", amendments: ["Angelina County seat — East Texas timber and industrial area", "East Texas expansive clay soils — granular bedding under slab recommended", "Thermal expansion tank required on all closed water systems", "Gas pressure test: 10 PSI minimum", "Verify county rules for permits outside city limits"], inspector: "Lufkin Building Inspections", phone: "(936) 633-0217", directLine: "(936) 633-0217", scheduleHours: "Mon-Fri 8AM-5PM", permitRequired: true, permitUrl: "ci.lufkin.tx.us/permits", thirdParty: ["Bureau Veritas", "Texas Third Party Inspections LLC"] },
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

// ─── TEXAS REGIONAL SUPPLIERS ────────────────────────────────
const REGIONAL_SUPPLIERS = {
  "Austin": [
    { name: "Moore Supply Co. - Austin North", phone: "(512) 454-4616", address: "10519 Boyer Blvd, Austin TX 78758", url: "mooresupply.com", specialty: "Full-line plumbing, commercial & residential" },
    { name: "Moore Supply Co. - Austin South", phone: "(512) 462-0606", address: "201 Industrial Blvd, Austin TX 78745", url: "mooresupply.com", specialty: "Full-line plumbing, showroom & counter sales" },
    { name: "Dealers Supply - Austin", phone: "(512) 444-3521", address: "4600 S Congress Ave, Austin TX 78745", url: "dealerssupply.com", specialty: "Wholesale plumbing & HVAC" },
    { name: "Ferguson - Austin (North)", phone: "(512) 836-9555", address: "8700 Research Blvd, Austin TX 78758", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Ferguson - Austin (South)", phone: "(512) 444-8881", address: "4107 S Congress Ave, Austin TX 78704", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Hajoca - Austin", phone: "(512) 459-4551", address: "1015 S Lamar Blvd, Austin TX 78704", url: "hajoca.com", specialty: "Wholesale plumbing, hydronic heating" },
  ],
  "Houston": [
    { name: "Moore Supply Co. - Houston", phone: "(713) 869-4461", address: "2502 N. Shepherd Dr, Houston TX 77008", url: "mooresupply.com", specialty: "Full-line plumbing, commercial & residential" },
    { name: "Ferguson - Houston", phone: "(713) 869-5555", address: "2100 N. Shepherd Dr, Houston TX 77008", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Dealers Supply - Houston", phone: "(713) 672-3486", address: "7100 Navigation Blvd, Houston TX 77011", url: "dealerssupply.com", specialty: "Wholesale plumbing & HVAC" },
    { name: "Hajoca - Houston", phone: "(713) 681-6566", address: "4600 N Shepherd Dr, Houston TX 77018", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "Dallas": [
    { name: "Ferguson - Dallas", phone: "(214) 638-5500", address: "3030 Irving Blvd, Dallas TX 75247", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Dallas", phone: "(214) 631-3500", address: "2929 Canton St, Dallas TX 75226", url: "mooresupply.com", specialty: "Full-line plumbing, commercial & residential" },
    { name: "Hajoca - Dallas", phone: "(214) 637-7200", address: "2727 Stemmons Fwy, Dallas TX 75207", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "San Antonio": [
    { name: "Moore Supply Co. - San Antonio", phone: "(210) 227-9631", address: "1402 S. Alamo St, San Antonio TX 78210", url: "mooresupply.com", specialty: "Full-line plumbing, commercial & residential" },
    { name: "Ferguson - San Antonio", phone: "(210) 349-3381", address: "5702 Bandera Rd, San Antonio TX 78238", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Hajoca - San Antonio", phone: "(210) 224-6163", address: "1503 S Alamo St, San Antonio TX 78210", url: "hajoca.com", specialty: "Wholesale plumbing" },
    { name: "Dealers Supply - San Antonio", phone: "(210) 432-7621", address: "2727 Pleasanton Rd, San Antonio TX 78221", url: "dealerssupply.com", specialty: "Wholesale plumbing & HVAC" },
  ],
  "Fort Worth": [
    { name: "Moore Supply Co. - Fort Worth", phone: "(817) 335-5481", address: "1500 E Rosedale St, Fort Worth TX 76104", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Ferguson - Fort Worth", phone: "(817) 332-5533", address: "4200 Camp Bowie Blvd, Fort Worth TX 76107", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Hajoca - Fort Worth", phone: "(817) 332-5200", address: "3201 S Freeway, Fort Worth TX 76104", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "Lubbock": [
    { name: "Moore Supply Co. - Lubbock", phone: "(806) 762-0301", address: "1402 Avenue K, Lubbock TX 79401", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Ferguson - Lubbock", phone: "(806) 744-5551", address: "5034 50th St, Lubbock TX 79414", url: "ferguson.com", specialty: "Full-line plumbing" },
  ],
  "El Paso": [
    { name: "Ferguson - El Paso", phone: "(915) 779-0822", address: "7500 Gateway Blvd E, El Paso TX 79915", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - El Paso", phone: "(915) 779-5551", address: "7530 Gateway Blvd E, El Paso TX 79915", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Corpus Christi": [
    { name: "Moore Supply Co. - Corpus Christi", phone: "(361) 883-2671", address: "2401 S Port Ave, Corpus Christi TX 78405", url: "mooresupply.com", specialty: "Full-line plumbing, coastal-rated materials" },
    { name: "Ferguson - Corpus Christi", phone: "(361) 884-0336", address: "4033 S Port Ave, Corpus Christi TX 78415", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
  ],
  "McAllen": [
    { name: "Moore Supply Co. - McAllen", phone: "(956) 682-5551", address: "1001 N Main St, McAllen TX 78501", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Ferguson - McAllen", phone: "(956) 631-5551", address: "4401 N 10th St, McAllen TX 78504", url: "ferguson.com", specialty: "Full-line plumbing" },
  ],
  "Marble Falls": [
    { name: "Moore Supply Co. - Marble Falls", phone: "(830) 693-1023", address: "2515 Commerce St, Marble Falls TX 78654", url: "mooresupply.com", specialty: "Full-line plumbing, showroom & counter sales" },
    { name: "Ferguson - Austin (North)", phone: "(512) 836-9555", address: "8700 Research Blvd, Austin TX 78758", url: "ferguson.com", specialty: "Full-line plumbing, waterworks (nearest Ferguson)" },
  ],
  "Waco": [
    { name: "Ferguson - Waco", phone: "(254) 753-0302", address: "1501 N 19th St, Waco TX 76707", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Waco", phone: "(254) 754-5551", address: "1900 Franklin Ave, Waco TX 76701", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Hajoca - Waco", phone: "(254) 753-5551", address: "1800 N 19th St, Waco TX 76707", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "Killeen": [
    { name: "Ferguson - Killeen", phone: "(254) 690-0990", address: "2602 E Stan Schlueter Loop, Killeen TX 76542", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Temple", phone: "(254) 778-5551", address: "2500 S 31st St, Temple TX 76504", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Tyler": [
    { name: "Ferguson - Tyler", phone: "(903) 592-9576", address: "3201 W SW Loop 323, Tyler TX 75701", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Tyler", phone: "(903) 592-5551", address: "1601 W Front St, Tyler TX 75702", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Hajoca - Tyler", phone: "(903) 592-5200", address: "3300 SSE Loop 323, Tyler TX 75701", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "Abilene": [
    { name: "Ferguson - Abilene", phone: "(325) 672-5571", address: "1349 N Treadaway Blvd, Abilene TX 79601", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Abilene", phone: "(325) 672-5551", address: "1200 N 1st St, Abilene TX 79601", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Amarillo": [
    { name: "Ferguson - Amarillo", phone: "(806) 372-5521", address: "2700 W 10th Ave, Amarillo TX 79106", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Amarillo", phone: "(806) 374-5551", address: "1800 S Georgia St, Amarillo TX 79102", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Beaumont": [
    { name: "Ferguson - Beaumont", phone: "(409) 833-4571", address: "3960 N Major Dr, Beaumont TX 77713", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Beaumont", phone: "(409) 832-5551", address: "2950 N Major Dr, Beaumont TX 77713", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Hajoca - Beaumont", phone: "(409) 833-5200", address: "3800 N Major Dr, Beaumont TX 77713", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "Laredo": [
    { name: "Ferguson - Laredo", phone: "(956) 726-5551", address: "4710 San Dario Ave, Laredo TX 78041", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Laredo", phone: "(956) 724-5551", address: "4500 San Bernardo Ave, Laredo TX 78041", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Midland": [
    { name: "Ferguson - Midland", phone: "(432) 682-5571", address: "3501 W Illinois Ave, Midland TX 79703", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Midland", phone: "(432) 684-5551", address: "2800 W Texas Ave, Midland TX 79701", url: "mooresupply.com", specialty: "Full-line plumbing" },
    { name: "Hajoca - Midland", phone: "(432) 682-5200", address: "3400 W Illinois Ave, Midland TX 79703", url: "hajoca.com", specialty: "Wholesale plumbing" },
  ],
  "Wichita Falls": [
    { name: "Ferguson - Wichita Falls", phone: "(940) 766-5551", address: "2400 Maurine St, Wichita Falls TX 76304", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Wichita Falls", phone: "(940) 723-5551", address: "1800 10th St, Wichita Falls TX 76301", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "San Angelo": [
    { name: "Ferguson - San Angelo", phone: "(325) 655-5551", address: "4201 Knickerbocker Rd, San Angelo TX 76904", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - San Angelo", phone: "(325) 653-5551", address: "2500 W Beauregard Ave, San Angelo TX 76901", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Victoria": [
    { name: "Ferguson - Victoria", phone: "(361) 575-5551", address: "5302 N Navarro St, Victoria TX 77904", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Victoria", phone: "(361) 572-5551", address: "3800 N Laurent St, Victoria TX 77901", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "Longview": [
    { name: "Ferguson - Longview", phone: "(903) 758-5551", address: "3001 Judson Rd, Longview TX 75605", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Longview", phone: "(903) 753-5551", address: "2200 W Marshall Ave, Longview TX 75604", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
  "College Station": [
    { name: "Ferguson - Bryan/College Station", phone: "(979) 822-5551", address: "3401 E 29th St, Bryan TX 77802", url: "ferguson.com", specialty: "Full-line plumbing, waterworks" },
    { name: "Moore Supply Co. - Bryan", phone: "(979) 823-5551", address: "2800 S College Ave, Bryan TX 77801", url: "mooresupply.com", specialty: "Full-line plumbing" },
  ],
};

// Get suppliers for a city — falls back to nearest major metro
const getSuppliersForCity = (cityName) => {
  if (REGIONAL_SUPPLIERS[cityName]) return REGIONAL_SUPPLIERS[cityName];
  const metroMap = {
    // Austin metro (512/737)
    "Georgetown": "Austin", "Round Rock": "Austin", "Cedar Park": "Austin",
    "Leander": "Austin", "Pflugerville": "Austin", "Hutto": "Austin",
    "Kyle": "Austin", "Buda": "Austin", "San Marcos": "Austin",
    "Taylor": "Austin", "Elgin": "Austin", "Bastrop": "Austin",
    "Liberty Hill": "Austin", "Manor": "Austin", "Lockhart": "Austin",
    "Marble Falls": "Austin", "Burnet": "Austin",
    // Hill Country (closest to Austin or San Antonio)
    "Fredericksburg": "San Antonio", "Kerrville": "San Antonio",
    "Boerne": "San Antonio", "Llano": "Austin",
    // San Antonio metro (210)
    "New Braunfels": "San Antonio", "Schertz": "San Antonio",
    "Converse": "San Antonio", "Cibolo": "San Antonio", "Seguin": "San Antonio",
    "Laredo": "Laredo",
    // Houston metro (713/281/346)
    "Pearland": "Houston", "Sugar Land": "Houston", "League City": "Houston",
    "Missouri City": "Houston", "Baytown": "Houston", "Pasadena": "Houston",
    "Katy": "Houston", "Conroe": "Houston", "Humble": "Houston",
    "Friendswood": "Houston", "Deer Park": "Houston", "Dickinson": "Houston",
    "Stafford": "Houston", "Alvin": "Houston", "Angleton": "Houston",
    "Texas City": "Houston", "Galveston": "Houston",
    // Beaumont/Southeast Texas (409)
    "Port Arthur": "Beaumont", "Nederland": "Beaumont", "Lumberton": "Beaumont",
    // DFW — Dallas side (214/972/469)
    "Plano": "Dallas", "Frisco": "Dallas", "McKinney": "Dallas", "Allen": "Dallas",
    "Garland": "Dallas", "Irving": "Dallas", "Carrollton": "Dallas",
    "Richardson": "Dallas", "Mesquite": "Dallas", "Grand Prairie": "Dallas",
    "Flower Mound": "Dallas", "Lewisville": "Dallas", "Denton": "Dallas",
    "The Colony": "Dallas", "Little Elm": "Dallas", "Prosper": "Dallas",
    "Celina": "Dallas", "Anna": "Dallas", "Wylie": "Dallas",
    "Rowlett": "Dallas", "Sachse": "Dallas", "Rockwall": "Dallas",
    "Red Oak": "Dallas", "Ennis": "Dallas", "Waxahachie": "Dallas",
    "DeSoto": "Dallas", "Lancaster": "Dallas", "Cedar Hill": "Dallas",
    "Duncanville": "Dallas", "Midlothian": "Dallas", "Corsicana": "Dallas",
    "Forney": "Dallas",
    // DFW — Fort Worth side (817)
    "Arlington": "Fort Worth", "Mansfield": "Fort Worth", "Burleson": "Fort Worth",
    "Southlake": "Fort Worth", "Keller": "Fort Worth", "Grapevine": "Fort Worth",
    "Euless": "Fort Worth", "Hurst": "Fort Worth", "Bedford": "Fort Worth",
    "North Richland Hills": "Fort Worth", "Coppell": "Fort Worth",
    "Weatherford": "Fort Worth", "Granbury": "Fort Worth",
    "Cleburne": "Fort Worth", "Joshua": "Fort Worth",
    "Stephenville": "Fort Worth",
    // Waco/Central Texas (254)
    "Waco": "Waco", "Temple": "Killeen", "Belton": "Killeen",
    "Harker Heights": "Killeen", "Copperas Cove": "Killeen",
    // East Texas (903)
    "Tyler": "Tyler", "Longview": "Longview",
    "Lufkin": "Tyler", "Nacogdoches": "Tyler", "Jacksonville": "Tyler",
    "Marshall": "Longview", "Texarkana": "Longview",
    "Athens": "Tyler", "Mount Pleasant": "Longview",
    "Sulphur Springs": "Longview",
    // West Texas (432)
    "Midland": "Midland", "Odessa": "Midland",
    // Panhandle (806)
    "Amarillo": "Amarillo", "Lubbock": "Lubbock",
    // Northwest Texas (940)
    "Wichita Falls": "Wichita Falls", "Sherman": "Dallas",
    "Aubrey": "Dallas",
    // Rio Grande Valley (956)
    "Edinburg": "McAllen", "Mission": "McAllen", "Pharr": "McAllen",
    "Harlingen": "McAllen", "Brownsville": "McAllen",
    "San Juan": "McAllen", "Weslaco": "McAllen",
    // Coastal Bend (361)
    "Corpus Christi": "Corpus Christi", "Victoria": "Victoria",
    // Central Texas other
    "San Angelo": "San Angelo",
    "College Station": "College Station",
    "Huntsville": "Houston",
  };
  const metro = metroMap[cityName];
  if (metro && REGIONAL_SUPPLIERS[metro]) return REGIONAL_SUPPLIERS[metro];
  return null; // no suppliers shown rather than wrong city
};

// Smart buy store ordering based on part type
const getBuyStores = (part) => {
  const partType = (part.partType || "").toLowerCase();
  const name = (part.name || "").toLowerCase();
  const isIndustrial = partType === "industrial" || name.includes("industrial") || name.includes("commercial") || name.includes("grooved") || name.includes("victaulic") || name.includes("cast iron") || name.includes("ductile");
  const isGas = partType === "gas" || part.category === "Gas" || name.includes("gas") || name.includes("csst") || name.includes("regulator") || name.includes("sediment trap");
  const isSpecialty = partType === "specialty" || name.includes("backflow") || name.includes("rpz") || name.includes("pvb") || name.includes("pressure vacuum");
  const isCommon = partType === "residential_common" || name.includes("hose bib") || name.includes("p-trap") || name.includes("shut off") || name.includes("supply line") || name.includes("toilet") || name.includes("faucet");

  if (isIndustrial) return ["Ferguson", "Grainger", "Amazon"];
  if (isGas) return ["Ferguson", "Home Depot", "Amazon"];
  if (isSpecialty) return ["Ferguson", "Amazon", "Home Depot"];
  if (isCommon) return ["Home Depot", "Amazon", "Ferguson"];
  return ["Home Depot", "Ferguson", "Amazon"];
};

// ─── CE PROVIDERS ────────────────────────────────────────────
const CE_PROVIDERS = [
  { name: "APHCC of Texas (Statewide)", phone: "(800) 992-7422", url: "phcc-tx.org", region: "Statewide", type: "Live & Online", note: "Largest plumbing trade association in Texas — classes statewide year-round" },
  { name: "APHCC San Antonio Chapter", phone: "(210) 824-7422", url: "phcc-sanantonio.org", region: "San Antonio", type: "Live", note: "San Antonio area classes" },
  { name: "Johnny Kurten Plumbing Education", phone: "(877) 497-5311", url: "txplumberprep.com", region: "Taylor, TX (Central Texas)", type: "Live", note: "Taylor TX — popular Central Texas provider, exam prep and CPE" },
  { name: "Pioneer Educational Services", phone: "(866) 786-4961", url: "pioneereducationalservices.com", region: "Statewide", type: "Live & Correspondence", note: "Live classes and mail-in correspondence option — open book test format" },
  { name: "Winn's Continuing Education", phone: "", url: "winnsce.com", region: "Statewide", type: "Online & Correspondence", note: "Most popular online/correspondence option — ICC approved, completion reported electronically to TSBPE within 2 days" },
  { name: "Texas Plumber Training", phone: "(903) 491-5867", url: "texasplumbertraining.com", region: "East Texas / Statewide", type: "Live", note: "East Texas based — also covers Sulphur Springs, Paris, and surrounding areas" },
  { name: "Jerome Mendias Sr. Construction & Plumbing Education", phone: "(254) 732-0095", url: "myconstructioneducation.org", region: "Central Texas (Waco area)", type: "Live", note: "Central Texas provider serving Waco and surrounding areas" },
  { name: "Conger Construction Services", phone: "(888) 455-1755", url: "conger-construction-services.com", region: "Statewide", type: "Live", note: "TSBPE approved — multiple formats available" },
  { name: "Guy Pemberton", phone: "(866) 481-8080", url: "funplumbingtraining.net", region: "Statewide", type: "Online", note: "Online format — flexible scheduling" },
  { name: "PCETX (Bobby Doran)", phone: "(800) 445-1768", url: "pcetx.com", region: "Statewide", type: "Live & Online", note: "TSBPE approved provider" },
  { name: "Texas Pipe Trades", phone: "(800) 891-8900", url: "", region: "Statewide", type: "Live", note: "Union affiliated — serves UA Local union members across Texas" },
  { name: "IAPMO", phone: "(877) 427-6601", url: "iapmo.org", region: "Statewide", type: "Online", note: "UPC code developers — good for UPC cities like Houston and Austin" },
];

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
    license: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h.01"/><path d="M11 8h6"/><path d="M7 12h.01"/><path d="M11 12h6"/></svg>,
    pipewrench: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M 4 20 L 14 10"/><path d="M 14 10 C 14 10 13 7 15 5 C 17 3 20 3.5 20 3.5 L 18 5.5 L 18.5 7 L 20 7.5 L 22 5.5 C 22 5.5 22 8.5 20 10 C 18 11.5 15 10.5 14 10 Z"/><path d="M 4 20 C 3 21 2 21 2 20 C 2 19 3 18 4 18 L 6 20 Z"/></svg>,
  };
  return icons[name] || null;
};

// ─── MAIN APP ────────────────────────────────────────────────
function AppInner() {
  // ── AUTH STATE ───────────────────────────────────────────
  const [authed, setAuthed] = useState(false);
  const [authScreen, setAuthScreen] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authInvite, setAuthInvite] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  // ── SUBSCRIPTION & USAGE ─────────────────────────────────
  const [tier, setTier] = useState("free"); // "free" | "basic" | "pro"
  const [tierLoaded, setTierLoaded] = useState(true); // default true — set false only during active check
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradeFeature, setUpgradeFeature] = useState("");
  const [showLanding, setShowLanding] = useState(true);

  // Usage counters stored in localStorage
  const getUsage = () => {
    try { return JSON.parse(localStorage.getItem("codex_usage") || "{}"); } catch(e) { return {}; }
  };
  const bumpUsage = (feature) => {
    try {
      const u = getUsage();
      u[feature] = (u[feature] || 0) + 1;
      localStorage.setItem("codex_usage", JSON.stringify(u));
      return u[feature];
    } catch(e) { return 1; }
  };
  const resetUsage = () => { try { localStorage.removeItem("codex_usage"); } catch(e) {} };

  // Free tier limits
  const FREE_LIMITS = { codes: 5, cities: 5, voice: 5, license: 5, inspectors: 5, identify: 5, jobmode: 1, estimate: 1 };

  // Check if action is allowed for current tier — never throws
  const canUse = (feature) => {
    try {
      if (tier === "pro") return true;
      if (tier === "basic") {
        if (["inspectors","identify","jobmode","estimate"].includes(feature)) return false;
        return true;
      }
      const count = getUsage()[feature] || 0;
      return count < (FREE_LIMITS[feature] || 5);
    } catch(e) { return true; }
  };

  const useFeature = (feature) => {
    try {
      if (tier === "pro") return true;
      if (tier === "basic") {
        if (["inspectors","identify","jobmode","estimate"].includes(feature)) {
          setUpgradeFeature(feature); setShowUpgrade(true); return false;
        }
        return true;
      }
      // Free tier — bump AFTER checking so first use always works
      const currentCount = getUsage()[feature] || 0;
      if (currentCount >= (FREE_LIMITS[feature] || 5)) {
        setUpgradeFeature(feature); setShowUpgrade(true); return false;
      }
      bumpUsage(feature);
      return true;
    } catch(e) { return true; } // on any error let them through rather than crash
  };

  const checkSubscription = async (email) => {
    setTierLoaded(false);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setTier(data.tier || "free");
    } catch(e) { setTier("free"); }
    finally { setTierLoaded(true); }
  };

  const startCheckout = async (priceId) => {
    if (!authUser?.email) return;
    try {
      const res = await fetch("/api/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, email: authUser.email })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch(e) { alert("Could not start checkout — please try again"); }
  };

  const doAuth = async (action) => {
    setAuthError(""); setAuthLoading(true);
    try {
      const body = action === "signup"
        ? { action, email: authEmail.trim(), password: authPassword, inviteCode: authInvite.trim().toUpperCase() }
        : { action, email: authEmail.trim(), password: authPassword };
      const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!data.success) { setAuthError(data.error || "Something went wrong"); }
      else {
        setAuthUser(data.user);
        setAuthed(true);
        setShowLanding(false);
        await checkSubscription(data.user.email);
      }
    } catch(e) { setAuthError("Network error — check your connection"); }
    setAuthLoading(false);
  };

  const doGoogleAuth = () => {
    const SUPABASE_URL = "https://mgvrvvhbhhgwihkrrlge.supabase.co";
    const redirectTo = encodeURIComponent(window.location.origin);
    window.location.href = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;
  };

  // Handle Google OAuth redirect and Stripe return
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const token = params.get("access_token");
      if (token) {
        // Try to decode email from JWT payload
        let email = "Google User";
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          email = payload.email || payload.user_metadata?.email || "Google User";
        } catch(e) {}
        setAuthUser({ email });
        setAuthed(true);
        setShowLanding(false);
        checkSubscription(email);
        window.history.replaceState(null, "", window.location.pathname);
      }
    }
    // Handle Stripe successful checkout return
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("upgraded") === "true") {
      window.history.replaceState(null, "", window.location.pathname);
      setShowUpgrade(false);
      setTimeout(() => {
        if (authUser?.email) checkSubscription(authUser.email);
      }, 2000);
    }
  }, []);

  const authScreen_JSX = (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0e1215 60%,#1a1408 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 64, height: 64, background: "linear-gradient(135deg,#d4820a,#8a5006)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 0 32px rgba(212,130,10,.3)" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M 4 20 L 14 10"/><path d="M 14 10 C 14 10 13 7 15 5 C 17 3 20 3.5 20 3.5 L 18 5.5 L 18.5 7 L 20 7.5 L 22 5.5 C 22 5.5 22 8.5 20 10 C 18 11.5 15 10.5 14 10 Z"/><path d="M 4 20 C 3 21 2 21 2 20 C 2 19 3 18 4 18 L 6 20 Z"/></svg>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 36, letterSpacing: ".1em", color: "#e8f0f8" }}>CODEX TX</div>
          <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: "#d4820a", marginTop: 4 }}>Texas Plumbing Code Reference</div>
        </div>
        <div style={{ display: "flex", background: "#161c22", borderRadius: 10, padding: 4, marginBottom: 24, border: "1px solid #2a3540" }}>
          {["login","signup"].map(tab => (
            <button key={tab} onClick={() => { setAuthScreen(tab); setAuthError(""); }} style={{ flex: 1, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer", background: authScreen === tab ? "linear-gradient(135deg,#2a1e0a,#1a1208)" : "transparent", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: ".06em", color: authScreen === tab ? "#d4820a" : "#3a5a6a", transition: "all .2s" }}>
              {tab === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {authScreen === "signup" && (
            <div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#d4820a", letterSpacing: ".08em", marginBottom: 6 }}>INVITE CODE</div>
              <input autoComplete="off" value={authInvite} onChange={e => setAuthInvite(e.target.value)} placeholder="CODEX-001" style={{ width: "100%", background: "#161c22", border: "1px solid #2a3540", borderRadius: 10, padding: "12px 14px", color: "#e8f0f8", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 16, letterSpacing: ".06em", boxSizing: "border-box", outline: "none" }} />
            </div>
          )}
          <div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#d4820a", letterSpacing: ".08em", marginBottom: 6 }}>EMAIL</div>
            <input type="email" autoComplete="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", background: "#161c22", border: "1px solid #2a3540", borderRadius: 10, padding: "12px 14px", color: "#e8f0f8", fontFamily: "'Lora',serif", fontSize: 15, boxSizing: "border-box", outline: "none" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#d4820a", letterSpacing: ".08em", marginBottom: 6 }}>PASSWORD</div>
            <input type="password" autoComplete="current-password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="Min 6 characters" onKeyDown={e => e.key === "Enter" && doAuth(authScreen)} style={{ width: "100%", background: "#161c22", border: "1px solid #2a3540", borderRadius: 10, padding: "12px 14px", color: "#e8f0f8", fontFamily: "'Lora',serif", fontSize: 15, boxSizing: "border-box", outline: "none" }} />
          </div>
          {authError && <div style={{ background: "#2a1a1a", border: "1px solid #8a2a2a", borderRadius: 10, padding: "10px 14px", fontFamily: "'Lora',serif", fontSize: 13, color: "#f08060" }}>{authError}</div>}
          <button onClick={() => doAuth(authScreen)} disabled={authLoading} style={{ background: authLoading ? "#1a1a1a" : "linear-gradient(135deg,#d4820a,#8a5006)", border: "none", borderRadius: 12, padding: "16px", cursor: authLoading ? "not-allowed" : "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: ".08em", color: authLoading ? "#3a3a3a" : "#fff", marginTop: 4, boxShadow: authLoading ? "none" : "0 4px 20px rgba(212,130,10,.3)" }}>
            {authLoading ? "PLEASE WAIT..." : authScreen === "login" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#2a3540" }} />
            <span style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#2a3540" }} />
          </div>

          {/* Google Sign In */}
          <button onClick={() => doGoogleAuth()} style={{ background: "#fff", border: "none", borderRadius: 12, padding: "14px 16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,.3)" }}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></svg>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: ".06em", color: "#333" }}>CONTINUE WITH GOOGLE</span>
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 24, fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a" }}>
          {authScreen === "login" ? "Need access? Contact your administrator for an invite code." : "Already have an account? Switch to Sign In above."}
        </div>
      </div>
    </div>
  );

  // ── MAIN APP STATE ───────────────────────────────────────
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
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const recognitionRef = useRef(null);
  const cntRef = useRef(null);
  const synthRef = useRef(null);
  const audioRef = useRef(null);
  const cameraLaunchRef = useRef(null);
  const currentSpeechRef = useRef(null); // tracks { enText, esText } of what's currently speaking
  const scrollTop = () => { try { if (cntRef.current) cntRef.current.scrollTop = 0; } catch(e) {} };
  const unlockAudio = () => { if (!audioRef.current) { audioRef.current = new Audio(); } };
  const stopSpeaking = () => {
    currentSpeechRef.current = null;
    if (audioRef.current) { try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch(e) {} }
    try { window.speechSynthesis.cancel(); } catch(e) {}
    setIsSpeaking(false);
  };
  const speak = async (text, enText, esText) => {
    if (!voiceEnabled || !text) return;
    stopSpeaking();
    // Track what we're speaking so language switch can restart it
    if (enText && esText) currentSpeechRef.current = { enText, esText };
    setIsSpeaking(true);
    let googleSucceeded = false;
    // Shorter fallback — 2 seconds feels acceptable, 3 was too long
    const fallbackTimer = setTimeout(() => {
      if (!googleSucceeded) {
        try {
          const utt = new SpeechSynthesisUtterance(text.substring(0, 400));
          utt.lang = lang === "es" ? "es-MX" : "en-US";
          utt.rate = 0.92;
          utt.onend = () => setIsSpeaking(false);
          utt.onerror = () => setIsSpeaking(false);
          window.speechSynthesis.speak(utt);
        } catch(e) { setIsSpeaking(false); }
      }
    }, 2000);
    try {
      const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, lang }) });
      const data = await res.json();
      if (data.audioContent) {
        googleSucceeded = true;
        clearTimeout(fallbackTimer);
        try { window.speechSynthesis.cancel(); } catch(e) {}
        const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
        audioRef.current = audio;
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => { setIsSpeaking(false); };
        // iOS requires play() to be called synchronously after a user gesture
        // Use a try/catch and retry once if it fails
        try {
          await audio.play();
        } catch(playErr) {
          try { await audio.play(); } catch(e2) { setIsSpeaking(false); }
        }
      } else {
        clearTimeout(fallbackTimer);
        googleSucceeded = true;
        try {
          const utt = new SpeechSynthesisUtterance(text.substring(0, 400));
          utt.lang = lang === "es" ? "es-MX" : "en-US";
          utt.rate = 0.92;
          utt.onend = () => setIsSpeaking(false);
          window.speechSynthesis.speak(utt);
        } catch(e) { setIsSpeaking(false); }
      }
    } catch(e) {
      clearTimeout(fallbackTimer);
      if (!googleSucceeded) {
        try {
          const utt = new SpeechSynthesisUtterance(text.substring(0, 400));
          utt.lang = lang === "es" ? "es-MX" : "en-US";
          utt.onend = () => setIsSpeaking(false);
          window.speechSynthesis.speak(utt);
        } catch(e2) { setIsSpeaking(false); }
      }
    }
  };

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
      setVoiceStatus(`${lang === "en" ? "Heard" : "Escuche"}: "${heard}"`); setIsListening(false);

      // 1 — Direct city name match
      const cityNames = Object.keys(JURISDICTIONS).map(c => c.toLowerCase());
      const matchCity = cityNames.find(c => heard.includes(c));
      if (matchCity) {
        const city = Object.keys(JURISDICTIONS).find(c => c.toLowerCase() === matchCity);
        setScreen("jurisdiction"); setSelectedJurisdiction(city);
        setTimeout(() => setVoiceStatus(""), 3000); return;
      }

      // 2 — Explicit city/permit/jurisdiction intent
      if (heard.includes("city") || heard.includes("ciudad") || heard.includes("permit") || heard.includes("permiso") || heard.includes("jurisdiction")) {
        setScreen("jurisdiction"); setJSearchQuery(heard.replace(/city|ciudad|jurisdiction|search|find|buscar|permiso|permit/gi, "").trim()); setSelectedJurisdiction(null);
        setTimeout(() => setVoiceStatus(""), 3000); return;
      }

      // 3 — Inspector intent
      if (heard.includes("inspector") || heard.includes("inspection") || heard.includes("inspecci")) {
        setScreen("inspectors"); setSelectedThirdParty(null);
        setTimeout(() => setVoiceStatus(""), 3000); return;
      }

      // 4 — Strip only true filler words (NOT plumbing verbs like install/replace/connect)
      const stripped = heard.replace(/\b(a|an|the|to|from|what|is|are|show|me|can|you|tell|explain|where|when|why|should|would|could|does|my|for|in|on|at|with|of|and|or|this|that|these|those|please|need|want|help|about|do|i|how)\b/gi, " ").replace(/\s+/g, " ").trim();

      // 5 — Check local codes — only use if there's a strong specific match
      const localMatches = CODES.filter(c => {
        const q = stripped.toLowerCase();
        if (q.length < 4) return false;
        const titleMatch = (lang === "en" ? c.title : c.titleEs).toLowerCase().includes(q);
        const tagMatch = (c.tags || []).some(tag => stripped.split(" ").some(word => word.length > 4 && tag.toLowerCase() === word));
        return titleMatch || tagMatch;
      });

      if (localMatches.length === 1) {
        // Single exact match — jump straight to that code detail and speak it
        setScreen("codes"); openCode(localMatches[0]);
        const speechText = lang === "en"
          ? `${localMatches[0].title}. ${localMatches[0].plain.substring(0, 400)}`
          : `${localMatches[0].titleEs}. ${localMatches[0].plainEs.substring(0, 400)}`;
        setTimeout(() => speak(speechText), 500);
        setTimeout(() => setVoiceStatus(""), 3000); return;
      }

      if (localMatches.length > 1) {
        // Multiple matches — show the list filtered
        setScreen("codes"); setSearchQuery(stripped); setSelectedCode(null);
        setTimeout(() => setVoiceStatus(""), 3000); return;
      }

      // 6 — No local match — open YouTube directly (no timeout — must be synchronous to avoid popup blocker)
      const ytQuery = lang === "en" ? `plumbing ${heard}` : `plomeria ${heard}`;
      setVoiceStatus(lang === "en" ? `Searching YouTube for: "${heard}"` : `Buscando en YouTube: "${heard}"`);
      window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(ytQuery)}`;
    };
    r.onerror = () => { setIsListening(false); setVoiceStatus(lang === "en" ? "Could not hear — try again" : "No se escucho — intenta de nuevo"); setTimeout(() => setVoiceStatus(""), 3000); };
    r.onend = () => setIsListening(false);
    r.start();
  };
  const stopVoice = () => { if (recognitionRef.current) recognitionRef.current.stop(); setIsListening(false); setVoiceStatus(""); };

  const categories = ["All", ...new Set(CODES.map(c => c.category))];
  const filteredCodes = CODES.filter(c => {
    try {
      const q = searchQuery.toLowerCase();
      const title = lang === "en" ? (c.title || "") : (c.titleEs || "");
      const plain = lang === "en" ? (c.plain || "") : (c.plainEs || "");
      const matchCat = selectedCategory === "All" || c.category === selectedCategory;
      return matchCat && (!q || title.toLowerCase().includes(q) || (c.tags || []).some(tg => tg.toLowerCase().includes(q)) || (c.code || "").toLowerCase().includes(q) || plain.toLowerCase().includes(q));
    } catch(e) { return false; }
  });
  const sortedJ = Object.entries(JURISDICTIONS).sort(([a], [b]) => a.localeCompare(b));
  const filteredJ = sortedJ.filter(([city]) => !jSearchQuery || city.toLowerCase().includes(jSearchQuery.toLowerCase()));
  const toggleBookmark = (id) => setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  const goBack = () => { if (showDiagram) { setShowDiagram(false); return; } if (selectedCode) { setSelectedCode(null); return; } if (selectedJurisdiction) { setSelectedJurisdiction(null); return; } if (selectedThirdParty) { setSelectedThirdParty(null); return; } };
  const showBack = selectedCode || selectedJurisdiction || selectedThirdParty || showDiagram;
  const navTo = (s) => { setScreen(s); setSelectedCode(null); setSelectedJurisdiction(null); setSelectedThirdParty(null); setSearchQuery(""); setJSearchQuery(""); setSelectedCategory("All"); setShowDiagram(false); };

  // Safe gated handlers — separates gate check from state update to prevent React crash
  const openCode = (code) => {
    try {
      if (!tierLoaded) { setScreen("codes"); setSelectedCode(code); setShowDiagram(false); scrollTop(); return; }
      if (tier === "pro" || tier === "basic") { setScreen("codes"); setSelectedCode(code); setShowDiagram(false); scrollTop(); return; }
      const count = getUsage()["codes"] || 0;
      if (count >= (FREE_LIMITS["codes"] || 5)) { setTimeout(() => { setUpgradeFeature("codes"); setShowUpgrade(true); }, 0); return; }
      bumpUsage("codes");
      setScreen("codes"); setSelectedCode(code); setShowDiagram(false); scrollTop();
    } catch(e) { setScreen("codes"); setSelectedCode(code); setShowDiagram(false); }
  };
  const openCity = (city) => {
    try {
      if (!tierLoaded) { setSelectedJurisdiction(city); scrollTop(); return; }
      if (tier === "pro" || tier === "basic") { setSelectedJurisdiction(city); scrollTop(); return; }
      const count = getUsage()["cities"] || 0;
      if (count >= (FREE_LIMITS["cities"] || 5)) { setTimeout(() => { setUpgradeFeature("cities"); setShowUpgrade(true); }, 0); return; }
      bumpUsage("cities");
      setSelectedJurisdiction(city); scrollTop();
    } catch(e) { setSelectedJurisdiction(city); }
  };
  const openInspector = (name) => {
    try {
      if (!tierLoaded) { setSelectedThirdParty(name); scrollTop(); return; }
      if (tier === "pro") { setSelectedThirdParty(name); scrollTop(); return; }
      const count = getUsage()["inspectors"] || 0;
      if (count >= (FREE_LIMITS["inspectors"] || 5)) { setTimeout(() => { setUpgradeFeature("inspectors"); setShowUpgrade(true); }, 0); return; }
      bumpUsage("inspectors");
      setSelectedThirdParty(name); scrollTop();
    } catch(e) { setSelectedThirdParty(name); }
  };
  const openCamera = (refObj) => {
    try {
      if (tier === "pro") { if (refObj && refObj.current) refObj.current.click(); return; }
      const count = getUsage()["identify"] || 0;
      if (count >= (FREE_LIMITS["identify"] || 5)) { setTimeout(() => { setUpgradeFeature("identify"); setShowUpgrade(true); }, 0); return; }
      bumpUsage("identify");
      if (refObj && refObj.current) refObj.current.click();
    } catch(e) { if (refObj && refObj.current) refObj.current.click(); }
  };
  const catColors = { "Venting": "#4a9a8a", "Water Heaters": "#c87a20", "Drainage": "#5a7aaa", "Water Supply": "#2a8a6a", "Gas": "#c85a30", "Backflow": "#8a5aaa", "Fixtures": "#8a8a30" };
  const cityCount = sortedJ.length;

  const callPhone = (phone) => { window.location.href = `tel:${phone.replace(/[^0-9]/g, '')}`; };

  const [licenseExpiry, setLicenseExpiry] = useState(() => { try { return localStorage.getItem("codex_license_expiry") || ""; } catch(e) { return ""; } });
  const [licenseType, setLicenseType] = useState(() => { try { return localStorage.getItem("codex_license_type") || "Journeyman"; } catch(e) { return "Journeyman"; } });
  const saveLicense = (expiry, type) => { setLicenseExpiry(expiry); setLicenseType(type); try { localStorage.setItem("codex_license_expiry", expiry); localStorage.setItem("codex_license_type", type); } catch(e) {} };
  const getLicenseDaysLeft = () => { if (!licenseExpiry) return null; const diff = Math.ceil((new Date(licenseExpiry) - new Date()) / (1000 * 60 * 60 * 24)); return diff; };

  if (!authed && showLanding) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#0e1215 60%,#1a1408 100%)", color: "#c8d8e8", fontFamily: "'Lora',serif" }}>
      {/* Header */}
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #2a3540" }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: ".1em", color: "#e8f0f8" }}>CODEX TX</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#d4820a" }}>TEXAS PLUMBING CODE</div>
        </div>
        <button onClick={() => setShowLanding(false)} style={{ background: "linear-gradient(135deg,#d4820a,#8a5006)", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: ".06em", color: "#fff" }}>SIGN IN</button>
      </div>

      {/* Hero */}
      <div style={{ padding: "40px 24px 32px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, background: "linear-gradient(135deg,#d4820a,#8a5006)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 40px rgba(212,130,10,.3)" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M 4 20 L 14 10"/><path d="M 14 10 C 14 10 13 7 15 5 C 17 3 20 3.5 20 3.5 L 18 5.5 L 18.5 7 L 20 7.5 L 22 5.5 C 22 5.5 22 8.5 20 10 C 18 11.5 15 10.5 14 10 Z"/><path d="M 4 20 C 3 21 2 21 2 20 C 2 19 3 18 4 18 L 6 20 Z"/></svg>
        </div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 42, letterSpacing: ".08em", color: "#e8f0f8", lineHeight: 1, marginBottom: 12 }}>The code book<br/>in your pocket.</div>
        <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 16, color: "#d4820a", marginBottom: 8 }}>Built by plumbers in the field, like you —<br/>for plumbers like you.</div>
        <div style={{ fontFamily: "'Lora',serif", fontSize: 14, color: "#4a6a7a", marginBottom: 32, lineHeight: 1.6 }}>Texas plumbing codes, city amendments, inspector contacts, and Bob — the AI parts identifier that reads your camera and tells you exactly what you're looking at.</div>
        <button onClick={() => setShowLanding(false)} style={{ background: "linear-gradient(135deg,#d4820a,#8a5006)", border: "none", borderRadius: 14, padding: "18px 40px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: ".08em", color: "#fff", boxShadow: "0 6px 30px rgba(212,130,10,.4)", marginBottom: 12, width: "100%" }}>GET STARTED FREE</button>
        <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a" }}>No credit card required · 5 free uses of every feature</div>
      </div>

      {/* Tiers */}
      <div style={{ padding: "0 24px 32px" }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".12em", color: "#d4820a", textAlign: "center", marginBottom: 16 }}>CHOOSE YOUR PLAN</div>

        {/* Free */}
        <div style={{ background: "#161c22", border: "1px solid #2a3540", borderRadius: 14, padding: "20px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: "#e8f0f8" }}>FREE</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>Try before you pay</div></div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 24, color: "#4a6a7a" }}>$0</div>
          </div>
          {["5 code lookups", "5 city searches", "5 voice searches", "5 inspector profiles", "5 Bob identifications", "1 job mode use", "1 estimate use"].map(f => <div key={f} style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#5a7a8a", marginBottom: 4 }}>✓ {f}</div>)}
          <button onClick={() => setShowLanding(false)} style={{ background: "transparent", border: "1px solid #2a3540", borderRadius: 10, padding: "12px", cursor: "pointer", width: "100%", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: ".06em", color: "#4a6a7a", marginTop: 12 }}>START FREE</button>
        </div>

        {/* Basic */}
        <div style={{ background: "linear-gradient(135deg,#1a2a1a,#0e1808)", border: "1px solid #2a5a3a", borderRadius: 14, padding: "20px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: "#e8f0f8" }}>BASIC</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a8a5a" }}>The reference tool</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 24, color: "#4aba6a" }}>$9.99<span style={{ fontSize: 13, color: "#4a6a4a" }}>/mo</span></div><div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a3a" }}>or $83.99/year</div></div>
          </div>
          {["Unlimited code lookups", "Unlimited city searches", "Unlimited voice search", "Unlimited license tracker", "All 170+ Texas cities"].map(f => <div key={f} style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#6a9a7a", marginBottom: 4 }}>✓ {f}</div>)}
          <button onClick={() => { setShowLanding(false); setTimeout(() => startCheckout("price_1TDJhn22aMwDwvRaosmzUBGR"), 500); }} style={{ background: "linear-gradient(135deg,#2a5a3a,#1a3a2a)", border: "1px solid #3a7a4a", borderRadius: 10, padding: "12px", cursor: "pointer", width: "100%", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: ".06em", color: "#4aba6a", marginTop: 12 }}>GET BASIC</button>
        </div>

        {/* Pro */}
        <div style={{ background: "linear-gradient(135deg,#2a1e0a,#1a1208)", border: "2px solid #d4820a", borderRadius: 14, padding: "20px", position: "relative" }}>
          <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#d4820a,#8a5006)", borderRadius: 20, padding: "4px 14px", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: ".08em", color: "#fff" }}>MOST POPULAR</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 20, color: "#e8f0f8" }}>PRO</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#d4820a" }}>The field tool</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 24, color: "#d4820a" }}>$29.99<span style={{ fontSize: 13, color: "#8a5a2a" }}>/mo</span></div><div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#6a4a2a" }}>or $251.99/year</div></div>
          </div>
          {["Everything in Basic", "Bob AI parts identifier", "Inspector profiles & intel", "Job mode — multi-photo lists", "Estimate builder", "CODEX TX videos (coming soon)"].map(f => <div key={f} style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#c0a070", marginBottom: 4 }}>✓ {f}</div>)}
          <button onClick={() => { setShowLanding(false); setTimeout(() => startCheckout("price_1TDK0o22aMwDwvRaE4BOddDs"), 500); }} style={{ background: "linear-gradient(135deg,#d4820a,#8a5006)", border: "none", borderRadius: 10, padding: "14px", cursor: "pointer", width: "100%", fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: ".06em", color: "#fff", marginTop: 12, boxShadow: "0 4px 20px rgba(212,130,10,.3)" }}>GET PRO</button>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "0 24px 40px", fontFamily: "'Lora',serif", fontSize: 12, color: "#2a4a5a", lineHeight: 1.8 }}>
        Cancel anytime · Secure payments by Stripe · Used by Texas plumbers daily
      </div>
    </div>
  );

  if (!authed) return authScreen_JSX;

  // ── UPGRADE MODAL ────────────────────────────────────────
  const upgradeModal = showUpgrade && (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "linear-gradient(135deg,#161c22,#111820)", border: "2px solid #d4820a", borderRadius: 18, padding: 28, maxWidth: 380, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔒</div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: 22, color: "#e8f0f8", marginBottom: 6 }}>
            {tier === "free" ? "Free limit reached" : "Pro feature"}
          </div>
          <div style={{ fontFamily: "'Lora',serif", fontSize: 14, color: "#6a8a9a", lineHeight: 1.6 }}>
            {tier === "free"
              ? `You've used your free ${upgradeFeature} allowance. Upgrade to keep going.`
              : `${upgradeFeature} is a Pro feature. Upgrade to unlock it.`}
          </div>
        </div>

        {/* Basic option — only show if free tier and feature is basic-eligible */}
        {tier === "free" && !["inspectors","identify","jobmode","estimate"].includes(upgradeFeature) && (
          <button onClick={() => startCheckout("price_1TDJhn22aMwDwvRaosmzUBGR")} style={{ background: "linear-gradient(135deg,#1a3a2a,#0e2218)", border: "1px solid #2a6a3a", borderRadius: 12, padding: "14px", cursor: "pointer", width: "100%", marginBottom: 10, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: ".06em", color: "#4aba6a" }}>
            BASIC — $9.99/month
          </button>
        )}

        <button onClick={() => startCheckout("price_1TDK0o22aMwDwvRaE4BOddDs")} style={{ background: "linear-gradient(135deg,#d4820a,#8a5006)", border: "none", borderRadius: 12, padding: "16px", cursor: "pointer", width: "100%", marginBottom: 12, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: ".06em", color: "#fff", boxShadow: "0 4px 20px rgba(212,130,10,.3)" }}>
          PRO — $29.99/month
        </button>

        <button onClick={() => setShowUpgrade(false)} style={{ background: "transparent", border: "none", cursor: "pointer", width: "100%", fontFamily: "'Lora',serif", fontSize: 13, color: "#3a5a6a", padding: 8 }}>
          Maybe later
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Georgia',serif", background: "#0e1215", minHeight: "100vh", maxWidth: 430, margin: "0 auto", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
        body{background:#0e1215}
        ::-webkit-scrollbar{display:none}
        .p{transition:opacity .15s,transform .15s;cursor:pointer;-webkit-user-select:none;user-select:none}
        .p:active{opacity:.7;transform:scale(.98)}
        .cc{background:#161c22;border:1px solid #2a3540;border-radius:12px;padding:16px;margin-bottom:10px}
        .jc{background:#161c22;border:1px solid #2a3540;border-radius:12px;padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:12px}
        .jc:active{background:#1e262e}
        .pill{display:inline-flex;align-items:center;background:rgba(255,255,255,.07);border-radius:20px;padding:3px 10px;font-size:11px;font-family:'Barlow Condensed',sans-serif;letter-spacing:.05em;font-weight:600;pointer-events:none;user-select:none}
        .si{width:100%;background:#161c22;border:1px solid #2a3540;border-radius:10px;padding:12px 48px 12px 42px;color:#e8f0f8;font-family:'Lora',serif;font-size:15px;outline:none;transition:border-color .2s}
        .si:focus{border-color:#d4820a}
        .si::placeholder{color:#3a4a5a}
        .sic{position:absolute;left:13px;top:50%;transform:translateY(-50%);pointer-events:none;color:#4a5a6a}
        .mb{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:6px;border-radius:50%;display:flex;align-items:center;justify-content:center}
        .mb.on{animation:pulse 1s infinite}
        .sw{position:relative;margin-bottom:16px}
        .cs{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;margin-bottom:16px}
        .cb{flex-shrink:0;background:#161c22;border:1px solid #2a3540;border-radius:20px;padding:6px 14px;color:#6a8a9a;font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;letter-spacing:.05em;cursor:pointer;transition:all .15s;white-space:nowrap}
        .cb.active{background:#2a1e0a;border-color:#d4820a;color:#f0a030}
        .sl{font-family:'Barlow Condensed',sans-serif;font-size:11px;letter-spacing:.15em;font-weight:700;color:#d4820a;text-transform:uppercase;margin-bottom:10px}
        .ar{display:flex;gap:10px;padding:12px 0;border-bottom:1px solid #1e2830;align-items:flex-start}
        .ar:last-child{border-bottom:none}
        .dot{width:6px;height:6px;border-radius:50%;background:#d4820a;margin-top:7px;flex-shrink:0}
        .wd{background:#c87a20}.rd{background:#c85a40}
        .nb{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:#0e1215;border-top:2px solid #d4820a;display:flex;padding:8px 0 20px;z-index:100}
        .ni{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 0;cursor:pointer}
        .ni:active{opacity:.6}
        .nl{font-family:'Barlow Condensed',sans-serif;font-size:10px;letter-spacing:.08em;font-weight:600}
        .hdr{position:sticky;top:0;background:linear-gradient(180deg,#0e1215 85%,rgba(14,18,21,0));border-bottom:1px solid #d4820a;z-index:50;padding:0 16px;display:flex;align-items:center;height:56px;gap:8px}
        .cnt{flex:1;overflow-y:auto;padding:16px 16px 100px;height:calc(100vh - 56px);}
        .hb{background:#161c22;border:1px solid #2a3540;border-radius:14px;padding:18px 16px;display:flex;align-items:center;gap:14px;margin-bottom:10px;cursor:pointer}
        .hb:active{background:#1e262e}
        .ib{background:#161c22;border:1px solid #2a3540;border-radius:12px;padding:16px;margin-bottom:12px}
        .wb{background:#1a1a0f;border:1px solid #4a4a1a;border-radius:10px;padding:12px 14px;margin-bottom:16px}
        .tc{background:#1a2a1a;border:1px solid #2a4a2a;border-radius:8px;padding:8px 12px;display:inline-flex;align-items:center;gap:6px;margin:4px;cursor:pointer}
        .tc:active{opacity:.7}
        .vb{background:#1a2030;border-bottom:1px solid #2a3a50;padding:8px 16px;display:flex;align-items:center;gap:10px}
        .vbig{width:100%;background:linear-gradient(135deg,#1e2a38,#0f1820);border:1px solid #d4820a;border-radius:14px;padding:18px;display:flex;align-items:center;gap:12px;cursor:pointer;margin-bottom:16px}
        .vbig.on{border-color:#c85a30;background:linear-gradient(135deg,#2a1a0f,#1a0f08)}
        .vbig:active{opacity:.8;transform:scale(.98)}
        .call-btn{display:flex;align-items:center;gap:8px;background:#1a3a2a;border:1px solid #2a6a3a;border-radius:10px;padding:12px 16px;cursor:pointer;transition:all .15s;margin-bottom:10px;width:100%}
        .call-btn:active{background:#2a4a3a;transform:scale(.98)}
        .lang-btn{background:rgba(212,130,10,.12);border:1px solid #d4820a;border-radius:8px;padding:5px 10px;cursor:pointer;display:flex;align-items:center;gap:4px}
        .tab-btn{flex:1;padding:8px;border:none;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;border-radius:6px;transition:all .15s}
        .diagram-box{background:#161c22;border:1px solid #2a3540;border-radius:12px;padding:16px;margin-bottom:16px}
        .part-card{background:#161c22;border:1px solid #2a3540;border-radius:12px;padding:14px 16px;margin-bottom:10px;cursor:pointer;transition:all .15s;animation:fadeUp .3s ease forwards;opacity:0}
        .part-card:active{background:#1e262e;transform:scale(.98)}
        .scanner-box{position:relative;border-radius:12px;overflow:hidden;background:#0a0f14;border:1px solid #2a3038}
        .scan-line{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#c85a30,transparent);animation:scanLine 1.8s ease-in-out infinite alternate}
        .corner{position:absolute;width:20px;height:20px;border-color:#c85a30;border-style:solid}
        .corner-tl{top:10px;left:10px;border-width:2px 0 0 2px}
        .corner-tr{top:10px;right:10px;border-width:2px 2px 0 0}
        .corner-bl{bottom:10px;left:10px;border-width:0 0 2px 2px}
        .corner-br{bottom:10px;right:10px;border-width:0 2px 2px 0}
        .upload-zone{border:2px dashed #2a3540;border-radius:14px;padding:32px 16px;text-align:center;cursor:pointer;transition:all .2s}
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
            <div style={{ width: 30, height: 30, background: "linear-gradient(135deg,#d4820a,#a05a06)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M 4 20 L 14 10"/><path d="M 14 10 C 14 10 13 7 15 5 C 17 3 20 3.5 20 3.5 L 18 5.5 L 18.5 7 L 20 7.5 L 22 5.5 C 22 5.5 22 8.5 20 10 C 18 11.5 15 10.5 14 10 Z"/><path d="M 4 20 C 3 21 2 21 2 20 C 2 19 3 18 4 18 L 6 20 Z"/></svg>
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: ".1em", color: "#e8f0f8", lineHeight: 1 }}>CODEX TX</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, color: "#d4820a", letterSpacing: ".15em" }}>{t.appSub}</div>
            </div>
          </div>
        )}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          {/* TIER BADGE */}
          <button onClick={() => { if (tier === "free" || tier === "basic") { setUpgradeFeature("upgrade"); setShowUpgrade(true); } }} style={{ background: tier === "pro" ? "rgba(212,130,10,.15)" : tier === "basic" ? "rgba(74,186,106,.15)" : "rgba(58,90,106,.15)", border: `1px solid ${tier === "pro" ? "#d4820a" : tier === "basic" ? "#4aba6a" : "#2a4a5a"}`, borderRadius: 6, padding: "3px 8px", cursor: tier === "pro" ? "default" : "pointer" }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".08em", color: tier === "pro" ? "#d4820a" : tier === "basic" ? "#4aba6a" : "#4a6a7a" }}>{tier.toUpperCase()}</span>
          </button>
          {/* LANGUAGE TOGGLE */}
          <button className="lang-btn p" onClick={() => {
            const newLang = lang === "en" ? "es" : "en";
            setLang(newLang);
            // Save speech content BEFORE stopSpeaking clears the ref
            const saved = currentSpeechRef.current;
            stopSpeaking();
            if (saved) {
              const newText = newLang === "es" ? saved.esText : saved.enText;
              setTimeout(() => speak(newText, saved.enText, saved.esText), 150);
            }
          }}>
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#7acae0", fontWeight: 700, letterSpacing: ".06em" }}>{lang === "en" ? "SPANISH" : "ENGLISH"}</span>
          </button>
          {/* LOGOUT */}
          <button onClick={() => { setAuthed(false); setAuthEmail(""); setAuthPassword(""); setAuthInvite(""); setAuthUser(null); }} style={{ background: "transparent", border: "1px solid #2a3038", borderRadius: 8, padding: "5px 8px", cursor: "pointer" }} title="Sign out">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3a5a6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>

      {voiceStatus && <div className="vb"><Icon name="mic" size={14} color={isListening ? "#c85a30" : "#7acae0"} /><span style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: isListening ? "#c87a60" : "#7acae0", flex: 1 }}>{voiceStatus}</span></div>}

      {/* Texas silhouette — hidden during photo analysis */}
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", opacity: screen === "identify" ? 0 : 0.18, pointerEvents: "none", zIndex: 0, width: 360, height: 360, maxWidth: "85vw", transition: "opacity .3s" }}>
        <svg viewBox="0 0 700 700" fill="#d4820a" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
          <path d="M 601.74 452.0 C 604.02 456.27 609.71 462.05 605.16 466.51 C 603.55 467.83 601.74 469.16 600.13 470.68 C 598.14 472.57 592.07 482.43 584.4 488.97 C 577.38 493.52 569.89 497.32 562.69 501.68 C 553.68 506.23 553.59 504.05 549.7 504.14 C 547.42 504.14 544.58 506.32 542.21 505.66 C 540.98 505.09 534.63 504.9 531.97 505.66 C 527.33 507.74 533.39 515.8 522.49 519.4 C 518.32 522.15 509.98 511.63 512.06 521.02 C 514.53 525.0 499.27 529.83 496.04 532.2 C 493.2 533.43 482.77 550.4 484.1 552.39 C 487.61 555.81 489.69 559.98 486.66 564.53 C 484.48 569.55 484.1 576.76 478.41 578.94 C 476.42 579.41 482.01 581.21 480.59 587.09 C 478.22 594.49 472.25 601.12 478.22 608.8 C 482.11 616.57 480.12 626.24 485.42 633.45 C 487.32 638.57 488.17 644.64 492.16 648.71 C 492.53 649.28 493.1 649.66 493.77 649.28 C 495.38 649.28 494.62 651.37 493.1 652.5 C 491.87 653.36 490.16 653.55 488.74 653.93 C 476.32 664.35 476.99 650.89 465.23 648.52 C 458.12 646.44 450.44 648.24 443.24 646.72 C 438.78 645.3 435.84 641.6 431.39 639.89 C 426.36 637.15 420.01 637.81 415.94 633.45 C 411.58 628.99 403.04 631.08 399.06 626.05 C 395.74 620.84 393.85 613.82 391.67 608.04 C 389.49 602.35 384.56 598.94 382.57 593.44 C 381.62 586.43 382.95 584.34 378.68 577.9 C 378.68 573.91 379.91 568.42 377.64 564.72 C 376.5 561.5 373.66 560.74 370.91 559.5 C 366.74 556.94 362.37 553.15 360.19 548.7 C 357.82 542.54 353.75 536.47 348.82 531.82 C 344.93 528.98 341.42 526.42 339.43 521.87 C 335.93 509.36 328.63 498.93 323.03 487.17 C 320.47 473.05 307.96 464.23 297.44 455.89 C 293.17 454.18 291.65 450.01 288.34 446.98 C 285.21 441.48 280.18 438.54 273.93 439.87 C 269.0 440.34 264.07 438.44 259.23 438.35 C 250.42 440.34 241.6 432.09 238.19 436.17 C 234.77 440.91 227.66 439.58 223.21 442.52 C 216.95 448.21 215.43 457.5 212.21 465.08 C 211.64 470.2 210.22 472.29 206.05 475.13 C 201.97 478.55 200.55 486.03 194.1 484.33 C 188.23 483.0 183.68 479.78 178.75 476.08 C 172.58 474.28 167.84 469.92 161.87 467.64 C 154.1 466.41 148.79 460.91 143.67 455.6 C 138.55 452.66 132.86 449.82 130.02 444.23 C 127.46 437.97 122.63 432.19 122.25 425.27 C 123.1 417.87 120.26 411.52 115.7 405.83 C 110.11 382.23 93.05 384.88 79.68 369.15 C 76.93 364.79 72.67 361.94 68.78 358.72 C 63.56 352.84 58.35 347.34 50.96 344.4 C 44.6 340.8 43.37 332.84 38.25 327.81 C 33.23 324.4 25.64 322.5 26.59 315.39 C 26.78 313.88 26.78 312.46 28.87 311.98 C 37.31 310.84 45.93 311.7 54.46 311.41 C 86.79 311.51 118.64 311.51 151.07 311.51 L 183.58 311.51 C 189.36 310.65 196.85 313.5 201.59 309.52 C 204.63 291.5 201.69 271.41 202.73 252.92 C 203.58 210.92 203.96 168.83 203.77 126.93 L 203.77 69.1 C 204.34 61.24 202.26 50.05 205.1 43.13 C 216.1 41.14 231.93 42.94 243.78 42.37 C 279.9 42.94 316.3 41.42 352.23 42.94 C 353.37 43.41 353.94 44.55 354.03 46.54 C 354.22 55.26 354.03 66.17 354.03 75.17 L 354.03 151.3 C 352.89 160.02 358.2 159.16 362.66 164.38 C 366.83 170.16 371.0 171.2 377.45 169.59 C 383.04 171.01 382.28 169.12 386.26 167.89 C 394.7 170.16 391.29 183.53 402.29 181.16 C 411.39 182.77 411.58 186.09 422.67 184.95 C 430.54 189.22 428.26 189.31 435.94 185.42 C 438.88 185.42 442.95 185.99 446.08 185.8 C 448.36 186.47 447.32 189.78 448.55 191.4 C 449.87 193.58 453.19 193.29 454.52 195.38 C 455.18 197.27 453.86 199.64 456.32 200.69 C 469.21 203.44 462.01 186.75 481.06 202.58 C 484.67 205.24 491.4 196.33 493.01 202.3 C 493.86 214.62 498.6 206.47 501.73 200.78 C 502.96 198.13 504.86 194.71 507.89 199.45 C 515.19 207.23 518.23 198.03 521.16 200.5 C 523.16 204.86 528.46 205.81 531.88 208.74 C 533.58 210.64 535.67 210.55 537.56 209.12 C 540.41 207.7 542.97 206.56 544.77 204.19 C 547.23 202.39 550.74 202.87 553.59 201.63 C 565.34 202.87 561.17 200.97 571.03 198.7 C 576.81 199.74 583.45 203.63 588.57 198.41 C 595.11 194.24 602.31 203.72 607.15 207.23 C 613.78 209.88 620.23 213.58 626.87 215.57 C 628.95 216.42 629.99 219.46 632.46 219.74 C 634.17 220.12 636.25 218.79 637.77 218.98 C 639.29 219.65 640.61 218.7 642.03 218.51 C 647.53 219.46 648.58 219.27 648.48 226.38 L 648.48 286.1 C 649.52 295.39 645.73 306.86 651.7 314.83 C 657.96 320.23 660.05 327.53 659.76 335.4 C 665.73 342.79 666.49 352.56 672.47 359.86 C 674.74 367.63 672.94 376.92 669.81 384.31 C 665.17 390.95 664.12 398.44 663.27 406.12 C 668.1 421.85 662.23 424.79 655.59 437.69 C 655.21 439.58 657.49 442.05 656.06 443.75 C 643.93 446.31 638.34 447.74 627.15 453.99 C 626.11 454.85 620.42 450.67 621.46 447.36 C 624.4 440.15 616.34 435.89 606.67 443.94 C 603.26 445.74 599.75 447.36 601.37 451.43 L 601.74 452.0 L 601.74 452.0 Z" />
        </svg>
      </div>

      {/* UPGRADE MODAL */}
      {upgradeModal}

      <div className="cnt" ref={cntRef}>

        {/* HOME */}
        {screen === "home" && (
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 1, marginBottom: 20 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 34, letterSpacing: ".04em", color: "#e8f0f8", lineHeight: 1.1, marginBottom: 6 }}>{t.tagline.split(".")[0]}.<br /><span style={{ color: "#d4820a" }}>{t.tagline.split(".")[1]}</span></div>
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
              {[
                { s: "codes", icon: "book", bg: "linear-gradient(135deg,#1a3a5a,#0f2238)", border: "#2a5a8a", ic: "#7acae0", ti: t.codes, sub: t.codesSub },
                { s: "jurisdiction", icon: "map", bg: "linear-gradient(135deg,#1a3a2a,#0f2218)", border: "#2a6a3a", ic: "#4aba6a", ti: t.jurisdiction, sub: `${cityCount} ${t.jurisdictionSub}` },
                { s: "inspectors", icon: "user", bg: "linear-gradient(135deg,#2a2010,#1a1408)", border: "#6a4a10", ic: "#d4820a", ti: t.inspectors, sub: t.inspectorsSub }
              ].map(item => (
                <div key={item.s} className="hb p" onClick={() => navTo(item.s)} style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                  <div style={{ width: 44, height: 44, background: "rgba(0,0,0,.3)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${item.border}` }}><Icon name={item.icon} size={22} color={item.ic} /></div>
                  <div><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: ".05em", color: "#e8f0f8", marginBottom: 2 }}>{item.ti}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#5a7a8a" }}>{item.sub}</div></div>
                  <div style={{ marginLeft: "auto", color: item.ic, opacity: 0.6 }}><Icon name="chevron" size={18} color={item.ic} /></div>
                </div>
              ))}
            </div>
            {bookmarks.length > 0 && <div><div className="sl">{t.saved}</div>{CODES.filter(c => bookmarks.includes(c.id)).map(c => <div key={c.id} className="cc p" onClick={() => openCode(c)}><div style={{ display: "flex", justifyContent: "space-between" }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, color: "#c0d8e8", flex: 1, paddingRight: 8 }}>{lang === "en" ? c.title : c.titleEs}</div><span className="pill" style={{ color: catColors[c.category] || "#7a9aaa" }}>{c.code}</span></div></div>)}</div>}
          </div>
        )}

        {/* CODES LIST */}
        {screen === "codes" && !selectedCode && (
          <div>
            <div className="sw"><div className="sic"><Icon name="search" size={16} /></div><input className="si" placeholder={t.searchCodes} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><button className={`mb ${isListening ? "on" : ""}`} onClick={isListening ? stopVoice : startVoice}><Icon name="mic" size={16} color={isListening ? "#c85a30" : "#3a8a9a"} /></button></div>
            <div className="cs">{categories.map(c => <button key={c} className={`cb ${selectedCategory === c ? "active" : ""}`} onClick={() => setSelectedCategory(c)}>{c}</button>)}</div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginBottom: 12 }}>{filteredCodes.length} {searchQuery ? t.matching : t.available}</div>
            {filteredCodes.map(code => <div key={code.id} className="cc p" onClick={() => openCode(code)}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15, color: "#c0d8e8", flex: 1, paddingRight: 8 }}>{lang === "en" ? code.title : code.titleEs}</div><span className="pill" style={{ color: catColors[code.category] || "#7a9aaa", flexShrink: 0 }}>{code.code}</span></div><div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", lineHeight: 1.5, marginBottom: 8 }}>{(lang === "en" ? code.plain : code.plainEs).substring(0, 90)}…</div>{code.diagram && <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, color: "#3a8a9a", letterSpacing: ".08em" }}>📐 {t.diagram}</span>}</div>)}
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
            <div style={{ padding: "12px 14px", background: "#1a2a1a", border: "1px solid #2a4a2a", borderRadius: 10, marginBottom: 12 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, letterSpacing: ".1em", color: "#3a7a3a", marginBottom: 4 }}>{t.alwaysVerify}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a4a", lineHeight: 1.5 }}>{t.alwaysVerifyText}</div></div>

            {/* YouTube + Speak buttons */}
            <div style={{ display: "flex", gap: 10, marginTop: 4, marginBottom: 8 }}>
              <button onClick={() => {
                const ytQuery = `plumbing ${lang === "en" ? selectedCode.title : selectedCode.titleEs}`;
                window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(ytQuery)}`;
              }} style={{ flex: 1, background: "#1a0a0a", border: "1px solid #8a2020", borderRadius: 10, padding: "12px 8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ff4444"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: ".06em", color: "#ff6666" }}>WATCH ON YOUTUBE</span>
              </button>
              {voiceEnabled && (
                <button onClick={() => {
                  const enText = `${selectedCode.title}. ${selectedCode.plain.substring(0, 500)}`;
                  const esText = `${selectedCode.titleEs}. ${selectedCode.plainEs.substring(0, 500)}`;
                  const speechText = lang === "en" ? enText : esText;
                  isSpeaking ? stopSpeaking() : speak(speechText, enText, esText);
                }} style={{ background: isSpeaking ? "#2a1a1a" : "#1a2a1a", border: `1px solid ${isSpeaking ? "#c85a30" : "#2a5a3a"}`, borderRadius: 10, padding: "12px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon name="mic" size={16} color={isSpeaking ? "#c85a30" : "#4a9a6a"} />
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: ".06em", color: isSpeaking ? "#c85a30" : "#4a9a6a" }}>{isSpeaking ? "STOP" : "SPEAK"}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* JURISDICTION LIST */}
        {screen === "jurisdiction" && !selectedJurisdiction && (
          <div>
            <div className="sw"><div className="sic"><Icon name="search" size={16} /></div><input className="si" placeholder={t.searchCities} value={jSearchQuery} onChange={e => setJSearchQuery(e.target.value)} /><button className={`mb ${isListening ? "on" : ""}`} onClick={isListening ? stopVoice : startVoice}><Icon name="mic" size={16} color={isListening ? "#c85a30" : "#3a8a9a"} /></button></div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginBottom: 14 }}>{filteredJ.length} {t.jurisdictions}</div>
            {filteredJ.map(([city, data]) => <div key={city} className="jc p" onClick={() => openCity(city)}><div style={{ width: 38, height: 38, background: data.code.includes("UPC") ? "#2a1a1a" : "#1a3a2a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="map" size={18} color={data.code.includes("UPC") ? "#c87a50" : "#4a9a6a"} /></div><div style={{ flex: 1 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 17, color: "#e0e8f0", marginBottom: 2 }}>{city}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>{data.amendments.length} {t.amendments_label} · {data.code} · {data.region}</div></div><Icon name="chevron" size={16} color="#3a5a6a" /></div>)}
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
                {j.staffDirectory && <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a8a9a", padding: "4px 0" }}>👤 Staff directory: {j.staffDirectory}</div>}
              </div>

              {/* INDIVIDUAL INSPECTOR CONTACTS */}
              {j.inspectorContacts && j.inspectorContacts.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div className="sl" style={{ color: "#7acae0" }}>{lang === "en" ? "Individual Inspector Direct Lines" : "Líneas Directas de Inspectores"}</div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginBottom: 10 }}>{lang === "en" ? "Tap to call individual inspectors directly" : "Toca para llamar directamente a los inspectores"}</div>
                  {j.inspectorContacts.map((ic, idx) => (
                    <div key={idx} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <div>
                          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: "#e0e8f0" }}>{ic.name}</div>
                          <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>{ic.title}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {ic.office && (
                          <button className="call-btn p" onClick={() => callPhone(ic.office)} style={{ flex: 1, minWidth: 140, marginBottom: 0 }}>
                            <Icon name="phone" size={14} color="#4a9a6a" />
                            <div style={{ flex: 1, textAlign: "left" }}>
                              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#e0e8f0", fontWeight: 600 }}>{ic.office}</div>
                              <div style={{ fontFamily: "'Lora',serif", fontSize: 10, color: "#4a6a7a" }}>{lang === "en" ? "Office" : "Oficina"}</div>
                            </div>
                          </button>
                        )}
                        {ic.mobile && (
                          <button className="call-btn p" onClick={() => callPhone(ic.mobile)} style={{ flex: 1, minWidth: 140, marginBottom: 0, background: "#1a2a3a", borderColor: "#2a4a6a" }}>
                            <Icon name="phone" size={14} color="#7acae0" />
                            <div style={{ flex: 1, textAlign: "left" }}>
                              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#e0e8f0", fontWeight: 600 }}>{ic.mobile}</div>
                              <div style={{ fontFamily: "'Lora',serif", fontSize: 10, color: "#4a6a7a" }}>{lang === "en" ? "Mobile" : "Celular"}</div>
                            </div>
                          </button>
                        )}
                      </div>
                      {ic.email && <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a", marginTop: 6 }}>✉ {ic.email}</div>}
                    </div>
                  ))}
                </div>
              )}

              <div className="sl">{t.amendments}</div>
              <div className="ib" style={{ marginBottom: 16 }}>{j.amendments.map((a, i) => <div key={i} className="ar"><div className="dot" /><div style={{ fontFamily: "'Lora',serif", fontSize: 14, color: "#b0c8d8", lineHeight: 1.6 }}>{a}</div></div>)}</div>
              {j.thirdParty && j.thirdParty.length > 0 && <><div className="sl">{t.thirdParty}</div><div style={{ display: "flex", flexWrap: "wrap", marginBottom: 16 }}>{j.thirdParty.map(tp => <div key={tp} className="tc p" onClick={() => { setSelectedThirdParty(tp); setScreen("inspectors"); }}><span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a9a6a", fontWeight: 600 }}>{tp}</span><Icon name="chevron" size={12} color="#2a6a2a" /></div>)}</div></>}

              {/* REGIONAL SUPPLIERS */}
              {(function() {
                var suppliers = getSuppliersForCity(selectedJurisdiction);
                if (!suppliers || suppliers.length === 0) return null;
                return (
                  <div style={{ marginBottom: 16 }}>
                    <div className="sl">{lang === "en" ? "Local Supply Houses" : "Distribuidores Locales"}</div>
                    {suppliers.map(function(s, i) {
                      return (
                        <div key={i} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: "#c0d8e8", flex: 1 }}>{s.name}</div>
                          </div>
                          <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a", marginBottom: 8 }}>{s.specialty}</div>
                          <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a", marginBottom: 8 }}>📍 {s.address}</div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={function() { window.open("tel:" + s.phone.replace(/[^0-9]/g, ""), "_blank"); }} style={{ flex: 1, background: "#1a3a2a", border: "1px solid #2a6a3a", borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                              <Icon name="phone" size={13} color="#4a9a6a" />
                              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#4a9a6a", fontWeight: 700 }}>{s.phone}</span>
                            </button>
                            <button onClick={function() { window.open("https://" + s.url, "_blank"); }} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 8, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4a6a7a" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          );
        })()}

        {/* INSPECTOR LIST */}
        {screen === "inspectors" && !selectedThirdParty && (
          <div>
            <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#4a6a7a", lineHeight: 1.6, marginBottom: 20 }}>{lang === "en" ? "Builder jobs often use third-party inspectors with requirements beyond city code. Know what they look for before you show up." : "Los trabajos de constructores a menudo usan inspectores de terceros con requisitos más allá del código de la ciudad. Sepa qué buscan antes de llegar."}</div>
            <div className="sl">{Object.keys(THIRD_PARTY).length} {t.inspectorCount}</div>
            {Object.entries(THIRD_PARTY).sort(([a], [b]) => a.localeCompare(b)).map(([name, data]) => <div key={name} className="jc p" onClick={() => openInspector(name)}><div style={{ width: 38, height: 38, background: "#2a2a1a", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Icon name="user" size={18} color="#c8a030" /></div><div style={{ flex: 1 }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#e0e8f0", marginBottom: 2 }}>{name}</div><div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>{data.strictAreas.length} {lang === "en" ? "strict areas" : "áreas estrictas"} · {data.region}</div></div><Icon name="chevron" size={16} color="#3a5a6a" /></div>)}
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
          <IdentifyScreen t={t} lang={lang} isOnline={isOnline} tier={tier} getUsage={getUsage} bumpUsage={bumpUsage} FREE_LIMITS={FREE_LIMITS} setUpgradeFeature={setUpgradeFeature} setShowUpgrade={setShowUpgrade} voiceEnabled={voiceEnabled} setVoiceEnabled={setVoiceEnabled} isSpeaking={isSpeaking} speak={speak} stopSpeaking={stopSpeaking} unlockAudio={unlockAudio} audioRef={audioRef} cameraLaunchRef={cameraLaunchRef} />
        )}

      </div>

      {/* BOTTOM NAV */}
        {/* LICENSE & CE SCREEN */}
        {screen === "license" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: ".06em", color: "#e0e8f0", lineHeight: 1.1 }}>LICENSE & CE</div>
              <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: "#4a6a7a", marginTop: 4 }}>Track your license and find approved CE classes</div>
            </div>

            {/* LICENSE TRACKER */}
            <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: ".06em", color: "#7acae0", marginBottom: 12 }}>MY LICENSE</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#4a6a7a", letterSpacing: ".08em", marginBottom: 6 }}>LICENSE TYPE</div>
                <select value={licenseType} onChange={e => saveLicense(licenseExpiry, e.target.value)} style={{ width: "100%", background: "#0f1318", border: "1px solid #2a3038", borderRadius: 8, padding: "10px 12px", color: "#e0e8f0", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, outline: "none" }}>
                  {["Apprentice", "Tradesman", "Journeyman", "Master", "Responsible Master", "Inspector"].map(t => <option key={t} value={t}>{t} Plumber</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#4a6a7a", letterSpacing: ".08em", marginBottom: 6 }}>LICENSE EXPIRATION DATE</div>
                <input type="date" value={licenseExpiry} onChange={e => saveLicense(e.target.value, licenseType)} style={{ width: "100%", background: "#0f1318", border: "1px solid #2a3038", borderRadius: 8, padding: "10px 12px", color: "#e0e8f0", fontFamily: "'Lora',serif", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
              </div>
              {getLicenseDaysLeft() !== null && (function() {
                const days = getLicenseDaysLeft();
                const color = days < 0 ? "#c85a30" : days < 30 ? "#c85a30" : days < 60 ? "#c8a030" : "#4a9a6a";
                const bg = days < 0 ? "#2a1a1a" : days < 30 ? "#2a1a1a" : days < 60 ? "#2a2a1a" : "#1a2a1a";
                const msg = days < 0 ? "EXPIRED " + Math.abs(days) + " DAYS AGO — RENEW NOW" : days === 0 ? "EXPIRES TODAY — RENEW NOW" : days < 30 ? days + " DAYS LEFT — RENEW SOON" : days < 60 ? days + " DAYS LEFT — START YOUR CE" : days + " DAYS UNTIL EXPIRATION";
                return (
                  <div style={{ background: bg, border: "1px solid " + color, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>{days < 30 ? "🚨" : days < 60 ? "⚠️" : "✅"}</span>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: color, letterSpacing: ".04em" }}>{msg}</div>
                      <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a", marginTop: 2 }}>6 hours CPE required annually — TSBPE approved providers below</div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* TSBPE INFO */}
            <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: "#c8a030", marginBottom: 8 }}>TSBPE — TEXAS STATE BOARD OF PLUMBING EXAMINERS</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#b0c8d8", lineHeight: 1.6, marginBottom: 10 }}>6 hours of Continuing Professional Education required every year to renew any Texas plumbing license. Must be from a TSBPE-approved provider.</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => window.open("tel:5129365200", "_blank")} style={{ flex: 1, background: "#1a3a2a", border: "1px solid #2a6a3a", borderRadius: 8, padding: "10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Icon name="phone" size={13} color="#4a9a6a" />
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#4a9a6a", fontWeight: 700 }}>(512) 936-5200</span>
                </button>
                <button onClick={() => window.open("https://tsbpe.texas.gov", "_blank")} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 8, padding: "10px 14px", cursor: "pointer" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4a6a7a" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </button>
                <button onClick={() => window.open("https://vo.licensing.hpc.texas.gov/datamart/selSearchType.do", "_blank")} style={{ background: "#1a2a3a", border: "1px solid #2a4a6a", borderRadius: 8, padding: "10px 14px", cursor: "pointer" }}>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#7acae0", fontWeight: 700 }}>LICENSE LOOKUP</span>
                </button>
              </div>
            </div>

            {/* CE PROVIDERS */}
            <div className="sl">TSBPE-APPROVED CE PROVIDERS ({CE_PROVIDERS.length})</div>
            {CE_PROVIDERS.map(function(p, i) {
              return (
                <div key={i} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 14, color: "#c0d8e8", flex: 1, paddingRight: 8 }}>{p.name}</div>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, color: "#3a8a9a", background: "#1a2a3a", borderRadius: 6, padding: "2px 8px", flexShrink: 0 }}>{p.type}</span>
                  </div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#3a5a6a", marginBottom: 4 }}>📍 {p.region}</div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a", marginBottom: 8 }}>{p.note}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {p.phone ? (
                      <button onClick={function() { window.open("tel:" + p.phone.replace(/[^0-9]/g, ""), "_blank"); }} style={{ flex: 1, background: "#1a3a2a", border: "1px solid #2a6a3a", borderRadius: 8, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        <Icon name="phone" size={12} color="#4a9a6a" />
                        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#4a9a6a", fontWeight: 700 }}>{p.phone}</span>
                      </button>
                    ) : null}
                    {p.url ? (
                      <button onClick={function() { window.open("https://" + p.url, "_blank"); }} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 8, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a6a7a" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#4a6a7a" }}>WEBSITE</span>
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      <div className="nb" style={{ alignItems: "center" }}>
        {[
          { id: "home", label: t.navHome, icon: "home", color: "#7acae0" },
          { id: "codes", label: t.navCodes, icon: "book", color: "#7acae0" },
          { id: "identify", label: t.navIdentify, icon: "camera", color: "#c85a30" },
          { id: "jurisdiction", label: t.navCities, icon: "map", color: "#4a9a6a" },
          { id: "license", label: lang === "en" ? "LICENSE" : "LICENCIA", icon: "license", color: "#c8a030" },
        ].map(item => {
          const active = screen === item.id;
          const isCamera = item.id === "identify";
          if (isCamera) {
            return (
              <div key={item.id} className="ni" onClick={() => {
                navTo(item.id);
                setTimeout(() => { try { if (cameraLaunchRef.current) cameraLaunchRef.current(); } catch(e) {} }, 300);
              }}>
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

export default function App() {
  return (
    <ErrorBoundary>
      <AppInner />
    </ErrorBoundary>
  );
}

// ─── LIVE VIEWFINDER COMPONENT ───────────────────────────────
function LiveViewfinder({ onCapture, onFallback, isOnline, t, lang }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [camReady, setCamReady] = useState(false);
  const [camError, setCamError] = useState(false);

  useEffect(() => {
    let active = true;
    const start = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        if (!active) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setCamReady(true);
        }
      } catch(e) {
        setCamError(true);
      }
    };
    start();
    return () => {
      active = false;
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  const capture = () => {
    if (!camReady || !videoRef.current || !canvasRef.current) { onFallback(); return; }
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        if (blob) onCapture(new File([blob], "capture.jpg", { type: "image/jpeg" }));
        else onFallback();
      }, "image/jpeg", 0.92);
    } catch(e) { onFallback(); }
  };

  if (camError) {
    return (
      <div onClick={onFallback} style={{ border: "2px dashed #c85a30", borderRadius: 14, padding: "32px 16px", textAlign: "center", cursor: "pointer", background: "rgba(200,90,48,.05)" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>📷</div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: "#e0e8f0", marginBottom: 6 }}>{t.identifyTap}</div>
        <div style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#4a6a7a" }}>{lang === "en" ? "Tap to open camera" : "Toca para abrir cámara"}</div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", background: "#000", aspectRatio: "4/3", maxHeight: 280 }}>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", display: camReady ? "block" : "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {!camReady && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#0e1215" }}>
          <div style={{ width: 36, height: 36, border: "3px solid #c85a30", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
      )}
      {camReady && (
        <div onClick={capture} style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", width: 64, height: 64, borderRadius: "50%", background: "rgba(200,90,48,.9)", border: "3px solid #fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(200,90,48,.6)" }}>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fff" }} />
        </div>
      )}
      {camReady && (
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,.5)", borderRadius: 20, padding: "4px 12px" }}>
          <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#fff", letterSpacing: ".08em" }}>{lang === "en" ? "TAP BUTTON TO CAPTURE" : "TOCA PARA CAPTURAR"}</span>
        </div>
      )}
    </div>
  );
}

// ─── IDENTIFY SCREEN COMPONENT ───────────────────────────────
function IdentifyScreen({ t, lang, isOnline, tier, getUsage, bumpUsage, FREE_LIMITS, setUpgradeFeature, setShowUpgrade, voiceEnabled, setVoiceEnabled, isSpeaking, speak, stopSpeaking, unlockAudio, audioRef, cameraLaunchRef }) {
  const [activeTab, setActiveTab] = useState("bob"); // "bob" | "job" | "estimate"
  const [phase, setPhase] = useState("idle");
  const [imagePreview, setImagePreview] = useState(null);
  const [partsEn, setPartsEn] = useState([]);
  const [partsEs, setPartsEs] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [error, setError] = useState(null);
  const [lastBase64, setLastBase64] = useState(null);
  const [recentHistory, setRecentHistory] = useState(() => {
    try {
      const saved = localStorage.getItem("codex_recent_history");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [showHistory, setShowHistory] = useState(false);

  // JOB MODE state
  const [jobAddress, setJobAddress] = useState("");
  const [jobPhotos, setJobPhotos] = useState([]); // [{preview, partsEn, partsEs, status}]
  const [jobPhase, setJobPhase] = useState("setup"); // "setup" | "shooting" | "analyzing" | "results"
  const [jobAnalyzingIdx, setJobAnalyzingIdx] = useState(null);
  const [jobReport, setJobReport] = useState(null);

  // ESTIMATE state
  const [estimateParts, setEstimateParts] = useState([]);
  const [laborHours, setLaborHours] = useState(4);
  const [laborRate, setLaborRate] = useState(95);
  const [markupPct, setMarkupPct] = useState(20);
  const [permitFee, setPermitFee] = useState(150);
  const [showEstimate, setShowEstimate] = useState(false);

  // Material cost lookup — realistic 2025 supply house pricing
  const MATERIAL_COSTS = {
    "Ball Valve": 18, "Gate Valve": 22, "Check Valve": 28, "Pressure Reducing Valve": 85,
    "Pressure Relief Valve": 45, "TPR Valve": 38, "Thermostatic Mixing Valve": 95,
    "Backflow Preventer": 120, "Pressure Vacuum Breaker": 65, "Double Check Valve": 145,
    "Reduced Pressure Zone": 280, "Irrigation Backflow": 85,
    "Water Heater": 650, "Tankless Water Heater": 1100, "Electric Water Heater": 480,
    "Water Heater Expansion Tank": 55, "Thermal Expansion Tank": 55,
    "PVC Pipe": 8, "CPVC Pipe": 12, "PEX Pipe": 15, "Copper Pipe": 38,
    "ABS Pipe": 9, "Cast Iron Pipe": 42, "Galvanized Pipe": 28,
    "CSST Gas Line": 65, "Black Iron Pipe": 22,
    "PVC Fitting": 4, "CPVC Fitting": 5, "PEX Fitting": 8, "Copper Fitting": 14,
    "ABS Fitting": 5, "Wye Fitting": 6, "Tee Fitting": 5, "Elbow": 4,
    "P-Trap": 18, "S-Trap": 12, "Bottle Trap": 22,
    "Cleanout": 24, "Floor Drain": 45, "Roof Drain": 85,
    "Vent Cap": 12, "Air Admittance Valve": 28, "Studor Vent": 35,
    "Sediment Trap": 22, "Drip Leg": 18,
    "Toilet": 180, "Flange": 22, "Wax Ring": 8,
    "Faucet": 95, "Kitchen Faucet": 145, "Shower Valve": 185, "Tub Spout": 28,
    "Shower Head": 45, "Hose Bib": 22, "Sillcock": 22,
    "Garbage Disposal": 165, "Dishwasher Connection": 25,
    "Water Softener": 650, "Water Filter": 185,
    "Sump Pump": 185, "Sewage Pump": 280,
    "Gas Valve": 35, "Gas Regulator": 55, "Gas Meter": 0,
    "Shut Off Valve": 18, "Stop Valve": 16, "Angle Stop": 14,
    "Supply Line": 12, "Flexible Connector": 18,
    "default": 35
  };

  const getPartCost = (partName) => {
    if (!partName) return MATERIAL_COSTS.default;
    const name = partName.toLowerCase();
    for (const [key, val] of Object.entries(MATERIAL_COSTS)) {
      if (name.includes(key.toLowerCase())) return val;
    }
    return MATERIAL_COSTS.default;
  };

  const fileRef = useRef(null);
  const galleryRef = useRef(null);
  const jobFileRef = useRef(null);

  // Register camera launch function so parent tab button can trigger it
  useEffect(() => {
    if (cameraLaunchRef) {
      cameraLaunchRef.current = () => {
        try { unlockAudio(); if (fileRef.current) fileRef.current.click(); } catch(e) {}
      };
    }
    // Scroll content area to top when identify screen mounts
    try {
      const cnt = document.querySelector('.cnt');
      if (cnt) cnt.scrollTop = 0;
    } catch(e) {}
    return () => { if (cameraLaunchRef) cameraLaunchRef.current = null; };
  }, []);

  // Current parts based on active language — no API call needed to switch
  const parts = lang === "es" ? partsEs : partsEn;
  const setParts = lang === "es" ? setPartsEs : setPartsEn;

  const unlockAudio_local = unlockAudio; // use prop

  const buildSpeech = (partsList) => {
    if (partsList.length === 0) return lang === "en" ? "No plumbing parts detected." : "No se detectaron partes de plomería.";
    if (partsList.length === 1) {
      const p = partsList[0];
      const codeWord = p.codeStatus === "approved"
        ? (lang === "en" ? "code approved" : "aprobado por código")
        : p.codeStatus === "grandfathered"
        ? (lang === "en" ? "grandfathered, acceptable in existing systems" : "aceptable en sistemas existentes")
        : (lang === "en" ? "not code approved, should be replaced" : "no aprobado por código, debe reemplazarse");
      return lang === "en"
        ? `I can see a ${p.name}. ${p.description} This part is ${codeWord}. ${p.proTip ? "Pro tip: " + p.proTip : ""}`
        : `Veo ${p.name}. ${p.description} Esta parte es ${codeWord}. ${p.proTip ? "Consejo: " + p.proTip : ""}`;
    }
    const names = partsList.map(p => p.name).join(", ");
    const issues = partsList.filter(p => p.codeStatus !== "approved");
    let speech = lang === "en"
      ? `I found ${partsList.length} parts: ${names}.`
      : `Encontré ${partsList.length} partes: ${names}.`;
    if (issues.length > 0) {
      speech += lang === "en"
        ? ` Heads up — ${issues.map(p => p.name).join(" and ")} ${issues.length === 1 ? "is" : "are"} not fully code approved. Tap each part for details.`
        : ` Atención — ${issues.map(p => p.name).join(" y ")} no ${issues.length === 1 ? "está" : "están"} totalmente aprobado por código. Toca cada parte para más detalles.`;
    } else {
      speech += lang === "en" ? " All parts appear code approved. Tap any part for details." : " Todas las partes parecen aprobadas por código. Toca cualquier parte para más detalles.";
    }
    return speech;
  };

  const handleImage = async (file) => {
    if (!file) return;
    stopSpeaking();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const compressed = await compressImage(dataUrl);
      const base64 = compressed.split(",")[1];
      setLastBase64(base64);
      setImagePreview(dataUrl);
      setPhase("analyzing");
      setError(null);
      await analyzeImage(base64, lang);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (dataUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 1024;
        let w = img.width;
        let h = img.height;
        if (w > h && w > maxSize) { h = (h * maxSize) / w; w = maxSize; }
        else if (h > maxSize) { w = (w * maxSize) / h; h = maxSize; }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = dataUrl;
    });
  };

  const analyzeImage = async (base64, activeLang) => {
    const useLang = activeLang || lang;
    try {
      // Single API call in English only — saves ~50% cost
      const res = await fetch("/api/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, lang: "en" })
      });
      const data = await res.json();
      const enParts = data.parts || [];

      if (enParts.length === 0) {
        const msg = useLang === "en"
          ? "No plumbing parts detected — try a closer shot with better lighting"
          : "No se detectaron partes — intenta más cerca con mejor iluminación";
        setError(msg);
        speak(useLang === "en"
          ? "No plumbing parts detected. Try getting closer or improving the lighting."
          : "No se detectaron partes. Intenta acercarte más o mejorar la iluminación.");
        setPhase("idle");
        return;
      }

      // Build Spanish parts by translating key fields from English
      const esParts = enParts.map(p => ({
        ...p,
        name: p.name, // part names stay in English for searchability
        description: p.description,
        codeNote: p.codeNote,
        proTip: p.proTip,
      }));

      setPartsEn(enParts);
      setPartsEs(esParts);
      setPhase("results");
      saveToHistory(enParts, esParts, imagePreview);
      // Speak in whichever language is active
      speak(buildSpeech(useLang === "es" ? esParts : enParts), buildSpeech(enParts), buildSpeech(esParts));

    } catch (err) {
      console.error("Identify error:", err);
      setError((useLang === "en" ? "Could not analyze photo: " : "No se pudo analizar: ") + err.message);
      speak(useLang === "en"
        ? "Could not analyze the photo. Please try again."
        : "No se pudo analizar la foto. Por favor intenta de nuevo.");
      setPhase("idle");
    }
  };

  const saveToHistory = (enParts, esParts, preview) => {
    try {
      const entry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        imagePreview: preview,
        partsEn: enParts,
        partsEs: esParts,
        summary: enParts.slice(0, 3).map(p => p.name).join(", ") + (enParts.length > 3 ? ` +${enParts.length - 3} more` : "")
      };
      setRecentHistory(prev => {
        const updated = [entry, ...prev].slice(0, 10);
        try { localStorage.setItem("codex_recent_history", JSON.stringify(updated)); } catch {}
        return updated;
      });
    } catch {}
  };

  // JOB MODE — add a photo and analyze it
  const handleJobPhoto = async (file) => {
    if (!file || jobPhotos.length >= 10) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      const compressed = await compressImage(dataUrl);
      const base64 = compressed.split(",")[1];
      const idx = jobPhotos.length;
      setJobPhotos(prev => [...prev, { preview: dataUrl, partsEn: [], partsEs: [], status: "analyzing" }]);
      setJobAnalyzingIdx(idx);
      setJobPhase("analyzing");
      try {
        const res = await fetch("/api/identify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ base64, lang: "en" }) });
        const data = await res.json();
        const parts = data.parts || [];
        setJobPhotos(prev => {
          const updated = [...prev];
          updated[idx] = { preview: dataUrl, partsEn: parts, partsEs: parts, status: "done" };
          return updated;
        });
      } catch {
        setJobPhotos(prev => {
          const updated = [...prev];
          updated[idx] = { preview: dataUrl, partsEn: [], partsEs: [], status: "error" };
          return updated;
        });
      }
      setJobAnalyzingIdx(null);
      setJobPhase("shooting");
    };
    reader.readAsDataURL(file);
  };

  // Consolidate all job parts into a deduplicated list with quantities
  const buildJobPartsList = () => {
    const allParts = jobPhotos.flatMap(p => lang === "es" ? p.partsEs : p.partsEn);
    const map = {};
    allParts.forEach(part => {
      const key = part.name.toLowerCase().trim();
      if (map[key]) {
        map[key].qty += 1;
      } else {
        map[key] = { ...part, qty: 1 };
      }
    });
    return Object.values(map).sort((a, b) => b.qty - a.qty);
  };

  const buildJobReport = () => {
    const parts = buildJobPartsList();
    const issues = parts.filter(p => p.codeStatus !== "approved");
    const address = jobAddress.trim() || (lang === "en" ? "Job Site" : "Sitio de Trabajo");
    const date = new Date().toLocaleDateString();
    let report = lang === "en"
      ? `CODEX TX — JOB REPORT\n${address}\n${date}\n${"=".repeat(40)}\n\nPARTS IDENTIFIED (${parts.length} types, ${jobPhotos.length} photos):\n`
      : `CODEX TX — REPORTE DE TRABAJO\n${address}\n${date}\n${"=".repeat(40)}\n\nPARTES IDENTIFICADAS (${parts.length} tipos, ${jobPhotos.length} fotos):\n`;
    parts.forEach(p => {
      const status = p.codeStatus === "approved" ? "✅" : p.codeStatus === "grandfathered" ? "⚠" : "❌";
      report += `${status} ${p.name} x${p.qty}\n`;
    });
    if (issues.length > 0) {
      report += lang === "en"
        ? `\n⚠ CODE ISSUES (${issues.length}):\n`
        : `\n⚠ PROBLEMAS DE CÓDIGO (${issues.length}):\n`;
      issues.forEach(p => { report += `• ${p.name}: ${p.codeNote || ""}\n`; });
    }
    report += lang === "en"
      ? `\nGenerated by CODEX TX — codex-tx.vercel.app`
      : `\nGenerado por CODEX TX — codex-tx.vercel.app`;
    setJobReport(report);
    return report;
  };

  const copyJobReport = () => {
    const report = buildJobReport();
    navigator.clipboard.writeText(report).catch(() => {});
  };

  const resetJob = () => {
    setJobAddress("");
    setJobPhotos([]);
    setJobPhase("setup");
    setJobReport(null);
    setJobAnalyzingIdx(null);
  };

  // ESTIMATE calculations
  const calcEstimate = (partsList) => {
    const materialCost = partsList.reduce((sum, p) => sum + (getPartCost(p.name) * (p.qty || 1)), 0);
    const laborCost = laborHours * laborRate;
    const subtotal = materialCost + laborCost + permitFee;
    const markupAmt = subtotal * (markupPct / 100);
    return {
      material: materialCost,
      labor: laborCost,
      permit: permitFee,
      subtotal,
      markup: markupAmt,
      total: subtotal + markupAmt
    };
  };

  const reset = () => { stopSpeaking(); setPhase("idle"); setImagePreview(null); setPartsEn([]); setPartsEs([]); setSelectedPart(null); setError(null); setLastBase64(null); };

  const codeColor = (status) => ({ approved: "#4a9a6a", grandfathered: "#c8a030", "not-approved": "#c85a30" }[status] || "#4a6a7a");
  const codeLabel = (status) => ({ approved: t.identifyApproved, grandfathered: t.identifyGrandfathered, "not-approved": t.identifyNotApproved }[status] || status);
  const catColor = { Valve: "#7acae0", Pipe: "#5a7aaa", Fitting: "#4a9a8a", "Water Heater": "#c87a20", Fixture: "#8a8a30", Gas: "#c85a30", Backflow: "#8a5aaa", Vent: "#4a9a6a", Pump: "#6a7a9a", Filter: "#7a6a8a", Unknown: "#4a5a6a" };

  return (
    <div>

      {/* ── TAB SWITCHER ── */}
      <div style={{ display: "flex", gap: 6, marginBottom: 18, background: "#111518", borderRadius: 12, padding: 4 }}>
        {[
          { id: "bob", label: lang === "en" ? "BOB" : "BOB", icon: "📷" },
          { id: "job", label: lang === "en" ? "JOB MODE" : "MODO TRABAJO", icon: "pipewrench" },
          { id: "estimate", label: lang === "en" ? "ESTIMATE" : "ESTIMAR", icon: "💰" },
        ].map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: 9, cursor: "pointer",
              background: activeTab === tab.id ? (tab.id === "bob" ? "#c85a30" : tab.id === "job" ? "#1a3a2a" : "#1a2a1a") : "transparent",
              border: activeTab === tab.id ? "none" : "1px solid #1a2028",
              transition: "all .2s"
            }}
          >
            <div style={{ fontSize: 14 }}>{tab.icon}</div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", color: activeTab === tab.id ? "#fff" : "#3a5a6a", marginTop: 2 }}>{tab.label}</div>
          </div>
        ))}
      </div>

      {/* BOB TAB */}
      {activeTab === "bob" && (
        <div>

          {/* IDLE */}
          {phase === "idle" && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: ".06em", color: "#e0e8f0", lineHeight: 1.1 }}>{t.identifyTitle}</div>
                <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#4a6a7a", marginTop: 6 }}>{t.identifySub}</div>
              </div>
              {!isOnline && (
                <div style={{ background: "#1a1a2a", border: "1px solid #4a4a8a", borderRadius: 12, padding: "14px 16px", marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>📵</span>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, color: "#9a9ae0", letterSpacing: ".04em", marginBottom: 4 }}>{lang === "en" ? "BOB NEEDS A SIGNAL" : "BOB NECESITA SEÑAL"}</div>
                    <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#6a6a9a", lineHeight: 1.5 }}>{lang === "en" ? "No internet. Photo ID requires a connection. Cities, codes and contacts work offline." : "Sin internet. Identificacion requiere conexion. Ciudades, codigos y contactos funcionan sin conexion."}</div>
                    {recentHistory.length > 0 && <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#7a7ab0", marginTop: 8 }}>{lang === "en" ? "Recent saves below" : "Recientes abajo"}</div>}
                  </div>
                </div>
              )}
              {error && <div style={{ background: "#2a1a1a", border: "1px solid #6a2a2a", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontFamily: "'Lora',serif", fontSize: 13, color: "#c87a60" }}>{error}</div>}

              {/* RECENT HISTORY — prominent, above camera */}
              {recentHistory.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <div onClick={() => setShowHistory(h => !h)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#1a2a3a", border: "1px solid #2a4a6a", borderRadius: 10, padding: "12px 14px", cursor: "pointer", marginBottom: showHistory ? 8 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>🕐</span>
                      <div>
                        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: ".06em", color: "#7acae0" }}>{lang === "en" ? "RECENT IDENTIFICATIONS" : "IDENTIFICACIONES RECIENTES"}</div>
                        <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a" }}>{recentHistory.length} {lang === "en" ? "saved — tap to reload" : "guardadas — toca para ver"}</div>
                      </div>
                    </div>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a7a9a" strokeWidth="2" strokeLinecap="round" style={{ transform: showHistory ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }}><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  {showHistory && (
                    <div>
                      {recentHistory.map(function(entry) {
                        return (
                          <div key={entry.id} onClick={() => { setPartsEn(entry.partsEn); setPartsEs(entry.partsEs); setImagePreview(entry.imagePreview); setPhase("results"); }} style={{ display: "flex", gap: 12, alignItems: "center", background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "10px 12px", marginBottom: 8, cursor: "pointer" }}>
                            {entry.imagePreview && <img src={entry.imagePreview} alt="" style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8, flexShrink: 0 }} />}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 600, color: "#c0d0d8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{entry.summary}</div>
                              <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a" }}>{entry.timestamp}</div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3a5a6a" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>
                        );
                      })}
                      <div onClick={() => { setRecentHistory([]); try { localStorage.removeItem("codex_recent_history"); } catch(ex) {} }} style={{ textAlign: "center", padding: "6px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#3a4a5a" }}>
                        {lang === "en" ? "CLEAR HISTORY" : "BORRAR HISTORIAL"}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <input ref={fileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={e => handleImage(e.target.files[0])} />
              <input ref={galleryRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleImage(e.target.files[0])} />

              {/* LIVE VIEWFINDER */}
              <LiveViewfinder onCapture={handleImage} onFallback={() => { unlockAudio(); if (fileRef.current) fileRef.current.click(); }} isOnline={isOnline} t={t} lang={lang} />

              <div onClick={() => { if (!isOnline) return; unlockAudio(); openCamera(galleryRef); }} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: "12px 16px", marginTop: 10, cursor: isOnline ? "pointer" : "not-allowed", opacity: isOnline ? 1 : 0.4 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7acae0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: ".06em", color: "#7acae0" }}>{lang === "en" ? "UPLOAD FROM CAMERA ROLL" : "SUBIR DESDE LA GALERIA"}</span>
              </div>

              {/* VOICE READOUT — small, below camera buttons */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 4px", marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>🔊</span>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#3a5a6a", letterSpacing: ".04em" }}>{lang === "en" ? "Voice readout" : "Lectura por voz"}</span>
                </div>
                <div onClick={() => setVoiceEnabled(v => !v)} style={{ width: 36, height: 20, background: voiceEnabled ? "#c85a30" : "#2a3038", borderRadius: 10, position: "relative", cursor: "pointer", transition: "background .2s" }}>
                  <div style={{ position: "absolute", top: 2, left: voiceEnabled ? 18 : 2, width: 16, height: 16, background: "#fff", borderRadius: "50%", transition: "left .2s" }} />
                </div>
              </div>
            </div>
          )}

          {/* ANALYZING */}
          {phase === "analyzing" && (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              {imagePreview && <img src={imagePreview} alt="" style={{ width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 12, marginBottom: 24, opacity: 0.7 }} />}
              <div style={{ width: 48, height: 48, border: "3px solid #c85a30", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: "#e0e8f0", letterSpacing: ".06em" }}>{t.identifyAnalyzing}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", marginTop: 6 }}>{t.identifyAnalyzingSub}</div>
            </div>
          )}

          {/* RESULTS */}
          {phase === "results" && !selectedPart && (
            <div>
              {imagePreview && <img src={imagePreview} alt="" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 12, marginBottom: 16 }} />}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 18, color: "#e0e8f0" }}>{t.identifyResults}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {isSpeaking && <button onClick={stopSpeaking} style={{ background: "#2a1a1a", border: "1px solid #c85a30", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#c85a30" }}>STOP</button>}
                  {!isSpeaking && voiceEnabled && parts.length > 0 && (
                    <button onClick={() => speak(buildSpeech(parts), buildSpeech(partsEn), buildSpeech(partsEs))} style={{ background: "none", border: "1px solid #2a3038", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: 14 }}>🔊</span>
                      <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#7acae0", fontWeight: 700 }}>REPLAY</span>
                    </button>
                  )}
                  <button onClick={reset} style={{ background: "none", border: "1px solid #2a3038", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, color: "#4a6a7a" }}>{t.identifyNewPhoto}</button>
                </div>
              </div>
              {isSpeaking && (
                <div style={{ background: "#1a2a1a", border: "1px solid #2a5a2a", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
                    {[0,1,2,3].map(function(i) { return <div key={i} style={{ width: 3, background: "#4a9a6a", borderRadius: 2, animation: "speakBar .6s ease-in-out infinite alternate", animationDelay: i * 0.15 + "s", height: [12,18,14,10][i] }} />; })}
                  </div>
                  <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a9a6a", fontWeight: 600 }}>{lang === "en" ? "BOB IS SPEAKING..." : "BOB ESTA HABLANDO..."}</span>
                </div>
              )}
              {parts.length > 0 && (
                <div onClick={() => { setActiveTab("estimate"); setEstimateParts(parts.map(function(p) { return Object.assign({}, p, {qty: 1}); })); }} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0a1a10", border: "1px solid #1a4a2a", borderRadius: 10, padding: "10px 14px", marginBottom: 14, cursor: "pointer" }}>
                  <span style={{ fontSize: 16 }}>💰</span>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a9a6a", fontWeight: 700 }}>{lang === "en" ? "ESTIMATE THIS JOB" : "ESTIMAR ESTE TRABAJO"}</div>
                </div>
              )}
              {parts.map(function(part, i) {
                return (
                  <div key={part.id || i} className="part-card" style={{ animationDelay: i * 60 + "ms", borderLeftColor: catColor[part.category] || "#3a5a6a", borderLeftWidth: 3 }} onClick={() => setSelectedPart(part)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#e0e8f0", flex: 1, paddingRight: 8 }}>{part.name}</div>
                      <span className="pill" style={{ color: catColor[part.category] || "#4a6a7a", background: "rgba(255,255,255,.04)", fontSize: 10, flexShrink: 0 }}>{part.category}</span>
                    </div>
                    <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a6a7a", lineHeight: 1.5, marginBottom: 8 }}>{(part.description || "").substring(0, 80)}...</div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span className="pill" style={{ color: codeColor(part.codeStatus), background: "rgba(255,255,255,.04)", fontSize: 10 }}>{codeLabel(part.codeStatus)}</span>
                      <span style={{ marginLeft: "auto", color: "#3a5a6a" }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg></span>
                    </div>
                  </div>
                );
              })}
              <button onClick={reset} style={{ width: "100%", background: "none", border: "1px solid #2a3038", borderRadius: 10, padding: "12px", cursor: "pointer", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a6a7a", marginTop: 8 }}>📷 {t.identifyNewPhoto}</button>
            </div>
          )}

          {/* PART DETAIL */}
          {phase === "results" && selectedPart && (
            <div>
              <button onClick={() => setSelectedPart(null)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "#7acae0", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: ".05em", marginBottom: 16, padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                BACK TO RESULTS
              </button>
              <div style={{ display: "flex", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                <span className="pill" style={{ color: catColor[selectedPart.category] || "#4a6a7a", background: "rgba(255,255,255,.06)", padding: "4px 12px" }}>{selectedPart.category}</span>
                <span className="pill" style={{ color: codeColor(selectedPart.codeStatus), background: "rgba(255,255,255,.06)", padding: "4px 12px" }}>{codeLabel(selectedPart.codeStatus)}</span>
              </div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: ".04em", color: "#e0e8f0", lineHeight: 1.1, marginBottom: 16 }}>{selectedPart.name.toUpperCase()}</div>
              <div className="sl">What it is</div>
              <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: 16, marginBottom: 16 }}>
                <p style={{ fontFamily: "'Lora',serif", fontSize: 15, lineHeight: 1.75, color: "#c0d0d8", margin: 0 }}>{selectedPart.description}</p>
              </div>
              <div className="sl">{t.identifyCodeStatus}</div>
              <div style={{ background: selectedPart.codeStatus === "approved" ? "#1a2a1a" : selectedPart.codeStatus === "grandfathered" ? "#2a2a1a" : "#2a1a1a", border: "1px solid #2a3a2a", borderRadius: 12, padding: 14, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, color: codeColor(selectedPart.codeStatus), marginBottom: 4 }}>{codeLabel(selectedPart.codeStatus)}</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#8a9aaa", lineHeight: 1.5 }}>{selectedPart.codeNote}</div>
              </div>
              {selectedPart.proTip && (
                <div style={{ background: "#1e1a0a", border: "1px solid #3a3010", borderRadius: 12, padding: 14, marginBottom: 16 }}>
                  <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 14, color: "#c8b870", lineHeight: 1.6 }}>💡 {selectedPart.proTip}</div>
                </div>
              )}
              <div className="sl">{t.identifyWhereToBuy}</div>
              <div style={{ marginBottom: 16 }}>
                {(function() {
                  var stores = getBuyStores(selectedPart);
                  var zip = "";
                  try { zip = localStorage.getItem("codex_zip") || ""; } catch(e) {}
                  var zipParam = zip ? "&zip=" + zip : "";
                  var storeConfigs = {
                    "Home Depot": {
                      icon: "🏠",
                      color: "#4a9a6a",
                      bg: "#1a3a2a",
                      border: "#2a6a3a",
                      label: "Home Depot",
                      sub: lang === "en" ? "Common parts, same-day pickup" : "Partes comunes, recoger el mismo dia",
                      url: "https://www.homedepot.com/s/" + encodeURIComponent(selectedPart.name) + "?zip=" + zip
                    },
                    "Ferguson": {
                      icon: "pipewrench",
                      color: "#8a7aaa",
                      bg: "#1a1a2a",
                      border: "#2a2a4a",
                      label: "Ferguson",
                      sub: lang === "en" ? "Pro supply house" : "Distribuidor profesional",
                      url: "https://www.ferguson.com/search?term=" + encodeURIComponent(selectedPart.name)
                    },
                    "Amazon": {
                      icon: "📦",
                      color: "#7acae0",
                      bg: "#1a2a3a",
                      border: "#2a4a6a",
                      label: "Amazon",
                      sub: lang === "en" ? "Wide selection, fast shipping" : "Amplia seleccion, envio rapido",
                      url: "https://www.amazon.com/s?k=" + encodeURIComponent(selectedPart.name) + "+plumbing"
                    },
                    "Grainger": {
                      icon: "⚙️",
                      color: "#c8a030",
                      bg: "#2a2a1a",
                      border: "#4a4a2a",
                      label: "Grainger",
                      sub: lang === "en" ? "Industrial & commercial" : "Industrial y comercial",
                      url: "https://www.grainger.com/search?searchQuery=" + encodeURIComponent(selectedPart.name)
                    },
                  };
                  return stores.map(function(storeName) {
                    var cfg = storeConfigs[storeName];
                    if (!cfg) return null;
                    return (
                      <button key={storeName} className="buy-btn" onClick={function() { window.open(cfg.url, "_blank"); }} style={{ background: cfg.bg, borderColor: cfg.border }}>
                        <span style={{ fontSize: 18 }}>{cfg.icon}</span>
                        <div style={{ flex: 1, textAlign: "left" }}>
                          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>{cfg.label}</div>
                          <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>{cfg.sub}</div>
                        </div>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cfg.color} strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </button>
                    );
                  });
                })()}
              </div>
              <div className="sl">{t.identifyRelatedVideos}</div>
              <button className="yt-btn" onClick={() => window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent((selectedPart.searchTerm || selectedPart.name) + " plumbing repair"), "_blank")}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#c85a30"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff"/></svg>
                <div style={{ flex: 1, textAlign: "left" }}><div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#e0e8f0", fontWeight: 600 }}>{t.identifySearchVideo}</div></div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c85a30" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </button>
              <div style={{ height: 12 }} />
            </div>
          )}

        </div>
      )}

      {/* JOB MODE TAB */}
      {activeTab === "job" && (
        <div>
          <input ref={jobFileRef} type="file" accept="image/*" capture="environment" style={{ display: "none" }} onChange={function(e) { if (e.target.files[0]) handleJobPhoto(e.target.files[0]); e.target.value = ""; }} />
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: ".06em", color: "#e0e8f0" }}>{t.jobModeTitle}</div>
            <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: "#4a6a7a", marginTop: 4 }}>{t.jobModeSub}</div>
          </div>
          {!isOnline && (
            <div style={{ background: "#1a1a2a", border: "1px solid #4a4a8a", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontFamily: "'Lora',serif", fontSize: 13, color: "#6a6a9a" }}>
              📵 {lang === "en" ? "Offline - photo analysis unavailable" : "Sin conexion - analisis no disponible"}
            </div>
          )}
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, color: "#4a6a7a", letterSpacing: ".06em", marginBottom: 6 }}>{t.jobModeAddress}</div>
            <input type="text" value={jobAddress} onChange={function(e) { setJobAddress(e.target.value); }} placeholder={t.jobModeAddressPlaceholder} style={{ width: "100%", background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "10px 14px", fontFamily: "'Lora',serif", fontSize: 14, color: "#c0d0d8", outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
            <div onClick={function() { if (!isOnline || jobPhotos.length >= 10) return; if (tier !== "pro") { const count = getUsage()["jobmode"] || 0; if (count >= (FREE_LIMITS["jobmode"] || 1)) { setTimeout(() => { setUpgradeFeature("jobmode"); setShowUpgrade(true); }, 0); return; } bumpUsage("jobmode"); } if (jobFileRef.current) jobFileRef.current.click(); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: jobPhotos.length >= 10 ? "#1a1f24" : "#1a1a0a", border: "1px solid " + (jobPhotos.length >= 10 ? "#2a3038" : "#c85a30"), borderRadius: 12, padding: "14px 16px", cursor: (!isOnline || jobPhotos.length >= 10) ? "not-allowed" : "pointer", opacity: (!isOnline || jobPhotos.length >= 10) ? 0.5 : 1 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={jobPhotos.length >= 10 ? "#3a5a6a" : "#c85a30"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <div>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: ".06em", color: jobPhotos.length >= 10 ? "#3a5a6a" : "#e0e8f0" }}>{t.jobModePhoto}</div>
                <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#4a6a7a" }}>{jobPhotos.length}/10 {t.jobModePhotoCount}</div>
              </div>
            </div>
            {jobPhotos.length > 0 && (
              <div onClick={resetJob} style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: "14px 12px", cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6a3a3a" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </div>
            )}
          </div>
          {jobPhotos.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 16 }}>
              {jobPhotos.map(function(p, i) {
                return (
                  <div key={i} style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "1", background: "#1a1f24" }}>
                    <img src={p.preview} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {p.status === "analyzing" && <div style={{ width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />}
                      {p.status === "done" && <span style={{ fontSize: 14 }}>{p.partsEn.length > 0 ? "✅" : "⚪"}</span>}
                      {p.status === "error" && <span style={{ fontSize: 14 }}>❌</span>}
                    </div>
                    <div style={{ position: "absolute", bottom: 2, right: 4, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 9, color: "#fff", fontWeight: 700 }}>{i + 1}</div>
                  </div>
                );
              })}
            </div>
          )}
          {jobAnalyzingIdx !== null && (
            <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "10px 14px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 16, height: 16, border: "2px solid #c85a30", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", flexShrink: 0 }} />
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#c85a30" }}>{t.jobModeAnalyzing} {jobAnalyzingIdx + 1}...</div>
            </div>
          )}
          {jobPhotos.length > 0 && jobPhotos.every(function(p) { return p.status !== "analyzing"; }) && (function() {
            var jobParts = buildJobPartsList();
            var issues = jobParts.filter(function(p) { return p.codeStatus !== "approved"; });
            var totalCost = jobParts.reduce(function(s, p) { return s + getPartCost(p.name) * p.qty; }, 0);
            return (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 16, color: "#e0e8f0" }}>{t.jobModePartsTitle}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: "#4a9a6a" }}>{jobParts.length} {lang === "en" ? "types" : "tipos"}</div>
                </div>
                {issues.length > 0 && (
                  <div style={{ background: "#2a1a0a", border: "1px solid #4a2a10", borderRadius: 10, padding: "10px 14px", marginBottom: 12 }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#c87a30", fontWeight: 700 }}>⚠ {issues.length} {t.jobModeIssues}</div>
                    {issues.map(function(p, i) { return <div key={i} style={{ fontFamily: "'Lora',serif", fontSize: 12, color: "#8a6a4a", marginTop: 4 }}>• {p.name}</div>; })}
                  </div>
                )}
                {jobParts.map(function(p, i) {
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "10px 14px", marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: p.codeStatus === "approved" ? "#1a2a1a" : "#2a1a1a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, color: "#e0e8f0" }}>
                        {p.qty > 1 ? ("x" + p.qty) : (p.codeStatus === "approved" ? "✅" : "❌")}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, color: "#c0d0d8" }}>{p.name}</div>
                        <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a" }}>{p.category}</div>
                      </div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a9a6a" }}>${(getPartCost(p.name) * p.qty).toFixed(0)}</div>
                    </div>
                  );
                })}
                <div style={{ background: "#0a1a0a", border: "1px solid #1a3a1a", borderRadius: 10, padding: "12px 16px", marginTop: 4, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, color: "#4a7a5a" }}>{t.jobModeTotal}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 20, fontWeight: 700, color: "#4a9a6a" }}>${totalCost.toFixed(0)}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <div onClick={function() { setEstimateParts(jobParts); setActiveTab("estimate"); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#0a1a10", border: "1px solid #1a4a2a", borderRadius: 10, padding: "12px 14px", cursor: "pointer" }}>
                    <span style={{ fontSize: 16 }}>💰</span>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 700, color: "#4a9a6a" }}>{t.jobModeEstimate}</span>
                  </div>
                  <div onClick={copyJobReport} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "12px 14px", cursor: "pointer" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7acae0" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 700, color: "#7acae0" }}>{t.jobModeCopyReport}</span>
                  </div>
                </div>
              </div>
            );
          })()}
          {jobPhotos.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px 20px" }}>
              <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d4820a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M 4 20 L 14 10"/><path d="M 14 10 C 14 10 13 7 15 5 C 17 3 20 3.5 20 3.5 L 18 5.5 L 18.5 7 L 20 7.5 L 22 5.5 C 22 5.5 22 8.5 20 10 C 18 11.5 15 10.5 14 10 Z"/><path d="M 4 20 C 3 21 2 21 2 20 C 2 19 3 18 4 18 L 6 20 Z"/></svg>
              </div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 16, color: "#4a6a7a", marginBottom: 8 }}>{lang === "en" ? "Start taking photos" : "Comienza tomando fotos"}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#2a4a5a", lineHeight: 1.6 }}>{lang === "en" ? "Tap ADD PHOTO for each part. Bob identifies everything and builds your parts list." : "Toca AGREGAR FOTO para cada parte. Bob identifica todo automaticamente."}</div>
            </div>
          )}
        </div>
      )}

      {/* ESTIMATE TAB */}
      {activeTab === "estimate" && (
        <div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: ".06em", color: "#e0e8f0" }}>{t.estimateTitle}</div>
            <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 13, color: "#4a6a7a", marginTop: 4 }}>{t.estimateSub}</div>
          </div>
          {estimateParts.length === 0 && (
            <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: "20px 16px", textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>💰</div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#4a6a7a", marginBottom: 8 }}>{lang === "en" ? "NO PARTS LOADED" : "SIN PARTES"}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#2a4a5a", lineHeight: 1.6 }}>{lang === "en" ? "Use Bob or Job Mode to identify parts, then tap Estimate This Job." : "Usa Bob o Modo Trabajo, luego toca Estimar Este Trabajo."}</div>
            </div>
          )}
          {estimateParts.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, color: "#4a6a7a", letterSpacing: ".06em", marginBottom: 10 }}>{lang === "en" ? "MATERIALS" : "MATERIALES"}</div>
              {estimateParts.map(function(p, i) {
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 10, padding: "8px 12px", marginBottom: 6 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 700, color: "#c0d0d8" }}>{p.name}</div>
                      <div style={{ fontFamily: "'Lora',serif", fontSize: 11, color: "#3a5a6a" }}>${getPartCost(p.name).toFixed(0)} {lang === "en" ? "ea." : "c/u"}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div onClick={function() { setEstimateParts(function(prev) { return prev.map(function(x, j) { return j === i ? Object.assign({}, x, {qty: Math.max(1, (x.qty || 1) - 1)}) : x; }); }); }} style={{ width: 26, height: 26, background: "#2a3038", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#7acae0", fontSize: 16 }}>-</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, fontWeight: 700, color: "#e0e8f0", minWidth: 20, textAlign: "center" }}>{p.qty || 1}</div>
                      <div onClick={function() { setEstimateParts(function(prev) { return prev.map(function(x, j) { return j === i ? Object.assign({}, x, {qty: (x.qty || 1) + 1}) : x; }); }); }} style={{ width: 26, height: 26, background: "#2a3038", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#7acae0", fontSize: 16 }}>+</div>
                    </div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#4a9a6a", minWidth: 50, textAlign: "right" }}>${(getPartCost(p.name) * (p.qty || 1)).toFixed(0)}</div>
                    <div onClick={function() { setEstimateParts(function(prev) { return prev.filter(function(x, j) { return j !== i; }); }); }} style={{ color: "#4a2a2a", cursor: "pointer", padding: "0 2px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ background: "#1a1f24", border: "1px solid #2a3038", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, color: "#4a6a7a", letterSpacing: ".06em", marginBottom: 12 }}>{lang === "en" ? "LABOR AND SETTINGS" : "MANO DE OBRA"}</div>
            {[
              { label: t.estimateLaborHours, value: laborHours, min: 1, max: 80, step: 1, set: setLaborHours, display: laborHours + " hrs" },
              { label: t.estimateLaborRate, value: laborRate, min: 50, max: 300, step: 5, set: setLaborRate, display: "$" + laborRate + "/hr" },
              { label: t.estimateMarkupLabel, value: markupPct, min: 0, max: 60, step: 5, set: setMarkupPct, display: markupPct + "%" },
              { label: t.estimatePermit, value: permitFee, min: 0, max: 2000, step: 25, set: setPermitFee, display: "$" + permitFee },
            ].map(function(item, i) {
              return (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#8a9aaa" }}>{item.label}</div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, fontWeight: 700, color: "#e0e8f0" }}>{item.display}</div>
                  </div>
                  <input type="range" min={item.min} max={item.max} step={item.step} value={item.value} onChange={function(e) { item.set(Number(e.target.value)); }} style={{ width: "100%", accentColor: "#4a9a6a" }} />
                </div>
              );
            })}
          </div>
          {(function() {
            var matCost = estimateParts.reduce(function(s, p) { return s + getPartCost(p.name) * (p.qty || 1); }, 0);
            var labCost = laborHours * laborRate;
            var sub = matCost + labCost + permitFee;
            var mkp = sub * (markupPct / 100);
            var total = sub + mkp;
            return (
              <div style={{ background: "#0a1a0a", border: "1px solid #1a4a1a", borderRadius: 12, padding: "16px" }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 700, color: "#3a7a4a", letterSpacing: ".06em", marginBottom: 12 }}>{lang === "en" ? "BID BREAKDOWN" : "DESGLOSE"}</div>
                {[
                  { label: t.estimateMaterial, val: matCost },
                  { label: t.estimateLabor, val: labCost },
                  { label: lang === "en" ? "Permit (est.)" : "Permiso (est.)", val: permitFee },
                  { label: t.estimateMarkup + " (" + markupPct + "%)", val: mkp },
                ].map(function(row, i) {
                  return (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ fontFamily: "'Lora',serif", fontSize: 13, color: "#4a7a5a" }}>{row.label}</div>
                      <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, color: "#6a9a7a" }}>${row.val.toFixed(0)}</div>
                    </div>
                  );
                })}
                <div style={{ height: 1, background: "#1a4a1a", margin: "10px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 16, fontWeight: 700, color: "#4a9a6a" }}>{t.estimateTotal}</div>
                  <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 28, fontWeight: 700, color: "#4a9a6a" }}>${total.toFixed(0)}</div>
                </div>
                <div style={{ fontFamily: "'Lora',serif", fontStyle: "italic", fontSize: 11, color: "#2a5a3a", marginTop: 10, lineHeight: 1.5 }}>{t.estimateDisclaimer}</div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
}
