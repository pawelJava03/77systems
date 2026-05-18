"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface ConsentOptions {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<ConsentOptions>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent is already given
    const storedConsent = localStorage.getItem("cookieConsent");
    
    if (!storedConsent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(storedConsent);
      setPreferences(parsedConsent);
      updateConsentMode(parsedConsent);
    }
  }, []);

  const updateConsentMode = (consent: ConsentOptions) => {
    window.dataLayer = window.dataLayer || [];
    function gtag(_key: string, _action: string, _config: any) {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    }

    gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    });
  };

  const saveConsent = (consent: ConsentOptions) => {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));
    setPreferences(consent);
    updateConsentMode(consent);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:p-6 pb-6 pointer-events-none">
      {/* Overlay backdrop only if user is actively interacting with the banner in strict mode, but standard banners often just block a part of the screen. We'll make it pointer-events-auto on the banner itself. */}
      
      <div className="bg-[#111] border border-white/10 p-6 md:p-8 sm:rounded-[2rem] w-full max-w-3xl shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
        {!showPreferences ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-3">Szanujemy Twoją prywatność</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wykorzystujemy pliki cookies w celu zapewnienia prawidłowego działania strony, analizy ruchu oraz w celach marketingowych. 
                Możesz zaakceptować wszystkie cookies, odrzucić te, które nie są niezbędne, lub dostosować swoje preferencje. 
                Więcej informacji znajdziesz w naszej <a href="/polityka-cookies" className="text-primary hover:underline">Polityce Cookies</a> oraz <a href="/polityka-prywatnosci" className="text-primary hover:underline">Polityce Prywatności</a>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-end items-center">
              <button 
                onClick={() => setShowPreferences(true)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2 px-4 w-full sm:w-auto"
              >
                Zarządzaj preferencjami
              </button>
              <Button 
                onClick={handleRejectAll}
                className="w-full sm:w-auto bg-[#222] hover:bg-[#333] text-white rounded-full"
              >
                Tylko niezbędne
              </Button>
              <Button 
                onClick={handleAcceptAll}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-bold rounded-full"
              >
                Akceptuj wszystkie
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-3">Zarządzaj preferencjami cookies</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Wybierz kategorie plików cookies, na które chcesz wyrazić zgodę.
              </p>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-white/5">
                  <div>
                    <p className="font-bold text-white text-sm">Niezbędne</p>
                    <p className="text-xs text-muted-foreground mt-1">Wymagane do prawidłowego działania strony. Nie można ich wyłączyć.</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-not-allowed">
                    <div className="w-11 h-6 bg-primary/50 rounded-full peer"></div>
                    <span className="absolute left-[2px] top-[2px] bg-white border border-gray-300 w-5 h-5 rounded-full transition-transform translate-x-5"></span>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-white/5">
                  <div>
                    <p className="font-bold text-white text-sm">Analityczne</p>
                    <p className="text-xs text-muted-foreground mt-1">Pomagają nam zrozumieć, w jaki sposób odwiedzający wchodzą w interakcję ze stroną (np. Google Analytics).</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-[#1A1A1A] border border-white/5">
                  <div>
                    <p className="font-bold text-white text-sm">Marketingowe</p>
                    <p className="text-xs text-muted-foreground mt-1">Służą do śledzenia odwiedzających na stronach internetowych. Cel to wyświetlanie reklam dopasowanych i angażujących (np. Meta Pixel).</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end items-center pt-4 border-t border-white/10">
              <button 
                onClick={() => setShowPreferences(false)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors py-2 px-4 w-full sm:w-auto"
              >
                Wróć
              </button>
              <Button 
                onClick={handleSavePreferences}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-bold rounded-full"
              >
                Zapisz preferencje
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
