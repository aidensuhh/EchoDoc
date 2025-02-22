"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Brain, Calendar, FileText, Mic2, Phone, UserCog } from "lucide-react";
import Bento from "@/components/Bento";
import { Footer } from "@/components/footer";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const bentoFeatures = [
  {
    name: "Voice Cloning Technology",
    description:
      "Create perfect digital replicas of your voice for consistent and personalized patient interactions.",
    Icon: Mic2,
    className: "md:col-span-2",
    href: "/features/voice-cloning",
    cta: "Learn about voice cloning",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Mic2 className="w-72 h-72" />
      </div>
    ),
  },
  {
    name: "Smart Patient Routing",
    description:
      "AI-powered system that intelligently directs patient calls to the right department or specialist.",
    Icon: Phone,
    className: "md:col-span-1",
    href: "/features/patient-routing",
    cta: "Explore routing system",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Phone className="w-40 h-40" />
      </div>
    ),
  },
  {
    name: "Automated Scheduling",
    description:
      "Real-time calendar synchronization with smart conflict resolution and optimal time slot suggestions.",
    Icon: Calendar,
    className: "md:col-span-1",
    href: "/features/scheduling",
    cta: "See it in action",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Calendar className="w-72 h-72" />
      </div>
    ),
  },
  {
    name: "Medical History Analysis",
    description:
      "Advanced processing of patient records to provide contextual information during interactions.",
    Icon: FileText,
    className: "md:col-span-2",
    href: "/features/medical-history",
    cta: "View capabilities",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <FileText className="w-56 h-56" />
      </div>
    ),
  },
  {
    name: "AI-Powered Diagnosis Support",
    description:
      "Assist in preliminary symptom assessment and provide relevant medical information.",
    Icon: Brain,
    className: "md:col-span-2",
    href: "/features/ai-diagnosis",
    cta: "Discover AI features",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Brain className="w-40 h-40" />
      </div>
    ),
  },
  {
    name: "Patient Profile Management",
    description:
      "Comprehensive dashboard for managing patient information, preferences, and interaction history.",
    Icon: UserCog,
    className: "md:col-span-1",
    href: "/features/profile-management",
    cta: "View dashboard",
    background: (
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <UserCog className="w-72 h-72" />
      </div>
    ),
  },
];

export default function Home() {
  return (
    <div className="bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed w-full top-0 bg-background/80 backdrop-blur-sm z-50 border-b"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            <Link href="/" className="text-2xl font-bold">
              ECHODOC
            </Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {["Company", "Blog", "Demo"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/sign-in">
                <Button variant="outline">Login</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-6xl font-serif mb-6 font-fraunces"
            >
              The Ultimate AI Suite for Patient Care Management
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl text-muted-foreground mb-8"
            >
              AI that handles patient calls, appointments, and reporting for
              your practice. From service booking to patient care, and
              everything in between.
            </motion.p>
            <motion.div variants={fadeIn} className="flex justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Talk to EchoDoc
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline">
                  Book a Demo →
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-fraunces text-center mb-8"
        >
          Our Core Services
        </motion.h1>
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Voice Cloning",
                description:
                  "Clone your voice for personalized patient interactions, maintaining your unique connection with each patient.",
              },
              {
                title: "Smart Scheduling",
                description:
                  "Automated appointment booking that syncs with your calendar in real-time.",
              },
              {
                title: "Patient Management",
                description:
                  "Comprehensive patient profiles with medical history, preferences, and interaction logs.",
              },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="p-6 h-full border border-border/50 hover:border-border transition-colors">
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Bento staggerContainer={staggerContainer} fadeIn={fadeIn} />
      <Footer />
    </div>
  );
}
