import React from 'react';
import Navbar from './components/Navbar';
import SectionBoundary from './components/SectionBoundary';
import Hero from './sections/Hero';
import Ingredients from './sections/Ingredients';
import Procedure from './sections/Procedure';
import LabAnimation from './sections/LabAnimation';
import Diagrams from './sections/Diagrams';
import MediaSection from './sections/Media';
import Advantages from './sections/Advantages';
import Team from './sections/Team';
import Acknowledgement from './sections/Acknowledgement';
import Reactions from './sections/Reactions';
import Quiz from './sections/Quiz';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-lab-orange selection:text-white transition-colors duration-500">
      <Navbar />
      
      <main>
        <Hero />
        <SectionBoundary />
        <Ingredients />
        <SectionBoundary />
        <Procedure />
        <SectionBoundary />
        <LabAnimation />
        <SectionBoundary />
        <Reactions />
        <SectionBoundary />
        <Diagrams />
        <SectionBoundary />
        <MediaSection />
        <SectionBoundary />
        <Quiz />
        <SectionBoundary />
        <Advantages />
        <SectionBoundary />
        <Team />
        <SectionBoundary />
        <Acknowledgement />
      </main>

      <Footer />
    </div>
  );
}

export default App;
