
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 text-primary rounded-full mb-4 animate-float">
            <span className="text-4xl font-bold">404</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>
        
        <div className="glassmorphism p-6 mb-8">
          <h2 className="font-medium mb-3">Looking for live matches?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Check out our live streaming section to watch football matches in real-time.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-subtle"
          >
            <Home className="w-4 h-4 mr-2" /> Go to Homepage
          </Link>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>
            If you believe this is an error, please{" "}
            <a href="#" className="text-primary hover:underline">contact our support team</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
