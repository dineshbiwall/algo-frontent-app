"use client";

import KiteConfigForm from "@/features/documents/zerodha/KiteConfigForm";

export default function ZerodhaSettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Zerodha</h2>
      <p className="text-muted-foreground mb-6">
        Configure your Zerodha API credentials.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-4">
        <div>
          <KiteConfigForm onSuccess={() => {}} />
        </div>
        <div>{/* Add additional content or leave empty for now */}</div>
      </div>
    </div>
  );
}
