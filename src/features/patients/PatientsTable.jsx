import Error from "../../components/Error";
import { Spinner } from "../../components/ui/spinner";
import { FaEllipsisH, FaUserTie } from "react-icons/fa";
import { Button } from "../../components/ui/button";
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";
import useGetClinicPatients from "./useGetClinicPatients";
import { calculateAge } from "@/lib/helpers";
import { useState } from "react";
import useDeletePatient from "./useDeletePatient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { PAGE_SIZE } from "@/lib/utils";

function PatientsTable({ clinicId, onEditPatient }) {
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [page, setPage] = useState(1);

  const { patients, totalCount, isPatientsLoading, error } =
    useGetClinicPatients(clinicId, page);
  const { deletePatient, isDeletingPatient } = useDeletePatient();

  const totalPages = totalCount ? Math.ceil(totalCount / PAGE_SIZE) : 1;

  function handleAskDeletePatient(patient) {
    setPatientToDelete(patient);
    setIsDeleteDialogOpen(true);
  }

  function handleDeleteDialogChange(open) {
    setIsDeleteDialogOpen(open);
    if (!open) {
      setPatientToDelete(null);
    }
  }

  function handleConfirmDelete() {
    if (!patientToDelete?.id) return;

    setDeletingId(patientToDelete.id);
    deletePatient(
      { patientId: patientToDelete.id },
      {
        onSuccess: () => {
          setDeletingId(null);
          handleDeleteDialogChange(false);
          // If we deleted the last item on a non-first page, go back one
          if (patients?.length === 1 && page > 1) {
            setPage((p) => p - 1);
          }
        },
        onError: () => setDeletingId(null),
      },
    );
  }

  if (isPatientsLoading) {
    return <Spinner className="mx-auto size-8" />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  return (
    <div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={handleDeleteDialogChange}>
        <DialogContent
          className="sm:max-w-md"
          showCloseButton={!isDeletingPatient}>
          <DialogHeader>
            <DialogTitle>Delete Patient</DialogTitle>
            <DialogDescription>
              {`Are you sure you want to delete ${patientToDelete?.name || "this patient"}? This action cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDeleteDialogChange(false)}
              disabled={isDeletingPatient}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isDeletingPatient}>
              {isDeletingPatient ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <FaUserTie /> Patients Table
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center h-32 text-muted-foreground">
                No patients found. Add your first patient to get started.
              </TableCell>
            </TableRow>
          ) : (
            patients?.map((patient) => (
              <TableRow
                key={patient.id}
                className={
                  deletingId === patient.id
                    ? "opacity-50 pointer-events-none"
                    : ""
                }>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{calculateAge(patient.birth_year)}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <FaEllipsisH />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onSelect={() => onEditPatient(patient)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => handleAskDeletePatient(patient)}
                        disabled={isDeletingPatient}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-disabled={page === 1}
                  className={
                    page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem className="text-sm text-muted-foreground px-4 flex items-center">
                Page {page} of {totalPages}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-disabled={page === totalPages}
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default PatientsTable;
