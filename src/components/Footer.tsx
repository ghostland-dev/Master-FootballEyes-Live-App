
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                FootballEyesLive
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Your premier destination for live football streams and real-time match updates.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Live Matches</Link></li>
              <li><Link to="/matches" className="text-muted-foreground hover:text-foreground transition-colors">Upcoming Matches</Link></li>
              <li><Link to="/calendar" className="text-muted-foreground hover:text-foreground transition-colors">Match Calendar</Link></li>
              <li><Link to="/results" className="text-muted-foreground hover:text-foreground transition-colors">Results</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Leagues</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Premier League</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">La Liga</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Serie A</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Bundesliga</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Ligue 1</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FootballEyesLive. All rights reserved.
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
