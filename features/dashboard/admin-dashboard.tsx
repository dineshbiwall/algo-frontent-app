import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBuyTradeMutation } from "@/hooks/api/use-buy-trade-mutation";
import { useSellTradeMutation } from "@/hooks/api/use-sell-trade-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  symbol: z.string().min(1, "Symbol is required."),
  noOfLots: z.number().min(1, "Number of lots must be at least 1."),
});

type BuySellForm = z.infer<typeof formSchema>;

export default function AdminDashboard() {
  const buyForm = useForm<BuySellForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      noOfLots: 1,
    },
  });

  const sellForm = useForm<BuySellForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symbol: "",
      noOfLots: 1,
    },
  });

  const { mutateAsync: buyTrade, isPending: isBuying } = useBuyTradeMutation();
  const { mutateAsync: sellTrade, isPending: isSelling } =
    useSellTradeMutation();

  const onBuySubmit = async (values: BuySellForm) => {
    try {
      await buyTrade(values);
      toast.success("Buy order placed successfully!");
      // buyForm.reset();
    } catch (error: any) {
      toast.error(error?.message || "Failed to place buy order");
    }
  };

  const onSellSubmit = async (values: BuySellForm) => {
    try {
      await sellTrade(values);
      toast.success("Sell order placed successfully!");
      // sellForm.reset();
    } catch (error: any) {
      toast.error(error?.message || "Failed to place sell order");
    }
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buy Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Buy Options</h2>
          <Form {...buyForm}>
            <form
              onSubmit={buyForm.handleSubmit(onBuySubmit)}
              className="space-y-4"
            >
              <FormField
                control={buyForm.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter symbol (e.g., BANKNIFTY25SEP55000CE)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={buyForm.control}
                name="noOfLots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Lots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of lots"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isBuying}>
                {isBuying ? "Placing Buy Order..." : "Buy"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Sell Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sell Options</h2>
          <Form {...sellForm}>
            <form
              onSubmit={sellForm.handleSubmit(onSellSubmit)}
              className="space-y-4"
            >
              <FormField
                control={sellForm.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symbol</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter symbol (e.g., BANKNIFTY25SEP55000CE)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sellForm.control}
                name="noOfLots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Lots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of lots"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSelling}>
                {isSelling ? "Placing Sell Order..." : "Sell"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
