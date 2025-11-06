import { createFileRoute } from '@tanstack/react-router';

import { HeroSection } from '@/features/app/landing/sections/hero';
import { FeaturesSection } from '@/features/app/landing/sections/features';
import { DiscoverSection } from '@/features/app/landing/sections/discover';
import { CallToActionSection } from '@/features/app/landing/sections/call-to-action';
import { FooterSection } from '@/features/app/landing/sections/footer';

export const Route = createFileRoute('/(nondashboard)/landing')({
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
