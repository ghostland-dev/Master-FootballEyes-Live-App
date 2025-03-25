
import React, { createContext, useContext, useState, ReactNode } from "react";

// Définir les types pour les langues disponibles
export type Language = "ar" | "fr";

// Définir le type pour les traductions
type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

// Définir le type pour le contexte
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Créer le contexte
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Définir les traductions
const translations: Translations = {
  ar: {
    "nav.live": "البث المباشر",
    "nav.matches": "المباريات",
    "nav.calendar": "الجدول",
    "nav.results": "النتائج",
    "button.watchNow": "شاهد الآن",
    "button.matchDetails": "تفاصيل المباراة",
    "league.allLeagues": "جميع الدوريات",
    "league.premierLeague": "الدوري الإنجليزي الممتاز",
    "league.laLiga": "الدوري الإسباني",
    "league.serieA": "الدوري الإيطالي",
    "league.bundesliga": "الدوري الألماني",
    "league.ligue1": "الدوري الفرنسي",
    "league.championsLeague": "دوري أبطال أوروبا",
    "search.placeholder": "ابحث عن فريق أو مباراة",
    "results.title": "نتائج المباريات",
    "results.subtitle": "شاهد نتائج أحدث المباريات",
    "results.today": "اليوم",
    "results.yesterday": "الأمس",
    "results.lastWeek": "الأسبوع الماضي",
    "results.todayResults": "نتائج اليوم",
    "results.yesterdayResults": "نتائج الأمس",
    "results.lastWeekResults": "نتائج الأسبوع الماضي",
    "results.needMore": "تحتاج المزيد من النتائج؟",
    "results.needMoreDesc": "تصفح أرشيفنا للوصول إلى جميع نتائج المباريات السابقة.",
    "results.browseArchive": "تصفح الأرشيف",
    "match.goals": "الأهداف",
    "match.lineups": "التشكيلة",
    "match.statistics": "الإحصائيات",
    "match.commentary": "التعليق",
    "match.status.live": "مباشر",
    "match.status.upcoming": "قادم",
    "match.status.completed": "انتهت",
    "match.watchStream": "شاهد البث المباشر",
    "match.chooseQuality": "اختر جودة البث",
    "match.chooseLanguage": "اختر لغة التعليق",
    "match.stats.possession": "الاستحواذ",
    "match.stats.shots": "التسديدات",
    "match.stats.shotsOnTarget": "التسديدات على المرمى",
    "match.stats.corners": "ركنيات",
    "match.stats.fouls": "مخالفات",
    "match.stats.yellowCards": "بطاقات صفراء",
    "match.stats.redCards": "بطاقات حمراء",
    "notification.newMatch": "مباراة جديدة",
    "notification.newMatchDescription": "مباراة جديدة ستبدأ قريبًا! لا تفوتها",
    "notification.goalAlert": "هدف!",
    "notification.matchStart": "بدأت المباراة",
    "notification.matchEnd": "انتهت المباراة",
    "quality.high": "جودة عالية",
    "quality.medium": "جودة متوسطة",
    "quality.low": "جودة منخفضة",
    "commentary.arabic": "تعليق عربي",
    "commentary.french": "تعليق فرنسي",
    "commentary.english": "تعليق إنجليزي",
    "login.title": "تسجيل الدخول",
    "login.email": "البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.submit": "تسجيل الدخول",
    "login.registerPrompt": "ليس لديك حساب؟ سجل الآن",
    "register.title": "التسجيل",
    "register.submit": "تسجيل"
  },
  fr: {
    "nav.live": "En Direct",
    "nav.matches": "Matchs",
    "nav.calendar": "Calendrier",
    "nav.results": "Résultats",
    "button.watchNow": "Regarder Maintenant",
    "button.matchDetails": "Détails du Match",
    "league.allLeagues": "Toutes les Ligues",
    "league.premierLeague": "Premier League",
    "league.laLiga": "La Liga",
    "league.serieA": "Serie A",
    "league.bundesliga": "Bundesliga",
    "league.ligue1": "Ligue 1",
    "league.championsLeague": "Ligue des Champions",
    "search.placeholder": "Rechercher une équipe ou un match",
    "results.title": "Résultats des Matchs",
    "results.subtitle": "Consultez les résultats des derniers matchs",
    "results.today": "Aujourd'hui",
    "results.yesterday": "Hier",
    "results.lastWeek": "Semaine Dernière",
    "results.todayResults": "Résultats d'Aujourd'hui",
    "results.yesterdayResults": "Résultats d'Hier",
    "results.lastWeekResults": "Résultats de la Semaine Dernière",
    "results.needMore": "Besoin de plus de résultats ?",
    "results.needMoreDesc": "Parcourez nos archives pour accéder à tous les résultats de matchs passés.",
    "results.browseArchive": "Parcourir les Archives",
    "match.goals": "Buts",
    "match.lineups": "Compositions",
    "match.statistics": "Statistiques",
    "match.commentary": "Commentaires",
    "match.status.live": "En Direct",
    "match.status.upcoming": "À Venir",
    "match.status.completed": "Terminé",
    "match.watchStream": "Regarder le Stream",
    "match.chooseQuality": "Choisir la Qualité",
    "match.chooseLanguage": "Choisir la Langue",
    "match.stats.possession": "Possession",
    "match.stats.shots": "Tirs",
    "match.stats.shotsOnTarget": "Tirs Cadrés",
    "match.stats.corners": "Corners",
    "match.stats.fouls": "Fautes",
    "match.stats.yellowCards": "Cartons Jaunes",
    "match.stats.redCards": "Cartons Rouges",
    "notification.newMatch": "Nouveau Match",
    "notification.newMatchDescription": "Un nouveau match va bientôt commencer ! Ne le manquez pas",
    "notification.goalAlert": "But !",
    "notification.matchStart": "Le match a commencé",
    "notification.matchEnd": "Match terminé",
    "quality.high": "Haute Qualité",
    "quality.medium": "Qualité Moyenne",
    "quality.low": "Basse Qualité",
    "commentary.arabic": "Commentaire Arabe",
    "commentary.french": "Commentaire Français",
    "commentary.english": "Commentaire Anglais",
    "login.title": "Connexion",
    "login.email": "Email",
    "login.password": "Mot de passe",
    "login.submit": "Se Connecter",
    "login.registerPrompt": "Pas de compte ? Inscrivez-vous",
    "register.title": "Inscription",
    "register.submit": "S'inscrire"
  }
};

// Créer le provider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("ar");

  // Fonction de traduction
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook pour utiliser le contexte
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
