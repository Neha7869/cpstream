"use client";

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <SignIn
        signUpUrl="/sign-up"
        forceRedirectUrl="/"
        routing="path"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-none border-none",
          },
        }}
      />
    </div>
  );
}
