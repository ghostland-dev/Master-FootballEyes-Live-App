import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchesList from "@/components/MatchesList";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useLanguage } from "@/contexts/LanguageContext";

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

const Results = () => {
  const { t, language } = useLanguage();
  const [selectedLeague, setSelectedLeague] = useState(t("league.allLeagues"));
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;

  const leagues = [
    t("league.allLeagues"),
    t("league.premierLeague"),
    t("league.laLiga"),
    t("league.serieA"),
    t("league.bundesliga"),
    t("league.ligue1"),
    t("league.championsLeague")
  ];

  const filterResults = (results) => {
    return results.filter(match => {
      const matchesSearch = searchQuery === "" || 
        match.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLeague = selectedLeague === "All Leagues" || match.league === selectedLeague;
      
      return matchesSearch && matchesLeague;
    });
  };

  const getPaginatedResults = (results) => {
    const filteredResults = filterResults(results);
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
    
    const validCurrentPage = Math.min(currentPage, totalPages || 1);
    if (validCurrentPage !== currentPage) {
      setCurrentPage(validCurrentPage);
    }
    
    const indexOfLastResult = validCurrentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    
    return {
      paginatedResults: filteredResults.slice(indexOfFirstResult, indexOfLastResult),
      totalPages
    };
  };

  const renderPagination = (totalPages) => {
    if (totalPages <= 1) return null;
    
    return (
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink 
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className="cursor-pointer"
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const { paginatedResults: todayPaginatedResults, totalPages: todayTotalPages } = getPaginatedResults(todayResults);
  const { paginatedResults: yesterdayPaginatedResults, totalPages: yesterdayTotalPages } = getPaginatedResults(yesterdayResults);
  const { paginatedResults: lastWeekPaginatedResults, totalPages: lastWeekTotalPages } = getPaginatedResults(lastWeekResults);

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t("results.title")}</h1>
        <p className="text-muted-foreground">{t("results.subtitle")}</p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input 
            type="text" 
            placeholder={t("search.placeholder")}
            className="pl-10 w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        
        <div className="flex items-center space-x-2 bg-card rounded-lg p-2 shadow-subtle">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <select 
            value={selectedLeague}
            onChange={(e) => {
              setSelectedLeague(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent focus:outline-none"
          >
            {leagues.map((league) => (
              <option key={league} value={league}>{league}</option>
            ))}
          </select>
        </div>
      </div>
      
      <Tabs defaultValue="today" className="w-full" onValueChange={() => setCurrentPage(1)}>
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="today" className="data-[state=active]:shadow-subtle">{t("results.today")}</TabsTrigger>
          <TabsTrigger value="yesterday" className="data-[state=active]:shadow-subtle">{t("results.yesterday")}</TabsTrigger>
          <TabsTrigger value="last-week" className="data-[state=active]:shadow-subtle">{t("results.lastWeek")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="animate-fade-in">
          <MatchesList 
            title={t("results.todayResults")}
            matches={todayPaginatedResults} 
          />
          {renderPagination(todayTotalPages)}
        </TabsContent>
        
        <TabsContent value="yesterday" className="animate-fade-in">
          <MatchesList 
            title={t("results.yesterdayResults")}
            matches={yesterdayPaginatedResults} 
          />
          {renderPagination(yesterdayTotalPages)}
        </TabsContent>
        
        <TabsContent value="last-week" className="animate-fade-in">
          <MatchesList 
            title={t("results.lastWeekResults")}
            matches={lastWeekPaginatedResults} 
          />
          {renderPagination(lastWeekTotalPages)}
        </TabsContent>
      </Tabs>
      
      <div className="mt-16 glassmorphism p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">{t("results.needMore")}</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          {t("results.needMoreDesc")}
        </p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-subtle">
          {t("results.browseArchive")}
        </button>
      </div>
    </div>
  );
};

export default Results;
