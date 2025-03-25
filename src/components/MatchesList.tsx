
import React from "react";
import { Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamProps {
  name: string;
  logo: string;
  score?: number;
}

interface MatchProps {
  id: string;
  homeTeam: TeamProps;
  awayTeam: TeamProps;
  league: string;
  time: string;
  date: string;
  status: "live" | "upcoming" | "completed";
}

interface MatchesListProps {
  title: string;
  matches: MatchProps[];
  className?: string;
}

const MatchesList = ({ title, matches, className }: MatchesListProps) => {
  const { language } = useLanguage();
  
  return (
    <div className={cn("space-y-4", className)} dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="h-px flex-grow bg-border"></div>
      </div>
      
      <div className="space-y-3">
        {matches.map((match) => (
          <div 
            key={match.id}
            className="neo-card hover:shadow-elevated"
          >
            <div className="flex items-center justify-between">
              <div className="chip mb-2">{match.league}</div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{match.date}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center shadow-subtle">
                  <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
                </div>
                <span className="font-medium">{match.homeTeam.name}</span>
              </div>
              
              {match.status === "live" && (
                <div className="flex flex-col items-center">
                  <div className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white mb-1 animate-pulse-subtle">LIVE</div>
                  <div className="score-display">
                    {match.homeTeam.score} - {match.awayTeam.score}
                  </div>
                </div>
              )}
              
              {match.status === "completed" && (
                <div className="score-display">
                  {match.homeTeam.score} - {match.awayTeam.score}
                </div>
              )}
              
              {match.status === "upcoming" && (
                <div className="flex items-center text-sm font-medium">
                  <Clock className="mr-1 h-4 w-4" /> {match.time}
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <span className="font-medium">{match.awayTeam.name}</span>
                <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center shadow-subtle">
                  <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesList;
