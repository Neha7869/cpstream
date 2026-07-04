"use client";

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <SignUp
        signInUrl="/sign-in"
        afterSignUpUrl="/"
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