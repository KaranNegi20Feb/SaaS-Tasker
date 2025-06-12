import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Auto-close hamburger on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <nav className="backdrop-filter backdrop-blur-xs bg-opacity-30 fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
      <div className="border border-white/10 rounded-xl shadow-lg px-6 py-3 flex items-center justify-between">
        <div
          className="text-white font-bold text-lg cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          MicroTeams
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={scrollToTop}
            className="px-6 text-gray-200 hover:text-indigo-400 transition text-sm font-medium"
          >
            About Us
          </button>
          <a
            href="mailto:karanegi076@gmail.com"
            className="px-6 text-gray-200 hover:text-indigo-400 transition text-sm font-medium"
          >
            Contact Us
          </a>
          <Button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Login
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-pink-600 text-white hover:bg-pink-500 text-sm font-semibold px-4 py-2 rounded-lg"
          >
            Signup
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-lg space-y-3">
          <button
            onClick={() => {
              scrollToTop();
              setIsOpen(false);
            }}
            className="block w-full text-left text-gray-200 hover:text-indigo-400 transition"
          >
            About Us
          </button>
          <a
            href="mailto:karanegi076@gmail.com"
            className="block w-full text-left text-gray-200 hover:text-indigo-400 transition"
          >
            Contact Us
          </a>
          <Button
            onClick={() => {
              navigate("/login");
              setIsOpen(false);
            }}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-500 text-sm font-semibold rounded-lg"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate("/signup");
              setIsOpen(false);
            }}
            className="w-full bg-pink-600 text-white hover:bg-pink-500 text-sm font-semibold rounded-lg"
          >
            Signup
          </Button>
        </div>
      )}
    </nav>
  );
};
