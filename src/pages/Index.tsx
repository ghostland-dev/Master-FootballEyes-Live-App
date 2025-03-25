
import React from "react";
import LiveMatch from "@/components/LiveMatch";
import MatchesList from "@/components/MatchesList";

// Mock data for demonstration
const featuredMatches = [
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
    status: "live" as const,
    thumbnail: "https://media.api-sports.io/football/teams/541.png"
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
    status: "live" as const,
    thumbnail: "https://media.api-sports.io/football/teams/40.png"
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
    status: "upcoming" as const,
    thumbnail: "https://media.api-sports.io/football/teams/85.png"
  }
];

const upcomingMatches = [
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

const recentMatches = [
  {
    id: "7",
    homeTeam: {
      name: "Juventus",
      logo: "https://media.api-sports.io/football/teams/496.png",
      score: 2
    },
    awayTeam: {
      name: "Napoli",
      logo: "https://media.api-sports.io/football/teams/492.png",
      score: 0
    },
    league: "Serie A",
    time: "FT",
    date: "Yesterday",
    status: "completed" as const
  },
  {
    id: "8",
    homeTeam: {
      name: "Atletico Madrid",
      logo: "https://media.api-sports.io/football/teams/530.png",
      score: 1
    },
    awayTeam: {
      name: "Sevilla",
      logo: "https://media.api-sports.io/football/teams/536.png",
      score: 1
    },
    league: "La Liga",
    time: "FT",
    date: "Yesterday",
    status: "completed" as const
  }
];

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Live & Upcoming Matches</h1>
          <p className="text-muted-foreground">Watch the best football matches live with high-quality streams</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMatches.map((match) => (
            <LiveMatch
              key={match.id}
              homeTeam={match.homeTeam}
              awayTeam={match.awayTeam}
              league={match.league}
              time={match.time}
              status={match.status}
              thumbnail={match.thumbnail}
              className="animate-scale-in"
            />
          ))}
        </div>
      </section>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
        <MatchesList 
          title="Upcoming Matches" 
          matches={upcomingMatches} 
        />
        
        <MatchesList 
          title="Recent Results" 
          matches={recentMatches} 
        />
      </div>
      
      <section className="mt-16 animate-fade-in">
        <div className="glassmorphism p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Never Miss a Match</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get notified when your favorite teams are playing. Set up alerts for goals, 
            kick-offs, and other key moments in the match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
            />
            <button className="w-full sm:w-auto px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
