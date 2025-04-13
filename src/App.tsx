import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Events from './pages/Events';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Business from './pages/Business';
import Hackathons from './pages/Hackathons';
import Profile from './pages/Profile';
import ProjectSubmission from './pages/ProjectSubmission';
import TeamWorkspace from './pages/TeamWorkspace';
import SplashScreen from './components/SplashScreen';
import Philosophy from './pages/Philosophy';

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the splash screen
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    const lastVisitTime = localStorage.getItem('lastVisitTime');
    
    // Define the time threshold (7 days in milliseconds)
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    
    // Get current time
    const currentTime = new Date().getTime();
    
    // If they haven't seen it or it's been more than 7 days since last visit
    if (!hasSeenSplash || !lastVisitTime || (currentTime - parseInt(lastVisitTime)) > SEVEN_DAYS) {
      // Show the splash screen
      setShowSplash(true);
    }
    
    // Update the last visit time
    localStorage.setItem('lastVisitTime', currentTime.toString());
  }, []);

  const handleSplashComplete = () => {
    // Set the flag in localStorage to indicate the user has seen the splash screen
    localStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/events" element={<Events />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/login" element={<Login />} />
            <Route path="/business" element={<Business />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/project-submission" element={<ProjectSubmission />} />
            <Route path="/team-workspace" element={<TeamWorkspace />} />
            <Route path="/philosophy" element={<Philosophy />} />
          </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
