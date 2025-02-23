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
    <div className="min-h-screen bg-[#f8faff]">
      {/* Base layer */}
      <div className="fixed inset-0 bg-gradient-to-b from-white/40 via-blue-50/20 to-white/40" />
      
      {/* Blur layer */}
      <div 
        className="fixed inset-0 backdrop-blur-[6px]"
        style={{
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(236, 246, 255, 0.6), rgba(255, 255, 255, 0.8))',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
        }}
      />

      {/* Mesh gradient for texture */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at 80% 0%, rgb(236, 246, 255) 0px, transparent 50%),
            radial-gradient(at 0% 50%, rgb(236, 246, 255) 0px, transparent 50%),
            radial-gradient(at 80% 50%, rgb(236, 246, 255) 0px, transparent 50%)
          `
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed w-full top-0 bg-white/80 backdrop-blur-[2px] z-50"
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
                <span className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                    Echo
                  </span>
                  <span className="bg-gradient-to-r from-green-800 to-gray-900 bg-clip-text text-transparent">
                    Doc
                  </span>
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
              <Link href="/sign-in">
                <Button 
                  size="sm" 
                  className="
                    bg-gradient-to-r from-green-600 to-green-500 
                    hover:from-green-700 hover:to-green-600
                    text-white px-6 py-2 rounded-full
                    transition-all duration-200 shadow-sm 
                    hover:shadow-md hover:shadow-green-100
                    border border-green-400/20 font-bold
                  "
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </motion.nav>

        <section className="relative pt-40 pb-32">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[1000px] mx-auto text-center space-y-8"
            >
              <h1 className="text-[3.75rem] leading-[1.1] font-bold tracking-tight">
                <span className="bg-gradient-to-r from-gray-900 via-green-800 to-green-600 bg-clip-text text-transparent">
                  Revolutionizing
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-700 via-green-600 to-gray-900 bg-clip-text text-transparent">
                  Patient Management
                </span>
              </h1>
              <p className="text-[1.25rem] text-gray-600 leading-[1.6] max-w-2xl mx-auto font-normal">
                Empower your medical practice with AI-driven voice cloning technology.
                Streamline patient interactions, automate scheduling, and enhance care delivery.
              </p>
              <div className="flex justify-center items-center gap-3 pt-2">
                <Button 
                  size="lg" 
                  className="
                    h-11 px-6
                    bg-green-600 hover:bg-green-700
                    text-white font-medium
                    rounded-md
                    transition-all duration-200
                  "
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="
                    h-11 px-6
                    border border-gray-200
                    text-gray-700 font-medium
                    hover:bg-gray-50
                    rounded-md
                    transition-all duration-200
                  "
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="container mx-auto px-6 mt-32">
            <div className="grid md:grid-cols-3 gap-6">
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
                  className="p-6 bg-white rounded-lg border border-gray-100
                             hover:border-gray-200 transition-all duration-200 
                             hover:shadow-sm"
                >
                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center 
                                justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Bento staggerContainer={staggerContainer} fadeIn={fadeIn} />
        <Footer />
      </div>
    </div>
  );
}
