import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't force a sign-in authentication wall
  publicRoutes: [
    "/",
    "/search",
    "/api/webhooks/clerk",
    "/api/webhooks/livekit",
    "/api/uploadthing",
    "/:username" // Allows public stream profiles to be viewed without a crash
  ],
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
  runtime: "nodejs",
};