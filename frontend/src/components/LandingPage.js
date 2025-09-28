import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Award,
  Recycle,
  Truck,
  ChevronRight,
  Play,
  MapPin,
  Clock,
  Star,
} from "lucide-react";

import { useAuth } from "../App";

// Import your images
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import bg5 from "../assets/bg5.jpg";
import bg6 from "../assets/bg6.jpg";

// Import your splash video
import introVideo from "../assets/intro.mp4";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    wasteCollected: 0,
    citizensInvolved: 0,
    ecoPoints: 0,
  });

  // Hero slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [bg1, bg2, bg3, bg4, bg5, bg6];

  // Splash video state
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    // Animated stats counter
    const animateStats = () => {
      const targets = {
        wasteCollected: 1247,
        citizensInvolved: 8932,
        ecoPoints: 45678,
      };
      const duration = 1200;
      const steps = 40;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setStats({
          wasteCollected: Math.floor(targets.wasteCollected * progress),
          citizensInvolved: Math.floor(targets.citizensInvolved * progress),
          ecoPoints: Math.floor(targets.ecoPoints * progress),
        });

        if (currentStep >= steps) clearInterval(timer);
      }, stepDuration);
    };

    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Hero slider auto-change every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDashboardAccess = (role) => {
    if (user && user.role === role) {
      navigate(`/${role}`);
    } else {
      navigate("/login", { state: { role } });
    }
  };

  // Return either splash video or website
  if (showVideo) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video
          src={introVideo}
          autoPlay
          muted
          className="w-full h-full object-cover"
          onEnded={() => setShowVideo(false)}
        />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-100 to-lime-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-2 rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-emerald-900">T2T</h1>
                <p className="text-sm text-emerald-600">Trash to Track</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-emerald-700">
                    Welcome, {user.name || "User"}!
                  </span>
                  <button
                    onClick={() => navigate(`/${user.role}`)}
                    className="btn-primary"
                  >
                    Go to Dashboard
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-secondary"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    className="btn-primary"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Sliding Background */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${img})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-emerald-400 drop-shadow-lg">
            Transform Trash to Track
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl">
            Join our community-driven waste management platform. Report issues,
            track collections, earn rewards, and help build a cleaner, more
            sustainable future for everyone.
          </p>

          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:scale-105 transition flex items-center space-x-2"
            >
              <span>Start Making Impact</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button className="px-6 py-3 rounded-full bg-white/90 text-emerald-700 font-semibold shadow-lg hover:scale-105 transition flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch How It Works</span>
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section
      >
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-emerald-800 mb-2">
                  {stats.wasteCollected.toLocaleString()}
                </h3>
                <p className="text-emerald-700 font-medium">
                  Tons of Waste Collected
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-blue-800 mb-2">
                  {stats.citizensInvolved.toLocaleString()}
                </h3>
                <p className="text-blue-700 font-medium">Active Citizens</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-amber-800 mb-2">
                  {stats.ecoPoints.toLocaleString()}
                </h3>
                <p className="text-amber-700 font-medium">Eco-Points Earned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              How T2T Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to make a lasting environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card card-eco text-center group">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                1. Report
              </h3>
              <p className="text-gray-600">
                Citizens report waste issues with photos and GPS location. Track
                your reports from submission to resolution.
              </p>
            </div>

            <div className="card card-eco text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-600 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <Truck className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                2. Collect
              </h3>
              <p className="text-gray-600">
                Sanitation workers receive optimized routes and schedules.
                Real-time updates ensure efficient waste collection.
              </p>
            </div>

            <div className="card card-eco text-center group">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 rounded-2xl mb-6 mx-auto w-fit group-hover:scale-110 transition-transform duration-300">
                <Award className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                3. Reward
              </h3>
              <p className="text-gray-600">
                Earn eco-points for participation. Unlock badges, climb
                leaderboards, and contribute to a cleaner community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                initials: "SM",
                name: "Sarah Martinez",
                role: "Local Resident",
                text: "T2T has transformed how our neighborhood handles waste. I've earned over 500 eco-points and our street is cleaner than ever!",
              },
              {
                initials: "MJ",
                name: "Mike Johnson",
                role: "Sanitation Worker",
                text: "The route optimization feature saves me hours every day. I can serve more areas efficiently and citizens get faster responses.",
              },
              {
                initials: "DC",
                name: "Dr. Chen",
                role: "Municipal Administrator",
                text: "The analytics dashboard gives us unprecedented insight into waste patterns. We've improved efficiency by 40% since implementing T2T.",
              },
            ].map((t, i) => (
              <div key={i} className="card">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900">{t.name}</h4>
                    <p className="text-gray-600">{t.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-2 rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">T2T - Trash to Treasure</h3>
                  <p className="text-emerald-200">Building sustainable communities</p>
                </div>
              </div>
              <p className="text-emerald-100 mb-4">
                Join the movement towards a cleaner, more sustainable future.
                Every report, every collection, every point earned makes a
                difference.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community Impact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Download App</h4>
              <div className="space-y-3">
                <div className="bg-emerald-800 p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-emerald-700 transition-colors">
                  <div className="bg-white p-1 rounded">
                    <Clock className="h-4 w-4 text-emerald-900" />
                  </div>
                  <span className="text-sm">Coming Soon to App Store</span>
                </div>
                <div className="bg-emerald-800 p-3 rounded-lg flex items-center space-x-3 cursor-pointer hover:bg-emerald-700 transition-colors">
                  <div className="bg-white p-1 rounded">
                    <Clock className="h-4 w-4 text-emerald-900" />
                  </div>
                  <span className="text-sm">Coming Soon to Google Play</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-800 mt-8 pt-8 text-center text-emerald-200">
            <p>
              &copy; {new Date().getFullYear()} T2T - Trash to Treasure. All
              rights reserved. Building a sustainable future together.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
