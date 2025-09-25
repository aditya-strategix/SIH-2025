import React from "react";
import { Link } from "react-router-dom";

const dashboardCards = [
  {
    id: 1,
    title: "AI Chat & Journaling",
    description: "Chat with our AI or journal your thoughts.",
    icon: "smart_toy",
    iconBg: "#EBF1FF",
    iconColor: "#4A72FF",
    link: "/chatbot"  // Updated to link to chatbot
  },
  {
    id: 2,
    title: "Book Counsellor",
    description: "Schedule a session with a certified counsellor.",
    icon: "calendar_month",
    iconBg: "#E6FAF5",
    iconColor: "#1D9A7A",
    link: "/counselors"
  },
  {
    id: 3,
    title: "Resource Hub",
    description: "Access articles, videos, and exercises.",
    icon: "library_books",
    iconBg: "#FFF4E6",
    iconColor: "#FFA82B",
    link: "/resources"
  },
  {
    id: 4,
    title: "Peer Forum",
    description: "Connect with peers in a safe space.",
    icon: "groups",
    iconBg: "#F0EBFF",
    iconColor: "#7E57C2",
    link: "/resources"  // Can be updated when peer forum is implemented
  },
  {
    id: 5,
    title: "Daily Mood Check-in",
    description: "Track your mood and identify patterns.",
    icon: "sentiment_satisfied",
    iconBg: "#FFEBF0",
    iconColor: "#F75A7F",
    link: "/phq9"
  },
];

const Dashboard = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Welcome, Student!</h1>
              <p className="text-gray-500 mt-1">Your mental wellness journey starts here.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {dashboardCards.map(card => (
                <Link
                  key={card.id}
                  to={card.link}
                  className="group flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex-shrink-0 mb-4 p-4 rounded-full" style={{ backgroundColor: card.iconBg }}>
                    <span className="material-symbols-outlined text-4xl" style={{ color: card.iconColor }}>
                      {card.icon}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6">
          <p className="text-center text-sm text-gray-500">MindfulU - Empowering Student Mental Wellness</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
