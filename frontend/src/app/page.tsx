"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Brain, Calendar, FileText, Mic2, Phone, UserCog, Stethoscope, Pill, Syringe, Thermometer, HeartPulse } from "lucide-react";
import React from "react";
import { Footer } from "@/components/footer";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import Bento from "@/components/Bento";

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

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.5
    }
  }
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
  // ... add back other bento features
];

export default function Home() {
  const [dimensions, setDimensions] = React.useState({ width: 1200, height: 800 });

  React.useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Base gradient layer */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-white via-green-50/5 to-blue-50/5"
          style={{
            backdropFilter: 'blur(60px)',
          }} 
        />
      </div>

      {/* Floating medical icons with constrained areas */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => ( // Reduced number of icons
          <motion.div
            key={i}
            className="absolute text-green-600/20" // Adjusted color and opacity
            initial={{
              x: Math.random() > 0.5 
                ? Math.random() * dimensions.width * 0.2 // Left 20%
                : dimensions.width * 0.8 + Math.random() * dimensions.width * 0.2, // Right 20%
              y: Math.random() * dimensions.height,
              scale: Math.random() * 0.3 + 0.3, // Smaller icons
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [null, 
                Math.random() > 0.5
                  ? Math.random() * dimensions.width * 0.2
                  : dimensions.width * 0.8 + Math.random() * dimensions.width * 0.2
              ],
              y: [null, Math.random() * dimensions.height],
              rotate: [null, Math.random() * 360],
            }}
            transition={{
              duration: Math.random() * 25 + 35, // Slower movement
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[
              <Stethoscope key="stethoscope1" size={48} className="filter drop-shadow-[0_2px_10px_rgba(22,163,74,0.2)]" />,
              <Pill key="pill" size={40} className="filter drop-shadow-[0_2px_10px_rgba(22,163,74,0.2)]" />,
              <Syringe key="syringe" size={44} className="filter drop-shadow-[0_2px_10px_rgba(22,163,74,0.2)]" />,
              <HeartPulse key="heartpulse" size={48} className="filter drop-shadow-[0_2px_10px_rgba(22,163,74,0.2)]" />,
            ][i % 4]}
          </motion.div>
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(22, 163, 74, 0.08), transparent 70%)'
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
            <div className="hidden md:flex items-center gap-6">
              {/* Navigation Links */}
              <nav className="flex items-center gap-8 mr-4">
                {["Features", "About", "Contact"].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="
                        text-sm font-medium
                        text-gray-600 
                        hover:text-gray-900 
                        transition-all duration-300
                        relative
                        py-2
                        after:content-['']
                        after:absolute
                        after:w-0
                        after:h-[2px]
                        after:bg-green-500
                        after:left-0
                        after:-bottom-[2px]
                        after:transition-all
                        after:duration-300
                        hover:after:w-full
                      "
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Login Button */}
              <Link href="/sign-in">
                <Button 
                  size="sm" 
                  className="
                    bg-gradient-to-r from-green-500 to-green-400 
                    hover:from-green-600 hover:to-green-500
                    text-white px-8 py-2 
                    h-9
                    rounded-full
                    transition-all duration-300 
                    shadow-sm 
                    hover:shadow-[0_4px_12px_rgba(22,163,74,0.15)]
                    border border-green-400/20 
                    font-bold
                    transform hover:scale-[1.02]
                    text-sm
                  "
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </motion.nav>

        <section className="relative pt-40 pb-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-[1000px] mx-auto text-center space-y-6"
            >
              <h1 className="text-[5rem] leading-[1.1] font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-gray-900 via-green-800 to-green-600 bg-clip-text text-transparent">
                  Revolutionizing
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-700 via-green-600 to-gray-900 bg-clip-text text-transparent">
                  Patient Management
                </span>
              </h1>
              <p className="text-[1.1rem] text-gray-600 leading-[1.6] max-w-[720px] mx-auto font-normal tracking-tight">
                AI that multiplies you—from 1 voice to 100 patient conversations. <br />
                10-minute setup today, full schedule by breakfast tomorrow.
              </p>
              <div className="flex justify-center items-center gap-3 pt-5">
                <Button 
                  size="lg" 
                  className="
                    px-6 h-10
                    bg-gradient-to-r from-green-600 to-green-500
                    hover:from-green-700 hover:to-green-600
                    text-white text-[0.925rem] font-bold
                    rounded-md
                    transition-all duration-300
                    shadow-[0_1px_2px_rgba(0,0,0,0.05)]
                    hover:shadow-[0_4px_12px_rgba(22,163,74,0.2)]
                    flex items-center justify-center
                    transform hover:scale-[1.02]
                    border border-green-500/20
                  "
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="
                    px-6 h-10
                    border border-gray-200
                    text-gray-600 text-[0.925rem] font-bold
                    hover:text-gray-900
                    hover:border-green-200
                    hover:bg-green-50/30
                    rounded-md
                    transition-all duration-300
                    flex items-center justify-center
                    transform hover:scale-[1.02]
                    hover:shadow-[0_4px_12px_rgba(22,163,74,0.1)]
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
                <motion.div
                  key={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Card 
                    className="
                      p-6 bg-white/80 rounded-lg border border-gray-100
                      hover:border-green-200 transition-all duration-300 
                      hover:shadow-[0_4px_12px_rgba(22,163,74,0.08)]
                      hover:bg-gradient-to-br hover:from-white hover:to-green-50/30
                    "
                  >
                    <motion.div 
                      className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-base font-semibold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 mt-8 mb-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`feature-icon-${i}`}
                className="absolute text-green-600/10"
                initial={{
                  x: Math.random() * dimensions.width,
                  y: Math.random() * dimensions.height,
                  scale: Math.random() * 0.3 + 0.2,
                  rotate: Math.random() * 360,
                }}
                animate={{
                  x: [null, Math.random() * dimensions.width],
                  y: [null, Math.random() * dimensions.height],
                  rotate: [null, Math.random() * 360],
                }}
                transition={{
                  duration: Math.random() * 20 + 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[
                  <FileText key="file" size={48} className="text-green-500/20" />,
                  <Brain key="brain" size={44} className="text-green-600/20" />,
                  <Calendar key="calendar" size={40} className="text-green-400/20" />,
                  <UserCog key="user" size={46} className="text-green-500/20" />,
                  <Phone key="phone" size={42} className="text-green-600/20" />,
                  <Mic2 key="mic" size={48} className="text-green-400/20" />,
                ][i]}
              </motion.div>
            ))}
          </div>

          <Bento staggerContainer={staggerContainer} fadeIn={fadeIn} />
        </div>

        <Footer />
      </div>
    </div>
  );
}
