import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminUserBalanceQuery } from "@/hooks/api/use-admin-user-balance-query";
import { Fragment, useCallback, useState } from "react";
import { DataTablePagination } from "./data-table-pagination";

interface UserBalanceProps {
  userId: string;
}

export default function UserBalance({ userId }: UserBalanceProps) {
  const [page, setPage] = useState(1);
  const { data, status } = useAdminUserBalanceQuery({ userId, page });

  const nextPage = useCallback(() => {
    if (!data) return;
    if (page < data?.meta.noOfPages) {
      setPage((prev) => prev + 1);
    }
  }, [page, data]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">User Balance</h2>
        <p className="text-muted-foreground">
          View the balance details for this user.
        </p>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Available Cash</TableHead>
              <TableHead>Available Opening Balance</TableHead>
              <TableHead>Available Live Balance</TableHead>
              <TableHead>Available Collateral</TableHead>
              <TableHead>Available Adhoc Margin</TableHead>
              <TableHead>Available Intraday Payin</TableHead>
              <TableHead>Utilised Debits</TableHead>
              <TableHead>Utilised Exposure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {status === "pending" ? (
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            ) : (
              <Fragment>
                {data?.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No balance data available.
                    </TableCell>
                  </TableRow>
                ) : (
                  <Fragment>
                    {data?.data.map((balance) => (
                      <TableRow key={balance.id}>
                        <TableCell>
                          {new Date(balance.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{balance.availableCash}</TableCell>
                        <TableCell>{balance.availableOpeningBalance}</TableCell>
                        <TableCell>{balance.availableLiveBalance}</TableCell>
                        <TableCell>{balance.availableCollateral}</TableCell>
                        <TableCell>{balance.availableAdhocMargin}</TableCell>
                        <TableCell>{balance.availableIntradayPayin}</TableCell>
                        <TableCell>{balance.utilisedDebits}</TableCell>
                        <TableCell>{balance.utilisedExposure}</TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                )}
              </Fragment>
            )}
          </TableBody>
        </Table>
      </div>
      {data ? (
        <DataTablePagination
          total={data.meta.total}
          page={page}
          noOfPages={data.meta.noOfPages}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      ) : null}
    </div>
  );
}
