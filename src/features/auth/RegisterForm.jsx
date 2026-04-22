import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {useRegister} from "@/features/auth/useRegister";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {Link} from "react-router";

export function RegisterForm({className, ...props}) {
  const {register, isRegistering} = useRegister();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    clinicName: "",
    clinicAddress: "",
    clinicSpecialty: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStepOne = () => {
    const nextErrors = {};

    if (!formValues.clinicName.trim()) {
      nextErrors.clinicName = "Clinic name is required.";
    }

    if (!formValues.clinicAddress.trim()) {
      nextErrors.clinicAddress = "Clinic address is required.";
    }

    if (!formValues.clinicSpecialty.trim()) {
      nextErrors.clinicSpecialty = "Clinic specialty is required.";
    }

    return nextErrors;
  };

  const validateStepTwo = () => {
    const nextErrors = {};

    if (!formValues.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!formValues.email.trim()) {
      nextErrors.email = "Email is required.";
    }

    if (!formValues.phone.trim()) {
      nextErrors.phone = "Phone is required.";
    }

    if (formValues.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (formValues.password !== formValues.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleStepOneSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateStepOne();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStep(2);
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    const validationErrors = validateStepTwo();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    await register({
      email: formValues.email,
      password: formValues.password,
      fullName: formValues.fullName,
      phone: formValues.phone,
      clinicName: formValues.clinicName,
      clinicAddress: formValues.clinicAddress,
      clinicSpecialty: formValues.clinicSpecialty,
    });
  };

  return (
    <div
      className={cn("flex w-full max-w-xl flex-col gap-6", className)}
      {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Doctor Account</CardTitle>
          <CardDescription>
            {step === 1
              ? "Step 1 of 2 - Clinic information"
              : "Step 2 of 2 - Doctor information"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={step === 1 ? handleStepOneSubmit : handleCreateAccount}>
            <FieldGroup>
              {step === 1 && (
                <>
                  <Field>
                    <FieldLabel htmlFor="clinicName">Clinic Name</FieldLabel>
                    <Input
                      id="clinicName"
                      name="clinicName"
                      type="text"
                      value={formValues.clinicName}
                      onChange={handleChange}
                      placeholder="Care+ Clinic"
                      required
                    />
                    <FieldError>{errors.clinicName}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="clinicAddress">
                      Clinic Address
                    </FieldLabel>
                    <Input
                      id="clinicAddress"
                      name="clinicAddress"
                      type="text"
                      value={formValues.clinicAddress}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      required
                    />
                    <FieldError>{errors.clinicAddress}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="clinicSpecialty">
                      Clinic Specialty
                    </FieldLabel>
                    <Input
                      id="clinicSpecialty"
                      name="clinicSpecialty"
                      type="text"
                      value={formValues.clinicSpecialty}
                      onChange={handleChange}
                      placeholder="Dermatology"
                      required
                    />
                    <FieldError>{errors.clinicSpecialty}</FieldError>
                  </Field>

                  <Field>
                    <Button type="submit" className="w-full">
                      Continue
                    </Button>

                    <FieldDescription className="text-center">
                      Already have an account? <Link to="/login">Sign in</Link>
                    </FieldDescription>
                  </Field>
                </>
              )}

              {step === 2 && (
                <>
                  <Field>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formValues.fullName}
                      onChange={handleChange}
                      placeholder="Dr. John Doe"
                      required
                    />
                    <FieldError>{errors.fullName}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formValues.email}
                      onChange={handleChange}
                      placeholder="doctor@example.com"
                      required
                    />
                    <FieldError>{errors.email}</FieldError>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone">Phone</FieldLabel>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="+201001234567"
                      required
                    />
                    <FieldError>{errors.phone}</FieldError>
                  </Field>

                  <Field className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formValues.password}
                        onChange={handleChange}
                        required
                      />
                      <FieldError>{errors.password}</FieldError>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <FieldError>{errors.confirmPassword}</FieldError>
                    </Field>
                  </Field>

                  <FieldDescription>
                    Password must be at least 8 characters.
                  </FieldDescription>

                  <Field className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isRegistering}
                      onClick={() => {
                        setErrors({});
                        setStep(1);
                      }}>
                      Back
                    </Button>
                    <Button type="submit" disabled={isRegistering}>
                      {isRegistering ? "Creating..." : "Create Account"}
                    </Button>
                  </Field>

                  <FieldDescription className="text-center">
                    Already have an account? <Link to="/login">Sign in</Link>
                  </FieldDescription>
                </>
              )}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
