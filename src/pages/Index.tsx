import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PoemGenerator from "@/components/PoemGenerator";
// import PoemHistory from "@/components/PoemHistory";
import CollectedPoems from "@/components/CollectedPoems";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { useState } from "react";
const Index = () => {
  const [refreshKey, setRefreshKey] = useState(
    Math.floor(Math.random() * 1000)
  );
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <PoemGenerator setRefreshKey={setRefreshKey} />
        <CollectedPoems refreshKey={refreshKey} />
        {/* <PoemHistory /> */}
        {/* <About /> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
