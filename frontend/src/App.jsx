import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Main from "./pages/Main.jsx";
import Premium from "./pages/Premium.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import FAQ from "./pages/FAQ.jsx";
import Terms from './pages/Terms.jsx';
import ErrorPage from "./pages/ErrorPage.jsx";

const App = () => {
  console.log("App component rendering...");
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/main" element={<Main />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
