"use client";

import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useStartPlanMutation } from "@/hooks/api/use-start-plan-mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PaymentsTable } from "./components/payments-table";
import PaymentsProvider, { usePayments } from "./context/payments-context";
import ReceiptModal from "./receipt-modal";

function AdminPaymentsInner() {
  const { open, setOpen, currentRow } = usePayments();
  const { mutateAsync } = useStartPlanMutation();

  const addPlanSchema = z.object({
    startDate: z.date({ required_error: "Start date is required" }),
  });

  type AddPlanForm = z.infer<typeof addPlanSchema>;

  const form = useForm<AddPlanForm>({
    resolver: zodResolver(addPlanSchema),
    defaultValues: {
      startDate: new Date(),
    },
  });

  const onSubmit = async (values: AddPlanForm) => {
    try {
      await mutateAsync({
        date: values.startDate.toISOString(),
        userId: currentRow?.userId || "",
      });
      toast.success(
        `Set start date ${values.startDate.toDateString()} for ${currentRow?.user?.email || currentRow?.userId}`,
      );
      form.reset();
      setOpen("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
          <p className="text-muted-foreground">
            Manage uploaded payment receipts from users.
          </p>
        </div>
      </div>

      <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
        <PaymentsTable />
      </div>

      <Dialog
        open={open === "add-plan"}
        onOpenChange={(v) => {
          if (!v) {
            form.reset();
            setOpen("");
          } else {
            setOpen("add-plan");
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add user plan</DialogTitle>
          </DialogHeader>

          <div className="-mr-4 w-full overflow-y-auto py-1 pr-4">
            <p className="text-sm text-muted-foreground">
              User: {currentRow?.user?.email || currentRow?.userId}
            </p>
            <div className="mt-4">
              <Form {...form}>
                <form
                  id="add-plan-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start date</FormLabel>
                        <FormControl>
                          <DatePicker
                            selected={field.value}
                            onSelect={(d) => field.onChange(d)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>

          <DialogFooter>
            <div className="flex gap-2 w-full">
              <Button
                variant="ghost"
                onClick={() => {
                  form.reset();
                  setOpen("");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" form="add-plan-form">
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ReceiptModal />
    </div>
  );
}

export default function AdminPaymentsPage() {
  return (
    <PaymentsProvider>
      <AdminPaymentsInner />
    </PaymentsProvider>
  );
}
