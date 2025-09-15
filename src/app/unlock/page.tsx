"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import UnlockTransition from "../../components/UnlockTransition";

export default function UnlockPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [started, setStarted] = useState(false);

  const next = searchParams?.get("next") || "/dashboard";

  useEffect(() => {
    // Start the transition immediately when page loads on client
    setStarted(true);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050608]">
      <UnlockTransition
        visible={started}
        duration={2200}
        onComplete={() => {
          // Navigate to next after the transition completes
          router.replace(next);
        }}
      />
    </div>
  );
}
