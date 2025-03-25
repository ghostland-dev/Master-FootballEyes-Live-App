
import React from "react";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamProps {
  name: string;
  logo: string;
  score?: number;
}

interface LiveMatchProps {
  homeTeam: TeamProps;
  awayTeam: TeamProps;
  league: string;
  time: string;
  status: "live" | "upcoming" | "completed";
  thumbnail: string;
  onClick?: () => void;
  className?: string;
}

const LiveMatch = ({
  homeTeam,
  awayTeam,
  league,
  time,
  status,
  thumbnail,
  onClick,
  className
}: LiveMatchProps) => {
  const { t, language } = useLanguage();
  
  return (
    <div 
      className={cn(
        "stream-card group cursor-pointer",
        className
      )}
      onClick={onClick}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className="relative w-full aspect-video overflow-hidden rounded-xl">
        <img 
          src={thumbnail} 
          alt={`${homeTeam.name} vs ${awayTeam.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {status === "live" && (
          <div className="live-indicator flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-subtle"></span>
            LIVE
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="chip mb-2">{league}</div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center">
                <img src={homeTeam.logo} alt={homeTeam.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-medium text-white">{homeTeam.name}</span>
            </div>
            
            {status === "live" || status === "completed" ? (
              <div className="score-display">
                {homeTeam.score} - {awayTeam.score}
              </div>
            ) : (
              <div className="flex items-center text-white/80">
                <Clock className="w-4 h-4 mr-1" /> {time}
              </div>
            )}
            
            <div className="flex items-center gap-3">
              <span className="font-medium text-white">{awayTeam.name}</span>
              <div className="w-8 h-8 bg-white rounded-full p-1 flex items-center justify-center">
                <img src={awayTeam.logo} alt={awayTeam.name} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-primary/90 hover:bg-primary transition-colors group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Play className="mr-2 h-4 w-4" /> 
            {status === "live" ? t("button.watchNow") : t("button.matchDetails")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;
