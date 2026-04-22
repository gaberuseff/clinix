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
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Spinner} from "@/components/ui/spinner";
import {useResetPassword} from "@/features/auth/useResetPassword";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {Link} from "react-router";

export function ForgotPasswordForm({className, ...props}) {
  const [email, setEmail] = useState("");
  const {resetPassword, isResettingPassword} = useResetPassword();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await resetPassword({email});
  };

  return (
    <div
      className={cn("flex w-full max-w-md flex-col gap-6", className)}
      {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email and we will send you a reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isResettingPassword}>
                  {isResettingPassword && (
                    <Spinner className="mx-0 size-4 shrink-0" />
                  )}
                  <span>
                    {isResettingPassword
                      ? "Sending reset link..."
                      : "Send reset password link"}
                  </span>
                </Button>

                <FieldDescription className="text-center">
                  Remember your password? <Link to="/login">Back to login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
