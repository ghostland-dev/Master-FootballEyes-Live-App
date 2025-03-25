
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border mt-20" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                FootballEyesLive
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              {language === "ar" 
                ? "وجهتك الأولى لبث مباريات كرة القدم المباشرة وتحديثات المباريات في الوقت الفعلي."
                : "Votre destination première pour les diffusions de football en direct et les mises à jour des matchs en temps réel."}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.liveMatches")}</Link></li>
              <li><Link to="/matches" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.upcomingMatches")}</Link></li>
              <li><Link to="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.matchCalendar")}</Link></li>
              <li><Link to="/results" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.results")}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t("footer.leagues")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("league.premierLeague")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("league.laLiga")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("league.serieA")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("league.bundesliga")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("league.ligue1")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">{t("footer.support")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.faq")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.contactUs")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.privacyPolicy")}</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{t("footer.termsOfService")}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} FootballEyesLive. {t("footer.rights")}
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Facebook
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
