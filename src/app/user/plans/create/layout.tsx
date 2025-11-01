"use client";

import React, { Suspense } from "react";
import { CreatePlanProvider } from "@/contexts/CreatePlanContext";

export default function CreatePlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CreatePlanProvider>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </CreatePlanProvider>
  );
}
