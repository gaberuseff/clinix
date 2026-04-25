import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../components/ui/field";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import useCreatePatient from "./useCreatePatient";
import { Spinner } from "../../components/ui/spinner";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useEditPatient from "./useEditPatient";

const EMPTY_PATIENT = {};
const CURRENT_YEAR = new Date().getFullYear();

function getPatientDefaultValues(patient = {}) {
  if (!patient?.id) {
    return {
      name: "",
      phone: "",
      birth_year: "",
      gender: "male",
    };
  }

  return {
    name: patient?.name || "",
    phone: patient?.phone || "",
    birth_year: patient?.birth_year ? String(patient.birth_year) : "",
    gender: patient?.gender || "male",
  };
}

function AddPatients({
  clinicId,
  patientToUpdate = EMPTY_PATIENT,
  open: controlledOpen,
  onOpenChange,
  hideTrigger = false,
  triggerLabel = "Create Patient",
}) {
  const { id: updateId } = patientToUpdate;
  const isUpdateSession = !!updateId;
  const { createPatient, isCreatingPatient } = useCreatePatient();
  const { editPatient, isEditingPatient } = useEditPatient();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isControlled = typeof controlledOpen === "boolean";
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const setOpen = isControlled ? onOpenChange : setUncontrolledOpen;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getPatientDefaultValues(patientToUpdate),
  });

  const isWorking = isCreatingPatient || isEditingPatient;

  useEffect(() => {
    if (open) {
      reset(getPatientDefaultValues(patientToUpdate));
    }
  }, [open, patientToUpdate, reset]);

  function closeAndReset() {
    reset();
    setOpen(false);
  }

  function onSubmit(data) {
    const cleanedData = {
      ...data,
      name: data.name.trim(),
      phone: data.phone.trim(),
      birth_year: Number(data.birth_year),
    };

    if (isUpdateSession) {
      editPatient(
        { patientId: updateId, patientData: cleanedData },
        { onSuccess: closeAndReset },
      );
    } else {
      if (!clinicId) {
        toast.error("Could not detect clinic. Please sign in again.");
        return;
      }
      createPatient(
        { ...cleanedData, clinic_id: clinicId },
        { onSuccess: closeAndReset },
      );
    }
  }

  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        {!hideTrigger && (
          <DrawerTrigger asChild>
            <Button variant="outline">{triggerLabel}</Button>
          </DrawerTrigger>
        )}
        <DrawerContent
          key={isUpdateSession ? updateId : "create-patient"}
          className={cn(
            "data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:sm:max-w-xl",
          )}>
          <DrawerHeader>
            <DrawerTitle>
              {isUpdateSession ? "Edit Patient" : "Create New Patient"}
            </DrawerTitle>
            <DrawerDescription>
              {isUpdateSession
                ? "Update patient details and save changes."
                : "Fill in the details to create a new patient record."}
            </DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
            className="no-scrollbar overflow-y-auto px-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                <Input
                  id="fieldgroup-name"
                  {...register("name", { required: "Name is required." })}
                  autoComplete="off"
                  placeholder="Jordan Lee"
                />
                <FieldError>{errors.name?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-phone">Phone</FieldLabel>
                <Input
                  id="fieldgroup-phone"
                  {...register("phone", {
                    required: "Phone is required.",
                    pattern: {
                      value: /^\d{7,15}$/,
                      message: "Phone must be 7–15 digits only.",
                    },
                  })}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="(123) 456-7890"
                />
                <FieldError>{errors.phone?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-birthyear">
                  Birth Year
                </FieldLabel>
                <Input
                  id="fieldgroup-birthyear"
                  {...register("birth_year", {
                    required: "Birth year is required.",
                    pattern: {
                      value: /^\d{4}$/,
                      message: "Birth year must be a 4-digit number.",
                    },
                    min: {
                      value: 1900,
                      message: "Birth year must be after 1900.",
                    },
                    max: {
                      value: CURRENT_YEAR,
                      message: "Birth year cannot be in the future.",
                    },
                  })}
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="1998"
                />
                <FieldError>{errors.birth_year?.message}</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="fieldgroup-gender">Gender</FieldLabel>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required." }}
                  render={({ field }) => (
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}>
                      <SelectTrigger id="fieldgroup-gender" className="w-full">
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>{errors.gender?.message}</FieldError>
              </Field>
            </FieldGroup>

            <DrawerFooter>
              <Button type="submit" disabled={isWorking}>
                {isWorking && <Spinner className="mx-0 size-4 shrink-0" />}
                <span>{isUpdateSession ? "Save Changes" : "Create"}</span>
              </Button>
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isWorking}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AddPatients;
