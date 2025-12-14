"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Switch } from "@/components/ui/switch";
import Text from "@/components/ui/Text";

export default function JournalingSettingsPage() {
  const [dailySummary, setDailySummary] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [monthlySummary, setMonthlySummary] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header title="ジャーナリング要約設定" showBackButton={true} />

      <main className="mx-auto px-6 py-8">

        <div className="space-y-8 max-w-md mx-auto">
          {/* 日ごとに要約 */}
          <div className="flex items-center justify-between">
            <Text style="body-bold">
              日ごとに要約
            </Text>
            <Switch
              checked={dailySummary}
              onCheckedChange={setDailySummary}
              className="scale-150 origin-right data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>

          {/* 週ごとに要約 */}
          <div className="flex items-center justify-between">
            <Text style="body-bold">
              週ごとに要約
            </Text>
            <Switch
              checked={weeklySummary}
              onCheckedChange={setWeeklySummary}
              className="scale-150 origin-right data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>

          {/* 月ごとに要約 */}
          <div className="flex items-center justify-between">
            <Text style="body-bold">
              月ごとに要約
            </Text>
            <Switch
              checked={monthlySummary}
              onCheckedChange={setMonthlySummary}
              className="scale-150 origin-right data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
            />
          </div>
        </div>
      </main>
    </div>
  );
}