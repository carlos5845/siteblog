import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, Settings, Check, X } from 'lucide-react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(true);

  useEffect(() => {
    // Verificar si ya existe consentimiento guardado
    const savedConsent = localStorage.getItem('digitalstack_cookie_consent');
    if (!savedConsent) {
      // Mostrar banner con un ligero retraso para una animación suave
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    } else {
      // Aplicar preferencias guardadas en Google Consent Mode
      try {
        const parsed = JSON.parse(savedConsent);
        updateGoogleConsent(parsed.analytics, parsed.marketing);
      } catch (e) {
        // En caso de formato previo de texto simple
        updateGoogleConsent(savedConsent === 'all', savedConsent === 'all');
      }
    }

    // Escuchar evento para reabrir el modal desde el footer
    const handleOpenSettings = () => {
      setShowBanner(true);
      setShowConfig(true);
    };
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const updateGoogleConsent = (analytics: boolean, marketing: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: analytics ? 'granted' : 'denied',
        ad_storage: marketing ? 'granted' : 'denied',
        ad_user_data: marketing ? 'granted' : 'denied',
        ad_personalization: marketing ? 'granted' : 'denied',
      });
    }
  };

  const handleAcceptAll = () => {
    const preferences = { necessary: true, analytics: true, marketing: true };
    localStorage.setItem('digitalstack_cookie_consent', JSON.stringify(preferences));
    updateGoogleConsent(true, true);
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleAcceptNecessary = () => {
    const preferences = { necessary: true, analytics: false, marketing: false };
    localStorage.setItem('digitalstack_cookie_consent', JSON.stringify(preferences));
    updateGoogleConsent(false, false);
    setShowBanner(false);
    setShowConfig(false);
  };

  const handleSaveCustom = () => {
    const preferences = {
      necessary: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
    };
    localStorage.setItem('digitalstack_cookie_consent', JSON.stringify(preferences));
    updateGoogleConsent(analyticsAllowed, marketingAllowed);
    setShowBanner(false);
    setShowConfig(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-lg w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-7 relative text-slate-900">
        
        {/* Encabezado */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black uppercase tracking-tight text-slate-900">
              Valoramos tu Privacidad
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Utilizamos cookies propias y de terceros (Google AdSense y Google Analytics) para garantizar el funcionamiento del portal, analizar el tráfico y contextualizar anuncios relevantes sin saturar tu navegación.
            </p>
          </div>
        </div>

        {/* Panel Desplegable de Configuración Avanzada */}
        {showConfig && (
          <div className="my-4 pt-4 border-t border-slate-100 space-y-3 text-xs">
            
            {/* Técnicas (Obligatorias) */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-black text-slate-900 block">Cookies Técnicas & Esenciales</span>
                <span className="text-[11px] text-slate-500">Imprescindibles para recordar tus sesiones y navegación fluida.</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                Siempre Activas
              </span>
            </div>

            {/* Analíticas */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-black text-slate-900 block">Cookies de Rendimiento & Analítica</span>
                <span className="text-[11px] text-slate-500">Miden estadísticas anónimas de visitas mediante Google Analytics 4.</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsAllowed}
                onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                className="w-4 h-4 rounded text-black focus:ring-black cursor-pointer accent-black"
              />
            </div>

            {/* Publicitarias */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <span className="font-black text-slate-900 block">Cookies Publicitarias (Google AdSense)</span>
                <span className="text-[11px] text-slate-500">Permiten financiar el portal mostrando anuncios contextuales útiles.</span>
              </div>
              <input
                type="checkbox"
                checked={marketingAllowed}
                onChange={(e) => setMarketingAllowed(e.target.checked)}
                className="w-4 h-4 rounded text-black focus:ring-black cursor-pointer accent-black"
              />
            </div>

          </div>
        )}

        {/* Enlace a Políticas */}
        <div className="text-[11px] text-slate-400 font-medium mb-5">
          Puedes consultar nuestra{' '}
          <a href="/cookies" className="text-slate-900 font-bold underline hover:text-emerald-600">
            Política de Cookies
          </a>{' '}
          y nuestra{' '}
          <a href="/privacidad" className="text-slate-900 font-bold underline hover:text-emerald-600">
            Política de Privacidad
          </a>.
        </div>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {showConfig ? (
            <>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Guardar Preferencias
              </button>
              <button
                type="button"
                onClick={() => setShowConfig(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Volver
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
              >
                Aceptar Todas
              </button>
              <button
                type="button"
                onClick={handleAcceptNecessary}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Solo Necesarias
              </button>
              <button
                type="button"
                onClick={() => setShowConfig(true)}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
                title="Configurar opciones"
              >
                <Settings className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}