
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  PlayCircle,
  Users,
  BarChart3,
  MessageSquare,
  Clock,
  CalendarClock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Progress } from "@/components/ui/progress";

// Données mockées pour l'exemple
const matchData = {
  id: "1",
  homeTeam: {
    name: "Barcelona",
    logo: "https://media.api-sports.io/football/teams/529.png",
    score: 2,
    goals: ["Lewandowski (23')", "Raphinha (67')"],
    players: ["Ter Stegen", "Araujo", "Kounde", "Martinez", "Baldé", "Pedri", "De Jong", "Gavi", "Raphinha", "Lewandowski", "Yamal"]
  },
  awayTeam: {
    name: "Real Madrid",
    logo: "https://media.api-sports.io/football/teams/541.png",
    score: 1,
    goals: ["Vinicius Jr. (35')"],
    players: ["Courtois", "Carvajal", "Militao", "Rudiger", "Mendy", "Valverde", "Tchouameni", "Camavinga", "Bellingham", "Vinicius", "Rodrygo"]
  },
  league: "La Liga",
  time: "53'",
  date: "24 Octobre 2023",
  status: "live",
  statistics: {
    possession: {
      home: 65,
      away: 35
    },
    shots: {
      home: 14,
      away: 8
    },
    shotsOnTarget: {
      home: 7,
      away: 3
    },
    corners: {
      home: 6,
      away: 2
    },
    fouls: {
      home: 7,
      away: 11
    },
    yellowCards: {
      home: 1,
      away: 3
    },
    redCards: {
      home: 0,
      away: 0
    }
  },
  commentaries: [
    { time: "67'", text: "GOOOAL! Raphinha scores with a beautiful shot from outside the box!" },
    { time: "55'", text: "Yellow card for Camavinga after a tough tackle on Pedri." },
    { time: "45'", text: "Half time! Barcelona 1-1 Real Madrid" },
    { time: "35'", text: "GOOOAL! Vinicius Junior equalizes for Real Madrid!" },
    { time: "23'", text: "GOOOAL! Lewandowski opens the score for Barcelona!" },
    { time: "1'", text: "The match begins!" }
  ]
};

const MatchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [quality, setQuality] = useState("high");
  const [commentaryLanguage, setCommentaryLanguage] = useState(language);
  const match = matchData; // In a real app, we would fetch the match data based on the ID

  // Fonction pour formater les statistiques en pourcentages
  const getPercentage = (home: number, away: number) => {
    const total = home + away;
    return {
      home: Math.round((home / total) * 100),
      away: Math.round((away / total) * 100)
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Header du match */}
      <div className="bg-card rounded-xl p-6 mb-8 shadow-subtle">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground flex items-center">
            <CalendarClock className="h-4 w-4 mr-1" />
            {match.date}
          </div>
          <div className="chip">{match.league}</div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            match.status === "live" ? "bg-red-500 text-white animate-pulse-subtle" :
            match.status === "upcoming" ? "bg-blue-500 text-white" : "bg-green-500 text-white"
          }`}>
            {t(`match.status.${match.status}`)}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center text-center mb-4 md:mb-0 md:w-1/3">
            <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center shadow-subtle mb-2">
              <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold">{match.homeTeam.name}</h2>
          </div>

          <div className="flex flex-col items-center md:w-1/3">
            {match.status === "live" || match.status === "completed" ? (
              <div className="text-4xl font-bold mb-2">
                {match.homeTeam.score} - {match.awayTeam.score}
              </div>
            ) : (
              <div className="text-xl font-medium flex items-center mb-2">
                <Clock className="mr-2 h-5 w-5" />
                {match.time}
              </div>
            )}
            {match.status === "live" && (
              <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                {match.time}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center text-center md:w-1/3">
            <div className="w-20 h-20 bg-white rounded-full p-2 flex items-center justify-center shadow-subtle mb-2">
              <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
            </div>
            <h2 className="text-xl font-bold">{match.awayTeam.name}</h2>
          </div>
        </div>
      </div>

      {/* Section de streaming */}
      {match.status === "live" && (
        <div className="mb-8">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden mb-4">
            <div className="flex items-center justify-center h-full text-white">
              <div className="text-center">
                <PlayCircle className="h-20 w-20 mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold">{t("match.watchStream")}</h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium mb-2">{t("match.chooseQuality")}</label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder={t("match.chooseQuality")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">{t("quality.high")}</SelectItem>
                  <SelectItem value="medium">{t("quality.medium")}</SelectItem>
                  <SelectItem value="low">{t("quality.low")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:w-1/2">
              <label className="block text-sm font-medium mb-2">{t("match.chooseLanguage")}</label>
              <Select value={commentaryLanguage} onValueChange={setCommentaryLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder={t("match.chooseLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">{t("commentary.arabic")}</SelectItem>
                  <SelectItem value="fr">{t("commentary.french")}</SelectItem>
                  <SelectItem value="en">{t("commentary.english")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Onglets d'information */}
      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <PlayCircle className="h-4 w-4" />
            <span>{t("match.goals")}</span>
          </TabsTrigger>
          <TabsTrigger value="lineups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{t("match.lineups")}</span>
          </TabsTrigger>
          <TabsTrigger value="statistics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>{t("match.statistics")}</span>
          </TabsTrigger>
          <TabsTrigger value="commentary" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>{t("match.commentary")}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4 animate-fade-in">
          <div className="bg-card rounded-xl p-6 shadow-subtle">
            <h3 className="font-semibold mb-4">{match.homeTeam.name}</h3>
            <ul className="space-y-2">
              {match.homeTeam.goals.map((goal, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <PlayCircle className="h-4 w-4 text-primary" />
                  </div>
                  {goal}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-subtle">
            <h3 className="font-semibold mb-4">{match.awayTeam.name}</h3>
            <ul className="space-y-2">
              {match.awayTeam.goals.map((goal, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <PlayCircle className="h-4 w-4 text-primary" />
                  </div>
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="lineups" className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          <div className="bg-card rounded-xl p-6 shadow-subtle">
            <h3 className="font-semibold mb-4">{match.homeTeam.name}</h3>
            <ul className="space-y-2">
              {match.homeTeam.players.map((player, index) => (
                <li key={index} className="py-2 border-b border-border last:border-0">
                  {player}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-subtle">
            <h3 className="font-semibold mb-4">{match.awayTeam.name}</h3>
            <ul className="space-y-2">
              {match.awayTeam.players.map((player, index) => (
                <li key={index} className="py-2 border-b border-border last:border-0">
                  {player}
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6 animate-fade-in">
          <div className="bg-card rounded-xl p-6 shadow-subtle">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{match.statistics.possession.home}%</span>
                  <span>{t("match.stats.possession")}</span>
                  <span>{match.statistics.possession.away}%</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                  <div 
                    className="bg-blue-500" 
                    style={{ width: `${match.statistics.possession.home}%` }}
                  />
                  <div 
                    className="bg-red-500" 
                    style={{ width: `${match.statistics.possession.away}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{match.statistics.shots.home}</span>
                  <span>{t("match.stats.shots")}</span>
                  <span>{match.statistics.shots.away}</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                  {match.statistics.shots.home + match.statistics.shots.away > 0 && (
                    <>
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${getPercentage(match.statistics.shots.home, match.statistics.shots.away).home}%` }}
                      />
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${getPercentage(match.statistics.shots.home, match.statistics.shots.away).away}%` }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{match.statistics.shotsOnTarget.home}</span>
                  <span>{t("match.stats.shotsOnTarget")}</span>
                  <span>{match.statistics.shotsOnTarget.away}</span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                  {match.statistics.shotsOnTarget.home + match.statistics.shotsOnTarget.away > 0 && (
                    <>
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${getPercentage(match.statistics.shotsOnTarget.home, match.statistics.shotsOnTarget.away).home}%` }}
                      />
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${getPercentage(match.statistics.shotsOnTarget.home, match.statistics.shotsOnTarget.away).away}%` }}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 text-center">
                  <div className="flex justify-between">
                    <span>{match.statistics.corners.home}</span>
                    <span>{match.statistics.corners.away}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("match.stats.corners")}</div>
                </div>
                
                <div className="space-y-1 text-center">
                  <div className="flex justify-between">
                    <span>{match.statistics.fouls.home}</span>
                    <span>{match.statistics.fouls.away}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("match.stats.fouls")}</div>
                </div>
                
                <div className="space-y-1 text-center">
                  <div className="flex justify-between">
                    <span>{match.statistics.yellowCards.home}</span>
                    <span>{match.statistics.yellowCards.away}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{t("match.stats.yellowCards")}</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="commentary" className="animate-fade-in">
          <div className="bg-card rounded-xl p-6 shadow-subtle">
            <div className="space-y-4">
              {match.commentaries.map((commentary, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b border-border last:border-0">
                  <div className="font-semibold min-w-16 text-primary">{commentary.time}</div>
                  <div>{commentary.text}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MatchDetail;
