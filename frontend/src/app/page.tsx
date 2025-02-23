"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white relative">
      {/* Base gradient layer */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-white pointer-events-none"
      />

      {/* Blur effect layer */}
      <div 
        className="absolute inset-0 backdrop-blur-[8px]"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed w-full top-0 bg-white/60 backdrop-blur-sm z-50 border-b border-gray-100"
        >
          <div className="container mx-auto px-6 h-16 flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="EchoDoc Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <span className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-green-700 to-green-500 bg-clip-text text-transparent">
                  EchoDoc
                </span>
              </Link>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              {["Features", "About", "Contact"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-4">
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.nav>

        <section className="relative pt-36 pb-28 overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center space-y-10"
            >
              <h1 className="text-6xl font-bold tracking-tight">
                Revolutionizing Patient Management System
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Empower your medical practice with AI-driven voice cloning technology. 
                Streamline patient interactions, automate scheduling, and enhance care delivery.
              </p>
              <div className="flex justify-center gap-6 pt-4">
                <Button size="lg" className="px-8 bg-green-600 hover:bg-green-700 text-white">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="px-8 border-green-200 hover:bg-green-50">
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="container mx-auto px-6 mt-24">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mic2 className="h-6 w-6 text-green-600" />,
                  title: "Voice Cloning",
                  description: "Create perfect digital replicas of your voice for consistent patient interactions."
                },
                {
                  icon: <Calendar className="h-6 w-6 text-green-600" />,
                  title: "Smart Scheduling",
                  description: "Automated appointment booking with real-time calendar synchronization."
                },
                {
                  icon: <Brain className="h-6 w-6 text-green-600" />,
                  title: "AI-Powered Analysis",
                  description: "Intelligent processing of patient data for better care decisions."
                }
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="p-8 bg-white/70 backdrop-blur-[1px] border border-green-100/20 
                             hover:border-green-200/40 transition-all duration-300 
                             hover:shadow-lg hover:shadow-green-100/10 group"
                >
                  <div className="h-12 w-12 rounded-lg bg-green-50/80 flex items-center 
                                  justify-center mb-6 group-hover:bg-green-100/80 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Bento />
        <Footer />
      </div>
    </div>
  );
}
