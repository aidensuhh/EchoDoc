"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useUser } from "@clerk/nextjs";

export default function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const { user } = useUser();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              {user?.firstName || "Doctor"}'s Schedule
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your appointments and availability
            </p>
          </div>

          <Card className="p-6 max-w-sm">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow"
            />
          </Card>

          {date && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Selected Date: {date.toLocaleDateString()}
              </h2>
              <p className="text-muted-foreground">
                No appointments scheduled for this day
              </p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 