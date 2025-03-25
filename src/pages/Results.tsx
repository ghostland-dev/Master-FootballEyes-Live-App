
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesList from "@/components/MatchesList";

// Mock data
const todayResults = [
  {
    id: "1",
    homeTeam: {
      name: "Manchester City",
      logo: "https://media.api-sports.io/football/teams/50.png",
      score: 3
    },
    awayTeam: {
      name: "Newcastle",
      logo: "https://media.api-sports.io/football/teams/34.png",
      score: 1
    },
    league: "Premier League",
    time: "FT",
    date: "Today",
    status: "completed" as const
  },
  {
    id: "2",
    homeTeam: {
      name: "Juventus",
      logo: "https://media.api-sports.io/football/teams/496.png",
      score: 2
    },
    awayTeam: {
      name: "Roma",
      logo: "https://media.api-sports.io/football/teams/497.png",
      score: 2
    },
    league: "Serie A",
    time: "FT",
    date: "Today",
    status: "completed" as const
  }
];

const yesterdayResults = [
  {
    id: "3",
    homeTeam: {
      name: "Barcelona",
      logo: "https://media.api-sports.io/football/teams/529.png",
      score: 4
    },
    awayTeam: {
      name: "Sevilla",
      logo: "https://media.api-sports.io/football/teams/536.png",
      score: 0
    },
    league: "La Liga",
    time: "FT",
    date: "Yesterday",
    status: "completed" as const
  },
  {
    id: "4",
    homeTeam: {
      name: "PSG",
      logo: "https://media.api-sports.io/football/teams/85.png",
      score: 2
    },
    awayTeam: {
      name: "Lyon",
      logo: "https://media.api-sports.io/football/teams/80.png",
      score: 1
    },
    league: "Ligue 1",
    time: "FT",
    date: "Yesterday",
    status: "completed" as const
  },
  {
    id: "5",
    homeTeam: {
      name: "Bayern Munich",
      logo: "https://media.api-sports.io/football/teams/157.png",
      score: 5
    },
    awayTeam: {
      name: "Augsburg",
      logo: "https://media.api-sports.io/football/teams/170.png",
      score: 1
    },
    league: "Bundesliga",
    time: "FT",
    date: "Yesterday",
    status: "completed" as const
  }
];

const lastWeekResults = [
  {
    id: "6",
    homeTeam: {
      name: "Arsenal",
      logo: "https://media.api-sports.io/football/teams/42.png",
      score: 2
    },
    awayTeam: {
      name: "Tottenham",
      logo: "https://media.api-sports.io/football/teams/47.png",
      score: 0
    },
    league: "Premier League",
    time: "FT",
    date: "Last Week",
    status: "completed" as const
  },
  {
    id: "7",
    homeTeam: {
      name: "Inter",
      logo: "https://media.api-sports.io/football/teams/505.png",
      score: 3
    },
    awayTeam: {
      name: "Milan",
      logo: "https://media.api-sports.io/football/teams/489.png",
      score: 2
    },
    league: "Serie A",
    time: "FT",
    date: "Last Week",
    status: "completed" as const
  },
  {
    id: "8",
    homeTeam: {
      name: "Real Madrid",
      logo: "https://media.api-sports.io/football/teams/541.png",
      score: 3
    },
    awayTeam: {
      name: "Atletico Madrid",
      logo: "https://media.api-sports.io/football/teams/530.png",
      score: 1
    },
    league: "La Liga",
    time: "FT",
    date: "Last Week",
    status: "completed" as const
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

const Results = () => {
  const [selectedLeague, setSelectedLeague] = useState("All Leagues");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Match Results</h1>
        <p className="text-muted-foreground">Check out the latest football match results</p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder="Search for a team..." 
            className="pl-10 w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
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
      </div>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="today" className="data-[state=active]:shadow-subtle">Today</TabsTrigger>
          <TabsTrigger value="yesterday" className="data-[state=active]:shadow-subtle">Yesterday</TabsTrigger>
          <TabsTrigger value="last-week" className="data-[state=active]:shadow-subtle">Last Week</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="animate-fade-in">
          <MatchesList 
            title="Today's Results" 
            matches={todayResults} 
          />
        </TabsContent>
        
        <TabsContent value="yesterday" className="animate-fade-in">
          <MatchesList 
            title="Yesterday's Results" 
            matches={yesterdayResults} 
          />
        </TabsContent>
        
        <TabsContent value="last-week" className="animate-fade-in">
          <MatchesList 
            title="Last Week's Results" 
            matches={lastWeekResults} 
          />
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 glassmorphism p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Need More Results?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Looking for older match results? Access our complete archive of past games, 
          with detailed statistics and highlights.
        </p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-subtle">
          Browse Full Archive
        </button>
      </div>
    </div>
  );
};

export default Results;
