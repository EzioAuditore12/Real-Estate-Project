import { createFileRoute, Link } from '@tanstack/react-router';

import { type Variants, motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Users,
  Key,
  ArrowRight,
  Github,
  Code,
  Sparkles,
  Home as HomeIcon,
} from 'lucide-react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
} satisfies Variants;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
} satisfies Variants;

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
} satisfies Variants;

function RouteComponent() {
  return (
    <div className="from-background via-background to-muted/20 min-h-screen bg-gradient-to-br">
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="mb-16 space-y-6 text-center"
          variants={itemVariants}
        >
          <motion.div
            className="mb-4 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Building2 className="text-primary h-12 w-12" />
            <h1 className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
              Real Estate
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4" />
              Student Project - Work in Progress
            </Badge>
          </motion.div>

          <motion.p
            className="text-muted-foreground mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl"
            variants={itemVariants}
          >
            A modern real estate management platform built by a student using
            Vite + TanStack (Router & Query), Spring Boot, and PostgreSQL.
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-16 grid gap-8 md:grid-cols-3"
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="bg-card/50 border-0 shadow-lg backdrop-blur">
              <CardContent className="p-8 text-center">
                <Users className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">User Management</h3>
                <p className="text-muted-foreground">
                  Dashboards tailored for tenants and managers.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="bg-card/50 border-0 shadow-lg backdrop-blur">
              <CardContent className="p-8 text-center">
                <HomeIcon className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">
                  Property Listings
                </h3>
                <p className="text-muted-foreground">
                  Browse and manage listings efficiently.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="bg-card/50 border-0 shadow-lg backdrop-blur">
              <CardContent className="p-8 text-center">
                <Key className="text-primary mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-xl font-semibold">Secure Access</h3>
                <p className="text-muted-foreground">
                  JWT authentication with role-based permissions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="mb-16 text-center" variants={itemVariants}>
          <h2 className="mb-8 text-3xl font-bold">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Vite + TanStack',
              'React 18',
              'TypeScript',
              'Spring Boot',
              'PostgreSQL',
              'Tailwind CSS',
              'Framer Motion',
              'Shadcn/ui',
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08 }}
              >
                <Badge variant="outline" className="px-3 py-1">
                  <Code className="mr-1 h-3 w-3" />
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link to="/login/tenant">
                Login
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              <Link to="/register/tenant">Register</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              <Link to="/landing">Landing</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-border/50 mt-16 space-y-3 border-t pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-muted-foreground">
            This ongoing academic project is being crafted by a dedicated
            student.
          </p>
          <motion.div
            className="flex justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <Badge variant="secondary" className="px-4 py-2">
              <Github className="mr-2 h-4 w-4" />
              Open Source Initiative
            </Badge>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
