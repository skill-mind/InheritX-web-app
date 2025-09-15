import React, { Suspense } from "react";
import ClientUnlock from "./ClientUnlock";

export default function UnlockPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen w-full flex items-center justify-center bg-[#050608]" />}
    >
      <ClientUnlock />
    </Suspense>
  );
}
