"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UnlockTransition from "../../components/UnlockTransition";

export default function ClientUnlock() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [started, setStarted] = useState(false);
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    // Read search params on the client inside an effect to avoid
    // Suspense/CSR warnings and hydration mismatches.
    const n = searchParams?.get("next") || "/dashboard";
    setNext(n);

    // Start the transition immediately after search params are resolved
    setStarted(true);
  }, [searchParams]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050608]">
      <UnlockTransition
        visible={started}
        duration={2200}
        onComplete={() => {
          router.replace(next || "/dashboard");
        }}
      />
    </div>
  );
}
