"use client";

import TelegramButton from "@/components/telegram";

export default function TelegramSettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold">Telegram</h2>
      <p className="text-muted-foreground mb-6">Configure your Telegram bot.</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-4">
        <div>
          <TelegramButton showSuccessToast={true} />
        </div>
      </div>
    </div>
  );
}
