"use client";

import Link from "next/link";
import { type Variants, motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Key,
  ArrowRight,
  Github,
  Code,
  Sparkles,
  Home as HomeIcon,
} from "lucide-react";

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
    transition: { duration: 0.6, ease: "easeOut" },
  },
} satisfies Variants;

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
} satisfies Variants;

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center space-y-6 mb-16"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Building2 className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Real Estate
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Student Project - Work in Progress
            </Badge>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            A modern real estate management platform built by a student using
            Next.js, Spring Boot, and PostgreSQL.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <p className="text-muted-foreground">
                  Dashboards tailored for tenants and managers.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <HomeIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Property Listings
                </h3>
                <p className="text-muted-foreground">
                  Browse and manage listings efficiently.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} whileHover="hover">
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur">
              <CardContent className="p-8 text-center">
                <Key className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                <p className="text-muted-foreground">
                  JWT authentication with role-based permissions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-8">Technologies Used</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Next.js 15",
              "React 18",
              "TypeScript",
              "Spring Boot",
              "PostgreSQL",
              "Tailwind CSS",
              "Framer Motion",
              "Shadcn/ui",
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.08 }}
              >
                <Badge variant="outline" className="px-3 py-1">
                  <Code className="h-3 w-3 mr-1" />
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="lg" className="px-8 py-3 text-lg">
              <Link href="/login">
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
              <Link href="/register">Register</Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="px-8 py-3 text-lg"
            >
              <Link href="/landing">Landing</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16 pt-8 border-t border-border/50 space-y-3"
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
              <Github className="h-4 w-4 mr-2" />
              Open Source Initiative
            </Badge>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
