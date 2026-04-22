import {Input} from "../../components/ui/input";
import {Label} from "../../components/ui/label";
import {useState} from "react";
import {Button} from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {cn} from "../../lib/utils";
import useUser from "../auth/useUser";
import {useCreateSecretary} from "./useCreateSecretary";
import {toast} from "sonner";

function CreateSecretary() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Secretary</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create Secretary</DialogTitle>
          <DialogDescription>
            Create Account for a new secretary by filling in the form below.
            After creating the account, give the secretary the necessary
            permissions to access the system.
          </DialogDescription>
        </DialogHeader>
        <CreateSecretaryForm onCreated={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

export default CreateSecretary;

function CreateSecretaryForm({className, onCreated}) {
  const {userMetadata} = useUser();
  const {createSecretary, isPending} = useCreateSecretary();

  const [formValues, setFormValues] = useState({
    email: "",
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const {id, value} = event.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    if (formValues.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }

    if (formValues.password !== formValues.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const resetForm = () => {
    setFormValues({
      email: "",
      fullName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userMetadata?.clinic_id) {
      toast.error("Could not detect doctor clinic. Please sign in again.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      await createSecretary({
        email: formValues.email.trim(),
        password: formValues.password,
        fullName: formValues.fullName.trim(),
        phone: formValues.phone.trim(),
        clinicId: userMetadata.clinic_id,
      });

      resetForm();
      onCreated?.();
    } catch {
      // Error is handled by useCreateSecretary mutation
    }
  };

  return (
    <form
      className={cn("grid items-start gap-6", className)}
      onSubmit={handleSubmit}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formValues.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formValues.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create secretary"}
      </Button>
    </form>
  );
}
