
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "ar" | "fr";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    "nav.live": "مباشر",
    "nav.matches": "المباريات",
    "nav.calendar": "التقويم",
    "nav.results": "النتائج",
    
    // Search
    "search.placeholder": "ابحث عن فريق...",
    
    // Results page
    "results.title": "نتائج المباريات",
    "results.subtitle": "تحقق من أحدث نتائج مباريات كرة القدم",
    "results.filter": "جميع الدوريات",
    "results.today": "اليوم",
    "results.yesterday": "الأمس",
    "results.lastWeek": "الأسبوع الماضي",
    "results.todayResults": "نتائج اليوم",
    "results.yesterdayResults": "نتائج الأمس",
    "results.lastWeekResults": "نتائج الأسبوع الماضي",
    "results.needMore": "تحتاج المزيد من النتائج؟",
    "results.needMoreDesc": "تبحث عن نتائج مباريات قديمة؟ الوصول إلى أرشيفنا الكامل للمباريات السابقة، مع إحصاءات تفصيلية وأبرز اللقطات.",
    "results.browseArchive": "تصفح الأرشيف الكامل",

    // Leagues
    "league.allLeagues": "جميع الدوريات",
    "league.premierLeague": "الدوري الإنجليزي الممتاز",
    "league.laLiga": "الدوري الإسباني",
    "league.serieA": "الدوري الإيطالي",
    "league.bundesliga": "الدوري الألماني",
    "league.ligue1": "الدوري الفرنسي",
    "league.championsLeague": "دوري أبطال أوروبا",

    // Footer
    "footer.quickLinks": "روابط سريعة",
    "footer.liveMatches": "مباريات مباشرة",
    "footer.upcomingMatches": "المباريات القادمة",
    "footer.matchCalendar": "تقويم المباريات",
    "footer.results": "النتائج",
    "footer.leagues": "الدوريات",
    "footer.support": "الدعم",
    "footer.faq": "الأسئلة الشائعة",
    "footer.contactUs": "اتصل بنا",
    "footer.privacyPolicy": "سياسة الخصوصية",
    "footer.termsOfService": "شروط الخدمة",
    "footer.rights": "جميع الحقوق محفوظة",

    // Buttons
    "button.watchNow": "شاهد الآن",
    "button.matchDetails": "تفاصيل المباراة",
  },
  fr: {
    // Navigation
    "nav.live": "En Direct",
    "nav.matches": "Matchs",
    "nav.calendar": "Calendrier",
    "nav.results": "Résultats",
    
    // Search
    "search.placeholder": "Rechercher une équipe...",
    
    // Results page
    "results.title": "Résultats des Matchs",
    "results.subtitle": "Consultez les derniers résultats des matchs de football",
    "results.filter": "Toutes les Ligues",
    "results.today": "Aujourd'hui",
    "results.yesterday": "Hier",
    "results.lastWeek": "Semaine Dernière",
    "results.todayResults": "Résultats d'Aujourd'hui",
    "results.yesterdayResults": "Résultats d'Hier",
    "results.lastWeekResults": "Résultats de la Semaine Dernière",
    "results.needMore": "Besoin de Plus de Résultats?",
    "results.needMoreDesc": "Vous recherchez des résultats de matchs plus anciens? Accédez à notre archive complète des jeux passés, avec des statistiques détaillées et des moments forts.",
    "results.browseArchive": "Parcourir l'Archive Complète",

    // Leagues
    "league.allLeagues": "Toutes les Ligues",
    "league.premierLeague": "Premier League",
    "league.laLiga": "La Liga",
    "league.serieA": "Serie A",
    "league.bundesliga": "Bundesliga",
    "league.ligue1": "Ligue 1",
    "league.championsLeague": "Ligue des Champions",

    // Footer
    "footer.quickLinks": "Liens Rapides",
    "footer.liveMatches": "Matchs en Direct",
    "footer.upcomingMatches": "Matchs à Venir",
    "footer.matchCalendar": "Calendrier des Matchs",
    "footer.results": "Résultats",
    "footer.leagues": "Ligues",
    "footer.support": "Support",
    "footer.faq": "FAQ",
    "footer.contactUs": "Contactez-nous",
    "footer.privacyPolicy": "Politique de Confidentialité",
    "footer.termsOfService": "Conditions d'Utilisation",
    "footer.rights": "Tous droits réservés",

    // Buttons
    "button.watchNow": "Regarder Maintenant",
    "button.matchDetails": "Détails du Match",
  }
};

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ar");

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
