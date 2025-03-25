
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Matches from "./pages/Matches";
import Calendar from "./pages/Calendar";
import Results from "./pages/Results";
import MatchDetail from "./pages/MatchDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/results" element={<Results />} />
                  <Route path="/match/:id" element={<MatchDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
