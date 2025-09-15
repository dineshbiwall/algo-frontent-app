import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/features/users/components/data-table-pagination";
import { useAdminPaymentsQuery } from "@/hooks/api/use-admin-payments-query";
import { RowData } from "@tanstack/react-table";
import moment from "moment";
import { Fragment, useCallback, useEffect, useState } from "react";
import { DataTableRowActions } from "../data-table-row-actions";
import UsersFilter from "./users-filter";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

export function PaymentsTable() {
  const [page, setPage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const { data: receipts, status } = useAdminPaymentsQuery({
    page,
    userIds: selectedUserIds,
  });

  useEffect(() => {
    // reset to first page when filters change
    setPage(1);
  }, [selectedUserIds.join(",")]);

  const nextPage = useCallback(() => {
    if (!receipts) return;
    if (page < receipts?.meta.noOfPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, receipts]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <UsersFilter
          selectedUserIds={selectedUserIds}
          onChange={setSelectedUserIds}
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="group/row">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Read At</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "pending" ? (
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {receipts?.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                ) : (
                  <Fragment>
                    {receipts?.data.map((r) => (
                      <TableRow key={r.id} className="group/row">
                        <TableCell
                          className={
                            r.readAt ? "" : "border-l-4 border-red-300"
                          }
                        >
                          {r.user?.name || r.userId}
                        </TableCell>
                        <TableCell>{r.user?.email || r.userId}</TableCell>
                        <TableCell>{r.amount}</TableCell>
                        <TableCell>
                          {r.readAt
                            ? moment(r.readAt).format("DD MMM, YYYY HH:mm")
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {moment(r.createdAt).format("DD MMM, YYYY")}
                        </TableCell>
                        <TableCell>
                          <DataTableRowActions row={r} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                )}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </div>
      {receipts ? (
        <DataTablePagination
          total={receipts.meta.total}
          page={page}
          noOfPages={receipts.meta.noOfPages}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ) : null}
    </div>
  );
}
