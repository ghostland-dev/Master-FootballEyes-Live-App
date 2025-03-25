
import React, { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesList from "@/components/MatchesList";

// Mock data
const todayMatches = [
  {
    id: "1",
    homeTeam: {
      name: "Barcelona",
      logo: "https://media.api-sports.io/football/teams/529.png",
      score: 2
    },
    awayTeam: {
      name: "Real Madrid",
      logo: "https://media.api-sports.io/football/teams/541.png",
      score: 1
    },
    league: "La Liga",
    time: "53'",
    date: "Today",
    status: "live" as const
  },
  {
    id: "2",
    homeTeam: {
      name: "Arsenal",
      logo: "https://media.api-sports.io/football/teams/42.png",
      score: 0
    },
    awayTeam: {
      name: "Liverpool",
      logo: "https://media.api-sports.io/football/teams/40.png",
      score: 0
    },
    league: "Premier League",
    time: "12'",
    date: "Today",
    status: "live" as const
  },
  {
    id: "3",
    homeTeam: {
      name: "PSG",
      logo: "https://media.api-sports.io/football/teams/85.png"
    },
    awayTeam: {
      name: "Marseille",
      logo: "https://media.api-sports.io/football/teams/81.png"
    },
    league: "Ligue 1",
    time: "20:45",
    date: "Today",
    status: "upcoming" as const
  }
];

const tomorrowMatches = [
  {
    id: "4",
    homeTeam: {
      name: "Bayern Munich",
      logo: "https://media.api-sports.io/football/teams/157.png"
    },
    awayTeam: {
      name: "Dortmund",
      logo: "https://media.api-sports.io/football/teams/165.png"
    },
    league: "Bundesliga",
    time: "18:30",
    date: "Tomorrow",
    status: "upcoming" as const
  },
  {
    id: "5",
    homeTeam: {
      name: "Manchester City",
      logo: "https://media.api-sports.io/football/teams/50.png"
    },
    awayTeam: {
      name: "Chelsea",
      logo: "https://media.api-sports.io/football/teams/49.png"
    },
    league: "Premier League",
    time: "17:00",
    date: "Tomorrow",
    status: "upcoming" as const
  },
  {
    id: "6",
    homeTeam: {
      name: "AC Milan",
      logo: "https://media.api-sports.io/football/teams/489.png"
    },
    awayTeam: {
      name: "Inter",
      logo: "https://media.api-sports.io/football/teams/505.png"
    },
    league: "Serie A",
    time: "20:45",
    date: "Tomorrow",
    status: "upcoming" as const
  }
];

const nextWeekMatches = [
  {
    id: "7",
    homeTeam: {
      name: "Atletico Madrid",
      logo: "https://media.api-sports.io/football/teams/530.png"
    },
    awayTeam: {
      name: "Valencia",
      logo: "https://media.api-sports.io/football/teams/532.png"
    },
    league: "La Liga",
    time: "16:15",
    date: "Sunday",
    status: "upcoming" as const
  },
  {
    id: "8",
    homeTeam: {
      name: "Tottenham",
      logo: "https://media.api-sports.io/football/teams/47.png"
    },
    awayTeam: {
      name: "Manchester United",
      logo: "https://media.api-sports.io/football/teams/33.png"
    },
    league: "Premier League",
    time: "16:30",
    date: "Sunday",
    status: "upcoming" as const
  }
];

const leagues = [
  "All Leagues",
  "Premier League",
  "La Liga",
  "Serie A",
  "Bundesliga",
  "Ligue 1",
  "Champions League"
];

const Matches = () => {
  const [selectedLeague, setSelectedLeague] = useState("All Leagues");
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Upcoming Matches</h1>
        <p className="text-muted-foreground">View all scheduled football matches</p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2 bg-card rounded-lg p-2 shadow-subtle">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select 
            value={selectedLeague}
            onChange={(e) => setSelectedLeague(e.target.value)}
            className="bg-transparent focus:outline-none"
          >
            {leagues.map((league) => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2 bg-card rounded-lg p-2 shadow-subtle">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <input 
            type="date" 
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="today" className="data-[state=active]:shadow-subtle">Today</TabsTrigger>
          <TabsTrigger value="tomorrow" className="data-[state=active]:shadow-subtle">Tomorrow</TabsTrigger>
          <TabsTrigger value="next-week" className="data-[state=active]:shadow-subtle">Next Week</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="animate-fade-in">
          <MatchesList 
            title="Today's Matches" 
            matches={todayMatches} 
          />
        </TabsContent>
        
        <TabsContent value="tomorrow" className="animate-fade-in">
          <MatchesList 
            title="Tomorrow's Matches" 
            matches={tomorrowMatches} 
          />
        </TabsContent>
        
        <TabsContent value="next-week" className="animate-fade-in">
          <MatchesList 
            title="Next Week's Matches" 
            matches={nextWeekMatches} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Matches;
