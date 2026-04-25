import { useState } from "react";
import AddPatients from "./AddPatients";
import PatientsTable from "./PatientsTable";
import { Button } from "../../components/ui/button";
import { Spinner } from "../../components/ui/spinner";
import useUser from "../auth/useUser";

function PatientsLayout() {
  const { clinicId, isLoading: isUserLoading } = useUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  function handleEditPatient(patient) {
    setPatientToEdit(patient);
    setDrawerOpen(true);
  }

  function handleDrawerChange(open) {
    setDrawerOpen(open);
    if (!open) {
      setPatientToEdit(null);
    }
  }

  if (isUserLoading) {
    return <Spinner className="mx-auto size-8" />;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Patients</h2>
        <Button onClick={() => setDrawerOpen(true)}>Create Patient</Button>
      </div>

      <AddPatients
        clinicId={clinicId}
        patientToUpdate={patientToEdit ?? {}}
        open={drawerOpen}
        onOpenChange={handleDrawerChange}
        hideTrigger
      />

      <PatientsTable clinicId={clinicId} onEditPatient={handleEditPatient} />
    </div>
  );
}

export default PatientsLayout;
