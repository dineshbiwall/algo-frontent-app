import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useKiteBalanceQuery } from "@/hooks/api/use-kite-balance-query";
import { IconCurrencyRupee } from "@tabler/icons-react";
import { Fragment } from "react";

export default function Balance() {
  const { data, status } = useKiteBalanceQuery();
  if (status === "pending")
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <div className="flex flex-col space-y-3 px-6">
              <Skeleton className="h-[125px] w-full rounded-xl" />
            </div>
          </Card>
        ))}
      </div>
    );

  if (!data) return <Fragment />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Available for trading
          </CardTitle>
          <IconCurrencyRupee size={18} stroke={1} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.available.cash}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Opening balance</CardTitle>
          <IconCurrencyRupee size={18} stroke={1} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.available.opening_balance}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Available balance
          </CardTitle>
          <IconCurrencyRupee size={18} stroke={1} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.available.live_balance}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Amount that was deposited during the day
          </CardTitle>
          <IconCurrencyRupee size={18} stroke={1} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.available.intraday_payin}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
