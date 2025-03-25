
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import MatchesList from "@/components/MatchesList";

// Mock data
const matchesByDate = {
  "2023-06-10": [
    {
      id: "1",
      homeTeam: {
        name: "Barcelona",
        logo: "https://media.api-sports.io/football/teams/529.png"
      },
      awayTeam: {
        name: "Real Madrid",
        logo: "https://media.api-sports.io/football/teams/541.png"
      },
      league: "La Liga",
      time: "20:00",
      date: "June 10",
      status: "upcoming" as const
    },
    {
      id: "2",
      homeTeam: {
        name: "Arsenal",
        logo: "https://media.api-sports.io/football/teams/42.png"
      },
      awayTeam: {
        name: "Liverpool",
        logo: "https://media.api-sports.io/football/teams/40.png"
      },
      league: "Premier League",
      time: "17:30",
      date: "June 10",
      status: "upcoming" as const
    }
  ],
  "2023-06-11": [
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
      date: "June 11",
      status: "upcoming" as const
    }
  ],
  "2023-06-12": [
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
      date: "June 12",
      status: "upcoming" as const
    }
  ]
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  
  const formattedDate = date ? date.toISOString().split('T')[0] : "";
  const matches = matchesByDate[formattedDate] || [];

  const handleMonthChange = (increment: number) => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setMonth(newMonth);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Match Calendar</h1>
        <p className="text-muted-foreground">Plan ahead with our comprehensive match schedule</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card p-6 rounded-xl shadow-subtle">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMonthChange(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleMonthChange(1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              month={month}
              onMonthChange={setMonth}
              className="rounded-md border"
              modifiers={{
                hasMatch: (date) => {
                  const formatted = date.toISOString().split('T')[0];
                  return formatted in matchesByDate;
                }
              }}
              modifiersStyles={{
                hasMatch: { 
                  backgroundColor: 'rgba(59, 130, 246, 0.1)', 
                  borderRadius: '50%',
                  color: 'rgb(59, 130, 246)',
                  fontWeight: 'bold'
                }
              }}
            />
            
            <div className="mt-4 pt-4 border-t border-border">
              <h3 className="font-medium mb-2">Upcoming Competitions</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Champions League Final</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Jun 10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Copa America</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Jun 20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Euro 2024</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Jun 14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 animate-fade-in">
          {matches.length > 0 ? (
            <MatchesList 
              title={`Matches on ${date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`} 
              matches={matches} 
            />
          ) : (
            <div className="bg-card p-8 rounded-xl shadow-subtle text-center">
              <h3 className="text-xl font-medium mb-2">No Matches Scheduled</h3>
              <p className="text-muted-foreground">
                There are no matches scheduled for {date?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
                Please select another date or check back later.
              </p>
            </div>
          )}
          
          <div className="mt-8 glassmorphism p-6">
            <h3 className="text-xl font-medium mb-4">Looking for a specific team?</h3>
            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Search for a team..." 
                className="flex-grow px-4 py-2 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
              />
              <Button>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
