import {Spinner} from "@/components/ui/spinner";
import {FaEllipsisH, FaUserTie} from "react-icons/fa";
import {Button} from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import useUser from "../auth/useUser";
import useGetSecretaries from "./useGetSecretaries";
import Error from "@/components/Error";

function SecretariesTable() {
  const {clinicId} = useUser();

  const {secretaries, isSecretariesLoading, error} =
    useGetSecretaries(clinicId);

  if (isSecretariesLoading) {
    return <Spinner className="mx-auto size-8" />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUserTie /> Secretaries Table
      </h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {secretaries?.map((secretary) => (
            <TableRow key={secretary.id}>
              <TableCell className="font-medium">
                {secretary.full_name}
              </TableCell>
              <TableCell>{secretary.email}</TableCell>
              <TableCell>{secretary.phone}</TableCell>
              <TableCell>{secretary.role}</TableCell>
              <TableCell>{JSON.stringify(secretary.permissions)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <FaEllipsisH />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SecretariesTable;
