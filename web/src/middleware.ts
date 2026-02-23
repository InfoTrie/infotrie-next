export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/docs/:path*", "/data/:path*", "/demo/:path*"],
};
