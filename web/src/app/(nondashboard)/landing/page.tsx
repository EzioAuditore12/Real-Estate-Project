import { createFileRoute } from '@tanstack/react-router';

import { HeroSection } from './-sections/hero';
import { FeaturesSection } from './-sections/features';
import { DiscoverSection } from './-sections/discover';
import { CallToActionSection } from './-sections/call-to-action';
import { FooterSection } from './-sections/footer';

export const Route = createFileRoute('/(nondashboard)/landing/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </>
  );
}
