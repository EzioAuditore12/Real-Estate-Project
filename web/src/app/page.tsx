import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';

import { motion, type Variants } from 'motion/react';
import { useJoyride } from 'react-joyride';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
  Building2,
  MapPin,
  Search,
  ShieldCheck,
  ArrowRight,
  Home,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const steps = [
  {
    target: '.tour-search',
    content:
      'Search across more than 114,000 rental property listings using location-aware discovery.',
  },
  {
    target: '.tour-listings',
    content:
      'Explore property details including pricing, amenities, photos, and location information.',
  },
  {
    target: '.tour-management',
    content:
      'Property managers can efficiently manage listings, applications, and tenant interactions.',
  },
  {
    target: '.tour-login',
    content:
      'Continue to the Manager Portal to access property management tools.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.1,
    },
  },
} satisfies Variants;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
} satisfies Variants;

function RouteComponent() {
  const { controls, on, Tour } = useJoyride({
    continuous: true,
    steps,
  });

  useEffect(() => {
    controls.start();

    return on('tour:end', () => {
      console.log('Tour completed');
    });
  }, [controls, on]);

  return (
    <div className="bg-background min-h-screen">
      {Tour}

      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mx-auto mb-20 max-w-4xl text-center"
          variants={itemVariants}
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <Building2 className="h-12 w-12" />
            <h1 className="text-5xl font-bold md:text-7xl">Rental PG Finder</h1>
          </div>

          <p className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl">
            Discover verified PGs, rooms, apartments, and rental properties
            through location-aware search. Explore nearby accommodations,
            compare amenities, and connect directly with property managers.
          </p>
        </motion.div>

        <motion.div
          className="mb-20 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="tour-search">
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="mx-auto mb-4 h-12 w-12" />

                <h3 className="mb-3 text-xl font-semibold">
                  Location-Aware Search
                </h3>

                <p className="text-muted-foreground">
                  Search across more than 114,000 property listings using
                  geospatial location discovery.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="tour-listings">
            <Card>
              <CardContent className="p-8 text-center">
                <Home className="mx-auto mb-4 h-12 w-12" />

                <h3 className="mb-3 text-xl font-semibold">
                  Verified Listings
                </h3>

                <p className="text-muted-foreground">
                  Browse rental properties with detailed descriptions,
                  amenities, pricing, and location information.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="tour-management">
            <Card>
              <CardContent className="p-8 text-center">
                <ShieldCheck className="mx-auto mb-4 h-12 w-12" />

                <h3 className="mb-3 text-xl font-semibold">
                  Property Management
                </h3>

                <p className="text-muted-foreground">
                  Manage listings, applications, and tenant interactions through
                  a centralized dashboard.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="mx-auto mb-20 max-w-5xl" variants={itemVariants}>
          <Card>
            <CardContent className="space-y-6 p-10">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6" />
                <h2 className="text-3xl font-bold">About The Platform</h2>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Rental PG Finder is a location-aware rental property platform
                designed to simplify property discovery and management.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                The platform supports more than 114,000 indexed property records
                and enables geospatial property search using PostgreSQL and
                PostGIS for fast and accurate location-based discovery.
              </p>

              <p className="text-muted-foreground text-lg leading-relaxed">
                Property managers can publish and manage listings, while tenants
                can explore accommodations, compare options, and discover nearby
                rental opportunities.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="tour-login flex justify-center"
          variants={itemVariants}
        >
          <Button asChild size="lg" className="px-10 py-6 text-lg">
            <Link to="/login/manager">
              Continue to Manager Portal
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          className="mt-20 border-t pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-muted-foreground text-sm">
            Rental PG Finder — Location-aware rental property discovery and
            management platform.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
