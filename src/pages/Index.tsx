
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PoemGenerator from '@/components/PoemGenerator';
import PoemHistory from '@/components/PoemHistory';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PoemGenerator />
        <PoemHistory />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
