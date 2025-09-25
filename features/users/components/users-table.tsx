import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsersQuery } from "@/hooks/api/use-get-users-query";
import { useUserEndTradeMutation } from "@/hooks/api/use-user-end-trade-mutation";
import { useUserStartTradeMutation } from "@/hooks/api/use-user-start-trade-mutation";
import { RowData } from "@tanstack/react-table";
import { Fragment, useCallback, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableRowActions } from "./data-table-row-actions";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    className: string;
  }
}

interface DataTableProps {}

export function UsersTable({}: DataTableProps) {
  const [page, setPage] = useState(1);
  const { data: users, status, refetch } = useUsersQuery({ page });
  const { mutateAsync: startTrade, isPending: isStartingTrade } =
    useUserStartTradeMutation();
  const { mutateAsync: endTrade, isPending: isEndingTrade } =
    useUserEndTradeMutation();

  const nextPage = useCallback(() => {
    if (!users) return;
    if (page < users?.meta.noOfPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, users]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="group/row">
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Opening Balance</TableHead>
              <TableHead>Available Cash</TableHead>
              <TableHead>Available Live Balance</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Jobs</TableHead>
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
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full mx-auto" />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {users?.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                ) : (
                  <Fragment>
                    {users?.data.map((user) => (
                      <TableRow key={user.id} className="group/row">
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          {user.balances.length
                            ? user.balances[0].availableCash
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {user.balances.length
                            ? user.balances[0].availableOpeningBalance
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {user.balances.length
                            ? user.balances[0].availableLiveBalance
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <DataTableRowActions row={user} />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {user.tokens.length ? (
                              <Fragment>
                                {user.tokens[0].jobId ? (
                                  <Button
                                    disabled={isEndingTrade}
                                    onClick={() =>
                                      endTrade({ userId: user.id })
                                    }
                                    variant="destructive"
                                  >
                                    Stop Trading
                                  </Button>
                                ) : (
                                  <Button
                                    disabled={isStartingTrade}
                                    onClick={() =>
                                      startTrade({ userId: user.id })
                                    }
                                  >
                                    Start Trading
                                  </Button>
                                )}
                              </Fragment>
                            ) : null}
                          </div>
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
      {users ? (
        <DataTablePagination
          total={users.meta.total}
          page={page}
          noOfPages={users.meta.noOfPages}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ) : null}
    </div>
  );
}
