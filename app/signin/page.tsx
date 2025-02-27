"use client";

import LoginModal from "@/app/components/ui/signin-modal";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <LoginModal />
    </div>
  );
}
