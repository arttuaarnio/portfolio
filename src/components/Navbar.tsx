import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/70 border-b border-border/50 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <nav className="flex items-center gap-2">
          <Button
            asChild
            variant={location.pathname === "/" ? "default" : "ghost"}
          >
            <Link to="/">Home</Link>
          </Button>
          <Button
            asChild
            variant={location.pathname === "/projects" ? "default" : "ghost"}
          >
            <Link to="/projects">Projects</Link>
          </Button>
        </nav>

        <span
          aria-hidden="true"
          className="whitespace-nowrap text-xs sm:text-sm text-muted-foreground"
        >
          <span className="text-[#a6da95]">
            arttu
            {/* the full prompt doesn't fit next to the nav on small phones */}
            <span className="hidden min-[400px]:inline">@helsinki</span>
          </span>{" "}
          <span className="text-[#8aadf4]">
            ~{location.pathname === "/" ? "" : location.pathname}
          </span>
        </span>
      </div>
    </header>
  );
};

export default Navbar;
