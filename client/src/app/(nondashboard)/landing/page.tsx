"use client";

import React from "react";
import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { DiscoverSection } from "./components/discover-section";
import { CallToActionSection } from "./components/callToAction-section";
import FooterSection from "./components/footer-section";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </>
  );
};

export default Landing;
