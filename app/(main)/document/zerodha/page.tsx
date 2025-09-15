"use client";
import KiteTimeline from "@/features/documents/zerodha";

export default function Page() {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-primary pb-5">
        Steps to Create a Kite Account and Obtain API Key & Secret
      </h2>
      <KiteTimeline />
    </div>
  );
}
