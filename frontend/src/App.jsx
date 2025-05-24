import React from 'react'
import {Routes , Route} from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Main from "./pages/Main.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/about" element={<Contact/>}/>
      <Route path="/contact" element={<PrivacyPolicy/>}/>
      <Route path="/privacy-policy" element={<Main/>}/>
      {/* <Route path="" element={}/> */}

    </Routes>
  )
}

export default App