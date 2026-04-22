import {Button} from "@/components/ui/button";
import {useLogout} from "./useLogout";
import {Spinner} from "@/components/ui/spinner";

function Logout() {
  const {logout, isLoggingOut} = useLogout();

  function handleLogout() {
    logout();
  }

  return (
    <Button onClick={handleLogout} className="w-full" disabled={isLoggingOut}>
      {isLoggingOut && <Spinner className="mx-0 size-4 shrink-0" />}
      <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </Button>
  );
}

export default Logout;
