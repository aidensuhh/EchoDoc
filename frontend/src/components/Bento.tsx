import { motion } from "framer-motion";
import { Mic2, Phone, Calendar, FileText, Brain, UserCog } from "lucide-react";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import React from "react";

const Bento = ({
  staggerContainer,
  fadeIn,
}: {
  staggerContainer: any;
  fadeIn: any;
}) => {
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
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div
            variants={fadeIn}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-fraunces mb-4">
              Comprehensive Feature Set
            </h2>
            <p className="text-muted-foreground">
              Everything you need to revolutionize your patient care management
              system
            </p>
          </motion.div>
          <motion.div variants={fadeIn}>
            <BentoGrid>
              {bentoFeatures.map((feature) => (
                <BentoCard
                  key={feature.name}
                  name={feature.name}
                  description={feature.description}
                  Icon={feature.Icon}
                  className={feature.className}
                  href={feature.href}
                  cta={feature.cta}
                  background={feature.background}
                />
              ))}
            </BentoGrid>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Bento;
