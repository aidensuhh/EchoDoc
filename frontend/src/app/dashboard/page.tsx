"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { PatientAgentCard } from "@/components/PatientAgentCard";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { PatientModal } from "@/components/PatientModal";

// Define the Patient type
interface Patient {
  id: string;
  name: string;
  avatarUrl?: string;
  lastCall?: string;
  nextAppointment?: string;
  status: "active" | "inactive" | "calling";
  phoneNumber: string;
}

export default function Page() {
  // Sample data - replace with actual data fetching
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      phoneNumber: "+1 (555) 123-4567",
      status: "active",
      lastCall: "2024-02-15 14:30",
      nextAppointment: "2024-03-20 10:00",
    },
    {
      id: "2",
      name: "Jane Foe",
      phoneNumber: "+1 (416) 123-1923",
      status: "inactive",
      lastCall: "2024-03-15 14:30",
      nextAppointment: "2024-05-03 11:11",
    },
    {
      id: "3",
      name: "Blayne Carpet",
      phoneNumber: "+1 (437) 888-4567",
      status: "calling",
      lastCall: "2024-04-15 15:37",
      nextAppointment: "2024-03-28 12:00",
    },
    // Add more sample patients as needed
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>();
  const [modalMode, setModalMode] = useState<"edit" | "add">("edit");
  const [lastId, setLastId] = useState(patients.length);

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((patient) => patient.id !== id));
  };

  const handleStartAgent = (id: string) => {
    setPatients(
      patients.map((patient) =>
        patient.id === id
          ? {
              ...patient,
              status: patient.status === "calling" ? "active" : "calling",
            }
          : patient
      )
    );
  };

  const handleViewDetails = (id: string) => {
    const patient = patients.find((p) => p.id === id);
    setSelectedPatient(patient);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleAddPatient = () => {
    setSelectedPatient(undefined);
    setModalMode("add");
    setIsModalOpen(true);
    setLastId(lastId + 1);
  };

  const handleSavePatient = (updatedPatient: Patient) => {
    if (modalMode === "edit") {
      setPatients(
        patients.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
      );
    } else {
      setPatients([...patients, updatedPatient]);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Patient Agents</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {patients.map((patient) => (
              <PatientAgentCard
                key={patient.id}
                patient={patient}
                onDelete={handleDeletePatient}
                onCall={handleStartAgent}
                onViewDetails={handleViewDetails}
              />
            ))}

            <Card
              className="flex h-[200px] cursor-pointer items-center justify-center hover:bg-accent/50 transition-colors"
              onClick={handleAddPatient}
            >
              <CardContent className="flex flex-col items-center gap-2 text-muted-foreground">
                <Plus className="h-8 w-8" />
                <p>Add New Patient</p>
              </CardContent>
            </Card>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
      <PatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePatient}
        patient={selectedPatient as any}
        patientId={(lastId + 1).toString()}
        mode={modalMode}
      />
    </SidebarProvider>
  );
}
