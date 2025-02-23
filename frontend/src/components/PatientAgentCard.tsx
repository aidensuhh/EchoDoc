import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic2, Phone, Calendar, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PatientAgentCardProps {
  patient: {
    id: string;
    name: string;
    avatarUrl?: string;
    lastCall?: string;
    nextAppointment?: string;
    status: "active" | "inactive" | "calling";
    phoneNumber: string;
  };
  onDelete: (id: string) => void;
  onCall: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function PatientAgentCard({
  patient,
  onDelete,
  onCall,
  onViewDetails,
}: PatientAgentCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg">
      {/* Status indicator */}
      <div
        className={`absolute right-4 top-4 h-2 w-2 rounded-full ${
          patient.status === "active"
            ? "bg-green-500"
            : patient.status === "calling"
            ? "bg-yellow-500 animate-pulse"
            : "bg-gray-300"
        }`}
      />

      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={patient.avatarUrl} alt={patient.name} />
          <AvatarFallback>
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">{patient.name}</CardTitle>
          <CardDescription>{patient.phoneNumber}</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onViewDetails(patient.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(patient.id)}
              className="text-red-600"
            >
              Delete Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex flex-col gap-2">
          {patient.lastCall && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>Last call: {patient.lastCall}</span>
            </div>
          )}
          {patient.nextAppointment && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Next appointment: {patient.nextAppointment}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button
          onClick={() => onCall(patient.id)}
          className="w-full gap-2"
          variant={patient.status === "calling" ? "secondary" : "default"}
          disabled={patient.status === "inactive"}
        >
          <Mic2 className="h-4 w-4" />
          {patient.status === "calling" ? "Agent Active" : "Start Agent"}
        </Button>
      </CardFooter>
    </Card>
  );
} 