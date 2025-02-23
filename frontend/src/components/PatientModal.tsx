import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Patient {
  id: string;
  name: string;
  phoneNumber: string;
  status: "active" | "inactive" | "calling";
  lastCall: string;
  nextAppointment: string;
}

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (patient: Patient) => void;
  patient?: Patient;
  patientId: string;
  mode: "edit" | "add";
}

export function PatientModal({
  isOpen,
  onClose,
  onSave,
  patient,
  patientId,
  mode,
}: PatientModalProps) {
  const [formData, setFormData] = useState<Patient>({
    id: "",
    name: "",
    phoneNumber: "",
    status: "inactive",
    lastCall: "",
    nextAppointment: "",
  });

  useEffect(() => {
    if (mode === "edit" && patient) {
      setFormData(patient);
    } else if (mode === "add") {
      setFormData({
        id: patientId,
        name: "",
        phoneNumber: "",
        status: "inactive",
        lastCall: "",
        nextAppointment: "",
      });
    }
  }, [mode, patient, isOpen]); // Add isOpen to dependencies to reset form when modal opens

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Patient Details" : "Add New Patient"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: "active" | "inactive" | "calling") =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="calling">Calling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nextAppointment" className="text-right">
                Next Appointment
              </Label>
              <Input
                id="nextAppointment"
                type="datetime-local"
                value={formData.nextAppointment}
                onChange={(e) =>
                  setFormData({ ...formData, nextAppointment: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 