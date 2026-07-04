import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Public routes that don't force a sign-in authentication wall
  publicRoutes: [
    "/",
    "/search",
    "/api/webhooks/clerk",
    "/:username" // Allows public stream profiles to be viewed without a crash
  ],
});

export const config = {
  // Intercepts all pages and API requests while ignoring static assets and image files
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.+_next|.*\\..*$).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};